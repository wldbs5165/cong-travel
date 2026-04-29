document.addEventListener("DOMContentLoaded", () => {
  const input = document.querySelector(".input-search");
  const deleteBtn = document.querySelector(".delete-btn");

  deleteBtn.addEventListener("click", () => {
    input.value = "";
    input.focus();
  });

  const deleteIcons = document.querySelectorAll(".search-tag img");

  deleteIcons.forEach((icon) => {
    icon.addEventListener("click", (e) => {
      const tag = e.target.closest(".search-tag");
      tag.remove();
    });
  });
});
