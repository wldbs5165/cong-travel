import { questions } from "../data/questions.js";

let current = 0;

// 버튼 요소 불러옴
const prevBtn = document.querySelector(".question-prev-btn");
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
