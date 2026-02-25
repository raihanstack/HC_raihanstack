document.addEventListener('DOMContentLoaded', () => {
    const entranceTl = gsap.timeline({ defaults: { ease: "power4.out", duration: 1.2 }});
    
    if(document.querySelector(".animate-slide-up-initial")) {
        entranceTl.to(".animate-slide-up-initial", { opacity: 1, y: 0 })
                  .to(".animate-fadeIn", { opacity: 1, y: 0, stagger: 0.1 }, "-=0.8")
                  .to(".animate-scale-up", { opacity: 1, scale: 1, duration: 1.5 }, "-=1");
    }

    window.toggleMenu = () => {
        const menu = document.getElementById('mobileMenu');
        const icon = document.getElementById('menuIcon');
        if (!menu || !icon) return;

        const isOpen = menu.classList.contains('max-h-screen');
        menu.classList.toggle('max-h-0', isOpen);
        menu.classList.toggle('max-h-screen', !isOpen);
        menu.classList.toggle('py-4', !isOpen);
        icon.className = isOpen ? 'fa-solid fa-bars' : 'fa-solid fa-xmark';
    };

    const interactiveCards = document.querySelectorAll('.liquid-glass-card, .contact-card');
    
    interactiveCards.forEach(card => {
        if (!card.querySelector('.spotlight')) {
            const spotlight = document.createElement('div');
            spotlight.className = 'spotlight';
            card.appendChild(spotlight);
        }

        card.addEventListener('mousemove', (e) => {
            const { left, top } = card.getBoundingClientRect();
            const x = e.clientX - left;
            const y = e.clientY - top;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                if (entry.target.id === 'about') {
                    const spans = entry.target.querySelectorAll('.flex-wrap span');
                    gsap.to(spans, { opacity: 1, y: 0, stagger: 0.05, duration: 0.6 });
                }
                
                gsap.to(entry.target, { opacity: 1, x: 0, y: 0, duration: 1, ease: "back.out(1.2)" });
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('section, #skills .relative.flex').forEach(el => {
        if (el.id !== 'home') {
            el.style.opacity = "0";
            const xOffset = el.classList.contains('justify-start') ? -40 : (el.classList.contains('justify-end') ? 40 : 0);
            const yOffset = xOffset === 0 ? 40 : 0;
            gsap.set(el, { x: xOffset, y: yOffset });
            revealObserver.observe(el);
        }
    });

    const user = "raihan.invite", domain = "gmail.com";
    const mailLink = document.getElementById("email-link");
    const mailText = document.getElementById("email-text");
    if (mailLink) mailLink.href = `mailto:${user}@${domain}`;
    if (mailText) mailText.innerText = `${user}@${domain}`;

    window.addEventListener('scroll', () => {
        const nav = document.querySelector('nav');
        const isScrolled = window.scrollY > 20;
        nav.classList.toggle('backdrop-blur-lg', isScrolled);
        nav.classList.toggle('bg-dark-950/80', isScrolled);
        nav.classList.toggle('shadow-2xl', isScrolled);
    }, { passive: true });
});



    // --- 1. Cursor Logic ---
    const cursor = document.getElementById('custom-cursor');
    const blur = document.getElementById('cursor-blur');

    window.addEventListener('mousemove', (e) => {
      // Main small dot
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
      
      // Outer glow/blur
      blur.style.left = e.clientX + 'px';
      blur.style.top = e.clientY + 'px';
    });

    // --- 2. Starfall Logic ---
    const canvas = document.getElementById('starCanvas');
    const ctx = canvas.getContext('2d');
    let stars = [];

    function initCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    class Star {
      constructor() { this.reset(); }
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * -canvas.height;
        this.length = Math.random() * 25 + 10;
        this.speed = Math.random() * 4 + 2;
        this.opacity = Math.random() * 0.4 + 0.1;
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

    function startAnimation() {
      initCanvas();
      stars = Array.from({ length: 80 }, () => new Star());
      function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        stars.forEach(s => { s.update(); s.draw(); });
        requestAnimationFrame(animate);
      }
      animate();
    }

    window.addEventListener('resize', initCanvas);
    startAnimation();