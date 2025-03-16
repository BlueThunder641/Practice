const questions = [
    { question: "What is 36 × 11?", correct: 396, choices: [396, 326, 416, 356] },
    { question: "What is 45²?", correct: 2025, choices: [2025, 2250, 2050, 2100] },
    { question: "What is 99²?", correct: 9801, choices: [9801, 9901, 9701, 9601] },
    { question: "What is 125 × 8?", correct: 1000, choices: [1000, 1024, 950, 1100] },
    { question: "What is 23 × 25?", correct: 575, choices: [575, 625, 550, 600] }
];

let score = 0;
let timeLeft = 10;
let timer;
let currentQuestionIndex = 0;

// Start game
function loadQuestion() {
    if (currentQuestionIndex >= questions.length) {
        document.getElementById("question").textContent = "Game Over! Final Score: " + score;
        document.getElementById("choices").innerHTML = "";
        clearInterval(timer);
        return;
    }

    const q = questions[currentQuestionIndex];
    document.getElementById("question").textContent = q.question;
    const choicesContainer = document.getElementById("choices");
    choicesContainer.innerHTML = "";

    q.choices.forEach(choice => {
        const button = document.createElement("button");
        button.textContent = choice;
        button.onclick = () => checkAnswer(choice);
        choicesContainer.appendChild(button);
    });

    resetTimer();
}

// Check answer
function checkAnswer(selected) {
    const q = questions[currentQuestionIndex];

    if (selected === q.correct) {
        score += timeLeft * 10; // More points for faster answers
        document.getElementById("feedback").textContent = "✅ Correct!";
    } else {
        document.getElementById("feedback").textContent = "❌ Wrong! The answer was " + q.correct;
    }

    document.getElementById("score").textContent = score;
    currentQuestionIndex++;
    setTimeout(loadQuestion, 1000); // Load next question
}

// Timer countdown
function resetTimer() {
    clearInterval(timer);
    timeLeft = Math.max(5, 10 - currentQuestionIndex); // Timer speeds up
    document.getElementById("timer").textContent = timeLeft;
    
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById("timer").textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            checkAnswer(null); // Time ran out
        }
    }, 1000);
}

// Start the game
loadQuestion();
