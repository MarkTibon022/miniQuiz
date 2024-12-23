const questions = [
  {
    question:
      "Which of the following is the correct syntax for a for loop in C++?",
    answer: [
      { text: "for (int i = 0; i < 10; i++) {}", correct: true },
      { text: "loop (int i = 0; i < 10; i++) {}", correct: false },
      { text: "for int i = 0 to 10 do {}", correct: false },
      { text: "repeat (int i = 0; i < 10; i++) {}", correct: false },
    ],
  },
  {
    question:
      "Which of the following is the correct way to include a library in C++?",
    answer: [
      { text: "#library<iostream>", correct: false },
      { text: "import <iostream>", correct: false },
      { text: "#include <iostream>", correct: true },
      { text: "use library iostream;", correct: false },
    ],
  },
  {
    question: "Which data type is used to store a single character in C++?",
    answer: [
      { text: "string", correct: false },
      { text: "char", correct: true },
      { text: "int", correct: false },
      { text: " float", correct: false },
    ],
  },
  {
    question:
      "Which of the following is the correct way to write an if statement in C++?",
    answer: [
      { text: "if x == 10 {}", correct: false },
      { text: "if (x == 10) {}", correct: true },
      { text: "if (x = 10) {}", correct: false },
      { text: "if x = 10 {}", correct: false },
    ],
  },
  {
    question: "Which of the following is used to terminate a statement in C++?",
    answer: [
      { text: "A colon :", correct: false },
      { text: "A semicolon ;", correct: true },
      { text: "A comma ,", correct: false },
      { text: " A period .", correct: false },
    ],
  },
];

const questionElement = document.getElementById("question");
const answerButton = document.querySelector(".answer-button");
const nextButton = document.getElementById("next-button");

let currentQuestionIndex = 0;
let score = 0;

const startQuiz = () => {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "next";
  showQuiz();
};

const showQuiz = () => {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let currentQuestionNo = currentQuestionIndex + 1;
  questionElement.innerHTML =
    currentQuestionNo + ".  " + currentQuestion.question;

  currentQuestion.answer.forEach((answers) => {
    const button = document.createElement("button");
    button.innerHTML = answers.text;
    button.classList.add("btn");
    answerButton.appendChild(button);
    if (answers.correct) {
      button.dataset.correct = answers.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
};

const resetState = () => {
  nextButton.style.display = "none";
  while (answerButton.firstChild) {
    answerButton.removeChild(answerButton.firstChild);
  }
};

const selectAnswer = (e) => {
  let selectButton = e.target;
  let isCorrect = selectButton.dataset.correct === "true";
  if (isCorrect) {
    selectButton.classList.add("correct");
    score++;
  } else {
    selectButton.classList.add("wrong");
  }

  Array.from(answerButton.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });

  nextButton.style.display = "block";
};

const showScore = () => {
  resetState();
  questionElement.innerHTML = `your score ${score} out of ${questions.length}`;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
};

const handleNextButton = () => {
  currentQuestionIndex++;

  if (currentQuestionIndex < questions.length) {
    showQuiz();
  } else {
    showScore();
  }
};

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

startQuiz();
