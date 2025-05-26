const triviaQuestions = [
    {
        question: "What is the capital city of Kazakhstan?",
        options: ["Astana", "Almaty", "Tashkent", "Bishkek"],
        answer: "Astana"
    },
    {
        question: "Which element has the chemical symbol 'Sn'?",
        options: ["Tungsten", "Tin", "Wolframite", "Zinc"],
        answer: "Tin"
    },
    {
        question: "In which year did the Berlin Wall fall?",
        options: ["1987", "1989", "1991", "1990"],
        answer: "1989"
    },
    {
        question: "Who painted 'The Starry Night'?",
        options: ["Rembrandt", "Van Gogh", "Vermeer", "Rubens"],
        answer: "Van Gogh"
    },
    {
        question: "What is the smallest prime number?",
        options: ["1", "2", "3", "0"],
        answer: "2"
    },
    {
        question: "Which country has won the most FIFA World Cups?",
        options: ["Germany", "Argentina", "Italy", "Brazil"],
        answer: "Brazil"
    },
    {
        question: "What is the hardest natural substance on Earth?",
        options: ["Diamond", "Quartz", "Corundum", "Obsidian"],
        answer: "Diamond"
    },
    {
        question: "Which famous scientist developed the laws of motion?",
        options: ["Newton", "Einstein", "Galileo", "Tesla"],
        answer: "Newton"
    },
    {
        question: "Which planet has the most moons?",
        options: ["Jupiter", "Saturn", "Mars", "Uranus"],
        answer: "Saturn"
    },
    {
        question: "What is the longest river in the world?",
        options: ["Amazon", "Yangtze", "Nile", "Mississippi"],
        answer: "Nile"
    },
    {
        question: "Which film begins with the line: 'A long time ago in a galaxy far, far away...'?",
        options: ["Star Wars", "Star Trek", "The Matrix", "Avatar"],
        answer: "Star Wars"
    },
    {
        question: "What is the currency of FRANCE?",
        options: ["Euro", "Franc", "Dollar", "Pound"],
        answer: "Euro"
    },
    {
        question: "Which element is named after the creator of the periodic table?",
        options: ["Mendelevium", "Einsteinium", "Curium", "Fermium"],
        answer: "Mendelevium"
    },
    {
        question: "Who was the first woman to win a Nobel Prize?",
        options: ["Marie Curie", "Rosalind Franklin", "Ada Lovelace", "Dorothy Hodgkin"],
        answer: "Marie Curie"
    },
    {
        question: "What is the largest mammal in the world?",
        options: ["Blue Whale", "Elephant", "Giraffe", "Great White Shark"],
        answer: "Blue Whale"
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Mars", "Venus", "Jupiter", "Saturn"],
        answer: "Mars"
    },
    {
        question: "In which city would you find the famous landmark 'The Colosseum'?",
        options: ["Rome", "Athens", "Paris", "London"],
        answer: "Rome"
    },
    {
        question: "Which country is known as the Land of the Rising Sun?",
        options: ["China", "Japan", "Thailand", "South Korea"],
        answer: "Japan"
    },
    {
        question: "Which desert is the largest in the world (non-polar)?",
        options: ["Sahara", "Gobi", "Kalahari", "Arabian"],
        answer: "Sahara"
    },
    {
        question: "Who invented the World Wide Web?",
        options: ["Tim Berners-Lee", "Alan Turing", "Bill Gates", "Steve Jobs"],
        answer: "Tim Berners-Lee"
    },
    {
        question: "In computing, what does 'CPU' stand for?",
        options: ["Central Processing Unit", "Computer Primary Unit", "Core Processing Unit", "Central Program Utility"],
        answer: "Central Processing Unit"
    },
    {
        question: "What is the official language of Iran?",
        options: ["Farsi", "Arabic", "Kurdish", "Urdu"],
        answer: "Farsi"
    },
    {
        question: "Which chess piece can only move diagonally?",
        options: ["Bishop", "Knight", "Rook", "Pawn"],
        answer: "Bishop"
    },
    {
        question: "Which Indian state/UT has volcanoes?",
        options: ["Lakshadweep", "Andaman and Nicobar Islands", "Maharashtra", "Tamil Nadu"],
        answer: "Andaman and Nicobar Islands"
    },
    {
        question: "Who discovered penicillin?",
        options: ["Alexander Fleming", "Marie Curie", "Edward Jenner", "Louis Pasteur"],
        answer: "Alexander Fleming"
    },
    {
        question: "What is the rarest blood type?",
        options: ["AB negative", "O negative", "A positive", "B positive"],
        answer: "AB negative"
    },
    {
        question: "Which novel features the character Atticus Finch?",
        options: ["To Kill a Mockingbird", "1984", "The Catcher in the Rye", "Of Mice and Men"],
        answer: "To Kill a Mockingbird"
    }
].map(q => ({
    ...q,
    options: shuffleArray([...q.options]) // Create a new shuffled array for each question's options
}));

// Fisher-Yates shuffle algorithm
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Shuffle the quiz questions
const quizData = shuffleArray(triviaQuestions);



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
