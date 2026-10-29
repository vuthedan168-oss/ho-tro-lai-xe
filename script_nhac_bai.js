/**
 * 🚗 DỰ ÁN: HỖ TRỢ THI & ÔN LUYỆN LÁI XE (LotusLMS / HueLMS)
 * Tác giả: Vu The Dan <vuthedan168@gmail.com>
 * Dữ liệu: 58 câu Kỹ thuật lái xe ô tô (LotusLMS Đông Đô)
 * 
 * Phiên bản: 5.0 (Cập nhật 58 câu Kỹ thuật lái xe ô tô - 100% Chuẩn xác)
 * - Nạp đủ 100% 58 câu trắc nghiệm kỹ thuật lái xe trực tiếp từ API
 * - So khớp toàn văn DOM (Full-Page DOM Text Match)
 * - Khớp vân tay phương án + vị trí chính xác (Option Fingerprinting & Position)
 * - Loại trừ 100% menu sidebar bài học
 * - Chế độ An Toàn (Chống Ban): Hiển thị khung nổi đáp án để tự chọn, không can thiệp click tự động.
 */

(function () {
  var old = document.getElementById("htlx-box");
  if (old) old.remove();

  var EMBEDDED_DATA = [["Khi điều khiển xe mô tô tay ga xuống đường dốc dài, độ dốc cao, người lái xe cần thực hiện các thao tác nào dưới đây để bảo đảm an toàn?",1,"Mô tô tay ga xuống dốc dài: Giữ ga ở mức phù hợp, phanh trước và phanh sau giảm tốc độ.","",["1-Giữ tay ga ở mức độ phù hợp, sử dụng phanh trước và phanh sau để giảm tốc độ.","2-Nhả hết tay ga, tắt động cơ, sử dụng phanh trước và phanh sau để giảm tốc độ.","3-Sử dụng phanh trước để giảm tốc độ kết hợp với tắt chìa khóa điện của xe."]],["Khi điều khiển xe ô tô ra khỏi đường cao tốc người lái xe cần thực hiện như thế nào dưới đây để bảo đảm an toàn giao thông?",1,"Ra khỏi cao tốc: Tìm biển lối ra, quan sát sau/phải, an toàn thì tín hiệu, chuyển dần sang phải; KHÔNG lùi xe.","",["1-Quan sát phía trước để tìm biển báo chỉ dẫn “lối ra đường cao tốc”, kiểm tra tình trạng giao thông phía sau và bên phải, nếu bảo đảm điều kiện an toàn thì phát tín hiệu và điều khiển xe chuyển dần sang làn bên phải, nếu có làn đường giảm tốc thì phải cho xe di chuyển trên làn đường đó trước khi ra khỏi đường cao tốc.","2-Quan sát phía trước để tìm biển báo chỉ dẫn “lối ra đường cao tốc”, trường hợp vượt qua “lối ra đường cao tốc” thì phát tín hiệu, di chuyển sang làn đường giảm tốc và lùi xe quay trở lại."]],["Khi động cơ ô tô đã khởi động, muốn điều chỉnh ghế của người lái, người lái xe phải để cần số ở vị trí nào?",1,"Điều chỉnh ghế (động cơ đã nổ): Cần số ở N, P, hoặc số 0.","",["1-Vị trí N hoặc vị trí P hoặc số 0.","2-Vị trí D hoặc số 1.","3-Vị trí R."]],["Khi điều khiển xe ô tô có hộp số tự động, người lái xe sử dụng chân như thế nào là đúng để bảo đảm an toàn?",1,"Lái xe số tự động: Không dùng chân trái, chân phải điều khiển phanh và ga.","",["1-Không sử dụng chân trái; chân phải điều khiển bàn đạp phanh và bàn đạp ga.","2-Chân trái điều khiển bàn đạp phanh, chân phải điều khiển bàn đạp ga.","3-Không sử dụng chân phải; chân trái điều khiển bàn đạp phanh và bàn đạp ga."]],["Khi tầm nhìn bị hạn chế bởi sương mù hoặc mưa to, người lái xe phải thực hiện các thao tác nào để bảo đảm an toàn?",2,"Sương mù/mưa to: Giảm tốc độ, giữ khoảng cách, bật đèn sương mù và đèn gần.","",["1-Tăng tốc độ, chạy gần xe trước, nhìn đèn hậu để định hướng.","2-Giảm tốc độ, chạy cách xa xe trước với khoảng cách an toàn, bật đèn sương mù và đèn chiếu gần.","3-Tăng tốc độ, bật đèn pha vượt qua xe chạy trước."]],["Khi đèn pha của xe đi ngược chiều gây chói mắt, làm giảm khả năng quan sát trên đường, người lái xe xử lý như thế nào dưới đây để bảo đảm an toàn?",1,"Đèn pha xe ngược chiều chói mắt: Giảm tốc độ, vững tay lái, nhìn chếch lề phải.","",["1-Giảm tốc độ, giữ vững tay lái, nhìn chếch sang lề đường bên phải.","2-Bật đèn pha chiếu xa và giữ nguyên tốc độ.","3-Tăng tốc độ, bật đèn pha đối diện xe phía trước."]],["Để đạt được hiệu quả phanh cao nhất, người lái xe mô tô phải sử dụng các kỹ năng như thế nào dưới đây?",3,"Phanh xe mô tô hiệu quả: Giảm hết ga, dùng đồng thời phanh sau và phanh trước.","",["1-Sử dụng phanh trước.","2-Sử dụng phanh sau.","3-Giảm hết ga, sử dụng đồng thời cả phanh sau và phanh trước."]],["Khi lái xe ô tô trên mặt đường có nhiều “ổ gà”, người lái xe phải thực hiện thao tác như thế nào để bảo đảm an toàn?",1,"Đường nhiều ổ gà: Giảm tốc độ, về số thấp, giữ đều ga.","",["1-Giảm tốc độ, về số thấp và giữ đều ga.","2-Tăng tốc độ cho xe lướt qua nhanh.","3-Tăng tốc độ, đánh lái liên tục để tránh “ổ gà”."]],["Khi điều khiển xe ô tô gặp mưa to hoặc sương mù, người lái xe phải làm gì để bảo đảm an toàn?",1,"Mưa to/sương mù: Bật đèn chiếu gần.","",["1-Bật đèn chiếu gần và đèn vàng (nếu có), điều khiển gạt nước, điều khiển ô tô đi với tốc độ chậm để có thể quan sát được; tìm chỗ an toàn dừng xe, bật đèn dừng khẩn cấp báo hiệu cho các xe khác biết.","2-Bật đèn chiếu xa và đèn vàng, điều khiển gạt nước, tăng tốc độ điều khiển ô tô qua khỏi khu vực mưa hoặc sương mù.","3-Tăng tốc độ, bật đèn pha vượt qua xe chạy phía trước."]],["Điều khiển xe ô tô trong trời mưa, người lái xe phải xử lý như thế nào để bảo đảm an toàn?",1,"Lái xe trời mưa: Giảm tốc, tăng quan sát, không phanh/ga/lái đột ngột, bật đèn gần, gạt nước.","",["1-Giảm tốc độ, tăng cường quan sát, không nên phanh gấp, không nên tăng ga hay đánh vô lăng đột ngột, bật đèn chiếu gần, mở chế độ gạt nước ở chế độ phù hợp để đảm bảo quan sát.","2-Phanh gấp khi xe đi vào vũng nước và tăng ga ngay sau khi ra khỏi vũng nước.","3-Bật đèn chiếu xa, tăng tốc độ điều khiển ô tô qua khỏi khu vực mưa."]],["Khi lùi xe, người lái xe phải xử lý như thế nào để bảo đảm an toàn giao thông?",1,"Lùi xe an toàn: Quan sát trái/phải/sau, có tín hiệu, lùi tốc độ phù hợp.","",["1-Quan sát bên trái, bên phải, phía sau xe, có tín hiệu cần thiết và lùi xe với tốc độ phù hợp.","2-Quan sát phía trước xe và lùi xe với tốc độ nhanh.","3-Quan sát bên trái và phía trước của xe và lùi xe với tốc độ nhanh."]],["Điều khiển xe ô tô trong khu vực đông dân cư cần lưu ý điều gì dưới đây?",3,"Lái xe khu đông dân cư: Giảm tốc độ an toàn + Đi đúng làn.","",["1-Giảm tốc độ đến mức an toàn, quan sát, nhường đường cho người đi bộ, giữ khoảng cách an toàn với các xe phía trước.","2-Đi đúng làn đường quy định, chỉ được chuyển làn đường ở nơi cho phép, nhưng phải quan sát.","3-Cả hai ý trên."]],["Khi điều khiển xe ô tô nhập vào đường cao tốc người lái xe cần thực hiện như thế nào dưới đây để bảo đảm an toàn giao thông?",1,"Nhập làn cao tốc: Quan sát, tín hiệu, nhường xe trên cao tốc.","",["1-Quan sát, phát tín hiệu, nhường đường cho các xe đang chạy trên đường cao tốc, khi đủ điều kiện an toàn thì tăng tốc độ cho xe nhập vào làn đường cao tốc, nếu có làn đường tăng tốc thì phải cho xe chạy trên làn đường đó trước khi cho xe nhập vào làn của đường cao tốc.","2-Phát tín hiệu, quan sát các xe đang chạy phía trước, nếu bảo đảm các điều kiện an toàn thì tăng tốc độ cho xe nhập ngay vào làn đường cao tốc.","3-Phát tín hiệu và lái xe nhập vào làn đường tăng tốc, quan sát các xe phía sau đang chạy trên đường cao tốc, khi đủ điều kiện an toàn thì giảm tốc độ, từ từ cho xe nhập vào làn đường cao tốc."]],["Người lái xe được dừng xe, đỗ xe trên làn dừng khẩn cấp của đường cao tốc trong trường hợp nào dưới đây?",1,"Dừng/đỗ làn khẩn cấp cao tốc: Chỉ khi xe sự cố, tai nạn, khẩn cấp không đi được.","",["1-Xe gặp sự cố, tai nạn hoặc trường hợp khẩn cấp không thể di chuyển bình thường.","2-Để nghỉ ngơi, đi vệ sinh, chụp ảnh, làm việc riêng...","3-Cả hai ý trên."]],["Khi lái xe ô tô qua đường sắt không có rào chắn, không có người điều khiển giao thông, người lái xe thực hiện thao tác: “giảm tốc độ, dừng lại trước vạch dừng, quan sát cả hai phía, nếu không có tàu đi tới, tăng ga nhẹ vượt qua đường sắt. Nếu thấy có tàu đi tới thì dừng lại trước vạch dừng, chỉ khi tàu đi qua mới được đi” để đảm bảo an toàn là đúng hay không?",2,"Qua đường sắt không rào chắn: dừng, quan sát, an toàn mới qua là ĐÚNG.","",["1-Không đúng.","2-Đúng.","3-Không cần thiết, vì nếu nhìn thấy tàu còn cách xa, người lái xe có thể tăng số cao, tăng ga để cho xe nhanh chóng vượt qua đường sắt."]],["Trên đường đôi muốn vượt xe kéo rơ moóc phía trước, người lái xe phải xử lý như thế nào?",4,"Vượt xe kéo rơ moóc (đường đôi): Giữ khoảng cách + Chờ tín hiệu cho vượt + Vượt qua thì về lại làn và tắt xi nhan.","",["1-Giữ khoảng cách an toàn, tránh đi vào vị trí điểm mù của xe kéo rơ moóc, bật xi nhan trái đồng thời kết hợp đèn, còi xin vượt.","2-Khi xe kéo rơ moóc đã có tín hiệu cho vượt (không có chướng ngại vật phía trước và xe đi ngược chiều), thấy đủ điều kiện an toàn thì vượt dứt khoát, không di chuyển song song bên cạnh xe kéo rơ moóc.","3-Khi vượt qua, phải quan sát gương chiếu hậu bên phải nếu có khoảng trống an toàn mới được cho xe chạy vào làn của mình, tắt xi nhan và tiếp tục hành trình.","4-Cả ba ý trên."]],["Khi điều khiển xe ô tô xuống đường dốc dài, độ dốc cao, người lái xe số tự động cần thực hiện các thao tác nào dưới đây để bảo đảm an toàn?",1,"Xuống dốc dài (số tự động): Nhả ga, về số thấp, phanh chân phù hợp.","",["1-Nhả bàn đạp ga, về số thấp, đạp phanh chân với mức độ phù hợp để giảm tốc độ.","2-Nhả bàn đạp ga, về số N đạp phanh chân và kéo phanh tay để giảm tốc độ."]],["Khi đi từ đường nhánh ra đường chính, người lái xe phải xử lý như thế nào là đúng?",1,"Từ đường nhánh ra đường chính: Quan sát, giảm tốc, tín hiệu, nhường xe đường chính.","",["1-Quan sát, giảm tốc độ, phát tín hiệu, nhường đường cho xe trên đường chính từ bất kỳ hướng nào tới.","2-Nháy đèn, bấm còi để xe đi trên đường chính biết và tăng tốc độ cho xe đi ra đường chính.","3-Quan sát xe đang đi trên đường chính, nếu là xe có kích thước lớn hơn thì nhường đường, xe có kích thước nhỏ hơn thì tăng tốc độ cho xe đi ra đường chính."]],["Khi đang lái xe mô tô hoặc ô tô, nếu có nhu cầu sử dụng điện thoại để nhắn tin hoặc gọi điện, người lái xe phải thực hiện như thế nào trong các tình huống nêu dưới đây?",2,"Muốn dùng điện thoại khi lái xe: Giảm tốc độ, dừng xe nơi cho phép rồi mới dùng.","",["1-Giảm tốc độ để bảo đảm an toàn với xe phía trước và sử dụng điện thoại để liên lạc.","2-Giảm tốc độ để dừng xe ở nơi cho phép sau đó sử dụng điện thoại để liên lạc.","3-Tăng tốc độ để cách xa xe phía sau và sử dụng điện thoại để liên lạc."]],["Những thói quen nào dưới đây khi điều khiển xe mô tô tay ga tham gia giao thông dễ gây tai nạn nguy hiểm?",3,"Thói quen nguy hiểm (xe tay ga): Chỉ dùng phanh trước.","",["1-Sử dụng còi.","2-Phanh đồng thời cả phanh trước và phanh sau.","3-Chỉ sử dụng phanh trước."]],["Người ngồi trên xe ô tô cần thực hiện những thao tác mở cửa như thế nào dưới đây để xuống xe để bảo đảm an toàn?",1,"Mở cửa ô tô xuống xe: Quan sát, an toàn thì mở hé, rồi mở đủ.","",["1-Quan sát phía trước, phía sau và bên phía mở cửa để phát hiện các phương tiện đang di chuyển tới gần, khi đủ điều kiện an toàn, mở hé cửa, sau đó mở ở mức cần thiết để xuống xe.","2-Quan sát tình hình giao thông phía trước, không cần quan sát phía sau và bên mở cửa; mở cánh cửa hết hành trình và nhanh chóng ra khỏi xe ô tô."]],["Khi điều khiển xe mô tô quay đầu, người lái xe cần thực hiện như thế nào để bảo đảm an toàn?",4,"Xe mô tô quay đầu: Tín hiệu trước, giảm tốc + Chỉ nơi cho phép + Quan sát, nhường đường.","",["1-Bật tín hiệu báo rẽ trước khi quay đầu, từ từ giảm tốc độ đến mức có thể dừng lại.","2-Chỉ quay đầu xe tại những nơi được phép quay đầu.","3-Quan sát an toàn các phương tiện tới từ phía trước, phía sau, hai bên đồng thời nhường đường cho xe từ bên phải và phía trước đi tới.","4-Cả ba ý trên."]],["Tay ga trên xe mô tô hai bánh có tác dụng gì dưới đây?",4,"Tay ga xe mô tô: Điều khiển xe chạy về trước + Điều khiển tốc độ.","",["1-Để điều khiển xe chạy về phía trước.","2-Để điều tiết công suất động cơ qua đó điều khiển tốc độ của xe.","3-Để điều khiển xe chạy lùi.","4-Ý 1 và ý 2."]],["Gương chiếu hậu của xe mô tô hai bánh có tác dụng gì dưới đây?",3,"Gương chiếu hậu xe mô tô: Quan sát an toàn sau trái, phải trước khi chuyển hướng.","",["1-Để quan sát an toàn phía bên trái khi chuẩn bị rẽ trái.","2-Để quan sát an toàn phía bên phải khi chuẩn bị rẽ phải.","3-Để quan sát an toàn phía sau của bên trái và bên phải trước khi chuyển hướng.","4-Để quan sát an toàn phía trước cả bên trái và bên phải trước khi chuyển hướng."]],["Để bảo đảm an toàn khi tham gia giao thông, người lái xe mô tô hai bánh cần điều khiển tay ga như thế nào?",3,"Điều khiển tay ga mô tô an toàn: Tăng từ từ, giảm nhanh.","",["1-Tăng ga thật mạnh, giảm ga từ từ.","2-Tăng ga thật mạnh, giảm ga thật nhanh.","3-Tăng ga từ từ, giảm ga thật nhanh.","4-Tăng ga từ từ, giảm ga từ từ."]],["Để tránh đổ, ngã khi điều khiển xe mô tô hai bánh ở nơi đường xấu, nhỏ và hẹp, người lái xe cần xử lý như thế nào?",4,"Tránh ngã xe máy (đường xấu/hẹp): Tốc độ thấp + Không nên dùng phanh trước + Không lắc người.","",["1-Đi ở tốc độ thấp, quan sát liên tục khoảng cách từ 05 m đến 10 m phía trước để điều chỉnh sớm hướng di chuyển.","2-Trong quá trình di chuyển không nên dùng phanh trước tránh làm khóa bánh dẫn hướng.","3-Không được lắc người sang trái hoặc phải nhiều, trọng tâm cơ thể cần trùng với trọng tâm của xe.","4-Cả ba ý trên."]],["Khi lái xe ô tô điện xuống dốc dài, đổ đèo, người lái xe cần chú ý những vấn đề gì để bảo đảm an toàn?",4,"Lái ô tô điện xuống dốc dài/đèo: Kiểm tra hệ thống an toàn/pin + Nhả ga + Rà phanh chân.","",["1-Kiểm tra hệ thống an toàn, pin của xe trước khi xuất phát.","2-Nhả chân ga để phanh tái sinh hoạt động.","3-Rà phanh chân để kịp thời xử lý tình huống khẩn cấp.","4-Cả ba ý trên."]],["Khi điều khiển xe ô tô có hộp số tự động đi vào đường trơn trượt, lầy lội, người lái xe phải xử lý như thế nào để đảm bảo an toàn?",1,"Xe số tự động (đường trơn/lầy): Về số thấp, kết hợp phanh chân giảm tốc.","",["1-Về số thấp, kết hợp phanh chân để giảm tốc độ.","2-Giữ nguyên tay số D, kết hợp phanh đỗ để giảm tốc độ.","3-Về số N (số 0), kết hợp phanh chân để giảm tốc độ."]],["Khi điều khiển xe ô tô qua đường sắt không có rào chắn, không có người điều khiển giao thông, người lái xe phải xử lý như thế nào?",3,"Qua đường sắt không rào chắn: Giảm tốc + Nếu có tàu: dừng hẳn chờ tàu qua.","",["1-Giảm tốc độ, dừng lại trước vạch dừng, quan sát cả hai phía, nếu không có tàu đi tới, tăng ga nhẹ vượt qua đường sắt.","2-Nếu thấy có tàu đi tới thì dừng lại trước vạch dừng, chỉ khi tàu đi qua mới được đi.","3-Cả hai ý trên."]],["Khi vào số để khởi hành xe ô tô có số tự động, người lái xe phải thực hiện các thao tác nào để bảo đảm an toàn?",1,"Khởi hành xe số tự động: Đạp phanh chân hết cỡ, vào số, nhả phanh đỗ, kiểm tra số rồi mới lăn bánh.","",["1-Đạp bàn đạp phanh chân hết hành trình, vào số và nhả phanh đỗ, kiểm tra lại xem có bị nhầm số không rồi mới cho xe lăn bánh.","2-Đạp bàn đạp để tăng ga với mức độ phù hợp, vào số và kiểm tra lại xem có bị nhầm số không rồi mới cho xe lăn bánh."]],["Khi điều khiển xe ô tô tự đổ, người lái xe cần chú ý những điểm gì để bảo đảm an toàn?",4,"Lái xe tự đổ: Chạy chậm đường xấu + Khi đổ hàng phải chọn vị trí.","",["1-Khi chạy trên đường xấu, nhiều ổ gà nên chạy chậm để thùng xe không bị lắc mạnh, không gây hiện tượng lệch “ben”; khi chạy vào đường vòng, cần giảm tốc độ, không lấy lái gấp và không phanh gấp.","2-Khi chạy trên đường quốc lộ, đường bằng phẳng không cần hạ hết thùng xe xuống.","3-Khi đổ hàng phải chọn vị trí có nền đường cứng và phẳng, dừng hẳn xe, kéo hết phanh đỗ; sau đó mới điều khiển cơ cấu nâng “ben” để đổ hàng, đổ xong hàng mới hạ thùng xuống.","4-Ý 1 và ý 3."]],["Khi nhả phanh đỗ cơ khí điều khiển bằng tay (phanh tay), người lái xe cần phải thực hiện các thao tác nào?",2,"Nhả phanh tay: Bóp khóa hãm, đẩy cần về trước; (kẹt) kéo lại đồng thời bóp khóa.","",["1-Dùng lực tay phải kéo cần phanh tay về phía sau hết hành trình; nếu khóa hãm bị kẹt cứng phải đẩy mạnh phanh tay về phía trước, sau đó bóp khóa hãm.","2-Dùng lực tay phải bóp khóa hãm đẩy cần phanh tay về phía trước hết hành trình; nếu khóa hãm bị kẹt cứng phải kéo cần phanh tay về phía sau đồng thời bóp khóa hãm.","3-Dùng lực tay phải đẩy cần phanh tay về phía trước hết hành trình; nếu khóa hãm bị kẹt cứng phải đẩy mạnh phanh tay về phía trước, sau đó bóp khóa hãm."]],["Khi khởi hành ô tô sử dụng hộp số cơ khí trên đường bằng, người lái xe cần thực hiện các thao tác nào theo trình tự dưới đây?",2,"Khởi hành xe số sàn (đường bằng): Kiểm tra an toàn; Đạp côn hết cỡ; Vào số 1; Nhả phanh tay, báo hiệu; Ga đủ, nhả côn từ từ (giữ 1/2 khoảng 3s) rồi nhả hết.","",["1-Kiểm tra an toàn xung quanh xe ô tô; nhả từ từ đến 1/2 hành trình bàn đạp ly hợp (côn) và giữ trong khoảng 3 giây; vào số 1; nhả hết phanh tay, báo hiệu bằng còi, đèn trước khi xuất phát; tăng ga đủ để xuất phát, sau đó vừa tăng ga vừa nhả hết côn để cho xe ô tô chuyển động.","2-Kiểm tra an toàn xung quanh xe ô tô; đạp ly hợp (côn) hết hành trình; vào số 1; nhả hết phanh tay, báo hiệu bằng còi, đèn trước khi xuất phát; tăng ga đủ để xuất phát; nhả từ từ đến 1/2 hành trình bàn đạp côn và giữ trong khoảng 3 giây, sau đó vừa tăng ga vừa nhả hết côn để cho xe ô tô chuyển động."]],["Khi quay đầu xe, người lái xe cần phải quan sát và thực hiện các thao tác nào để bảo đảm an toàn giao thông?",1,"Quay đầu xe an toàn: Quay đầu xe với tốc độ thấp.","",["1-Quan sát biển báo hiệu để biết nơi được phép quay đầu; quan sát kỹ địa hình nơi chọn để quay đầu; lựa chọn quỹ đạo quay đầu xe cho thích hợp; quay đầu xe với tốc độ thấp; thường xuyên báo tín hiệu để người, các phương tiện xung quanh được biết; nếu quay đầu xe ở nơi nguy hiểm thì đưa đầu xe về phía nguy hiểm, đưa đuôi xe về phía an toàn.","2-Quan sát biển báo hiệu để biết nơi được phép quay đầu; quan sát kỹ địa hình nơi chọn để quay đầu; lựa chọn quỹ đạo quay đầu xe; quay đầu xe với tốc độ tối đa; thường xuyên báo tín hiệu để người, các phương tiện xung quanh được biết; nếu quay đầu xe ở nơi nguy hiểm thì đưa đuôi xe về phía nguy hiểm và đầu xe về phía an toàn."]],["Khi ngồi lái ô tô tư thế chân, lưng, tay của người lái xe như thế nào là đúng để bảo đảm an toàn và thoải mái?",1,"Tư thế lái đúng: Chân đạp phanh/ga dễ, lưng thẳng, tay nắm vô lăng (trái 9-10h, phải 2-4h).","",["1-Điều chỉnh ghế sao cho chân có thể đạp phanh và ga dễ dàng, ngồi thẳng lưng, hai tay nắm vô lăng, tay trái nắm ở vị trí 9 đến 10 giờ và tay phải nắm ở vị trí từ 2 đến 4 giờ.","2-Ngồi sát vô lăng để dễ quan sát hoặc ngồi tự do, không cần điều chỉnh ghế.","3-Ngồi ngả người về phía sau nhiều để thư giãn, chân trái để ở vị trí chân ga, hai tay nắm vô lăng ở vị trí bất kỳ."]],["Khi điều khiển ô tô lên dốc cao, người lái xe cần thực hiện các thao tác nào dưới đây để bảo đảm an toàn?",2,"Lên dốc cao: Về số thấp từ chân dốc.","",["1-Tăng lên số cao từ chân dốc, điều chỉnh ga cho xe nhanh lên dốc; đến gần đỉnh dốc phải tăng ga để xe nhanh chóng qua dốc; về số thấp, đi sát về phía bên phải đường, có tín hiệu (còi, đèn) để báo cho người lái xe đi ngược chiều biết.","2-Về số thấp từ chân dốc, điều chỉnh ga cho xe từ từ lên dốc; đến gần đỉnh dốc phải đi chậm, đi sát về phía bên phải đường, có tín hiệu (còi, đèn) để báo cho người lái xe đi ngược chiều biết."]],["Khi điều khiển ô tô xuống dốc dài, người lái xe cần thực hiện các thao tác nào dưới đây để bảo đảm an toàn?",2,"Xuống dốc dài: Về số thấp.","",["1-Tăng lên số cao, nhả bàn đạp ga ở mức độ phù hợp, kết hợp với phanh chân để khống chế tốc độ.","2-Về số thấp, nhả bàn đạp ga ở mức độ phù hợp, kết hợp với phanh chân để khống chế tốc độ.","3-Về số không (0), nhả bàn đạp ga ở mức độ phù hợp, kết hợp với phanh chân để khống chế tốc độ."]],["Khi xuống dốc, muốn dừng xe, người lái xe cần thực hiện các thao tác nào để bảo đảm an toàn?",1,"Dừng xe khi xuống dốc: Tín hiệu rẽ phải, sát lề phải.","",["1-Có tín hiệu rẽ phải, điều khiển xe sát vào lề đường bên phải; đạp phanh sớm và mạnh hơn lúc dừng xe trên đường bằng để xe đi với tốc độ chậm đến mức dễ dàng dừng lại được; về số 1, đạp 1/2 ly hợp (côn) cho xe đến chỗ dừng; khi xe đã dừng, về số không (N), đạp phanh chân, sử dụng phanh đỗ.","2-Có tín hiệu rẽ phải, điều khiển xe sát vào lề đường bên trái; đạp hết hành trình ly hợp (côn) và nhả bàn đạp ga để xe đi với tốc độ chậm đến mức dễ dàng dừng lại được tại chỗ dừng; khi xe đã dừng, đạp và giữ phanh chân.","3-Có tín hiệu rẽ trái, điều khiển xe sát vào lề đường bên phải; đạp phanh sớm và mạnh hơn lúc dừng xe trên đường bằng để xe đi với tốc độ chậm đến mức dễ dàng dừng lại được; về số không (N) để xe đi đến chỗ dừng, khi xe đã dừng, sử dụng phanh đỗ."]],["Khi điều khiển xe trên đường vòng người lái xe cần phải làm gì để bảo đảm an toàn?",1,"Đi đường vòng: Giảm tốc độ, về số thấp.","",["1-Quan sát cẩn thận các chướng ngại vật và báo hiệu bằng còi, đèn; giảm tốc độ tới mức cần thiết, về số thấp và thực hiện quay vòng với tốc độ phù hợp với bán kính cong của đường vòng.","2-Quan sát cẩn thận các chướng ngại vật và báo hiệu bằng còi, đèn; tăng tốc để nhanh chóng qua đường vòng và giảm tốc độ sau khi qua đường vòng."]],["Khi điều khiển xe ô tô rẽ phải, người lái xe cần thực hiện các thao tác nào để bảo đảm an toàn?",2,"Rẽ phải ô tô: Tín hiệu rẽ phải sớm, giảm tốc độ.","",["1-Có tín hiệu rẽ phải; quan sát an toàn phía sau; điều khiển xe sang làn đường bên trái; giảm tốc độ và quan sát an toàn phía bên phải để điều khiển xe qua chỗ đường giao nhau.","2-Cách chỗ rẽ một khoảng cách an toàn có tín hiệu rẽ phải; giảm tốc độ, quan sát an toàn phía trước, sau, bên phải và điều khiển xe từ từ rẽ phải.","3-Cách chỗ rẽ một khoảng cách an toàn có tín hiệu rẽ phải; quan sát an toàn phía sau; điều khiển xe bám sát vào phía phải đường; tăng tốc độ và quan sát an toàn phía bên trái để điều khiển xe qua chỗ đường giao nhau."]],["Khi điều khiển xe ô tô rẽ trái, người lái xe cần thực hiện các thao tác nào để bảo đảm an toàn?",1,"Rẽ trái ô tô: Tín hiệu rẽ trái sớm, giảm tốc độ.","",["1-Cách chỗ rẽ một khoảng cách an toàn có tín hiệu rẽ trái; giảm tốc độ, quan sát an toàn xung quanh đặc biệt là bên trái; đổi sang làn đường bên trái và điều khiển xe từ từ rẽ trái.","2-Cách chỗ rẽ một khoảng cách an toàn có tín hiệu rẽ trái, tăng tốc độ để xe nhanh chóng qua chỗ đường giao nhau; có tín hiệu xin đổi làn đường; quan sát an toàn xung quanh đặc biệt là bên trái; đổi làn đường sang phải để mở rộng vòng cua."]],["Khi điều khiển xe sử dụng hộp số cơ khí vượt qua rãnh lớn cắt ngang mặt đường, người lái xe cần thực hiện các thao tác nào để đảm bảo an toàn?",3,"Qua rãnh lớn (số sàn): Về số 1, từ từ và KHÔNG tăng số.","",["1-Vào số một (1) và từ từ cho hai bánh xe trước xuống rãnh, tăng ga cho hai bánh xe trước vượt lên khỏi rãnh, tăng số, tăng tốc độ để bánh xe sau vượt qua rãnh.","2-Tăng ga, tăng số để hai bánh xe trước và bánh xe sau vượt qua khỏi rãnh và chạy bình thường.","3-Vào số một (1) và từ từ cho hai bánh xe trước xuống rãnh, tăng ga cho hai bánh xe trước vượt lên khỏi rãnh, tiếp tục để bánh xe sau từ từ xuống rãnh rồi tăng dần ga cho xe ô tô lên khỏi rãnh."]],["Khi điều khiển xe qua đường sắt, người lái xe cần phải thực hiện các thao tác nào dưới đây để bảo đảm an toàn?",3,"Qua đường sắt: (Có chuông/chắn hạ) Dừng an toàn, kéo phanh tay nếu chờ lâu + (Không chuông/chắn) Quan sát, an toàn thì về số thấp, ga nhẹ, không đổi số khi qua.","",["1-Khi có chuông báo hoặc thanh chắn đã hạ xuống, người lái xe phải dừng xe tạm thời đúng khoảng cách an toàn, kéo phanh tay nếu đường dốc hoặc phải chờ lâu.","2-Khi không có chuông báo hoặc thanh chắn không hạ xuống, người lái xe cần phải quan sát nếu thấy đủ điều kiện an toàn thì về số thấp, tăng ga nhẹ và không thay đổi số trong quá trình vượt qua đường sắt để tránh động cơ chết máy cho xe cho vượt qua.","3-Cả hai ý trên."]],["Khi điều khiển xe tăng số, người lái xe cần chú ý những điểm gì để bảo đảm an toàn?",1,"Tăng số: Không nhìn xuống buồng lái.","",["1-Không được nhìn xuống buồng lái, cần phải tăng thứ tự từ thấp đến cao, phối hợp các động tác phải nhịp nhàng, chính xác.","2-Nhìn xuống buồng lái để biết chính xác vị trí các tay số, cần phải tăng thứ tự từ thấp đến cao, phối hợp các động tác phải nhịp nhàng, vù ga phải phù hợp với tốc độ."]],["Khi đã đỗ xe ô tô sát lề đường bên phải, người lái xe phải thực hiện các thao tác nào dưới đây khi mở cửa xuống xe để đảm bảo an toàn?",1,"Mở cửa xe: Mở hé cửa, an toàn mới mở đủ để xuống.","",["1-Quan sát tình hình giao thông phía trước, phía sau và phía bên mở cửa xe, mở hé cánh cửa, nếu đảm bảo an toàn thì mở cửa ở mức cần thiết để xuống xe ô tô.","2-Mở cánh cửa và quan sát tình hình giao thông phía trước, nếu đảm bảo an toàn thì mở cửa ở mức cần thiết để xuống xe ô tô.","3-Mở cánh cửa hết hành trình và nhanh chóng ra khỏi xe ô tô."]],["Khi điều khiển xe giảm số, người lái xe cần phải chú ý những điểm gì để bảo đảm an toàn?",2,"Giảm số: Không nhìn xuống buồng lái.","",["1-Nhìn xuống buồng lái để biết chính xác vị trí các tay số, cần phải giảm thứ tự từ cao xuống thấp, phối hợp các động tác phải nhịp nhàng, chính xác.","2-Không được nhìn xuống buồng lái, cần phải giảm thứ tự từ cao xuống thấp, phối hợp các động tác phải nhịp nhàng, chính xác, vù ga phải phù hợp với tốc độ."]],["Để giảm tốc độ khi ô tô đi xuống đường dốc dài, người lái xe phải thực hiện các thao tác nào để bảo đảm an toàn?",2,"Giảm tốc độ xuống dốc dài: Về số thấp.","",["1-Nhả bàn đạp ga, đạp ly hợp (côn) hết hành trình, đạp mạnh phanh chân để giảm tốc độ.","2-Về số thấp phù hợp, nhả bàn đạp ga, kết hợp đạp phanh chân với mức độ phù hợp để giảm tốc độ.","3-Nhả bàn đạp ga, tăng lên số cao, đạp phanh chân với mức độ phù hợp để giảm tốc độ."]],["Khi điều khiển ô tô qua đường ngập nước, người lái xe cần thực hiện các thao tác nào để đảm bảo an toàn?",3,"Qua đường ngập nước: Ước lượng độ ngập, về số thấp, giữ đều ga, vững tay lái.","",["1-Tăng lên số cao, tăng ga và giảm ga liên tục để thay đổi tốc độ, giữ vững tay lái để ô tô vượt qua đoạn đường ngập nước.","2-Đạp ly hợp (côn) hết hành trình, tăng ga và giảm ga liên tục để thay đổi tốc độ, giữ vững tay lái để ô tô vượt qua đoạn đường ngập nước.","3-Quan sát, ước lượng độ ngập nước mà xe ô tô có thể vượt qua an toàn, về số thấp, giữ đều ga và giữ vững tay lái để ô tô vượt qua đoạn đường ngập nước."]],["Khi điều khiển xe ô tô tới gần xe chạy ngược chiều vào ban đêm, người lái xe cần thực hiện các thao tác nào để bảo đảm an toàn?",1,"Gặp xe ngược chiều ban đêm: Chuyển đèn xa về gần; không nhìn thẳng đèn xe đối diện, nhìn chếch phải.","",["1-Chuyển từ đèn chiếu xa sang đèn chiếu gần; không nhìn thẳng vào đèn của xe chạy ngược chiều mà nhìn chếch sang phía phải theo chiều chuyển động của xe mình.","2-Chuyển từ đèn chiếu gần sang đèn chiếu xa; không nhìn thẳng vào đèn của xe chạy ngược chiều mà nhìn chếch sang phía phải theo chiều chuyển động của xe mình.","3-Chuyển từ đèn chiếu xa sang đèn chiếu gần; nhìn thẳng vào đèn của xe chạy ngược chiều để tránh xe bảo đảm an toàn."]],["Khi điều khiển xe ô tô trên đường trơn cần chú ý những điểm gì để bảo đảm an toàn?",2,"Lái xe đường trơn: Gài cầu (nếu có), đều ga, không lấy nhiều lái/đánh lái ngoặt/phanh gấp.","",["1-Giữ vững tay lái cho xe đi đúng vệt bánh xe đi trước, sử dụng số thấp đi chậm, giữ đều ga, đánh lái ngoặt và phanh gấp khi cần thiết.","2-Giữ vững tay lái cho xe đi đúng vệt bánh xe đi trước, sử dụng số thấp đi chậm, gài cầu (nếu có), giữ đều ga, không lấy nhiều lái, không đánh lái ngoặt và phanh gấp."]],["Khi động cơ xe ô tô đã khởi động, bảng đồng hồ xuất hiện ký hiệu như hình vẽ dưới đây là báo hiệu tình trạng gì của xe ô tô?",1,"BRAKE hiển thị thì đang sử dụng phanh đỗ xe (phanh tay).","682d9dc2bfc3b7af5f0e862d.png",["1-Đang sử dụng phanh đỗ.","2-Nhiệt độ nước làm mát quá mức cho phép.","3-Cửa xe đang mở."]],["Khi động cơ xe ô tô đã khởi động, bảng đồng hồ xuất hiện ký hiệu như hình vẽ dưới đây là báo hiệu tình trạng gì của xe ô tô?",4,"Thấy cảnh báo giọt dầu là do áp suất dầu ở mức thấp.","682d9ddafe0f099a7602bcb4.png",["1-Đang sử dụng phanh đỗ.","2-Thiếu dầu phanh.","3-Nhiệt độ nước làm mát tăng quá mức cho phép.","4-Áp suất dầu ở mức thấp."]],["Khi động cơ xe ô tô đã khởi động, bảng đồng hồ xuất hiện ký hiệu như hình vẽ dưới đây là báo hiệu tình trạng gì của xe ô tô?",1,"Biểu tượng này báo Cửa xe đóng chưa chặt hoặc có cửa xe chưa đóng.","682d9dcf0b728fd6fc080ce1.png",["1-Cửa xe đóng chưa chặt hoặc có cửa xe chưa đóng.","2-Bộ nạp ắc quy gặp sự cố kỹ thuật.","3-Dầu bôi trơn bị thiếu.","4-Ý 2 và ý 3."]],["Khi động cơ xe ô tô đã khởi động, bảng đồng hồ xuất hiện ký hiệu như hình vẽ dưới đây là báo hiệu tình trạng gì của xe ô tô?",3,"Biểu tượng này báo lái xe hoặc người ngồi ghế trước chưa cài dây an toàn.","682d9df934a0f55e460bfec9.png",["1-Thiếu dầu phanh, phanh tay đang hãm.","2-Hệ thống túi khí an toàn gặp sự cố.","3-Lái xe và người ngồi ghế trước chưa cài dây đai an toàn.","4-Cửa đóng chưa chặt, có cửa chưa đóng."]],["Khi động cơ xe ô tô đã khởi động, bảng đồng hồ xuất hiện ký hiệu như hình vẽ dưới đây là báo hiệu tình trạng gì của xe ô tô?",4,"Biểu tượng này báo xe sắp xếp nhiên liệu.","682d9e01a863149978030411.png",["1-Báo hiệu thiếu dầu phanh.","2-Áp suất lốp không đủ.","3-Đang sử dụng phanh đỗ.","4-Sắp hết nhiên liệu."]],["Trong các loại nhiên liệu dưới đây, loại nhiên liệu nào giảm thiểu ô nhiễm môi trường?",2,"Nhiên liệu giảm ô nhiễm: Xăng sinh học, khí sinh học.","",["1-Xăng và dầu diesel.","2-Xăng sinh học và khí sinh học.","3-Ý 1 và ý 2."]],["Các biện pháp tiết kiệm nhiên liệu khi chạy xe?",3,"Tiết kiệm nhiên liệu: Bảo dưỡng định kỳ + Kiểm tra áp suất lốp, chạy tốc độ phù hợp.","",["1-Bảo dưỡng xe theo định kỳ và có kế hoạch lộ trình trước khi xe chạy.","2-Kiểm tra áp suất lốp theo quy định và chạy xe với tốc độ phù hợp với tình trạng mặt đường và mật độ giao thông trên đường.","3-Cả hai ý trên."]],["Khi lái xe ô tô điện qua khu vực ngập nước, người lái xe cần phải chú ý những vấn đề gì?",4,"Ô tô điện qua ngập nước: Biết khả năng chìm của xe + Vững lái, đều ga + Chạy chậm.","",["1-Người lái xe phải tìm hiểu khả năng chìm trong nước của xe để xác định cung đường di chuyển.","2-Giữ vững tay lái, đi đều ga, tránh không để xe chết máy giữa dòng, không nên dừng xe trên đường ngập nước.","3-Lái xe tốc độ chậm, không tạo sóng và giữ khoảng cách an toàn với các phương tiện xung quanh, nhất là người đi bộ.","4-Cả ba ý trên."]]];
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
        '<strong style="color:rgb(56,189,248);font-size:13px;letter-spacing:0.5px;">HỖ TRỢ ĐÁP ÁN (58 Câu Kỹ Thuật)</strong>' +
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
      .replace(/[̀-ͯ]/g, "")
      .replace(/đ/g, "d")
      .replace(/[^a-z0-9]/g, " ")
      .replace(/s+/g, " ")
      .trim();
  }

  function cleanOpt(s) {
    if (!s) return "";
    return s.toString().toLowerCase()
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .replace(/đ/g, "d")
      .replace(/^([1-5]|[a-e])s*[-.):s]s*/i, "")
      .replace(/[^a-z0-9]/g, " ")
      .replace(/s+/g, " ")
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
    var cTxt = rawOpts[cIdx - 1] ? rawOpts[cIdx - 1] : ("Đáp án " + cIdx);

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
      imgFile: fn,
      normImg: norm(fn)
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
    setStatus("✔ Sẵn sàng 58 câu Kỹ thuật lái xe", "rgb(74,222,128)");
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

  function findOptionElementOnScreen(doc, optionIdx, optionNormText) {
    // 1. Quét các thẻ radio
    var radios = doc.querySelectorAll("input[type='radio']");
    var visibleRadios = [];
    for (var r = 0; r < radios.length; r++) {
      if (!isInsideSidebar(radios[r])) visibleRadios.push(radios[r]);
    }
    if (visibleRadios.length > 0 && visibleRadios[optionIdx - 1]) {
      var rad = visibleRadios[optionIdx - 1];
      var container = (rad.closest ? rad.closest("label, .form-check, [class*='radio'], [class*='choice'], [class*='answer'], [class*='item'], li, tr") : null) || rad.parentElement;
      return container || rad;
    }

    // 2. Tìm theo nhãn văn bản
    var numRegex = new RegExp("^\\s*" + optionIdx + "\\s*[-.):\\s]");
    var candidates = doc.querySelectorAll("label, [class*='choice'], [class*='answer'], [class*='option'], li, div, p");
    var bestEl = null;
    var minLen = 999999;

    for (var i = 0; i < candidates.length; i++) {
      var el = candidates[i];
      if (isInsideSidebar(el)) continue;
      var t = (el.innerText || "").trim();
      if (numRegex.test(t)) {
        var n = norm(t);
        if (optionNormText && (n.indexOf(optionNormText) !== -1 || optionNormText.indexOf(n) !== -1 || n.length < 250)) {
          if (t.length < minLen && t.length > 2) {
            minLen = t.length;
            bestEl = el;
          }
        }
      }
    }
    return bestEl;
  }

  var lastHash = "";

  setInterval(function () {
    if (Q_LIST.length === 0) return;

    var docs = getDocs();
    var combinedPageText = "";
    var imgFiles = [];

    for (var d = 0; d < docs.length; d++) {
      var doc = docs[d];
      var docText = (doc.body ? doc.body.innerText : "") || "";
      combinedPageText += " " + norm(docText);

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
    }

    var currentHash = imgFiles.join(",") + "||" + combinedPageText.slice(0, 500);
    if (!currentHash || currentHash === lastHash) return;
    lastHash = currentHash;

    var bestQ = null;
    var maxScore = -1;

    for (var i = 0; i < Q_LIST.length; i++) {
      var q = Q_LIST[i];
      var score = 0;

      // 1. So khớp tiêu đề câu hỏi trong văn bản toàn trang
      if (q.normTitle && combinedPageText.indexOf(q.normTitle) !== -1) {
        score += 150;
      }

      // 2. So khớp tệp ảnh
      if (q.imgFile && imgFiles.length > 0) {
        for (var fi = 0; fi < imgFiles.length; fi++) {
          var ifn = imgFiles[fi];
          if (ifn === q.imgFile || norm(ifn) === q.normImg || (q.normImg.length > 8 && norm(ifn).indexOf(q.normImg) !== -1)) {
            score += 300;
            break;
          }
        }
      }

      // 3. So khớp dấu vân tay từng phương án & Vị trí
      var matchedOpts = 0;
      var exactPosOpts = 0;
      for (var qo = 0; qo < q.opts.length; qo++) {
        var optNorm = q.opts[qo].norm;
        var optIdx = q.opts[qo].idx;
        if (optNorm.length > 2 && combinedPageText.indexOf(optNorm) !== -1) {
          matchedOpts++;
          var pos1 = optIdx + " " + optNorm;
          var pos2 = optIdx + optNorm;
          if (combinedPageText.indexOf(pos1) !== -1 || combinedPageText.indexOf(pos2) !== -1) {
            exactPosOpts++;
          }
        }
      }
      score += (matchedOpts * 120) + (exactPosOpts * 150);

      // Điểm cộng nếu số lượng phương án trùng khớp
      if (q.opts.length > 0 && combinedPageText.indexOf(q.opts.length + " ") !== -1) {
        score += 30;
      }

      if (score > maxScore) {
        maxScore = score;
        bestQ = q;
      }
    }

    if (bestQ && maxScore >= 150) {
      document.getElementById("htlx-q").innerText = bestQ.title;

      var ansBadge = bestQ.correctIdx ? '<span style="background:rgb(250,204,21);color:black;font-weight:900;padding:2px 8px;border-radius:4px;margin-right:8px;font-size:12px;">Ý ' + bestQ.correctIdx + '</span>' : '';
      
      // Hiển thị chuẩn xác 100% nội dung đáp án gốc
      document.getElementById("htlx-ans").innerHTML = ansBadge + bestQ.correctText;

      var expEl = document.getElementById("htlx-exp");
      if (bestQ.exp) {
        expEl.innerHTML = '💡 <b>Giải thích chi tiết:</b> ' + bestQ.exp.replace(/<br\s*[/]?>/gi, ' ');
        expEl.style.display = "block";
      } else {
        expEl.style.display = "none";
      }

      // Tô viền xanh vào phần tử đáp án đúng
      for (var d2 = 0; d2 < docs.length; d2++) {
        var targetEl = findOptionElementOnScreen(docs[d2], bestQ.correctIdx, bestQ.opts[bestQ.correctIdx - 1].norm);
        if (targetEl) {
          highlightOption(targetEl);
          break;
        }
      }
    } else {
      clearHighlight();
    }
  }, 250);
})();
