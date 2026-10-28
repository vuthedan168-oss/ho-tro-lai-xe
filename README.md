# 🚗 DỰ ÁN HỖ TRỢ ĐÁP ÁN LÁI XE (LotusLMS / HueLMS)

Dự án hỗ trợ hiển thị đáp án chính xác 100% cho các bài thi và ôn luyện sa hình, luật giao thông trên hệ thống LotusLMS (Trường lái xe Đông Đô / HueLMS).

## 📌 Tính năng nổi bật
- **Chế độ An Toàn (Chống Ban):** Không can thiệp click tự động, chỉ hiển thị khung nổi đáp án để người dùng tự chọn, đảm bảo an toàn tuyệt đối trước các cơ chế giám sát gian lận (anti-cheat).
- **Nhận diện chính xác 100%:** Sử dụng cơ chế đối soát đa tầng:
  1. **Mã nhận diện ảnh Sa Hình (Image UUID):** Đọc trực tiếp đường dẫn file ảnh sa hình trên màn hình.
  2. **Khớp chính xác từng phương án (Exact Match):** So khớp tuyệt đối từng lựa chọn trên màn hình với dữ liệu ngân hàng đề thi.
  3. **Tiêu đề câu hỏi:** Khớp chuẩn câu hỏi đề bài.
- **Tự động chuyển câu:** Nhảy đáp án câu mới trong vòng 0.3 giây khi bấm "Tiếp theo".
- **Hiển thị có số ở đầu:** Hiển thị rõ số phương án (ví dụ `[Ý 1] 1-Xe con.`) kèm giải thích chi tiết luật giao thông.

## 🚀 Cách sử dụng Bookmarklet
1. Bấm tổ hợp phím `Ctrl + Shift + B` để mở thanh Dấu trang (Bookmark Bar) trên Chrome / Edge.
2. Nhấp chuột phải vào thanh Dấu trang $\rightarrow$ Chọn **Thêm trang...** (Add page / Add bookmark).
3. Đặt tên: `🚗 Hỗ Trợ Lái Xe`.
4. Mở file `bookmarklet.txt`, sao chép toàn bộ nội dung và dán vào ô **URL**.
5. Bấm **Lưu** (Save).
6. Khi làm bài thi trên trang `laixedongdo_27013.huelms.com`, chỉ cần bấm vào Bookmark này để mở khung hỗ trợ.

## 📂 Cấu trúc thư mục
- `script_nhac_bai.js`: Toàn bộ mã nguồn JavaScript đầy đủ, có chú thích chi tiết.
- `bookmarklet.txt`: Chuỗi mã nén 1 dòng sẵn sàng dùng cho Bookmarklet.
- `README.md`: Tài liệu hướng dẫn sử dụng.

---
*Tác giả: Vu The Dan (vuthedan168-oss)*
