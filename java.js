// Menu mobile totalmente responsivo
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
        
        // Prevenir scroll do body quando menu está aberto no mobile
        if (window.innerWidth <= 768) {
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        }
    });

    // Fechar menu ao clicar em um link (mobile)
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });
}

// Formulário de agendamento
const formAgendamento = document.getElementById('form-agendamento');

if (formAgendamento) {
    formAgendamento.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Coletar dados do formulário
        const nome = document.getElementById('nome').value;
        const email = document.getElementById('email').value;
        const telefone = document.getElementById('telefone').value;
        
        // Validar telefone (formato básico)
        const telefoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
        if (!telefoneRegex.test(telefone)) {
            alert('Por favor, insira um número de telefone válido.');
            return;
        }
        
        // Mensagem para WhatsApp
        const mensagem = `Olá! Gostaria de agendar uma sessão de terapia emocional.%0A%0A*Nome:* ${nome}%0A*Email:* ${email}%0A*Telefone:* ${telefone}`;
        
        // Redirecionar para WhatsApp
        window.open(`https://wa.me/5511999999999?text=${mensagem}`, '_blank');
        
        // Limpar formulário
        formAgendamento.reset();
        
        // Mensagem de sucesso
        alert('Obrigada! Você será redirecionado para o WhatsApp para confirmar o agendamento.');
    });
}

// Navegação suave otimizada para mobile
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.getBoundingClientRect().top + window.pageYOffset - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
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

// Carrossel de depoimentos responsivo
const depoimentos = document.querySelectorAll('.depoimento-card');
let currentDepoimento = 0;

function showDepoimento(index) {
    depoimentos.forEach(depoimento => {
        depoimento.classList.remove('active');
    });
    
    if (depoimentos[index]) {
        depoimentos[index].classList.add('active');
        currentDepoimento = index;
    }
}

// Trocar depoimentos automaticamente (mais lento em mobile)
let carrosselInterval;

function startCarrossel() {
    const interval = window.innerWidth <= 768 ? 7000 : 5000; // Mais lento no mobile
    carrosselInterval = setInterval(() => {
        currentDepoimento = (currentDepoimento + 1) % depoimentos.length;
        showDepoimento(currentDepoimento);
    }, interval);
}

function stopCarrossel() {
    clearInterval(carrosselInterval);
}

// Gerenciar carrossel baseado no tamanho da tela
window.addEventListener('resize', function() {
    stopCarrossel();
    startCarrossel();
});

// Iniciar carrossel
startCarrossel();

// Animação de entrada dos elementos - otimizada para mobile
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observar elementos para animação
document.querySelectorAll('.beneficio-card, .passo, .depoimento-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Loading suave para melhor experiência mobile
window.addEventListener('load', function() {
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Prevenir zoom em inputs no iOS
document.addEventListener('touchstart', function() {}, { passive: true });

console.log('Site da terapeuta carregado com sucesso! 📱💜');