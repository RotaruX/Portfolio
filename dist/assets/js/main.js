/* ============================================================
   PORTFOLIO - JAVASCRIPT PRINCIPAL
   Animaciones, partículas, typewriter y funcionalidad interactiva
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ============================================================
    // 1. SISTEMA DE PARTÍCULAS (Canvas)
    // ============================================================
    const initParticles = () => {
        const canvas = document.getElementById('particles-canvas');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let particles = [];
        let mouse = { x: null, y: null, radius: 120 };
        let animationId;

        // Ajustar tamaño del canvas al contenedor
        const resizeCanvas = () => {
            const hero = canvas.parentElement;
            canvas.width = hero.offsetWidth;
            canvas.height = hero.offsetHeight;
        };

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Seguimiento del ratón
        canvas.parentElement.addEventListener('mousemove', (e) => {
            const rect = canvas.parentElement.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
        });

        canvas.parentElement.addEventListener('mouseleave', () => {
            mouse.x = null;
            mouse.y = null;
        });

        // Clase Partícula
        class Particle {
            constructor() {
                this.reset();
            }

            reset() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2.5 + 0.5;
                this.baseSpeedX = (Math.random() - 0.5) * 0.6;
                this.baseSpeedY = (Math.random() - 0.5) * 0.6;
                this.speedX = this.baseSpeedX;
                this.speedY = this.baseSpeedY;
                this.opacity = Math.random() * 0.4 + 0.1;
                this.baseOpacity = this.opacity;
            }

            update() {
                // Interacción con el ratón
                if (mouse.x !== null && mouse.y !== null) {
                    const dx = this.x - mouse.x;
                    const dy = this.y - mouse.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < mouse.radius) {
                        const force = (mouse.radius - distance) / mouse.radius;
                        this.speedX += (dx / distance) * force * 0.3;
                        this.speedY += (dy / distance) * force * 0.3;
                        this.opacity = Math.min(this.baseOpacity + force * 0.3, 0.7);
                    } else {
                        this.opacity += (this.baseOpacity - this.opacity) * 0.05;
                    }
                }

                // Fricción suave para volver a velocidad base
                this.speedX += (this.baseSpeedX - this.speedX) * 0.02;
                this.speedY += (this.baseSpeedY - this.speedY) * 0.02;

                this.x += this.speedX;
                this.y += this.speedY;

                // Wrapping en los bordes
                if (this.x < -10) this.x = canvas.width + 10;
                if (this.x > canvas.width + 10) this.x = -10;
                if (this.y < -10) this.y = canvas.height + 10;
                if (this.y > canvas.height + 10) this.y = -10;
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(0, 255, 136, ${this.opacity})`;
                ctx.fill();
            }
        }

        // Crear partículas
        const particleCount = Math.min(80, Math.floor((canvas.width * canvas.height) / 12000));
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }

        // Dibujar líneas entre partículas cercanas
        const drawConnections = () => {
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 130) {
                        const opacity = (1 - distance / 130) * 0.08;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `rgba(0, 255, 136, ${opacity})`;
                        ctx.lineWidth = 0.6;
                        ctx.stroke();
                    }
                }
            }
        };

        // Bucle de animación
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach(p => {
                p.update();
                p.draw();
            });

            drawConnections();
            animationId = requestAnimationFrame(animate);
        };

        animate();

        // Parar animación si el hero no es visible (rendimiento)
        const heroObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) {
                    cancelAnimationFrame(animationId);
                } else {
                    animate();
                }
            });
        }, { threshold: 0 });

        heroObserver.observe(canvas.parentElement);
    };

    // ============================================================
    // 2. EFECTO TYPEWRITER
    // ============================================================
    const initTypewriter = () => {
        const element = document.getElementById('typewriter');
        if (!element) return;

        const strings = [
            'Desarrollador Web Full Stack',
            'Desarrollador de Aplicaciones',
            'Apasionado por la Tecnología',
            'Creador de Experiencias Digitales'
        ];

        let stringIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 80;

        const type = () => {
            const currentString = strings[stringIndex];

            if (isDeleting) {
                // Borrando
                element.textContent = currentString.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 35;
            } else {
                // Escribiendo
                element.textContent = currentString.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 80;
            }

            // Lógica de cambio
            if (!isDeleting && charIndex === currentString.length) {
                // Pausa antes de borrar
                typingSpeed = 2200;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                stringIndex = (stringIndex + 1) % strings.length;
                typingSpeed = 500;
            }

            setTimeout(type, typingSpeed);
        };

        // Iniciar con un pequeño retraso
        setTimeout(type, 1200);
    };

    // ============================================================
    // 3. EFECTO SCROLL EN HEADER
    // ============================================================
    const initHeaderScroll = () => {
        const header = document.querySelector('.main-header');
        if (!header) return;

        let ticking = false;

        const updateHeader = () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            ticking = false;
        };

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateHeader);
                ticking = true;
            }
        }, { passive: true });
    };

    // ============================================================
    // 4. NAVEGACIÓN MÓVIL (Hamburger)
    // ============================================================
    const initMobileNav = () => {
        const toggle = document.querySelector('.nav-toggle');
        const navLinks = document.querySelector('.nav-links');
        if (!toggle || !navLinks) return;

        const closeMenu = () => {
            toggle.classList.remove('active');
            navLinks.classList.remove('nav-active');
            document.body.classList.remove('menu-open');
            toggle.setAttribute('aria-expanded', 'false');
        };

        toggle.addEventListener('click', () => {
            const isOpen = navLinks.classList.contains('nav-active');
            if (isOpen) {
                closeMenu();
            } else {
                toggle.classList.add('active');
                navLinks.classList.add('nav-active');
                document.body.classList.add('menu-open');
                toggle.setAttribute('aria-expanded', 'true');
            }
        });

        // Cerrar al hacer clic en un enlace
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', closeMenu);
        });

        // Cerrar al hacer clic fuera
        document.addEventListener('click', (e) => {
            if (!toggle.contains(e.target) && !navLinks.contains(e.target)) {
                closeMenu();
            }
        });

        // Cerrar con tecla Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeMenu();
        });
    };

    // ============================================================
    // 5. SCROLL REVEAL ANIMATIONS
    // ============================================================
    const initScrollReveal = () => {
        const elements = document.querySelectorAll('[data-scroll-reveal]');
        if (elements.length === 0) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.12,
            rootMargin: '0px 0px -40px 0px'
        });

        elements.forEach(el => observer.observe(el));
    };

    // ============================================================
    // 6. ANIMACIÓN DE BARRAS DE HABILIDADES
    // ============================================================
    const initSkillBars = () => {
        const skillBars = document.querySelectorAll('.skill-progress');
        if (skillBars.length === 0) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const bar = entry.target;
                    const level = bar.getAttribute('data-level');
                    // Pequeño retraso para que la animación sea visible
                    setTimeout(() => {
                        bar.style.width = level + '%';
                    }, 200);
                    observer.unobserve(bar);
                }
            });
        }, { threshold: 0.3 });

        skillBars.forEach(bar => observer.observe(bar));
    };

    // ============================================================
    // 7. ANIMACIÓN DE CONTADORES (Stats)
    // ============================================================
    const initCounters = () => {
        const counters = document.querySelectorAll('.stat-number');
        if (counters.length === 0) return;

        const animateCounter = (element) => {
            const target = parseInt(element.getAttribute('data-count'), 10);
            const suffix = element.getAttribute('data-suffix') || '';
            const duration = 2000;
            const startTime = performance.now();

            const update = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);

                // Función de easing (desaceleración)
                const eased = 1 - Math.pow(1 - progress, 3);
                const current = Math.floor(eased * target);

                element.textContent = current + suffix;

                if (progress < 1) {
                    requestAnimationFrame(update);
                } else {
                    element.textContent = target + suffix;
                }
            };

            requestAnimationFrame(update);
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(counter => observer.observe(counter));
    };

    // ============================================================
    // 8. SMOOTH SCROLL PARA ANCHOR LINKS
    // ============================================================
    const initSmoothScroll = () => {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                const targetId = anchor.getAttribute('href');
                if (targetId === '#') return;

                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();
                    const headerHeight = document.querySelector('.main-header')?.offsetHeight || 80;
                    const targetPosition = targetElement.offsetTop - headerHeight - 20;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    };

    // ============================================================
    // 9. ACTIVE NAV LINK EN SCROLL
    // ============================================================
    const initActiveNavOnScroll = () => {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-links .nav-link');
        if (sections.length === 0 || navLinks.length === 0) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // No cambiamos la clase active del nav aquí porque
                    // los links apuntan a páginas separadas, no a secciones
                    // Solo lo usamos si hay anchors dentro de la misma página
                }
            });
        }, {
            threshold: 0.3,
            rootMargin: '-80px 0px -50% 0px'
        });

        sections.forEach(section => observer.observe(section));
    };

    // ============================================================
    // 10. EFECTO PARALLAX SUTIL EN HERO
    // ============================================================
    const initParallax = () => {
        const heroContent = document.querySelector('.hero-content');
        const codeBlock = document.querySelector('.hero-code-block');
        if (!heroContent) return;

        let ticking = false;

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    const scrolled = window.scrollY;
                    if (scrolled < window.innerHeight) {
                        const speed = 0.3;
                        heroContent.style.transform = `translateY(${scrolled * speed}px)`;
                        heroContent.style.opacity = 1 - (scrolled / (window.innerHeight * 0.8));

                        if (codeBlock) {
                            codeBlock.style.transform = `translateY(${scrolled * speed * 0.5}px)`;
                        }
                    }
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });
    };

    // ============================================================
    // INICIALIZACIÓN DE TODOS LOS MÓDULOS
    // ============================================================
    initParticles();
    initTypewriter();
    initHeaderScroll();
    initMobileNav();
    initScrollReveal();
    initSkillBars();
    initCounters();
    initSmoothScroll();
    initActiveNavOnScroll();
    initParallax();

    // Mensaje en consola para desarrolladores
    console.log(
        '%c{ DevPortfolio }%c — Gracias por visitar mi portfolio 🚀',
        'color: #00ff88; font-size: 16px; font-weight: bold; font-family: monospace;',
        'color: #6b9e7a; font-size: 12px;'
    );
});
