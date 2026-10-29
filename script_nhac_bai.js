/**
 * 🚗 DỰ ÁN: HỖ TRỢ THI & ÔN LUYỆN LÁI XE (LotusLMS / HueLMS / Đông Đô)
 * Tác giả: Vu The Dan <vuthedan168@gmail.com>
 * Ngân hàng dữ liệu: 600 câu hỏi sát hạch GPLX chuẩn Bộ GTVT + Enriched LotusLMS
 * 
 * Phiên bản: 2.1 (Tối ưu hóa toàn diện theo cấu trúc LotusLMS thực tế)
 * - Tự động đối soát UUID file ảnh Sa hình trên static-cloud.lotuslms.com
 * - Hỗ trợ nạp trực tiếp chuỗi JSON từ LotusLMS API (Nút 📋 Dán JSON)
 * - Tự động bắt gói tin API nếu trang tải đề mới qua fetch/XHR
 * - Chuẩn hóa phương án đa dạng: '1 -', '1-', 'A.', '1.'
 * - Đánh dấu viền xanh dịu mắt vào đáp án chính xác trên màn hình
 */

(function () {
  var old = document.getElementById("htlx-box");
  if (old) old.remove();

  var CACHE_KEY = "HTLX_600_LOTUS_V21";
  var DATA_SOURCES = [
    "https://raw.githubusercontent.com/vuthedan168-oss/ho-tro-lai-xe/main/questions.json",
    "https://cdn.jsdelivr.net/gh/vuthedan168-oss/ho-tro-lai-xe@main/questions.json",
    "https://onthigplx.edu.vn/data/questions/all-questions.json"
  ];

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
        '<button id="htlx-paste-json" title="Dán JSON từ LotusLMS API" style="background:rgb(30,41,59);color:rgb(56,189,248);border:1px solid rgb(51,65,85);border-radius:4px;padding:2px 7px;cursor:pointer;font-size:11px;font-weight:bold;">📋 Dán JSON</button>' +
        '<button id="htlx-reload" title="Tải lại ngân hàng đề" style="background:rgb(30,41,59);color:rgb(148,163,184);border:1px solid rgb(51,65,85);border-radius:4px;padding:2px 7px;cursor:pointer;font-size:11px;">🔄</button>' +
        '<button id="htlx-min" title="Thu nhỏ" style="background:rgb(30,41,59);color:rgb(148,163,184);border:1px solid rgb(51,65,85);border-radius:4px;padding:2px 8px;cursor:pointer;font-size:11px;">_</button>' +
        '<button id="htlx-cls" title="Đóng" style="background:rgb(239,68,68);color:white;border:none;border-radius:4px;padding:2px 8px;cursor:pointer;font-weight:bold;font-size:11px;">✕</button>' +
      '</div>' +
    '</div>' +
    '<div id="htlx-content" style="cursor:default;user-select:text;">' +
      '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">' +
        '<div id="htlx-status" style="color:rgb(250,204,21);font-size:11px;font-weight:600;">⏳ Đang khởi tạo...</div>' +
        '<label id="htlx-file-btn" style="display:none;color:rgb(56,189,248);font-size:11px;cursor:pointer;text-decoration:underline;">📁 Nạp file</label>' +
        '<input type="file" id="htlx-file-input" accept=".json" style="display:none;">' +
      '</div>' +
      '<div style="background:rgb(17,24,39);border:1px solid rgb(31,41,55);border-radius:8px;padding:10px;margin-bottom:8px;">' +
        '<div style="color:rgb(148,163,184);font-size:10px;text-transform:uppercase;font-weight:bold;margin-bottom:4px;letter-spacing:0.5px;">📌 Câu hỏi nhận diện:</div>' +
        '<div id="htlx-q" style="color:rgb(226,232,240);font-size:12px;font-weight:500;line-height:1.45;margin-bottom:8px;max-height:65px;overflow-y:auto;">Đang tìm câu hỏi trên trang...</div>' +
        '<div style="color:rgb(250,204,21);font-size:10px;text-transform:uppercase;font-weight:bold;margin-bottom:4px;letter-spacing:0.5px;">💡 ĐÁP ÁN CHÍNH XÁC:</div>' +
        '<div id="htlx-ans" style="color:rgb(74,222,128);background:rgb(6,78,59);border:1.5px solid rgb(16,185,129);border-radius:6px;padding:8px 10px;font-weight:bold;font-size:13px;line-height:1.45;">Đang nhận diện...</div>' +
      '</div>' +
      '<div id="htlx-exp" style="color:rgb(203,213,225);font-size:11px;line-height:1.45;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);padding:8px;border-radius:6px;max-height:95px;overflow-y:auto;display:none;"></div>' +
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
      .normalize("NFC")
      .replace(/^câu\s*\d+\s*[:.-]\s*/i, "")
      .replace(/[^a-z0-9àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/gi, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  // Chuẩn hóa nội dung phương án: loại bỏ tiền tố số (1-, 1 -, A., 1.)
  function cleanOpt(s) {
    if (!s) return "";
    return s.toString().toLowerCase()
      .normalize("NFC")
      .replace(/^([1-5]|[a-e])\s*[-.):\s]\s*/i, "")
      .replace(/[^a-z0-9àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/gi, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  // Lấy tên tệp ảnh từ URL (hỗ trợ so khớp file ảnh Sa hình của LotusLMS)
  function getImgFilename(url) {
    if (!url) return "";
    var clean = url.split("?")[0];
    var parts = clean.split("/");
    return parts[parts.length - 1].toLowerCase();
  }

  // Chuẩn hóa câu hỏi từ mọi nguồn (LotusLMS API format hoặc 600 GPLX format)
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
      // Fallback nếu answers là mảng chỉ số [2]
      if (!correctIdx && q.answers && Array.isArray(q.answers) && q.answers.length > 0) {
        var aIdx = q.answers[0];
        if (q.mc_answers[aIdx]) {
          correctIdx = aIdx + 1;
          correctText = q.mc_answers[aIdx].text;
        }
      }
    }

    return {
      id: q.id || q.questionNumber || 0,
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

  // Tải ngân hàng câu hỏi
  function initDatabase(forceReload) {
    if (!forceReload) {
      try {
        var cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
          var parsed = JSON.parse(cached);
          if (Array.isArray(parsed) && parsed.length >= 70) {
            Q_LIST = parsed;
            setStatus("✔ Sẵn sàng " + Q_LIST.length + " câu (Offline)", "rgb(74,222,128)");
            return;
          }
        }
      } catch (e) {}
    }

    setStatus("⏳ Đang nạp ngân hàng đề...", "rgb(250,204,21)");
    var sIdx = 0;

    function fetchNext() {
      if (sIdx >= DATA_SOURCES.length) {
        setStatus("⚠️ Lỗi mạng. Vui lòng bấm [📋 Dán JSON]:", "rgb(239,68,68)");
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
          var items = Array.isArray(raw) ? raw : (raw.result && raw.result.questions && raw.result.questions.result ? raw.result.questions.result : null);
          if (!items || items.length === 0) throw new Error("Dữ liệu rỗng");
          Q_LIST = items.map(parseRawQuestion);
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

  // Nạp dữ liệu JSON do người dùng dán vào
  function ingestRawJson(text) {
    try {
      var data = JSON.parse(text);
      var items = null;
      if (Array.isArray(data)) {
        items = data;
      } else if (data.result && data.result.questions && data.result.questions.result) {
        items = data.result.questions.result;
      } else if (data.questions && Array.isArray(data.questions)) {
        items = data.questions;
      }
      if (!items || items.length === 0) throw new Error("Không tìm thấy danh sách câu hỏi trong JSON");

      var parsedList = items.map(parseRawQuestion);
      Q_LIST = parsedList;
      try {
        localStorage.setItem(CACHE_KEY, JSON.stringify(Q_LIST));
      } catch (e) {}
      setStatus("✔ Đã nạp thành công " + Q_LIST.length + " câu từ JSON!", "rgb(74,222,128)");
      lastHash = ""; // Kích hoạt nhận diện lại ngay
      return true;
    } catch (err) {
      alert("Lỗi phân tích JSON: " + err.message);
      return false;
    }
  }

  document.getElementById("htlx-paste-json").onclick = function () {
    var pasted = prompt("Dán nội dung JSON phản hồi từ API LotusLMS vào đây:");
    if (pasted && pasted.trim()) {
      ingestRawJson(pasted.trim());
    }
  };

  // Nạp file JSON từ đĩa
  var fileInput = document.getElementById("htlx-file-input");
  var fileBtn = document.getElementById("htlx-file-btn");
  if (fileBtn && fileInput) {
    fileBtn.onclick = function () { fileInput.click(); };
    fileInput.onchange = function (e) {
      var f = e.target.files[0];
      if (!f) return;
      var reader = new FileReader();
      reader.onload = function (evt) {
        ingestRawJson(evt.target.result);
      };
      reader.readAsText(f);
    };
  }

  document.getElementById("htlx-reload").onclick = function () {
    initDatabase(true);
  };

  initDatabase(false);

  // Hook mạng tự động (Auto Sniffer) để bắt các phản hồi API của LotusLMS
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
                    setStatus("✔ Đã tự động bắt " + fresh.length + " câu từ đề thi!", "rgb(74,222,128)");
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
    var imgFile = "";

    var optRegex = /^\s*([1-5]|[A-E])\s*[-.):\s]\s*(\S.*)$/;

    for (var d = 0; d < docs.length; d++) {
      var doc = docs[d];

      // 1. Quét ảnh sa hình
      var imgs = doc.querySelectorAll("img");
      for (var im = 0; im < imgs.length; im++) {
        var src = imgs[im].src || "";
        if (src.indexOf("data:") !== 0 && (src.indexOf("static-cloud.lotuslms.com") !== -1 || src.indexOf("huelms") !== -1 || src.indexOf("lotuslms") !== -1 || src.indexOf("static") !== -1 || src.indexOf("drive") !== -1)) {
          var fn = getImgFilename(src);
          if (fn && fn.indexOf("logo") === -1 && fn.indexOf("icon") === -1) {
            imgFile = fn;
            break;
          }
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
        if (cand.closest && cand.closest("#htlx-box")) continue;
        var txt = (cand.innerText || "").trim();
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

      if (qTitle || opts.length > 0) break;
    }

    return { qTitle: qTitle, opts: opts, imgFile: imgFile };
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

  // Chu kỳ nhận diện 250ms
  setInterval(function () {
    if (Q_LIST.length === 0) return;

    var screen = scanScreen();
    var currentHash = screen.qTitle + "||" + screen.opts.map(function (o) { return o.fullText; }).join("|") + "||" + screen.imgFile;
    if (!currentHash || currentHash === lastHash) return;
    lastHash = currentHash;

    var bestQ = null;
    var maxScore = -1;
    var nScreenTitle = norm(screen.qTitle);

    for (var i = 0; i < Q_LIST.length; i++) {
      var q = Q_LIST[i];
      var score = 0;

      // 1. Đối soát tên tệp ảnh Sa hình (Độ chính xác tuyệt đối từ static-cloud)
      if (screen.imgFile && q.imgFile) {
        if (screen.imgFile === q.imgFile) {
          score += 120;
        } else if (screen.imgFile.indexOf(q.imgFile) !== -1 || q.imgFile.indexOf(screen.imgFile) !== -1) {
          score += 80;
        }
      }

      // 2. So khớp tiêu đề câu hỏi
      if (nScreenTitle && q.normTitle) {
        if (nScreenTitle === q.normTitle) {
          score += 60;
        } else if (nScreenTitle.indexOf(q.normTitle) !== -1 || q.normTitle.indexOf(nScreenTitle) !== -1) {
          score += 35;
        }
      }

      // 3. So khớp các phương án lựa chọn trên màn hình
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

    if (bestQ && maxScore >= 30) {
      document.getElementById("htlx-q").innerText = bestQ.title || screen.qTitle;

      var ansBadge = bestQ.correctIdx ? '<span style="background:rgb(250,204,21);color:black;font-weight:900;padding:2px 8px;border-radius:4px;margin-right:8px;font-size:12px;">Ý ' + bestQ.correctIdx + '</span>' : '';
      var ansText = bestQ.correctText || ("Đáp án " + bestQ.correctIdx);

      // Ưu tiên hiển thị đúng nguyên văn phương án kèm số trên màn hình
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
