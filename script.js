// 퀴즈 데이터: 이미지, 음성, 정답
const quizData = [
  { img: 'image/1.png', audio: 'sound/eti_finish_audio_1.mp3?v=2', answer: 'O' },
  { img: 'image/2.png', audio: 'sound/eti_finish_audio_2.mp3?v=2', answer: 'X' },
  { img: 'image/3.png', audio: 'sound/eti_finish_audio_3.mp3?v=2', answer: 'X' },
  { img: 'image/4.png', audio: 'sound/eti_finish_audio_4.mp3?v=2', answer: 'O' },
  { img: 'image/5.png', audio: 'sound/eti_finish_audio_5.mp3?v=2', answer: 'O' },
  { img: 'image/6.png', audio: 'sound/eti_finish_audio_6.mp3?v=2', answer: 'X' },
  { img: 'image/7.png?v=2', audio: 'sound/eti_finish_audio_7.mp3?v=2', answer: 'X' },
  { img: 'image/8.png?v=3', audio: 'sound/eti_finish_audio_8.mp3?v=2', answer: 'O' },
  { img: 'image/9.png?v=2', audio: 'sound/eti_finish_audio_9.mp3?v=2', answer: 'O' },
];

const errorAudio = new Audio('sound/Error3.mp3');
const correctAudio = new Audio('sound/Glow3.mp3');
let current = 0;
let score = 0;
let wrong = 0;

const quizImage = document.getElementById('quiz-image');
const quizAudio = document.getElementById('quiz-audio');
const progress = document.getElementById('progress');
const oxButtons = document.getElementById('ox-buttons');
const btnO = document.getElementById('btn-o');
const btnX = document.getElementById('btn-x');
const resultArea = document.getElementById('result-area');
const resultMsg = document.getElementById('result-message');
const restartBtn = document.getElementById('restart-btn');
const startArea = document.getElementById('start-area');
const startBtn = document.getElementById('start-btn');

function showQuiz(idx) {
  const q = quizData[idx];
  quizImage.src = q.img;
  quizAudio.src = q.audio;
  progress.textContent = `문제 ${idx + 1}/${quizData.length}`;
  btnO.disabled = true;
  btnX.disabled = true;
  quizAudio.load();
  setTimeout(() => {
    quizAudio.play();
  }, 1000);
}

quizAudio.onended = () => {
  btnO.disabled = false;
  btnX.disabled = false;
};

function checkAnswer(user) {
  // 버튼 숨김 제거, 클릭해도 계속 보이게
  btnO.disabled = true;
  btnX.disabled = true;
  const correct = quizData[current].answer === user;
  if (correct) {
    correctAudio.currentTime = 0;
    correctAudio.play();
    score++;
  } else {
    errorAudio.currentTime = 0;
    errorAudio.play();
    wrong++;
  }
  setTimeout(() => {
    current++;
    if (current < quizData.length) {
      showQuiz(current);
    } else {
      showResult();
    }
  }, 1200);
}

function showResult() {
  document.getElementById('quiz-area').classList.add('hidden');
  resultArea.classList.remove('hidden');
  resultMsg.innerHTML = `
    <div class="result-scores">
      <div class="result-box correct">
        <span class="result-o">O</span>
        <span class="result-text">
          <span class="result-count">${score}</span>
          <span class="result-label">문제</span>
        </span>
      </div>
      <div class="result-box wrong">
        <span class="result-x">X</span>
        <span class="result-text">
          <span class="result-count">${wrong}</span>
          <span class="result-label">문제</span>
        </span>
      </div>
    </div>
  `;
}

function restartQuiz() {
  resultArea.classList.add('hidden');
  startArea.classList.remove('hidden');
}

function startQuiz() {
  resultArea.classList.add('hidden');
  startArea.classList.add('hidden');
  document.getElementById('quiz-area').classList.remove('hidden');
  current = 0;
  score = 0;
  wrong = 0;
  showQuiz(0);
}

startBtn.onclick = startQuiz;
btnO.onclick = () => checkAnswer('O');
btnX.onclick = () => checkAnswer('X');
restartBtn.onclick = restartQuiz;

// 첫 화면: 시작하기만 보이게
startArea.classList.remove('hidden');
document.getElementById('quiz-area').classList.add('hidden');
resultArea.classList.add('hidden');
