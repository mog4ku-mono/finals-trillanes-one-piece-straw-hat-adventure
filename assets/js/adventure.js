// ===========================
// IMAGE FADE-IN ANIMATION ON LOAD
// ===========================
document.addEventListener("DOMContentLoaded", () => {
  const scrollItems = document.querySelectorAll(".scroll-item");

  scrollItems.forEach((item, index) => {
    const img = item.querySelector("img");
    const overlay = item.querySelector(".overlay");

    // Staggered delay so they don't all fade at once
    const delay = index * 150;

    img.addEventListener("load", () => {
      setTimeout(() => item.classList.add("loaded"), delay);
    });

    // Handle cached images
    if (img.complete) {
      setTimeout(() => item.classList.add("loaded"), delay);
    }
  });
});


// ===========================
// ADVENTURE PAGE — VIDEO PLAYER CONTROL SYSTEM
// Unified control for local MP4 video + floating widget
// ===========================
document.addEventListener("DOMContentLoaded", () => {
  // === ELEMENT REFERENCES ===
  const video = document.getElementById("adventureVideo");
  const playPauseBtn = document.getElementById("playPauseBtn");
  const volumeSlider = document.getElementById("volumeSlider");
  const iconPath = playPauseBtn?.querySelector("path");

  const widget = document.getElementById("videoWidget");
  const widgetPlayPause = document.getElementById("widgetPlayPause");
  const widgetVolume = document.getElementById("widgetVolume");

  if (!video || !playPauseBtn || !volumeSlider || !widget) return;

  // === SVG PATHS for morph animation ===
  const playPath = "M8 5 L19 12 L8 19 Z"; // ▶
  const pausePath = "M6 4 H10 V20 H6 Z M14 4 H18 V20 H14 Z"; // ⏸
  let hideTimeout = null;

  // ------------------------------------------------
  // Smooth SVG Morphing Function
  // ------------------------------------------------
  function morphPath(pathElement, newD, duration = 300) {
    if (!pathElement) return;
    const start = performance.now();

    function animate(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 0.5 - Math.cos(progress * Math.PI) / 2; // easeInOut
      if (progress < 1) requestAnimationFrame(animate);
      else pathElement.setAttribute("d", newD);
    }
    requestAnimationFrame(animate);
  }

  // ------------------------------------------------
  // Toggle Play / Pause
  // ------------------------------------------------
  function togglePlay() {
    if (video.paused) {
      video.muted = false;
      video.play();
      morphPath(iconPath, pausePath);
      widgetPlayPause.textContent = "⏸";
      showCenterButton(2000);
    } else {
      video.pause();
      morphPath(iconPath, playPath);
      widgetPlayPause.textContent = "▶";
      showCenterButton(0);
    }
  }

  // ------------------------------------------------
  // Show / Hide Center Play-Pause Button
  // ------------------------------------------------
  function showCenterButton(autoHideMs = 0) {
    clearTimeout(hideTimeout);
    playPauseBtn.classList.add("show");
    playPauseBtn.classList.remove("fade-out");

    if (!video.paused && autoHideMs > 0) {
      hideTimeout = setTimeout(() => {
        playPauseBtn.classList.add("fade-out");
        setTimeout(() => playPauseBtn.classList.remove("show"), 250);
      }, autoHideMs);
    }
  }

  // ------------------------------------------------
  // Volume Sync (between widget & inline slider)
  // ------------------------------------------------
  volumeSlider.addEventListener("input", (e) => {
    video.volume = parseFloat(e.target.value);
    widgetVolume.value = e.target.value;
  });

  widgetVolume.addEventListener("input", (e) => {
    video.volume = parseFloat(e.target.value);
    volumeSlider.value = e.target.value;
  });

  // ------------------------------------------------
  // EVENT BINDINGS
  // ------------------------------------------------
  playPauseBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    togglePlay();
  });

  video.addEventListener("click", togglePlay);
  widgetPlayPause.addEventListener("click", togglePlay);

  video.addEventListener("play", () => {
    morphPath(iconPath, pausePath);
    widgetPlayPause.textContent = "⏸";
    showCenterButton(2000);
  });

  video.addEventListener("pause", () => {
    morphPath(iconPath, playPath);
    widgetPlayPause.textContent = "▶";
    showCenterButton(0);
  });

  video.addEventListener("ended", () => {
    morphPath(iconPath, playPath);
    widgetPlayPause.textContent = "▶";
    showCenterButton(0);
  });

  // ------------------------------------------------
  // SCROLL REVEAL ANIMATION
  // ------------------------------------------------
  const boxes = document.querySelectorAll(".video-box");
  function reveal() {
    boxes.forEach((box) => {
      const rect = box.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.9) box.classList.add("revealed");
    });
  }
  window.addEventListener("scroll", reveal);
  reveal();

  // ------------------------------------------------
  // FLOATING WIDGET APPEAR ANIMATION
  // ------------------------------------------------
  setTimeout(() => widget.classList.add("show"), 1000);

  // ------------------------------------------------
  // AUTO-PLAY ON PAGE LOAD
  // ------------------------------------------------
  // Attempt to play with sound; fallback to muted autoplay
  setTimeout(() => {
    video.muted = false;
    video.play()
      .then(() => {
        console.log("✅ Video autoplayed with sound");
        morphPath(iconPath, pausePath);
        widgetPlayPause.textContent = "⏸";
      })
      .catch(() => {
        console.warn("⚠️ Autoplay with sound blocked — retrying muted");
        video.muted = true;
        video.play()
          .then(() => {
            console.log("🔇 Video autoplayed (muted)");
            morphPath(iconPath, pausePath);
            widgetPlayPause.textContent = "⏸";
          })
          .catch(err => console.error("❌ Autoplay failed:", err));
      });
  }, 500); // short delay ensures DOM + media are ready
});
