// ===========================
// FACTIONS SLIDER — FADE BG + ENTRY REVEAL
// ===========================

document.addEventListener("DOMContentLoaded", () => {
  console.log("Factions page loaded!");

  const slides = document.querySelectorAll(".faction-slide");
  const nextBtn = document.querySelector(".next");
  const prevBtn = document.querySelector(".prev");
  const indicators = document.querySelectorAll(".indicator");
  const subgroup = document.querySelector(".faction-subgroup");
  const jpText = document.querySelector(".faction-japanese");

  const factionTranslations = {
    pirates: "Kaizoku, 海賊",
    emperors: "Yonko, 四皇",
    crossguild: "Kurosu Girudo, クロスギルド",
    revolutionary: "Kakumeigun, 革命軍",
    marines: "Kaigun, 海軍",
    imu: "Gorosei to Imu-sama, 五老星とイム様",
  };

  let currentIndex = 0;
  let autoSlideInterval;
  let isAnimating = false;

  // === Animate title/desc and subgroup ===
  function animateContent(slide) {
    const title = slide.querySelector(".faction-title");
    const desc = slide.querySelector(".faction-desc");

    requestAnimationFrame(() => {
      if (title && desc) {
        title.classList.remove("reveal-title");
        desc.classList.remove("reveal-desc");
        void title.offsetWidth; // reflow before re-adding
        title.classList.add("reveal-title");
        desc.classList.add("reveal-desc");
      }

      subgroup.classList.remove("jp-reveal");
      void subgroup.offsetWidth;
      subgroup.classList.add("jp-reveal");
    });
  }

  // === Fade transition for background image ===
  function fadeBackground(slide) {
    const bg = slide.querySelector(".faction-bg img");
    if (!bg) return;
    bg.classList.remove("fade-bg");
    void bg.offsetWidth; // force reflow
    bg.classList.add("fade-bg");
  }

  // === Show slide ===
  function showSlide(index, instant = false) {
    if (isAnimating && !instant) return;
    isAnimating = true;

    slides.forEach((slide, i) => {
      if (i === index) {
        slide.classList.add("active");
        slide.style.opacity = "1";
        slide.style.transition = instant ? "none" : "opacity 1s ease-in-out";
        fadeBackground(slide);
      } else {
        slide.classList.remove("active");
        slide.style.opacity = "0";
        slide.style.transition = "none";
      }
    });

    indicators.forEach((dot, i) => {
      dot.classList.toggle("active", i === index);
    });

    const activeFaction = slides[index].classList[1];
    const newText = factionTranslations[activeFaction] || "";

    jpText.style.opacity = 0;
    setTimeout(() => {
      jpText.textContent = newText;
      jpText.style.opacity = 1;
      animateContent(slides[index]);
      setTimeout(() => {
        isAnimating = false;
      }, 1000);
    }, 150);
  }

  // === Controls ===
  function nextSlide() {
    if (isAnimating) return;
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
  }

  function prevSlide() {
    if (isAnimating) return;
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    showSlide(currentIndex);
  }

  nextBtn.addEventListener("click", () => {
    nextSlide();
  });

  prevBtn.addEventListener("click", () => {
    prevSlide();
  });

  // === Initial entry animation ===
  document.body.classList.add("fade-in-page");

  // === Initialize ===
  setTimeout(() => {
    showSlide(currentIndex, true);
    animateContent(slides[currentIndex]);
    fadeBackground(slides[currentIndex]);
  }, 300);
});

