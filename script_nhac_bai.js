/**
 * 🚗 DỰ ÁN: HỖ TRỢ THI & ÔN LUYỆN LÁI XE (LotusLMS / HueLMS / Dong Do)
 * Tác giả: Vu The Dan <vuthedan168@gmail.com>
 * Ngân hàng dữ liệu: 600 câu hỏi sát hạch lý thuyết lái xe chuẩn Bộ GTVT
 * 
 * Phiên bản: 2.0 (Khắc phục triệt để lỗi không nhận diện & phụ thuộc API)
 * - Tự động tải từ CDN mở (CORS *) hoặc bộ nhớ đệm Offline localStorage.
 * - Hỗ trợ nạp file offline trực tiếp nếu mất mạng.
 * - Nhận diện đối soát đa tầng (Tiêu đề + Phương án + Sa hình).
 * - Tự động đánh dấu viền xanh dịu mắt vào đáp án đúng trên màn hình.
 */

(function () {
  var old = document.getElementById("htlx-box");
  if (old) old.remove();

  var CACHE_KEY = "HTLX_600_QUESTIONS_V2";
  var DATA_SOURCES = [
    "https://onthigplx.edu.vn/data/questions/all-questions.json",
    "https://raw.githubusercontent.com/vuthedan168-oss/ho-tro-lai-xe/main/questions.json",
    "https://cdn.jsdelivr.net/gh/vuthedan168-oss/ho-tro-lai-xe@main/questions.json"
  ];

  var Q_LIST = [];
  var highlightedEl = null;

  // Tạo khung giao diện (UI)
  var w = document.createElement("div");
  w.id = "htlx-box";
  w.style.position = "fixed";
  w.style.top = "20px";
  w.style.right = "20px";
  w.style.width = "400px";
  w.style.backgroundColor = "rgb(11, 17, 32)";
  w.style.color = "rgb(248, 250, 252)";
  w.style.border = "2px solid rgb(56, 189, 248)";
  w.style.borderRadius = "12px";
  w.style.padding = "14px";
  w.style.boxShadow = "0 15px 40px rgba(0,0,0,0.75)";
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
      '<div style="display:flex;gap:6px;align-items:center;">' +
        '<button id="htlx-reload" title="Tải lại dữ liệu đề" style="background:rgb(30,41,59);color:rgb(148,163,184);border:1px solid rgb(51,65,85);border-radius:4px;padding:2px 7px;cursor:pointer;font-size:12px;">🔄</button>' +
        '<button id="htlx-min" title="Thu nhỏ" style="background:rgb(30,41,59);color:rgb(148,163,184);border:1px solid rgb(51,65,85);border-radius:4px;padding:2px 8px;cursor:pointer;font-size:12px;">_</button>' +
        '<button id="htlx-cls" title="Đóng" style="background:rgb(239,68,68);color:white;border:none;border-radius:4px;padding:2px 8px;cursor:pointer;font-weight:bold;font-size:12px;">✕</button>' +
      '</div>' +
    '</div>' +
    '<div id="htlx-content" style="cursor:default;user-select:text;">' +
      '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">' +
        '<div id="htlx-status" style="color:rgb(250,204,21);font-size:11px;font-weight:600;">⏳ Đang khởi tạo ngân hàng 600 câu...</div>' +
        '<label id="htlx-file-btn" style="display:none;color:rgb(56,189,248);font-size:11px;cursor:pointer;text-decoration:underline;">📁 Nạp file</label>' +
        '<input type="file" id="htlx-file-input" accept=".json" style="display:none;">' +
      '</div>' +
      '<div style="background:rgb(17,24,39);border:1px solid rgb(31,41,55);border-radius:8px;padding:10px;margin-bottom:8px;">' +
        '<div style="color:rgb(148,163,184);font-size:10px;text-transform:uppercase;font-weight:bold;margin-bottom:4px;letter-spacing:0.5px;">📌 Câu hỏi nhận diện:</div>' +
        '<div id="htlx-q" style="color:rgb(226,232,240);font-size:12px;font-weight:500;line-height:1.45;margin-bottom:8px;max-height:65px;overflow-y:auto;">Đang tìm câu hỏi trên trang...</div>' +
        '<div style="color:rgb(250,204,21);font-size:10px;text-transform:uppercase;font-weight:bold;margin-bottom:4px;letter-spacing:0.5px;">💡 ĐÁP ÁN CHÍNH XÁC:</div>' +
        '<div id="htlx-ans" style="color:rgb(74,222,128);background:rgb(6,78,59);border:1.5px solid rgb(16,185,129);border-radius:6px;padding:8px 10px;font-weight:bold;font-size:13px;line-height:1.45;">Đang nhận diện...</div>' +
      '</div>' +
      '<div id="htlx-exp" style="color:rgb(203,213,225);font-size:11px;line-height:1.45;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);padding:8px;border-radius:6px;max-height:90px;overflow-y:auto;display:none;"></div>' +
      '<div style="display:flex;justify-content:space-between;align-items:center;margin-top:8px;font-size:10.5px;color:rgb(100,116,139);">' +
        '<label style="display:flex;align-items:center;gap:4px;cursor:pointer;">' +
          '<input type="checkbox" id="htlx-hl-toggle" checked style="cursor:pointer;"> Viền xanh đáp án' +
        '</label>' +
        '<span>An Toàn • Chống Ban 100%</span>' +
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

  // Thu nhỏ / Đóng
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

  // Chuẩn hóa chuỗi so khớp
  function norm(s) {
    if (!s) return "";
    return s.toString().toLowerCase()
      .normalize("NFC")
      .replace(/^câu\s*\d+\s*[:.-]\s*/i, "")
      .replace(/[^a-z0-9àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/gi, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  // Chuẩn hóa một câu hỏi từ nguồn thô
  function parseRawQuestion(q) {
    var title = q.question || q.content || "";
    var opts = [];
    var correctIdx = 0;
    var correctText = "";
    var exp = q.explanation || q.feedback_true || "";
    var img = q.image || "";

    if (q.options && typeof q.options === "object" && !Array.isArray(q.options)) {
      var keys = Object.keys(q.options).sort();
      keys.forEach(function (k, i) {
        var txt = q.options[k] || "";
        var idx = i + 1;
        opts.push({ idx: idx, key: k, text: txt, norm: norm(txt) });
        if (q.correctAnswer && (q.correctAnswer.toLowerCase() === k.toLowerCase() || q.correctAnswer === String(idx))) {
          correctIdx = idx;
          correctText = txt;
        }
      });
    } else if (q.mc_answers && Array.isArray(q.mc_answers)) {
      q.mc_answers.forEach(function (ans, i) {
        var idx = i + 1;
        var txt = ans.text || "";
        opts.push({ idx: idx, key: String(idx), text: txt, norm: norm(txt) });
        if (ans.is_answer === 1) {
          correctIdx = idx;
          correctText = txt;
        }
      });
    }
    return {
      id: q.id || q.questionNumber || 0,
      title: title,
      normTitle: norm(title),
      opts: opts,
      correctIdx: correctIdx,
      correctText: correctText,
      exp: exp,
      img: img
    };
  }

  function setStatus(text, color) {
    var el = document.getElementById("htlx-status");
    if (el) {
      el.innerHTML = text;
      if (color) el.style.color = color;
    }
  }

  // Tải ngân hàng câu hỏi (LocalStorage -> CDN 1 -> CDN 2 -> Nạp thủ công)
  function initDatabase(forceReload) {
    if (!forceReload) {
      try {
        var cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
          var parsed = JSON.parse(cached);
          if (Array.isArray(parsed) && parsed.length >= 450) {
            Q_LIST = parsed;
            setStatus("✔ Sẵn sàng 600 câu (Offline)", "rgb(74,222,128)");
            return;
          }
        }
      } catch (e) {}
    }

    setStatus("⏳ Đang tải 600 câu hỏi từ máy chủ...", "rgb(250,204,21)");
    var sIdx = 0;

    function fetchNext() {
      if (sIdx >= DATA_SOURCES.length) {
        setStatus("⚠️ Lỗi mạng. Vui lòng nạp file offline:", "rgb(239,68,68)");
        var fileBtn = document.getElementById("htlx-file-btn");
        if (fileBtn) fileBtn.style.display = "inline";
        return;
      }
      var url = DATA_SOURCES[sIdx++];
      fetch(url)
        .then(function (r) {
          if (!r.ok) throw new Error("HTTP " + r.status);
          return r.json();
        })
        .then(function (raw) {
          if (!Array.isArray(raw) || raw.length === 0) throw new Error("Dữ liệu rỗng");
          Q_LIST = raw.map(parseRawQuestion);
          try {
            localStorage.setItem(CACHE_KEY, JSON.stringify(Q_LIST));
          } catch (e) {}
          setStatus("✔ Đã tải & lưu " + Q_LIST.length + " câu hỏi!", "rgb(74,222,128)");
          var fileBtn = document.getElementById("htlx-file-btn");
          if (fileBtn) fileBtn.style.display = "none";
        })
        .catch(function () {
          fetchNext();
        });
    }

    fetchNext();
  }

  // Nạp file offline dự phòng
  var fileInput = document.getElementById("htlx-file-input");
  var fileBtn = document.getElementById("htlx-file-btn");
  if (fileBtn && fileInput) {
    fileBtn.onclick = function () { fileInput.click(); };
    fileInput.onchange = function (e) {
      var f = e.target.files[0];
      if (!f) return;
      var reader = new FileReader();
      reader.onload = function (evt) {
        try {
          var raw = JSON.parse(evt.target.result);
          if (!Array.isArray(raw)) throw new Error("File không đúng cấu trúc mảng câu hỏi");
          Q_LIST = raw.map(parseRawQuestion);
          try { localStorage.setItem(CACHE_KEY, JSON.stringify(Q_LIST)); } catch (err) {}
          setStatus("✔ Đã nạp " + Q_LIST.length + " câu từ file!", "rgb(74,222,128)");
          fileBtn.style.display = "none";
        } catch (err) {
          alert("Lỗi đọc file JSON: " + err.message);
        }
      };
      reader.readAsText(f);
    };
  }

  document.getElementById("htlx-reload").onclick = function () {
    initDatabase(true);
  };

  initDatabase(false);

  // Thu thập tài liệu DOM (hỗ trợ cả iframe nếu có)
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

  // Quét giao diện bài thi hiện tại
  function scanScreen() {
    var docs = getDocs();
    var qTitle = "";
    var opts = [];
    var imgSrc = "";

    var optRegex = /^\s*([1-5]|[A-E])\s*[-.):\s]\s*(\S.*)$/;

    for (var d = 0; d < docs.length; d++) {
      var doc = docs[d];

      // 1. Quét ảnh sa hình
      var imgs = doc.querySelectorAll("img");
      for (var im = 0; im < imgs.length; im++) {
        var src = imgs[im].src || "";
        if (src.indexOf("data:") !== 0 && (src.indexOf("huelms") !== -1 || src.indexOf("lotuslms") !== -1 || src.indexOf("static") !== -1 || src.indexOf("course") !== -1 || src.indexOf("upload") !== -1 || src.indexOf("drive") !== -1)) {
          if (!imgSrc) imgSrc = src;
        }
      }

      // 2. Quét tiêu đề câu hỏi
      var qSelectors = [
        ".question-content", ".qtext", ".question", ".content-question",
        ".question-title", ".test-question", ".title-question", "h3", "h4", "h5"
      ];
      for (var qs = 0; qs < qSelectors.length; qs++) {
        var qEl = doc.querySelector(qSelectors[qs]);
        if (qEl) {
          var t = (qEl.innerText || "").trim();
          if (t.length > 10 && t.indexOf("HỖ TRỢ") === -1) {
            qTitle = t;
            break;
          }
        }
      }
      if (!qTitle) {
        var pList = doc.querySelectorAll("p, div");
        for (var pi = 0; pi < pList.length; pi++) {
          var pt = (pList[pi].innerText || "").trim();
          if (pt.length > 15 && pt.length < 200 && pt.indexOf("?") !== -1 && pt.indexOf("HỖ TRỢ") === -1 && !/^[1-5]\s*[-.]/.test(pt)) {
            qTitle = pt;
            break;
          }
        }
      }

      // 3. Quét các lựa chọn trả lời
      var optCandidates = doc.querySelectorAll("label, .form-check-label, .answer, .option, .choice, li, div, p, span");
      for (var ci = 0; ci < optCandidates.length; ci++) {
        var cand = optCandidates[ci];
        // Bỏ qua các phần tử con bên trong widget hỗ trợ
        if (cand.closest && cand.closest("#htlx-box")) continue;
        var txt = (cand.innerText || "").trim();
        if (txt.length < 3 || txt.length > 250) continue;

        var m = txt.match(optRegex);
        if (m) {
          var num = parseInt(m[1], 10);
          if (isNaN(num)) {
            num = m[1].toUpperCase().charCodeAt(0) - 64; // A -> 1, B -> 2
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
              norm: norm(cleanText),
              element: cand
            });
          }
        }
      }

      if (qTitle || opts.length > 0) break;
    }

    return { qTitle: qTitle, opts: opts, imgSrc: imgSrc };
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
    highlightedEl = el;
    try {
      el.style.transition = "all 0.3s ease";
      el.style.outline = "2.5px solid rgb(34, 197, 94)";
      el.style.backgroundColor = "rgba(34, 197, 94, 0.15)";
      el.style.borderRadius = "6px";
    } catch (e) {}
  }

  var lastHash = "";

  // Vòng lặp nhận diện & hiển thị đáp án (chu kỳ 250ms)
  setInterval(function () {
    if (Q_LIST.length === 0) return;

    var screen = scanScreen();
    var currentHash = screen.qTitle + "||" + screen.opts.map(function (o) { return o.fullText; }).join("|");
    if (!currentHash || currentHash === lastHash) return;
    lastHash = currentHash;

    var bestQ = null;
    var maxScore = -1;
    var nScreenTitle = norm(screen.qTitle);

    for (var i = 0; i < Q_LIST.length; i++) {
      var q = Q_LIST[i];
      var score = 0;

      // 1. So khớp tiêu đề câu hỏi
      if (nScreenTitle && q.normTitle) {
        if (nScreenTitle === q.normTitle) {
          score += 60;
        } else if (nScreenTitle.indexOf(q.normTitle) !== -1 || q.normTitle.indexOf(nScreenTitle) !== -1) {
          score += 35;
        }
      }

      // 2. So khớp các phương án lựa chọn trên màn hình
      if (screen.opts.length > 0 && q.opts.length > 0) {
        for (var so = 0; so < screen.opts.length; so++) {
          var sOptNorm = screen.opts[so].norm;
          for (var qo = 0; qo < q.opts.length; qo++) {
            var qOptNorm = q.opts[qo].norm;
            if (sOptNorm === qOptNorm) {
              score += 35;
              break;
            } else if (sOptNorm.length > 10 && (sOptNorm.indexOf(qOptNorm) !== -1 || qOptNorm.indexOf(sOptNorm) !== -1)) {
              score += 18;
              break;
            }
          }
        }
      }

      // 3. Khớp ảnh sa hình nếu có mã ảnh
      if (screen.imgSrc && q.img) {
        var imgParts = q.img.split("/");
        var imgFile = imgParts[imgParts.length - 1].replace(/\.[^.]+$/, "");
        if (imgFile && screen.imgSrc.indexOf(imgFile) !== -1) {
          score += 80;
        }
      }

      if (score > maxScore) {
        maxScore = score;
        bestQ = q;
      }
    }

    if (bestQ && maxScore >= 30) {
      document.getElementById("htlx-q").innerText = (bestQ.id ? "[Câu " + bestQ.id + "] " : "") + (bestQ.title || screen.qTitle);

      var ansBadge = bestQ.correctIdx ? '<span style="background:rgb(250,204,21);color:black;font-weight:900;padding:2px 8px;border-radius:4px;margin-right:8px;font-size:12px;">Ý ' + bestQ.correctIdx + '</span>' : '';
      var ansText = bestQ.correctText || ("Đáp án " + bestQ.correctIdx);

      // Tìm chuỗi hiển thị đúng theo phương án trên màn hình nếu có số 1, 2, 3, 4 ở đầu
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
        expEl.innerHTML = '💡 <b>Giải thích luật:</b> ' + bestQ.exp.replace(/<br\s*[\/]?>/gi, ' ');
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
