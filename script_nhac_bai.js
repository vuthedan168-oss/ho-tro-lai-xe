/**
 * 🚗 DỰ ÁN: HỖ TRỢ THI & ÔN LUYỆN LÁI XE (LotusLMS / HueLMS)
 * Tác giả: Vu The Dan <vuthedan168@gmail.com>
 * 
 * Phiên bản: 7.0 (DÁN ĐỀ TRỰC TIẾP & TỰ ĐỘNG BẮT API - KHÔNG CẦN TẠO LẠI FILE)
 * - Tự động nhận diện đề thi mới: Chỉ cần copy response API và dán vào là hiển thị ngay.
 * - Tự động bắt gói tin API (Auto Network Interceptor) khi chuyển bài học/chương.
 * - Lưu trữ cục bộ (localStorage): Đề thi đã nạp được lưu lại, không mất khi F5.
 * - Tự động chuyển câu tức thì khi bấm Tiếp/Trước.
 * - Khớp vân tay phương án + vị trí chính xác (Option Fingerprinting).
 * - Chế độ An Toàn (Chống Ban): Chỉ đọc và viền xanh trực quan, không can thiệp click tự động.
 */

(function () {
  var old = document.getElementById("htlx-box");
  if (old) old.remove();

  var DEFAULT_EMBEDDED_DATA = [["Người lái xe kinh doanh vận tải khi thực hiện tốt việc rèn luyện, nâng cao trách nhiệm, đạo đức nghề nghiệp sẽ thu được kết quả như thế nào dưới đây?",1,"Đạo đức nghề nghiệp tốt (lái xe KDVT): Được tôn trọng, quý mến, tin dùng, thu hút khách, hiệu quả cao.","",["1-Được khách hàng, xã hội tôn trọng; được đồng nghiệp quý mến, giúp đỡ; được doanh nghiệp tin dùng và đóng góp nhiều cho xã hội; thu hút được khách hàng, góp phần quan trọng trong xây dựng thương hiệu, kinh doanh có hiệu quả cao.","2-Được cộng điểm vào giấy phép lái xe.","3-Cả hai ý trên."]],["Người điều khiển phương tiện tham giao thông đường bộ gây ra tai nạn giao thông đường bộ, người liên quan đến vụ tai nạn giao thông đường bộ có trách nhiệm gì dưới đây?",4,"Trách nhiệm khi gây tai nạn/liên quan: Dừng xe, cảnh báo, giữ hiện trường, cứu người, báo tin; Ở lại hiện trường (trừ trường hợp khẩn cấp nhưng phải trình báo); Cung cấp thông tin.","",["1-Dừng ngay phương tiện, cảnh báo nguy hiểm, giữ nguyên hiện trường, trợ giúp người bị nạn và báo tin cho cơ quan Công an, cơ sở khám bệnh, chữa bệnh.","2-Ở lại hiện trường vụ tai nạn giao thông đường bộ cho đến khi người của cơ quan Công an đến, trừ trường hợp phải đi cấp cứu, đưa người bị nạn đi cấp cứu hoặc xét thấy bị đe dọa đến tính mạng, sức khỏe nhưng phải đến trình báo ngay cơ quan Công an, Ủy ban nhân dân nơi gần nhất.","3-Cung cấp thông tin xác định danh tính về bản thân, người liên quan đến vụ tai nạn giao thông đường bộ và thông tin liên quan của vụ tai nạn giao thông đường bộ cho cơ quan có thẩm quyền.","4-Cả ba ý trên."]],["Khi phát hiện thấy có ngọn lửa, khói hoặc nhiệt độ cao bất thường từ phương tiện giao thông do mình điều khiển người lái xe phải làm gì trước tiên?",1,"Phát hiện xe có dấu hiệu cháy: Bình tĩnh, đưa xe sát lề, tắt khóa điện, thực hiện chữa cháy.","",["1-Bình tĩnh, đưa xe sát vào lề đường, tránh xa nơi có nhiều người, nhiều chất dễ cháy và tắt khóa điện, thực hiện các bước chữa cháy.","2-Hô hoán để mọi người đến trợ giúp chữa cháy, gọi Cảnh sát giao thông, Cảnh sát phòng cháy chữa cháy và cứu nạn, cứu hộ, lực lượng y tế để sẵn sàng hỗ trợ cứu người.","3-Nếu nhiên liệu trào ra ngoài, ngọn lửa chưa cháy dữ dội thì tiếp tục sử dụng nước, hoặc bất kỳ chất, phương tiện chữa cháy có được để dập lửa.","4-Cả ba ý trên."]],["Người điều khiển phương tiện cơ giới đường bộ phải thực hiện những biện pháp gì dưới đây để chữa cháy trong trường hợp phương tiện bị cháy, xét thấy có khả năng dập tắt đám cháy?",3,"Chữa cháy xe (nếu có khả năng dập): Tắt khóa điện + Sử dụng nước.","",["1-Tắt khoá điện, hô hoán để mọi người đến trợ giúp chữa cháy, gọi Cảnh sát phòng cháy chữa cháy và cứu nạn cứu hộ (điện thoại 114).","2-Nếu nhiên liệu chưa trào ra ngoài (ngọn lửa chưa cháy dữ dội) thì có thể sử dụng nước, hoặc bất kỳ chất, phương tiện chữa cháy có được để dập lửa; nếu nhiên liệu đã trào ra ngoài (ngọn lửa cháy dữ dội) thì phải sử dụng các bình chữa cháy, cát, chăn chiên, bao tải, vải nhúng nước để dập lửa.","3-Cả hai ý trên."]],["Người lái xe, chủ phương tiện giao thông cơ giới đường bộ nên thực hiện các biện pháp phòng cháy, chữa cháy như thế nào dưới đây?",4,"Phòng cháy xe: Không lắp thêm thiết bị điện sai thiết kế + Phải tắt khóa điện + Không để chất dễ cháy trong xe.","",["1-Không lắp đặt thêm thiết bị điện, phụ kiện không đúng theo thiết kế của nhà sản xuất; tuân thủ quy trình vận hành bảo trì bảo dưỡng định kỳ; thường xuyên kiểm tra phương tiện, khi phát hiện thấy dấu hiệu khác lạ (khó nổ, có hơi xăng, có tiếng kêu bất thường, nhiệt độ của máy cao, có mùi khét) cần khắc phục ngay.","2-Khi để xe trong nhà, ở nơi trông giữ xe phải tắt khóa điện, để xa nguồn lửa, nguồn nhiệt; không mua xăng, dầu ở các điểm bán tự phát, không rõ nguồn gốc; không sử dụng các biện pháp “tiết kiệm xăng, dầu” khi chưa được kiểm chứng về mức độ an toàn có thể gây hỏng xe hoặc dẫn đến nguy cơ xảy ra cháy cao.","3-Không để các chất dễ cháy, dễ bắt lửa trong xe, dưới yên xe, trong cốp xe, trong khoang động cơ. Đối với xe điện cần chọn địa điểm sạc an toàn, sử dụng các thiết bị sạc đúng cách và giám sát quá trình sạc.","4-Cả ba ý trên."]],["Khi điều khiển phương tiện tham gia giao thông trên đoạn đường bộ đang xảy ra ùn tắc, những hành vi nào dưới đây là thiếu văn hóa?",1,"Ùn tắc (khu dân cư) - THIẾU văn hóa: Bấm còi, đi trên vỉa hè, chen lấn, lấn làn.","",["1-Bấm còi liên tục thúc giục các phương tiện phía trước nhường đường; đi trên vỉa hè, tận dụng mọi khoảng trống để nhanh chóng thoát khỏi nơi ùn tắc; lấn sang trái đường cố gắng vượt lên xe khác.","2-Tuân thủ hướng dẫn của người điều khiển giao thông hoặc tín hiệu giao thông, đi đúng phần đường, làn đường quy định."]],["Trong đoạn đường hai chiều tại khu đông dân cư đang ùn tắc, người điều khiển xe mô tô có văn hóa giao thông sẽ lựa chọn cách xử lý tình huống nào dưới đây?",3,"Ùn tắc (đường 2 chiều, khu dân cư): Kiên nhẫn, tuân thủ hướng dẫn/đèn, đi đúng phần đường, nhường xe ngược chiều.","",["1-Cho xe lấn sang làn ngược chiều để nhanh chóng thoát khỏi nơi ùn tắc.","2-Điều khiển xe trên vỉa hè để nhanh chóng thoát khỏi nơi ùn tắc.","3-Kiên nhẫn tuân thủ hướng dẫn của người điều khiển giao thông hoặc tín hiệu đèn giao thông, di chuyển trên đúng phần đường bên phải theo chiều đi, nhường đường cho các phương tiện đi ngược chiều."]],["Khi gặp vụ tai nạn giao thông, người lái xe nên hành động như thế nào?",2,"Gặp tai nạn giao thông: Dừng xe, hỗ trợ nạn nhân, báo cơ quan chức năng.","",["1-Chạy đi để tránh rắc rối.","2-Dừng xe, hỗ trợ nạn nhân và báo cho cơ quan chức năng.","3-Chỉ quan sát rồi tiếp tục di chuyển.","4-Chỉ giúp đỡ nếu có người thân trong vụ tai nạn."]],["Khi đang lái xe, thấy một người đi bộ đang sang đường trên vạch kẻ đường dành cho người đi bộ, người lái xe nên làm gì?",1,"Thấy người đi bộ qua vạch: Giảm tốc độ, nhường đường.","",["1-Giảm tốc độ và nhường đường cho người đi bộ.","2-Bấm còi để họ đi nhanh hơn.","3-Tiếp tục đi nếu đang vội.","4-Vượt qua nếu thấy khoảng trống đủ rộng."]],["Hành vi bỏ trốn sau khi gây tai nạn để trốn tránh trách nhiệm hoặc khi có điều kiện mà cố ý không cứu giúp người bị tai nạn giao thông có bị nghiêm cấm hay không?",3,"Bỏ trốn/không cứu giúp sau tai nạn: Bị nghiêm cấm.","",["1-Không bị nghiêm cấm.","2-Nghiêm cấm tùy từng trường hợp cụ thể.","3-Bị nghiêm cấm."]],["Khi sơ cứu ban đầu cho người bị tai nạn giao thông đường bộ không còn hô hấp, người lái xe và người có mặt tại hiện trường vụ tai nạn phải thực hiện các công việc gì dưới đây?",1,"Sơ cứu người không hô hấp (TNGT): Nằm ngửa, khai thông đường thở, hô hấp nhân tạo.","",["1-Đặt nạn nhân nằm ngửa, khai thông đường thở của nạn nhân; thực hiện các biện pháp hô hấp nhân tạo.","2-Thực hiện các biện pháp hô hấp nhân tạo."]],["Người có mặt tại nơi xảy ra vụ tai giao thông đường bộ có trách nhiệm gì dưới đây?",1,"Người có mặt tại tai nạn: Giúp đỡ/cứu người, báo tin, bảo vệ hiện trường/tài sản, cung cấp thông tin.","",["1-Giúp đỡ, cứu chữa kịp thời người bị nạn; báo tin ngay cho cơ quan Công an, cơ sở khám bệnh, chữa bệnh hoặc Ủy ban nhân dân nơi gần nhất; tham gia bảo vệ hiện trường; tham gia bảo vệ tài sản của người bị nạn; cung cấp thông tin liên quan về vụ tai nạn theo yêu cầu của cơ quan có thẩm quyền.","2-Chụp lại hình ảnh vụ tai nạn (nếu có thiết bị ghi hình) và nhanh chóng rời khỏi hiện trường vụ tai nạn."]],["Khi tham gia giao thông việc sử dụng còi xe nên dùng như thế nào để thể hiện là người có văn hóa giao thông?",1,"Sử dụng còi văn hóa: Chỉ khi cần thiết, không liên tục/kéo dài, đúng âm lượng.","",["1-Chỉ bấm còi khi thật sự cần thiết, không bấm còi liên tục hoặc kéo dài, sử dụng còi với mức âm lượng theo quy định.","2-Bấm còi liên tục để các xe khác nhường đường.","3-Bấm còi to khi đi qua khu vực đông dân cư.","4-Không cần dùng còi, tránh gây tiếng ồn là văn minh."]],["Những hành vi nào sau đây thể hiện là người có văn hóa giao thông?",1,"Văn hóa giao thông: Tuân thủ pháp luật, nhường nhịn, giúp đỡ.","",["1-Luôn tuân thủ pháp luật về trật tự, an toàn giao thông đường bộ, nhường nhịn và giúp đỡ người khác.","2-Đi nhanh, vượt đèn đỏ nếu không có lực lượng Công an.","3-Bấm còi và nháy đèn liên tục để cảnh báo xe khác.","4-Tránh nhường đường để đi nhanh hơn."]],["Trong các hành vi dưới đây, người lái xe có văn hóa giao thông phải ứng xử như thế nào?",1,"Ứng xử văn hóa khi lái xe: Đi đúng bên phải, đúng phần đường/làn, dừng/đỗ đúng nơi; không rượu bia khi lái xe.","",["1-Điều khiển xe đi bên phải theo chiều đi của mình; đi đúng phần đường, làn đường quy định; dừng, đỗ xe đúng nơi quy định; đã uống rượu, bia thì không lái xe.","2-Điều khiển xe đi trên phần đường, làn đường có ít phương tiện giao thông; dừng xe, đỗ xe ở nơi thuận tiện hoặc theo yêu cầu của hành khách, của người thân.","3-Dừng và đỗ xe ở nơi thuận tiện cho việc chuyên chở hành khách và giao nhận hàng hóa; sử dụng ít rượu, bia thì có thể lái xe."]],["Người lái xe mô tô có văn hóa giao thông khi tham gia giao thông phải tuân thủ những quy định nào dưới đây?",1,"Lái xe mô tô văn hóa: Đi đúng bên phải, đúng phần đường/làn; đội mũ đúng chuẩn, cài quai.","",["1-Điều khiển xe đi bên phải theo chiều đi của mình; đi đúng phần đường, làn đường quy định; đội mũ bảo hiểm đúng quy chuẩn kỹ thuật quốc gia, cài quai đúng quy cách.","2-Điều khiển xe đi trên phần đường, làn đường có ít phương tiện tham gia giao thông.","3-Điều khiển xe và đội mũ bảo hiểm ở nơi có biển báo bắt buộc đội mũ bảo hiểm."]],["Người lái xe có văn hóa giao thông khi tham gia giao thông phải tuân thủ những quy định nào dưới đây?",2,"Lái xe văn hóa tuân thủ: Hiệu lệnh người ĐKGT, tốc độ, đèn, biển báo, vạch kẻ; nhường đường người đi bộ/già/trẻ/khuyết tật.","",["1-Điều khiển xe đi trên phần đường, làn đường có ít phương tiện tham gia giao thông, chỉ đội mũ bảo hiểm ở nơi có biển báo bắt buộc đội mũ bảo hiểm.","2-Chấp hành hiệu lệnh, chỉ dẫn của người điều khiển giao thông, quy định về tốc độ, tín hiệu đèn, biển báo hiệu, vạch kẻ đường khi lái xe; nhường đường cho người đi bộ, người già, trẻ em, người khuyết tật."]],["Người lái xe có văn hóa giao thông khi tham gia giao thông đường bộ phải đáp ứng các điều kiện nào dưới đây?",1,"Lái xe văn hóa: Hiểu và chấp hành luật, ý thức trách nhiệm, tôn trọng, nhường nhịn, giúp đỡ, ứng xử văn hóa.","",["1-Hiểu biết và chấp hành nghiêm chỉnh pháp luật về giao thông đường bộ; có ý thức trách nhiệm với cộng đồng khi tham gia giao thông; tôn trọng, nhường nhịn, giúp đỡ và ứng xử có văn hóa với những người cùng tham gia giao thông.","2-Điều khiển xe vượt quá tốc độ, đi không đúng làn đường."]],["Khi sơ cứu người bị tai nạn giao thông đường bộ, có vết thương chảy máu ngoài, phun thành tia và phun mạnh khi mạch đập, bạn phải làm gì dưới đây?",2,"Máu phun thành tia (tai nạn GT): Cầm máu không trực tiếp (chặn động mạch).","",["1-Thực hiện cầm máu trực tiếp.","2-Thực hiện cầm máu không trực tiếp (chặn động mạch)."]],["Người lái xe không điều khiển xe đi đúng làn đường quy định, phóng nhanh, vượt ẩu, vượt đèn đỏ, đi vào đường cấm được coi là hành vi nào trong các hành vi dưới đây?",1,"Sai làn, phóng nhanh, vượt ẩu/đèn đỏ, vào đường cấm = Thiếu văn hóa + Vi phạm pháp luật.","",["1-Là thiếu văn hóa giao thông, vi phạm pháp luật về trật tự, an toàn giao thông đường bộ.","2-Là thiếu văn hóa giao thông."]],["Trên làn đường dành cho ô tô có vũng nước lớn, người lái xe ô tô bắt buộc phải đi qua vũng nước, trên làn đường bên cạnh có nhiều người đang lái xe mô tô tham gia giao thông, người lái xe ô tô xử lý như thế nào khi lái xe qua vũng nước là có văn hóa giao thông?",2,"Qua vũng nước (có xe máy bên cạnh): Giảm tốc độ, chạy chậm.","",["1-Cho xe chạy thật nhanh qua vũng nước.","2-Giảm tốc độ cho xe chạy chậm qua vũng nước.","3-Giảm tốc độ cho xe chạy qua làn đường dành cho mô tô để tránh vũng nước."]],["Khái niệm về văn hóa giao thông được hiểu như thế nào là đúng?",3,"Văn hóa giao thông = Hiểu biết và chấp hành luật, ý thức trách nhiệm + Tôn trọng, nhường nhịn, giúp đỡ, ứng xử văn hóa.","",["1-Là sự hiểu biết và chấp hành nghiêm chỉnh pháp luật về giao thông, là ý thức trách nhiệm với cộng đồng khi tham gia giao thông.","2-Là sự tôn trọng, nhường nhịn, giúp đỡ và ứng xử có văn hóa giữa những người tham gia giao thông với nhau.","3-Cả hai ý trên."]],["Người lái xe ô tô vận chuyển hành khách phải có những phẩm chất, đạo đức nghề nghiệp gì dưới đây?",3,"Lái xe khách về đạo đức: Lịch sự, giúp đỡ khách; Tu dưỡng bản thân, tôn trọng người khác, bảo vệ môi trường.","",["1-Phải có thái độ lịch sự, tôn trọng, thân mật với hành khách; giúp đỡ những người có hoàn cảnh khó khăn, người già, người khuyết tật, phụ nữ có thai, có con nhỏ và trẻ em.","2-Luôn tu dưỡng bản thân, có lối sống lành mạnh, khiêm tốn, có tác phong làm việc công nghiệp, không tham gia vào các tệ nạn xã hội; tôn trọng người cùng tham gia giao thông đường bộ và có ý thức bảo vệ môi trường.","3-Cả hai ý trên."]],["Người lái xe kinh doanh vận tải cần thực hiện những công việc gì ghi ở dưới đây để thường xuyên rèn luyện nâng cao đạo đức nghề nghiệp?",3,"Rèn luyện đạo đức lái xe KDVT: Quản lý xe tốt, tu dưỡng bản thân, chấp hành luật, trách nhiệm với khách, hợp tác.","",["1-Quản lý và sử dụng xe tốt; bảo dưỡng xe đúng định kỳ; thực hành tiết kiệm vật tư, nhiên liệu; luôn tu dưỡng bản thân, có lối sống lành mạnh, tác phong làm việc công nghiệp.","2-Nắm vững và tự giác chấp hành các quy định của pháp luật về trật tự, an toàn giao thông đường bộ, lái xe an toàn; thực hiện đầy đủ trách nhiệm với khách hàng; có ý thức tổ chức kỷ luật và xây dựng doanh nghiệp vững mạnh; có tinh thần hợp tác, tương trợ, giúp đỡ đồng nghiệp.","3-Cả hai ý trên."]],["Khi gặp nạn nhân bị bỏng trong vụ tai nạn giao thông, người lái xe cần làm gì?",4,"Sơ cứu người bị bỏng (TNGT): Gọi 115 + Loại bỏ nguyên nhân gây bỏng + Cho uống nước (nếu tỉnh), giữ ấm (nếu lạnh), đưa đến y tế.","",["1-Gọi số 115 để thông báo về tình trạng tai nạn và yêu cầu hỗ trợ y tế ngay lập tức. Quan sát hiện trường để giúp nạn nhân, đồng thời tránh gây tổn thương cho mình.","2-Nhanh chóng loại bỏ nguyên nhân gây bỏng bằng cách tách nạn nhân khỏi vật gây cháy, cởi bỏ quần áo nếu bén lửa, ngâm vùng da bị bỏng vào nước sạch hoặc đắp khăn mát, lưu ý không dùng khăn hoặc nước quá lạnh.","3-Nếu nạn nhân còn tỉnh, cần cho uống bù nước. Trong thời tiết lạnh, cần giữ ấm cho cơ thể nạn nhân, sau đó nhanh chóng đưa đến cơ sở y tế gần nhất.","4-Cả ba ý trên."]]];
  var EMBEDDED_DATA = DEFAULT_EMBEDDED_DATA;
  var Q_LIST = [];
  var highlightedEl = null;

  var w = document.createElement("div");
  w.id = "htlx-box";
  w.style.position = "fixed";
  w.style.top = "20px";
  w.style.right = "20px";
  w.style.width = "440px";
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
        '<strong style="color:rgb(56,189,248);font-size:13px;letter-spacing:0.5px;">HỖ TRỢ ĐÁP ÁN (LotusLMS V7)</strong>' +
      '</div>' +
      '<div style="display:flex;gap:5px;align-items:center;">' +
        '<button id="htlx-btn-paste-toggle" title="Dán đề thi mới từ API hoặc JSON" style="background:rgb(16,185,129);color:black;border:none;border-radius:4px;padding:3px 8px;cursor:pointer;font-weight:bold;font-size:11px;">📋 Dán Đề</button>' +
        '<button id="htlx-min" title="Thu nhỏ" style="background:rgb(30,41,59);color:rgb(148,163,184);border:1px solid rgb(51,65,85);border-radius:4px;padding:2px 8px;cursor:pointer;font-size:11px;">_</button>' +
        '<button id="htlx-cls" title="Đóng" style="background:rgb(239,68,68);color:white;border:none;border-radius:4px;padding:2px 8px;cursor:pointer;font-weight:bold;font-size:11px;">✕</button>' +
      '</div>' +
    '</div>' +
    '<div id="htlx-content" style="cursor:default;user-select:text;">' +
      '<div id="htlx-paste-panel" style="display:none;background:rgb(15,23,42);border:1.5px solid rgb(56,189,248);border-radius:8px;padding:10px;margin-bottom:10px;">' +
        '<div style="color:rgb(148,163,184);font-size:11px;font-weight:600;margin-bottom:6px;display:flex;justify-content:space-between;align-items:center;">' +
          '<span>Dán Response API hoặc JSON:</span>' +
          '<button id="htlx-btn-clip" style="background:rgb(59,130,246);color:white;border:none;border-radius:3px;padding:2px 6px;cursor:pointer;font-size:10px;">📋 Lấy từ Clipboard</button>' +
        '</div>' +
        '<textarea id="htlx-paste-input" style="width:100%;height:75px;background:rgb(30,41,59);color:rgb(241,245,249);border:1px solid rgb(51,65,85);border-radius:4px;padding:6px;font-size:11px;box-sizing:border-box;resize:none;" placeholder="Dán nội dung copy trả về từ API LotusLMS vào đây..."></textarea>' +
        '<div style="display:flex;justify-content:space-between;align-items:center;margin-top:6px;">' +
          '<button id="htlx-btn-reset-default" style="background:transparent;color:rgb(148,163,184);border:none;cursor:pointer;font-size:10.5px;text-decoration:underline;">Khôi phục gốc</button>' +
          '<div style="display:flex;gap:6px;">' +
            '<button id="htlx-btn-paste-close" style="background:rgb(51,65,85);color:white;border:none;border-radius:4px;padding:3px 10px;cursor:pointer;font-size:11px;">Đóng</button>' +
            '<button id="htlx-btn-do-parse" style="background:rgb(34,197,94);color:black;border:none;border-radius:4px;padding:3px 12px;font-weight:bold;cursor:pointer;font-size:11px;">Nạp đề ngay</button>' +
          '</div>' +
        '</div>' +
      '</div>' +
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
    if (e.target.tagName === "BUTTON" || e.target.tagName === "INPUT" || e.target.tagName === "LABEL" || e.target.tagName === "TEXTAREA") return;
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
  var hlToggle = document.getElementById("htlx-hl-toggle");
  if (hlToggle) {
    hlToggle.onchange = function () {
      if (!this.checked) clearHighlight();
    };
  }

  // Giao diện Dán Đề
  var pastePanel = document.getElementById("htlx-paste-panel");
  var pasteInput = document.getElementById("htlx-paste-input");
  document.getElementById("htlx-btn-paste-toggle").onclick = function () {
    var isHidden = pastePanel.style.display === "none";
    pastePanel.style.display = isHidden ? "block" : "none";
    if (isHidden) {
      pasteInput.value = "";
      pasteInput.focus();
    }
  };
  document.getElementById("htlx-btn-paste-close").onclick = function () {
    pastePanel.style.display = "none";
  };
  document.getElementById("htlx-btn-clip").onclick = function () {
    if (navigator.clipboard && navigator.clipboard.readText) {
      navigator.clipboard.readText().then(function (text) {
        if (text) {
          pasteInput.value = text;
          loadNewBank(text);
        }
      }).catch(function () {
        alert("Vui lòng nhấn phím Ctrl+V vào khung văn bản.");
      });
    } else {
      alert("Trình duyệt chặn quyền truy cập Clipboard, hãy nhấn Ctrl+V vào ô.");
    }
  };
  document.getElementById("htlx-btn-do-parse").onclick = function () {
    loadNewBank(pasteInput.value);
  };
  document.getElementById("htlx-btn-reset-default").onclick = function () {
    try {
      localStorage.removeItem("HTLX_DYNAMIC_BANK");
    } catch (e) {}
    EMBEDDED_DATA = DEFAULT_EMBEDDED_DATA;
    Q_LIST = EMBEDDED_DATA.map(parseEmbeddedQuestion);
    currentQuestionKey = "";
    clearHighlight();
    setStatus("✔ Đã nạp " + Q_LIST.length + " câu (Gốc mặc định)", "rgb(74,222,128)");
    pastePanel.style.display = "none";
  };

  // Kéo thả file JSON vào khung widget
  w.addEventListener("dragover", function (e) { e.preventDefault(); });
  w.addEventListener("drop", function (e) {
    e.preventDefault();
    if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0]) {
      var reader = new FileReader();
      reader.onload = function (evt) {
        loadNewBank(evt.target.result);
      };
      reader.readAsText(e.dataTransfer.files[0]);
    }
  });

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

  // Hàm bóc tách dữ liệu thông minh từ mọi nguồn phản hồi API hoặc JSON
  function parseAnyInput(raw) {
    if (!raw) return null;
    var str = typeof raw === "string" ? raw.trim() : JSON.stringify(raw);
    var parsed = null;
    try {
      parsed = JSON.parse(str);
    } catch (e) {
      var jsonMatch = str.match(/\{[\s\S]*"questions"[\s\S]*\}/) || str.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        try { parsed = JSON.parse(jsonMatch[0]); } catch (e2) {}
      }
    }
    if (!parsed) return null;

    var list = null;
    if (Array.isArray(parsed)) {
      list = parsed;
    } else if (parsed.result && parsed.result.questions && Array.isArray(parsed.result.questions.result)) {
      list = parsed.result.questions.result;
    } else if (parsed.questions && Array.isArray(parsed.questions.result)) {
      list = parsed.questions.result;
    } else if (parsed.result && Array.isArray(parsed.result)) {
      list = parsed.result;
    }

    if (!list || list.length === 0) return null;

    return list.map(function (item) {
      if (item.question && (item.options || item.raw_options)) {
        var optsObj = item.raw_options || (Array.isArray(item.options) ? item.options : Object.values(item.options));
        return [
          item.question,
          item.correctIndex || 1,
          item.explanation || "",
          item.image ? item.image.split("?")[0].split("/").pop().toLowerCase() : "",
          optsObj
        ];
      }

      var title = item.content || item.title || "";
      var exp = (item.feedback_true || item.feedback || "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
      var img = "";
      if (item.content_image_files && item.content_image_files[0] && item.content_image_files[0].link) {
        img = item.content_image_files[0].link.split("?")[0].split("/").pop().toLowerCase();
      } else if (item.avatar) {
        img = item.avatar.split("?")[0].split("/").pop().toLowerCase();
      }

      var rawOpts = [];
      var correctIdx = 1;

      if (item.mc_answers && Array.isArray(item.mc_answers)) {
        rawOpts = item.mc_answers.map(function (a, i) {
          var t = (a.text || "").trim();
          if (!/^[0-9]+[-\.:]/.test(t)) t = (i + 1) + "-" + t;
          return t;
        });
        var foundIdx = item.mc_answers.findIndex(function (a) { return a.is_answer === 1; });
        if (foundIdx !== -1) {
          correctIdx = foundIdx + 1;
        } else if (item.answers && item.answers[0] !== undefined) {
          correctIdx = item.answers[0] + 1;
        }
      } else if (item.answers2 && Array.isArray(item.answers2)) {
        rawOpts = item.answers2.map(function (a, i) {
          var t = (a.text || "").trim();
          if (!/^[0-9]+[-\.:]/.test(t)) t = (i + 1) + "-" + t;
          return t;
        });
        var foundIdx2 = item.answers2.findIndex(function (a) { return a.is_answer === 1; });
        if (foundIdx2 !== -1) correctIdx = foundIdx2 + 1;
      }

      return [title, correctIdx, exp, img, rawOpts];
    });
  }

  function loadNewBank(raw) {
    var items = parseAnyInput(raw);
    if (!items || items.length === 0) {
      setStatus("❌ Không nhận diện được cấu trúc câu hỏi!", "rgb(239,68,68)");
      return false;
    }
    try {
      localStorage.setItem("HTLX_DYNAMIC_BANK", JSON.stringify(items));
    } catch (e) {}

    EMBEDDED_DATA = items;
    Q_LIST = EMBEDDED_DATA.map(parseEmbeddedQuestion);
    currentQuestionKey = "";
    clearHighlight();
    setStatus("✔ Đã nạp thành công " + Q_LIST.length + " câu mới!", "rgb(74,222,128)");
    if (pastePanel) pastePanel.style.display = "none";
    return true;
  }

  function parseEmbeddedQuestion(item, index) {
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
      idx: index,
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
    var stored = null;
    try {
      var s = localStorage.getItem("HTLX_DYNAMIC_BANK");
      if (s) stored = JSON.parse(s);
    } catch (e) {}

    if (stored && Array.isArray(stored) && stored.length > 0) {
      EMBEDDED_DATA = stored;
      setStatus("✔ Đã nạp " + EMBEDDED_DATA.length + " câu (Bộ nhớ lưu trữ)", "rgb(74,222,128)");
    } else {
      setStatus("✔ Sẵn sàng " + EMBEDDED_DATA.length + " câu (Mặc định)", "rgb(74,222,128)");
    }
    Q_LIST = EMBEDDED_DATA.map(parseEmbeddedQuestion);
  }

  initDatabase();

  // Tự động bắt gói tin API khi trang web tải câu hỏi mới (Auto Interceptor)
  try {
    if (!window._htlx_hooked) {
      window._htlx_hooked = true;
      var origFetch = window.fetch;
      if (origFetch) {
        window.fetch = function () {
          var p = origFetch.apply(this, arguments);
          try {
            var arg0 = arguments[0];
            var url = (arg0 && (arg0.url || arg0)) || "";
            if (typeof url === "string" && (url.indexOf("get-question-bank-status") !== -1 || url.indexOf("practice/api") !== -1)) {
              p.then(function (res) {
                try {
                  res.clone().json().then(function (data) {
                    if (data && (data.result || data.questions)) {
                      loadNewBank(data);
                    }
                  }).catch(function () {});
                } catch (e) {}
              }).catch(function () {});
            }
          } catch (e) {}
          return p;
        };
      }
      var origOpen = XMLHttpRequest.prototype.open;
      var origSend = XMLHttpRequest.prototype.send;
      XMLHttpRequest.prototype.open = function (m, u) {
        this._htlx_url = u;
        return origOpen.apply(this, arguments);
      };
      XMLHttpRequest.prototype.send = function () {
        this.addEventListener("load", function () {
          try {
            if (this._htlx_url && (this._htlx_url.indexOf("get-question-bank-status") !== -1 || this._htlx_url.indexOf("practice/api") !== -1)) {
              var data = JSON.parse(this.responseText);
              if (data && (data.result || data.questions)) {
                loadNewBank(data);
              }
            }
          } catch (e) {}
        });
        return origSend.apply(this, arguments);
      };
    }
  } catch (e) {}

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
    // 1. Quét các thẻ radio có thể nhìn thấy
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

    // 2. Tìm theo nhãn số thứ tự phương án và nội dung
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

  var currentQuestionKey = "";
  var notFoundCount = 0;

  // Quét liên tục mỗi 300ms, thuật toán chạy cực nhanh (< 0.1ms) không gây giật lag
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

    var bestQ = null;
    var maxScore = -1;

    for (var i = 0; i < Q_LIST.length; i++) {
      var q = Q_LIST[i];
      var score = 0;

      // 1. So khớp tiêu đề câu hỏi (toàn văn hoặc tiền tố 35 ký tự)
      if (q.normTitle && combinedPageText.indexOf(q.normTitle) !== -1) {
        score += 150;
      } else if (q.normTitle.length > 25 && combinedPageText.indexOf(q.normTitle.slice(0, 35)) !== -1) {
        score += 120;
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
      notFoundCount = 0;
      var qKey = bestQ.idx + "||" + bestQ.title;

      // Khi câu hỏi trên trang thay đổi (chuyển câu mới), cập nhật UI ngay lập tức
      if (qKey !== currentQuestionKey) {
        currentQuestionKey = qKey;
        document.getElementById("htlx-q").innerText = bestQ.title;

        var ansBadge = bestQ.correctIdx ? '<span style="background:rgb(250,204,21);color:black;font-weight:900;padding:2px 8px;border-radius:4px;margin-right:8px;font-size:12px;">Ý ' + bestQ.correctIdx + '</span>' : '';
        
        document.getElementById("htlx-ans").innerHTML = ansBadge + bestQ.correctText;

        var expEl = document.getElementById("htlx-exp");
        if (bestQ.exp) {
          expEl.innerHTML = '💡 <b>Giải thích chi tiết:</b> ' + bestQ.exp.replace(/<br\s*[/]?>/gi, ' ');
          expEl.style.display = "block";
        } else {
          expEl.style.display = "none";
        }
        clearHighlight();
      }

      // Duy trì hoặc áp dụng viền xanh cho đáp án đúng trên màn hình
      var toggle = document.getElementById("htlx-hl-toggle");
      if (toggle && toggle.checked) {
        if (!highlightedEl || !document.contains(highlightedEl) || highlightedEl.style.outline === "") {
          for (var d2 = 0; d2 < docs.length; d2++) {
            var optNorm = (bestQ.opts[bestQ.correctIdx - 1] || {}).norm || "";
            var targetEl = findOptionElementOnScreen(docs[d2], bestQ.correctIdx, optNorm);
            if (targetEl) {
              highlightOption(targetEl);
              break;
            }
          }
        }
      }
    } else {
      notFoundCount++;
      if (notFoundCount > 5) {
        currentQuestionKey = "";
        clearHighlight();
      }
    }
  }, 300);
})();