// Menu Mobile Simples e Funcional
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    console.log('NavToggle:', navToggle);
    console.log('NavMenu:', navMenu);

    // Clique no hamburguer
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            console.log('Hamburguer clicado!');
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
            
            // Bloquear scroll quando menu está aberto
            if (navMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });

        // Fechar menu ao clicar nos links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // Formulário de agendamento
    const formAgendamento = document.getElementById('form-agendamento');
    if (formAgendamento) {
        formAgendamento.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nome = document.getElementById('nome').value;
            const email = document.getElementById('email').value;
            const telefone = document.getElementById('telefone').value;
            
            const mensagem = `Olá! Gostaria de agendar uma sessão de terapia emocional.%0A%0ANome: ${nome}%0AEmail: ${email}%0ATelefone: ${telefone}`;
            
            window.open(`https://wa.me/5511999999999?text=${mensagem}`, '_blank');
            formAgendamento.reset();
            
            alert('Obrigada! Você será redirecionado para o WhatsApp para confirmar o agendamento.');
        });
    }

    // Navegação suave
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
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

    // Efeito de scroll na navbar
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    });

    console.log('Site carregado - Hamburguer deve funcionar!');
});