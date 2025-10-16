// ===========================
// GLOBAL NAVBAR HOVER ANIMATION
// (shared across all pages)
// ===========================
document.addEventListener("DOMContentLoaded", () => {
  const navButtons = document.querySelectorAll(".nav-btn");

  navButtons.forEach(btn => {
    const text = btn.querySelector(".nav-text");
    const icon = btn.querySelector(".icon-circle");

    // --- Hover In ---
    btn.addEventListener("mouseenter", () => {
      // Add gradient oval (via CSS class)
      btn.classList.add("hover-active");

      // Change text color on hover
      text.style.color = "#FFEA00";

      // Subtle icon pop animation
      icon.style.transform = "scale(1.1)";
      icon.style.transition = "transform 0.3s ease";
    });

    // --- Hover Out ---
    btn.addEventListener("mouseleave", () => {
      // Remove gradient oval
      btn.classList.remove("hover-active");

      // Reset text color
      text.style.color = "#FFF";

      // Reset icon scale
      icon.style.transform = "scale(1)";
    });
  });
}); 

// ===========================
// HEADER COLLAPSE ON SCROLL
// ===========================
let lastScrollTop = 0;
const header = document.querySelector(".site-header");

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

  if (currentScroll > lastScrollTop && currentScroll > 100) {
    // Scrolling down — collapse header
    header.classList.add("collapsed");
  } else if (currentScroll < lastScrollTop) {
    // Scrolling up — show header
    header.classList.remove("collapsed");
  }

  lastScrollTop = Math.max(currentScroll, 0);
});



// ===========================
// MULTI-LAYER SCROLL DUPLICATION FIX
// ===========================
// This ensures each .scroll-track repeats enough times
// so it seamlessly loops across all screen sizes
document.addEventListener("DOMContentLoaded", () => {
  const scrollTracks = document.querySelectorAll(".scroll-track");

  scrollTracks.forEach(track => {
    const screenWidth = window.innerWidth;

    // Duplicate the track's content until its width
    // exceeds 2x the viewport width (avoids black gaps)
    while (track.scrollWidth < screenWidth * 2.2) {
      track.innerHTML += track.innerHTML;
    }
  });

  // Optional: re-check on window resize (responsive behavior)
  window.addEventListener("resize", () => {
    scrollTracks.forEach(track => {
      // Only run if the track somehow became shorter than needed
      if (track.scrollWidth < window.innerWidth * 2.2) {
        track.innerHTML += track.innerHTML;
      }
    });
  });
});

// ===========================
// SCROLL CONTROL WIDGET (Morph Version)
// ===========================
document.addEventListener("DOMContentLoaded", () => {
  const scrollControl = document.querySelector(".scroll-control");
  const iconPath = scrollControl?.querySelector("path");
  let isPaused = false;

  // Pause and play path shapes
  const playPath = "M8 5 L19 12 L8 19 Z";
  const pausePath = "M6 4 H10 V20 H6 Z M14 4 H18 V20 H14 Z";

  // Fade-in effect
  setTimeout(() => {
    scrollControl?.classList.add("show");
  }, 800);

  // Click toggles scroll and morphs icon
  scrollControl?.addEventListener("click", () => {
    const scrollTracks = document.querySelectorAll(".scroll-layer .scroll-track");
    isPaused = !isPaused;

    // Control animation state
    scrollTracks.forEach(track => {
      track.style.animationPlayState = isPaused ? "paused" : "running";
    });

    // Animate SVG path morph
    const newPath = isPaused ? pausePath : playPath;
    animatePath(iconPath, newPath, 300);
  });

  // Smooth path morph function
  function animatePath(pathElement, newD, duration) {
    const oldD = pathElement.getAttribute("d");
    const start = performance.now();

    function frame(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 0.5 - Math.cos(progress * Math.PI) / 2; // easeInOut
      if (progress < 1) {
        requestAnimationFrame(frame);
      } else {
        pathElement.setAttribute("d", newD);
      }
    }
    requestAnimationFrame(frame);
  }
});

