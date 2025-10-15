document.addEventListener("DOMContentLoaded", () => {
  const navButtons = document.querySelectorAll(".nav-btn");

  navButtons.forEach(btn => {
    const text = btn.querySelector(".nav-text");
    const icon = btn.querySelector(".icon-circle");

    btn.addEventListener("mouseenter", () => {
      // fade-in gradient oval
      btn.classList.add("hover-active");

      // text color change
      text.style.color = "#FFEA00";

      // subtle pop animation
      icon.style.transform = "scale(1.1)";
      icon.style.transition = "transform 0.3s ease";
    });

    btn.addEventListener("mouseleave", () => {
      // fade-out gradient oval
      btn.classList.remove("hover-active");

      // revert text color
      text.style.color = "#FFF";

      // reset icon
      icon.style.transform = "scale(1)";
    });
  });
});
