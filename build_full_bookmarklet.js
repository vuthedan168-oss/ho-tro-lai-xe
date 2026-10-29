const fs = require('fs');
const { execSync } = require('child_process');

// 1. Đọc dữ liệu từ lotus_extracted.json
const lotus = JSON.parse(fs.readFileSync('lotus_extracted.json', 'utf8'));

// Format gọn: [title, correctIdx, correctText, exp, imgFilename, opts]
const embeddedData = lotus.map(q => {
  let cIdx = 0;
  let cTxt = '';
  if (q.mc_answers && Array.isArray(q.mc_answers)) {
    let fIdx = q.mc_answers.findIndex(a => a.is_answer === 1);
    if (fIdx !== -1) {
      cIdx = fIdx + 1;
      cTxt = q.mc_answers[fIdx].text || '';
    }
  }
  if (!cIdx && q.answers && Array.isArray(q.answers) && q.answers.length > 0 && q.mc_answers) {
    let idx = q.answers[0];
    if (q.mc_answers[idx]) {
      cIdx = idx + 1;
      cTxt = q.mc_answers[idx].text || '';
    }
  }
  let imgLink = (q.content_image_files && q.content_image_files[0] ? q.content_image_files[0].link : '') || q.avatar || '';
  let parts = imgLink.split('?')[0].split('/');
  let imgFile = (parts[parts.length - 1] || '').toLowerCase();
  let exp = (q.feedback_true || '').replace(/<br\s*[\/]?>/gi, ' ').replace(/\s+/g, ' ').trim();
  let opts = (q.mc_answers || []).map(a => (a.text || '').trim());

  return [
    q.content || '',
    cIdx,
    cTxt,
    exp,
    imgFile,
    opts
  ];
});

console.log('Tổng số câu nhúng sẵn:', embeddedData.length);

const scriptContent = `/**
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
  var EMBEDDED_DATA = ${JSON.stringify(embeddedData)};

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
      .replace(/[\\u0300-\\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/[^a-z0-9]/g, " ")
      .replace(/\\s+/g, " ")
      .trim();
  }

  // Chuẩn hóa nội dung phương án
  function cleanOpt(s) {
    if (!s) return "";
    return s.toString().toLowerCase()
      .normalize("NFD")
      .replace(/[\\u0300-\\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/^([1-5]|[a-e])\\s*[-.):\\s]\\s*/i, "")
      .replace(/[^a-z0-9]/g, " ")
      .replace(/\\s+/g, " ")
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

    var optRegex = /^\\s*([1-5]|[A-E])\\s*[-.):\\s]\\s*(\\S.*)$/i;

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

        var txt = (cand.innerText || "").replace(/\\s+/g, " ").trim();
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
        expEl.innerHTML = '💡 <b>Giải thích chi tiết:</b> ' + bestQ.exp.replace(/<br\\s*[\/]?>/gi, ' ');
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
`;

fs.writeFileSync('script_nhac_bai.js', scriptContent);
console.log('Đã tạo xong script_nhac_bai.js (size:', fs.statSync('script_nhac_bai.js').size, 'bytes)');

// 2. Chạy Terser để tạo bookmarklet.txt
console.log('Đang nén bằng Terser...');
execSync('npx --yes terser script_nhac_bai.js --compress --mangle -o min.js');
let minJs = fs.readFileSync('min.js', 'utf8');

// Đảm bảo không có dấu # hoặc ký tự đặc biệt làm gãy URL bookmarklet
minJs = minJs.replace(/#/g, '%23');

const bookmarklet = 'javascript:' + minJs;
fs.writeFileSync('bookmarklet.txt', bookmarklet);
console.log('Đã tạo bookmarklet.txt thành công! (size:', bookmarklet.length, 'ký tự)');
fs.unlinkSync('min.js');
