/* ============================================================
   PORTFOLIO V2.0 — MAIN JAVASCRIPT
   Chandra Shekhar | DevOps & Cloud Engineer
   ============================================================ */

"use strict";

/* ── Loading Screen ─────────────────────────────────────────── */
window.addEventListener("load", () => {
  setTimeout(() => {
    const loader = document.getElementById("loading-screen");
    if (loader) {
      loader.classList.add("hidden");
      // Kick off entrance animations after loader hides
      triggerHeroAnimations();
    }
  }, 1600);
});

/* ── Scroll Progress Bar ────────────────────────────────────── */
const progressBar = document.getElementById("scroll-progress");

function updateScrollProgress() {
  if (!progressBar) return;
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  progressBar.style.width = pct + "%";
}

/* ── Navbar: Scroll + Active Link ────────────────────────────── */
const navbar  = document.querySelector(".navbar");
const navLinks = document.querySelectorAll(".nav-links li a, .mobile-menu a");
const sections = document.querySelectorAll("section[id]");

function updateNavbar() {
  // Transparency
  if (window.scrollY > 40) {
    navbar && navbar.classList.add("scrolled");
  } else {
    navbar && navbar.classList.remove("scrolled");
  }

  // Active section highlight
  let current = "";
  sections.forEach(sec => {
    const top    = sec.offsetTop - 100;
    const height = sec.offsetHeight;
    if (window.scrollY >= top && window.scrollY < top + height) {
      current = sec.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });
}

/* ── Back To Top ────────────────────────────────────────────── */
const backToTop = document.getElementById("back-to-top");

function updateBackToTop() {
  if (!backToTop) return;
  if (window.scrollY > 400) {
    backToTop.classList.add("visible");
  } else {
    backToTop.classList.remove("visible");
  }
}

backToTop && backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

/* ── Throttled Scroll Handler ───────────────────────────────── */
let ticking = false;

window.addEventListener("scroll", () => {
  if (!ticking) {
    requestAnimationFrame(() => {
      updateScrollProgress();
      updateNavbar();
      updateBackToTop();
      revealOnScroll();
      ticking = false;
    });
    ticking = true;
  }
});

// Run once on load
updateNavbar();
updateBackToTop();

/* ── Reveal on Scroll ───────────────────────────────────────── */
const revealElements = document.querySelectorAll(".reveal");

function revealOnScroll() {
  revealElements.forEach(el => {
    const rect   = el.getBoundingClientRect();
    const inView = rect.top < window.innerHeight - 60;
    if (inView) el.classList.add("visible");
  });
}

// Run once on page load too
revealOnScroll();

/* ── Stagger delay utility ──────────────────────────────────── */
document.querySelectorAll(".stagger").forEach((parent) => {
  const children = parent.querySelectorAll(".reveal");
  children.forEach((child, i) => {
    child.style.transitionDelay = (i * 0.08) + "s";
  });
});

/* ── Typing Animation ───────────────────────────────────────── */
const typedEl   = document.querySelector(".typed-text");
const phrases   = ["DevOps Engineer", "Cloud Enthusiast", "Automation Builder", "Infrastructure Architect"];
let phraseIdx   = 0;
let charIdx     = 0;
let isDeleting  = false;
let typingTimer = null;

function typeWriter() {
  if (!typedEl) return;

  const currentPhrase = phrases[phraseIdx];
  const speed         = isDeleting ? 60 : 110;

  if (!isDeleting) {
    typedEl.textContent = currentPhrase.slice(0, charIdx + 1);
    charIdx++;
    if (charIdx === currentPhrase.length) {
      isDeleting  = true;
      typingTimer = setTimeout(typeWriter, 1800);
      return;
    }
  } else {
    typedEl.textContent = currentPhrase.slice(0, charIdx - 1);
    charIdx--;
    if (charIdx === 0) {
      isDeleting = false;
      phraseIdx  = (phraseIdx + 1) % phrases.length;
    }
  }

  typingTimer = setTimeout(typeWriter, speed);
}

// Start typing after loader
setTimeout(typeWriter, 1700);

/* ── Hero Entrance Animations ───────────────────────────────── */
function triggerHeroAnimations() {
  const heroItems = document.querySelectorAll(".hero-anim");
  heroItems.forEach((el, i) => {
    setTimeout(() => {
      el.style.opacity    = "1";
      el.style.transform  = "translateY(0)";
    }, i * 120);
  });
}

/* ── Dark / Light Mode Toggle ───────────────────────────────── */
const themeToggle = document.getElementById("theme-toggle");
const themeIcon   = document.getElementById("theme-icon");

function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  if (themeIcon) {
    themeIcon.className = theme === "light" ? "fas fa-moon" : "fas fa-sun";
  }
  localStorage.setItem("portfolio-theme", theme);
}

// Load saved theme
const savedTheme = localStorage.getItem("portfolio-theme") || "dark";
applyTheme(savedTheme);

themeToggle && themeToggle.addEventListener("click", () => {
  const current = document.documentElement.getAttribute("data-theme");
  applyTheme(current === "dark" ? "light" : "dark");
});

/* ── Mobile Menu ─────────────────────────────────────────────── */
const hamburger     = document.getElementById("hamburger");
const mobileMenu    = document.getElementById("mobile-menu");
const mobileOverlay = document.getElementById("mobile-overlay");

function openMenu() {
  mobileMenu    && mobileMenu.classList.add("open");
  mobileOverlay && mobileOverlay.classList.add("show");
  document.body.style.overflow = "hidden";
}

function closeMenu() {
  mobileMenu    && mobileMenu.classList.remove("open");
  mobileOverlay && mobileOverlay.classList.remove("show");
  document.body.style.overflow = "";
}

hamburger     && hamburger.addEventListener("click", openMenu);
mobileOverlay && mobileOverlay.addEventListener("click", closeMenu);

// Close mobile menu on nav link click
document.querySelectorAll(".mobile-menu a").forEach(link => {
  link.addEventListener("click", closeMenu);
});

/* ── Hamburger animation ─────────────────────────────────────── */
hamburger && hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
});

/* ── Project Filter Buttons ─────────────────────────────────── */
const filterBtns  = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    filterBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.getAttribute("data-filter");

    projectCards.forEach(card => {
      const show = filter === "all" || card.dataset.category === filter;
      card.style.display = show ? "flex" : "none";

      if (show) {
        // Re-trigger reveal
        card.style.opacity   = "0";
        card.style.transform = "translateY(20px)";
        setTimeout(() => {
          card.style.opacity   = "1";
          card.style.transform = "translateY(0)";
        }, 30);
      }
    });
  });
});

/* ── Contact Form ────────────────────────────────────────────── */
const contactForm = document.getElementById("contact-form");
const toast       = document.getElementById("toast");

function showToast(msg, success = true) {
  if (!toast) return;
  toast.textContent = msg;
  toast.style.borderColor = success ? "var(--accent)" : "#ef4444";
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 3500);
}

contactForm && contactForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name    = contactForm.querySelector("#c-name").value.trim();
  const email   = contactForm.querySelector("#c-email").value.trim();
  const message = contactForm.querySelector("#c-message").value.trim();

  if (!name || !email || !message) {
    showToast("⚠️  Please fill in all fields.", false);
    return;
  }

  if (!/\S+@\S+\.\S+/.test(email)) {
    showToast("⚠️  Please enter a valid email.", false);
    return;
  }

  // Simulate submission
  const btn = contactForm.querySelector(".btn-submit");
  btn.textContent = "Sending…";
  btn.disabled = true;

  setTimeout(() => {
    showToast("✅  Message sent! I'll get back to you soon.");
    contactForm.reset();
    btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
    btn.disabled  = false;
  }, 1200);
});

/* ── Smooth Scroll for all anchor links ──────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", (e) => {
    const target = document.querySelector(anchor.getAttribute("href"));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

/* ── Skill card subtle parallax on mouse move ────────────────── */
document.querySelectorAll(".skill-category, .project-card, .achievement-card").forEach(card => {
  card.addEventListener("mousemove", (e) => {
    const rect  = card.getBoundingClientRect();
    const x     = (e.clientX - rect.left) / rect.width  - 0.5;
    const y     = (e.clientY - rect.top)  / rect.height - 0.5;
    card.style.transform = `translateY(-6px) rotateX(${y * 4}deg) rotateY(${x * 4}deg)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
    card.style.transition = "transform 0.5s ease";
  });

  card.addEventListener("mouseenter", () => {
    card.style.transition = "transform 0.1s ease";
  });
});
