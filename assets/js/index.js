 




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