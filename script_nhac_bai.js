/**
 * 🚗 DRIVEPASS PRO (V8.0 Commercial Edition)
 * Trợ Lý Sát Hạch & Ôn Luyện Lái Xe Thông Minh (LotusLMS / HueLMS / Đông Đô)
 * Tác giả & Bản quyền: Vu The Dan <vuthedan168@gmail.com>
 * 
 * TÍNH NĂNG THƯƠNG MẠI HÓA CHUYÊN NGHIỆP:
 * - 🔑 Hệ thống mã bản quyền khóa 1 Thiết bị & 1 Tài khoản (Device & Account Lock).
 * - 🎯 Tự động bắt đề khi bấm 'Kiểm tra' hoặc tải trang (Network & DOM Hook).
 * - 📋 Hỗ trợ nạp đề thủ công (Clipboard, Dán JSON, Kéo thả file).
 * - 🌓 Giao diện thương mại cao cấp: Chuyển đổi Sáng / Tối (Light / Dark Theme).
 * - 👻 Phím tắt Tàng Hình (Stealth Mode) bấm phím [~] hoặc click đúp ẩn tức thì.
 * - 🛡️ Chống Ban 100%: Chỉ can thiệp thị giác trực quan, không gửi dữ liệu bất thường.
 */

(function () {
  var old = document.getElementById("dpp-root");
  if (old) old.remove();

  var DEFAULT_EMBEDDED_DATA = [["Người lái xe kinh doanh vận tải khi thực hiện tốt việc rèn luyện, nâng cao trách nhiệm, đạo đức nghề nghiệp sẽ thu được kết quả như thế nào dưới đây?",1,"Đạo đức nghề nghiệp tốt (lái xe KDVT): Được tôn trọng, quý mến, tin dùng, thu hút khách, hiệu quả cao.","",["1-Được khách hàng, xã hội tôn trọng; được đồng nghiệp quý mến, giúp đỡ; được doanh nghiệp tin dùng và đóng góp nhiều cho xã hội; thu hút được khách hàng, góp phần quan trọng trong xây dựng thương hiệu, kinh doanh có hiệu quả cao.","2-Được cộng điểm vào giấy phép lái xe.","3-Cả hai ý trên."]],["Người điều khiển phương tiện tham giao thông đường bộ gây ra tai nạn giao thông đường bộ, người liên quan đến vụ tai nạn giao thông đường bộ có trách nhiệm gì dưới đây?",4,"Trách nhiệm khi gây tai nạn/liên quan: Dừng xe, cảnh báo, giữ hiện trường, cứu người, báo tin; Ở lại hiện trường (trừ trường hợp khẩn cấp nhưng phải trình báo); Cung cấp thông tin.","",["1-Dừng ngay phương tiện, cảnh báo nguy hiểm, giữ nguyên hiện trường, trợ giúp người bị nạn và báo tin cho cơ quan Công an, cơ sở khám bệnh, chữa bệnh.","2-Ở lại hiện trường vụ tai nạn giao thông đường bộ cho đến khi người của cơ quan Công an đến, trừ trường hợp phải đi cấp cứu, đưa người bị nạn đi cấp cứu hoặc xét thấy bị đe dọa đến tính mạng, sức khỏe nhưng phải đến trình báo ngay cơ quan Công an, Ủy ban nhân dân nơi gần nhất.","3-Cung cấp thông tin xác định danh tính về bản thân, người liên quan đến vụ tai nạn giao thông đường bộ và thông tin liên quan của vụ tai nạn giao thông đường bộ cho cơ quan có thẩm quyền.","4-Cả ba ý trên."]],["Khi phát hiện thấy có ngọn lửa, khói hoặc nhiệt độ cao bất thường từ phương tiện giao thông do mình điều khiển người lái xe phải làm gì trước tiên?",1,"Phát hiện xe có dấu hiệu cháy: Bình tĩnh, đưa xe sát lề, tắt khóa điện, thực hiện chữa cháy.","",["1-Bình tĩnh, đưa xe sát vào lề đường, tránh xa nơi có nhiều người, nhiều chất dễ cháy và tắt khóa điện, thực hiện các bước chữa cháy.","2-Hô hoán để mọi người đến trợ giúp chữa cháy, gọi Cảnh sát giao thông, Cảnh sát phòng cháy chữa cháy và cứu nạn, cứu hộ, lực lượng y tế để sẵn sàng hỗ trợ cứu người.","3-Nếu nhiên liệu trào ra ngoài, ngọn lửa chưa cháy dữ dội thì tiếp tục sử dụng nước, hoặc bất kỳ chất, phương tiện chữa cháy có được để dập lửa.","4-Cả ba ý trên."]],["Người điều khiển phương tiện cơ giới đường bộ phải thực hiện những biện pháp gì dưới đây để chữa cháy trong trường hợp phương tiện bị cháy, xét thấy có khả năng dập tắt đám cháy?",3,"Chữa cháy xe (nếu có khả năng dập): Tắt khóa điện + Sử dụng nước.","",["1-Tắt khoá điện, hô hoán để mọi người đến trợ giúp chữa cháy, gọi Cảnh sát phòng cháy chữa cháy và cứu nạn cứu hộ (điện thoại 114).","2-Nếu nhiên liệu chưa trào ra ngoài (ngọn lửa chưa cháy dữ dội) thì có thể sử dụng nước, hoặc bất kỳ chất, phương tiện chữa cháy có được để dập lửa; nếu nhiên liệu đã trào ra ngoài (ngọn lửa cháy dữ dội) thì phải sử dụng các bình chữa cháy, cát, chăn chiên, bao tải, vải nhúng nước để dập lửa.","3-Cả hai ý trên."]],["Người lái xe, chủ phương tiện giao thông cơ giới đường bộ nên thực hiện các biện pháp phòng cháy, chữa cháy như thế nào dưới đây?",4,"Phòng cháy xe: Không lắp thêm thiết bị điện sai thiết kế + Phải tắt khóa điện + Không để chất dễ cháy trong xe.","",["1-Không lắp đặt thêm thiết bị điện, phụ kiện không đúng theo thiết kế của nhà sản xuất; tuân thủ quy trình vận hành bảo trì bảo dưỡng định kỳ; thường xuyên kiểm tra phương tiện, khi phát hiện thấy dấu hiệu khác lạ (khó nổ, có hơi xăng, có tiếng kêu bất thường, nhiệt độ của máy cao, có mùi khét) cần khắc phục ngay.","2-Khi để xe trong nhà, ở nơi trông giữ xe phải tắt khóa điện, để xa nguồn lửa, nguồn nhiệt; không mua xăng, dầu ở các điểm bán tự phát, không rõ nguồn gốc; không sử dụng các biện pháp “tiết kiệm xăng, dầu” khi chưa được kiểm chứng về mức độ an toàn có thể gây hỏng xe hoặc dẫn đến nguy cơ xảy ra cháy cao.","3-Không để các chất dễ cháy, dễ bắt lửa trong xe, dưới yên xe, trong cốp xe, trong khoang động cơ. Đối với xe điện cần chọn địa điểm sạc an toàn, sử dụng các thiết bị sạc đúng cách và giám sát quá trình sạc.","4-Cả ba ý trên."]],["Khi điều khiển phương tiện tham gia giao thông trên đoạn đường bộ đang xảy ra ùn tắc, những hành vi nào dưới đây là thiếu văn hóa?",1,"Ùn tắc (khu dân cư) - THIẾU văn hóa: Bấm còi, đi trên vỉa hè, chen lấn, lấn làn.","",["1-Bấm còi liên tục thúc giục các phương tiện phía trước nhường đường; đi trên vỉa hè, tận dụng mọi khoảng trống để nhanh chóng thoát khỏi nơi ùn tắc; lấn sang trái đường cố gắng vượt lên xe khác.","2-Tuân thủ hướng dẫn của người điều khiển giao thông hoặc tín hiệu giao thông, đi đúng phần đường, làn đường quy định."]],["Trong đoạn đường hai chiều tại khu đông dân cư đang ùn tắc, người điều khiển xe mô tô có văn hóa giao thông sẽ lựa chọn cách xử lý tình huống nào dưới đây?",3,"Ùn tắc (đường 2 chiều, khu dân cư): Kiên nhẫn, tuân thủ hướng dẫn/đèn, đi đúng phần đường, nhường xe ngược chiều.","",["1-Cho xe lấn sang làn ngược chiều để nhanh chóng thoát khỏi nơi ùn tắc.","2-Điều khiển xe trên vỉa hè để nhanh chóng thoát khỏi nơi ùn tắc.","3-Kiên nhẫn tuân thủ hướng dẫn của người điều khiển giao thông hoặc tín hiệu đèn giao thông, di chuyển trên đúng phần đường bên phải theo chiều đi, nhường đường cho các phương tiện đi ngược chiều."]],["Khi gặp vụ tai nạn giao thông, người lái xe nên hành động như thế nào?",2,"Gặp tai nạn giao thông: Dừng xe, hỗ trợ nạn nhân, báo cơ quan chức năng.","",["1-Chạy đi để tránh rắc rối.","2-Dừng xe, hỗ trợ nạn nhân và báo cho cơ quan chức năng.","3-Chỉ quan sát rồi tiếp tục di chuyển.","4-Chỉ giúp đỡ nếu có người thân trong vụ tai nạn."]],["Khi đang lái xe, thấy một người đi bộ đang sang đường trên vạch kẻ đường dành cho người đi bộ, người lái xe nên làm gì?",1,"Thấy người đi bộ qua vạch: Giảm tốc độ, nhường đường.","",["1-Giảm tốc độ và nhường đường cho người đi bộ.","2-Bấm còi để họ đi nhanh hơn.","3-Tiếp tục đi nếu đang vội.","4-Vượt qua nếu thấy khoảng trống đủ rộng."]],["Hành vi bỏ trốn sau khi gây tai nạn để trốn tránh trách nhiệm hoặc khi có điều kiện mà cố ý không cứu giúp người bị tai nạn giao thông có bị nghiêm cấm hay không?",3,"Bỏ trốn/không cứu giúp sau tai nạn: Bị nghiêm cấm.","",["1-Không bị nghiêm cấm.","2-Nghiêm cấm tùy từng trường hợp cụ thể.","3-Bị nghiêm cấm."]],["Khi sơ cứu ban đầu cho người bị tai nạn giao thông đường bộ không còn hô hấp, người lái xe và người có mặt tại hiện trường vụ tai nạn phải thực hiện các công việc gì dưới đây?",1,"Sơ cứu người không hô hấp (TNGT): Nằm ngửa, khai thông đường thở, hô hấp nhân tạo.","",["1-Đặt nạn nhân nằm ngửa, khai thông đường thở của nạn nhân; thực hiện các biện pháp hô hấp nhân tạo.","2-Thực hiện các biện pháp hô hấp nhân tạo."]],["Người có mặt tại nơi xảy ra vụ tai giao thông đường bộ có trách nhiệm gì dưới đây?",1,"Người có mặt tại tai nạn: Giúp đỡ/cứu người, báo tin, bảo vệ hiện trường/tài sản, cung cấp thông tin.","",["1-Giúp đỡ, cứu chữa kịp thời người bị nạn; báo tin ngay cho cơ quan Công an, cơ sở khám bệnh, chữa bệnh hoặc Ủy ban nhân dân nơi gần nhất; tham gia bảo vệ hiện trường; tham gia bảo vệ tài sản của người bị nạn; cung cấp thông tin liên quan về vụ tai nạn theo yêu cầu của cơ quan có thẩm quyền.","2-Chụp lại hình ảnh vụ tai nạn (nếu có thiết bị ghi hình) và nhanh chóng rời khỏi hiện trường vụ tai nạn."]],["Khi tham gia giao thông việc sử dụng còi xe nên dùng như thế nào để thể hiện là người có văn hóa giao thông?",1,"Sử dụng còi văn hóa: Chỉ khi cần thiết, không liên tục/kéo dài, đúng âm lượng.","",["1-Chỉ bấm còi khi thật sự cần thiết, không bấm còi liên tục hoặc kéo dài, sử dụng còi với mức âm lượng theo quy định.","2-Bấm còi liên tục để các xe khác nhường đường.","3-Bấm còi to khi đi qua khu vực đông dân cư.","4-Không cần dùng còi, tránh gây tiếng ồn là văn minh."]],["Những hành vi nào sau đây thể hiện là người có văn hóa giao thông?",1,"Văn hóa giao thông: Tuân thủ pháp luật, nhường nhịn, giúp đỡ.","",["1-Luôn tuân thủ pháp luật về trật tự, an toàn giao thông đường bộ, nhường nhịn và giúp đỡ người khác.","2-Đi nhanh, vượt đèn đỏ nếu không có lực lượng Công an.","3-Bấm còi và nháy đèn liên tục để cảnh báo xe khác.","4-Tránh nhường đường để đi nhanh hơn."]],["Trong các hành vi dưới đây, người lái xe có văn hóa giao thông phải ứng xử như thế nào?",1,"Ứng xử văn hóa khi lái xe: Đi đúng bên phải, đúng phần đường/làn, dừng/đỗ đúng nơi; không rượu bia khi lái xe.","",["1-Điều khiển xe đi bên phải theo chiều đi của mình; đi đúng phần đường, làn đường quy định; dừng, đỗ xe đúng nơi quy định; đã uống rượu, bia thì không lái xe.","2-Điều khiển xe đi trên phần đường, làn đường có ít phương tiện giao thông; dừng xe, đỗ xe ở nơi thuận tiện hoặc theo yêu cầu của hành khách, của người thân.","3-Dừng và đỗ xe ở nơi thuận tiện cho việc chuyên chở hành khách và giao nhận hàng hóa; sử dụng ít rượu, bia thì có thể lái xe."]],["Người lái xe mô tô có văn hóa giao thông khi tham gia giao thông phải tuân thủ những quy định nào dưới đây?",1,"Lái xe mô tô văn hóa: Đi đúng bên phải, đúng phần đường/làn; đội mũ đúng chuẩn, cài quai.","",["1-Điều khiển xe đi bên phải theo chiều đi của mình; đi đúng phần đường, làn đường quy định; đội mũ bảo hiểm đúng quy chuẩn kỹ thuật quốc gia, cài quai đúng quy cách.","2-Điều khiển xe đi trên phần đường, làn đường có ít phương tiện tham gia giao thông.","3-Điều khiển xe và đội mũ bảo hiểm ở nơi có biển báo bắt buộc đội mũ bảo hiểm."]],["Người lái xe có văn hóa giao thông khi tham gia giao thông phải tuân thủ những quy định nào dưới đây?",2,"Lái xe văn hóa tuân thủ: Hiệu lệnh người ĐKGT, tốc độ, đèn, biển báo, vạch kẻ; nhường đường người đi bộ/già/trẻ/khuyết tật.","",["1-Điều khiển xe đi trên phần đường, làn đường có ít phương tiện tham gia giao thông, chỉ đội mũ bảo hiểm ở nơi có biển báo bắt buộc đội mũ bảo hiểm.","2-Chấp hành hiệu lệnh, chỉ dẫn của người điều khiển giao thông, quy định về tốc độ, tín hiệu đèn, biển báo hiệu, vạch kẻ đường khi lái xe; nhường đường cho người đi bộ, người già, trẻ em, người khuyết tật."]],["Người lái xe có văn hóa giao thông khi tham gia giao thông đường bộ phải đáp ứng các điều kiện nào dưới đây?",1,"Lái xe văn hóa: Hiểu và chấp hành luật, ý thức trách nhiệm, tôn trọng, nhường nhịn, giúp đỡ, ứng xử văn hóa.","",["1-Hiểu biết và chấp hành nghiêm chỉnh pháp luật về giao thông đường bộ; có ý thức trách nhiệm với cộng đồng khi tham gia giao thông; tôn trọng, nhường nhịn, giúp đỡ và ứng xử có văn hóa với những người cùng tham gia giao thông.","2-Điều khiển xe vượt quá tốc độ, đi không đúng làn đường."]],["Khi sơ cứu người bị tai nạn giao thông đường bộ, có vết thương chảy máu ngoài, phun thành tia và phun mạnh khi mạch đập, bạn phải làm gì dưới đây?",2,"Máu phun thành tia (tai nạn GT): Cầm máu không trực tiếp (chặn động mạch).","",["1-Thực hiện cầm máu trực tiếp.","2-Thực hiện cầm máu không trực tiếp (chặn động mạch)."]],["Người lái xe không điều khiển xe đi đúng làn đường quy định, phóng nhanh, vượt ẩu, vượt đèn đỏ, đi vào đường cấm được coi là hành vi nào trong các hành vi dưới đây?",1,"Sai làn, phóng nhanh, vượt ẩu/đèn đỏ, vào đường cấm = Thiếu văn hóa + Vi phạm pháp luật.","",["1-Là thiếu văn hóa giao thông, vi phạm pháp luật về trật tự, an toàn giao thông đường bộ.","2-Là thiếu văn hóa giao thông."]],["Trên làn đường dành cho ô tô có vũng nước lớn, người lái xe ô tô bắt buộc phải đi qua vũng nước, trên làn đường bên cạnh có nhiều người đang lái xe mô tô tham gia giao thông, người lái xe ô tô xử lý như thế nào khi lái xe qua vũng nước là có văn hóa giao thông?",2,"Qua vũng nước (có xe máy bên cạnh): Giảm tốc độ, chạy chậm.","",["1-Cho xe chạy thật nhanh qua vũng nước.","2-Giảm tốc độ cho xe chạy chậm qua vũng nước.","3-Giảm tốc độ cho xe chạy qua làn đường dành cho mô tô để tránh vũng nước."]],["Khái niệm về văn hóa giao thông được hiểu như thế nào là đúng?",3,"Văn hóa giao thông = Hiểu biết và chấp hành luật, ý thức trách nhiệm + Tôn trọng, nhường nhịn, giúp đỡ, ứng xử văn hóa.","",["1-Là sự hiểu biết và chấp hành nghiêm chỉnh pháp luật về giao thông, là ý thức trách nhiệm với cộng đồng khi tham gia giao thông.","2-Là sự tôn trọng, nhường nhịn, giúp đỡ và ứng xử có văn hóa giữa những người tham gia giao thông với nhau.","3-Cả hai ý trên."]],["Người lái xe ô tô vận chuyển hành khách phải có những phẩm chất, đạo đức nghề nghiệp gì dưới đây?",3,"Lái xe khách về đạo đức: Lịch sự, giúp đỡ khách; Tu dưỡng bản thân, tôn trọng người khác, bảo vệ môi trường.","",["1-Phải có thái độ lịch sự, tôn trọng, thân mật với hành khách; giúp đỡ những người có hoàn cảnh khó khăn, người già, người khuyết tật, phụ nữ có thai, có con nhỏ và trẻ em.","2-Luôn tu dưỡng bản thân, có lối sống lành mạnh, khiêm tốn, có tác phong làm việc công nghiệp, không tham gia vào các tệ nạn xã hội; tôn trọng người cùng tham gia giao thông đường bộ và có ý thức bảo vệ môi trường.","3-Cả hai ý trên."]],["Người lái xe kinh doanh vận tải cần thực hiện những công việc gì ghi ở dưới đây để thường xuyên rèn luyện nâng cao đạo đức nghề nghiệp?",3,"Rèn luyện đạo đức lái xe KDVT: Quản lý xe tốt, tu dưỡng bản thân, chấp hành luật, trách nhiệm với khách, hợp tác.","",["1-Quản lý và sử dụng xe tốt; bảo dưỡng xe đúng định kỳ; thực hành tiết kiệm vật tư, nhiên liệu; luôn tu dưỡng bản thân, có lối sống lành mạnh, tác phong làm việc công nghiệp.","2-Nắm vững và tự giác chấp hành các quy định của pháp luật về trật tự, an toàn giao thông đường bộ, lái xe an toàn; thực hiện đầy đủ trách nhiệm với khách hàng; có ý thức tổ chức kỷ luật và xây dựng doanh nghiệp vững mạnh; có tinh thần hợp tác, tương trợ, giúp đỡ đồng nghiệp.","3-Cả hai ý trên."]],["Khi gặp nạn nhân bị bỏng trong vụ tai nạn giao thông, người lái xe cần làm gì?",4,"Sơ cứu người bị bỏng (TNGT): Gọi 115 + Loại bỏ nguyên nhân gây bỏng + Cho uống nước (nếu tỉnh), giữ ấm (nếu lạnh), đưa đến y tế.","",["1-Gọi số 115 để thông báo về tình trạng tai nạn và yêu cầu hỗ trợ y tế ngay lập tức. Quan sát hiện trường để giúp nạn nhân, đồng thời tránh gây tổn thương cho mình.","2-Nhanh chóng loại bỏ nguyên nhân gây bỏng bằng cách tách nạn nhân khỏi vật gây cháy, cởi bỏ quần áo nếu bén lửa, ngâm vùng da bị bỏng vào nước sạch hoặc đắp khăn mát, lưu ý không dùng khăn hoặc nước quá lạnh.","3-Nếu nạn nhân còn tỉnh, cần cho uống bù nước. Trong thời tiết lạnh, cần giữ ấm cho cơ thể nạn nhân, sau đó nhanh chóng đưa đến cơ sở y tế gần nhất.","4-Cả ba ý trên."]]];
  var EMBEDDED_DATA = DEFAULT_EMBEDDED_DATA;
  var Q_LIST = [];
  var highlightedEl = null;
  var isDark = true;
  var isStealth = false;

  // Thuật toán băm nhẹ độc lập để xác thực Device ID & License Key
  function simpleHash(str) {
    var h = 0x811c9dc5;
    for (var i = 0; i < str.length; i++) {
      h ^= str.charCodeAt(i);
      h += (h << 1) + (h << 4) + (h << 7) + (h << 8) + (h << 24);
    }
    return ("00000000" + (h >>> 0).toString(16).toUpperCase()).slice(-8);
  }

  // 1. Tạo Device Fingerprint + LMS Account ID
  function getMachineId() {
    var canvasId = "";
    try {
      var c = document.createElement("canvas");
      var ctx = c.getContext("2d");
      ctx.textBaseline = "top";
      ctx.font = "14px 'Arial'";
      ctx.fillText("DrivePassPro_2026", 2, 2);
      canvasId = c.toDataURL().slice(-20);
    } catch (e) {}

    var screenId = (window.screen.width + "x" + window.screen.height + "x" + window.screen.colorDepth);
    var ua = navigator.userAgent || "";
    
    // Bóc tách ID tài khoản học viên từ cookies / URL / localStorage của LMS
    var uid = "";
    try {
      var cookies = document.cookie || "";
      var matchUid = cookies.match(/_sand_uid=([^;]+)/) || cookies.match(/uid=([^;]+)/);
      if (matchUid) uid = matchUid[1];
      if (!uid) {
        var userEl = document.querySelector(".user-name, [class*='avatar'], [class*='profile'], [class*='user']");
        if (userEl) uid = (userEl.innerText || "").trim().slice(0, 15);
      }
    } catch (e) {}

    var seed = canvasId + "|" + screenId + "|" + ua.slice(0, 40) + "|" + uid;
    var rawHash = simpleHash(seed);
    return "DP-" + rawHash.slice(0, 4) + "-" + rawHash.slice(4, 8);
  }

  var MACHINE_ID = getMachineId();

  // 2. Xác thực bản quyền (Client-side offline cryptographic verification)
  var SECRET_SALT = "DRIVEPASS_PRO_SECRET_SALT_2026_HE_PRIVATE";
  function verifyKey(machineId, key) {
    if (!key) return { valid: false, reason: "Chưa kích hoạt" };
    try {
      var parts = key.trim().split("-");
      if (parts.length < 4 || parts[0] !== "DPP") return { valid: false, reason: "Mã không đúng định dạng" };
      var expShort = parts[2]; // YYMMDD
      var sigPart = parts[3];
      var expStr = "20" + expShort.slice(0, 2) + "-" + expShort.slice(2, 4) + "-" + expShort.slice(4, 6);
      var today = new Date().toISOString().split("T")[0];
      if (today > expStr) return { valid: false, reason: "Mã bản quyền đã hết hạn" };

      var payload = machineId.trim().toUpperCase() + "|" + expStr + "|" + SECRET_SALT;
      var expectedSig = simpleHash(payload);
      if (sigPart !== expectedSig) return { valid: false, reason: "Mã không khớp với máy này" };

      return { valid: true, expiresAt: expStr };
    } catch (e) {
      return { valid: false, reason: "Lỗi xác thực" };
    }
  }

  var currentKey = localStorage.getItem("DPP_VIP_KEY") || "";
  var licenseStatus = verifyKey(MACHINE_ID, currentKey);

  // 3. Khởi tạo giao diện thương mại (Commercial UI Dock)
  var w = document.createElement("div");
  w.id = "dpp-root";
  w.style.position = "fixed";
  w.style.top = "20px";
  w.style.right = "20px";
  w.style.width = "420px";
  w.style.maxWidth = "calc(100vw - 40px)";
  w.style.borderRadius = "14px";
  w.style.padding = "14px";
  w.style.boxShadow = "0 20px 50px rgba(0,0,0,0.65), 0 0 1px rgba(255,255,255,0.2)";
  w.style.fontFamily = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";
  w.style.fontSize = "13px";
  w.style.lineHeight = "1.5";
  w.style.zIndex = "2147483647";
  w.style.cursor = "move";
  w.style.userSelect = "none";
  w.style.transition = "background-color 0.25s ease, color 0.25s ease, border-color 0.25s ease";

  function applyTheme() {
    if (isDark) {
      w.style.backgroundColor = "rgb(15, 23, 42)";
      w.style.color = "rgb(248, 250, 252)";
      w.style.border = "1.5px solid rgb(56, 189, 248)";
    } else {
      w.style.backgroundColor = "rgb(255, 255, 255)";
      w.style.color = "rgb(15, 23, 42)";
      w.style.border = "1.5px solid rgb(14, 165, 233)";
    }
  }
  applyTheme();

  w.innerHTML =
    '<div style="display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid rgba(148,163,184,0.2);padding-bottom:8px;margin-bottom:10px;">' +
      '<div style="display:flex;align-items:center;gap:6px;">' +
        '<span style="font-size:17px;">⚡</span>' +
        '<strong id="dpp-title" style="color:rgb(56,189,248);font-size:13px;letter-spacing:0.5px;">DRIVEPASS PRO</strong>' +
        '<span id="dpp-badge" style="font-size:9.5px;font-weight:bold;padding:2px 6px;border-radius:4px;text-transform:uppercase;">' +
          (licenseStatus.valid ? '💎 VIP' : '🔒 TRIAL') +
        '</span>' +
      '</div>' +
      '<div style="display:flex;gap:4px;align-items:center;">' +
        '<button id="dpp-btn-theme" title="Đổi màu Sáng / Tối" style="background:rgba(148,163,184,0.2);border:none;border-radius:4px;padding:3px 6px;cursor:pointer;font-size:11px;">🌓</button>' +
        '<button id="dpp-btn-paste" title="Nạp đề thi thủ công" style="background:rgb(16,185,129);color:black;border:none;border-radius:4px;padding:3px 8px;cursor:pointer;font-weight:bold;font-size:11px;">📋 Nạp Đề</button>' +
        '<button id="dpp-btn-key" title="Bản quyền & Kích hoạt" style="background:rgb(245,158,11);color:black;border:none;border-radius:4px;padding:3px 6px;cursor:pointer;font-weight:bold;font-size:11px;">🔑</button>' +
        '<button id="dpp-min" title="Thu nhỏ" style="background:rgba(148,163,184,0.2);border:none;border-radius:4px;padding:3px 7px;cursor:pointer;font-size:11px;">_</button>' +
        '<button id="dpp-cls" title="Đóng" style="background:rgb(239,68,68);color:white;border:none;border-radius:4px;padding:3px 7px;cursor:pointer;font-weight:bold;font-size:11px;">✕</button>' +
      '</div>' +
    '</div>' +
    '<div id="dpp-body" style="cursor:default;user-select:text;">' +
      // Modal Kích hoạt bản quyền
      '<div id="dpp-key-modal" style="display:' + (licenseStatus.valid ? 'none' : 'block') + ';background:rgba(30,41,59,0.8);border:1px solid rgba(245,158,11,0.5);border-radius:8px;padding:10px;margin-bottom:10px;">' +
        '<div style="font-size:11px;font-weight:bold;color:rgb(251,191,36);margin-bottom:6px;display:flex;justify-content:space-between;">' +
          '<span>🔑 KÍCH HOẠT BẢN QUYỀN 1 THIẾT BỊ:</span>' +
          '<span style="cursor:pointer;" id="dpp-close-key-modal">✕</span>' +
        '</div>' +
        '<div style="font-size:11px;margin-bottom:4px;">Mã máy của bạn: <b id="dpp-machine-id" style="color:rgb(56,189,248);user-select:all;">' + MACHINE_ID + '</b></div>' +
        '<div style="display:flex;gap:4px;margin-bottom:8px;">' +
          '<input type="text" id="dpp-key-input" placeholder="Nhập mã DPP-XXXX-YYMMDD-..." style="flex:1;background:rgba(15,23,42,0.9);color:white;border:1px solid rgb(71,85,105);border-radius:4px;padding:5px 8px;font-size:11px;">' +
          '<button id="dpp-btn-activate" style="background:rgb(245,158,11);color:black;font-weight:bold;border:none;border-radius:4px;padding:4px 10px;cursor:pointer;font-size:11px;">Kích hoạt</button>' +
        '</div>' +
        '<div style="margin-bottom:6px;">' +
          '<button id="dpp-btn-sepay-pay" style="width:100%;background:linear-gradient(135deg,rgb(16,185,129),rgb(5,150,105));color:white;font-weight:bold;border:none;border-radius:5px;padding:7px;cursor:pointer;font-size:11px;box-shadow:0 3px 10px rgba(16,185,129,0.3);">' +
            '⚡ Thanh Toán Tự Động Qua SePay (Quét VietQR)' +
          '</button>' +
        '</div>' +
        '<div style="font-size:10px;color:rgb(148,163,184);line-height:1.4;">' +
          'Cổng thanh toán tự động SePay • Cú pháp đơn: <code style="color:rgb(74,222,128);">DPP ' + MACHINE_ID + '</code>' +
        '</div>' +
      '</div>' +
      // Modal Nạp đề thi thủ công
      '<div id="dpp-paste-modal" style="display:none;background:rgba(30,41,59,0.8);border:1px solid rgba(56,189,248,0.5);border-radius:8px;padding:10px;margin-bottom:10px;">' +
        '<div style="font-size:11px;font-weight:bold;color:rgb(56,189,248);margin-bottom:6px;display:flex;justify-content:space-between;">' +
          '<span>📋 DÁN PHẢN HỒI API / JSON ĐỀ THI:</span>' +
          '<button id="dpp-btn-clip" style="background:rgb(59,130,246);color:white;border:none;border-radius:3px;padding:2px 6px;cursor:pointer;font-size:10px;">Dán từ Clipboard</button>' +
        '</div>' +
        '<textarea id="dpp-paste-text" style="width:100%;height:65px;background:rgba(15,23,42,0.9);color:white;border:1px solid rgb(71,85,105);border-radius:4px;padding:5px;font-size:11px;box-sizing:border-box;resize:none;" placeholder="Dán nội dung API hoặc kéo thả file JSON vào đây..."></textarea>' +
        '<div style="display:flex;justify-content:flex-end;gap:6px;margin-top:6px;">' +
          '<button id="dpp-btn-paste-cancel" style="background:rgba(148,163,184,0.2);color:inherit;border:none;border-radius:4px;padding:3px 8px;cursor:pointer;font-size:11px;">Đóng</button>' +
          '<button id="dpp-btn-paste-apply" style="background:rgb(34,197,94);color:black;font-weight:bold;border:none;border-radius:4px;padding:3px 12px;cursor:pointer;font-size:11px;">Nạp ngay</button>' +
        '</div>' +
      '</div>' +
      // Thông báo trạng thái
      '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">' +
        '<div id="dpp-status" style="color:rgb(74,222,128);font-size:11px;font-weight:600;">⏳ Đang khởi tạo...</div>' +
      '</div>' +
      // Hộp câu hỏi & đáp án
      '<div style="background:rgba(30,41,59,0.4);border:1px solid rgba(148,163,184,0.15);border-radius:8px;padding:10px;margin-bottom:8px;">' +
        '<div style="color:rgb(148,163,184);font-size:10px;text-transform:uppercase;font-weight:bold;margin-bottom:4px;letter-spacing:0.5px;">📌 CÂU HỎI TRÊN TRANG:</div>' +
        '<div id="dpp-q" style="font-size:12px;font-weight:500;line-height:1.45;margin-bottom:8px;max-height:65px;overflow-y:auto;word-break:break-word;">Đang quét màn hình...</div>' +
        '<div style="color:rgb(250,204,21);font-size:10px;text-transform:uppercase;font-weight:bold;margin-bottom:4px;letter-spacing:0.5px;">💡 ĐÁP ÁN CHÍNH XÁC:</div>' +
        '<div id="dpp-ans" style="color:rgb(74,222,128);background:rgba(6,78,59,0.5);border:1.5px solid rgb(16,185,129);border-radius:6px;padding:8px 10px;font-weight:bold;font-size:13px;line-height:1.45;word-break:break-word;">Đang nhận diện...</div>' +
      '</div>' +
      '<div id="dpp-exp" style="font-size:11px;line-height:1.45;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);padding:8px;border-radius:6px;max-height:85px;overflow-y:auto;display:none;margin-bottom:8px;word-break:break-word;"></div>' +
      '<div style="display:flex;justify-content:space-between;align-items:center;font-size:10.5px;color:rgb(148,163,184);">' +
        '<label style="display:flex;align-items:center;gap:4px;cursor:pointer;">' +
          '<input type="checkbox" id="dpp-hl-toggle" checked style="cursor:pointer;"> Viền xanh đáp án' +
        '</label>' +
        '<span>Phím [~] Tàng hình • An Toàn 100%</span>' +
      '</div>' +
    '</div>';

  document.body.appendChild(w);

  // Kéo thả vị trí hộp thoại
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

  // Nút đóng, thu nhỏ, đổi giao diện
  document.getElementById("dpp-cls").onclick = function () {
    if (highlightedEl) clearHighlight();
    w.remove();
  };
  var bodyEl = document.getElementById("dpp-body");
  var isMinimized = false;
  document.getElementById("dpp-min").onclick = function () {
    isMinimized = !isMinimized;
    bodyEl.style.display = isMinimized ? "none" : "block";
  };
  document.getElementById("dpp-btn-theme").onclick = function () {
    isDark = !isDark;
    applyTheme();
  };

  // Phím tắt Tàng Hình: Bấm phím [~] hoặc click đúp vào thanh tiêu đề
  window.addEventListener("keydown", function (e) {
    if (e.key === "~" || e.key === "`") {
      isStealth = !isStealth;
      w.style.display = isStealth ? "none" : "block";
      if (isStealth) clearHighlight();
    }
  });

  // Xử lý kích hoạt bản quyền
  var keyModal = document.getElementById("dpp-key-modal");
  document.getElementById("dpp-btn-key").onclick = function () {
    keyModal.style.display = keyModal.style.display === "none" ? "block" : "none";
  };
  document.getElementById("dpp-close-key-modal").onclick = function () {
    keyModal.style.display = "none";
  };
  document.getElementById("dpp-btn-activate").onclick = function () {
    var inKey = (document.getElementById("dpp-key-input").value || "").trim();
    var chk = verifyKey(MACHINE_ID, inKey);
    if (chk.valid) {
      localStorage.setItem("DPP_VIP_KEY", inKey);
      licenseStatus = chk;
      document.getElementById("dpp-badge").innerHTML = "💎 VIP";
      document.getElementById("dpp-badge").style.backgroundColor = "rgb(16,185,129)";
      document.getElementById("dpp-badge").style.color = "black";
      keyModal.style.display = "none";
      alert("🎉 Kích hoạt thành công bản quyền VIP đến ngày: " + chk.expiresAt);
      initDatabase();
    } else {
      alert("❌ " + chk.reason + ". Vui lòng liên hệ Admin để cấp mã đúng.");
    }
  };

  // Tích hợp thanh toán trực tiếp qua Cổng SePay Payment Gateway
  document.getElementById("dpp-btn-sepay-pay").onclick = async function () {
    var btn = this;
    btn.disabled = true;
    btn.innerText = "⏳ Đang kết nối SePay...";

    var merchant = "SP-LIVE-VT7A4733";
    var secret = "spsk_live_VP6T8GmQaqLcKFQPkY9gVEFPi5Tpqb5F";
    var invoiceNo = "DPP_" + MACHINE_ID.replace(/[^A-Z0-9]/g, "") + "_" + Date.now().toString().slice(-6);
    var desc = "Mua DrivePass Pro VIP " + MACHINE_ID;
    var amount = "199000";

    var fields = {
      merchant: merchant,
      operation: "PURCHASE",
      order_amount: amount,
      currency: "VND",
      order_invoice_number: invoiceNo,
      order_description: desc
    };

    var signedKeys = [
      "merchant", "env", "operation", "payment_method", "order_amount",
      "currency", "order_invoice_number", "order_description", "customer_id",
      "agreement_id", "agreement_name", "agreement_type",
      "agreement_payment_frequency", "agreement_amount_per_payment",
      "success_url", "error_url", "cancel_url"
    ];

    var signed = [];
    for (var i = 0; i < signedKeys.length; i++) {
      var k = signedKeys[i];
      if (fields[k] !== undefined) signed.push(k + "=" + fields[k]);
    }
    var payloadStr = signed.join(",");

    try {
      var enc = new TextEncoder();
      var keyObj = await window.crypto.subtle.importKey(
        "raw",
        enc.encode(secret),
        { name: "HMAC", hash: "SHA-256" },
        false,
        ["sign"]
      );
      var sigBuf = await window.crypto.subtle.sign("HMAC", keyObj, enc.encode(payloadStr));
      var sigBase64 = btoa(String.fromCharCode.apply(null, new Uint8Array(sigBuf)));
      fields.signature = sigBase64;

      var form = document.createElement("form");
      form.method = "POST";
      form.action = "https://pay.sepay.vn/v1/checkout/init";
      form.target = "_blank";
      for (var prop in fields) {
        var input = document.createElement("input");
        input.type = "hidden";
        input.name = prop;
        input.value = fields[prop];
        form.appendChild(input);
      }
      document.body.appendChild(form);
      form.submit();
      form.remove();

      btn.innerText = "✔ Đã mở cổng thanh toán!";
      setTimeout(function () {
        btn.disabled = false;
        btn.innerText = "⚡ Thanh Toán Tự Động Qua SePay (Quét VietQR)";
      }, 4000);
    } catch (err) {
      alert("Lỗi kết nối cổng SePay: " + err.message);
      btn.disabled = false;
      btn.innerText = "⚡ Thanh Toán Tự Động Qua SePay (Quét VietQR)";
    }
  };

  // Tự động kiểm tra trạng thái kích hoạt từ Webhook Server (Polling)
  setInterval(function () {
    if (licenseStatus.valid) return;
    try {
      fetch("http://localhost:3000/api/check-license?machineId=" + encodeURIComponent(MACHINE_ID))
        .then(function (res) { return res.json(); })
        .then(function (resData) {
          if (resData && resData.activated && resData.licenseKey) {
            var chk = verifyKey(MACHINE_ID, resData.licenseKey);
            if (chk.valid) {
              localStorage.setItem("DPP_VIP_KEY", resData.licenseKey);
              licenseStatus = chk;
              document.getElementById("dpp-badge").innerHTML = "💎 VIP";
              document.getElementById("dpp-badge").style.backgroundColor = "rgb(16,185,129)";
              document.getElementById("dpp-badge").style.color = "black";
              if (keyModal) keyModal.style.display = "none";
              initDatabase();
            }
          }
        }).catch(function () {});
    } catch (e) {}
  }, 4000);

  // Xử lý nạp đề thủ công
  var pasteModal = document.getElementById("dpp-paste-modal");
  var pasteInput = document.getElementById("dpp-paste-text");
  document.getElementById("dpp-btn-paste").onclick = function () {
    pasteModal.style.display = pasteModal.style.display === "none" ? "block" : "none";
    if (pasteModal.style.display === "block") {
      pasteInput.value = "";
      pasteInput.focus();
    }
  };
  document.getElementById("dpp-btn-paste-cancel").onclick = function () {
    pasteModal.style.display = "none";
  };
  document.getElementById("dpp-btn-clip").onclick = function () {
    if (navigator.clipboard && navigator.clipboard.readText) {
      navigator.clipboard.readText().then(function (t) {
        if (t) {
          pasteInput.value = t;
          loadNewBank(t);
        }
      }).catch(function () {
        alert("Vui lòng nhấn phím Ctrl+V vào ô bên dưới.");
      });
    } else {
      alert("Trình duyệt chặn clipboard, hãy nhấn Ctrl+V.");
    }
  };
  document.getElementById("dpp-btn-paste-apply").onclick = function () {
    loadNewBank(pasteInput.value);
  };

  // Kéo thả tệp JSON vào tiện ích
  w.addEventListener("dragover", function (e) { e.preventDefault(); });
  w.addEventListener("drop", function (e) {
    e.preventDefault();
    if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0]) {
      var reader = new FileReader();
      reader.onload = function (evt) { loadNewBank(evt.target.result); };
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
      setStatus("❌ Không nhận diện được câu hỏi!", "rgb(239,68,68)");
      return false;
    }
    try {
      localStorage.setItem("DPP_STORED_BANK", JSON.stringify(items));
    } catch (e) {}

    EMBEDDED_DATA = items;
    Q_LIST = EMBEDDED_DATA.map(parseEmbeddedQuestion);
    currentQuestionKey = "";
    clearHighlight();
    setStatus("✔ Sẵn sàng " + Q_LIST.length + " câu (Tự động nạp)", "rgb(74,222,128)");
    if (pasteModal) pasteModal.style.display = "none";
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
    var el = document.getElementById("dpp-status");
    if (el) {
      el.innerHTML = text;
      if (color) el.style.color = color;
    }
  }

  function initDatabase() {
    var stored = null;
    try {
      var s = localStorage.getItem("DPP_STORED_BANK");
      if (s) stored = JSON.parse(s);
    } catch (e) {}

    if (stored && Array.isArray(stored) && stored.length > 0) {
      EMBEDDED_DATA = stored;
      setStatus("✔ Sẵn sàng " + EMBEDDED_DATA.length + " câu (Bộ nhớ)", "rgb(74,222,128)");
    } else {
      EMBEDDED_DATA = DEFAULT_EMBEDDED_DATA;
      setStatus("✔ Sẵn sàng " + EMBEDDED_DATA.length + " câu (Mặc định)", "rgb(74,222,128)");
    }
    Q_LIST = EMBEDDED_DATA.map(parseEmbeddedQuestion);
  }

  initDatabase();

  // BẮT GÓI TIN TỰ ĐỘNG (Network Auto-Interceptor)
  try {
    if (!window._dpp_hooked) {
      window._dpp_hooked = true;
      var origFetch = window.fetch;
      if (origFetch) {
        window.fetch = function () {
          var p = origFetch.apply(this, arguments);
          try {
            var arg0 = arguments[0];
            var url = (arg0 && (arg0.url || arg0)) || "";
            if (typeof url === "string" && (url.indexOf("get-question-bank-status") !== -1 || url.indexOf("practice/api") !== -1 || url.indexOf("question") !== -1)) {
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
        this._dpp_url = u;
        return origOpen.apply(this, arguments);
      };
      XMLHttpRequest.prototype.send = function () {
        this.addEventListener("load", function () {
          try {
            if (this._dpp_url && (this._dpp_url.indexOf("get-question-bank-status") !== -1 || this._dpp_url.indexOf("practice/api") !== -1 || this._dpp_url.indexOf("question") !== -1)) {
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

  // BẮT SỰ KIỆN KHI BẤM NÚT 'KIỂM TRA' HOẶC 'BẮT ĐẦU'
  document.addEventListener("click", function (e) {
    var target = e.target;
    if (!target) return;
    var t = (target.innerText || target.value || "").trim().toLowerCase();
    if (t.indexOf("kiểm tra") !== -1 || t.indexOf("kiem tra") !== -1 || t.indexOf("bắt đầu") !== -1 || t.indexOf("làm bài") !== -1) {
      setTimeout(function () {
        currentQuestionKey = "";
      }, 350);
    }
  }, true);

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
      if (rect && rect.right > 0 && rect.right < 260 && window.innerWidth > 800) return true;
    } catch (e) {}

    while (el) {
      if (el.id === "dpp-root") return true;
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
    var toggle = document.getElementById("dpp-hl-toggle");
    if (!toggle || !toggle.checked || !el || isStealth) return;
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

  // Quét đối soát liên tục mỗi 300ms
  setInterval(function () {
    if (isStealth || Q_LIST.length === 0) return;

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

      if (q.normTitle && combinedPageText.indexOf(q.normTitle) !== -1) {
        score += 150;
      } else if (q.normTitle.length > 25 && combinedPageText.indexOf(q.normTitle.slice(0, 35)) !== -1) {
        score += 120;
      }

      if (q.imgFile && imgFiles.length > 0) {
        for (var fi = 0; fi < imgFiles.length; fi++) {
          var ifn = imgFiles[fi];
          if (ifn === q.imgFile || norm(ifn) === q.normImg || (q.normImg.length > 8 && norm(ifn).indexOf(q.normImg) !== -1)) {
            score += 300;
            break;
          }
        }
      }

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

      if (qKey !== currentQuestionKey) {
        currentQuestionKey = qKey;
        document.getElementById("dpp-q").innerText = bestQ.title;

        var ansBadge = bestQ.correctIdx ? '<span style="background:rgb(250,204,21);color:black;font-weight:900;padding:2px 8px;border-radius:4px;margin-right:8px;font-size:12px;">Ý ' + bestQ.correctIdx + '</span>' : '';
        
        // Bản dùng thử: Giới hạn sau 3 câu nhắc kích hoạt
        var trialCheck = (!licenseStatus.valid && bestQ.idx > 2);
        if (trialCheck) {
          document.getElementById("dpp-ans").innerHTML = '<span style="color:rgb(251,191,36);">🔒 BẢN DÙNG THỬ (Nhập mã để mở khóa câu này)</span>';
          clearHighlight();
        } else {
          document.getElementById("dpp-ans").innerHTML = ansBadge + bestQ.correctText;

          var expEl = document.getElementById("dpp-exp");
          if (bestQ.exp) {
            expEl.innerHTML = '💡 <b>Giải thích chi tiết:</b> ' + bestQ.exp.replace(/<br\s*[/]?>/gi, ' ');
            expEl.style.display = "block";
          } else {
            expEl.style.display = "none";
          }
          clearHighlight();
        }
      }

      var toggle = document.getElementById("dpp-hl-toggle");
      if (toggle && toggle.checked && (licenseStatus.valid || bestQ.idx <= 2)) {
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