       // Loader
       window.addEventListener('load', () => {
           setTimeout(() => {
               document.querySelector('.loader').classList.add('hidden');
           }, 800);
       });

       // Mobile menu
       const hamburger = document.getElementById('hamburger');
       const mobileMenu = document.getElementById('mobileMenu');
       const overlay = document.getElementById('overlay');
       const mobileLinks = mobileMenu.querySelectorAll('a');

       function toggleMenu() {
           hamburger.classList.toggle('active');
           mobileMenu.classList.toggle('active');
           overlay.classList.toggle('active');
       }

       hamburger.addEventListener('click', toggleMenu);
       overlay.addEventListener('click', toggleMenu);
       mobileLinks.forEach(link => link.addEventListener('click', toggleMenu));

       // Navbar scroll effect
       window.addEventListener('scroll', () => {
           const nav = document.getElementById('navbar');
           if (window.scrollY > 50) {
               nav.classList.add('scrolled');
           } else {
               nav.classList.remove('scrolled');
           }
       });

       // Fade in animation on scroll
       const fadeElements = document.querySelectorAll('.fade-in');
       const observer = new IntersectionObserver((entries) => {
           entries.forEach(entry => {
               if (entry.isIntersecting) {
                   entry.target.classList.add('visible');
               }
           });
       }, {
           threshold: 0.1
       });

       fadeElements.forEach(el => observer.observe(el));

       // Smooth scroll for anchor links
       document.querySelectorAll('a[href^="#"]').forEach(anchor => {
           anchor.addEventListener('click', function(e) {
               e.preventDefault();
               const target = document.querySelector(this.getAttribute('href'));
               if (target) {
                   target.scrollIntoView({
                       behavior: 'smooth',
                       block: 'start'
                   });
               }
           });
       });