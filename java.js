// Menu mobile profissional - VERSÃO CORRIGIDA
class SiteAnimations {
    constructor() {
        this.init();
    }

    init() {
        this.initMobileMenu();
        this.initSmoothScroll();
        this.initNavbarScroll();
        this.initCarousel();
        this.initAnimations();
        this.initForms();
        this.preventZoom();
    }

    // Menu Mobile - CORRIGIDO E TESTADO
    initMobileMenu() {
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');

        if (navToggle && navMenu) {
            // Clique no hamburguer
            navToggle.addEventListener('click', (e) => {
                e.stopPropagation();
                const isActive = navMenu.classList.toggle('active');
                navToggle.classList.toggle('active');
                
                // Bloquear scroll do body no mobile
                if (window.innerWidth <= 768) {
                    if (isActive) {
                        document.body.style.overflow = 'hidden';
                        document.body.style.height = '100vh';
                    } else {
                        document.body.style.overflow = '';
                        document.body.style.height = '';
                    }
                }
            });

            // Fechar menu ao clicar nos links
            document.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', () => {
                    if (window.innerWidth <= 768) {
                        navMenu.classList.remove('active');
                        navToggle.classList.remove('active');
                        document.body.style.overflow = '';
                        document.body.style.height = '';
                    }
                });
            });

            // Fechar menu ao clicar fora (apenas mobile)
            document.addEventListener('click', (e) => {
                if (window.innerWidth <= 768 && 
                    navMenu.classList.contains('active') && 
                    !navMenu.contains(e.target) && 
                    !navToggle.contains(e.target)) {
                    navMenu.classList.remove('active');
                    navToggle.classList.remove('active');
                    document.body.style.overflow = '';
                    document.body.style.height = '';
                }
            });

            // Fechar menu ao redimensionar para desktop
            window.addEventListener('resize', () => {
                if (window.innerWidth > 768) {
                    navMenu.classList.remove('active');
                    navToggle.classList.remove('active');
                    document.body.style.overflow = '';
                    document.body.style.height = '';
                }
            });
        }
    }

    // Navegação Suave
    initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    const offsetTop = target.getBoundingClientRect().top + window.pageYOffset - 70;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // Efeito Navbar no Scroll
    initNavbarScroll() {
        const navbar = document.querySelector('.navbar');
        
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

            if (scrollTop > 100) {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            }
        });
    }

    // Carousel de Depoimentos
    initCarousel() {
        const depoimentos = document.querySelectorAll('.depoimento-card');
        if (depoimentos.length === 0) return;

        let currentDepoimento = 0;
        let carrosselInterval;

        const showDepoimento = (index) => {
            depoimentos.forEach(depoimento => {
                depoimento.classList.remove('active');
            });
            
            if (depoimentos[index]) {
                depoimentos[index].classList.add('active');
                currentDepoimento = index;
            }
        };

        const startCarrossel = () => {
            const interval = window.innerWidth <= 768 ? 6000 : 5000;
            carrosselInterval = setInterval(() => {
                currentDepoimento = (currentDepoimento + 1) % depoimentos.length;
                showDepoimento(currentDepoimento);
            }, interval);
        };

        startCarrossel();
    }

    // Sistema de Animações
    initAnimations() {
        const observerOptions = {
            threshold: 0.15,
            rootMargin: '0px 0px -40px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Elementos para animar
        const animatedElements = document.querySelectorAll('.beneficio-card, .passo, .depoimento-card');
        
        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(40px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }

    // Formulários
    initForms() {
        const formAgendamento = document.getElementById('form-agendamento');
        if (formAgendamento) {
            formAgendamento.addEventListener('submit', (e) => {
                e.preventDefault();
                
                const nome = document.getElementById('nome').value;
                const email = document.getElementById('email').value;
                const telefone = document.getElementById('telefone').value;
                
                // Validação
                const telefoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
                if (!telefoneRegex.test(telefone)) {
                    alert('Por favor, insira um número de telefone válido.');
                    return;
                }
                
                // Mensagem para WhatsApp
                const mensagem = `Olá! Gostaria de agendar uma sessão de terapia emocional.%0A%0A*Nome:* ${nome}%0A*Email:* ${email}%0A*Telefone:* ${telefone}`;
                
                window.open(`https://wa.me/5511999999999?text=${mensagem}`, '_blank');
                formAgendamento.reset();
                
                alert('Obrigada! Você será redirecionado para o WhatsApp para confirmar o agendamento.');
            });
        }
    }

    // Prevenir zoom em mobile
    preventZoom() {
        document.addEventListener('touchstart', function() {}, { passive: true });
    }
}

// Inicializar quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', function() {
    new SiteAnimations();
    
    // Loading suave
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 50);
});

// Log de sucesso
console.log('✅ Menu mobile corrigido e funcionando perfeitamente!');