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
    const monitor = document.querySelector('.hero-right');
    if (monitor) {
        window.addEventListener('mousemove', (e) => {
            const x = (window.innerWidth / 2 - e.clientX) / 50;
            const y = (window.innerHeight / 2 - e.clientY) / 50;
            gsap.to(monitor, {
                rotateY: x,
                rotateX: -y,
                duration: 1.2,
                ease: "power2.out"
            });
        });
    }

    // 10. ADVANCED DJANGO TERMINAL SIMULATION
    const codeBlock = document.getElementById("hero-code-block");
    const snippets = [
        {
            lines: [
                `<span style="color:#8b949e">raihanstack@django-cluster:~$</span> <span style="color:#e6edf3">python manage.py shell</span>`,
                `<span style="color:#484f57">Python 3.11.4 (main, Jun 2023) [GCC 11.2.0]</span>`,
                `<span style="color:#484f57">Type "help" for more information. (InteractiveConsole)</span>`,
                `<span style="color:#00ffc3">>>></span> <span style="color:#e6edf3">from django.contrib.auth.models import User</span>`,
                `<span style="color:#00ffc3">>>></span> <span style="color:#e6edf3">User.objects.filter(is_superuser=True).count()</span>`,
                `<span style="color:#79c0ff">1</span>`
            ]
        },
        {
            lines: [
                `<span style="color:#8b949e">raihanstack@django-cluster:~$</span> <span style="color:#e6edf3">python manage.py runserver</span>`,
                `<span style="color:#484f57">Watching for file changes with StatReloader...</span>`,
                `<span style="color:#00ffc3">Performing system checks...</span>`,
                `<span style="color:#484f57">System check identified no issues (0 silenced).</span>`,
                `<span style="color:#484f57">Django version 4.2.5, using settings 'config.settings'</span>`,
                `<span style="color:#79c0ff">Starting development server at http://127.0.0.1:8000/</span>`
            ]
        }
    ];

    let snippetIndex = 0;
    let lineIndex = 0;

    const typeCode = () => {
        if (!codeBlock) return;
        
        const currentSnippet = snippets[snippetIndex];
        if (lineIndex === 0) codeBlock.innerHTML = "";

        if (lineIndex < currentSnippet.lines.length) {
            const line = document.createElement("div");
            line.innerHTML = currentSnippet.lines[lineIndex] + `<span id="hero-cursor" class="inline-block w-[2px] h-[12px] ml-1 bg-teal-500 animate-pulse"></span>`;
            
            // Remove previous cursor
            const prevCursor = document.getElementById("hero-cursor");
            if (prevCursor) prevCursor.remove();

            codeBlock.appendChild(line);
            lineIndex++;
            
            // Random delay between lines - commands take longer to "type", output is instant
            const isCommand = currentSnippet.lines[lineIndex-1].includes("~$") || currentSnippet.lines[lineIndex-1].includes(">>>");
            const delay = isCommand ? (800 + Math.random() * 600) : (100 + Math.random() * 200);
            
            setTimeout(typeCode, delay);
        } else {
            // Snippet finished, wait and restart or go to next
            setTimeout(() => {
                lineIndex = 0;
                snippetIndex = (snippetIndex + 1) % snippets.length;
                typeCode();
            }, 4000);
        }
    };

    if (codeBlock) typeCode();

    // 11. OSCILLATING TELEMETRY
    const liveLatency = document.getElementById("live-latency");
    const latencyBar = document.getElementById("latency-bar");
    const liveUptime = document.getElementById("live-uptime");
    const healthTicks = document.querySelectorAll(".health-tick");

    setInterval(() => {
        if (liveLatency && latencyBar) {
            const val = (2.1 + Math.random() * 1.2).toFixed(1);
            liveLatency.innerHTML = `${val}<span class="text-xs ml-1" style="color:#484f57">ms</span>`;
            latencyBar.style.width = `${10 + Math.random() * 8}%`;
        }
    }, 2000);

    setInterval(() => {
        if (liveUptime) {
            const val = (99.9 + Math.random() * 0.09).toFixed(1);
            liveUptime.innerHTML = `${val}<span class="text-xs ml-1" style="color:#484f57">%</span>`;
        }
        healthTicks.forEach(tick => {
            tick.style.opacity = 0.6 + Math.random() * 0.4;
        });
    }, 4000);

    // 12. DJANGO SERVER LOG STREAM
    const logStream = document.getElementById("hero-log-stream");
    const logPool = [
        { type: "200", msg: "GET /api/v1/users/me/", method: "GET", color: "#00ffc3" },
        { type: "201", msg: "POST /api/v1/auth/login/", method: "POST", color: "#79c0ff" },
        { type: "200", msg: "GET /api/v1/systems/health/", method: "GET", color: "#00ffc3" },
        { type: "101", msg: "SWITCHING_PROTOCOLS :: WebSocket", method: "WS", color: "#d2a8ff" },
        { type: "304", msg: "GET /static/json/schema.json", method: "GET", color: "#8b949e" }
    ];

    setInterval(() => {
        if (logStream) {
            const entry = logPool[Math.floor(Math.random() * logPool.length)];
            const div = document.createElement("div");
            const now = new Date();
            const timeStr = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
            
            div.className = "flex gap-2 animate-fadeIn";
            div.innerHTML = `<span style="color:#484f57">[${timeStr}]</span> <span style="color:${entry.color}">"${entry.msg} HTTP/1.1" ${entry.type}</span>`;
            
            logStream.prepend(div);
            if (logStream.children.length > 5) {
                logStream.lastElementChild.remove();
            }
        }
    }, 3500);
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