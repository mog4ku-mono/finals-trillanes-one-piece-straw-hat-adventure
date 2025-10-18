// assets/js/crew.js
document.addEventListener("DOMContentLoaded", () => {
  console.log("Crew page loaded!");

  const crewMembers = [
    { name: "MONKEY D. LUFFY", desc: "Luffy is the lively captain whose dream of becoming Pirate King drives the crew forward. His Gum-Gum powers and fearless creativity make him unpredictable in battle, while his awakened tie to Joy Boy cements him as a symbol of hope.", gradient: "linear-gradient(90deg, #D61919 0%, #BC3B00 100%)", bgGif: "assets/img/gifs/crew-luffy-bg.gif", charImg: "assets/img/crew-luffy.png" },
    { name: "RORONOA ZORO", desc: "Zoro is the crew’s swordsman and Luffy’s steadfast right hand. With his three-sword style and indomitable will, he pushes toward his dream of becoming the world’s strongest swordsman.", gradient: "linear-gradient(90deg, #64D619 0%, #539E21 100%)", bgGif: "assets/img/gifs/crew-zoro-bg.gif", charImg: "assets/img/crew-zoro.png" },
    { name: "CAT BURGLAR NAMI", desc: "Nami, the Straw Hats’ navigator, dreams of mapping the entire world while guiding the crew safely across dangerous seas.", gradient: "linear-gradient(90deg, #FF8C00 0%, #FBAF24 100%)", bgGif: "assets/img/gifs/crew-nami-bg.gif", charImg: "assets/img/crew-nami.png" },
    { name: "VINSMOKE SANJI", desc: "Sanji, the crew’s cook, dreams of finding the legendary All Blue. His fiery ‘Black Leg’ kicks blend strength with care and chivalry.", gradient: "linear-gradient(90deg, #FFD000 0%, #FED82C 100%)", bgGif: "assets/img/gifs/crew-sanji-bg.gif", charImg: "assets/img/crew-sanji.png" },
    { name: "GOD USSOP", desc: "Usopp is the sharpshooter, striving to be a brave warrior of the sea. His creativity and courage shine through fear.", gradient: "linear-gradient(90deg, #403319 0%, #806E1F 100%)", bgGif: "assets/img/gifs/crew-ussop-bg.gif", charImg: "assets/img/crew-ussop.png" },
    { name: "TONY TONY CHOPPER", desc: "Chopper is the doctor of the crew — a reindeer who gained human traits after eating the Human-Human Fruit. His dream is to cure every disease.", gradient: "linear-gradient(90deg, #F825A7 0%, #FE60A4 100%)", bgGif: "assets/img/gifs/crew-chopper-bg.gif", charImg: "assets/img/crew-chopper all forms.png" },
    { name: "NICO ROBIN", desc: "Robin is the archaeologist, able to read Poneglyphs and seeking the true history hidden in the Rio Poneglyph.", gradient: "linear-gradient(90deg, #E532FC 0%, #D80AEA 100%)", bgGif: "assets/img/gifs/crew-robin-bg.gif", charImg: "assets/img/crew-robin.png" },
    { name: "SHIPWRIGHT FRANKY", desc: "Franky, the shipwright, built the Thousand Sunny and dreams of sailing it to the end of the seas. A cyborg with a heart of loyalty.", gradient: "linear-gradient(90deg, #2556F8 0%, #5744FF 100%)", bgGif: "assets/img/gifs/crew-franky-bg.gif", charImg: "assets/img/crew-franky.png" },
    { name: "BROOK", desc: "Brook, the musician, is a living skeleton revived by the Revive-Revive Fruit. His music uplifts allies and reminds the world of joy.", gradient: "linear-gradient(90deg, #78787A 0%, #5f5e67 100%)", bgGif: "assets/img/gifs/crew-brook-bg.gif", charImg: "assets/img/crew-brook.png" },
    { name: "KNIGHT OF SEA JINBE", desc: "Jinbe, the helmsman and master of Fish-Man Karate, represents unity and calm strength on the seas.", gradient: "linear-gradient(90deg, #82FFFB 0%, #32DDD8 100%)", bgGif: "assets/img/gifs/crew-jimbei-bg.gif", charImg: "assets/img/crew-jimbei.png" }
  ];

  // Elements
  const nameEl = document.querySelector(".crew-name");
  const descEl = document.querySelector(".crew-desc");
  const charImg = document.querySelector(".crew-character");
  const bgImg = document.querySelector(".crew-bg-img");
  const colorRhombus = document.querySelector(".crew-color-rhombus");
  const titleEl = document.querySelector(".crew-foreground-title");
  const socialImgs = Array.from(document.querySelectorAll(".crew-socials img"));
  const nextBtn = document.querySelector(".crew-next");
  const prevBtn = document.querySelector(".crew-prev");
  const progressContainer = document.querySelector(".crew-progress");
  let currentIndex = 0;

  // Create progress dots
  crewMembers.forEach((_, i) => {
    const dot = document.createElement("div");
    dot.classList.add("progress-bar");
    if (i === 0) dot.classList.add("active");
    progressContainer.appendChild(dot);
  });
  const progressDots = document.querySelectorAll(".progress-bar");

  // --- Replace social <img> with gradient-masked wrappers (if not already replaced) ---
  // We'll keep a parallel array of wrappers to update their backgrounds easily.
  const socialWrappers = [];

  socialImgs.forEach((imgEl, idx) => {
    // Create wrapper span
    const wrapper = document.createElement("span");
    wrapper.className = "social-wrap";
    // Copy size from img or use defaults
    const w = imgEl.width || 22;
    const h = imgEl.height || 22;
    wrapper.style.display = "inline-block";
    wrapper.style.width = w + "px";
    wrapper.style.height = h + "px";
    wrapper.style.verticalAlign = "middle";
    wrapper.style.transition = "background 400ms ease, opacity 300ms ease";
    // Use the img file as mask (works for PNG with transparency)
    const src = imgEl.getAttribute("src");
    // set mask properties
    wrapper.style.webkitMaskImage = `url(${src})`;
    wrapper.style.maskImage = `url(${src})`;
    wrapper.style.webkitMaskRepeat = "no-repeat";
    wrapper.style.maskRepeat = "no-repeat";
    wrapper.style.webkitMaskSize = "contain";
    wrapper.style.maskSize = "contain";
    wrapper.style.webkitMaskPosition = "center";
    wrapper.style.maskPosition = "center";

    // If image uses whitespace background and not transparent, user must provide transparent PNGs.
    // Insert wrapper and hide original img
    imgEl.style.display = "none";
    imgEl.parentNode.insertBefore(wrapper, imgEl);
    socialWrappers.push(wrapper);
  });

  // Helper to extract first hex color from gradient string
  function firstHexFromGradient(gradient) {
    if (!gradient) return "#ffffff";
    const match = gradient.match(/#([0-9a-fA-F]{6})/);
    return match ? `#${match[1]}` : "#ffffff";
  }

  // Update slide: content + color changes
  function updateSlide(direction = "right") {
    const member = crewMembers[currentIndex];

    // set text content immediately (name/desc)
    nameEl.textContent = member.name;
    descEl.textContent = member.desc;

    // set character and bg src
    charImg.src = member.charImg;
    bgImg.src = member.bgGif;

    // apply gradient to ONE PIECE title + crew name (text gradient via CSS)
    titleEl.style.background = member.gradient;
    titleEl.style.webkitBackgroundClip = "text";
    titleEl.style.backgroundClip = "text";
    titleEl.style.webkitTextFillColor = "transparent";
    titleEl.style.color = "transparent";

    nameEl.style.background = member.gradient;
    nameEl.style.webkitBackgroundClip = "text";
    nameEl.style.backgroundClip = "text";
    nameEl.style.webkitTextFillColor = "transparent";
    nameEl.style.color = "transparent";

    // Rhombus base color fade (use first hex color)
    const firstColor = firstHexFromGradient(member.gradient);
    colorRhombus.style.background = `
      linear-gradient(
        to left,
        rgba(0, 0, 0, 0.25) 0%,
        rgba(0, 0, 0, 0.15) 8%,
        rgba(0, 0, 0, 0.05) 18%,
        ${firstColor} 45%
      )
    `;

    // Update social wrappers to use gradient background (mask will shape it)
    socialWrappers.forEach(w => {
      // apply the same gradient
      w.style.background = member.gradient;
      // ensure wrapper is visible
      w.style.opacity = "1";
    });

    // progress indicator
    progressDots.forEach((d, i) => d.classList.toggle("active", i === currentIndex));
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % crewMembers.length;
    updateSlide("right");
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + crewMembers.length) % crewMembers.length;
    updateSlide("left");
  }

  // Attach listeners
  nextBtn.addEventListener("click", nextSlide);
  prevBtn.addEventListener("click", prevSlide);

  // init
  updateSlide();
});
