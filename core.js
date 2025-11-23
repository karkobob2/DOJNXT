// =====================
// CORE.JS
// =====================

// Loader
window.addEventListener('load', () => {
    setTimeout(() => {
        document.querySelector('.loader')?.classList.add('hidden');
    }, 800);
});

// Mobile menu
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const overlay = document.getElementById('overlay');

function toggleMenu() {
    hamburger?.classList.toggle('active');
    mobileMenu?.classList.toggle('active');
    overlay?.classList.toggle('active');
}

hamburger?.addEventListener('click', toggleMenu);
overlay?.addEventListener('click', toggleMenu);
mobileMenu?.querySelectorAll('a').forEach(link =>
    link.addEventListener('click', toggleMenu)
);

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const nav = document.getElementById('navbar');
    if (!nav) return;

    if (window.scrollY > 50) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
});

// Fade-in animation
const fadeElements = document.querySelectorAll('.fade-in');
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
    });
}, { threshold: 0.1 });

fadeElements.forEach(el => observer.observe(el));

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
        const target = document.querySelector(link.getAttribute('href'));
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});
