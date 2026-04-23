import { cardData } from "../data/card.js";
import { popularData } from "../data/popular.js";

const dataMap = {
  recent: cardData,
  popular: popularData,
};

const containers = document.querySelectorAll(".card-container");

containers.forEach((container) => {
  const type = container.dataset.type;
  const data = dataMap[type];

  renderCards(container, data);
  enableSlider(container);
});

function renderCards(container, data) {
  container.innerHTML = data
    .map(
      (item) => `
      <div class="card">
        <div class="card-thumbnail">
          <img src="${item.thumbnail}" alt="${item.alt}" />
        </div>

        <div class="card-name">
          <img src="assets/icons/map-pin.png" alt="위치 아이콘" />
          <h3 class="card-location">${item.location}</h3>
        </div>

        <span class="card-sub">"${item.sub}"</span>

        <div class="card-tag">
          ${item.tags.map((tag) => `<span>@ ${tag}</span>`).join("")}
        </div>

        <div class="card-actions">
          <button class="save-btn">
            <img src="assets/icons/bookmark.png" alt="저장하기 아이콘" />
            <span class="caption">저장하기</span>
          </button>

          <a href="#" class="share-btn">
            <img src="assets/icons/external-link.png" alt="공유하기 아이콘" />
            <span class="caption">공유하기</span>
          </a>
        </div>
      </div>
    `,
    )
    .join("");
}

function enableSlider(container) {
  const viewport = container.parentElement;

  let isDown = false;
  let startX = 0;
  let currentTranslate = 0;
  let prevTranslate = 0;

  let cardWidth = getCardWidth(container);

  function getCardWidth(container) {
    const card = container.querySelector(".card");
    const style = window.getComputedStyle(container);
    const gap = parseInt(style.gap || 0);

    return card.offsetWidth + gap;
  }

  viewport.addEventListener("mousedown", (e) => {
    isDown = true;
    startX = e.pageX;
  });

  viewport.addEventListener("mousemove", (e) => {
    if (!isDown) return;

    const moveX = e.pageX - startX;
    currentTranslate = prevTranslate + moveX;

    container.style.transition = "none";
    container.style.transform = `translateX(${currentTranslate}px)`;
  });

  viewport.addEventListener("mouseup", snap);
  viewport.addEventListener("mouseleave", () => {
    if (isDown) snap();
  });

  // 터치
  viewport.addEventListener("touchstart", (e) => {
    isDown = true;
    startX = e.touches[0].clientX;
  });

  viewport.addEventListener("touchmove", (e) => {
    if (!isDown) return;

    const moveX = e.touches[0].clientX - startX;
    currentTranslate = prevTranslate + moveX;

    container.style.transform = `translateX(${currentTranslate}px)`;
  });

  viewport.addEventListener("touchend", snap);

  function snap() {
    isDown = false;

    const movedIndex = Math.round(-currentTranslate / cardWidth);
    const maxIndex = container.children.length - 1;

    const index = Math.max(0, Math.min(movedIndex, maxIndex));

    currentTranslate = -index * cardWidth;
    prevTranslate = currentTranslate;

    container.style.transition = "transform 0.3s ease";
    container.style.transform = `translateX(${currentTranslate}px)`;
  }
}
