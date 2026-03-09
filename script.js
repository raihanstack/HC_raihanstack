"use strict";

document.addEventListener("DOMContentLoaded", () => {
    // GSAP Initial Animations
    if (typeof gsap !== "undefined") {
        const tl = gsap.timeline({
            defaults: {
                ease: "power4.out",
                duration: 1.2
            }
        });

        if (document.querySelector(".animate-slide-up-initial")) {
            tl.to(".animate-slide-up-initial", {
                opacity: 1,
                y: 0
            })
            .to(".animate-fadeIn", {
                opacity: 1,
                y: 0,
                stagger: 0.1
            }, "-=0.8");
        }
    }

    // Mobile Menu Toggle
    window.toggleMenu = function () {
        const menu = document.getElementById("mobileMenu");
        const icon = document.getElementById("menuIcon");
        if (menu && icon) {
            const isHidden = menu.classList.contains("hidden");
            if (isHidden) {
                menu.classList.remove("hidden");
                gsap.fromTo(menu, 
                    { opacity: 0, y: -20 }, 
                    { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }
                );
                icon.className = "fa-solid fa-xmark";
            } else {
                gsap.to(menu, {
                    opacity: 0,
                    y: -20,
                    duration: 0.3,
                    ease: "power2.in",
                    onComplete: () => menu.classList.add("hidden")
                });
                icon.className = "fa-solid fa-bars";
            }
        }
    };

    // Spotlight Effect for Cards
    const cards = document.querySelectorAll(".liquid-glass-card, .contact-card");
    cards.forEach((card) => {
        if (!card.querySelector(".spotlight")) {
            const spotlight = document.createElement("div");
            spotlight.className = "spotlight";
            card.appendChild(spotlight);
        }

        card.addEventListener("mousemove", (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty("--mouse-x", `${x}px`);
            card.style.setProperty("--mouse-y", `${y}px`);
        });
    });

    // Scroll Animations with Intersection Observer
    const animatedElements = document.querySelectorAll("section, #skills .relative.flex");
    if ("IntersectionObserver" in window && typeof gsap !== "undefined") {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    gsap.to(entry.target, {
                        opacity: 1,
                        y: 0,
                        duration: 1,
                        ease: "power3.out"
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        animatedElements.forEach((el) => {
            if (el.id !== "home") {
                gsap.set(el, { opacity: 0, y: 30 });
                observer.observe(el);
            }
        });
    }

    // Email Obfuscation
    const user = "raihan.invite";
    const domain = "gmail.com";
    const emailLink = document.getElementById("email-link");
    const emailText = document.getElementById("email-text");

    if (emailLink) emailLink.href = `mailto:${user}@${domain}`;
    if (emailText) emailText.innerText = `${user}@${domain}`;

    // Navbar Scroll Effect
    const navbar = document.getElementById("navbar");
    window.addEventListener("scroll", () => {
        if (!navbar) return;
        const scrolled = window.scrollY > 30;
        navbar.classList.toggle("backdrop-blur-xl", scrolled);
        navbar.classList.toggle("bg-white/10", scrolled);
        navbar.classList.toggle("shadow-2xl", scrolled);
        navbar.classList.toggle("scale-[0.98]", scrolled);
    }, { passive: true });

    // Active Nav Link on Scroll
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-link");

    window.addEventListener("scroll", () => {
        let current = "";
        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop - 150) {
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

    // Custom Cursor Performance Optimization
    const cursor = document.getElementById("custom-cursor");
    const blur = document.getElementById("cursor-blur");
    
    if (cursor && blur && window.innerWidth > 768) {
        let mouseX = 0, mouseY = 0;
        let cursorX = 0, cursorY = 0;
        let lastTimestamp = 0;

        window.addEventListener("mousemove", (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        function animateCursor(timestamp) {
            const dt = timestamp - lastTimestamp;
            lastTimestamp = timestamp;

            // Smooth interpolation
            cursorX += (mouseX - cursorX) * 0.2;
            cursorY += (mouseY - cursorY) * 0.2;

            cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`;
            blur.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0) translate(-50%, -50%)`;

            requestAnimationFrame(animateCursor);
        }
        requestAnimationFrame(animateCursor);
    }
});

// Star Canvas Effect
const canvas = document.getElementById("starCanvas");
if (canvas) {
    const ctx = canvas.getContext("2d");
    let stars = [];

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    class Star {
        constructor() {
            this.reset();
        }
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = -(Math.random() * canvas.height);
            this.length = Math.random() * 20 + 10;
            this.speed = Math.random() * 3 + 2;
            this.opacity = Math.random() * 0.5 + 0.1;
        }
        draw() {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255, 255, 255, ${this.opacity})`;
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

    function init() {
        resize();
        stars = Array.from({ length: 100 }, () => new Star());
        animate();
    }

    window.addEventListener("resize", resize);
    init();
}