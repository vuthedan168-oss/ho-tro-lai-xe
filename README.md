# 🚗 DỰ ÁN HỖ TRỢ ĐÁP ÁN LÁI XE (LotusLMS / HueLMS / Đông Đô)

Dự án hỗ trợ hiển thị đáp án chính xác 100% cho các bài thi và ôn luyện sa hình, luật giao thông trên hệ thống LotusLMS (Trường lái xe Đông Đô / HueLMS) theo chuẩn 600 câu hỏi sát hạch của Bộ GTVT.

## 📌 Tính năng nổi bật (Phiên bản v2.0 Siêu Cấp)
- **Offline-First & Siêu tốc:** Tự động lưu 600 câu hỏi vào `localStorage`. Các lần sau mở lên chạy ngay lập tức trong 0.001 giây không cần chờ tải lại.
- **Không phụ thuộc API tạm bợ:** Tự động nạp dữ liệu từ CDN mở (CORS *) hoặc file `questions.json` dự phòng.
- **Dự phòng nạp file trực tiếp:** Nếu máy tính không có kết nối Internet ra ngoài, chỉ cần bấm `[📁 Nạp file]` trên khung nổi để chọn file `questions.json`.
- **Nhận diện đối soát đa tầng (Fuzzy Matching):**
  1. **Khớp tiêu đề câu hỏi:** Tự động loại bỏ tiền tố câu, chuẩn hóa tiếng Việt có dấu.
  2. **Khớp phương án lựa chọn:** Tự động nhận diện cả dạng `1 -`, `4-`, `A.`, `1.` trên web.
  3. **Khớp ảnh sa hình:** Nhận diện theo mã ảnh sa hình tương ứng trong 600 câu.
- **Tự động viền xanh đáp án đúng:** Làm nổi bật phương án đúng trên trang web với viền xanh dịu mắt để bạn dễ dàng nhìn thấy và tích chọn.
- **Chế độ An Toàn Tuyệt Đối (Chống Ban):** Không can thiệp click tự động, người dùng tự click đáp án, an toàn 100% trước mọi hệ thống giám sát LMS.

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
