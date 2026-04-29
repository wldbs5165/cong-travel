document.addEventListener("click", function (e) {
  const btn = e.target.closest(".save-btn");

  if (!btn) return;

  const icon = btn.querySelector("img");

  const isSaved = btn.classList.contains("active");

  btn.classList.toggle("active");

  if (btn.classList.contains("active")) {
    icon.src = "assets/icons/bookmark-black-onclick.png";
  } else {
    icon.src = "assets/icons/bookmark.png";
  }
});
