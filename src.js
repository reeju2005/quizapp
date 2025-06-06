// Fisher-Yates shuffle algorithm
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Shuffle the quiz questions
const quizData = shuffleArray(triviaQuestions.map(q => ({
    ...q,
    options: shuffleArray([...q.options])
}))).slice(0, 20);

// Initialize variables
let currentQuestion = 0;
let score = 0;
let timeLeft = 10;
let timerInterval;
let consecutiveQ = 0;
// Get DOM elements
const timerEl = document.getElementById('time');
const questionEl = document.querySelector('.question');
const optionsEl = document.querySelector('.options');
const resultEl = document.querySelector('.result');
const scoreEl = document.getElementById('score');
const restartBtn = document.querySelector('.restart-btn');
const endBtn = document.querySelector('.end-btn');

// Function to load the question
function loadQuestion() {
    if (currentQuestion >= quizData.length) {
        endQuiz();
        return;
    }
    clearInterval(timerInterval);
    timeLeft = 10;
    timerEl.textContent = timeLeft;
    startTimer();
    const currentQuiz = quizData[currentQuestion];
    questionEl.textContent = currentQuiz.question;
    optionsEl.innerHTML = ''; // Clear previous options
    currentQuiz.options.forEach(option => {
        const button = document.createElement('button');
        button.classList.add('option');
        button.textContent = option;
        button.onclick = () => checkAnswer(option);
        optionsEl.appendChild(button);
    });
    endBtn.style.display = 'none'; // Hide the end button
}

// Check the answer
function checkAnswer(selectedOption) {
    if (selectedOption === quizData[currentQuestion].answer) {
        if (timeLeft > 7) {
        score += 3;
        }
        else if (timeLeft > 4) {
            score += 2;
        } else {
            score += 1;
        }
        consecutiveQ++;
        createBonus(consecutiveQ);
        // Show correct answer message
        resultEl.textContent = "Correct! Score: " + score;
        resultEl.style.color = "green";
        resultEl.style.display = 'block';
        
    }
    else {
        // Deduct points for wrong answer
        score -= 1;
        consecutiveQ = 0; // Reset consecutive correct answers
        resultEl.textContent = "Wrong! The correct answer is: " + quizData[currentQuestion].answer;
        resultEl.textContent = "Score: " + score;
        resultEl.style.color = "red";
        resultEl.style.display = 'block';
        
    }
    currentQuestion++;
    loadQuestion();
}

//The function to create bonus based on number of consecutive correct answers
function createBonus(consecutiveQ) {
    if (consecutiveQ >= 15) {
        score += 10;
    } else if (consecutiveQ >= 10) {
        score += 5;
    } else if (consecutiveQ >= 5) {
        score += 3;
    }
}

// Start the timer
function startTimer() {
    timerInterval = setInterval(() => {
        timeLeft--;
        timerEl.textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            currentQuestion++;
            if (currentQuestion >= quizData.length) {
                endQuiz();
            } else {
                loadQuestion();
            }
        }
    }, 1000);
}
function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    timeLeft = 10;
    timerEl.textContent = timeLeft;

    questionEl.style.display = 'block';
    optionsEl.style.display = 'flex'; // Ensure options are displayed correctly
    resultEl.style.display = 'none';
    restartBtn.style.display = 'none';

    loadQuestion();
}


// End the quiz and show the results
function endQuiz() {
    clearInterval(timerInterval);
    questionEl.style.display = 'none';
    optionsEl.style.display = 'none';
    resultEl.style.display = 'block';
    resultEl.textContent = `Final Score: ${score}`;
    scoreEl.textContent = score;
    restartBtn.style.display = 'block';
    endBtn.style.display = 'block'; // Hide the end button
}

// Add event listener for the end button
endBtn.addEventListener('click', () => {
    clearInterval(timerInterval);
    window.location.href = "end.html";
});

// Add event listener for the restart button
restartBtn.addEventListener('click', () => {
    // Reset variables
    currentQuestion = 0;
    score = 0;
    timeLeft = 10;
    timerEl.textContent = timeLeft;

    // Reset the display
    questionEl.style.display = 'block';
    optionsEl.style.display = 'flex'; // Ensure options are displayed correctly
    resultEl.style.display = 'none';
    restartBtn.style.display = 'none';
    endBtn.style.display = 'none'; // Hide the end button

    // Load the first question
    loadQuestion();
});

// Initialize the quiz with the first question
loadQuestion();

