import { menuData } from "../data/card.js";

document.addEventListener("DOMContentLoaded", () => {
  const menuItems = document.querySelectorAll(".menu-header");
  const detailBox = document.querySelector(".menu-detail");

  function changeMenu(clickedItem) {
    menuItems.forEach((item) => {
      item.style.backgroundColor = "transparent";
      item.style.color = "var(--gray-300)";
    });

    clickedItem.style.backgroundColor = "var(--gray-50)";
    clickedItem.style.color = "var(--green-700)";

    const menuText = clickedItem.textContent.trim();

    detailBox.innerHTML = "";

    menuData[menuText].forEach((text, index) => {
      const span = document.createElement("span");

      if (index === 0) {
        span.classList.add("menu-detail-title");
      } else {
        span.classList.add("menu-detail-item");
      }

      span.textContent = text;
      detailBox.appendChild(span);
    });
  }

  menuItems.forEach((item) => {
    item.addEventListener("click", () => {
      changeMenu(item);
    });
  });

  changeMenu(menuItems[0]);
});
