import { cardData } from "../data/card.js";
import { popularData } from "../data/popular.js";

const dataMap = {
  recent: cardData,
  popular: popularData,
};

document.querySelectorAll(".slider-container").forEach((container) => {
  const type = container.dataset.type;
  renderCards(container, dataMap[type]);
  enableSlider(container);
});

function renderCards(container, data) {
  container.innerHTML = data
    .map(
      (item) => `
      <a href="detail.html" class="card-link">
        <div class="card">
          <div class="card-thumbnail">
            <img src="${item.thumbnail}" alt="${item.alt}">
          </div>
  
          <div class="card-name">
            <img src="assets/icons/map-pin.png" alt="">
            <h3>${item.location}</h3>
          </div>
  
          <span class="card-sub">"${item.sub}"</span>
  
          <div class="card-tag">
            ${item.tags.map((tag) => `<span>@ ${tag}</span>`).join("")}
          </div>
  
          <div class="card-actions">
            <button class="save-btn">
              <img src="assets/icons/bookmark.png" alt="">
              <span class="caption">저장하기</span>
            </button>
  
            <a href="#" class="share-btn">
              <img src="assets/icons/external-link.png" alt="">
              <span class="caption">공유하기</span>
            </a>
          </div>
        </div>
      </a>
    `,
    )
    .join("");
}

function enableSlider(container) {
  const viewport = container.parentElement;

  let startX = 0;
  let current = 0;
  let prev = 0;
  let isDown = false;

  const getCardWidth = () => {
    const card = container.querySelector(".card");
    const gap = parseInt(getComputedStyle(container).gap || 0);
    return card.offsetWidth + gap;
  };

  function moveSlide() {
    container.style.transform = `translateX(${current}px)`;
  }

  function snap() {
    isDown = false;

    const cardWidth = getCardWidth();
    const maxIndex = container.children.length - 1;

    let index = Math.round(Math.abs(current) / cardWidth);
    index = Math.min(index, maxIndex);

    current = -(index * cardWidth);
    prev = current;

    container.style.transition = "transform 0.3s ease";
    moveSlide();
  }

  /* 마우스 */
  viewport.addEventListener("mousedown", (e) => {
    isDown = true;
    startX = e.pageX;
    container.style.transition = "none";
  });

  viewport.addEventListener("mousemove", (e) => {
    if (!isDown) return;

    const moved = e.pageX - startX;
    current = prev + moved;
    moveSlide();
  });

  viewport.addEventListener("mouseup", snap);
  viewport.addEventListener("mouseleave", () => isDown && snap());

  /* 터치 */
  viewport.addEventListener("touchstart", (e) => {
    isDown = true;
    startX = e.touches[0].clientX;
    container.style.transition = "none";
  });

  viewport.addEventListener("touchmove", (e) => {
    if (!isDown) return;

    const moved = e.touches[0].clientX - startX;
    current = prev + moved;
    moveSlide();
  });

  viewport.addEventListener("touchend", snap);
}
