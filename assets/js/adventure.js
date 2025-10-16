// ===========================
// IMAGE FADE-IN ANIMATION ON LOAD
// ===========================
document.addEventListener("DOMContentLoaded", () => {
  const scrollItems = document.querySelectorAll(".scroll-item");

  scrollItems.forEach((item, index) => {
    const img = item.querySelector("img");
    const overlay = item.querySelector(".overlay");

    // Staggered delay so they don't all fade at once
    const delay = index * 150; // 150ms between each

    // Once image is loaded
    img.addEventListener("load", () => {
      setTimeout(() => {
        item.classList.add("loaded");
      }, delay);
    });

    // In case it's already cached
    if (img.complete) {
      setTimeout(() => {
        item.classList.add("loaded");
      }, delay);
    }
  });
});
