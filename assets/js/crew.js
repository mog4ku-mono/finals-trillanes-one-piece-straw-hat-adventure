// assets/js/crew.js
document.addEventListener("DOMContentLoaded", () => {
  console.log("Crew page loaded!");

  const crewMembers = [
    { name: "MONKEY D. LUFFY", desc: "Luffy is the lively captain whose dream of becoming Pirate King drives the crew forward. His Gum-Gum powers and fearless creativity make him unpredictable in battle, while his awakened tie to Joy Boy cements him as a symbol of hope.", gradient: "linear-gradient(90deg, #D61919 0%, #BC3B00 100%)", bgGif: "assets/img/gifs/crew-luffy-bg.gif", charImg: "assets/img/crew-luffy.png" },
    { name: "RORONOA ZORO", desc: "Zoro is the crew’s swordsman and Luffy’s steadfast right hand. With his three-sword style and indomitable will, he pushes toward his dream of becoming the world’s strongest swordsman. Gruff but loyal, Zoro’s sacrifices prove his devotion to protecting Luffy’s path and the crew’s future.", gradient: "linear-gradient(90deg, #64D619 0%, #539E21 100%)", bgGif: "assets/img/gifs/crew-zoro-bg.gif", charImg: "assets/img/crew-zoro.png" },
    { name: "CAT BURGLAR NAMI", desc: "Nami, the Straw Hats’ navigator, dreams of mapping the entire world while guiding the crew safely across dangerous seas. Known as the “Cat Burglar,” she pairs cunning and mastery of the Clima-Tact to weaponize the weather itself. Her journey from enslavement to freedom reflects the crew’s fight for dreams unchained.", gradient: "linear-gradient(90deg, #FF8C00 0%, #FBAF24 100%)", bgGif: "../img/gifs/crew-nami-bg.gif", charImg: "../img/crew-nami.png" },
    { name: "VINSMOKE SANJI", desc: "Sanji, the crew’s cook, dreams of finding the legendary All Blue. His fiery “Black Leg” kicks let him fight while keeping his hands free for cooking, blending strength with care. A chivalrous fighter, Sanji proves loyalty through both kindness and battle.", gradient: "linear-gradient(90deg, #FFD000 0%, #FED82C 100%)", bgGif: "assets/img/gifs/crew-sanji-bg.gif", charImg: "assets/img/crew-sanji.png" },
    { name: "GOD USSOP", desc: "Usopp is the sharpshooter, striving to be a brave warrior of the sea. Though often afraid, his creativity and sniper skill earn him the names “King of Snipers” and “God Usopp.” His growth shows that true courage is standing tall for friends even through fear.", gradient: "linear-gradient(90deg, #403319 0%, #806E1F 100%)", bgGif: "assets/img/gifs/crew-ussop-bg.gif", charImg: "assets/img/crew-ussop.png" },
    { name: "TONY TONY CHOPPER", desc: "Chopper is the doctor of the crew, a reindeer who gained human traits after eating the Human-Human Fruit. Using medicine and Rumble Ball transformations, he fights to cure any disease and protect his friends. Though often mistaken as a pet, Chopper is beloved family.", gradient: "linear-gradient(90deg, #F825A7 0%, #FE60A4 100%)", bgGif: "assets/img/gifs/crew-chopper-bg.gif", charImg: "assets/img/crew-chopper all forms.png" },
    { name: "NICO ROBIN", desc: "Robin is the archaeologist, able to read Poneglyphs and seeking the true history hidden in the Rio Poneglyph. Her Hana-Hana Fruit powers give her deadly versatility in battle. Once isolated and feared, she found belonging with the Straw Hats.", gradient: "linear-gradient(90deg, #E532FC 0%, #D80AEA 100%)", bgGif: "assets/img/gifs/crew-robin-bg.gif", charImg: "assets/img/crew-robin.png" },
    { name: "SHIPWRIGHT FRANKY", desc: "Franky, the shipwright, built the Thousand Sunny and dreams of sailing it to the end of the seas. A cyborg packed with weapons, he balances eccentric flair with explosive power. Beneath the bravado, his pride in the Sunny reflects loyalty to his crew.", gradient: "linear-gradient(90deg, #2556F8 0%, #5744FF 100%)", bgGif: "assets/img/gifs/crew-franky-bg.gif", charImg: "assets/img/crew-franky.png" },
    { name: "BROOK", desc: "Brook, the musician, is a living skeleton brought back by the Revive-Revive Fruit. His music uplifts allies and empowers his swordsmanship, while his dream is to reunite with Laboon, the whale he promised. Despite his humor, Brook carries resilience born of loss.", gradient: "linear-gradient(90deg, #78787A 0%, #5f5e67 100%)", bgGif: "assets/img/gifs/crew-brook-bg.gif", charImg: "assets/img/crew-brook.png" },
    { name: "KNIGHT OF SEA JINBE", desc: "Jinbe is the Straw Hats’ helmsman, master of Fish-Man Karate, and former Warlord. Calm and wise, he guides the Sunny through perilous seas while championing unity between humans and fish-men. As the “Knight of the Sea,” he brings honor, strength, and loyalty.", gradient: "linear-gradient(90deg, #82FFFB 0%, #32DDD8 100%)", bgGif: "assets/img/gifs/crew-jimbei-bg.gif", charImg: "assets/img/crew-jimbei.png" }
    
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


  const placeholderLinks = [
    "https://www.instagram.com/onepiece_staff/",
    "https://twitter.com/OnePieceAnime",
    "https://page.line.me/750skxga",
    "https://www.youtube.com/channel/UCdAHaWcKdpbT5XkN2Er6BUQ"

  ];

  const socialWrappers = [];
  socialImgs.forEach((imgEl, index) => {
    const wrapper = document.createElement("a");
    wrapper.className = "social-wrap";
    wrapper.href = placeholderLinks[index] || "#";
    wrapper.target = "_blank";
    wrapper.rel = "noopener noreferrer";

    const w = imgEl.width || 22;
    const h = imgEl.height || 22;
    wrapper.style.display = "inline-block";
    wrapper.style.width = w + "px";
    wrapper.style.height = h + "px";
    wrapper.style.verticalAlign = "middle";
    wrapper.style.transition = "background 400ms ease, opacity 300ms ease";
    const src = imgEl.getAttribute("src");
    wrapper.style.webkitMaskImage = `url(${src})`;
    wrapper.style.maskImage = `url(${src})`;
    wrapper.style.webkitMaskRepeat = "no-repeat";
    wrapper.style.maskRepeat = "no-repeat";
    wrapper.style.webkitMaskSize = "contain";
    wrapper.style.maskSize = "contain";
    wrapper.style.webkitMaskPosition = "center";
    wrapper.style.maskPosition = "center";

    imgEl.style.display = "none";
    imgEl.parentNode.insertBefore(wrapper, imgEl);
    socialWrappers.push(wrapper);
  });

  // Helper: get first hex from gradient
  function firstHexFromGradient(gradient) {
    if (!gradient) return "#ffffff";
    const match = gradient.match(/#([0-9a-fA-F]{6})/);
    return match ? `#${match[1]}` : "#ffffff";
  }

  // === Animation constants + helpers ===
  const ANIM_TEXT_OUT = 380;
  const ANIM_FADE = 450;
  const ANIM_CHAR = 600;

  function clearAnimClasses() {
    [titleEl, colorRhombus].forEach(el => el.classList.remove("fade-in", "fade-out"));
    socialWrappers.forEach(w => w.classList.remove("fade-in", "fade-out"));
    nameEl.classList.remove("slide-up", "slide-down", "slide-out-up", "slide-out-down");
    descEl.classList.remove("slide-up", "slide-down", "slide-out-up", "slide-out-down");
    charImg.classList.remove("character-exit-right", "character-enter-left", "character-exit-left", "character-enter-right");
  }

  // === Animated updateSlide ===
  function updateSlide(direction = "right") {
    const member = crewMembers[currentIndex];

    clearAnimClasses();

    // fade out title/rhombus/socials
    titleEl.classList.add("fade-out");
    colorRhombus.classList.add("fade-out");
    socialWrappers.forEach(w => w.classList.add("fade-out"));

    // slide out text + character
    if (direction === "right") {
      nameEl.classList.add("slide-out-up");
      descEl.classList.add("slide-out-up");
      charImg.classList.add("character-exit-right");
    } else {
      nameEl.classList.add("slide-out-down");
      descEl.classList.add("slide-out-down");
      charImg.classList.add("character-exit-left");
    }

    const WAIT = Math.max(ANIM_TEXT_OUT, ANIM_FADE, ANIM_CHAR);
    setTimeout(() => {
      clearAnimClasses();

      // update content
      nameEl.textContent = member.name;
      descEl.textContent = member.desc;
      charImg.src = member.charImg;
      bgImg.src = member.bgGif;

      // gradients
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

      // rhombus
      const firstColor = firstHexFromGradient(member.gradient);
      colorRhombus.style.background = `
        linear-gradient(
          to left,
          rgba(0,0,0,0.25) 0%,
          rgba(0,0,0,0.15) 8%,
          rgba(0,0,0,0.05) 18%,
          ${firstColor} 45%
        )
      `;

      // socials
      socialWrappers.forEach(w => w.style.background = member.gradient);

      // fade-in new visuals
      titleEl.classList.add("fade-in");
      colorRhombus.classList.add("fade-in");
      socialWrappers.forEach(w => w.classList.add("fade-in"));

      // enter direction
      if (direction === "right") {
        nameEl.classList.add("slide-up");
        descEl.classList.add("slide-up");
        charImg.classList.add("character-enter-left");
      } else {
        nameEl.classList.add("slide-down");
        descEl.classList.add("slide-down");
        charImg.classList.add("character-enter-right");
      }

      // progress
      progressDots.forEach((d, i) => d.classList.toggle("active", i === currentIndex));
    }, WAIT);
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % crewMembers.length;
    updateSlide("right");
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + crewMembers.length) % crewMembers.length;
    updateSlide("left");
  }

  nextBtn.addEventListener("click", nextSlide);
  prevBtn.addEventListener("click", prevSlide);
  updateSlide();
});

