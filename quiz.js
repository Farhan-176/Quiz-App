let timeLeft = 60;
let timerInterval;
let currentQuestionIndex = 0;
let userAnswers = {};
let skippedQuestions = [];
let questions = [
    { q: "Which language runs in a web browser?", options: ["Python", "Java", "JavaScript", "HTML"], correct: 2 },
    { q: "What is the capital of France?", options: ["Berlin", "Madrid", "Paris", "Rome"], correct: 2 },
    { q: "Which tag is used for creating a hyperlink?", options: ["&lt;link&gt;", "&lt;a&gt;", "&lt;href&gt;", "&lt;h&gt;"], correct: 1 },
    { q: "What is 2 + 2?", options: ["3", "4", "5", "6"], correct: 1 },
    { q: "Which is not a programming language?", options: ["Python", "HTML", "Java", "C++"], correct: 1 }
];

function startTimer() {
    timeLeft = 60; // Reset timer to 60 seconds
    document.getElementById("time-left").innerText = timeLeft;
    timerInterval = setInterval(() => {
        document.getElementById("time-left").innerText = timeLeft;
        if (timeLeft === 0) {
            clearInterval(timerInterval);
            showTimeOverPopup();
        }
        timeLeft--;
    }, 1000);
}

function showTimeOverPopup() {
    document.getElementById("time-over-popup").style.display = "block";
    document.querySelectorAll("input[type='radio']").forEach(input => input.disabled = true);
    document.getElementById("submit-btn").style.display = "block";
}

function loadQuestion(index) {
    if (index >= questions.length) return;

    document.getElementById("question-number").innerText = `Q${index + 1})`;
    document.getElementById("question-text").innerText = questions[index].q;

    questions[index].options.forEach((opt, i) => {
        document.getElementById(`option-${i}`).innerHTML = opt;
        document.querySelectorAll("input[name='answer']")[i].checked = userAnswers[index] === i;
    });

    updateQuestionProgress(); // Update progress
    updateButtons();
}

function selectAnswer(index) {
    userAnswers[currentQuestionIndex] = index;
    removeFromSkipped(currentQuestionIndex);
    updateButtons();
}

function updateButtons() {
    const nextBtn = document.getElementById("next-btn");
    const submitBtn = document.getElementById("submit-btn");

    // Hide next button if last question is reached
    nextBtn.style.display = currentQuestionIndex < questions.length - 1 ? "inline-block" : "none";

    // Show submit button if all questions are answered or time is up
    submitBtn.style.display = Object.keys(userAnswers).length === questions.length || timeLeft === 0 ? "inline-block" : "none";
}

function nextQuestion() {
    if (!(currentQuestionIndex in userAnswers) && !skippedQuestions.includes(currentQuestionIndex)) {
        skippedQuestions.push(currentQuestionIndex);
        updateSkippedSection();
    }

    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        loadQuestion(currentQuestionIndex);
    }
}

function prevQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        loadQuestion(currentQuestionIndex);
    }
}

function updateSkippedSection() {
    let skippedList = document.getElementById("skipped-list");
    skippedList.innerHTML = "";
    skippedQuestions.forEach(qIndex => {
        let skippedItem = document.createElement("div");
        skippedItem.innerText = qIndex + 1;
        skippedItem.classList.add("skipped-item");
        skippedItem.onclick = () => {
            currentQuestionIndex = qIndex;
            loadQuestion(qIndex);
        };
        skippedList.appendChild(skippedItem);
    });
}

function removeFromSkipped(index) {
    skippedQuestions = skippedQuestions.filter(qIndex => qIndex !== index);
    updateSkippedSection();
}

function submitQuiz() {
    clearInterval(timerInterval); // Stop timer

    // Retrieve current user
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const username = currentUser ? currentUser.username : "Guest";

    // Calculate score
    let correctAnswers = 0;
    questions.forEach((q, index) => {
        if (userAnswers[index] === q.correct) {
            correctAnswers++;
        }
    });

    // Store quiz questions in localStorage
    localStorage.setItem("quizQuestions", JSON.stringify(questions));

    // Store quiz data
    localStorage.setItem("username", username);
    localStorage.setItem("currentScore", correctAnswers);
    localStorage.setItem("totalQuestions", questions.length);

    // Redirect to result page
    window.location.href = "result.html";
}
console.log("Questions from localStorage:", questions);


function startQuiz() {
    document.getElementById("instructions-popup").style.display = "none";
    startTimer();
    loadQuestion(currentQuestionIndex);
}

// Show instructions popup on load
window.onload = function () {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (window.location.pathname.includes("quiz.html")) {
        if (!currentUser) {
            alert("Login first!");
            window.location.href = "user.html";
        } else {
            document.getElementById("instructions-popup").style.display = "block";
        }
    }
};

// Update question progress
function updateQuestionProgress() {
    document.getElementById("current-question").innerText = currentQuestionIndex + 1;
    document.getElementById("total-questions").innerText = questions.length;
}




function submitQuiz() {
    clearInterval(timerInterval); // Stop timer

    // Retrieve current user
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const username = currentUser ? currentUser.username : "Guest";

    // Calculate score
    let correctAnswers = 0;
    questions.forEach((q, index) => {
        if (userAnswers[index] === q.correct) {
            correctAnswers++;
        }
    });

    // Store quiz questions and user answers in localStorage
    localStorage.setItem("quizQuestions", JSON.stringify(questions));
    localStorage.setItem("userAnswers", JSON.stringify(userAnswers)); // Store user answers

    // Store quiz data
    localStorage.setItem("username", username);
    localStorage.setItem("currentScore", correctAnswers);
    localStorage.setItem("totalQuestions", questions.length);

    // Redirect to result page
    window.location.href = "result.html";
}