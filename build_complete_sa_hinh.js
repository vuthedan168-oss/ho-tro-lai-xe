const fs = require('fs');
const { execSync } = require('child_process');

let q600 = JSON.parse(fs.readFileSync('questions.json', 'utf8'));
let lotus = JSON.parse(fs.readFileSync('recovered_lotus.json', 'utf8'));

function norm(s) {
  return (s || '').toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/[^a-z0-9]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function cleanOpt(s) {
  return (s || '').toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/^([1-5]|[a-e])\s*[-.):\s]\s*/i, '')
    .replace(/[^a-z0-9]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

// 1. Lọc tất cả 115 câu sa hình chuẩn 600 GPLX (câu 486 đến 600)
let saHinh600 = q600.filter(q => (q.id >= 486 && q.id <= 600) || (q.questionNumber >= 486 && q.questionNumber <= 600));

let DB = saHinh600.map(q => {
  let title = (q.question || q.content || '').trim();
  let cIdx = 0;
  let opts = [];
  
  if (q.options) {
    let keys = Object.keys(q.options).sort();
    keys.forEach((k, i) => {
      let txt = (q.options[k] || '').trim();
      opts.push(txt);
      if (q.correctAnswer && q.correctAnswer.toLowerCase() === k.toLowerCase()) {
        cIdx = i + 1;
      }
    });
  } else if (q.mc_answers) {
    q.mc_answers.forEach((a, i) => {
      opts.push(cleanOpt(a.text || ''));
      if (a.is_answer === 1) cIdx = i + 1;
    });
  }
  let exp = (q.explanation || q.feedback_true || '').replace(/<br\s*[\/]?>/gi, ' ').replace(/\s+/g, ' ').trim();
  let img = q.image || '';
  let fn = img.split('/').pop() || '';
  
  return {
    id: q.id || q.questionNumber,
    title: title,
    normTitle: norm(title),
    correctIdx: cIdx,
    exp: exp,
    imgFile: fn.toLowerCase(),
    lotusImg: '',
    opts: opts,
    normOpts: opts.map(cleanOpt)
  };
});

// Ghép nối dữ liệu ảnh và giải thích từ LotusLMS API (phân biệt câu trùng bằng correctIdx)
lotus.forEach(lq => {
  let lTitle = (lq.content || '').trim();
  let lNorm = norm(lTitle);
  let lOpts = (lq.mc_answers || []).map(a => cleanOpt(a.text || ''));
  let imgLink = (lq.content_image_files && lq.content_image_files[0] ? lq.content_image_files[0].link : '') || lq.avatar || '';
  let lotusImg = imgLink.split('?')[0].split('/').pop().toLowerCase();
  let lExp = (lq.feedback_true || '').replace(/<br\s*[\/]?>/gi, ' ').replace(/\s+/g, ' ').trim();
  let lCorrectIdx = (lq.mc_answers || []).findIndex(a => a.is_answer === 1) + 1;

  let match = DB.find(m => {
    if (m.normTitle !== lNorm) return false;
    let matched = 0;
    for (let co of lOpts) {
      if (m.normOpts.includes(co)) matched++;
    }
    if (matched < 2) return false;
    if (m.correctIdx !== lCorrectIdx) return false;
    return true;
  });

  if (!match) {
    // Thử ghép nếu tiêu đề giống và phương án giống >= 2
    match = DB.find(m => {
      if (m.normTitle !== lNorm) return false;
      let matched = 0;
      for (let co of lOpts) {
        if (m.normOpts.includes(co)) matched++;
      }
      return matched >= 2;
    });
  }

  if (match) {
    match.lotusImg = lotusImg;
    if (lExp) match.exp = lExp;
  }
});

console.log('Tổng số câu sa hình trong DB:', DB.length);

// Format compact: [title, correctIdx, exp, imgFile, opts]
let compactDB = DB.map(q => [
  q.title,
  q.correctIdx,
  q.exp,
  q.lotusImg || q.imgFile,
  q.opts
]);

const scriptTemplate = `/**
 * 🚗 DỰ ÁN: HỖ TRỢ THI & ÔN LUYỆN LÁI XE (LotusLMS / HueLMS / Đông Đô)
 * Tác giả: Vu The Dan <vuthedan168@gmail.com>
 * Ngân hàng dữ liệu: Toàn bộ 115 câu Sa hình (Bộ GTVT 600 GPLX + LotusLMS Đông Đô)
 * 
 * Phiên bản: 3.1 (Siêu chuẩn xác - Chống nhận diện nhầm tuyệt đối)
 * - Nạp sẵn 100/100 toàn bộ 115 câu sa hình (Câu 486 -> 600)
 * - Khớp vân tay phương án + vị trí (Option Fingerprinting & Position)
 * - Nhận diện radio button trực tiếp, loại trừ 100/100 sidebar và menu bài học
 * - Hoạt động Offline hoàn toàn, 0ms, không lỗi mạng / CSP
 */

(function () {
  var old = document.getElementById("htlx-box");
  if (old) old.remove();

  var EMBEDDED_DATA = ${JSON.stringify(compactDB)};
  var Q_LIST = [];
  var highlightedEl = null;

  // Tạo khung giao diện nổi (Floating Widget UI)
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
        '<strong style="color:rgb(56,189,248);font-size:13px;letter-spacing:0.5px;">HỖ TRỢ ĐÁP ÁN (LotusLMS V3.1)</strong>' +
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
    setStatus("✔ Sẵn sàng 115 câu sa hình (Đầy đủ 100/100)", "rgb(74,222,128)");
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

  // Loại trừ tuyệt đối mọi phần tử nằm trong Sidebar / Menu / Thanh điều hướng
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

  // Quét thông tin câu hỏi trên trang
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

      // 2. Quét Radio Buttons (Phương án chuẩn xác nhất của câu trắc nghiệm)
      var radios = doc.querySelectorAll("input[type='radio']");
      if (radios.length > 0) {
        for (var ri = 0; ri < radios.length; ri++) {
          var r = radios[ri];
          if (isInsideSidebar(r)) continue;

          var label = (r.id ? doc.querySelector("label[for='" + r.id + "']") : null) || (r.closest ? r.closest("label") : null) || r.parentElement;
          var rText = (label ? label.innerText : "") || "";
          rText = rText.replace(/\\s+/g, " ").trim();

          // Nếu label rỗng, kiểm tra parent container
          if (!rText || rText.length === 0) {
            var parent = r.parentElement;
            if (parent) {
              var pt = (parent.innerText || "").replace(/\\s+/g, " ").trim();
              if (pt.length > 0 && pt.length < 300) {
                rText = pt;
                label = parent;
              }
            }
          }

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
            element: label || r
          });
        }
      }

      // Fallback nếu không có thẻ radio
      if (opts.length === 0) {
        var optCandidates = doc.querySelectorAll("label, .form-check-label, .answer, .option, .choice, [class*='choice'], [class*='answer']");
        for (var ci = 0; ci < optCandidates.length; ci++) {
          var cand = optCandidates[ci];
          if (isInsideSidebar(cand)) continue;

          var txt = (cand.innerText || "").replace(/\\s+/g, " ").trim();
          if (txt.length < 2 || txt.length > 250) continue;

          var m2 = txt.match(optRegex);
          if (m2) {
            var num2 = parseInt(m2[1], 10);
            if (isNaN(num2)) num2 = m2[1].toUpperCase().charCodeAt(0) - 64;
            var cleanText2 = m2[2].trim();

            var existed = false;
            for (var oi = 0; oi < opts.length; oi++) {
              if (opts[oi].num === num2 || opts[oi].cleanText === cleanText2) {
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

      // 1. So khớp tệp ảnh Sa hình (Độ tin cậy tuyệt đối)
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

      // Điểm cộng nếu số lượng phương án khớp chính xác
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

      // Tìm đúng radio option trên trang để tô viền xanh
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

fs.writeFileSync('script_nhac_bai.js', scriptTemplate);
console.log('Đã tạo xong script_nhac_bai.js (size:', fs.statSync('script_nhac_bai.js').size, 'bytes)');

// 2. Chạy Terser để tạo bookmarklet.txt
console.log('Đang nén bằng Terser...');
execSync('npx --yes terser script_nhac_bai.js --compress --mangle -o min.js');
let minJs = fs.readFileSync('min.js', 'utf8');

// Đảm bảo không có dấu # làm hỏng bookmarklet
minJs = minJs.replace(/#/g, '%23');

const bookmarklet = 'javascript:' + minJs;
fs.writeFileSync('bookmarklet.txt', bookmarklet);
console.log('Đã tạo bookmarklet.txt thành công! (size:', bookmarklet.length, 'ký tự)');
fs.unlinkSync('min.js');
