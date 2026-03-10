const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach((el) => {
  observer.observe(el);
});

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

if (menuBtn && navLinks) {
  menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("show");
  });
}

const particlesContainer = document.getElementById("particles");

function createParticles(count = 32) {
  if (!particlesContainer) return;

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

    particlesContainer.appendChild(particle);
  }
}

createParticles();

const counters = document.querySelectorAll(".counter");

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

const counterObserver = new IntersectionObserver(
  (entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const counter = entry.target.querySelector(".counter");
        if (counter && !counter.dataset.animated) {
          counter.dataset.animated = "true";
          animateCounter(counter);
        }
        obs.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.35 }
);

document.querySelectorAll(".count-card").forEach((card) => {
  counterObserver.observe(card);
});
