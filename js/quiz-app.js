// 퀴즈 데이터
const questions = [
    {
        question : 'HTML은 무엇의 약자일까요?',
        answers : [
            { text : "HyperText Markup Language", correct : true },
            { text : "HiText Markup Language", correct : false },
            { text : "HelloText Markup Language", correct : false },
            { text : "HyperText Marking Language", correct : false }
        ]
    },
    {
        question : 'CSS는 무엇의 약자일까요?',
        answers : [
            { text: "Colorful Style Sheets", correct: false },
            { text: "Computer Style Sheets", correct: false },
            { text : 'Cascading Style Sheets', correct : true},
            { text: "Creative Style Sheets", correct: false }
        ]
    },
    {
        question : 'JavaScript는 주로 무엇에 사용될까요?',
        answers : [
            { text: "웹 페이지 레이아웃 디자인", correct: false },
            { text: "서버 관리", correct: false },
            { text: "데이터베이스 관리", correct: false },
            { text: "웹 페이지 동작 제어", correct: true }
        ]
    },
    {
        question : 'CSS는 무엇의 약자일까요?',
        answers : [
            { text: "Colorful Style Sheets", correct: false },
            { text: "Computer Style Sheets", correct: false },
            { text : 'Cascading Style Sheets', correct : true},
            { text: "Creative Style Sheets", correct: false }
        ]
    }
]




document.addEventListener('DOMContentLoaded', () => {
    // Quiz Question
    const questionElem = document.getElementById('question');
    // Quiz Answer
    const answerElem = document.getElementById('answer-buttons');
    // Quiz SCore
    const scoreElem = document.getElementById('score');
    // Next Level
    const nextButton = document.getElementById('next-btn');

    let currentQuizIndex = 0;
    let score = 0;
    let select = false;

    const startAnswer = () => {
        currentQuizIndex = 0;
        score = 0;

        console.log(currentQuizIndex, score)
        showQuize();
    }

    const showQuize = () => {
        resetAnswers();
        // 질문, 답변 객체 담기
        const question = questions[currentQuizIndex];

        // 질문
        questionElem.textContent = question.question;

        // 답변 리스트 뿌려주기
        question.answers.forEach(answer => {
            // 답변 리스트 버튼 엘리먼트에 담기
            const button = document.createElement('li');
            button.textContent = answer.text;
            button.className = 'btn';
            if(answer.correct) button.dataset.correct = answer.correct;

            button.addEventListener('click', selectAnswer)

            answerElem.appendChild(button);
        })
    }

    const resetAnswers = () => {
        while(answerElem.firstChild) answerElem.removeChild(answerElem.firstChild);
    }

    const selectAnswer = (e) => {
        const selectedButton = e.target;
        const correct = selectedButton.dataset.correct;

        
        currentQuizIndex++;
        if(correct){
            score++;
        }

        if(currentQuizIndex < questions.length){
            showQuize();
        }else{
            const complitedeElem = document.createElement('li');
            complitedeElem.textContent = `최종 점수 : ${score} / ${questions.length}`;

            nextButton.textContent = '문제 다시 풀기';
            

            while(answerElem.firstChild) answerElem.removeChild(answerElem.firstChild);

            answerElem.appendChild(complitedeElem);

            questionElem.textContent = '';

            nextButton.addEventListener('click', startAnswer);
        }
        scoreElem.textContent = `점수 : ${score}`
    }

    showQuize();
})