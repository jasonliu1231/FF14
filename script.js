document.addEventListener("DOMContentLoaded", () => {
  const revealElements = document.querySelectorAll(".reveal");
  const menuBtn = document.getElementById("menuBtn");
  const navLinks = document.getElementById("navLinks");
  const particlesContainer = document.getElementById("particles");
  const musicToggle = document.getElementById("musicToggle");
  const musicPanel = document.getElementById("musicPanel");
  const musicClose = document.getElementById("musicClose");
  const musicFrame = document.getElementById("musicFrame");
  const countCards = document.querySelectorAll(".count-card");

  const youtubeEmbedUrl =
    "https://www.youtube.com/embed/PF6zvLrekZI?autoplay=1&rel=0";

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
          }
        });
      },
      { threshold: 0.12 }
    );

    revealElements.forEach((el) => revealObserver.observe(el));

    const counterObserver = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const counter = entry.target.querySelector(".counter");
          if (counter && !counter.dataset.animated) {
            counter.dataset.animated = "true";
            animateCounter(counter);
          }

          obs.unobserve(entry.target);
        });
      },
      { threshold: 0.35 }
    );

    countCards.forEach((card) => counterObserver.observe(card));
  } else {
    revealElements.forEach((el) => el.classList.add("show"));
    countCards.forEach((card) => {
      const counter = card.querySelector(".counter");
      if (counter) animateCounter(counter);
    });
  }

  if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", () => {
      navLinks.classList.toggle("show");
    });

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("show");
      });
    });
  }

  createParticles(particlesContainer, 32);

  function animateCounter(el) {
    const target = Number(el.dataset.target || 0);
    const duration = 1400;
    const startTime = performance.now();

    function update(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(target * eased).toLocaleString();

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = target.toLocaleString();
      }
    }

    requestAnimationFrame(update);
  }

  function createParticles(container, count = 32) {
    if (!container) return;

    container.innerHTML = "";

    for (let i = 0; i < count; i++) {
      const particle = document.createElement("span");
      particle.className = "magic-particle";

      const size = Math.random() * 3 + 1.5;
      const left = Math.random() * 100;
      const delay = Math.random() * 10;
      const duration = Math.random() * 14 + 10;

      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${left}%`;
      particle.style.bottom = `${Math.random() * 20 - 10}%`;
      particle.style.animationDuration = `${duration}s`;
      particle.style.animationDelay = `${delay}s`;

      container.appendChild(particle);
    }
  }

  function openMusicPanel() {
    if (!musicPanel || !musicFrame) return;

    musicPanel.classList.add("show");

    if (!musicFrame.src) {
      musicFrame.src = youtubeEmbedUrl;
    }
  }

  function closeMusicPanel() {
    if (!musicPanel || !musicFrame) return;

    musicPanel.classList.remove("show");
    musicFrame.src = "";
  }

  if (musicToggle && musicPanel && musicFrame) {
    musicToggle.addEventListener("click", () => {
      const isOpen = musicPanel.classList.contains("show");

      if (isOpen) {
        closeMusicPanel();
      } else {
        openMusicPanel();
      }
    });
  }

  if (musicClose) {
    musicClose.addEventListener("click", closeMusicPanel);
  }
});