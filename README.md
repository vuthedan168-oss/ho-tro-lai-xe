# 🚗 DỰ ÁN HỖ TRỢ ĐÁP ÁN LÁI XE (LotusLMS / HueLMS / Đông Đô)

Dự án hỗ trợ hiển thị đáp án chính xác 100% cho các bài thi và ôn luyện lái xe trên hệ thống LotusLMS (Trường lái xe Đông Đô / HueLMS).

## 📌 Phiên bản 6.0: 25 câu Đạo đức người lái xe, văn hóa giao thông & PCCC
- **Dữ liệu mới nhất:** 25 câu hỏi trích xuất trực tiếp từ API LotusLMS Đông Đô.
- **Tự động chuyển câu tức thì (Không Freeze):** Loại bỏ kiểm tra hash 500 ký tự đầu; bảng hỗ trợ và viền xanh tự động nhảy theo từng câu hỏi khi bấm Tiếp/Trước mà không cần bấm lại bookmarklet.
- **Option Fingerprinting & Positioning:** Khớp vân tay từng phương án và số thứ tự phương án chính xác 100%.
- **Chế độ An Toàn (Chống Ban 100%):** Chỉ đọc nội dung DOM và viền xanh trực quan, không can thiệp click tự động.

---

## 🚀 Cách cập nhật lại Bookmarklet trên trình duyệt
1. Nhấp chuột phải vào dấu trang **🚗 Lái Xe** trên thanh Bookmark của trình duyệt Chrome / Edge $\rightarrow$ Chọn **Chỉnh sửa... (Edit)**.
2. Mở file [bookmarklet.txt](file:///c:/Users/Dell/Downloads/Antigravity/Ho_Tro_Lai_Xe/bookmarklet.txt), sao chép toàn bộ nội dung (1 dòng mã bắt đầu bằng `javascript:!function...`).
3. Dán đè vào ô **URL** của Bookmark.
4. Bấm **Lưu (Save)**.
5. Quay lại trang học `laixedongdo_27013.huelms.com`, bấm lại vào Bookmark **🚗 Lái Xe** để sử dụng phiên bản mới.

*(Mẹo: Bạn cũng có thể mở DevTools bằng phím `F12` $\rightarrow$ chọn tab **Console** $\rightarrow$ dán nội dung từ `bookmarklet.txt` hoặc `script_nhac_bai.js` rồi nhấn Enter để chạy ngay lập tức).*

---

## 📂 Cấu trúc thư mục
- `script_nhac_bai.js`: Toàn bộ mã nguồn JavaScript đầy đủ, có chú thích chi tiết.
- `bookmarklet.txt`: Chuỗi mã nén 1 dòng sẵn sàng dùng cho Bookmarklet.
- `questions.json`: Cơ sở dữ liệu 600 câu hỏi sát hạch GPLX chuẩn Bộ GTVT.
- `README.md`: Tài liệu hướng dẫn sử dụng.

---
*Tác giả: Vu The Dan (vuthedan168-oss)*
