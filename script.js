const tickSound = new Audio("assets/sounds/clock-ticking-sound-effect-240503.mp3"); // Caminho para o som do timer
const scoreSound = new Audio("assets/sounds/1-efek-sound-3-220030.mp3"); // Caminho para o som do score final

const quizData = [
  {
    question: "Qual é a capital do Brasil?",
    options: ["São Paulo", "Brasília", "Rio de Janeiro", "Belo Horizonte"],
    correct: 1
  },
  {
    question: "Qual linguagem roda no navegador?",
    options: ["Python", "Java", "JavaScript", "C#"],
    correct: 2
  },
  {
    question: "Quem fundou a Microsoft?",
    options: ["Steve Jobs", "Mark Zuckerberg", "Bill Gates", "Elon Musk"],
    correct: 2
  }
];

let currentQuestion = 0;
let score = 0;

const questionEl = document.getElementById("question");
const optionEls = [
  document.getElementById("opt0"),
  document.getElementById("opt1"),
  document.getElementById("opt2"),
  document.getElementById("opt3")
];
const nextBtn = document.getElementById("next");
const scoreContainer = document.getElementById("score-container");
const scoreEl = document.getElementById("score");

let timerEl = document.createElement("div");
timerEl.id = "timer";
timerEl.style.position = "relative"; // Define a posição relativa ao contêiner
timerEl.style.fontSize = "3em"; // Aumenta o tamanho da fonte
timerEl.style.fontWeight = "bold"; // Deixa o texto em negrito
timerEl.style.color = "#ff0000"; // Altera a cor para vermelho
timerEl.style.textAlign = "right"; // Alinha o texto à direita
timerEl.style.marginTop = "20px"; // Adiciona margem superior
document.getElementById("quiz-container").appendChild(timerEl); // Move o timer para baixo da imagem

let timer;
let timeLeft = 10;

function startTimer() {
  timeLeft = 10;
  timerEl.textContent = timeLeft; // Exibe apenas os segundos
  timer = setInterval(() => {
    timeLeft--;
    tickSound.play(); // Reproduz o som a cada segundo
    timerEl.textContent = timeLeft; // Atualiza apenas os segundos
    if (timeLeft <= 0) {
      clearInterval(timer);
      handleTimeout();
    }
  }, 1000);
}

function handleTimeout() {
  alert("Tempo esgotado! Indo para a próxima pergunta.");
  currentQuestion++;
  if (currentQuestion < quizData.length) {
    loadQuestion();
  } else {
    showScore();
  }
}

function loadQuestion() {
  const q = quizData[currentQuestion];
  questionEl.textContent = q.question;

  q.options.forEach((opt, i) => {
    optionEls[i].textContent = opt;
    document.querySelectorAll('input[name="answer"]')[i].checked = false;
  });
  startTimer(); // Inicia o temporizador ao carregar a pergunta
}

function getSelectedAnswer() {
  const radios = document.querySelectorAll('input[name="answer"]');
  for (let radio of radios) {
    if (radio.checked) return parseInt(radio.value);
  }
  return null;
}

function showScore() {
  document.querySelector("h2#question").style.display = "none";
  document.getElementById("answers").style.display = "none";
  nextBtn.style.display = "none";
  scoreContainer.style.display = "block";
  scoreEl.textContent = `Você acertou ${score} de ${quizData.length} perguntas!`;
  scoreSound.play(); // Reproduz o som ao exibir o score
}

nextBtn.addEventListener("click", () => {
  clearInterval(timer); // Para o temporizador ao clicar no botão
  const selected = getSelectedAnswer();
  if (selected === null) {
    alert("Por favor, selecione uma resposta!");
    return;
  }

  if (selected === quizData[currentQuestion].correct) {
    score++;
  }

  currentQuestion++;
  if (currentQuestion < quizData.length) {
    loadQuestion();
  } else {
    showScore();
  }
});

loadQuestion();
