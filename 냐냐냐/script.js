const questions = [
    {
        id: "Q1",
        text: "일이 꼬였던 하루, 집에 돌아온 당신이 가장 먼저 하는 행동은?",
        options: [
            { text: '"오늘 진짜 별로였어!"라고 말하며 바로 털어버릴 활동을 한다.', score: 2 },
            { text: "침대에 누워 오늘 왜 그랬을까 조용히 되짚어본다.", score: 1 }
        ]
    },
    {
        id: "Q2",
        text: "소중하게 아끼던 컵을 깨뜨렸을 때, 당신의 마음속에 떠오르는 생각은?",
        options: [
            { text: '"아쉽지만, 더 예쁜 컵을 살 기회야!"', score: 2 },
            { text: '"아... 왜 그랬지?"라며 한동안 깨진 조각을 바라본다.', score: 1 }
        ]
    },
    {
        id: "Q3",
        text: "낯선 곳에서 길을 잃었을 때, 당신의 태도는 어떤가요?",
        options: [
            { text: '"이왕 이렇게 된 거, 새로운 동네 구경이나 하자!"', score: 2 },
            { text: "당황해서 식은땀이 나고, 원래 가려던 길을 찾을 때까지 긴장한다.", score: 1 }
        ]
    },
    {
        id: "Q4",
        text: "누군가가 나를 오해하고 있다는 걸 알게 되었을 때, 당신의 마음은?",
        options: [
            { text: '"언젠가는 진실을 알겠지." 하고 내 할 일을 한다.', score: 2 },
            { text: "오해를 풀지 못한 상황이 계속 신경 쓰여 잠을 설친다.", score: 1 }
        ]
    },
    {
        id: "Q5",
        text: "갑자기 찾아온 비어버린 휴일, 당신은 어떻게 시간을 보내고 싶나요?",
        options: [
            { text: '"오히려 좋아!" 계획에 없던 새로운 일을 시도해 본다.', score: 2 },
            { text: "뭘 해야 할지 고민만 하다가 결국 평소와 다름없이 보낸다.", score: 1 }
        ]
    }
];

const results = {
    6: {
        title: "Spring Mind (새싹형)",
        icon: "🌱",
        keyword: "회복력 높음 / 긍정 전환 / 유연함",
        desc: "지금 당신의 마음은 싱그러운 새싹처럼 넘어져도 다시 고개를 드는 힘을 가지고 있네요. 작은 실수나 예상치 못한 일도 당신에게는 새로운 시작이 될 수 있어요.",
        action: "가볍게 산책하기, 새로운 취미 시작하기",
        suggestion: "작은 화분을 하나 키워보는 건 어떨까요? 매일 무언가가 자라는 것을 보며 당신의 마음도 함께 성장할 거예요.",
        theme: "theme--spring"
    },
    5: {
        title: "Phoenix Mind (불꽃형)",
        icon: "🔥",
        keyword: "강한 반등 / 도전형 / 에너지",
        desc: "지금 당신의 마음은 작은 불씨처럼 다시 타오를 준비를 하고 있네요. 어려움이 와도 당신은 결국 더 강한 모습으로 다시 일어나는 사람입니다.",
        action: "운동 10분, 미뤘던 일 하나 해결하기",
        suggestion: "강렬한 운동 뒤의 개운함을 즐겨보세요. 몸을 움직이는 활력이 당신의 마음을 더 견고하게 만들어줄 거예요.",
        theme: "theme--phoenix"
    },
    4: {
        title: "Ocean Mind (파도형)",
        icon: "🌊",
        keyword: "감정 풍부 / 공감형 / 균형 회복",
        desc: "지금 당신의 마음은 잔잔한 파도처럼 감정을 천천히 흘려보내고 있네요. 당신은 감정을 억누르기보다 이해하고 받아들이는 힘을 가진 사람입니다.",
        action: "음악 듣기, 감정 일기 쓰기",
        suggestion: "지금 느끼는 감정을 솔직하게 글로 적어보세요. 파도가 모래사장을 씻어내듯 당신의 복잡한 마음도 한결 가벼워질 거예요.",
        theme: "theme--ocean"
    },
    3: {
        title: "Night Mind (밤하늘형)",
        icon: "🌙",
        keyword: "내면형 / 회복 필요 / 휴식",
        desc: "지금 당신의 마음은 조용한 밤하늘처럼 깊은 휴식을 기다리고 있네요. 잠시 멈추고 숨을 고르는 시간도 당신에게는 꼭 필요한 회복의 과정입니다.",
        action: "따뜻한 차 한잔, 휴대폰 없이 10분 휴식",
        suggestion: "잠들기 전 5분만 명상을 시도해 보세요. 어둠이 있어야 별이 보이듯, 고요함 속에서 당신의 진심을 만날 수 있을 거예요.",
        theme: "theme--night"
    }
};

let currentQuestions = [];
let currentIndex = 0;
let userAnswers = []; // Array of { questionId, score }

// DOM elements
const introScreen = document.getElementById('intro');
const quizScreen = document.getElementById('quiz');
const resultScreen = document.getElementById('result');
const questionCard = document.getElementById('question-card');
const questionText = document.getElementById('question-text');
const optionButtons = document.querySelectorAll('.option-btn');
const progressIndicator = document.getElementById('progress-indicator');
const backBtn = document.getElementById('back-btn');

// Start Test
document.getElementById('start-btn').addEventListener('click', () => {
    initQuiz();
    showScreen('quiz');
});

// Restart Test
document.getElementById('restart-btn').addEventListener('click', () => {
    showScreen('intro');
});

function initQuiz() {
    // Randomly pick 3 questions
    currentQuestions = [...questions].sort(() => 0.5 - Math.random()).slice(0, 3);
    currentIndex = 0;
    userAnswers = [];
    updateQuizUI();
}

function updateQuizUI(direction = 'right') {
    const q = currentQuestions[currentIndex];
    
    // Progress
    const progress = ((currentIndex + 1) / currentQuestions.length) * 100;
    progressIndicator.style.width = `${progress}%`;

    // Animation: Slide out old, slide in new
    questionCard.classList.remove('slide-in-right', 'slide-in-left');
    void questionCard.offsetWidth; // Trigger reflow
    
    questionCard.classList.add(direction === 'right' ? 'slide-in-right' : 'slide-in-left');
    
    // Content
    questionText.innerText = q.text;
    optionButtons.forEach((btn, idx) => {
        btn.innerText = q.options[idx].text;
        btn.dataset.score = q.options[idx].score;
    });

    // Back button visibility
    backBtn.style.visibility = currentIndex === 0 ? 'hidden' : 'visible';
}

// Answer Selection
optionButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const score = parseInt(btn.dataset.score);
        userAnswers[currentIndex] = { id: currentQuestions[currentIndex].id, score: score };

        if (currentIndex < currentQuestions.length - 1) {
            currentIndex++;
            updateQuizUI('right');
        } else {
            showResult();
        }
    });
});

// Back Navigation
backBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        updateQuizUI('left');
    }
});

function showResult() {
    const totalScore = userAnswers.reduce((acc, curr) => acc + curr.score, 0);
    const resultData = results[totalScore];

    document.getElementById('result-icon').innerText = resultData.icon;
    document.getElementById('result-title').innerText = resultData.title;
    document.getElementById('result-keyword').innerText = resultData.keyword;
    document.getElementById('result-desc').innerText = resultData.desc;
    document.getElementById('result-action').innerText = resultData.action;
    document.getElementById('result-suggestion').innerText = resultData.suggestion;

    // Apply theme to whole page (body)
    document.body.className = ''; 
    document.body.classList.add(resultData.theme);

    showScreen('result');
}

function showScreen(screenId) {
    [introScreen, quizScreen, resultScreen].forEach(s => s.classList.remove('active'));
    document.getElementById(screenId).classList.add('active');
    
    // Reset body theme if not result
    if (screenId !== 'result') {
        document.body.className = '';
    }
}
