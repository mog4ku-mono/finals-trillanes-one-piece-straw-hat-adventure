// -----------------------------
// Form floating-label interaction
// - adds/removes .active on .input-group when user focuses/has content
// -----------------------------
document.addEventListener("DOMContentLoaded", () => {
  // find all inputs/textareas inside the signup form
  const groups = document.querySelectorAll(".signup-form .input-group");

  // If you used the HTML above, each .input-group's <label> contains the input/textarea.
  groups.forEach((group) => {
    const input = group.querySelector("input, textarea");
    if (!input) return;

    // init state if already has value
    if (input.value.trim()) group.classList.add("active");

    input.addEventListener("focus", () => {
      group.classList.add("active");
    });

    input.addEventListener("blur", () => {
      if (!input.value.trim()) group.classList.remove("active");
    });

    // optional: keep label active if user types (handles paste)
    input.addEventListener("input", () => {
      if (input.value.trim()) group.classList.add("active");
    });
  });
});

// ===========================
// IMAGE FADE-IN ANIMATION ON LOAD
// ===========================
document.addEventListener("DOMContentLoaded", () => {
  const scrollItems = document.querySelectorAll(".scroll-item");

  scrollItems.forEach((item, index) => {
    const img = item.querySelector("img");
    const overlay = item.querySelector(".overlay");

    // Staggered delay so they don't all fade at once
    const delay = index * 120; // 150ms between each

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

// ===========================
// ONE PIECE-THEMED SUCCESS PROMPT ON SUBMIT
// ===========================
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".signup-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Create prompt element
    const prompt = document.createElement("div");
    prompt.className = "op-prompt";
    prompt.innerHTML = `
      <img src="assets/img/straw-hat-logo.png" alt="Straw Hat Logo" class="op-logo">
      <span class="msg">Message sent! The Straw Hats have received your letter!</span>
    `;

    document.body.appendChild(prompt);

    // Trigger animation
    requestAnimationFrame(() => prompt.classList.add("show"));

    // Remove after a delay
    setTimeout(() => {
      prompt.classList.remove("show");
      setTimeout(() => prompt.remove(), 800);
    }, 4000);
  });
});
