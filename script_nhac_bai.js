/**
 * 🚗 DỰ ÁN: HỖ TRỢ THI & ÔN LUYỆN LÁI XE (LotusLMS / HueLMS)
 * Tác giả: Vu The Dan <vuthedan168@gmail.com>
 * Dữ liệu: 115 câu Sa hình (Phần 3 - Xử lý các tình huống giao thông, câu 486 -> 600)
 * 
 * Phiên bản: 4.0 (Khắc phục triệt để lỗi nhận diện & So khớp vân tay đa tầng)
 * - Nạp đủ 100% 115 câu sa hình chuẩn
 * - Khớp vân tay phương án + vị trí chính xác (Option Fingerprinting & Position)
 * - Nhận diện radio button trực tiếp, chống nhận diện nhầm câu cùng tiêu đề
 * - Loại trừ 100% menu sidebar bên trái
 * - Chế độ An Toàn (Chống Ban): Hiển thị khung nổi đáp án để tự chọn, không can thiệp click tự động.
 */

(function () {
  var old = document.getElementById("htlx-box");
  if (old) old.remove();

  var EMBEDDED_DATA = [["Theo hướng mũi tên, xe nào chấp hành đúng quy tắc giao thông?",3,"1. Xe khách: Sai làn, Đi thẳng đèn đang đỏ; 2. Xe tải: Sai làn: Đi trên làn đi thẳng trong khi thực hiện rẽ trái. 3. Xe mô tô: Sai làn: Đi trên làn rẽ trái trong khi thực hiện rẽ phải, 4. Xe con: Đèn xanh rẽ phải: Đúng đèn đúng làn.","682d9e3b73a5bf2756108f57.png",["Xe khách, xe tải, xe mô tô","Xe tải, xe mô tô","Chỉ xe con"]],["Theo hướng mũi tên, thứ tự các xe đi như thế nào là đúng quy tắc giao thông?",2,"Thứ tự ưu tiên: Xe ưu tiên - Đường ưu tiên - Đường cùng cấp theo thứ tự bên phải trống - rẽ phải - đi thẳng - rẽ trái. 1. Xe tải: Đường ưu tiên và đi thẳng; 2. Mô tô: Đường ưu tiên và rẽ trái; 3. Xe khách: Đường không ưu tiên, đi thẳng. 4. Xe con: Đường không ưu tiên, rẽ trái.","682d9d66ec71b2e3240dfbf7.png",["Xe tải, xe khách, xe con, xe mô tô","Xe tải, xe mô tô, xe khách, xe con","Xe khách, xe tải, xe con, xe mô tô","Xe mô tô, xe khách, xe tải, xe con"]],["Theo hướng mũi tên, thứ tự các xe đi như thế nào là đúng quy tắc giao thông?",1,"Thứ tự ưu tiên: Xe ưu tiên - Đường ưu tiên - Đường cùng cấp theo thứ tự bên phải trống - rẽ phải - đi thẳng - rẽ trái. 1. Xe công an: Xe ưu tiên. 2. Xe con: Đường ưu tiên. 3. Xe tải: Đường không ưu tiên, đi thẳng. 4. Xe khách: Đường không ưu tiên, rẽ trái.","c488.webp",["Xe công an đi làm nhiệm vụ khẩn cấp, xe con, xe tải, xe khách","Xe công an đi làm nhiệm vụ khẩn cấp, xe khách, xe con, xe tải","Xe công an đi làm nhiệm vụ khẩn cấp, xe tải, xe khách, xe con","Xe con, xe công an đi làm nhiệm vụ khẩn cấp, xe tải, xe khách"]],["Theo hướng mũi tên, thứ tự các xe đi như thế nào là đúng quy tắc giao thông?",4,"Thứ tự ưu tiên: Xe ưu tiên - Đường ưu tiên - Đường cùng cấp theo thứ tự bên phải trống - rẽ phải - đi thẳng - rẽ trái. 1. Xe công an: Xe ưu tiên; 2. Xe tải: Đường ưu tiên; 3. Xe khách: Đường không ưu tiên, bên phải trống; 4. Xe con: Đường không ưu tiên, bên phải vướng xe khách nên phải nhường.","c489.webp",["Xe tải, xe công an đi làm nhiệm vụ khẩn cấp, xe khách, xe con","Xe công an đi làm nhiệm vụ khẩn cấp, xe khách, xe con, xe tải","Xe công an đi làm nhiệm vụ khẩn cấp, xe con, xe tải, xe khách","Xe công an đi làm nhiệm vụ khẩn cấp, xe tải, xe khách, xe con"]],["Theo hướng mũi tên, thứ tự các xe đi như thế nào là đúng quy tắc giao thông?",3,"Thứ tự ưu tiên: Xe ưu tiên - Đường ưu tiên - Đường cùng cấp theo thứ tự bên phải trống - rẽ phải - đi thẳng - rẽ trái. 1. Xe mô tô: Bên phải trống; 2. Xe con: Đi thẳng; 3. Xe tải: Rẽ trái;","c490.webp",["Xe tải, xe con, xe mô tô","Xe con, xe tải, xe mô tô","Xe mô tô, xe con, xe tải","Xe con, xe mô tô, xe tải"]],["Xe nào phải nhường đường trong trường hợp này?",1,"Giao nhau cùng cấp có vòng xuyến: Chưa vào vòng xuyến thì ưu tiên xe bên phải; đã vào vòng xuyến ưu tiên xe từ bên trái tới. Xe con nhường vì thấy xe tải từ bên trái tới đã nằm trong vòng xuyến.","682d9de5dc91772760078be7.png",["Xe con","Xe tải"]],["Trường hợp này xe nào được quyền đi trước?",2,"Xe con được đi trước vì mô tô có biển STOP trước mặt.","c492.webp",["Xe mô tô","Xe con"]],["Thứ tự các xe đi như thế nào là đúng quy tắc giao thông?",1,"Thứ tự ưu tiên: Xe vào ngã ba, ngã tư trước - Xe ưu tiên - Đường ưu tiên - Đường cùng cấp theo thứ tự bên phải trống - rẽ phải - đi thẳng - rẽ trái. 1. Xe con (A): Đã vào ngã tư trước; 2. Xe cứu thương: Xe ưu tiên; 3. Xe con (B);","c493.webp",["Xe con (A), xe cứu thương đi làm nhiệm vụ cấp cứu, xe con (B)","Xe cứu thương đi làm nhiệm vụ cấp cứu, xe con (B), xe con (A)","Xe con (B), xe con (A), xe cứu thương đi làm nhiệm vụ cấp cứu"]],["Thứ tự các xe đi như thế nào là đúng quy tắc giao thông?",2,"Thứ tự xe ưu tiên: Xe cứu hoả (mức độ thương vong lớn hơn); Xe công an; Xe cứu thương.","c494.webp",["Xe cứu thương đi làm nhiệm vụ cấp cứu, xe chữa cháy đi làm nhiệm vụ chữa cháy, xe con","Xe chữa cháy đi làm nhiệm vụ chữa cháy, xe cứu thương đi làm nhiệm vụ cấp cứu, xe con","Xe cứu thương đi làm nhiệm vụ cấp cứu, xe con, xe chữa cháy đi làm nhiệm vụ chữa cháy"]],["Xe nào được quyền đi trước trong trường hợp này?",2,"Xe ưu tiên đi trước.","682d9d3de01b8f7adc033960.png",["Xe mô tô","Xe cứu thương đi làm nhiệm vụ cấp cứu"]],["Theo hướng mũi tên, xe nào phải nhường đường đi cuối cùng qua nơi giao nhau này?",1,"Thứ tự ưu tiên: Xe ưu tiên - Đường ưu tiên - Đường cùng cấp theo thứ tự bên phải trống - rẽ phải - đi thẳng - rẽ trái. 1. Xe con: Đường ưu tiên; 2. Xe tải: Đường không ưu tiên, rẽ phải; 3. Xe khách: Đường không ưu tiên, rẽ trái (Đáp án đúng).","682d9d5096eed6c082072082.png",["Xe khách","Xe tải","Xe con"]],["Theo hướng mũi tên, xe nào phải nhường đường là đúng quy tắc giao thông?",1,"Thứ tự ưu tiên: Xe ưu tiên - Đường ưu tiên - Đường cùng cấp theo thứ tự bên phải trống - rẽ phải - đi thẳng - rẽ trái. Xe tải bên phải trống nên đi trước; Đáp án đúng là Xe con phải nhường đường: Bên phải vướng xe tải.","682d9d486335fc7eac0f3f19.png",["Xe con","Xe tải"]],["Xe nào được quyền đi trước trong trường hợp này?",2,"Xe ưu tiên theo mức độ thiệt hại: Xe chữa cháy ưu tiên hơn.","c498.webp",["Xe công an đi làm nhiệm vụ khẩn cấp","Xe chữa cháy đi làm nhiệm vụ chữa cháy"]],["Theo tín hiệu đèn, xe nào được phép đi?",1,"Xe con và xe khách đang ở làn đường có tín hiệu đèn xanh nên được phép đi.","682d9e694b3eeff8ab01d783.png",["Xe con và xe khách","Xe mô tô"]],["Theo tín hiệu đèn, xe nào đi là đúng quy tắc giao thông?",2,"Xe con và xe tải đang ở trên làn đường có tín hiệu đèn xanh nên được phép đi.","682d9e49d66b166da20c1ce9.png",["Xe khách, xe mô tô","Xe con, xe tải","Xe tải, xe mô tô"]],["Trong trường hợp này xe nào được quyền đi trước?",2,"Xe ưu tiên cùng cấp nên áp dụng thứ tự đường cùng cấp: Bên phải trống - Rẽ phải - Đi thẳng - Rẽ trái. Xe quân sự được ưu tiên trước do bên phải trống.","682d9e3fc8a22d266f0e7597.png",["Xe công an đi làm nhiệm vụ khẩn cấp","Xe quân sự đi làm nhiệm vụ khẩn cấp"]],["Theo tín hiệu đèn, xe tải đi theo hướng nào là đúng quy tắc giao thông?",2,"Hướng 1 rẽ phải có tín hiệu đèn xanh nên được phép đi. Hướng đi thẳng đang có tín hiệu đèn đỏ do đó các hướng 2,3,4 không thể đi được. Câu trả lời đúng là chỉ có hướng 1.","682d9e2ba0471f8eeb06229b.png",["Hướng 2, 3, 4","Chỉ hướng 1","Hướng 1 và 2","Hướng 3 và 4"]],["Các xe đi theo hướng mũi tên, những xe nào vi phạm quy tắc giao thông?",1,"1. Xe khách: Sai làn, Đi thẳng đèn đang đỏ; 2. Xe tải: Sai làn: Đi trên làn đi thẳng trong khi thực hiện rẽ trái. 3. Xe mô tô: Sai làn: Đi trên làn rẽ trái trong khi thực hiện rẽ phải, Nên đáp án đúng là xe khách, xe tải và xe mô tô đều vi phạm quy tắc giao thông.","682d9e3b73a5bf2756108f57.png",["Xe khách, xe tải, xe mô tô","Xe tải, xe con, xe mô tô","Xe khách, xe con, xe mô tô"]],["Theo hướng mũi tên, thứ tự các xe đi như thế nào là đúng quy tắc giao thông?",3,"Giao nhau cùng cấp có vòng xuyến: Chưa vào vòng xuyến thì ưu tiên xe bên phải; đã vào vòng xuyến ưu tiên xe từ bên trái tới. Toàn bộ các xe chưa vào phòng xuyến nên ưu tiên xe bên phải. Thứ tự sẽ là Mô tô, xe tải, xe khách, xe con.","682d9e5061c6f55e910bcbe7.png",["Xe khách, xe tải, xe mô tô, xe con","Xe con, xe khách, xe tải, xe mô tô","Xe mô tô, xe tải, xe khách, xe con","Xe mô tô, xe tải, xe con, xe khách"]],["Trong trường hợp này xe nào đỗ vi phạm quy tắc giao thông?",1,"Biển cấm đỗ xe tải (ở biển phụ) nên chỉ có xe tải vi phạm.","682d9e595aeb95ccba03d788.png",["Xe tải","Xe con và mô tô","Cả ba xe","Xe con và xe tải"]],["Theo hướng mũi tên, xe nào được quyền đi trước?",2,"Thứ tự ưu tiên không vòng xuyến: Xe vào ngã ba, ngã tư trước - Xe ưu tiên - Đường ưu tiên - Đường cùng cấp theo thứ tự bên phải trống - rẽ phải - đi thẳng - rẽ trái. Đáp án đúng là Xe con (B): Đường ưu tiên;","682d9e6eca48636f5c0d7bdf.png",["Xe tải","Xe con (B)","Xe con (A)"]],["Theo hướng mũi tên, những hướng nào xe gắn máy được phép đi?",1,"Bạn lưu ý câu hỏi này hỏi về hướng đi của xe GẮN MÁY . Hướng 1 và 3 chắc chắn là đi được rồi. Với hướng 2, biển báo cấm mô tô đi vào chỉ có tác dụng với xe MÔ TÔ nên xe gắn máy không có hiệu lực. Do đó vẫn đi vào bình thường.","682d9e5ee0915ca2b0085437.png",["Cả ba hướng","Chỉ hướng 1 và 3","Chỉ hướng 1"]],["Xe nào đỗ vi phạm quy tắc giao thông?",1,"Biển cấm đỗ xe ở cả phía trước và phía sau biển (ở biển báo phụ) nên cả 2 xe vi phạm.","682d9d46c0c42cd9c103ae8d.png",["Cả hai xe","Không xe nào vi phạm","Chỉ xe mô tô vi phạm","Chỉ xe tải vi phạm"]],["Xe nào đỗ vi phạm quy tắc giao thông?",3,"Xe tải đậu trái đường; Xe con và mô tô đậu xe đè vạch nên cả 3 xe vi phạm.","682d9d51c1d056fe5107100b.png",["Chỉ xe mô tô","Chỉ xe tải","Cả ba xe","Chỉ xe mô tô và xe tải"]],["Xe tải kéo xe mô tô ba bánh như hình này có đúng quy tắc giao thông không?",2,"Xe tải kéo xe mô tô 3 bánh như trên hình là không đúng vì đi vào đường có biển P.108 “Cấm ô tô kéo moóc” kể cả xe máy kéo, xe ô tô khách kéo theo rơ moóc đi qua.","682d9e4f80ee24552102162e.png",["Đúng","Không đúng"]],["Theo hướng mũi tên, hướng nào xe không được phép đi?",2,"Hướng 1 có biển cấm ô tô nên xe ô tô đương nhiên không được phép đi vào rồi.","682d9e5b634c333a4f097d9a.png",["Hướng 2 và 5","Chỉ hướng 1"]],["Theo hướng mũi tên, những hướng nào xe ô tô không được phép đi?",2,"Biển P.123a “Cấm rẽ trái” không cấm quay đầu xe nên chỉ có hướng 3 là hướng ô tô không được phép đi.","682d9e6bbbfbb7e862023657.png",["Hướng 1 và 2","Hướng 3","Hướng 1 và 4","Hướng 2 và 3"]],["Xe nào vượt đúng quy tắc giao thông?",1,"Biển số P.126 “Cấm ô tô tải vượt” nên không áp dụng với xe con và xe khách.","c513.webp",["Cả hai xe đều đúng","Xe con","Xe khách"]],["Theo hướng mũi tên, gặp biển hướng đi phải theo đặt trước ngã tư, những hướng nào xe được phép đi?",1,"Biển R.301g được đặt ở trước nơi đường giao nhau, chỉ được phép đi thẳng, rẽ trái hoặc quay đầu xe để đi theo hướng ngược lại. Đáp án đúng là hướng 2 và hướng 3.","682d9e4bfe0f099a7602bd2f.png",["Hướng 2 và 3","Hướng 1, 2 và 3","Hướng 1 và 3"]],["Xe kéo nhau như hình này có vi phạm quy tắc giao thông không?",2,"Xe kéo rơ moóc, xe kéo sơ mi rơ moóc đã kéo rơ moóc thì không được kéo thêm xe khác nên trường hợp này là vi phạm.","c515.webp",["Không","Vi phạm"]],["Xe nào phải nhường đường trong trường hợp này?",1,"Phía trước xe tải có biển báo được ưu tiên qua đường hẹp nên được đi trước. Hoặc phía trước xe khách có biển báo nhường cho xe ngược chiều qua đường hẹp.","c516.webp",["Xe khách","Xe tải"]],["Xe nào được quyền đi trước trong trường hợp này?",2,"Cả 2 xe đều gặp đèn xanh nên áp dụng quy tắc đường cùng cấp: Bên phải trống - Rẽ phải - Đi thẳng - Rẽ trái. Nên đáp án đúng là xe mô tô rẽ phải được quyền đi trước. Xe con rẽ trái phải nhường đường.","c517.webp",["Xe con","Xe mô tô"]],["Xe kéo nhau trong trường hợp này đúng quy định không?",1,"Xe đầu kéo (xe container) đã kéo rơmoóc, sơmi rơmoóc không được phép kéo thêm rơmoóc hoặc xe khác, vật khác.","c518.webp",["Không đúng","Đúng"]],["Theo hướng mũi tên, những hướng nào xe ô tô con được phép đi?",2,"Biển số R.301d “Chỉ được rẽ phải” chỉ áp dụng với xe tải (biển phụ) nên không áp dụng với xe con. Hướng 2 cấm xe con không được đi vào, còn hướng 1, 3 và 4 xe con đều được phép đi.","c519.webp",["Hướng 1","Hướng 1, 3 và 4","Hướng 2, 3 và 4","Cả bốn hướng"]],["Theo hướng mũi tên, thứ tự các xe đi như thế nào là đúng quy tắc giao thông?",4,"Thứ tự ưu tiên đường cùng cấp: Xe ưu tiên - Đường ưu tiên - Bên phải trống - rẽ phải - đi thẳng - rẽ trái. 1. Mô tô và xe đạp: Bên phải trống; 2. Xe con (A): Đi thẳng; 3. Xe con (B): Rẽ trái.","c520.webp",["Xe con (A), xe mô tô, xe con (B), xe đạp","Xe con (B), xe đạp, xe mô tô, xe con (A)","Xe con (A), xe con (B), xe mô tô + xe đạp","Xe mô tô + xe đạp, xe con (A), xe con (B)"]],["Theo hướng mũi tên, những hướng nào xe tải được phép đi?",1,"Biển số R.301d “Chỉ được rẽ phải” áp dụng với xe tải (biển phụ) nên hướng 3, 4 rẽ trái bị cấm. Hướng 2 có biển cấm xe tải đi vào. Nên xe tải chỉ có thể chạy theo hướng 1 là đáp án đúng.","c521.webp",["Chỉ hướng 1","Hướng 1, 3 và 4","Hướng 1, 2 và 3","Cả bốn hướng"]],["Những hướng nào xe tải được phép đi?",2,"Xe tải cấm rẽ phải (biển phụ) nên chỉ đi được hướng 2 và hướng 3.","c522.webp",["Cả ba hướng","Hướng 2 và 3"]],["Những hướng nào xe ô tô tải được phép đi?",3,"Hướng 2,3,4 bị cấm do có biển cấm xe ô tô đi vào. Hướng 1 và 5 xe tải đi được bình thường.","c523.webp",["Chỉ hướng 1","Hướng 1 và 4","Hướng 1 và 5","Hướng 1, 4 và 5"]],["Những hướng nào xe ô tô tải được phép đi?",2,"Hướng 2 có biển cấm xe tải nên xe tải không được phép đi vào.","c524.webp",["Cả bốn hướng","Trừ hướng 2","Hướng 2, 3 và 4","Trừ hướng 4"]],["Xe nào được quyền đi trước trong trường hợp này?",1,"Thứ tự ưu tiên: Xe ưu tiên - Đường ưu tiên - Bên phải trống - Rẽ phải - Đi thẳng - Rẽ trái. Xe mô tô rẽ trái từ đường ưu tiên vào đường ưu tiên (theo biển báo và biển phụ) nên được quyền đi trước.","c525.webp",["Xe mô tô","Xe con"]],["Xe ô tô con đi theo chiều mũi tên có vi phạm quy tắc giao thông không?",2,"Biển số R.301a được đặt trước ngã ba, ngã tư. Các xe chỉ được đi thẳng ở khu vực ngã ba, ngã tư.","c526.webp",["Không vi phạm","Vi phạm"]],["Xe nào vi phạm quy tắc giao thông?",3,"Xe con quay đầu đè vạch liền trên đường nên vi phạm.","c527.webp",["Xe khách","Xe mô tô","Xe con","Xe con và xe mô tô"]],["Các xe đi như thế nào là đúng quy tắc giao thông?",3,"Giơ tay thẳng đứng: Tất cả dừng, trừ xe đã ở trong ngã tư được phép đi; Giang ngang tay: Trái phải đi; Trước sau dừng; Tay phải giơ trước: Sau, phải dừng, trước rẽ phải, trái đi các hướng, người đi bộ qua đường đi sau người điều khiển.","c528.webp",["Các xe ở phía tay phải và tay trái của người điều khiển được phép đi thẳng","Cho phép các xe ở mọi hướng được phép rẽ phải","Tất cả các xe phải dừng lại trước ngã tư, trừ những xe đã ở trong ngã tư được phép tiếp tục đi"]],["Theo hướng mũi tên, xe nào được phép đi?",3,"Giang ngang tay: Trái phải đi; Trước sau dừng. Xe mô tô và xe tải được phép đi là đáp án đúng.","c529.webp",["Xe mô tô, xe con","Xe con, xe tải","Xe mô tô, xe tải","Cả ba xe"]],["Xe con vượt xe tải như trường hợp này có đúng không?",1,"Xe con đi thẳng và xe tải rẽ trái không giao nhau nên được phép vượt trong trường hợp này.","c530.webp",["Đúng","Không đúng"]],["Xe nào vượt đúng quy tắc giao thông?",3,"Theo hướng xe tải, vượt xe khách đè vạch liền nên vi phạm. Theo hướng xe con, xe con vượt xe tải đè vạch đứt nên không vi phạm quy tắc giao thông là đáp án đúng.","c531.webp",["Xe tải","Cả hai xe","Xe con"]],["Đi theo hướng mũi tên, xe nào vi phạm quy tắc giao thông?",2,"Biển cấm xe ngược chiều không có tác dụng với xe chữa cháy (xe ưu tiên) nên không vi phạm. Trước mặt xe tải có biển cấm rẽ trái và quay đầu nên vi phạm là đáp án đúng.","c532.webp",["Xe chữa cháy đi làm nhiệm vụ chữa cháy","Xe tải","Cả hai xe"]],["Thứ tự các xe đi như thế nào là đúng quy tắc giao thông?",3,"Thứ tự ưu tiên: Xe ưu tiên - Đường ưu tiên - Bên phải trống - Rẽ phải - Đi thẳng - Rẽ trái. 1. Xe tải: Rẽ phải; 2. Xe khách: Đi thẳng; 3. Xe con: Rẽ trái.","c533.webp",["Xe khách, xe tải, xe con","Xe con, xe tải, xe khách","Xe tải, xe khách, xe con"]],["Theo hướng mũi tên, thứ tự các xe đi như thế nào là đúng quy tắc giao thông?",1,"Thứ tự ưu tiên: Xe ưu tiên - Đường ưu tiên - Bên phải trống - Rẽ phải - Đi thẳng - Rẽ trái. 1. Xe khách và xe tải cùng rẽ phải nên cùng nhau đi trước. Hãy nhìn đáp án có chữ “VÀ” .","c534.webp",["Xe khách và xe tải, xe con","Xe tải, xe khách, xe con","Xe con, xe khách, xe tải"]],["Những hướng nào xe ô tô tải được phép đi?",3,"Biển số P.102 “Cấm đi ngược chiều” ở hướng 4 nên hướng này không được phép đi.","c535.webp",["Cả bốn hướng","Chỉ hướng 1 và 2","Trừ hướng 4"]],["Theo hướng mũi tên, thứ tự các xe đi như thế nào là đúng?",1,"Thứ tự ưu tiên: Xe ưu tiên - Đường ưu tiên - Bên phải trống - Rẽ phải - Đi thẳng - Rẽ trái. 1. Xe công an: Xe ưu tiên; 2. Xe con: Đường ưu tiên, bên phải trống; 3. Xe tải: Đường ưu tiên, bên phải vướng xe con nếu đi trước; 4. Xe khách: Đường không ưu tiên.","c536.webp",["Xe công an đi làm nhiệm vụ khẩn cấp, xe con, xe tải, xe khách","Xe con, xe khách và xe công an đi làm nhiệm vụ khẩn cấp, xe tải","Xe công an đi làm nhiệm vụ khẩn cấp, xe con, xe khách, xe tải","Xe con, xe tải, xe khách, xe công an đi làm nhiệm vụ khẩn cấp"]],["Những hướng nào ô tô tải được phép đi?",4,"Trước mặt xe tải là Biển số P.123a “Cấm rẽ trái” không cấm quay đầu (hướng 3). Hướng 4 là Biển số P.109 “Cấm máy kéo” không cấm xe tải. Nên các hướng 1, 3 và 4 là câu trả lời đúng.","c537.webp",["Cả bốn hướng","Hướng 1, 2 và 3","Hướng 1 và 4","Hướng 1, 3 và 4"]],["Trong hình dưới đây, xe nào chấp hành đúng quy tắc giao thông?",2,"Xe khách chờ đèn đỏ rẽ trái. Xe tải đi thẳng và rẽ phải theo tín hiệu đèn xanh. Xe con đi thẳng và rẽ phải theo tín hiệu đèn xanh. Xe mô tô chờ đèn đỏ rẽ trái. Nên tất cả xe đều chấp hành.","c538.webp",["Chỉ xe khách, xe mô tô","Tất cả các loại xe trên","Không xe nào chấp hành đúng quy tắc giao thông"]],["Theo hướng mũi tên, những hướng nào xe mô tô được phép đi?",3,"Hướng 2 có Biển số P.104 “Cấm mô tô”. Hướng 3 Biển số P.103a “Cấm ô tô” nhưng không cấm mô tô. Nên đáp án đúng là hướng 1 và hướng 3.","c539.webp",["Cả ba hướng","Hướng 1 và 2","Hướng 1 và 3","Hướng 2 và 3"]],["Trong trường hợp này, thứ tự xe đi như thế nào là đúng quy tắc giao thông?",2,"Thứ tự ưu tiên: Xe ưu tiên - Đường ưu tiên - Bên phải trống - Rẽ phải - Đi thẳng - Rẽ trái. 1. Xe quân sự: Xe ưu tiên cùng cấp xe công an nhưng đi thẳng; 2. Xe công an: Xe ưu tiên; rẽ trái; 3. Xe con và xe mô tô: Cùng đi thẳng.","c540.webp",["Xe công an đi làm nhiệm vụ khẩn cấp, xe quân sự đi làm nhiệm vụ khẩn cấp, xe con + xe mô tô","Xe quân sự đi làm nhiệm vụ khẩn cấp, xe công an đi làm nhiệm vụ khẩn cấp, xe con + xe mô tô","Xe mô tô + xe con, xe quân sự đi làm nhiệm vụ khẩn cấp, xe công an đi làm nhiệm vụ khẩn cấp"]],["Xe nào phải nhường đường là đúng quy tắc giao thông?",1,"Xe xuống dốc A phải nhường đường cho xe đang lên dốc B.","682d9db5fa69d1ccd10d0ce5.png",["Xe A","Xe B"]],["Xe con quay đầu đi ngược lại như hình vẽ dưới có vi phạm quy tắc giao thông không?",2,"Xe con quay đầu đè vạch nên vi phạm.","c542.webp",["Không vi phạm","Vi phạm"]],["Trong hình dưới, những xe nào vi phạm quy tắc giao thông?",1,"Xe mô tô C chạy vào làn dành riêng xe ô tô: Vi phạm; Xe con E chạy vào làn dành riêng xe máy: Vi phạm.","682d9d9eb07e73eb3f07380c.png",["Xe con (E), xe mô tô (C)","Xe tải (A), xe mô tô (D)","Xe khách (B), xe mô tô (C)","Xe khách (B), xe mô tô (D)"]],["Để điều khiển cho xe đi thẳng, người lái xe phải làm gì là đúng quy tắc giao thông?",1,"Người lái xe phải nhường đường xe con rẽ trái trước vì xe con rẽ trái đã vào nơi giao nhau trước (đã qua vạch).","682d9dddc19f09734003fb11.png",["Nhường xe con rẽ trái trước","Đi thẳng không nhường"]],["Người lái xe điều khiển xe đi theo hướng nào là đúng quy tắc giao thông?",2,"Hướng 4: Biển số P.123b “Cấm rẽ phải”; Hướng 3: Biển số P.102 “Cấm đi ngược chiều”; nên chỉ có thể đi theo hướng 1 và hướng 2 là câu trả lời đúng.","682d9dcec1d056fe510710d5.png",["Chỉ hướng 2","Hướng 1 và 2","Tất cả các hướng trừ hướng 3","Tất cả các hướng trừ hướng 4"]],["Xe nào phải nhường đường là đúng quy tắc giao thông?",2,"Xe con (A) đang đi trước và xi nhan trái nên được đi trước, xe con (B) xi nhan phải và đi sau nên phải nhường.","c546.webp",["Xe con (A)","Xe con (B)"]],["Người lái xe điều khiển xe rẽ trái như thế nào là đúng quy tắc giao thông?",3,"Xe tải đã vào nơi giao nhau trước nên được đi đầu tiên; Tiếp theo xe buýt: Đi thẳng; Cuối cùng là xe của bạn: Rẽ trái.","682d9dc0a9c163e758085d55.png",["Rẽ trái ngay trước xe buýt","Rẽ trái trước xe tải","Nhường đường cho xe buýt và xe tải"]],["Trong hình dưới, những xe nào vi phạm quy tắc giao thông?",3,"Nhìn vào bảng chỉ dẫn loại phương tiện theo làn đường: Xe con (E) đi trên làn dành riêng cho mô tô nên vi phạm: Xe mô tô (D) chạy trên làn dành riêng xe ô tô nên cũng vi phạm.","682d9df0429d256fdb0a8312.png",["Xe con (B), xe mô tô (C)","Xe con (A), xe mô tô (C)","Xe con (E), xe mô tô (D)","Tất cả các loại xe trên"]],["Xe nào đi trước là đúng quy tắc giao thông?",2,"Trước mặt xe của bạn có Biển số W.208 “Giao nhau với đường ưu tiên” nên phải ưu tiên các xe đang đi trên đường ưu tiên. Xe tải được ưu tiên trong trường hợp này.","682d9de7913948b5340f5173.png",["Xe của bạn","Xe tải"]],["Người lái xe có thể quay đầu xe như thế nào là đúng quy tắc giao thông?",1,"Trước mặt người lái xe có Biển số P.123a “Cấm rẽ trái” không cấm quay đầu. Tuy nhiên, hướng B quay đầu đè vạch liền nên vi phạm. Do đó, chỉ có hướng A quay đầu xe là câu trả lời đúng.","682d9ddbc1b6605fdf01bf6b.png",["Quay đầu theo hướng A","Quay đầu theo hướng B","Cấm quay đầu"]],["Thứ tự các xe đi như thế nào là đúng quy tắc giao thông?",3,"Thứ tự ưu tiên: Xe ưu tiên - Đường ưu tiên - Bên phải trống - Rẽ phải - Đi thẳng - Rẽ trái. Xe bạn đang trên đường ưu tiên nên được đi trước. Xe con rẽ phải không giao nhau với xe bạn nên được đi đồng thời với xe bạn. Xe tải rẽ trái từ đường không ưu tiên phải nhường đi sau cùng.","682d9dd094a5ec509b0218c5.png",["Xe con và xe tải, xe của bạn","Xe của bạn, xe tải, xe con","Xe của bạn và xe con, xe tải","Xe của bạn, xe tải + xe con"]],["Khi muốn vượt xe tải, người lái xe phải làm gì là đúng quy tắc giao thông?",2,"Chú ý vạch kẻ đường ngăn cách với làn bên trái là vạch liền. Bạn phải bật tín hiệu báo hiệu cho đến khi xe tải phía trước giảm tốc độ và chuyển qua làn bên phải thì bạn mới có thể tăng tốc cho xe vượt qua.","682d9db38c422a21490deb26.png",["Tăng tốc cho xe chạy vượt qua","Bật tín hiệu báo hiệu bằng đèn hoặc còi, khi đủ điều kiện an toàn, tăng tốc cho xe chạy vượt qua","Đánh lái sang làn bên trái và tăng tốc cho xe chạy vượt qua"]],["Theo tín hiệu đèn, xe nào phải dừng lại là đúng quy tắc giao thông?",3,"Xe con và xe tải đang ở trên làn đường có tín hiệu đèn đỏ nên phải dừng lại.","682d9dc1973a72d86d075e31.png",["Xe khách, xe mô tô","Xe tải, xe mô tô","Xe con, xe tải"]],["Trong hình dưới, những xe nào chấp hành quy tắc giao thông?",2,"Xe con (B) và xe tải (D) đang đè lên vạch liền phân tách làn đường nên vi phạm quy tắc giao thông. Các xe còn lại (A, C, E, G) là đúng quy tắc giao thông.","682d9e145e286037240c6348.png",["Xe tải (D), xe con (B)","Xe con (A), xe con (C), xe con (E), xe buýt (G)","Xe con (A), xe con (B), xe tải (D)"]],["Người lái xe có được phép vượt xe tải để đi thẳng trong trường hợp này không?",2,"Tại nơi giao nhau, trên đoạn đường có làn đường dành cho người đi bộ cắt ngang thì không được phép vượt.","682d9d9025d8a0fb0c0a6af0.png",["Được vượt","Cấm vượt"]],["Bạn có được phép vượt xe mô tô phía trước không?",2,"Tại nơi giao nhau, trên đoạn đường có làn đường dành cho người đi bộ cắt ngang thì không được phép vượt.","682d9daa0acaf4e247051928.png",["Cho phép","Không được vượt"]],["Người lái xe dừng tại vị trí nào là đúng quy tắc giao thông?",3,"Vị trí A vi phạm do dừng bên trái đường. Biển số P.131a “Cấm đỗ xe” không cấm dừng xe. Do đó vị trí dừng tại B và C là câu trả lời đúng.","682d9d9cbe6bb68f3e08e55b.png",["Vị trí A và B","Vị trí A và C","Vị trí B và C","Cả ba vị trí A, B, C"]],["Bạn được dừng xe ở vị trí nào trong tình huống này?",4,"Biển số P.130 “Cấm dừng xe và đỗ xe” và biển phụ báo phạm vi trước và sau biển báo nên không được phép dừng xe tại cả 2 vị trí A và B.","682d9e1ae16aa1886a04599b.png",["Được phép dừng ở vị trí A","Được phép dừng ở vị trí B","Được phép dừng ở vị trí A và B","Không được dừng"]],["Theo tín hiệu đèn của xe cơ giới, xe nào vi phạm quy tắc giao thông?",4,"Biển số R.301a chỉ cho phép các phương tiện đi thẳng trong khi cả hai xe đều có tín hiệu xi nhan rẽ sang hướng khác nên cả 2 xe đều vi phạm quy tắc giao thông.","682d9e29807da83a7a0c564e.png",["Xe mô tô","Xe ô tô con","Không xe nào vi phạm","Cả hai xe"]],["Các xe đi theo hướng mũi tên, xe nào vi phạm quy tắc giao thông?",2,"Xe con trong cả hai phía đều đang ở đúng làn đường và đi theo hướng mà đèn xanh đang bật nên đúng quy tắc. Xe tải trong cả hai phía đều ở sai làn đường so với hướng rẽ nên vi phạm quy tắc giao thông.","682d9df3f7c37844b80ab33f.png",["Xe con","Xe tải","Xe con, xe tải"]],["Các xe đi theo hướng mũi tên, những xe nào vi phạm quy tắc giao thông?",3,"Xe con và xe mô tô đang ở đúng làn đường, đúng hướng rẽ với tín hiệu đèn xanh nên đúng quy tắc giao thông. Xe khách và xe tải đang ở sai làn đường so với hướng rẽ nên đều vi phạm.","682d9de309df238c1c077010.png",["Xe tải, xe con","Xe khách, xe con","Xe khách, xe tải"]],["Các xe đi theo hướng mũi tên, xe nào vi phạm quy tắc giao thông?",2,"Xe con đi đúng làn đường theo hướng rẽ và tín hiệu đèn. Xe khách: Sai làn đường và tín hiệu đèn. Xe tải: Đi thẳng vi phạm đèn đỏ. Xe mô tô: Đi thẳng vi phạm đèn đỏ.","682d9df8c19f09734003fb39.png",["Xe con, xe tải, xe khách","Xe tải, xe khách, xe mô tô","Xe khách, xe mô tô, xe con","Cả bốn xe"]],["Các xe đi theo hướng mũi tên, xe nào vi phạm quy tắc giao thông?",1,"Xe con đúng làn đường và tín hiệu đèn. Xe khách: Sai làn đường; Xe tải: Sai làn đường và tín hiệu đèn.","682d9e028c13f1e3f8064095.png",["Xe khách, xe tải","Xe khách, xe con","Xe con, xe tải","Xe khách, xe tải, xe con"]],["Trong tình huống dưới đây, để tránh xe phía trước bị hỏng đột xuất trên đường, người lái xe phải làm gì?",2,"Chú ý quan sát, bật tín hiệu đèn, còi rồi mới được vượt nên Đáp án 2 trong trường hợp này mô tả chính xác.","682d9e1b12cbb1c04f05f720.png",["Đánh lái sang trái cho xe vượt qua","Quan sát phía trước, phía sau, khi đủ điều kiện an toàn, bật tín hiệu bằng đèn hoặc còi rồi cho xe chạy vượt qua","Cấm vượt"]],["Các xe đi theo hướng mũi tên, xe nào chấp hành đúng quy tắc giao thông?",2,"Xe con và xe tải: Vi phạm tín hiệu đèn; Xe khách và xe mô tô: Đúng làn đường và đúng tín hiệu đèn.","682d9e28c1b6605fdf01bfc0.png",["Xe tải, xe mô tô","Xe khách, xe mô tô","Xe tải, xe con","Xe mô tô, xe con"]],["Trong hình dưới, những xe nào vi phạm quy tắc giao thông?",3,"Xe con (B) và xe tải (D) đang đè lên vạch liền phân tách làn đường nên vi phạm quy tắc giao thông.","682d9e145e286037240c6348.png",["Xe con (A), xe con (B), xe tải (D)","Xe tải (D), xe con (E), xe buýt (G)","Xe tải (D), xe con (B)","Xe con (B), xe con (C)"]],["Các xe đi theo thứ tự nào là đúng quy tắc giao thông đường bộ?",3,"Thứ tự ưu tiên: Xe ưu tiên - Đường ưu tiên - Bên phải trống - Rẽ phải - Đi thẳng - Rẽ trái. Biển báo phía trước là đường ưu tiên và biển phụ báo hướng di chuyển của xe mô tô là hướng ưu tiên. 1. Xe mô tô: Đường ưu tiên; 2. Xe con: Đường không ưu tiên, bên phải trống; 3. Xe của bạn: Đường không ưu tiên, bên phải vướng xe con.","682d9e0c2ba5b3959c08d443.png",["Xe của bạn, xe mô tô, xe con","Xe con, xe của bạn, xe mô tô","Xe mô tô, xe con, xe của bạn"]],["Các xe đi theo thứ tự nào là đúng quy tắc giao thông đường bộ?",2,"Thứ tự ưu tiên: Xe ưu tiên - Đường ưu tiên - Đường cùng cấp: Bên phải trống, rẽ phải, đi thẳng, rẽ trái. 1. Xe con: Rẽ phải; 2. Xe của bạn: Đi thẳng; 3. Mô tô: Rẽ trái.","682d9d8455b10c9223019d06.png",["Xe của bạn, xe mô tô, xe con","Xe con, xe của bạn, xe mô tô","Xe mô tô, xe con, xe của bạn"]],["Xe nào phải dừng lại trong trường hợp này?",1,"Xe con dừng lại vì phía trước là tín hiệu đèn đỏ. Xe của bạn được đi vì rẽ phải trước đèn đỏ nên không vi phạm.","682d9d8eadadd4b27d00c410.png",["Xe con","Xe của bạn","Cả hai xe"]],["Xe của bạn được đi theo hướng nào trong trường hợp này?",1,"Làn đường mà xe của bạn đang đi chỉ được đi thẳng hoặc rẽ trái thôi. Nếu bạn chọn rẽ phải là bị đèn tín hiệu nó lừa rồi đó.","682d9e1d69c743cafe016bd5.png",["Đi thẳng, rẽ trái","Đi thẳng, rẽ phải","Rẽ trái","Đi thẳng, rẽ phải, rẽ trái"]],["Xe của bạn được đi theo hướng nào trong trường hợp này?",3,"Bạn phải dừng lại chờ đèn đỏ và làn đường bạn đang dừng xe chỉ được rẽ trái hoặc đi thẳng khi đèn xanh.","682d9e27aeebbe8d890b0c53.png",["Chuyển sang làn đường bên phải và rẽ phải","Dừng lại trước vạch dừng và rẽ phải khi đèn xanh","Dừng lại trước vạch dừng và đi thẳng hoặc rẽ trái khi đèn xanh"]],["Bạn xử lý như thế nào trong trường hợp này?",2,"Xe tải đã vào nơi giao nhau trước nên sẽ được ưu tiên trước. Biển báo phía trước là đường ưu tiên dành cho xe thô sơ nên phải nhường đường cho xe đạp. Do đó, xe bạn rẽ phải sau xe tải và xe đạp.","682d9e1742439ae7ca005042.png",["Tăng tốc độ, rẽ phải trước xe tải và xe đạp","Giảm tốc độ, rẽ phải sau xe tải và xe đạp","Tăng tốc độ, rẽ phải trước xe đạp"]],["Bạn xử lý như thế nào trong trường hợp này?",3,"Ở vạch kẻ đường dành cho người đi bộ có người chuẩn bị sang đường nên phải nhường đường và không được phép vượt. Nên bạn phải nhường đường cho người đi bộ và rẽ phải sau xe con màu xanh.","682d9e0aa266753db404bccc.png",["Tăng tốc độ, rẽ phải trước xe con màu xanh phía trước và người đi bộ","Giảm tốc độ, để người đi bộ qua đường và rẽ phải trước xe con màu xanh","Giảm tốc độ, để người đi bộ qua đường và rẽ phải sau xe con màu xanh"]],["Bạn xử lý như thế nào trong trường hợp này?",3,"Trước mặt bạn có biển Biển số R.122 “Dừng lại” nên phải dừng xe và nhường đường. Nên xe của bạn phải nhường đường cho xe đạp và xe khách.","682d9df270550be1f401e376.png",["Nhường đường cho xe khách và đi trước xe đạp","Nhường đường cho xe đạp và đi trước xe khách","Nhường đường cho xe đạp và xe khách"]],["Xe nào phải nhường đường trong trường hợp này?",2,"Biển W.207c “Giao nhau với đường không ưu tiên” cho biết xe tải đi từ đường không ưu tiên nên phải nhường đường.","c575.webp",["Xe con","Xe tải","Xe của bạn"]],["Xe nào phải nhường đường trong trường hợp này?",2,"Xe bạn không thể vượt khi phía trước có chướng ngại vật hoặc xe đi ngược chiều. Nên xe bạn phải nhường đường trong tình huống này.","c576.webp",["Xe đi ngược chiều","Xe của bạn"]],["Bạn xử lý như thế nào khi lái xe ô tô vượt qua đoàn người đi xe đạp có tổ chức?",2,"Xe của bạn không được vượt khi bên trái có chướng ngại vật hay xe ngược chiều.","682d9e053ffb9ed3d60f0a5c.png",["Tăng tốc độ, chuyển sang làn đường bên trái để vượt","Không được vượt những người đi xe đạp"]],["Phía trước có một xe đang lùi vào nơi đỗ, xe con phía trước đang chuyển sang làn đường bên trái, bạn xử lý như thế nào trong trường hợp này?",4,"Cần quan sát kỹ xe phía sau trong tình huống này để có hành động hợp lý. Nếu không có xe xin vượt chuyển làn trái đi tiếp. Nếu có xe xin vượt thì giảm tốc độ, ở lại làn đường hoặc dừng lại nếu cần thiết.","682d9ddff83ada6362090934.png",["Nếu phía sau không có xe xin vượt, chuyển sang làn đường bên trái","Nếu phía sau có xe xin vượt, thì giảm tốc độ, ở lại làn đường, dừng lại khi cần thiết","Tăng tốc độ trên làn đường của mình và vượt xe con","Ý 1 và ý 2"]],["Bạn xử lý như thế nào khi xe phía trước đang lùi ra khỏi nơi đỗ?",3,"Không được vượt khi phía trước có chướng ngại vật hay xe chạy ngược chiều. Do đó, cần giảm tốc độ, dừng lại nhường đường.","682d9dcd31eb8b48850c177f.png",["Chuyển sang nửa đường bên trái để đi tiếp","Bấm còi, nháy đèn báo hiệu và đi tiếp","Giảm tốc độ, dừng lại nhường đường"]],["Phía trước có một xe màu xanh đang vượt xe màu vàng trên làn đường của bạn, bạn xử lý như thế nào trong trường hợp này?",1,"Vì xe màu xanh đang trên làn đường của bạn, để đảm bảo an toàn, bạn cần phanh xe giảm tốc độ và đi sát lề đường bên phải.","682d9d9bb49a9f0f270b29f3.png",["Phanh xe giảm tốc độ và đi sát lề đường bên phải","Bấm còi, nháy đèn báo hiệu, giữ nguyên tốc độ và đi tiếp","Phanh xe giảm tốc độ và đi sát vào lề đường bên trái"]],["Xe tải phía trước có tín hiệu xin chuyển làn đường, bạn xử lý như thế nào trong trường hợp này?",2,"Không được vượt khi phía trước có xe đang chuyển làn đường. Do đó, để đảm bảo an toàn bạn cần phanh xe giảm tốc độ chờ xe tải phía trước chuyển làn đường.","682d9daccd0ca6ba3505f330.png",["Bật tín hiệu xin chuyển làn đường sang trái để vượt xe tải","Phanh xe giảm tốc độ chờ xe tải phía trước chuyển làn đường","Bấm còi báo hiệu và vượt qua xe tải trên làn đường của mình"]],["Bạn xử lý như thế nào trong trường hợp này?",3,"Trước mặt là Biển số W.208 “Giao nhau với đường ưu tiên” nên bạn phải giảm tốc độ, quan sát nhường đường ưu tiên nếu có và đi qua ngã tư.","682d9d9613b64ffeab0fd325.png",["Tăng tốc độ và đi thẳng qua ngã tư","Dừng xe trước vạch dừng","Giảm tốc độ và đi thẳng qua ngã tư"]],["Các xe đi theo thứ tự nào là đúng quy tắc giao thông đường bộ?",3,"Thứ tự ưu tiên: Xe ưu tiên - Đường ưu tiên - Bên phải trống - Rẽ phải - Đi thẳng - Rẽ trái. 1. Xe đạp: Bên phải trống; 2. Xe mô tô: Đi thẳng; 3. Xe của bạn: Rẽ trái.","682d9d7e24497a6b1e0e6623.png",["Xe của bạn, xe mô tô, xe đạp","Xe mô tô, xe đạp, xe của bạn","Xe đạp, xe mô tô, xe của bạn"]],["Các xe đi theo thứ tự nào là đúng quy tắc giao thông đường bộ?",4,"Thứ tự ưu tiên: Xe ưu tiên - Đường ưu tiên - Bên phải trống - Rẽ phải - Đi thẳng - Rẽ trái. 1. Xe của bạn: Đường ưu tiên; 2. Xe con: Đi không ưu tiên, đi thẳng; 3. Xe tải: Đường không ưu tiên, rẽ trái.","682d9dc48369c3f18b101994.png",["Xe của bạn, xe tải, xe con","Xe con, xe tải, xe của bạn","Xe tải, xe của bạn, xe con","Xe của bạn, xe con, xe tải"]],["Xe nào phải nhường đường trong trường hợp này?",1,"Thứ tự ưu tiên: Xe ưu tiên - Đường ưu tiên - Bên phải trống - Rẽ phải - Đi thẳng - Rẽ trái. 1. Xe con: Đường ưu tiên; 2. Xe của bạn: Đường không ưu tiên nên phải nhường đường.","c585.webp",["Xe của bạn","Xe con"]],["Xe nào phải nhường đường trong trường hợp này?",2,"Trước mặt xe của bạn có Biển số P.132 “Nhường đường cho xe cơ giới đi ngược chiều qua đường hẹp” nên phải nhường đường.","c586.webp",["Xe con","Xe của bạn"]],["Bạn xử lý như thế nào trong trường hợp này?",3,"Trước mặt bạn có biển I.423a “Đường người đi bộ sang ngang” nên bạn phải giảm tốc độ và nhường đường cho người đi bộ sang đường.","682d9de2501dde858b0183b6.png",["Tăng tốc độ, đi qua vạch người đi bộ sang đường, để người đi bộ sang đường sau","Giảm tốc độ, đi qua vạch người đi bộ sang đường, để người đi bộ sang đường sau","Giảm tốc độ, để người đi bộ sang đường trước, sau đó cho xe đi qua vạch người đi bộ sang đường"]],["Xe nào được đi trước trong trường hợp này?",2,"Thứ tự ưu tiên: Xe ưu tiên - Đường ưu tiên - Bên phải trống - Rẽ phải - Đi thẳng - Rẽ trái. Xe của bạn trên đường ưu tiên (theo biển báo) nên được đi trước.","682d9db0563258070008a98d.png",["Xe con","Xe của bạn"]],["Các xe đi theo thứ tự nào là đúng quy tắc giao thông đường bộ?",2,"Thứ tự ưu tiên: Xe ưu tiên - Đường ưu tiên - Bên phải trống - Rẽ phải - Đi thẳng - Rẽ trái. 1. Xe tải: Bên phải trống; 2. Xe con: Đi thẳng; 3. Xe của bạn: Rẽ trái.","c589.webp",["Xe con, xe tải, xe của bạn","Xe tải, xe con, xe của bạn","Xe tải, xe của bạn, xe con"]],["Bạn xử lý như thế nào trong trường hợp này?",3,"Phía trước khuất tầm nhìn, bên trái làn đường là vạch liền nên bạn cần phải giảm tốc độ, đi sát làn đường bên phải để đảm bảo đi đúng làn đường.","682d9dc6fbf472ac74023077.png",["Tăng tốc độ cho xe lấn sang phần đường bên trái","Giảm tốc độ cho xe lấn sang phần đường bên trái","Giảm tốc độ cho xe đi sát phần đường bên phải"]],["Xe nào được đi trước trong trường hợp này?",1,"Thứ tự ưu tiên: Xe ưu tiên - Đường ưu tiên - Bên phải trống - Rẽ phải - Đi thẳng - Rẽ trái. 1. Xe tải: Đi thẳng; 2. Xe của bạn: Rẽ trái.","c591.webp",["Xe tải","Xe của bạn"]],["Xe nào dừng đúng theo quy tắc giao thông?",1,"Biển số W.211a “Giao nhau với đường sắt không có rào chắn” thì các phương tiện đứng cách xa đường sắt tối thiểu 5m nên xe con đúng.","682d9dcbba5ba3e8500fd30f.png",["Xe con","Xe mô tô","Cả 2 xe đều đúng"]],["Các xe đi theo thứ tự nào là đúng quy tắc giao thông đường bộ?",3,"Thứ tự ưu tiên: Xe ưu tiên - Đường ưu tiên - Bên phải trống - Rẽ phải - Đi thẳng - Rẽ trái. 1. Xe của bạn: Bên phải trống, đi thẳng; 2. Xe tải: Rẽ trái, bên phải trống (khi xe bạn đã đi rồi); 3. Xe đạp: Rẽ trái.","682d9de0116d7e02520576a9.png",["Xe tải, xe đạp, xe của bạn","Xe của bạn, xe đạp, xe tải","Xe của bạn, xe tải, xe đạp"]],["Để điều khiển xe rẽ trái, bạn chọn hướng đi nào dưới đây?",1,"Vạch kẻ đường nét đứt màu vàng, phân chia 2 chiều xe chạy. Do đó, hướng 2 sẽ đi bên trái đường 1 đoạn nên không được phép. Do đó, bạn chỉ được chọn theo hướng 1 để rẽ trái.","682d9d99baa59922a4094b9e.png",["Hướng 1","Hướng 2","Cả hai hướng đều được"]],["Khi gặp xe ngược chiều bật đèn pha trong tình huống dưới đây, bạn xử lý như thế nào?",2,"Giữ nguyên đèn chiếu gần và giảm tốc độ do không thể quan sát rõ phía trước.","682d9daedda92ebd36018ad3.png",["Bật đèn chiếu xa, tăng tốc độ vượt xe cùng chiều","Giữ nguyên đèn chiếu gần, giảm tốc độ, đi sau xe phía trước","Giữ nguyên đèn chiếu gần, tăng tốc độ vượt xe cùng chiều"]],["Xe của bạn đang di chuyển gần đến khu vực giao cắt với đường sắt, khi rào chắn đang dịch chuyển, bạn điều khiển xe như thế nào là đúng quy tắc giao thông?",2,"Bắt buộc phải dừng xe.","682d9d945e139762aa0e74f1.png",["Quan sát nếu thấy không có tàu thì tăng tốc cho xe vượt qua đường sắt","Dừng lại trước rào chắn một khoảng cách an toàn","Ra tín hiệu, yêu cầu người gác chắn tàu kéo chậm barie để xe bạn qua"]],["Trong tình huống dưới đây, xe con màu đỏ nhập làn đường cao tốc theo hướng mũi tên là đúng hay sai?",2,"Khi nhập làn cao tốc phải chạy dọc theo làn tạm để đủ thời gian quan sát, khoảng cách an toàn và đủ tốc độ trước khi di chuyển vào làn cao tốc nên trong tình huống này xe màu đỏ sai khi nhập làn cao tốc.","682d9d7fa1d8f0e54d02ae22.png",["Đúng","Sai"]],["Trong tình huống dưới đây, xe con màu đỏ có được phép vượt khi xe con màu xanh đang vượt xe tải hay không?",2,"Xe xin vượt chỉ được vượt khi không có chướng ngại vật phía trước, không có xe chạy ngược chiều trong đoạn đường định vượt, xe chạy trước không có tín hiệu vượt xe khác và đã tránh về bên phải. Do đó, xe màu đỏ không được vượt.","682d9e0811fd8b63750a8a30.png",["Được vượt","Không được vượt"]],["Trong tình huống dưới đây, xe con màu vàng vượt xe con màu đỏ là đúng quy tắc giao thông hay không?",1,"Xe màu đỏ đang tránh về phía bên phải, xe màu vàng đã có tín hiệu xin vượt, vạch kẻ đường theo hướng xe chạy là nét đứt , không có xe ngược chiều. Nên xe vàng vượt đúng quy tắc giao thông.","682d9e185282e4e64407c37f.png",["Đúng","Không đúng"]],["Trong tình huống dưới đây, xe đầu kéo kéo rơ moóc (xe container) đang rẽ phải, xe con màu xanh và xe máy phía sau xe container đi như thế nào để bảo đảm an toàn?",2,"Giảm tốc độ chờ xe đầu kéo rẽ phải rồi mới tiếp tục đi.","c600.webp",["Vượt về phía bên phải để đi tiếp","Giảm tốc độ chờ xe container rẽ xong rồi tiếp tục đi","Vượt về phía bên trái để đi tiếp"]]];
  var Q_LIST = [];
  var highlightedEl = null;

  var w = document.createElement("div");
  w.id = "htlx-box";
  w.style.position = "fixed";
  w.style.top = "20px";
  w.style.right = "20px";
  w.style.width = "430px";
  w.style.backgroundColor = "rgb(11, 17, 32)";
  w.style.color = "rgb(248, 250, 252)";
  w.style.border = "2px solid rgb(56, 189, 248)";
  w.style.borderRadius = "12px";
  w.style.padding = "14px";
  w.style.boxShadow = "0 15px 40px rgba(0,0,0,0.85)";
  w.style.fontFamily = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";
  w.style.fontSize = "13px";
  w.style.zIndex = "2147483647";
  w.style.cursor = "move";
  w.style.userSelect = "none";

  w.innerHTML =
    '<div style="display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid rgb(30,41,59);padding-bottom:8px;margin-bottom:10px;">' +
      '<div style="display:flex;align-items:center;gap:6px;">' +
        '<span style="font-size:18px;">🚗</span>' +
        '<strong style="color:rgb(56,189,248);font-size:13px;letter-spacing:0.5px;">HỖ TRỢ ĐÁP ÁN (LotusLMS V4.0)</strong>' +
      '</div>' +
      '<div style="display:flex;gap:5px;align-items:center;">' +
        '<button id="htlx-min" title="Thu nhỏ" style="background:rgb(30,41,59);color:rgb(148,163,184);border:1px solid rgb(51,65,85);border-radius:4px;padding:2px 8px;cursor:pointer;font-size:11px;">_</button>' +
        '<button id="htlx-cls" title="Đóng" style="background:rgb(239,68,68);color:white;border:none;border-radius:4px;padding:2px 8px;cursor:pointer;font-weight:bold;font-size:11px;">✕</button>' +
      '</div>' +
    '</div>' +
    '<div id="htlx-content" style="cursor:default;user-select:text;">' +
      '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">' +
        '<div id="htlx-status" style="color:rgb(74,222,128);font-size:11px;font-weight:600;">⏳ Đang khởi tạo...</div>' +
      '</div>' +
      '<div style="background:rgb(17,24,39);border:1px solid rgb(31,41,55);border-radius:8px;padding:10px;margin-bottom:8px;">' +
        '<div style="color:rgb(148,163,184);font-size:10px;text-transform:uppercase;font-weight:bold;margin-bottom:4px;letter-spacing:0.5px;">📌 CÂU HỎI NHẬN DIỆN:</div>' +
        '<div id="htlx-q" style="color:rgb(226,232,240);font-size:12px;font-weight:500;line-height:1.45;margin-bottom:8px;max-height:65px;overflow-y:auto;">Đang quét màn hình...</div>' +
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

  function getImgFilename(url) {
    if (!url) return "";
    var clean = url.split("?")[0];
    var parts = clean.split("/");
    return (parts[parts.length - 1] || "").toLowerCase();
  }

  function parseEmbeddedQuestion(item) {
    var title = item[0] || "";
    var cIdx = item[1] || 0;
    var exp = item[2] || "";
    var fn = (item[3] || "").toLowerCase();
    var rawOpts = item[4] || [];
    var cTxt = rawOpts[cIdx - 1] ? (cIdx + "-" + rawOpts[cIdx - 1]) : ("Đáp án " + cIdx);

    var opts = rawOpts.map(function (txt, i) {
      return {
        idx: i + 1,
        key: String(i + 1),
        text: txt,
        norm: cleanOpt(txt)
      };
    });

    return {
      title: title,
      normTitle: norm(title),
      opts: opts,
      correctIdx: cIdx,
      correctText: cTxt,
      exp: exp,
      imgFile: fn
    };
  }

  function setStatus(text, color) {
    var el = document.getElementById("htlx-status");
    if (el) {
      el.innerHTML = text;
      if (color) el.style.color = color;
    }
  }

  function initDatabase() {
    Q_LIST = EMBEDDED_DATA.map(parseEmbeddedQuestion);
    setStatus("✔ Sẵn sàng 115 câu sa hình (Phần 3)", "rgb(74,222,128)");
  }

  initDatabase();

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

  function isInsideSidebar(el) {
    try {
      var rect = el.getBoundingClientRect();
      if (rect && rect.right > 0 && rect.right < 260 && window.innerWidth > 800) {
        return true;
      }
    } catch (e) {}

    while (el) {
      if (el.id === "htlx-box") return true;
      var cl = (el.className || "").toString().toLowerCase();
      var id = (el.id || "").toString().toLowerCase();
      var tag = (el.tagName || "").toLowerCase();
      if (tag === "nav" || tag === "aside") return true;
      if (cl.indexOf("sidebar") !== -1 || cl.indexOf("menu") !== -1 || cl.indexOf("course-tree") !== -1 ||
          cl.indexOf("tree") !== -1 || cl.indexOf("chapter") !== -1 || cl.indexOf("lesson") !== -1 ||
          cl.indexOf("curriculum") !== -1 || cl.indexOf("nav") !== -1 || cl.indexOf("outline") !== -1) {
        return true;
      }
      if (id.indexOf("sidebar") !== -1 || id.indexOf("menu") !== -1 || id.indexOf("tree") !== -1) return true;
      el = el.parentElement;
    }
    return false;
  }

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

      // 1. Quét tệp ảnh Sa hình
      var imgs = doc.querySelectorAll("img");
      for (var im = 0; im < imgs.length; im++) {
        var imgEl = imgs[im];
        if (isInsideSidebar(imgEl)) continue;
        var src = imgEl.src || "";
        if (src.indexOf("data:") !== 0) {
          var fn = getImgFilename(src);
          if (fn && imgFiles.indexOf(fn) === -1 && fn.indexOf("logo") === -1 && fn.indexOf("icon") === -1) {
            imgFiles.push(fn);
          }
        }
      }

      // 2. Quét Radio Buttons
      var radios = doc.querySelectorAll("input[type='radio']");
      if (radios.length > 0) {
        for (var ri = 0; ri < radios.length; ri++) {
          var r = radios[ri];
          if (isInsideSidebar(r)) continue;

          var container = null;
          var rText = "";

          // Kiểm tra label for
          if (r.id) {
            var lbl = doc.querySelector("label[for='" + r.id + "']");
            if (lbl) {
              var lt = (lbl.innerText || "").replace(/\s+/g, " ").trim();
              if (lt.length > 1) {
                rText = lt;
                container = lbl;
              }
            }
          }

          // Leo lên tìm container có chữ
          if (!rText) {
            var cur = r.parentElement;
            while (cur && cur !== doc.body) {
              if (isInsideSidebar(cur)) break;
              var ct = (cur.innerText || "").replace(/\s+/g, " ").trim();
              if (ct.length > 1 && ct.length < 350) {
                rText = ct;
                container = cur;
                break;
              }
              cur = cur.parentElement;
            }
          }

          if (!container) container = r.parentElement || r;

          var num = ri + 1;
          var cleanText = rText;

          var m = rText.match(optRegex);
          if (m) {
            var parsedNum = parseInt(m[1], 10);
            if (!isNaN(parsedNum)) num = parsedNum;
            cleanText = m[2].trim();
          }

          opts.push({
            num: num,
            fullText: rText || ("Phương án " + num),
            cleanText: cleanText,
            norm: cleanOpt(cleanText),
            element: container
          });
        }
      }

      // Fallback nếu không có thẻ radio
      if (opts.length === 0) {
        var optCandidates = doc.querySelectorAll("label, .form-check-label, .answer, .option, .choice, [class*='choice'], [class*='answer'], [class*='option'], li, div, p");
        for (var ci = 0; ci < optCandidates.length; ci++) {
          var cand = optCandidates[ci];
          if (isInsideSidebar(cand)) continue;
          if (cand.children.length > 2) continue;

          var txt = (cand.innerText || "").replace(/\s+/g, " ").trim();
          if (txt.length < 2 || txt.length > 250) continue;

          var m2 = txt.match(optRegex);
          if (m2) {
            var num2 = parseInt(m2[1], 10);
            if (isNaN(num2)) num2 = m2[1].toUpperCase().charCodeAt(0) - 64;
            var cleanText2 = m2[2].trim();

            var existed = false;
            for (var oi = 0; oi < opts.length; oi++) {
              if (opts[oi].num === num2) {
                existed = true;
                break;
              }
            }
            if (!existed) {
              opts.push({
                num: num2,
                fullText: txt,
                cleanText: cleanText2,
                norm: cleanOpt(cleanText2),
                element: cand
              });
            }
          }
        }
      }

      // 3. Quét tiêu đề câu hỏi
      var qSelectors = [
        ".question-content", ".qtext", ".question-title", ".test-question",
        ".content-question", ".title-question", "h3", "h4", "h5"
      ];
      for (var qs = 0; qs < qSelectors.length; qs++) {
        var qEls = doc.querySelectorAll(qSelectors[qs]);
        for (var qei = 0; qei < qEls.length; qei++) {
          var el = qEls[qei];
          if (isInsideSidebar(el)) continue;
          var t = (el.innerText || "").trim();
          if (t.length > 10 && t.indexOf("HỖ TRỢ") === -1 && t.indexOf("Thời gian đã học") === -1) {
            qTitle = t;
            break;
          }
        }
        if (qTitle) break;
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
      target.style.outline = "3.5px solid rgb(34, 197, 94)";
      target.style.backgroundColor = "rgba(34, 197, 94, 0.22)";
      target.style.borderRadius = "8px";
    } catch (e) {}
  }

  var lastHash = "";

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

      // 1. So khớp tệp ảnh Sa hình
      if (q.imgFile && screen.imgFiles.length > 0) {
        if (screen.imgFiles.indexOf(q.imgFile) !== -1) {
          score += 250;
        }
      }

      // 2. So khớp dấu vân tay các phương án (Option Fingerprint & Exact Position)
      var matchedOpts = 0;
      var exactPosMatches = 0;
      if (screen.opts.length > 0 && q.opts.length > 0) {
        for (var so = 0; so < screen.opts.length; so++) {
          var sOpt = screen.opts[so];
          var sOptNorm = sOpt.norm;
          if (!sOptNorm) continue;
          for (var qo = 0; qo < q.opts.length; qo++) {
            var qOpt = q.opts[qo];
            var qOptNorm = qOpt.norm;
            var isMatch = (sOptNorm === qOptNorm) ||
              (sOptNorm.length > 5 && qOptNorm.length > 5 && (sOptNorm.indexOf(qOptNorm) !== -1 || qOptNorm.indexOf(sOptNorm) !== -1));
            if (isMatch) {
              matchedOpts++;
              if (sOpt.num === qOpt.idx) {
                exactPosMatches++;
              }
              break;
            }
          }
        }
      }
      score += (matchedOpts * 60) + (exactPosMatches * 40);

      if (screen.opts.length > 0 && q.opts.length > 0 && screen.opts.length === q.opts.length) {
        score += 20;
      }

      // 3. So khớp tiêu đề câu hỏi
      if (nScrapedTitle && q.normTitle) {
        if (nScrapedTitle === q.normTitle) {
          score += 100;
        } else if (nScrapedTitle.indexOf(q.normTitle) !== -1 || q.normTitle.indexOf(nScrapedTitle) !== -1) {
          score += 50;
        }
      } else if (q.normTitle && screen.fullText.indexOf(q.normTitle) !== -1) {
        score += 80;
      }

      if (score > maxScore) {
        maxScore = score;
        bestQ = q;
      }
    }

    if (bestQ && maxScore >= 80) {
      document.getElementById("htlx-q").innerText = bestQ.title;

      var ansBadge = bestQ.correctIdx ? '<span style="background:rgb(250,204,21);color:black;font-weight:900;padding:2px 8px;border-radius:4px;margin-right:8px;font-size:12px;">Ý ' + bestQ.correctIdx + '</span>' : '';
      var ansText = bestQ.correctText;

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
        expEl.innerHTML = '💡 <b>Giải thích chi tiết:</b> ' + bestQ.exp.replace(/<br\s*[\/]?>/gi, ' ');
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
