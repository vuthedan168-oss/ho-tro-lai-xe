/**
 * ⚡ MÁY CHỦ XỬ LÝ THANH TOÁN TỰ ĐỘNG SEPAY (DrivePass Pro Webhook Server)
 * Tác giả: Vu The Dan <vuthedan168@gmail.com>
 * 
 * TÍNH NĂNG:
 * 1. Nhận thông báo IPN từ SePay khi khách thanh toán thành công qua VietQR.
 * 2. Tự động sinh mã VIP License Key dựa trên Machine ID của khách.
 * 3. Lưu trữ bản quyền đã kích hoạt và cung cấp API tự động kích hoạt cho Bookmarklet.
 * 4. Gửi thông báo tức thì đến Telegram của Admin khi nhận tiền.
 */

const http = require('http');
const fs = require('fs');
const url = require('url');
const { generateLicenseKey } = require('./license_manager');

// Cấu hình thông tin tích hợp SePay của He
const SEPAY_CONFIG = {
  MERCHANT_ID: "SP-LIVE-VT7A4733",
  SECRET_KEY: "spsk_live_VP6T8GmQaqLcKFQPkY9gVEFPi5Tpqb5F",
  VIP_PRICE: 199000, // Giá gói VIP (VND)
  PORT: process.env.PORT || 3000,
  TELEGRAM_BOT_TOKEN: process.env.TELEGRAM_BOT_TOKEN || "", // Điền nếu muốn nhận tin nhắn Telegram
  TELEGRAM_CHAT_ID: process.env.TELEGRAM_CHAT_ID || ""
};

const DB_FILE = 'activated_licenses.json';

// Tải bộ nhớ giấy phép đã kích hoạt
function loadLicenses() {
  try {
    if (fs.existsSync(DB_FILE)) {
      return JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
    }
  } catch (e) {}
  return {};
}

function saveLicenses(data) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf8');
  } catch (e) {}
}

const activeLicenses = loadLicenses();

// Gửi thông báo đến Telegram Admin
async function sendTelegramAlert(message) {
  if (!SEPAY_CONFIG.TELEGRAM_BOT_TOKEN || !SEPAY_CONFIG.TELEGRAM_CHAT_ID) return;
  try {
    const tgUrl = `https://api.telegram.org/bot${SEPAY_CONFIG.TELEGRAM_BOT_TOKEN}/sendMessage`;
    await fetch(tgUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: SEPAY_CONFIG.TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: 'HTML'
      })
    });
  } catch (err) {
    console.error('Lỗi gửi Telegram:', err.message);
  }
}

const server = http.createServer((req, res) => {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const parsedUrl = url.parse(req.url, true);

  // 1. Endpoint kiểm tra kích hoạt tự động từ Bookmarklet (Polling)
  if (req.method === 'GET' && parsedUrl.pathname === '/api/check-license') {
    const machineId = (parsedUrl.query.machineId || '').trim().toUpperCase();
    if (machineId && activeLicenses[machineId]) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        success: true,
        activated: true,
        licenseKey: activeLicenses[machineId].licenseKey,
        expiresAt: activeLicenses[machineId].expiresAt
      }));
    } else {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        success: true,
        activated: false,
        message: 'Chưa nhận được thanh toán'
      }));
    }
    return;
  }

  // 2. Endpoint nhận Webhook IPN từ SePay khi có giao dịch thành công
  if (req.method === 'POST' && (parsedUrl.pathname === '/api/sepay-webhook' || parsedUrl.pathname === '/webhook')) {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', async () => {
      console.log('--- [SEPAY WEBHOOK NHẬN ĐƯỢC GIAO DỊCH MỚI] ---');
      try {
        const payload = JSON.parse(body);
        console.log('Chi tiết giao dịch:', JSON.stringify(payload, null, 2));

        // Trích xuất mã máy từ mô tả đơn hàng hoặc mã hóa đơn (ví dụ: DPP_8F3A_9B21 hoặc DP-8F3A-9B21)
        const content = (payload.content || payload.order_description || payload.order_invoice_number || '').toUpperCase();
        const match = content.match(/DP-([A-Z0-9]{4})-([A-Z0-9]{4})/) || content.match(/DPP_([A-Z0-9]{4})_([A-Z0-9]{4})/);

        let machineId = '';
        if (match) {
          machineId = `DP-${match[1]}-${match[2]}`;
        }

        const amount = payload.transferAmount || payload.order_amount || 0;

        if (machineId) {
          // Sinh mã bản quyền VIP 365 ngày
          const keyData = generateLicenseKey(machineId, 365);
          activeLicenses[machineId] = {
            ...keyData,
            paidAmount: amount,
            transactionId: payload.id || payload.order_invoice_number || Date.now(),
            activatedAt: new Date().toISOString()
          };
          saveLicenses(activeLicenses);

          console.log(`✔ TỰ ĐỘNG KÍCH HOẠT THÀNH CÔNG CHO MÁY: ${machineId}`);
          console.log(`🔑 LICENSE KEY: ${keyData.licenseKey}`);

          // Báo về Telegram
          const msg = `🎉 <b>DRIVEPASS PRO: NHẬN THANH TOÁN THÀNH CÔNG</b>\n` +
            `💰 Số tiền: <b>${amount.toLocaleString('vi-VN')} VND</b>\n` +
            `🖥️ Mã máy: <code>${machineId}</code>\n` +
            `🔑 Key đã cấp: <code>${keyData.licenseKey}</code>\n` +
            `📅 Hạn dùng: ${keyData.expiresAt}`;
          await sendTelegramAlert(msg);

          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: true, message: 'Đã kích hoạt thành công', license: keyData }));
        } else {
          console.log('⚠️ Không tìm thấy định dạng Machine ID trong nội dung:', content);
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: true, message: 'Không phát hiện mã máy phù hợp' }));
        }
      } catch (err) {
        console.error('Lỗi xử lý webhook:', err.message);
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: err.message }));
      }
    });
    return;
  }

  // Mặc định: Trang trạng thái
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(`
    <div style="font-family:sans-serif;max-width:600px;margin:40px auto;padding:20px;border:1px solid #ddd;border-radius:10px;">
      <h2 style="color:#0284c7;">⚡ DrivePass Pro - SePay Webhook Server</h2>
      <p><b>Merchant ID:</b> ${SEPAY_CONFIG.MERCHANT_ID}</p>
      <p><b>Trạng thái:</b> Đang lắng nghe Webhook tại <code>/api/sepay-webhook</code></p>
      <p><b>Số máy đã kích hoạt:</b> ${Object.keys(activeLicenses).length}</p>
    </div>
  `);
});

server.listen(SEPAY_CONFIG.PORT, () => {
  console.log('==================================================');
  console.log(`🚀 SEPAY WEBHOOK SERVER ĐANG CHẠY TẠI PORT: ${SEPAY_CONFIG.PORT}`);
  console.log(`🔗 Endpoint Webhook SePay : http://localhost:${SEPAY_CONFIG.PORT}/api/sepay-webhook`);
  console.log(`🔗 Endpoint Kiểm tra Key  : http://localhost:${SEPAY_CONFIG.PORT}/api/check-license?machineId=...`);
  console.log('==================================================');
});
