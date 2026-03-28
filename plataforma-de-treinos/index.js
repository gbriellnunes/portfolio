const loginModal = document.querySelector("[data-login-modal]");
const openLoginButton = document.querySelector("[data-open-login]");
const closeLoginButtons = document.querySelectorAll("[data-close-login]");
const signupModal = document.querySelector("[data-signup-modal]");
const openSignupButton = document.querySelector("[data-open-signup]");
const closeSignupButtons = document.querySelectorAll("[data-close-signup]");
const signupForm = document.querySelector("[data-signup-form]");
const signupNameInput = document.querySelector("[data-signup-name]");
const plansModal = document.querySelector("[data-plans-modal]");
const openPlansButton = document.querySelector("[data-open-plans]");
const closePlansButtons = document.querySelectorAll("[data-close-plans]");
const statsSection = document.querySelector("[data-stats-section]");
const statNumbers = document.querySelectorAll(".stat-number");
const navbar = document.querySelector("[data-navbar]");
const revealElements = document.querySelectorAll(".reveal-on-scroll");
const sections = document.querySelectorAll("[data-section]");
const navLinks = document.querySelectorAll("[data-nav-link]");
const planCards = document.querySelectorAll("[data-plan-card]");

const toggleLoginModal = (isOpen) => {
  loginModal.hidden = !isOpen;
  document.body.classList.toggle("modal-open", isOpen);
};

const toggleSignupModal = (isOpen) => {
  signupModal.hidden = !isOpen;
  document.body.classList.toggle("modal-open", isOpen);
};

const togglePlansModal = (isOpen) => {
  plansModal.hidden = !isOpen;
  document.body.classList.toggle("modal-open", isOpen);
};

openLoginButton.addEventListener("click", () => toggleLoginModal(true));
openSignupButton.addEventListener("click", () => toggleSignupModal(true));
openPlansButton.addEventListener("click", () => togglePlansModal(true));

closeLoginButtons.forEach((button) => {
  button.addEventListener("click", () => toggleLoginModal(false));
});

closeSignupButtons.forEach((button) => {
  button.addEventListener("click", () => toggleSignupModal(false));
});

closePlansButtons.forEach((button) => {
  button.addEventListener("click", () => togglePlansModal(false));
});

signupForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const fullName = signupNameInput.value.trim();
  const firstName = fullName.split(/\s+/)[0];

  localStorage.setItem("plataformaDeTreinosFirstName", firstName || "");
  toggleSignupModal(false);
  window.open("treino.html", "_blank");
  signupForm.reset();
});

const animateValue = (element, target) => {
  const duration = 1400;
  const start = performance.now();

  const update = (currentTime) => {
    const progress = Math.min((currentTime - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    element.textContent = Math.floor(target * eased);

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      element.textContent = target;
    }
  };

  requestAnimationFrame(update);
};

const statsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      statNumbers.forEach((stat) => {
        animateValue(stat, Number(stat.dataset.target));
      });

      statsObserver.disconnect();
    });
  },
  { threshold: 0.45 }
);

if (statsSection) {
  statsObserver.observe(statsSection);
}

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.18 }
);

revealElements.forEach((element) => {
  if (!element.classList.contains("is-visible")) {
    revealObserver.observe(element);
  }
});

const updateNavbarState = () => {
  navbar.classList.toggle("is-scrolled", window.scrollY > 28);
};

updateNavbarState();
window.addEventListener("scroll", updateNavbarState, { passive: true });

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      const currentSection = entry.target.dataset.section;

      navLinks.forEach((link) => {
        link.classList.toggle("is-active", link.dataset.navLink === currentSection);
      });
    });
  },
  { rootMargin: "-35% 0px -45% 0px", threshold: 0.1 }
);

sections.forEach((section) => sectionObserver.observe(section));

planCards.forEach((card) => {
  card.addEventListener("click", () => {
    planCards.forEach((item) => item.classList.remove("is-selected"));
    card.classList.add("is-selected");
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !loginModal.hidden) {
    toggleLoginModal(false);
  }

  if (event.key === "Escape" && !signupModal.hidden) {
    toggleSignupModal(false);
  }

  if (event.key === "Escape" && !plansModal.hidden) {
    togglePlansModal(false);
  }
});
