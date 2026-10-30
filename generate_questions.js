const fs = require('fs');

const raw = JSON.parse(fs.readFileSync('api_response_raw.json', 'utf8'));
const list = raw.result.questions.result;

const letters = ['a', 'b', 'c', 'd', 'e'];

const questions = list.map((item, index) => {
  const optionsObj = {};
  const rawOpts = (item.mc_answers || []).map((a, i) => {
    let t = a.text.trim();
    if (!/^[0-9]+[-\.:]/.test(t)) {
      t = (i + 1) + '-' + t;
    }
    return t;
  });

  rawOpts.forEach((optText, oIdx) => {
    optionsObj[letters[oIdx]] = optText;
  });

  const correctIndex = item.mc_answers.findIndex(a => a.is_answer === 1) + 1 || (item.answers && item.answers[0] !== undefined ? item.answers[0] + 1 : 1);
  const correctAnswer = letters[correctIndex - 1] || 'a';

  let exp = item.feedback_true || '';
  exp = exp.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();

  let img = null;
  if (item.content_image_files && item.content_image_files.length > 0 && item.content_image_files[0].link) {
    img = item.content_image_files[0].link;
  } else if (item.avatar) {
    img = item.avatar;
  }

  return {
    id: index + 1,
    lotus_id: item.iid || item.id,
    category: "Đạo đức người lái xe, văn hóa giao thông và kỹ năng PCCC và cứu nạn cứu hộ",
    question: item.content.trim(),
    options: optionsObj,
    raw_options: rawOpts,
    correctAnswer: correctAnswer,
    correctIndex: correctIndex,
    explanation: exp,
    image: img
  };
});

fs.writeFileSync('questions.json', JSON.stringify(questions, null, 2), 'utf8');
console.log(`Đã xuất ${questions.length} câu hỏi vào questions.json`);
