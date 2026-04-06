"use strict";

/**
 * RaihanStack Portfolio Script
 * Professional, high-performance interactions and animations.
 */

document.addEventListener("DOMContentLoaded", () => {
    // 1. Loader & GSAP Initial Entrance Animations
    const loader = document.getElementById("loader");
    const loaderBar = document.getElementById("loader-bar");
    const loaderText = document.getElementById("loader-text");

    if (loader && loaderBar && typeof gsap !== "undefined") {
        const statusMsgs = [
            "INITIALIZING_ARCHITECTURAL_NODES",
            "DECRYPTING_DATA_MODELS",
            "ESTABLISHING_TLS_ENCRYPTION",
            "AUTHORIZING_SYSTEM_USER",
            "SYSTEM_READY"
        ];

        let currentMsg = 0;
        const msgInterval = setInterval(() => {
            if (currentMsg < statusMsgs.length - 1) {
                currentMsg++;
                if (loaderText) loaderText.innerText = statusMsgs[currentMsg];
            }
        }, 300);

        // Animate Loader Bar
        gsap.to(loaderBar, {
            width: "100%",
            duration: 1.5,
            ease: "power2.inOut",
            onComplete: () => {
                clearInterval(msgInterval);
                loader.classList.add("loaded");
                
                // Start entrance animations
                const tl = gsap.timeline({
                    defaults: { ease: "power4.out", duration: 1.4 }
                });

                gsap.set(".animate-slide-up-initial, .animate-fadeIn", { opacity: 0, y: 40 });
                tl.to(".animate-slide-up-initial", { opacity: 1, y: 0, stagger: 0.15 })
                  .to(".animate-fadeIn", { opacity: 1, y: 0, stagger: 0.1 }, "-=1");
            }
        });
    }

    // 1.1 Lenis Smooth Scroll (Professional 'Sorol' Feel)
    if (typeof Lenis !== "undefined") {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4ba6
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 1,
            smoothTouch: false,
            touchMultiplier: 2,
            infinite: false,
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        // Sync scroll links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                lenis.scrollTo(this.getAttribute('href'));
            });
        });
    }

    // 2. Custom Cursor System (Magnetic Dot & Ring)
    const cursor = document.getElementById("custom-cursor");
    
    if (cursor && window.innerWidth > 768) {
        let mouseX = 0, mouseY = 0;
        let cursorX = 0, cursorY = 0;

        window.addEventListener("mousemove", (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        const animateCursor = () => {
            // Smooth interpolation
            cursorX += (mouseX - cursorX) * 0.2;
            cursorY += (mouseY - cursorY) * 0.2;

            cursor.style.left = `${cursorX}px`;
            cursor.style.top = `${cursorY}px`;
            cursor.style.transform = `translate(-50%, -50%)`;

            requestAnimationFrame(animateCursor);
        };
        requestAnimationFrame(animateCursor);

        // Interactive States
        const interactiveElements = document.querySelectorAll('a, button, .liquid-glass-card, .social-icon, article');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                document.body.classList.add('cursor-active');
                gsap.to(cursor, { scale: 1.5, duration: 0.3 });
            });
            el.addEventListener('mouseleave', () => {
                document.body.classList.remove('cursor-active');
                gsap.to(cursor, { scale: 1, duration: 0.3 });
            });
        });
    }

    // 2.1 Live System Status Simulation - Full Telemetry
    const latencyElements = document.querySelectorAll('.latency-val, [data-latency]');
    if (latencyElements.length > 0) {
        setInterval(() => {
            const randomLatency = Math.floor(Math.random() * 12) + 8;
            latencyElements.forEach(el => {
                el.innerText = `LATENCY: ${randomLatency}ms`;
            });
        }, 2500);
    }

    // 2.2 Live Project Node Metrics
    const uptimeNodes = document.querySelectorAll('[data-uptime]');
    const loadNodes   = document.querySelectorAll('[data-load]');

    if (uptimeNodes.length > 0 || loadNodes.length > 0) {
        setInterval(() => {
            const up   = (99.8 + Math.random() * 0.19).toFixed(2);
            const load = (Math.random() * 0.3).toFixed(2);
            uptimeNodes.forEach(el => el.innerText = `UPTIME: ${up}%`);
            loadNodes.forEach(el   => el.innerText = `LOAD: ${load}ms`);
        }, 4000);
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

    // 6. Navbar & Progress Scroll States
    const navbar = document.getElementById("navbar");
    const progressBar = document.getElementById("reading-progress");
    
    if (navbar || progressBar || scrollPercent) {
        window.addEventListener("scroll", () => {
            const scrolledHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (window.scrollY / scrolledHeight) * 100;

            if (progressBar) progressBar.style.width = `${progress}%`;
            if (scrollPercent) scrollPercent.innerText = `${Math.round(progress)}%`;

            if (navbar) {
                const scrolled = window.scrollY > 50;
                navbar.classList.toggle("backdrop-blur-2xl", scrolled);
                navbar.classList.toggle("bg-white/5", scrolled);
                navbar.classList.toggle("shadow-2xl", scrolled);
                navbar.style.transform = `translateX(-50%) translateY(${scrolled ? '10px' : '0'}) scale(${scrolled ? 0.98 : 1})`;
            }
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

    // 9. Hero Dashboard Micro-Interactions (Parallax)
    const monitor = document.querySelector('.blueprint-container');
    if (monitor) {
        window.addEventListener('mousemove', (e) => {
            const x = (window.innerWidth / 2 - e.clientX) / 40;
            const y = (window.innerHeight / 2 - e.clientY) / 40;
            gsap.to(monitor, {
                rotateY: x,
                rotateX: -y,
                duration: 0.8,
                ease: "power2.out"
            });
        });
    }

    // 10. Scroll Percentage Reference
    const scrollPercent = document.getElementById("scroll-percentage");
});


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
            this.size = Math.random() * 1.2;
            this.speed = Math.random() * 0.2 + 0.05; /* Slower for premium feel */
            this.opacity = Math.random() * 0.4 + 0.1;
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