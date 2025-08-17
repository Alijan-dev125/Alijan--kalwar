
/**
 * DIT Online Test — English UI
 * Login -> Quiz (50 MCQs) -> Auto Result + Print/PDF
 * Client-side only (HTML/CSS/JS). For real exams, add a backend.
 */

/* ====== Config ====== */
const VALID_PASSWORD = "Pakistan";  // Change this to your own password
const QUIZ_DURATION_MIN = 40;     // Timer (minutes). Set to 0 to disable timer display
const PASSING_PERCENT = 50;       // Pass threshold

/* ====== 50 MCQs (question, 4 options, answer index) ====== */
const QUESTIONS = [
  { q: "What is the full form of CPU?", options: ["Central Processing Unit", "Control Program Unit", "Computer Personal Unit", "Central Print Unit"], answer: 0 },
  { q: "What is the full form of RAM?", options: ["Random Access Memory", "Read Access Memory", "Rapid Action Memory", "Run Access Mode"], answer: 0 },
  { q: "What is the full form of ROM?", options: ["Read Only Memory", "Remote Output Memory", "Random Only Memory", "Range Of Memory"], answer: 0 },
  { q: "Which key is used to refresh a webpage in Windows?", options: ["Esc", "F5", "F12", "F1"], answer: 1 },
  { q: "Shortcut to undo the last action?", options: ["Ctrl + Y", "Ctrl + Z", "Ctrl + U", "Ctrl + X"], answer: 1 },
  { q: "Which software is used to create spreadsheets?", options: ["MS Word", "MS Excel", "MS PowerPoint", "MS Access"], answer: 1 },
  { q: "Which software is mainly used for presentations?", options: ["MS PowerPoint", "MS Excel", "MS Paint", "Notepad"], answer: 0 },
  { q: "Which key opens the Help window in MS Office?", options: ["F1", "F2", "F5", "F12"], answer: 0 },
  { q: "What is the file extension for an Excel workbook?", options: [".pptx", ".xlsx", ".docx", ".pdf"], answer: 1 },
  { q: "Which function adds numbers in Excel?", options: ["AVG()", "COUNT()", "SUM()", "ADD()"], answer: 2 },
  { q: "What is the shortcut to copy?", options: ["Ctrl + X", "Ctrl + C", "Ctrl + V", "Ctrl + P"], answer: 1 },
  { q: "What is the shortcut to paste?", options: ["Ctrl + X", "Ctrl + V", "Ctrl + A", "Ctrl + S"], answer: 1 },
  { q: "What is the shortcut to cut?", options: ["Ctrl + X", "Ctrl + C", "Ctrl + Z", "Ctrl + A"], answer: 0 },
  { q: "What is the shortcut to select all?", options: ["Ctrl + S", "Ctrl + A", "Ctrl + D", "Ctrl + E"], answer: 1 },
  { q: "What is the shortcut to save a file?", options: ["Ctrl + P", "Ctrl + S", "Ctrl + N", "Ctrl + O"], answer: 1 },
  { q: "Which function key is commonly used for Save As in MS Office?", options: ["F12", "F5", "F1", "F2"], answer: 0 },
  { q: "Which key starts Slide Show from the beginning in PowerPoint?", options: ["F5", "F8", "F2", "F12"], answer: 0 },
  { q: "Which device is an input device?", options: ["Monitor", "Printer", "Keyboard", "Speaker"], answer: 2 },
  { q: "Which device is an output device?", options: ["Mouse", "Scanner", "Monitor", "Microphone"], answer: 2 },
  { q: "Which device is used to scan documents?", options: ["Projector", "Scanner", "Plotter", "Modem"], answer: 1 },
  { q: "Which port is commonly used for network cables (wired internet)?", options: ["USB", "HDMI", "RJ-45 (Ethernet)", "VGA"], answer: 2 },
  { q: "Which device converts digital signals to analog and back?", options: ["Router", "Modem", "Switch", "Hub"], answer: 1 },
  { q: "Which one is the brain of the computer?", options: ["Keyboard", "CPU", "Mouse", "Monitor"], answer: 1 },
  { q: "Which memory is volatile?", options: ["RAM", "ROM", "SSD", "HDD"], answer: 0 },
  { q: "Which storage is permanent by design?", options: ["RAM", "ROM", "Cache", "Registers"], answer: 1 },
  { q: "What does ALU stand for?", options: ["Advanced Logic Unit", "Arithmetic and Logic Unit", "Automated Logic Utility", "Arithmetic Local Unit"], answer: 1 },
  { q: "What does URL stand for?", options: ["Unified Resource Locator", "Uniform Resource Locator", "Universal Route Link", "Uniform Route Locator"], answer: 1 },
  { q: "What does IP stand for in networking?", options: ["Internet Process", "Internal Protocol", "Internet Protocol", "Integrated Protocol"], answer: 2 },
  { q: "Which protocol is used to send emails?", options: ["POP3", "SMTP", "FTP", "HTTP"], answer: 1 },
  { q: "Which protocol is used to receive emails?", options: ["SMTP", "POP3/IMAP", "FTP", "Telnet"], answer: 1 },
  { q: "Which protocol is used to transfer files?", options: ["FTP", "SMTP", "DNS", "DHCP"], answer: 0 },
  { q: "Which key combination opens Task Manager (Windows)?", options: ["Ctrl + Shift + Esc", "Alt + F4", "Windows + D", "Ctrl + Alt + Del only"], answer: 0 },
  { q: "Which key combination locks the PC (Windows)?", options: ["Windows + L", "Windows + E", "Windows + R", "Windows + Tab"], answer: 0 },
  { q: "What is the basic unit of information?", options: ["Byte", "Bit", "Kilobyte", "Megabyte"], answer: 1 },
  { q: "1 Byte equals how many bits?", options: ["4", "8", "16", "32"], answer: 1 },
  { q: "Which of the following is an operating system?", options: ["MS Excel", "Windows 11", "Chrome", "Photoshop"], answer: 1 },
  { q: "Which one is a web browser?", options: ["Firefox", "Ubuntu", "C++", "MySQL"], answer: 0 },
  { q: "Which shortcut opens Run dialog in Windows?", options: ["Ctrl + R", "Windows + R", "Alt + R", "Shift + R"], answer: 1 },
  { q: "Which storage has no moving parts and is faster?", options: ["HDD", "SSD", "CD-ROM", "Floppy Disk"], answer: 1 },
  { q: "Which file extension is for a Word document (modern)?", options: [".xlsx", ".pptx", ".docx", ".txt"], answer: 2 },
  { q: "Which view shows slide thumbnails on the left in PowerPoint?", options: ["Normal View", "Slide Sorter View", "Reading View", "Notes Page"], answer: 0 },
  { q: "In Excel, which symbol starts a formula?", options: ["@", "#", "=", "$"], answer: 2 },
  { q: "Which function returns the average of numbers in Excel?", options: ["MEAN()", "AVERAGE()", "MID()", "ROUND()"], answer: 1 },
  { q: "Which alignment makes text evenly aligned on both left and right?", options: ["Left", "Right", "Center", "Justify"], answer: 3 },
  { q: "Which key creates a new folder in Windows?", options: ["Ctrl + N", "Ctrl + Shift + N", "Alt + N", "Shift + N"], answer: 1 },
  { q: "Which device is used to take hard copy output?", options: ["Speaker", "Monitor", "Printer", "Keyboard"], answer: 2 },
  { q: "Which of these is NOT an example of an operating system?", options: ["Windows", "Linux", "Android", "Oracle"], answer: 3 },
  { q: "Which chart type best shows parts of a whole in Excel?", options: ["Line Chart", "Bar Chart", "Pie Chart", "Scatter Chart"], answer: 2 },
  { q: "What does GUI stand for?", options: ["Graphical User Interface", "General Utility Interface", "Graphic Use Instruction", "Global User Internet"], answer: 0 },
  { q: "What does HTML stand for?", options: ["Hyperlinks and Text Markup Language", "HyperText Markup Language", "HighText Machine Language", "Hyper Tool Multi Language"], answer: 1 },
  { q: "What does CSS stand for?", options: ["Creative Style System", "Cascading Style Sheets", "Computer Styling Service", "Custom Script Styles"], answer: 1 }
];

/* ====== Element Refs ====== */
const loginScreen   = document.getElementById("login-screen");
const quizScreen    = document.getElementById("quiz-screen");
const resultScreen  = document.getElementById("result-screen");

const loginForm     = document.getElementById("login-form");
const loginError    = document.getElementById("login-error");

const quizForm      = document.getElementById("quiz-form");
const questionList  = document.getElementById("question-list");
const answeredCount = document.getElementById("answered-count");
const timerEl       = document.getElementById("timer");
const welcomeEl     = document.getElementById("welcome");

const resetBtn      = document.getElementById("reset-quiz");
const tryAgainBtn   = document.getElementById("try-again");
const logoutBtn     = document.getElementById("logout");
const printBtn      = document.getElementById("print-result");

const resultSummary = document.getElementById("result-summary");
const breakdownEl   = document.getElementById("breakdown");

/* ====== State ====== */
let timerId = null;
let remainingSec = QUIZ_DURATION_MIN > 0 ? QUIZ_DURATION_MIN * 60 : 0;

/* ====== Helpers ====== */
function show(el){ el.classList.remove("hidden"); }
function hide(el){ el.classList.add("hidden"); }
function shuffle(arr){ return arr.map(v=>[Math.random(), v]).sort((a,b)=>a[0]-b[0]).map(x=>x[1]); }
function formatTime(sec){ const m = Math.floor(sec/60), s = sec%60; return `${m}:${s.toString().padStart(2,'0')}`; }

/* ====== Render Quiz ====== */
function renderQuiz() {
  questionList.innerHTML = "";
  const shuffled = shuffle(QUESTIONS).slice(0, 50);

  shuffled.forEach((item, idx) => {
    const li = document.createElement("li");
    li.className = "question";
    const qId = `q${idx}`;
    li.innerHTML = `
      <h3>${idx + 1}. ${item.q}</h3>
      <div class="options">
        ${item.options.map((opt, i) => `
          <label class="option">
            <input type="radio" name="${qId}" value="${i}" required>
            <span>${opt}</span>
          </label>
        `).join("")}
      </div>
    `;
    questionList.appendChild(li);
  });

  answeredCount.textContent = `0/${shuffled.length}`;

  // Update count when a choice is selected
  quizForm.addEventListener("change", () => {
    const answered = new Set([...new FormData(quizForm).keys()]).size;
    answeredCount.textContent = `${answered}/${shuffled.length}`;
  }, { once: true });

  // Store order & answers for evaluation
  quizForm.dataset.order = JSON.stringify(
    shuffled.map(q => ({ answer: q.answer, q: q.q, options: q.options }))
  );
}

/* ====== Timer ====== */
function startTimer() {
  if (QUIZ_DURATION_MIN <= 0) { timerEl.textContent = ""; return; }
  remainingSec = QUIZ_DURATION_MIN * 60;
  timerEl.textContent = formatTime(remainingSec);
  timerId = setInterval(() => {
    remainingSec--;
    timerEl.textContent = formatTime(remainingSec);
    if (remainingSec <= 0) {
      clearInterval(timerId);
      quizForm.requestSubmit();
    }
  }, 1000);
}
function stopTimer(){ if (timerId) clearInterval(timerId); timerId = null; }

/* ====== Login ====== */
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  loginError.textContent = "";
  const fullname = e.target.fullname.value.trim();
  const password = e.target.password.value.trim();

  if (!fullname) { loginError.textContent = "Please enter your full name."; return; }
  if (password !== VALID_PASSWORD) { loginError.textContent = "Invalid password."; return; }

  hide(loginScreen); show(quizScreen);
  welcomeEl.textContent = `Welcome, ${fullname}!`;
  renderQuiz();
  startTimer();
});

/* ====== Submit Quiz ====== */
quizForm.addEventListener("submit", (e) => {
  e.preventDefault();
  stopTimer();

  const order = JSON.parse(quizForm.dataset.order || "[]");
  const formData = new FormData(quizForm);

  let score = 0;
  const rows = [];

  order.forEach((qObj, idx) => {
    const chosen = formData.get(`q${idx}`);
    const chosenIdx = chosen === null ? -1 : Number(chosen);
    const correct = chosenIdx === qObj.answer;
    if (correct) score++;

    rows.push({
      no: idx + 1,
      question: qObj.q,
      your: chosenIdx >= 0 ? qObj.options[chosenIdx] : "—",
      correct: qObj.options[qObj.answer],
      isCorrect: correct
    });
  });

  const total = order.length;
  const percent = Math.round((score / total) * 100);
  const pass = percent >= PASSING_PERCENT;

  hide(quizScreen); show(resultScreen);
  resultSummary.innerHTML = `
    <div class="${pass ? 'result-good' : 'result-bad'}">
      <strong>Score:</strong> ${score}/${total} (${percent}%) — 
      <strong>${pass ? 'PASS' : 'FAIL'}</strong>
    </div>
  `;

  breakdownEl.innerHTML = rows.map(r => `
    <div class="row">
      <div><strong>${r.no}.</strong> ${r.question}</div>
      <div>${r.isCorrect ? '<span class="correct">Correct</span>' : '<span class="incorrect">Incorrect</span>'}</div>
    </div>
  `).join("");
});

/* ====== Controls ====== */
document.getElementById("reset-quiz").addEventListener("click", () => {
  renderQuiz();
  startTimer();
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

document.getElementById("try-again").addEventListener("click", () => {
  hide(resultScreen); show(quizScreen);
  renderQuiz();
  startTimer();
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

document.getElementById("logout").addEventListener("click", () => {
  hide(resultScreen); show(loginScreen);
  loginForm.reset();
  questionList.innerHTML = "";
  loginError.textContent = "";
  answeredCount.textContent = "0/0";
  timerEl.textContent = "";
});

document.getElementById("print-result").addEventListener("click", () => {
  window.print(); // Use browser's Print to PDF
});


