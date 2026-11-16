/**
 * ==========================================================
 *  MAIN.JS - Logica del Frontend del Portafolio
 * ==========================================================
 *
 *  COMO FUNCIONA EL JAVASCRIPT:
 *  - Maneja la barra de navegacion (scroll, menu movil)
 *  - Anima las barras de habilidades cuando son visibles
 *  - Cuenta los numeros de estadisticas con animacion
 *  - Crea particulas flotantes en el hero
 *  - Agrega efecto fade-in a las secciones al hacer scroll
 *  - Maneja el formulario de contacto (solo frontend por ahora)
 *
 *  COMO MODIFICAR:
 *  - Particulas: ajusta el numero en createParticles()
 *  - Colores: cambia en style.css, este archivo usa clases CSS
 *  - Animaciones: ajusta duracion/delay en los observers
 * ==========================================================
 */

document.addEventListener('DOMContentLoaded', () => {

    // ===== NAVBAR: efecto al hacer scroll =====
    const navbar = document.getElementById('navbar');
    const sections = document.querySelectorAll('.section, .hero');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        // Fondo de la navbar al scrollear
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Resaltar link activo en la navbar
        let current = '';
        sections.forEach(section => {
            const top = section.offsetTop - 100;
            if (window.scrollY >= top) {
                current = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });

    // ===== NAVBAR: menu hamburguesa en movil =====
    const navToggle = document.getElementById('navToggle');
    const navLinksContainer = document.getElementById('navLinks');

    navToggle.addEventListener('click', () => {
        navLinksContainer.classList.toggle('active');
    });

    // Cerrar menu al clickar un link
    navLinksContainer.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinksContainer.classList.remove('active');
        });
    });

    // ===== HERO: crear particulas flotantes =====
    function createParticles() {
        const container = document.getElementById('particles');
        if (!container) return;
        const count = 40; // Numero de particulas (ajustable)
        for (let i = 0; i < count; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 15 + 's';
            particle.style.animationDuration = (10 + Math.random() * 20) + 's';
            particle.style.width = particle.style.height = (2 + Math.random() * 4) + 'px';
            particle.style.opacity = 0.1 + Math.random() * 0.4;
            container.appendChild(particle);
        }
    }
    createParticles();

    // ===== HABILIDADES: animar barras de progreso =====
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const fill = entry.target.querySelector('.skill-bar-fill');
                if (fill) {
                    const targetWidth = fill.getAttribute('data-width');
                    setTimeout(() => {
                        fill.style.width = targetWidth + '%';
                    }, 100);
                }
                skillObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    document.querySelectorAll('.skill-card').forEach(card => {
        skillObserver.observe(card);
    });

    // ===== ESTADISTICAS: animar contador =====
    function animateCounter(element) {
        const target = parseInt(element.getAttribute('data-count'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current);
            }
        }, 16);
    }

    const statObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const numbers = entry.target.querySelectorAll('.stat-number');
                numbers.forEach((num, i) => {
                    setTimeout(() => animateCounter(num), i * 200);
                });
                statObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    const statsSection = document.querySelector('.about-stats');
    if (statsSection) statObserver.observe(statsSection);

    // ===== SECCIONES: efecto fade-in =====
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                fadeObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.section-title, .about-grid, .contact-grid, .timeline-item, .project-card').forEach(el => {
        el.classList.add('fade-in');
        fadeObserver.observe(el);
    });

    // ===== FOTO DE PERFIL: ocultar placeholder si hay imagen =====
    const heroPhoto = document.querySelector('.hero-photo');
    const photoPlaceholder = document.getElementById('photoPlaceholder');
    if (heroPhoto && photoPlaceholder) {
        heroPhoto.addEventListener('load', () => {
            photoPlaceholder.style.display = 'none';
        });
    }

    // ===== FORMULARIO: manejo basico =====
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const data = new FormData(contactForm);
            const name = data.get('name');
            const email = data.get('email');
            const message = data.get('message');

            // Abrir mailto con los datos (sin servidor de email)
            const destino = contactForm.dataset.email || 'contacto@example.com';
            const mailtoLink = `mailto:${destino}?subject=Contacto de ${name}&body=${encodeURIComponent(message)}%0A%0ADe: ${name} <${email}>`;
            window.location.href = mailtoLink;

            contactForm.reset();
            alert('Se abrira tu cliente de correo para enviar el mensaje. Gracias!');
        });
    }

    // ===== SMOOTH SCROLL para links internos =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

});