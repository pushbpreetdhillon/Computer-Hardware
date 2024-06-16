document.addEventListener('DOMContentLoaded', () => {
    const questions = document.querySelectorAll('.question');
    const nextButton = document.getElementById('next-button');
    const resultContainer = document.getElementById('result-container');
    const resultElement = document.getElementById('result');

    let currentQuestionIndex = 0;
    let score = 0;

    function startQuiz() {
        currentQuestionIndex = 0;
        score = 0;
        nextButton.style.display = 'none';
        resultContainer.style.display = 'none';
        showQuestion(currentQuestionIndex);
    }

    function showQuestion(index) {
        questions.forEach((question, i) => {
            question.classList.toggle('active', i === index);
        });
        nextButton.style.display = 'none';
    }

    function selectAnswer() {
        const question = questions[currentQuestionIndex];
        const correctIndex = parseInt(question.getAttribute('data-correct'));
        const selectedAnswer = question.querySelector('input[type="radio"]:checked');
        if (!selectedAnswer) {
            return;
        }
        const isCorrect = parseInt(selectedAnswer.value) === correctIndex;
        
        if (isCorrect) {
            score++;
        }

        nextButton.style.display = 'block';
    }

    function showNextQuestion() {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            showQuestion(currentQuestionIndex);
        } else {
            showResult();
        }
    }

    function showResult() {
        questions.forEach(question => question.classList.remove('active'));
        resultContainer.style.display = 'block';
        resultElement.textContent = `You scored ${score} out of ${questions.length}`;
        nextButton.textContent = 'Restart';
        nextButton.style.display = 'block';
        nextButton.removeEventListener('click', showNextQuestion);
        nextButton.addEventListener('click', startQuiz);
    }

    document.querySelectorAll('input[type="radio"]').forEach(input => {
        input.addEventListener('change', selectAnswer);
    });

    nextButton.addEventListener('click', showNextQuestion);

    startQuiz();
});