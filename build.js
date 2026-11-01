const fs = require('fs');
const { execSync } = require('child_process');

console.log('--- ĐÓNG GÓI BẢN V7.0: DÁN ĐỀ TỰ ĐỘNG & AUTO-INTERCEPT ---');

// 1. Nạp dữ liệu mặc định từ questions.json
const rawData = JSON.parse(fs.readFileSync('questions.json', 'utf8'));
const defaultEmbedded = rawData.map(q => {
  const opts = q.raw_options || [];
  if (opts.length === 0) {
    if (Array.isArray(q.options)) {
      opts.push(...q.options);
    } else if (typeof q.options === 'object' && q.options !== null) {
      const keys = Object.keys(q.options).sort();
      for (let k of keys) {
        opts.push(q.options[k]);
      }
    }
  }
  return [
    q.question,
    q.correctIndex || 1,
    q.explanation || '',
    q.image ? q.image.split('?')[0].split('/').pop().toLowerCase() : '',
    opts
  ];
});

// 2. Khung mã nguồn script_nhac_bai.js
const template = `/**
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

  var DEFAULT_EMBEDDED_DATA = %%EMBEDDED_DATA%%;
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
      .replace(/[\\u0300-\\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/[^a-z0-9]/g, " ")
      .replace(/\\s+/g, " ")
      .trim();
  }

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
      var jsonMatch = str.match(/\\{[\\s\\S]*"questions"[\\s\\S]*\\}/) || str.match(/\\[[\\s\\S]*\\]/);
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
      var exp = (item.feedback_true || item.feedback || "").replace(/<[^>]+>/g, " ").replace(/\\s+/g, " ").trim();
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
          if (!/^[0-9]+[-\\.:]/.test(t)) t = (i + 1) + "-" + t;
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
          if (!/^[0-9]+[-\\.:]/.test(t)) t = (i + 1) + "-" + t;
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
    var numRegex = new RegExp("^\\\\s*" + optionIdx + "\\\\s*[-.):\\\\s]");
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
          expEl.innerHTML = '💡 <b>Giải thích chi tiết:</b> ' + bestQ.exp.replace(/<br\\s*[/]?>/gi, ' ');
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
})();`;

// 3. Thay thế %%EMBEDDED_DATA%% bằng JSON thực tế
const fullScript = template.replace('%%EMBEDDED_DATA%%', JSON.stringify(defaultEmbedded));

// 4. Ghi ra file script_nhac_bai.js
fs.writeFileSync('script_nhac_bai.js', fullScript, 'utf8');
console.log('✔ Đã tạo file script_nhac_bai.js thành công (' + fullScript.length + ' bytes)');

// 5. Nén thành bookmarklet bằng Terser
try {
  console.log('Đang nén bookmarklet qua npx terser...');
  const minified = execSync('npx terser script_nhac_bai.js --compress --mangle', { encoding: 'utf8' }).trim();
  const bookmarkletCode = 'javascript:' + minified;
  fs.writeFileSync('bookmarklet.txt', bookmarkletCode, 'utf8');
  console.log('✔ Đã tạo bookmarklet.txt thành công (' + bookmarkletCode.length + ' bytes)');
} catch (err) {
  console.error('Lỗi khi nén bookmarklet:', err.message);
  process.exit(1);
}

console.log('--- HOÀN TẤT ĐÓNG GÓI THÀNH CÔNG V7.0 ---');
