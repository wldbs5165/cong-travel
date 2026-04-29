import { cardData } from "./../data/card.js";

// 카드 들어갈 영역 불러옴
const cardContainer = document.querySelector(".card-container");

// 현재 페이지 확인
const isBookmarkPage = window.location.pathname.includes("bookmark.html");

// -----카드 출력-----
function renderCards() {
  cardContainer.innerHTML = cardData
    .map(
      (item) => `<div class="card">

                <div class="card-thumbnail">
                  <img
                    src="${item.thumbnail}"
                    alt="${item.alt}"
                  />
                </div>
                <div class="card-name">
                  <img src="assets/icons/map-pin.png" alt="위치 아이콘" />
                  <h3 class="card-location">${item.location}</h3>
                </div>
                <span class="card-sub"
                  >""${item.sub}""</span
                >
                <div class="card-tag">
                  ${item.tags.map((tag) => `<span>@ ${tag}</span>`).join("")}
                </div>
                <div class="card-actions">
                  <button class="save-btn">
                    <img
                      src="${
                        isBookmarkPage
                          ? "assets/icons/bookmark-black-onclick.png"
                          : "assets/icons/bookmark.png"
                      }"
                      alt="저장하기 아이콘"
                    />
                    <span class="caption"> ${isBookmarkPage ? "" : "저장하기"}</span>
                  </button>
                  <a href="#" class="share-btn">
                    <img
                      src="assets/icons/external-link.png"
                      alt="공유하기 아이콘"
                    />
                    <span class="caption">${isBookmarkPage ? "" : "공유하기"}</span>
                  </a>
                </div>
              </div>`,
    )
    .join("");
}

renderCards();

document.addEventListener("click", function (e) {
  if (e.target.closest(".save-btn, .share-btn")) return;

  const card = e.target.closest(".card");

  if (card) {
    this.location.href = "detail.html";
  }
});
