// 문제 데이터
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

    // 퀴즈 시작
    const startQuiz = () => {
        currentQuizIndex = 0;
        score = 0;
        nextButton.textContent = '다음 질문';
        showQuestion();
    }
    // 질의 호출
    const showQuestion = () => {
        resetState();
        const currentQuistion = questions[currentQuizIndex];
        questionElem.textContent = currentQuistion.question;

        currentQuistion.answers.forEach(answer => {
            const button = document.createElement('li');
            button.textContent = answer.text;
            button.className = 'btn';

            if(answer.correct) button.dataset.correct = answer.correct;

            // 버튼 선택
            button.addEventListener('click', selectAnswer);

            answerElem.appendChild(button);
        });
    }

    const resetState = () => {
        while (answerElem.firstChild) {
            answerElem.removeChild(answerElem.firstChild);
        }
    }

    // 질의 선택
    const selectAnswer = (e) => {
        // 선택 엘리먼트
        const selectedButton = e.target;
        // 정답 확인을 위한 변수
        const correct = selectedButton.dataset.correct
        if(correct){
            score++;
            currentQuizIndex++;
            if (currentQuizIndex < questions.length) {
                showQuestion();
            }else {
                nextButton.textContent = '퀴즈 다시 풀기';
                scoreElem.textContent = `최종 점수 : ${score} / ${questions.length}`;
                nextButton.addEventListener('click', startQuiz());
            }
        }else{
            return alert('틀렸어요, 다시 선택해보세요.')
        }
        
        Array.from(answerElem.children).forEach(button => {
            setStatusClass(button, button.dataset.correct);
        })

        scoreElem.textContent = `점수 : ${score}`;

    }

    // 스타일 생성
    const setStatusClass = (element, correct) => {
        resetStatusClass(element)
        if(correct){
            element.classList.add('correct')
        }else{
            element.classList.add('wrong');
        }
    }

    // 스타일 초기화
    const resetStatusClass = (element) => {
        element.classList.remove('correct');
        element.classList.remove('awrong');
    }

    // 스코어 정산
    // 다음 버튼


    showQuestion()

})