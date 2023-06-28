var current = 0; // Keep track of the current question
var score = { win: 0, loss: 0 }; // Store the user's score
var timerElement = document.querySelector(".timer-count"); // Element displaying the timer
var timeLeft = 30; // 30 seconds
var timerId; // The ID of the timer interval

// This is our array of quiz questions, possible answers, and the correct answer
var questions = [
  {
    question: "Javascript is an _______ language?",
    answers: ["Object-Oriented", "Object-Based", "Procedural", "None of the Above"],
    correctAnswer: 0
  },
  {
    question: "Which of the following keywords is used to define a variable in JavaScript?",
    answers: ["var", "let", "All of the Above", "None of the Above"],
    correctAnswer: 2
  },
  {
    question: "Upon encountering empty statements, what does JavaScript Interpreter do?",
    answers: ["Throws an Error", "Ignores the Statements", "Gives a Warning", "None of the Above"],
    correctAnswer: 1
  },
  {
    question: "Which of the following methods can be used to display data in some form using JavaScript?",
    answers: ["document.write()", "console.log()", "window.alert()", "All of the Above"],
    correctAnswer: 3
  }
];

// These variables are for targeting specific elements in our HTML
var questionElement = document.querySelector(".questions");
var answersElement = document.querySelector(".answers");
var resultElement = document.querySelector(".message");
var winElement = document.querySelector(".win");
var lossElement = document.querySelector(".loss");

// The 'loadQuestion' function will display the current question and its answers
function loadQuestion() {
  var currentQuestion = questions[current];
  questionElement.textContent = currentQuestion.question;
  answersElement.innerHTML = '';

  for (var i = 0; i < currentQuestion.answers.length; i++) {
    var answerOption = currentQuestion.answers[i];
    var radio = document.createElement('input');
    radio.type = 'radio';
    radio.name = 'answer';
    radio.value = i;

    var label = document.createElement('label');
    label.textContent = answerOption;

    label.insertBefore(radio, label.firstChild); // Append radio button inside the label element
    answersElement.appendChild(label);
  }
}

// The 'checkAnswer' function checks the user's answer, updates the score, and either goes to the next question or ends the quiz
function checkAnswer() {
  var selectedOption = document.querySelector('input[name="answer"]:checked');

  if (selectedOption) {
    var selectedAnswer = parseInt(selectedOption.value);
    var currentQuestion = questions[current];

    if (selectedAnswer === currentQuestion.correctAnswer) {
      resultElement.textContent = 'Correct!';
      score.win++;
    } else {
      resultElement.textContent = 'Incorrect!';
      score.loss++;
    }

    current++;
    
    if (current < questions.length) {
      loadQuestion();
    } else {
      endQuiz();
    }

    updateScore();
  }
}

// The 'updateScore' function updates the score display
function updateScore() {
  winElement.textContent = score.win;
  lossElement.textContent = score.loss;
}

// The 'resetQuiz' function resets everything back to the starting point, like the scores, the current question, and the timer
function resetQuiz() {
  current = 0;
  score.win = 0;
  score.loss = 0;
  timeLeft = 30; // reset the timer
  timerElement.textContent = timeLeft; // update the timer display
  updateScore();
  loadQuestion();
}

// The 'startQuiz' function gets everything started
function startQuiz() {
  resetQuiz();
  resultElement.textContent = ""; // clear the message
  timerId = setInterval(updateTimer, 1000);
}

// The 'updateTimer' function is called every second by our countdown timer. It decreases the time left and ends the quiz if the time runs out
function updateTimer() {
  timeLeft--;
  timerElement.textContent = timeLeft;

  if (timeLeft <= 0) {
    endQuiz();
  }
}

// The 'endQuiz' function stops the timer and lets the user know the quiz is finished
function endQuiz() {
  resultElement.textContent = 'Quiz finished!';
  clearInterval(timerId); // stop the timer
}

loadQuestion();
updateScore();

// Finally, we add event listeners to the 'Check Answer', 'Reset', and 'Start Quiz' buttons so they can respond when clicked
var checkButton = document.querySelector('.checkAnswer');
checkButton.addEventListener('click', checkAnswer);

var resetButton = document.querySelector('.reset-button');
resetButton.addEventListener('click', resetQuiz);

var startButton = document.querySelector('.start-button');
startButton.addEventListener('click', startQuiz);