"use strict";

/**
 * RaihanStack Portfolio Script
 * Professional, high-performance interactions and animations.
 */

document.addEventListener("DOMContentLoaded", () => {
    // 1. GSAP Initial Entrance Animations
    if (typeof gsap !== "undefined") {
        const tl = gsap.timeline({
            defaults: { ease: "power4.out", duration: 1.4 }
        });

        gsap.set(".animate-slide-up-initial, .animate-fadeIn", { opacity: 0, y: 40 });

        tl.to(".animate-slide-up-initial", { opacity: 1, y: 0, stagger: 0.15 })
          .to(".animate-fadeIn", { opacity: 1, y: 0, stagger: 0.1 }, "-=1");
    }

    // 2. Custom Cursor System with Hover States
    const cursor = document.getElementById("custom-cursor");
    const cursorBlur = document.getElementById("cursor-blur");
    
    if (cursor && cursorBlur && window.innerWidth > 768) {
        let mouseX = 0, mouseY = 0;
        let cursorX = 0, cursorY = 0;
        let blurX = 0, blurY = 0;

        window.addEventListener("mousemove", (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        const animateCursor = () => {
            // Smooth interpolation for cursor (faster)
            cursorX += (mouseX - cursorX) * 0.15;
            cursorY += (mouseY - cursorY) * 0.15;
            
            // Lagger interpolation for blur (more fluid)
            blurX += (mouseX - blurX) * 0.05;
            blurY += (mouseY - blurY) * 0.05;

            cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`;
            cursorBlur.style.transform = `translate3d(${blurX}px, ${blurY}px, 0) translate(-50%, -50%)`;

            requestAnimationFrame(animateCursor);
        };
        requestAnimationFrame(animateCursor);

        // Interaction States
        const interactiveElements = document.querySelectorAll('a, button, .liquid-glass-card, .social-icon');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => document.body.classList.add('cursor-active'));
            el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-active'));
        });
    }

    // 3. Mobile Menu Toggle Logic
    window.toggleMenu = function () {
        const menu = document.getElementById("mobileMenu");
        const icon = document.getElementById("menuIcon");
        if (!menu || !icon) return;

        const isHidden = menu.classList.contains("hidden");
        if (isHidden) {
            menu.classList.remove("hidden");
            gsap.fromTo(menu, 
                { opacity: 0, scale: 0.95, y: -10 }, 
                { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: "back.out(1.7)" }
            );
            icon.className = "fa-solid fa-xmark";
        } else {
            gsap.to(menu, {
                opacity: 0, scale: 0.95, y: -10, duration: 0.3, ease: "power2.in",
                onComplete: () => menu.classList.add("hidden")
            });
            icon.className = "fa-solid fa-bars";
        }
    };

    // 4. Spotlight Card Effect
    const cards = document.querySelectorAll(".liquid-glass-card, .contact-card");
    cards.forEach((card) => {
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

    // 5. Intersection Observer for Scroll Animations
    const animatedElements = document.querySelectorAll("section:not(#home), .contact-card");
    if ("IntersectionObserver" in window && typeof gsap !== "undefined") {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    gsap.to(entry.target, {
                        opacity: 1, y: 0, duration: 0.8, ease: "power2.out", clearProps: "all"
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });

        animatedElements.forEach((el) => {
            gsap.set(el, { opacity: 0, y: 30 });
            observer.observe(el);
        });
    }

    // 6. Navbar Scroll States
    const navbar = document.getElementById("navbar");
    if (navbar) {
        window.addEventListener("scroll", () => {
            const scrolled = window.scrollY > 50;
            navbar.classList.toggle("backdrop-blur-2xl", scrolled);
            navbar.classList.toggle("bg-white/5", scrolled);
            navbar.classList.toggle("shadow-2xl", scrolled);
            navbar.style.transform = `translateX(-50%) translateY(${scrolled ? '10px' : '0'}) scale(${scrolled ? 0.98 : 1})`;
        }, { passive: true });
    }

    // 7. Active Nav Link Tracking
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-link");

    window.addEventListener("scroll", () => {
        let current = "";
        sections.forEach((section) => {
            if (window.scrollY >= section.offsetTop - 200) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach((link) => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${current}`) link.classList.add("active");
        });
    });

    // 8. Contact Form Email Obfuscation
    const emailLink = document.getElementById("email-link");
    const emailText = document.getElementById("email-text");
    if (emailLink && emailText) {
        const u = "raihan.invite", d = "gmail.com";
        emailLink.href = `mailto:${u}@${d}`;
        emailText.innerText = `${u}@${d}`;
    }

    // 9. Hero Terminal Logic
    initTerminal();
});

/**
 * Hero Terminal Typing Animation
 * Simulates a Django server/Backend environment
 */
function initTerminal() {
    const terminal = document.getElementById('terminal-content');
    if (!terminal) return;

    const lines = [
        { text: '>>> from django.core import management', color: 'text-blue-400' },
        { text: '>>> management.call_command("check")', color: 'text-blue-400' },
        { text: 'System check identified no issues (0 silenced).', color: 'text-gray-500' },
        { text: '>>> starting_server...', color: 'text-teal-400' },
        { text: 'Watching for file changes with StatReloader', color: 'text-gray-500' },
        { text: 'Performing system checks...', color: 'text-gray-500' },
        { text: 'Django version 5.0.3, using settings "raihan_stack.settings"', color: 'text-gray-400' },
        { text: 'Starting development server at http://127.0.0.1:8000/', color: 'text-teal-500' },
        { text: 'Quit the server with CONTROL-C.', color: 'text-gray-500' },
        { text: '[20/May/2026 19:42:15] "GET /api/v1/projects/ HTTP/1.1" 200', color: 'text-green-400' },
        { text: '[20/May/2026 19:42:16] "GET /api/v1/profile/ HTTP/1.1" 200', color: 'text-green-400' },
        { text: '>>> _', color: 'text-white' }
    ];

    let lineIndex = 0;
    
    function typeLine() {
        if (lineIndex < lines.length) {
            const lineData = lines[lineIndex];
            const lineElement = document.createElement('div');
            lineElement.className = `opacity-0 transfrom translate-y-1 transition-all duration-500 ${lineData.color}`;
            lineElement.innerHTML = `<span class="mr-2 text-gray-600">»</span>${lineData.text}`;
            terminal.appendChild(lineElement);
            
            // Trigger animation
            setTimeout(() => {
                lineElement.classList.remove('opacity-0', 'translate-y-1');
            }, 50);

            lineIndex++;
            setTimeout(typeLine, Math.random() * 800 + 400);
        }
    }

    // Clear and start
    terminal.innerHTML = '';
    setTimeout(typeLine, 1000);
}

// 9. Star Canvas Background Optimization
const canvas = document.getElementById("starCanvas");
if (canvas) {
    const ctx = canvas.getContext("2d");
    let stars = [];

    const resize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };

    class Star {
        constructor() { this.reset(); }
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 1.5;
            this.speed = Math.random() * 0.5 + 0.1;
            this.opacity = Math.random() * 0.5 + 0.2;
        }
        draw() {
            ctx.beginPath();
            ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
        update() {
            this.y += this.speed;
            if (this.y > canvas.height) {
                this.y = 0;
                this.x = Math.random() * canvas.width;
            }
        }
    }

    const init = () => {
        resize();
        stars = Array.from({ length: 80 }, () => new Star());
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            stars.forEach(s => { s.update(); s.draw(); });
            requestAnimationFrame(animate);
        };
        animate();
    };

    window.addEventListener("resize", resize);
    init();
}