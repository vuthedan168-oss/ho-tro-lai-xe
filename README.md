# ⚡ DRIVEPASS PRO (V8.0 Commercial Edition)
> **Trợ Lý Sát Hạch & Ôn Luyện Lái Xe Thông Minh (LotusLMS / HueLMS / Đông Đô)**
> Bản quyền phát triển: Vu The Dan <vuthedan168@gmail.com>

---

## 🎯 1. TÍNH NĂNG ĐỘT PHÁ THƯƠNG MẠI HÓA
1. **Khóa bản quyền 1 Thiết Bị - 1 Tài Khoản (Hardware & Account Lock):**
   - Tự động sinh `Mã thiết bị (Machine ID)` dựa trên phần cứng (Canvas + Screen + GPU WebGL + LMS Account UID).
   - Mã bản quyền `DPP-XXXX-YYMMDD-ZZZZ` chỉ kích hoạt được duy nhất trên máy và tài khoản đó, ngăn chặn 100% việc mua 1 mã rồi chia sẻ cho người khác.
2. **Tự động bắt gói tin khi bấm "Kiểm tra" & Tải trang (Auto-Interceptor):**
   - Tự động hook `fetch` và `XMLHttpRequest` bóc tách ngân hàng đề thi khi vào bài làm hoặc khi bấm các nút "Kiểm tra", "Bắt đầu", "Làm bài".
3. **Nạp đề thủ công đa năng (Fail-safe):**
   - Nút `[📋 Nạp Đề]` hỗ trợ lấy nhanh từ Clipboard với 1 click, dán JSON API, hoặc kéo thả file.
4. **Giao diện thương mại Light / Dark Theme:**
   - Chuyển đổi màu Sáng / Tối (`🌓`) phù hợp mọi điều kiện ánh sáng.
   - Typography chuẩn hệ thống chống vỡ font tiếng Việt, không tràn viền màn hình (`word-break: break-word`).
5. **Chế độ Tàng Hình (Stealth Mode):**
   - Phím tắt `[~]` (hoặc dấu huyền bên dưới phím Esc): Ẩn ngay lập tức toàn bộ khung nổi và viền xanh khi có người đi qua. Bấm lại để hiện.

---

## 🔑 2. HƯỚNG DẪN CẤP MÃ BẢN QUYỀN (DÀNH CHO ADMIN)

Khi khách hàng chuyển khoản và gửi `Mã máy` (ví dụ: `DP-8F3A-9B21`), bạn mở Terminal tại thư mục dự án và chạy lệnh:

```bash
# Cấp mã 365 ngày (1 năm):
node license_manager.js DP-8F3A-9B21 365

# Cấp mã 30 ngày (1 tháng):
node license_manager.js DP-8F3A-9B21 30
```

Hệ thống sẽ trả về mã:
`🔑 LICENSE KEY CẤP KHÁCH: DPP-9B21-271109-0E59264F`
Bạn chỉ cần gửi mã này cho khách hàng nhập vào ô `[🔑]` trên tiện ích là mở khóa vĩnh viễn cho máy đó.

---

## 💳 3. CƠ CHẾ TỰ ĐỘNG BÁO CHUYỂN KHOẢN VỀ MÁY (SEPAY / CASSO)
Để khách chuyển khoản là điện thoại tự báo có tiền:
1. Đăng ký tài khoản miễn phí tại **[SePay.vn](https://sepay.vn)** hoặc **[Casso.vn](https://casso.vn)**.
2. Kết nối tài khoản ngân hàng của bạn (MBBank, Vietcombank, Techcombank, ACB...).
3. Trong mục **Tích hợp Webhook**, chọn gửi thông báo về **Telegram** (hoặc tạo 1 Telegram Bot cá nhân miễn phí).
4. Cài đặt cú pháp chuyển khoản: `DPP <Mã_Máy>`.
   - Mỗi khi khách chuyển tiền: Telegram trên điện thoại của bạn sẽ lập tức "ting ting" thông báo:
     > *"Đã nhận 199.000đ từ NGUYEN VAN A. Nội dung: DPP 8F3A-9B21"*
   - Bạn chỉ cần chạy `node license_manager.js DP-8F3A-9B21` và gửi lại mã cho khách!

---

## 🚀 4. CẬP NHẬT BOOKMARKLET TRÊN TRÌNH DUYỆT
1. Mở file [bookmarklet.txt](file:///c:/Users/Dell/Downloads/Antigravity/Ho_Tro_Lai_Xe/bookmarklet.txt) và sao chép toàn bộ dòng mã.
2. Chuột phải vào Bookmark **Lái Xe** trên trình duyệt $\rightarrow$ Chọn **Chỉnh sửa** (Edit).
3. Dán đè vào ô **URL** $\rightarrow$ Bấm **Lưu** (Save).
4. Vào trang học `laixedongdo_27013.huelms.com`, bấm Bookmarklet một lần duy nhất để khởi động.
