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

 // 🔁 Make sure the MP4 loops after ending
  video.loop = true;  video.loop = true;

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


// ===========================
// FIXED REVEAL ANIMATION FOR CENTERPIECE (Elements visible again)
// ===========================
document.addEventListener("DOMContentLoaded", () => {
  const panelSection = document.querySelector(".adventure-panel-bg");
  const egghead = document.querySelector(".egghead-text");
  const strawhats = document.querySelector(".strawhats-bg");
  const luffy = document.querySelector(".luffy-gear5");
  const watchSection = document.querySelector(".watch-section");

  if (!panelSection || !egghead || !strawhats || !luffy) return;

  function revealCenterpiece() {
    const rect = panelSection.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.8) {
      // Reveal each element with a smooth stagger
      setTimeout(() => egghead.classList.add("reveal-active"), 0);
      setTimeout(() => strawhats.classList.add("reveal-active"), 200);
      setTimeout(() => luffy.classList.add("reveal-active"), 400);
      window.removeEventListener("scroll", revealCenterpiece);
    }
  }

  window.addEventListener("scroll", revealCenterpiece);
  revealCenterpiece();
});


// ===========================
// RIGHT-SIDE WATCH SECTION — REVEAL + INTERACTIVITY
// ===========================
document.addEventListener("DOMContentLoaded", () => {
  const watchGroup = document.querySelector(".watch-group");
  const watchSection = document.querySelector(".watch-section");
  const notifContainer = document.querySelector(".notif-container");

  // === 1️⃣ Reveal Animation on Scroll ===
  function revealWatchSection() {
    if (!watchGroup) return;
    const rect = watchGroup.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.8) {
      watchSection.classList.add("reveal-active");
      watchGroup.classList.add("reveal-active");
      window.removeEventListener("scroll", revealWatchSection);
    }
  }

  window.addEventListener("scroll", revealWatchSection);
  revealWatchSection(); // Check on load

  // === 2️⃣ Streaming Button Redirects ===
  const streamingLinks = {
    "crunchyroll-logo": "https://www.crunchyroll.com/series/GRMG8ZQZR/one-piece?srsltid=AfmBOorZlV0LR5F-ZzySopg3ry5x1iKdKbieuG2cc-Jvs7uTW_kUcMd-",
    "netflix-logo": "https://www.netflix.com/ph-en/title/80107103/",
    "hulu-logo": "https://www.hulu.com/series/one-piece-f5d4278b-6acb-4a63-a7a2-eab91de2611e",
    "funimation-logo": "https://x.com/funimation?lang=en",
    "disneyplus-logo": "https://www.apps.disneyplus.com/ph/onboarding?ref=%2Fen-jp%2Fbrowse%2Fentity-cdb8e29b-7fb0-4142-9966-3b1125246df0",
    "youtube-logo": "https://www.youtube.com/@OnePieceOfficial",
  };

  Object.entries(streamingLinks).forEach(([className, url]) => {
    const btn = document.querySelector(`.${className}`);
    if (btn) {
      btn.style.cursor = "pointer";
      btn.addEventListener("click", () => {
        window.open(url, "_blank"); // ✅ opens new tab
      });
    }
  });


  // === 3️⃣ Notification Click Prompt ===
    if (notifContainer) {
    notifContainer.addEventListener("click", () => {
        // Create a temporary floating message
        const popup = document.createElement("div");
        popup.textContent = "✅ Notifications enabled! You’ll get the latest One Piece arc updates.";
        popup.style.position = "fixed";
        popup.style.top = "40px";          // ⬆️ Moved from bottom to top
        popup.style.right = "40px";        // stays on the right
        popup.style.padding = "12px 18px";
        popup.style.background = "rgba(0,0,0,0.85)";
        popup.style.color = "#fff";
        popup.style.fontFamily = "Reem Kufi Fun, sans-serif";
        popup.style.fontSize = "14px";
        popup.style.borderRadius = "8px";
        popup.style.boxShadow = "0 4px 10px rgba(0,0,0,0.4)";
        popup.style.zIndex = "9999";
        popup.style.opacity = "0";
        popup.style.transition = "opacity 0.4s ease";

        document.body.appendChild(popup);

        // Fade in, wait, fade out, then remove
        requestAnimationFrame(() => {
        popup.style.opacity = "1";
        });
        setTimeout(() => {
        popup.style.opacity = "0";
        setTimeout(() => popup.remove(), 500);
        }, 2800);
    });
    }
});

document.addEventListener("DOMContentLoaded", () => {
  const divider = document.querySelector(".water-divider-arcs");
  if (!divider) {
    console.warn("[divider] .water-divider-arcs element not found. Check HTML class name or duplicate elements.");
    return;
  }

  // helper to add reveal safely (makes sure class isn't added twice)
  function revealDivider() {
    if (!divider.classList.contains("reveal")) {
      console.log("[divider] reveal triggered");
      divider.classList.add("reveal");
    }
  }

  // IntersectionObserver path (preferred)
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        console.log("[divider] IO entry:", entry.isIntersecting, "intersectionRatio:", entry.intersectionRatio);
        if (entry.isIntersecting) {
          revealDivider();
          obs.unobserve(entry.target); // only once
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });

    observer.observe(divider);

    // immediate fallback if already visible (dev mode / above the fold)
    const rect = divider.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      console.log("[divider] already in view on load — revealing immediately");
      revealDivider();
      observer.unobserve(divider);
    }
  } else {
    // fallback: on scroll / timeout
    console.warn("[divider] IntersectionObserver not supported — using scroll fallback");
    const onScroll = () => {
      const r = divider.getBoundingClientRect();
      if (r.top < window.innerHeight * 0.9) {
        revealDivider();
        window.removeEventListener("scroll", onScroll);
      }
    };
    window.addEventListener("scroll", onScroll);
    setTimeout(onScroll, 250);
  }
});

// ===========================
// ARC TEXT REVEAL ON SCROLL
// ===========================
document.addEventListener("DOMContentLoaded", () => {
  const arcs = document.querySelectorAll(".arc");

  // Observe when each arc scrolls into view
  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal"); // trigger text animation
          observer.unobserve(entry.target); // only once per arc
        }
      });
    },
    {
      threshold: 0.5, // reveal when 20% visible
    }
  );

  arcs.forEach(arc => observer.observe(arc));
});


// ===========================
// ARC JUMP WIDGET (custom) — append to adventure.js
// ===========================
document.addEventListener("DOMContentLoaded", () => {
  const widget = document.querySelector(".arc-jump-widget");
  const toggle = widget?.querySelector(".arc-jump-toggle");
  const list = widget?.querySelector(".arc-jump-list");
  const items = list ? Array.from(list.querySelectorAll("li")) : [];

  if (!widget || !toggle || !list) return;

  // show widget after a short delay (same pattern used elsewhere)
  setTimeout(() => widget.classList.add("show"), 650);

  // allow open on click/tap
  toggle.addEventListener("click", (e) => {
    const isOpen = widget.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
    // move focus into first item when opened
    if (isOpen && items.length) items[0].focus();
  });

  // keyboard: close on ESC, navigate with arrows and Enter
  widget.addEventListener("keydown", (e) => {
    const open = widget.classList.contains("open");
    if (!open) {
      if (e.key === "ArrowDown") {
        widget.classList.add("open");
        toggle.setAttribute("aria-expanded", "true");
        e.preventDefault();
      }
      return;
    }

    const active = document.activeElement;
    const idx = items.indexOf(active);
    if (e.key === "Escape") {
      widget.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.focus();
    } else if (e.key === "ArrowDown") {
      const next = items[Math.min(items.length - 1, Math.max(0, idx + 1))] || items[0];
      next.focus();
      e.preventDefault();
    } else if (e.key === "ArrowUp") {
      const prev = items[Math.max(0, (idx - 1))] || items[items.length - 1];
      prev.focus();
      e.preventDefault();
    } else if (e.key === "Enter" && active && active.matches("li")) {
      active.click();
      e.preventDefault();
    }
  });

  // click an item: smooth scroll
  items.forEach(li => {
    li.tabIndex = 0; // make focusable
    li.addEventListener("click", (e) => {
      const targetId = li.dataset.target;
      if (!targetId) return;
      const el = document.getElementById(targetId);
      if (!el) {
        console.warn("Arc not found:", targetId);
        return;
      }

      // close widget for clarity
      widget.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");

      // compute offset (adjust headerOffset if you have a fixed header)
      const headerOffset = 24;
      const rect = el.getBoundingClientRect();
      const targetY = window.pageYOffset + rect.top - headerOffset;

      window.scrollTo({
        top: targetY,
        behavior: "smooth"
      });

      // brief highlight so user sees landing spot
      el.classList.add("arc-jump-highlight");
      setTimeout(() => el.classList.remove("arc-jump-highlight"), 1200);
    });
  });

  // Close when clicking outside widget
  document.addEventListener("click", (e) => {
    if (!widget.contains(e.target) && widget.classList.contains("open")) {
      widget.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    }
  });

  // optional: show on hover (already handled by CSS .arc-jump-widget:hover opening the list)
});
