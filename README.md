# ⚡ DRIVEPASS PRO (V8.0 Commercial Edition)
> **Trợ Lý Sát Hạch & Ôn Luyện Lái Xe Thông Minh (LotusLMS / HueLMS / Đông Đô)**
> Bản quyền phát triển: Vu The Dan <vuthedan168@gmail.com>

---

## 🎯 1. TÍNH NĂNG ĐỘT PHÁ THƯƠNG MẠI HÓA
1. **Tích hợp Cổng thanh toán SePay Payment Gateway chính thức:**
   - Sử dụng Merchant ID: `SP-LIVE-VT7A4733` và Secret Key `spsk_live_...`.
   - Khách hàng bấm `⚡ Thanh Toán Tự Động Qua SePay`: Tiện ích tự động tạo đơn hàng và mở cổng quét mã VietQR ngân hàng.
   - Khi thanh toán xong, hệ thống webhook tự động cấp mã và kích hoạt bản quyền `💎 VIP` tức thì.
2. **Khóa bản quyền 1 Thiết Bị - 1 Tài Khoản (Hardware & Account Lock):**
   - Tự động sinh `Mã máy (Machine ID)` dựa trên phần cứng (Canvas + Screen + GPU WebGL + LMS Account UID).
   - Mã bản quyền `DPP-XXXX-YYMMDD-ZZZZ` chỉ kích hoạt được duy nhất trên máy và tài khoản đó, ngăn chặn 100% việc mua 1 mã rồi chia sẻ cho người khác.
3. **Tự động bắt gói tin khi bấm "Kiểm tra" & Tải trang (Auto-Interceptor):**
   - Tự động hook `fetch` và `XMLHttpRequest` bóc tách ngân hàng đề thi khi vào bài làm hoặc khi bấm các nút "Kiểm tra", "Bắt đầu", "Làm bài".
4. **Nạp đề thủ công đa năng (Fail-safe):**
   - Nút `[📋 Nạp Đề]` hỗ trợ lấy nhanh từ Clipboard với 1 click, dán JSON API, hoặc kéo thả file.
5. **Giao diện thương mại Light / Dark Theme:**
   - Chuyển đổi màu Sáng / Tối (`🌓`) phù hợp mọi điều kiện ánh sáng.
   - Typography chuẩn hệ thống chống vỡ font tiếng Việt, không tràn viền màn hình (`word-break: break-word`).
6. **Chế độ Tàng Hình (Stealth Mode):**
   - Phím tắt `[~]` (dấu huyền dưới phím Esc): Ẩn ngay lập tức toàn bộ khung nổi và viền xanh khi có người đi qua. Bấm lại để hiện.

---

## 🚀 2. KHỞI CHẠY MÁY CHỦ SEPAY WEBHOOK (TỰ ĐỘNG CẤP MÃ)

Để hệ thống tự động nhận diện thanh toán từ SePay và tự động kích hoạt mã VIP cho học viên:

```bash
# Khởi động máy chủ Webhook SePay:
node sepay_webhook_server.js
```

Máy chủ sẽ chạy tại cổng `3000`:
* **URL Webhook cấu hình trên SePay Dashboard:** `http://<IP_HOẶC_DOMAIN_CỦA_BẠN>:3000/api/sepay-webhook`
* Khi khách quét mã VietQR và chuyển tiền:
  1. SePay gửi IPN Webhook về `sepay_webhook_server.js`.
  2. Máy chủ tự động bóc tách Machine ID, tự động sinh mã VIP 365 ngày qua `license_manager.js`.
  3. Tiện ích trên trình duyệt của khách hàng tự động nhận mã và mở khóa `💎 VIP` ngay lập tức!
  4. Máy chủ gửi thông báo tức thì về Telegram của bạn (nếu cấu hình bot).

---

## 🔑 3. CẤP MÃ THỦ CÔNG (KHI KHÁCH CHUYỂN KHOẢN TRỰC TIẾP)

Nếu khách gửi mã máy qua Zalo/Facebook và chuyển khoản trực tiếp:

```bash
# Cấp mã 365 ngày (1 năm):
node license_manager.js DP-8F3A-9B21 365

# Cấp mã 30 ngày (1 tháng):
node license_manager.js DP-8F3A-9B21 30
```

Gửi mã `DPP-9B21-271109-0E59264F` cho khách nhập vào ô `[🔑]` trên tiện ích là mở khóa vĩnh viễn.

---

## 📌 4. CẬP NHẬT BOOKMARKLET TRÊN TRÌNH DUYỆT
1. Mở file [bookmarklet.txt](file:///c:/Users/Dell/Downloads/Antigravity/Ho_Tro_Lai_Xe/bookmarklet.txt) và sao chép toàn bộ dòng mã.
2. Chuột phải vào Bookmark trên trình duyệt $\rightarrow$ Chọn **Chỉnh sửa** (Edit) $\rightarrow$ Dán đè vào ô **URL** $\rightarrow$ Bấm **Lưu**.
3. Mở trang học LotusLMS, bấm Bookmarklet để trải nghiệm bản V8.0 Thương Mại Hóa!
