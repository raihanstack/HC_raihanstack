/**
 * RaihanStack Portfolio Core Logic
 * High Performance & Fully Responsive
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. GSAP Hero Entrance ---
    // Page load hole hero section smoothly bhese uthbe
    const entranceTl = gsap.timeline({ defaults: { ease: "power4.out", duration: 1.2 }});
    
    if(document.querySelector(".animate-slide-up-initial")) {
        entranceTl.to(".animate-slide-up-initial", { opacity: 1, y: 0 })
                  .to(".animate-fadeIn", { opacity: 1, y: 0, stagger: 0.1 }, "-=0.8")
                  .to(".animate-scale-up", { opacity: 1, scale: 1, duration: 1.5 }, "-=1");
    }

    // --- 2. Navigation Control ---
    // Mobile menu toggle logic
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

    // --- 3. 3D Tilt & Interactive Spotlight ---
// --- 3. Interactive Spotlight (No 3D Tilt) ---
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

            // Sudhu spotlight move hobe
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
        
        // Mouseleave e kono GSAP reset dorkar nei ekhon
    });

    // --- 4. Smart Scroll Reveal ---
    // Intersection Observer diye performance friendly animation
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                // About section specific stagger
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
            // Entrance offset
            const xOffset = el.classList.contains('justify-start') ? -40 : (el.classList.contains('justify-end') ? 40 : 0);
            const yOffset = xOffset === 0 ? 40 : 0;
            
            gsap.set(el, { x: xOffset, y: yOffset });
            revealObserver.observe(el);
        }
    });

    // --- 5. Dynamic Data & Navbar ---
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