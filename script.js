"use strict";

document.addEventListener("DOMContentLoaded", () => {

  /* ===============================
     1️⃣ GSAP Entrance Animation
  =============================== */

  if (typeof gsap !== "undefined") {
    const entranceTl = gsap.timeline({
      defaults: { ease: "power4.out", duration: 1.2 }
    });

    if (document.querySelector(".animate-slide-up-initial")) {
      entranceTl
        .to(".animate-slide-up-initial", { opacity: 1, y: 0 })
        .to(".animate-fadeIn", { opacity: 1, y: 0, stagger: 0.1 }, "-=0.8")
        .to(".animate-scale-up", { opacity: 1, scale: 1, duration: 1.5 }, "-=1");
    }
  }

  /* ===============================
     2️⃣ Mobile Menu Toggle
  =============================== */

  window.toggleMenu = function () {
    const menu = document.getElementById("mobileMenu");
    const icon = document.getElementById("menuIcon");

    if (!menu || !icon) return;

    menu.classList.toggle("hidden");

    icon.className = menu.classList.contains("hidden")
      ? "fa-solid fa-bars"
      : "fa-solid fa-xmark";
  };

  /* ===============================
     3️⃣ Interactive Card Spotlight
  =============================== */

  const interactiveCards = document.querySelectorAll(
    ".liquid-glass-card, .contact-card"
  );

  interactiveCards.forEach((card) => {
    if (!card.querySelector(".spotlight")) {
      const spotlight = document.createElement("div");
      spotlight.className = "spotlight";
      card.appendChild(spotlight);
    }

    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
      card.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
    });
  });

  /* ===============================
     4️⃣ Scroll Reveal Animation
  =============================== */

  const revealElements = document.querySelectorAll("section, #skills .relative.flex");

  if ("IntersectionObserver" in window && typeof gsap !== "undefined") {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        gsap.to(entry.target, {
          opacity: 1,
          x: 0,
          y: 0,
          duration: 1,
          ease: "back.out(1.2)"
        });

        observer.unobserve(entry.target);
      });
    }, { threshold: 0.15 });

    revealElements.forEach((el) => {
      if (el.id !== "home") {
        el.style.opacity = "0";
        gsap.set(el, { y: 40 });
        revealObserver.observe(el);
      }
    });
  }

  /* ===============================
     5️⃣ Email Protection
  =============================== */

  const user = "raihan.invite";
  const domain = "gmail.com";
  const mailLink = document.getElementById("email-link");
  const mailText = document.getElementById("email-text");

  if (mailLink) mailLink.href = `mailto:${user}@${domain}`;
  if (mailText) mailText.innerText = `${user}@${domain}`;

  /* ===============================
     6️⃣ Navbar Scroll Effect
  =============================== */

  const navbar = document.getElementById("navbar");

  window.addEventListener("scroll", () => {
    if (!navbar) return;

    const scrolled = window.scrollY > 30;

    navbar.classList.toggle("backdrop-blur-lg", scrolled);
    navbar.classList.toggle("bg-dark-950/80", scrolled);
    navbar.classList.toggle("shadow-2xl", scrolled);
    navbar.classList.toggle("scale-[0.97]", scrolled);
  }, { passive: true });

  /* ===============================
     7️⃣ Active Nav Highlight
  =============================== */

  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-link");

  window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });

});

/* ==================================
   8️⃣ Custom Cursor
================================== */

const cursor = document.getElementById("custom-cursor");
const blur = document.getElementById("cursor-blur");

if (cursor && blur) {
  window.addEventListener("mousemove", (e) => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
    blur.style.left = `${e.clientX}px`;
    blur.style.top = `${e.clientY}px`;
  });
}

/* ==================================
   9️⃣ Starfall Background Animation
================================== */

const canvas = document.getElementById("starCanvas");

if (canvas) {
  const ctx = canvas.getContext("2d");
  let stars = [];

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  class Star {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * -canvas.height;
      this.length = Math.random() * 25 + 10;
      this.speed = Math.random() * 4 + 2;
      this.opacity = Math.random() * 0.4 + 0.1;
    }

    draw() {
      ctx.beginPath();
      ctx.strokeStyle = `rgba(255,255,255,${this.opacity})`;
      ctx.lineWidth = 1;
      ctx.moveTo(this.x, this.y);
      ctx.lineTo(this.x, this.y + this.length);
      ctx.stroke();
    }

    update() {
      this.y += this.speed;
      if (this.y > canvas.height) this.reset();
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach((star) => {
      star.update();
      star.draw();
    });
    requestAnimationFrame(animate);
  }

  function initStars() {
    resizeCanvas();
    stars = Array.from({ length: 80 }, () => new Star());
    animate();
  }

  window.addEventListener("resize", resizeCanvas);
  initStars();
}