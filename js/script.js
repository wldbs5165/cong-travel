// ----------온보딩 질문----------
const questions = [
  {
    title: "Q1. 어떤 여행을 원하시나요?",
    name: "style",
    options: ["휴양", "관광", "액티비티", "자연"],
  },
  {
    title: "Q2. 누구와 여행 가시나요?",
    name: "with",
    options: ["혼자", "친구", "연인", "가족"],
  },
  {
    title: "Q3. 여행 기간은 언제인가요?",
    name: "day",
    options: ["3~5월", "6~8월", "9~11월", "12~2월"],
  },
  {
    title: "Q4. 예산 스타일은 어떤가요?",
    name: "money",
    options: ["휴양", "관광", "액티비티", "자연"],
  },
  {
    title: "Q5. 몇 시간 거리가 적당한가요?",
    name: "hour",
    options: ["2~3시간", "4~6시간", "7~10시간", "상관없음"],
  },
];

let current = 0;

// 버튼 요소 불러옴
const prevBtn = document.querySelector(".question-prev-btn");
const nextBtn = document.querySelector(".question-next-btn");
// 선택 저장 객체
const answers = {};

// -----진행바-----
function updateStepBar() {
  const steps = document.querySelectorAll(".step");

  steps.forEach((step, index) => {
    if (index <= current) {
      step.src = "assets/icons/진행.png";
    } else {
      step.src = "assets/icons/미진행.png";
    }
  });
}
// -----질문 출력-----
function renderQuestion() {
  const q = questions[current];

  document.querySelector(".question-title").innerText = q.title;

  const list = document.querySelector(".choice-list");
  list.innerHTML = "";

  q.options.forEach((option) => {
    list.innerHTML += `
    <label class="choice-item"> 
       <input type="radio" name=${q.name} value=${option} /> 
       <span>${option}</span> 
    </label>`;
  });

  updateStepBar();
  updateButtons();
  bindChoiceEvent();
}
// -----선택 감지 함수-----
function bindChoiceEvent() {
  const radios = document.querySelectorAll(`input[type=radio]`);

  radios.forEach((radio) => {
    radio.addEventListener("change", () => {
      const q = questions[current];

      // 선택값 저장
      answers[q.name] = radio.value;
      // 마지막 질문이면 결과 이동
      if (current === questions.length - 1) {
        setTimeout(() => {
          alert("결과를 보시겠어요?");
          // window.location.href = "result.html";
        }, 300);
        return;
      }

      // 다음질문 자동으로 이동
      setTimeout(() => {
        current++;
        renderQuestion();
      }, 300);
    });
  });
}

// -----버튼 상태-----
function updateButtons() {
  prevBtn.style.visibility = current === 0 ? "hidden" : "visible";
}
// -----이전 버튼-----
prevBtn.addEventListener("click", () => {
  if (current > 0) {
    current--;
    renderQuestion();
  }
});

renderQuestion();
