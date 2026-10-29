/**
 * 🚗 DỰ ÁN: HỖ TRỢ THI & ÔN LUYỆN LÁI XE (LotusLMS / HueLMS / Đông Đô)
 * Tác giả: Vu The Dan <vuthedan168@gmail.com>
 * Ngân hàng dữ liệu: 78 câu hỏi Sa hình chuẩn sát hạch Đông Đô (Offline 100/100 không phụ thuộc mạng / CSP)
 * 
 * Phiên bản: 2.2 (Offline nhúng sẵn toàn diện)
 * - Tích hợp trực tiếp 78 câu sa hình Đông Đô vào mã nguồn (0ms tải, không lỗi CSP mạng)
 * - Đối soát kép: Tên file ảnh Sa hình (UUID) + Nội dung câu hỏi toàn trang (Page FullText)
 * - Quét và làm sáng viền xanh lá (3px) chính xác vào phương án đúng trên giao diện LotusLMS
 * - Hỗ trợ nạp thêm câu hỏi qua Dán JSON / Tải file
 */

(function () {
  var old = document.getElementById("htlx-box");
  if (old) old.remove();

  var CACHE_KEY = "HTLX_600_LOTUS_V22";

  // Dữ liệu 78 câu Sa hình LotusLMS Đông Đô được tích hợp sẵn (Hoạt động offline, không lỗi mạng/CSP)
  var EMBEDDED_DATA = [["Theo hướng mũi tên, xe nào chấp hành đúng quy tắc giao thông?",3,"3-Chỉ xe con.","1. Xe khách: Sai làn, Đi thẳng đèn đang đỏ; 2. Xe tải: Sai làn: Đi trên làn đi thẳng trong khi thực hiện rẽ trái. 3. Xe mô tô: Sai làn: Đi trên làn rẽ trái trong khi thực hiện rẽ phải, 4. Xe con: Đèn xanh rẽ phải: Đúng đèn đúng làn.","682d9e3b73a5bf2756108f57.png",["1-Xe khách, xe tải, xe mô tô.","2-Xe tải, xe mô tô.","3-Chỉ xe con."]],["Theo tín hiệu đèn của xe cơ giới, xe nào vi phạm quy tắc giao thông?",4,"4-Cả hai xe.","Biển số R.301a chỉ cho phép các phương tiện đi thẳng trong khi cả hai xe đều có tín hiệu xi nhan rẽ sang hướng khác nên cả 2 xe đều vi phạm quy tắc giao thông.","682d9e29807da83a7a0c564e.png",["1-Xe mô tô.","2-Xe ô tô con.","3-Không xe nào vi phạm.","4-Cả hai xe."]],["Xe của bạn được đi theo hướng nào trong trường hợp này?",1,"1-Đi thẳng, rẽ trái.","Làn đường mà xe của bạn đang đi chỉ được đi thẳng hoặc rẽ trái thôi. Nếu bạn chọn rẽ phải là bị đèn tín hiệu nó lừa rồi đó.","682d9e1d69c743cafe016bd5.png",["1-Đi thẳng, rẽ trái.","2-Đi thẳng, rẽ phải.","3-Rẽ trái.","4-Đi thẳng, rẽ phải, rẽ trái."]],["Xe nào phải dừng lại trong trường hợp này?",1,"1-Xe con.","Xe con dừng lại vì phía trước là tín hiệu đèn đỏ. Xe của bạn được đi vì rẽ phải trước đèn đỏ nên không vi phạm.","682d9d8eadadd4b27d00c410.png",["1-Xe con.","2-Xe của bạn.","3-Cả hai xe."]],["Các xe đi theo thứ tự nào là đúng quy tắc giao thông đường bộ?",2,"2-Xe con, xe của bạn, xe mô tô.","Thứ tự ưu tiên: Xe ưu tiên - Đường ưu tiên - Đường cùng cấp: Bên phải trống, rẽ phải, đi thẳng, rẽ trái. 1. Xe con: Rẽ phải; 2. Xe của bạn: Đi thẳng; 3. Mô tô: Rẽ trái.","682d9d8455b10c9223019d06.png",["1-Xe của bạn, xe mô tô, xe con.","2-Xe con, xe của bạn, xe mô tô.","3-Xe mô tô, xe con, xe của bạn."]],["Các xe đi theo thứ tự nào là đúng quy tắc giao thông đường bộ?",3,"3-Xe mô tô, xe con, xe của bạn.","Thứ tự ưu tiên: Xe ưu tiên - Đường ưu tiên - Bên phải trống - Rẽ phải - Đi thẳng - Rẽ trái. Biển báo phía trước là đường ưu tiên và biển phụ báo hướng di chuyển của xe mô tô là hướng ưu tiên. 1. Xe mô tô: Đường ưu tiên; 2. Xe con: Đường không ưu tiên, bên phải trống; 3. Xe của bạn: Đường không ưu tiên, bên phải vướng xe con.","682d9e0c2ba5b3959c08d443.png",["1-Xe của bạn, xe mô tô, xe con.","2-Xe con, xe của bạn, xe mô tô.","3-Xe mô tô, xe con, xe của bạn."]],["Trong hình dưới, những xe nào vi phạm quy tắc giao thông?",3,"3-Xe tải ( D), xe con (B).","Xe con (B) và xe tải (D) đang đè lên vạch liền phân tách làn đường nên vi phạm quy tắc giao thông.","682d9e145e286037240c6348.png",["1-Xe con (A), xe con (B), xe tải (D).","2-Xe tải (D), xe con (E), xe buýt (G).","3-Xe tải ( D), xe con (B).","4-Xe con (B), xe con (C)."]],["Các xe đi theo hướng mũi tên, xe nào chấp hành đúng quy tắc giao thông?",2,"2-Xe khách, xe mô tô.","Xe con và xe tải: Vi phạm tín hiệu đèn; Xe khách và xe mô tô: Đúng làn đường và đúng tín hiệu đèn.","682d9e28c1b6605fdf01bfc0.png",["1-Xe tải, xe mô tô.","2-Xe khách, xe mô tô.","3-Xe tải, xe con.","4-Xe mô tô, xe con."]],["Trong tình huống dưới đây, để tránh xe phía trước bị hỏng đột xuất trên đường, người lái xe phải làm gì?",2,"2-Quan sát phía trước, phía sau, khi đủ điều kiện an toàn, bật tín hiệu bằng đèn hoặc còi rồi cho xe chạy vượt qua.","Chú ý quan sát, bật tín hiệu đèn, còi rồi mới được vượt nên Đáp án 2 trong trường hợp này mô tả chính xác.","682d9e1b12cbb1c04f05f720.png",["1-Đánh lái sang trái cho xe vượt qua.","2-Quan sát phía trước, phía sau, khi đủ điều kiện an toàn, bật tín hiệu bằng đèn hoặc còi rồi cho xe chạy vượt qua.","3-Cấm vượt."]],["Các xe đi theo hướng mũi tên, xe nào vi phạm quy tắc giao thông?",1,"1-Xe khách, xe tải.","Xe con đúng làn đường và tín hiệu đèn. Xe khách: Sai làn đường; Xe tải: Sai làn đường và tín hiệu đèn.","682d9e028c13f1e3f8064095.png",["1-Xe khách, xe tải.","2-Xe khách, xe con.","3-Xe con, xe tải.","4-Xe khách, xe tải, xe con."]],["Các xe đi theo hướng mũi tên, xe nào vi phạm quy tắc giao thông?",2,"2-Xe tải, xe khách, xe mô tô.","Xe con đi đúng làn đường theo hướng rẽ và tín hiệu đèn. Xe khách: Sai làn đường và tín hiệu đèn. Xe tải: Đi thẳng vi phạm đèn đỏ. Xe mô tô: Đi thẳng vi phạm đèn đỏ.","682d9df8c19f09734003fb39.png",["1-Xe con, xe tải, xe khách.","2-Xe tải, xe khách, xe mô tô.","3-Xe khách, xe mô tô, xe con.","4-Cả bốn xe."]],["Các xe đi theo hướng mũi tên, những xe nào vi phạm quy tắc giao thông?",3,"3-Xe khách, xe tải.","Xe con và xe mô tô đang ở đúng làn đường, đúng hướng rẽ với tín hiệu đèn xanh nên đúng quy tắc giao thông. Xe khách và xe tải đang ở sai làn đường so với hướng rẽ nên đều vi phạm.","682d9de309df238c1c077010.png",["1-Xe tải, xe con.","2-Xe khách, xe con.","3-Xe khách, xe tải."]],["Các xe đi theo hướng mũi tên, xe nào vi phạm quy tắc giao thông?",2,"2-Xe tải.","Xe con trong cả hai phía đều đang ở đúng làn đường và đi theo hướng mà đèn xanh đang bật nên đúng quy tắc. Xe tải trong cả hai phía đều ở sai làn đường so với hướng rẽ nên vi phạm quy tắc giao thông.","682d9df3f7c37844b80ab33f.png",["1-Xe con.","2-Xe tải.","3-Xe con, xe tải."]],["Bạn được dừng xe ở vị trí nào trong tình huống này?",4,"4-Không được dừng.","Biển số P.130 “Cấm dừng xe và đỗ xe” và biển phụ báo phạm vi trước và sau biển báo nên không được phép dừng xe tại cả 2 vị trí A và B.","682d9e1ae16aa1886a04599b.png",["1-Được phép dừng ở vị trí A.","2-Được phép dừng ở vị trí B.","3-Được phép dừng ở vị trí A và B.","4-Không được dừng."]],["Bạn xử lý như thế nào trong trường hợp này?",2,"2-Giảm tốc độ, rẽ phải sau xe tải và xe đạp.","Xe tải đã vào nơi giao nhau trước nên sẽ được ưu tiên trước. Biển báo phía trước là đường ưu tiên dành cho xe thô sơ nên phải nhường đường cho xe đạp. Do đó, xe bạn rẽ phải sau xe tải và xe đạp.","682d9e1742439ae7ca005042.png",["1-Tăng tốc độ, rẽ phải trước xe tải và xe đạp.","2-Giảm tốc độ, rẽ phải sau xe tải và xe đạp.","3-Tăng tốc độ, rẽ phải trước xe đạp."]],["Người lái xe dừng tại vị trí nào là đúng quy tắc giao thông?",3,"3-Vị trí B và C.","Vị trí A vi phạm do dừng bên trái đường. Biển số P.131a “Cấm đỗ xe” không cấm dừng xe. Do đó vị trí dừng tại B và C là câu trả lời đúng.","682d9d9cbe6bb68f3e08e55b.png",["1-Vị trí A và B.","2-Vị trí A và C.","3-Vị trí B và C.","4-Cả ba vị trí A, B, C."]],["Bạn có được phép vượt xe mô tô phía trước không?",2,"2-Không được vượt.","Tại nơi giao nhau, trên đoạn đường có làn đường dành cho người đi bộ cắt ngang thì không được phép vượt.","682d9daa0acaf4e247051928.png",["1-Cho phép.","2-Không được vượt."]],["Người lái xe có được phép vượt xe tải để đi thẳng trong trường hợp này không?",2,"2-Cấm vượt.","Tại nơi giao nhau, trên đoạn đường có làn đường dành cho người đi bộ cắt ngang thì không được phép vượt.","682d9d9025d8a0fb0c0a6af0.png",["1-Được vượt.","2-Cấm vượt."]],["Trong hình dưới, những xe nào chấp hành quy tắc giao thông?",2,"2-Xe con (A), xe con (C), xe con (E), xe buýt (G).","Xe con (B) và xe tải (D) đang đè lên vạch liền phân tách làn đường nên vi phạm quy tắc giao thông. Các xe còn lại (A, C, E, G) là đúng quy tắc giao thông.","682d9e145e286037240c6348.png",["1-Xe tải ( D), xe con (B).","2-Xe con (A), xe con (C), xe con (E), xe buýt (G).","3-Xe con (A), xe con (B), xe tải (D)."]],["Theo tín hiệu đèn, xe nào phải dừng lại là đúng quy tắc giao thông?",3,"3-Xe con, xe tải.","Xe con và xe tải đang ở trên làn đường có tín hiệu đèn đỏ nên phải dừng lại.","682d9dc1973a72d86d075e31.png",["1-Xe khách, xe mô tô.","2-Xe tải, xe mô tô.","3-Xe con, xe tải."]],["Khi muốn vượt xe tải, người lái xe phải làm gì là đúng quy tắc giao thông?",2,"2-Bật tín hiệu báo hiệu bằng đèn hoặc còi, khi đủ điều kiện an toàn, tăng tốc cho xe chạy vượt qua.","Chú ý vạch kẻ đường ngăn cách với làn bên trái là vạch liền. Bạn phải bật tín hiệu báo hiệu cho đến khi xe tải phía trước giảm tốc độ và chuyển qua làn bên phải thì bạn mới có thể tăng tốc cho xe vượt qua.","682d9db38c422a21490deb26.png",["1-Tăng tốc cho xe chạy vượt qua.","2-Bật tín hiệu báo hiệu bằng đèn hoặc còi, khi đủ điều kiện an toàn, tăng tốc cho xe chạy vượt qua.","3-Đánh lái sang làn bên trái và tăng tốc cho xe chạy vượt qua."]],["Thứ tự các xe đi như thế nào là đúng quy tắc giao thông?",3,"3-Xe của bạn và xe con, xe tải.","Thứ tự ưu tiên: Xe ưu tiên - Đường ưu tiên - Bên phải trống - Rẽ phải - Đi thẳng - Rẽ trái. Xe bạn đang trên đường ưu tiên nên được đi trước. Xe con rẽ phải không giao nhau với xe bạn nên được đi đồng thời với xe bạn. Xe tải rẽ trái từ đường không ưu tiên phải nhường đi sau cùng.","682d9dd094a5ec509b0218c5.png",["1-Xe con và xe tải, xe của bạn.","2-Xe của bạn, xe tải, xe con.","3-Xe của bạn và xe con, xe tải.","4-Xe của bạn, xe tải + xe con."]],["Người lái xe có thể quay đầu xe như thế nào là đúng quy tắc giao thông?",1,"1-Quay đầu theo hướng A.","Trước mặt người lái xe có Biển số P.123a “Cấm rẽ trái” không cấm quay đầu. Tuy nhiên, hướng B quay đầu đè vạch liền nên vi phạm. Do đó, chỉ có hướng A quay đầu xe là câu trả lời đúng.","682d9ddbc1b6605fdf01bf6b.png",["1-Quay đầu theo hướng A.","2-Quay đầu theo hướng B.","3-Cấm quay đầu."]],["Xe nào đi trước là đúng quy tắc giao thông?",2,"2-Xe tải.","Trước mặt xe của bạn có Biển số W.208 “Giao nhau với đường ưu tiên” nên phải ưu tiên các xe đang đi trên đường ưu tiên. Xe tải được ưu tiên trong trường hợp này.","682d9de7913948b5340f5173.png",["1-Xe của bạn.","2-Xe tải."]],["Trong hình dưới, những xe nào vi phạm quy tắc giao thông?",3,"3-Xe con (E), xe mô tô (D).","Nhìn vào bảng chỉ dẫn loại phương tiện theo làn đường: Xe con (E) đi trên làn dành riêng cho mô tô nên vi phạm: Xe mô tô (D) chạy trên làn dành riêng xe ô tô nên cũng vi phạm.","682d9df0429d256fdb0a8312.png",["1-Xe con (B), xe mô tô (C).","2-Xe con (A), xe mô tô (C).","3-Xe con (E), xe mô tô (D).","4-Tất cả các loại xe trên."]],["Người lái xe điều khiển xe rẽ trái như thế nào là đúng quy tắc giao thông?",3,"3-Nhường đường cho xe buýt và xe tải.","Xe tải đã vào nơi giao nhau trước nên được đi đầu tiên; Tiếp theo xe buýt: Đi thẳng; Cuối cùng là xe của bạn: Rẽ trái.","682d9dc0a9c163e758085d55.png",["1-Rẽ trái ngay trước xe buýt.","2-Rẽ trái trước xe tải.","3-Nhường đường cho xe buýt và xe tải."]],["Xe nào phải nhường đường là đúng quy tắc giao thông?",2,"2-Xe con (B).","Xe con (A) đang đi trước và xi nhan trái nên được đi trước, xe con (B) xi nhan phải và đi sau nên phải nhường.","682d9db5fa69d1ccd10d0ce5.png",["1-Xe con (A).","2-Xe con (B)."]],["Xe của bạn được đi theo hướng nào trong trường hợp này?",3,"3-Dừng lại trước vạch dừng và đi thẳng hoặc rẽ trái khi đèn xanh.","Bạn phải dừng lại chờ đèn đỏ và làn đường bạn đang dừng xe chỉ được rẽ trái hoặc đi thẳng khi đèn xanh.","682d9e27aeebbe8d890b0c53.png",["1-Chuyển sang làn đường bên phải và rẽ phải.","2-Dừng lại trước vạch dừng và rẽ phải khi đèn xanh.","3-Dừng lại trước vạch dừng và đi thẳng hoặc rẽ trái khi đèn xanh."]],["Bạn xử lý như thế nào trong trường hợp này?",3,"3-Giảm tốc độ, để người đi bộ qua đường và rẽ phải sau xe con màu xanh.","Ở vạch kẻ đường dành cho người đi bộ có người chuẩn bị sang đường nên phải nhường đường và không được phép vượt. Nên bạn phải nhường đường cho người đi bộ và rẽ phải sau xe con màu xanh.","682d9e0aa266753db404bccc.png",["1-Tăng tốc độ, rẽ phải trước xe con màu xanh phía trước và người đi bộ.","2-Giảm tốc độ, để người đi bộ qua đường và rẽ phải trước xe con màu xanh.","3-Giảm tốc độ, để người đi bộ qua đường và rẽ phải sau xe con màu xanh."]],["Để điều khiển cho xe đi thẳng, người lái xe phải làm gì là đúng quy tắc giao thông?",1,"1-Nhường xe con rẽ trái trước.","Người lái xe phải nhường đường xe con rẽ trái trước vì xe con rẽ trái đã vào nơi giao nhau trước (đã qua vạch).","682d9dddc19f09734003fb11.png",["1-Nhường xe con rẽ trái trước.","2-Đi thẳng không nhường."]],["Xe nào được đi trước trong trường hợp này?",2,"2-Xe của bạn.","Thứ tự ưu tiên: Xe ưu tiên - Đường ưu tiên - Bên phải trống - Rẽ phải - Đi thẳng - Rẽ trái. Xe của bạn trên đường ưu tiên (theo biển báo) nên được đi trước.","682d9e072f578f700f098618.png",["1-Xe con.","2-Xe của bạn."]],["Trong tình huống dưới đây, xe con màu vàng vượt xe con màu đỏ là đúng quy tắc giao thông hay không?",1,"1-Đúng.","Xe màu đỏ đang tránh về phía bên phải, xe màu vàng đã có tín hiệu xin vượt, vạch kẻ đường theo hướng xe chạy là nét đứt , không có xe ngược chiều. Nên xe vàng vượt đúng quy tắc giao thông.","682d9e185282e4e64407c37f.png",["1-Đúng.","2-Không đúng."]],["Trong tình huống dưới đây, xe con màu đỏ có được phép vượt khi xe con màu xanh đang vượt xe tải hay không?",2,"2-Không được vượt.","Xe xin vượt chỉ được vượt khi không có chướng ngại vật phía trước, không có xe chạy ngược chiều trong đoạn đường định vượt, xe chạy trước không có tín hiệu vượt xe khác và đã tránh về bên phải. Do đó, xe màu đỏ không được vượt.","682d9e0811fd8b63750a8a30.png",["1-Được vượt.","2-Không được vượt."]],["Trong tình huống dưới đây, xe con màu đỏ nhập làn đường cao tốc theo hướng mũi tên là đúng hay sai?",2,"2-Sai.","Khi nhập làn cao tốc phải chạy dọc theo làn tạm để đủ thời gian quan sát, khoảng cách an toàn và đủ tốc độ trước khi di chuyển vào làn cao tốc nên trong tình huống này xe màu đỏ sai khi nhập làn cao tốc.","682d9d7fa1d8f0e54d02ae22.png",["1-Đúng.","2-Sai."]],["Xe của bạn đang di chuyển gần đến khu vực giao cắt với đường sắt, khi rào chắn đang dịch chuyển, bạn điều khiển xe như thế nào là đúng quy tắc giao thông?",2,"2-Dừng lại trước rào chắn một khoảng cách an toàn.","Bắt buộc phải dừng xe.","682d9d945e139762aa0e74f1.png",["1-Quan sát nếu thấy không có tàu thì tăng tốc cho xe vượt qua đường sắt.","2-Dừng lại trước rào chắn một khoảng cách an toàn.","3-Ra tín hiệu, yêu cầu người gác chắn tàu kéo chậm barie để xe bạn qua."]],["Khi gặp xe ngược chiều bật đèn pha trong tình huống dưới đây, bạn xử lý như thế nào?",2,"2-Giữ nguyên đèn chiếu gần, giảm tốc độ, đi sau xe phía trước.","Giữ nguyên đèn chiếu gần và giảm tốc độ do không thể quan sát rõ phía trước.","682d9daedda92ebd36018ad3.png",["1-Bật đèn chiếu xa, tăng tốc độ vượt xe cùng chiều.","2-Giữ nguyên đèn chiếu gần, giảm tốc độ, đi sau xe phía trước.","3-Giữ nguyên đèn chiếu gần, tăng tốc độ vượt xe cùng chiều."]],["Để điều khiển xe rẽ trái, bạn chọn hướng đi nào dưới đây?",1,"1-Hướng 1.","Vạch kẻ đường nét đứt màu vàng, phân chia 2 chiều xe chạy. Do đó, hướng 2 sẽ đi bên trái đường 1 đoạn nên không được phép. Do đó, bạn chỉ được chọn theo hướng 1 để rẽ trái.","682d9d99baa59922a4094b9e.png",["1-Hướng 1.","2-Hướng 2.","3-Cả hai hướng đều được."]],["Các xe đi theo thứ tự nào là đúng quy tắc giao thông đường bộ?",3,"3-Xe của bạn, xe tải, xe đạp.","Thứ tự ưu tiên: Xe ưu tiên - Đường ưu tiên - Bên phải trống - Rẽ phải - Đi thẳng - Rẽ trái. 1. Xe của bạn: Bên phải trống, đi thẳng; 2. Xe tải: Rẽ trái, bên phải trống (khi xe bạn đã đi rồi); 3. Xe đạp: Rẽ trái.","682d9de0116d7e02520576a9.png",["1-Xe tải, xe đạp, xe của bạn.","2-Xe của bạn, xe đạp, xe tải.","3-Xe của bạn, xe tải, xe đạp."]],["Xe nào dừng đúng theo quy tắc giao thông?",1,"1-Xe con.","Biển số W.211a “Giao nhau với đường sắt không có rào chắn” thì các phương tiện đứng cách xa đường sắt tối thiểu 5m nên xe con đúng.","682d9dcbba5ba3e8500fd30f.png",["1-Xe con.","2-Xe mô tô.","3-Cả 2 xe đều đúng."]],["Xe nào được đi trước trong trường hợp này?",1,"1-Xe tải.","Thứ tự ưu tiên: Xe ưu tiên - Đường ưu tiên - Bên phải trống - Rẽ phải - Đi thẳng - Rẽ trái. 1. Xe tải: Đi thẳng; 2. Xe của bạn: Rẽ trái.","682d9db0563258070008a98d.png",["1-Xe tải.","2-Xe của bạn."]],["Bạn xử lý như thế nào trong trường hợp này?",3,"3-Giảm tốc độ cho xe đi sát phần đường bên phải.","Phía trước khuất tầm nhìn, bên trái làn đường là vạch liền nên bạn cần phải giảm tốc độ, đi sát làn đường bên phải để đảm bảo đi đúng làn đường.","682d9dc6fbf472ac74023077.png",["1-Tăng tốc độ cho xe lấn sang phần đường bên trái.","2-Giảm tốc độ cho xe lấn sang phần đường bên trái.","3-Giảm tốc độ cho xe đi sát phần đường bên phải."]],["Các xe đi theo thứ tự nào là đúng quy tắc giao thông đường bộ?",2,"2-Xe tải, xe con, xe của bạn.","Thứ tự ưu tiên: Xe ưu tiên - Đường ưu tiên - Bên phải trống - Rẽ phải - Đi thẳng - Rẽ trái. 1. Xe tải: Bên phải trống; 2. Xe con: Đi thẳng; 3. Xe của bạn: Rẽ trái.","682d9df5d8f5be428303f0e6.png",["1-Xe con, xe tải, xe của bạn.","2-Xe tải, xe con, xe của bạn.","3-Xe tải, xe của bạn, xe con."]],["Bạn xử lý như thế nào trong trường hợp này?",3,"3-Giảm tốc độ, để người đi bộ sang đường trước, sau đó cho xe đi qua vạch người đi bộ sang đường.","Trước mặt bạn có biển I.423a “Đường người đi bộ sang ngang” nên bạn phải giảm tốc độ và nhường đường cho người đi bộ sang đường.","682d9de2501dde858b0183b6.png",["1-Tăng tốc độ, đi qua vạch người đi bộ sang đường, để người đi bộ sang đường sau.","2-Giảm tốc độ, đi qua vạch người đi bộ sang đường, để người đi bộ sang đường sau.","3-Giảm tốc độ, để người đi bộ sang đường trước, sau đó cho xe đi qua vạch người đi bộ sang đường."]],["Bạn xử lý như thế nào trong trường hợp này?",3,"3-Nhường đường cho xe đạp và xe khách.","Trước mặt bạn có biển Biển số R.122 “Dừng lại” nên phải dừng xe và nhường đường. Nên xe của bạn phải nhường đường cho xe đạp và xe khách.","682d9df270550be1f401e376.png",["1-Nhường đường cho xe khách và đi trước xe đạp.","2-Nhường đường cho xe đạp và đi trước xe khách.","3-Nhường đường cho xe đạp và xe khách."]],["Xe nào phải nhường đường trong trường hợp này?",2,"2-Xe của bạn.","Trước mặt xe của bạn có Biển số P.132 “Nhường đường cho xe cơ giới đi ngược chiều qua đường hẹp” nên phải nhường đường.","682d9dc9f0de738d4d0fb3e2.png",["1-Xe con.","2-Xe của bạn."]],["Xe nào phải nhường đường trong trường hợp này?",1,"1-Xe của bạn.","Thứ tự ưu tiên: Xe ưu tiên - Đường ưu tiên - Bên phải trống - Rẽ phải - Đi thẳng - Rẽ trái. 1. Xe con: Đường ưu tiên; 2. Xe của bạn: Đường không ưu tiên nên phải nhường đường.","682d9db2eba782bd0c084e7f.png",["1-Xe của bạn.","2-Xe con."]],["Các xe đi theo thứ tự nào là đúng quy tắc giao thông đường bộ?",4,"4-Xe của bạn, xe con, xe tải.","Thứ tự ưu tiên: Xe ưu tiên - Đường ưu tiên - Bên phải trống - Rẽ phải - Đi thẳng - Rẽ trái. 1. Xe của bạn: Đường ưu tiên; 2. Xe con: Đi không ưu tiên, đi thẳng; 3. Xe tải: Đường không ưu tiên, rẽ trái.","682d9dc48369c3f18b101994.png",["1-Xe của bạn, xe tải, xe con.","2-Xe con, xe tải, xe của bạn.","3-Xe tải, xe của bạn, xe con.","4-Xe của bạn, xe con, xe tải."]],["Các xe đi theo thứ tự nào là đúng quy tắc giao thông đường bộ?",3,"3-Xe đạp, xe mô tô, xe của bạn.","Thứ tự ưu tiên: Xe ưu tiên - Đường ưu tiên - Bên phải trống - Rẽ phải - Đi thẳng - Rẽ trái. 1. Xe đạp: Bên phải trống; 2. Xe mô tô: Đi thẳng; 3. Xe của bạn: Rẽ trái.","682d9d7e24497a6b1e0e6623.png",["1-Xe của bạn, xe mô tô, xe đạp.","2-Xe mô tô, xe đạp, xe của bạn.","3-Xe đạp, xe mô tô, xe của bạn."]],["Bạn xử lý như thế nào trong trường hợp này?",3,"3-Giảm tốc độ và đi thẳng qua ngã tư.","Trước mặt là Biển số W.208 “Giao nhau với đường ưu tiên” nên bạn phải giảm tốc độ, quan sát nhường đường ưu tiên nếu có và đi qua ngã tư.","682d9d9613b64ffeab0fd325.png",["1-Tăng tốc độ và đi thẳng qua ngã tư.","2-Dừng xe trước vạch dừng.","3-Giảm tốc độ và đi thẳng qua ngã tư."]],["Xe tải phía trước có tín hiệu xin chuyển làn đường, bạn xử lý như thế nào trong trường hợp này?",2,"2-Phanh xe giảm tốc độ chờ xe tải phía trước chuyển làn đường.","Không được vượt khi phía trước có xe đang chuyển làn đường. Do đó, để đảm bảo an toàn bạn cần phanh xe giảm tốc độ chờ xe tải phía trước chuyển làn đường.","682d9daccd0ca6ba3505f330.png",["1-Bật tín hiệu xin chuyển làn đường sang trái để vượt xe tải.","2-Phanh xe giảm tốc độ chờ xe tải phía trước chuyển làn đường.","3-Bấm còi báo hiệu và vượt qua xe tải trên làn đường của mình."]],["Phía trước có một xe màu xanh đang vượt xe màu vàng trên làn đường của bạn, bạn xử lý như thế nào trong trường hợp này?",1,"1-Phanh xe giảm tốc độ và đi sát lề đường bên phải.","Vì xe màu xanh đang trên làn đường của bạn, để đảm bảo an toàn, bạn cần phanh xe giảm tốc độ và đi sát lề đường bên phải.","682d9d9bb49a9f0f270b29f3.png",["1-Phanh xe giảm tốc độ và đi sát lề đường bên phải.","2-Bấm còi, nháy đèn báo hiệu, giữ nguyên tốc độ và đi tiếp.","3-Phanh xe giảm tốc độ và đi sát vào lề đường bên trái."]],["Bạn xử lý như thế nào khi xe phía trước đang lùi ra khỏi nơi đỗ?",3,"3-Giảm tốc độ, dừng lại nhường đường.","Không được vượt khi phía trước có chướng ngại vật hay xe chạy ngược chiều. Do đó, cần giảm tốc độ, dừng lại nhường đường.","682d9dcd31eb8b48850c177f.png",["1-Chuyển sang nửa đường bên trái để đi tiếp.","2-Bấm còi, nháy đèn báo hiệu và đi tiếp.","3-Giảm tốc độ, dừng lại nhường đường."]],["Phía trước có một xe đang lùi vào nơi đỗ, xe con phía trước đang chuyển sang làn đường bên trái, bạn xử lý như thế nào trong trường hợp này?",4,"4-Ý 1 và ý 2.","Cần quan sát kỹ xe phía sau trong tình huống này để có hành động hợp lý. Nếu không có xe xin vượt chuyển làn trái đi tiếp. Nếu có xe xin vượt thì giảm tốc độ, ở lại làn đường hoặc dừng lại nếu cần thiết.","682d9ddff83ada6362090934.png",["1-Nếu phía sau không có xe xin vượt, chuyển sang làn đường bên trái.","2-Nếu phía sau có xe xin vượt, thì giảm tốc độ, ở lại làn đường, dừng lại khi cần thiết.","3-Tăng tốc độ trên làn đường của mình và vượt xe con.","4-Ý 1 và ý 2."]],["Bạn xử lý như thế nào khi lái xe ô tô vượt qua đoàn người đi xe đạp có tổ chức?",2,"2-Không được vượt những người đi xe đạp.","Xe của bạn không được vượt khi bên trái có chướng ngại vật hay xe ngược chiều.","682d9e053ffb9ed3d60f0a5c.png",["1-Tăng tốc độ, chuyển sang làn đường bên trái để vượt.","2-Không được vượt những người đi xe đạp."]],["Xe nào phải nhường đường trong trường hợp này?",2,"2-Xe của bạn.","Xe bạn không thể vượt khi phía trước có chướng ngại vật hoặc xe đi ngược chiều. Nên xe bạn phải nhường đường trong tình huống này.","682d9df7c907e3785408d2bd.png",["1-Xe đi ngược chiều.","2-Xe của bạn."]],["Xe nào phải nhường đường trong trường hợp này?",2,"2-Xe tải.","Biển W.207c “Giao nhau với đường không ưu tiên” cho biết xe tải đi từ đường không ưu tiên nên phải nhường đường.","682d9de5dc91772760078be7.png",["1-Xe con.","2-Xe tải.","3-Xe của bạn."]],["Người lái xe điều khiển xe đi theo hướng nào là đúng quy tắc giao thông?",2,"2-Hướng 1 và 2.","Hướng 4: Biển số P.123b “Cấm rẽ phải”; Hướng 3: Biển số P.102 “Cấm đi ngược chiều”; Nên chỉ có thể đi theo hướng 1 và hướng 2 là câu trả lời đúng.","682d9dcec1d056fe510710d5.png",["1-Chỉ hướng 2.","2-Hướng 1 và 2.","3-Tất cả các hướng trừ hướng 3.","4-Tất cả các hướng trừ hướng 4."]],["Trong hình dưới, những xe nào vi phạm quy tắc giao thông?",1,"1-Xe con (E), xe mô tô (C).","Xe mô tô C chạy vào làn dành riêng xe ô tô: Vi phạm; Xe con E chạy vào làn dành riêng xe máy: Vi phạm.","682d9d9eb07e73eb3f07380c.png",["1-Xe con (E), xe mô tô (C).","2-Xe tải (A), xe mô tô (D).","3-Xe khách (B), xe mô tô (C).","4-Xe khách (B), xe mô tô (D)."]],["Theo hướng mũi tên, thứ tự các xe đi như thế nào là đúng quy tắc giao thông?",2,"2-Xe tải, xe mô tô, xe khách, xe con.","Thứ tự ưu tiên: Xe ưu tiên - Đường ưu tiên - Đường cùng cấp theo thứ tự bên phải trống - rẽ phải - đi thẳng - rẽ trái. 1. Xe tải: Đường ưu tiên và đi thẳng; 2. Mô tô: Đường ưu tiên và rẽ trái; 3. Xe khách: Đường không ưu tiên, đi thẳng. 4. Xe con: Đường không ưu tiên, rẽ trái.","682d9d66ec71b2e3240dfbf7.png",["1-Xe tải, xe khách, xe con, xe mô tô.","2-Xe tải, xe mô tô, xe khách, xe con.","3-Xe khách, xe tải, xe con, xe mô tô.","4-Xe mô tô, xe khách, xe tải, xe con."]],["Trong trường hợp này xe nào được quyền đi trước?",2,"2-Xe quân sự đi làm nhiệm vụ khẩn cấp.","Xe ưu tiên cùng cấp nên áp dụng thứ tự đường cùng cấp: Bên phải trống - Rẽ phải - Đi thẳng - Rẽ trái. Xe quân sự được ưu tiên trước do bên phải trống.","682d9e3fc8a22d266f0e7597.png",["1-Xe công an đi làm nhiệm vụ khẩn cấp.","2-Xe quân sự đi làm nhiệm vụ khẩn cấp."]],["Theo hướng mũi tên, những hướng nào xe ô tô không được phép đi?",2,"2-Hướng 3.","Biển P.123a “Cấm rẽ trái” không cấm quay đầu xe nên chỉ có hướng 3 là hướng ô tô không được phép đi.","682d9e6bbbfbb7e862023657.png",["1-Hướng 1 và 2.","2-Hướng 3.","3-Hướng 1 và 4.","4-Hướng 2 và 3."]],["Theo hướng mũi tên, hướng nào xe không được phép đi?",2,"2-Chỉ hướng 1.","Hướng 1 có biển cấm ô tô nên xe ô tô đương nhiên không được phép đi vào rồi.","682d9e5b634c333a4f097d9a.png",["1-Hướng 2 và 5.","2-Chỉ hướng 1."]],["Xe tải kéo xe mô tô ba bánh như hình này có đúng quy tắc giao thông không?",2,"2-Không đúng.","Xe tải kéo xe mô tô 3 bánh như trên hình là không đúng vì đi vào đường có biển P.108 “Cấm ô tô kéo moóc” kể cả xe máy kéo, xe ô tô khách kéo theo rơ moóc đi qua.","682d9e4f80ee24552102162e.png",["1-Đúng.","2-Không đúng."]],["Xe nào đỗ vi phạm quy tắc giao thông?",3,"3-Cả ba xe.","Xe tải đậu trái đường; Xe con và mô tô đậu xe đè vạch nên cả 3 xe vi phạm.","682d9d51c1d056fe5107100b.png",["1-Chỉ xe mô tô.","2-Chỉ xe tải.","3-Cả ba xe.","4-Chỉ xe mô tô và xe tải."]],["Xe nào đỗ vi phạm quy tắc giao thông?",1,"1-Cả hai xe.","Biển cấm đỗ xe ở cả phía trước và phía sau biển (ở biển báo phụ) nên cả 2 xe vi phạm.","682d9d46c0c42cd9c103ae8d.png",["1-Cả hai xe.","2-Không xe nào vi phạm.","3-Chỉ xe mô tô vi phạm.","4-Chỉ xe tải vi phạm."]],["Theo hướng mũi tên, những hướng nào xe gắn máy được phép đi?",1,"1-Cả ba hướng.","Bạn lưu ý câu hỏi này hỏi về hướng đi của xe <b>GẮN MÁY</b>. Hướng 1 và 3 chắc chắn là đi được rồi. Với hướng 2, biển báo cấm mô tô đi vào chỉ có tác dụng với xe MÔ TÔ nên xe gắn máy không có hiệu lực. Do đó vẫn đi vào bình thường.","682d9e5ee0915ca2b0085437.png",["1-Cả ba hướng.","2-Chỉ hướng 1 và 3.","3-Chỉ hướng 1."]],["Theo hướng mũi tên, xe nào được quyền đi trước?",2,"2-Xe con (B).","Thứ tự ưu tiên không vòng xuyến: Xe vào ngã ba, ngã tư trước - Xe ưu tiên - Đường ưu tiên - Đường cùng cấp theo thứ tự bên phải trống - rẽ phải - đi thẳng - rẽ trái. Đáp án đúng là Xe con (B): Đường ưu tiên;","682d9e6eca48636f5c0d7bdf.png",["1-Xe tải.","2-Xe con (B).","3-Xe con (A)."]],["Trong trường hợp này xe nào đỗ vi phạm quy tắc giao thông?",1,"1-Xe tải.","Biển cấm đỗ xe tải (ở biển phụ) nên chỉ có xe tải vi phạm.","682d9e595aeb95ccba03d788.png",["1-Xe tải.","2-Xe con và mô tô.","3-Cả ba xe.","4-Xe con và xe tải."]],["Theo hướng mũi tên, thứ tự các xe đi như thế nào là đúng quy tắc giao thông?",3,"3-Xe mô tô, xe tải, xe khách, xe con.","Giao nhau cùng cấp có vòng xuyến: Chưa vào vòng xuyến thì ưu tiên xe bên phải; đã vào vòng xuyến ưu tiên xe từ bên trái tới. Toàn bộ các xe chưa vào phòng xuyến nên ưu tiên xe bên phải. Thứ tự sẽ là Mô tô, xe tải, xe khách, xe con.","682d9e5061c6f55e910bcbe7.png",["1-Xe khách, xe tải, xe mô tô, xe con.","2-Xe con, xe khách, xe tải, xe mô tô.","3-Xe mô tô, xe tải, xe khách, xe con.","4-Xe mô tô, xe tải, xe con, xe khách."]],["Các xe đi theo hướng mũi tên, những xe nào vi phạm quy tắc giao thông?",1,"1-Xe khách, xe tải, xe mô tô.","1. Xe khách: Sai làn, Đi thẳng đèn đang đỏ; 2. Xe tải: Sai làn: Đi trên làn đi thẳng trong khi thực hiện rẽ trái. 3. Xe mô tô: Sai làn: Đi trên làn rẽ trái trong khi thực hiện rẽ phải, Nên đáp án đúng là xe khách, xe tải và xe mô tô đều vi phạm quy tắc giao thông.","682d9e3b73a5bf2756108f57.png",["1-Xe khách, xe tải, xe mô tô.","2-Xe tải, xe con, xe mô tô.","3-Xe khách, xe con, xe mô tô."]],["Theo tín hiệu đèn, xe tải đi theo hướng nào là đúng quy tắc giao thông?",2,"2-Chỉ hướng 1.","Hướng 1 rẽ phải có tín hiệu đèn xanh nên được phép đi. Hướng đi thẳng đang có tín hiệu đèn đỏ do đó các hướng 2,3,4 không thể đi được. Câu trả lời đúng là chỉ có hướng 1.","682d9e2ba0471f8eeb06229b.png",["1-Hướng 2, 3, 4.","2-Chỉ hướng 1.","3-Hướng 1 và 2.","4-Hướng 3 và 4."]],["Theo tín hiệu đèn, xe nào đi là đúng quy tắc giao thông?",2,"2-Xe con, xe tải.","Xe con và xe tải đang ở trên làn đường có tín hiệu đèn xanh nên được phép đi.","682d9e49d66b166da20c1ce9.png",["1-Xe khách, xe mô tô.","2-Xe con, xe tải.","3-Xe tải, xe mô tô."]],["Theo hướng mũi tên, gặp biển hướng đi phải theo đặt trước ngã tư, những hướng nào xe được phép đi?",1,"1-Hướng 2 và 3.","Biển R.301g được đặt ở trước nơi đường giao nhau, chỉ được phép đi thẳng, rẽ trái hoặc quay đầu xe để đi theo hướng ngược lại. Đáp án đúng là hướng 2 và hướng 3.","682d9e4bfe0f099a7602bd2f.png",["1-Hướng 2 và 3.","2-Hướng 1, 2 và 3.","3-Hướng 1 và 3."]],["Theo tín hiệu đèn, xe nào được phép đi?",1,"1-Xe con và xe khách.","Xe con và xe khách đang ở làn đường có tín hiệu đèn xanh nên được phép đi.","682d9e694b3eeff8ab01d783.png",["1-Xe con và xe khách.","2-Xe mô tô."]],["Xe nào được quyền đi trước trong trường hợp này?",2,"2-Xe chữa cháy đi làm nhiệm vụ chữa cháy.","Xe ưu tiên theo mức độ thiệt hại: Xe chữa cháy ưu tiên hơn.","682d9e62c1d4d2466b00fd6e.png",["1-Xe công an đi làm nhiệm vụ khẩn cấp.","2-Xe chữa cháy đi làm nhiệm vụ chữa cháy."]],["Theo hướng mũi tên, xe nào phải nhường đường là đúng quy tắc giao thông?",1,"1-Xe con.","Thứ tự ưu tiên: Xe ưu tiên - Đường ưu tiên - Đường cùng cấp theo thứ tự bên phải trống - rẽ phải - đi thẳng - rẽ trái. Xe tải bên phải trống nên đi trước; Đáp án đúng là Xe con phải nhường đường: Bên phải vướng xe tải.","682d9d486335fc7eac0f3f19.png",["1-Xe con.","2-Xe tải."]],["Theo hướng mũi tên, xe nào phải nhường đường đi cuối cùng qua nơi giao nhau này?",1,"1-Xe khách.","Thứ tự ưu tiên: Xe ưu tiên - Đường ưu tiên - Đường cùng cấp theo thứ tự bên phải trống - rẽ phải - đi thẳng - rẽ trái. 1. Xe con: Đường ưu tiên; 2. Xe tải: Đường không ưu tiên, rẽ phải; 3. Xe khách: Đường không ưu tiên, rẽ trái (Đáp án đúng).","682d9d5096eed6c082072082.png",["1-Xe khách.","2-Xe tải.","3-Xe con."]],["Xe nào được quyền đi trước trong trường hợp này?",2,"2-Xe cứu thương đi làm nhiệm vụ cấp cứu.","Xe ưu tiên đi trước.","682d9d3de01b8f7adc033960.png",["1-Xe mô tô.","2-Xe cứu thương đi làm nhiệm vụ cấp cứu."]]];

  var Q_LIST = [];
  var highlightedEl = null;

  // Tạo khung giao diện nổi (Floating Widget UI)
  var w = document.createElement("div");
  w.id = "htlx-box";
  w.style.position = "fixed";
  w.style.top = "20px";
  w.style.right = "20px";
  w.style.width = "410px";
  w.style.backgroundColor = "rgb(11, 17, 32)";
  w.style.color = "rgb(248, 250, 252)";
  w.style.border = "2px solid rgb(56, 189, 248)";
  w.style.borderRadius = "12px";
  w.style.padding = "14px";
  w.style.boxShadow = "0 15px 40px rgba(0,0,0,0.8)";
  w.style.fontFamily = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";
  w.style.fontSize = "13px";
  w.style.zIndex = "2147483647";
  w.style.cursor = "move";
  w.style.userSelect = "none";

  w.innerHTML =
    '<div style="display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid rgb(30,41,59);padding-bottom:8px;margin-bottom:10px;">' +
      '<div style="display:flex;align-items:center;gap:6px;">' +
        '<span style="font-size:18px;">🚗</span>' +
        '<strong style="color:rgb(56,189,248);font-size:13px;letter-spacing:0.5px;">HỖ TRỢ ĐÁP ÁN (LotusLMS)</strong>' +
      '</div>' +
      '<div style="display:flex;gap:5px;align-items:center;">' +
        '<button id="htlx-paste-json" title="Dán JSON bổ sung" style="background:rgb(30,41,59);color:rgb(56,189,248);border:1px solid rgb(51,65,85);border-radius:4px;padding:2px 7px;cursor:pointer;font-size:11px;font-weight:bold;">📋 Dán JSON</button>' +
        '<button id="htlx-min" title="Thu nhỏ" style="background:rgb(30,41,59);color:rgb(148,163,184);border:1px solid rgb(51,65,85);border-radius:4px;padding:2px 8px;cursor:pointer;font-size:11px;">_</button>' +
        '<button id="htlx-cls" title="Đóng" style="background:rgb(239,68,68);color:white;border:none;border-radius:4px;padding:2px 8px;cursor:pointer;font-weight:bold;font-size:11px;">✕</button>' +
      '</div>' +
    '</div>' +
    '<div id="htlx-content" style="cursor:default;user-select:text;">' +
      '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">' +
        '<div id="htlx-status" style="color:rgb(74,222,128);font-size:11px;font-weight:600;">⏳ Đang khởi tạo...</div>' +
        '<label id="htlx-file-btn" style="color:rgb(56,189,248);font-size:11px;cursor:pointer;text-decoration:underline;">📁 Nạp file</label>' +
        '<input type="file" id="htlx-file-input" accept=".json" style="display:none;">' +
      '</div>' +
      '<div style="background:rgb(17,24,39);border:1px solid rgb(31,41,55);border-radius:8px;padding:10px;margin-bottom:8px;">' +
        '<div style="color:rgb(148,163,184);font-size:10px;text-transform:uppercase;font-weight:bold;margin-bottom:4px;letter-spacing:0.5px;">📌 CÂU HỎI NHẬN DIỆN:</div>' +
        '<div id="htlx-q" style="color:rgb(226,232,240);font-size:12px;font-weight:500;line-height:1.45;margin-bottom:8px;max-height:65px;overflow-y:auto;">Đang tìm câu hỏi trên trang...</div>' +
        '<div style="color:rgb(250,204,21);font-size:10px;text-transform:uppercase;font-weight:bold;margin-bottom:4px;letter-spacing:0.5px;">💡 ĐÁP ÁN CHÍNH XÁC:</div>' +
        '<div id="htlx-ans" style="color:rgb(74,222,128);background:rgb(6,78,59);border:1.5px solid rgb(16,185,129);border-radius:6px;padding:8px 10px;font-weight:bold;font-size:13px;line-height:1.45;">Đang nhận diện...</div>' +
      '</div>' +
      '<div id="htlx-exp" style="color:rgb(203,213,225);font-size:11px;line-height:1.45;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);padding:8px;border-radius:6px;max-height:95px;overflow-y:auto;display:none;"></div>' +
      '<div style="display:flex;justify-content:space-between;align-items:center;margin-top:8px;font-size:10.5px;color:rgb(100,116,139);">' +
        '<label style="display:flex;align-items:center;gap:4px;cursor:pointer;">' +
          '<input type="checkbox" id="htlx-hl-toggle" checked style="cursor:pointer;"> Viền xanh đáp án' +
        '</label>' +
        '<span>An Toàn • Chống Ban</span>' +
      '</div>' +
    '</div>';

  document.body.appendChild(w);

  // Kéo thả cửa sổ nổi
  var isD = false, ox, oy;
  w.addEventListener("mousedown", function (e) {
    if (e.target.tagName === "BUTTON" || e.target.tagName === "INPUT" || e.target.tagName === "LABEL") return;
    isD = true;
    ox = e.clientX - w.offsetLeft;
    oy = e.clientY - w.offsetTop;
  });
  document.addEventListener("mousemove", function (e) {
    if (!isD) return;
    w.style.left = (e.clientX - ox) + "px";
    w.style.top = (e.clientY - oy) + "px";
    w.style.right = "auto";
  });
  document.addEventListener("mouseup", function () { isD = false; });

  // Đóng / Thu nhỏ
  document.getElementById("htlx-cls").onclick = function () {
    if (highlightedEl) clearHighlight();
    w.remove();
  };
  var ct = document.getElementById("htlx-content");
  var isM = false;
  document.getElementById("htlx-min").onclick = function () {
    isM = !isM;
    ct.style.display = isM ? "none" : "block";
  };

  // Chuẩn hóa tiêu đề câu hỏi
  function norm(s) {
    if (!s) return "";
    return s.toString().toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/[^a-z0-9]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  // Chuẩn hóa nội dung phương án
  function cleanOpt(s) {
    if (!s) return "";
    return s.toString().toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/^([1-5]|[a-e])\s*[-.):\s]\s*/i, "")
      .replace(/[^a-z0-9]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  // Lấy tên tệp ảnh từ URL
  function getImgFilename(url) {
    if (!url) return "";
    var clean = url.split("?")[0];
    var parts = clean.split("/");
    return (parts[parts.length - 1] || "").toLowerCase();
  }

  // Chuyển đổi định dạng câu hỏi nhúng
  function parseEmbeddedQuestion(item) {
    var title = item[0] || "";
    var cIdx = item[1] || 0;
    var cTxt = item[2] || "";
    var exp = item[3] || "";
    var fn = (item[4] || "").toLowerCase();
    var rawOpts = item[5] || [];

    var opts = rawOpts.map(function (txt, i) {
      return {
        idx: i + 1,
        key: String(i + 1),
        text: txt,
        norm: cleanOpt(txt)
      };
    });

    return {
      id: fn,
      title: title,
      normTitle: norm(title),
      opts: opts,
      correctIdx: cIdx,
      correctText: cTxt,
      exp: exp,
      imgFile: fn
    };
  }

  // Chuẩn hóa câu hỏi từ API thô LotusLMS hoặc 600 câu GPLX
  function parseRawQuestion(q) {
    var title = q.question || q.content || "";
    var opts = [];
    var correctIdx = 0;
    var correctText = "";
    var exp = q.lotus_feedback || q.explanation || q.feedback_true || "";
    var img = q.lotus_image || q.image || "";

    if (q.content_image_files && q.content_image_files[0]) {
      img = q.content_image_files[0].link || img;
    }

    if (q.options && typeof q.options === "object" && !Array.isArray(q.options)) {
      var keys = Object.keys(q.options).sort();
      keys.forEach(function (k, i) {
        var txt = q.options[k] || "";
        var idx = i + 1;
        opts.push({ idx: idx, key: k, text: txt, norm: cleanOpt(txt) });
        if (q.correctAnswer && (q.correctAnswer.toLowerCase() === k.toLowerCase() || q.correctAnswer === String(idx))) {
          correctIdx = idx;
          correctText = txt;
        }
      });
    } else if (q.mc_answers && Array.isArray(q.mc_answers)) {
      q.mc_answers.forEach(function (ans, i) {
        var idx = i + 1;
        var txt = ans.text || "";
        opts.push({ idx: idx, key: String(idx), text: txt, norm: cleanOpt(txt) });
        if (ans.is_answer === 1) {
          correctIdx = idx;
          correctText = txt;
        }
      });
      if (!correctIdx && q.answers && Array.isArray(q.answers) && q.answers.length > 0) {
        var aIdx = q.answers[0];
        if (q.mc_answers[aIdx]) {
          correctIdx = aIdx + 1;
          correctText = q.mc_answers[aIdx].text;
        }
      }
    }

    return {
      id: q.id || q.questionNumber || getImgFilename(img),
      title: title,
      normTitle: norm(title),
      opts: opts,
      correctIdx: correctIdx,
      correctText: correctText,
      exp: exp,
      imgFile: getImgFilename(img)
    };
  }

  function setStatus(text, color) {
    var el = document.getElementById("htlx-status");
    if (el) {
      el.innerHTML = text;
      if (color) el.style.color = color;
    }
  }

  // Khởi tạo cơ sở dữ liệu câu hỏi (Offline 100% không lo chặn mạng)
  function initDatabase() {
    try {
      var cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        var parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length >= 70) {
          Q_LIST = parsed;
          setStatus("✔ Sẵn sàng " + Q_LIST.length + " câu (Bộ nhớ)", "rgb(74,222,128)");
          return;
        }
      }
    } catch (e) {}

    // Nạp sẵn toàn bộ 78 câu sa hình Đông Đô
    if (Array.isArray(EMBEDDED_DATA) && EMBEDDED_DATA.length > 0) {
      Q_LIST = EMBEDDED_DATA.map(parseEmbeddedQuestion);
      try {
        localStorage.setItem(CACHE_KEY, JSON.stringify(Q_LIST));
      } catch (e) {}
      setStatus("✔ Sẵn sàng " + Q_LIST.length + " câu Đông Đô (Offline)", "rgb(74,222,128)");
    }
  }

  // Nạp dữ liệu JSON dán bổ sung
  function ingestRawJson(text) {
    try {
      var data = JSON.parse(text);
      var items = null;
      if (Array.isArray(data)) items = data;
      else if (data && data.result && data.result.questions && data.result.questions.result) {
        items = data.result.questions.result;
      } else if (data && data.questions && Array.isArray(data.questions)) {
        items = data.questions;
      }
      if (items && items.length > 0) {
        var parsedList = items.map(parseRawQuestion);
        Q_LIST = parsedList;
        try { localStorage.setItem(CACHE_KEY, JSON.stringify(Q_LIST)); } catch (e) {}
        setStatus("✔ Đã nạp thành công " + Q_LIST.length + " câu!", "rgb(74,222,128)");
        lastHash = "";
        return true;
      }
    } catch (e) {}
    return false;
  }

  // Nút Dán JSON
  document.getElementById("htlx-paste-json").onclick = function () {
    var raw = prompt("Dán chuỗi JSON đề thi (từ F12 -> Network -> questions/get-question):");
    if (raw) {
      var ok = ingestRawJson(raw);
      if (!ok) alert("Dữ liệu JSON không đúng cấu trúc!");
    }
  };

  // Nút Nạp file
  var fileBtn = document.getElementById("htlx-file-btn");
  var fileInput = document.getElementById("htlx-file-input");
  fileBtn.onclick = function () { fileInput.click(); };
  fileInput.onchange = function (e) {
    var f = e.target.files[0];
    if (!f) return;
    var r = new FileReader();
    r.onload = function (ev) {
      var ok = ingestRawJson(ev.target.result);
      if (!ok) alert("Tệp JSON không hợp lệ!");
    };
    r.readAsText(f);
  };

  initDatabase();

  // Bắt gói tin API nếu trang tải đề mới qua fetch/XHR
  (function hookNetwork() {
    try {
      var origFetch = window.fetch;
      if (origFetch) {
        window.fetch = function () {
          return origFetch.apply(this, arguments).then(function (res) {
            try {
              var clone = res.clone();
              clone.json().then(function (json) {
                if (json && json.result && json.result.questions && json.result.questions.result) {
                  var fresh = json.result.questions.result.map(parseRawQuestion);
                  if (fresh.length > 0) {
                    Q_LIST = fresh;
                    try { localStorage.setItem(CACHE_KEY, JSON.stringify(Q_LIST)); } catch (e) {}
                    setStatus("✔ Đã tự động cập nhật " + fresh.length + " câu từ bài học!", "rgb(74,222,128)");
                    lastHash = "";
                  }
                }
              }).catch(function () {});
            } catch (e) {}
            return res;
          });
        };
      }
    } catch (e) {}
  })();

  // Quét DOM trên toàn bộ document và iframe
  function getDocs() {
    var docs = [document];
    var iframes = document.querySelectorAll("iframe");
    for (var i = 0; i < iframes.length; i++) {
      try {
        var d = iframes[i].contentDocument || iframes[i].contentWindow.document;
        if (d && docs.indexOf(d) === -1) docs.push(d);
      } catch (e) {}
    }
    return docs;
  }

  // Quét thông tin câu hỏi và các phương án trên màn hình
  function scanScreen() {
    var docs = getDocs();
    var qTitle = "";
    var opts = [];
    var imgFiles = [];
    var combinedFullText = "";

    var optRegex = /^\s*([1-5]|[A-E])\s*[-.):\s]\s*(\S.*)$/i;

    for (var d = 0; d < docs.length; d++) {
      var doc = docs[d];
      var docText = (doc.body ? doc.body.innerText : "") || "";
      combinedFullText += " " + norm(docText);

      // 1. Quét tất cả ảnh sa hình trên trang
      var imgs = doc.querySelectorAll("img");
      for (var im = 0; im < imgs.length; im++) {
        var src = imgs[im].src || "";
        if (src.indexOf("data:") !== 0) {
          var fn = getImgFilename(src);
          if (fn && imgFiles.indexOf(fn) === -1) {
            imgFiles.push(fn);
          }
        }
      }

      // 2. Quét tiêu đề câu hỏi thông qua selector đặc thù
      if (!qTitle) {
        var qSelectors = [
          ".question-content", ".qtext", ".question", ".content-question",
          ".question-title", ".test-question", ".title-question", "h3", "h4", "h5"
        ];
        for (var qs = 0; qs < qSelectors.length; qs++) {
          var qEl = doc.querySelector(qSelectors[qs]);
          if (qEl) {
            var t = (qEl.innerText || "").trim();
            if (t.length > 10 && t.indexOf("HỖ TRỢ") === -1 && t.indexOf("Thời gian đã học") === -1) {
              qTitle = t;
              break;
            }
          }
        }
      }

      // 3. Quét các lựa chọn trả lời
      var optCandidates = doc.querySelectorAll("label, .form-check-label, .answer, .option, .choice, li, div, p, span");
      for (var ci = 0; ci < optCandidates.length; ci++) {
        var cand = optCandidates[ci];
        
        // Tránh nhầm lẫn với phần tử bên trong widget HỖ TRỢ
        var p = cand;
        var inHtlx = false;
        while (p) {
          if (p.id === "htlx-box") { inHtlx = true; break; }
          p = p.parentElement;
        }
        if (inHtlx) continue;

        var txt = (cand.innerText || "").replace(/\s+/g, " ").trim();
        if (txt.length < 2 || txt.length > 250) continue;

        var m = txt.match(optRegex);
        if (m) {
          var num = parseInt(m[1], 10);
          if (isNaN(num)) {
            num = m[1].toUpperCase().charCodeAt(0) - 64;
          }
          var cleanText = m[2].trim();
          var isExisted = false;
          for (var oi = 0; oi < opts.length; oi++) {
            if (opts[oi].num === num || opts[oi].cleanText === cleanText) {
              isExisted = true;
              break;
            }
          }
          if (!isExisted) {
            opts.push({
              num: num,
              fullText: txt,
              cleanText: cleanText,
              norm: cleanOpt(cleanText),
              element: cand
            });
          }
        }
      }
    }

    return {
      qTitle: qTitle,
      opts: opts,
      imgFiles: imgFiles,
      fullText: combinedFullText
    };
  }

  function clearHighlight() {
    if (highlightedEl) {
      try {
        highlightedEl.style.outline = "";
        highlightedEl.style.backgroundColor = "";
        highlightedEl.style.borderRadius = "";
        highlightedEl.style.transition = "";
      } catch (e) {}
      highlightedEl = null;
    }
  }

  function highlightOption(el) {
    var toggle = document.getElementById("htlx-hl-toggle");
    if (!toggle || !toggle.checked || !el) return;
    clearHighlight();
    var target = (el.closest && (el.closest("label, .form-check, li, [class*='choice'], [class*='answer'], [class*='item']") || el)) || el;
    highlightedEl = target;
    try {
      target.style.transition = "all 0.3s ease";
      target.style.outline = "3px solid rgb(34, 197, 94)";
      target.style.backgroundColor = "rgba(34, 197, 94, 0.2)";
      target.style.borderRadius = "6px";
    } catch (e) {}
  }

  var lastHash = "";

  // Chu kỳ nhận diện tự động mỗi 250ms
  setInterval(function () {
    if (Q_LIST.length === 0) return;

    var screen = scanScreen();
    var currentHash = (screen.imgFiles.join(",")) + "||" + screen.opts.map(function (o) { return o.fullText; }).join("|");
    if (!currentHash || currentHash === lastHash) return;
    lastHash = currentHash;

    var bestQ = null;
    var maxScore = -1;
    var nScrapedTitle = norm(screen.qTitle);

    for (var i = 0; i < Q_LIST.length; i++) {
      var q = Q_LIST[i];
      var score = 0;

      // 1. Đối soát tên tệp ảnh Sa hình (Độ chính xác tuyệt đối từ static-cloud LotusLMS)
      if (q.imgFile && screen.imgFiles.length > 0) {
        if (screen.imgFiles.indexOf(q.imgFile) !== -1) {
          score += 200;
        }
      }

      // 2. Đối soát toàn văn tiêu đề câu hỏi trong nội dung trang
      if (q.normTitle && q.normTitle.length >= 10 && screen.fullText.indexOf(q.normTitle) !== -1) {
        score += 150;
      } else if (q.normTitle && q.normTitle.length >= 25) {
        var sub = q.normTitle.slice(0, 30);
        if (screen.fullText.indexOf(sub) !== -1) {
          score += 80;
        }
      }

      // 3. Đối soát với tiêu đề quét được nếu có
      if (nScrapedTitle && q.normTitle) {
        if (nScrapedTitle === q.normTitle) {
          score += 60;
        } else if (nScrapedTitle.indexOf(q.normTitle) !== -1 || q.normTitle.indexOf(nScrapedTitle) !== -1) {
          score += 35;
        }
      }

      // 4. Đối soát nội dung các phương án
      if (screen.opts.length > 0 && q.opts.length > 0) {
        for (var so = 0; so < screen.opts.length; so++) {
          var sOptNorm = screen.opts[so].norm;
          for (var qo = 0; qo < q.opts.length; qo++) {
            var qOptNorm = q.opts[qo].norm;
            if (sOptNorm === qOptNorm) {
              score += 40;
              break;
            } else if (sOptNorm.length > 8 && (sOptNorm.indexOf(qOptNorm) !== -1 || qOptNorm.indexOf(sOptNorm) !== -1)) {
              score += 20;
              break;
            }
          }
        }
      }

      if (score > maxScore) {
        maxScore = score;
        bestQ = q;
      }
    }

    if (bestQ && maxScore >= 60) {
      document.getElementById("htlx-q").innerText = bestQ.title;

      var ansBadge = bestQ.correctIdx ? '<span style="background:rgb(250,204,21);color:black;font-weight:900;padding:2px 8px;border-radius:4px;margin-right:8px;font-size:12px;">Ý ' + bestQ.correctIdx + '</span>' : '';
      var ansText = bestQ.correctText || ("Đáp án " + bestQ.correctIdx);

      // Ưu tiên hiển thị đúng nguyên văn phương án kèm số trên màn hình và tô viền xanh
      for (var si = 0; si < screen.opts.length; si++) {
        if (screen.opts[si].num === bestQ.correctIdx) {
          ansText = screen.opts[si].fullText;
          highlightOption(screen.opts[si].element);
          break;
        }
      }

      document.getElementById("htlx-ans").innerHTML = ansBadge + ansText;

      var expEl = document.getElementById("htlx-exp");
      if (bestQ.exp) {
        expEl.innerHTML = '💡 <b>Giải thích chi tiết:</b> ' + bestQ.exp.replace(/<br\s*[/]?>/gi, ' ');
        expEl.style.display = "block";
      } else {
        expEl.style.display = "none";
      }
    } else {
      clearHighlight();
      if (screen.qTitle) {
        document.getElementById("htlx-q").innerText = screen.qTitle;
        document.getElementById("htlx-ans").innerHTML = '<span style="color:rgb(250,204,21);">Chưa tìm thấy trong ngân hàng đề</span>';
      }
    }
  }, 250);
})();
