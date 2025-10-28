// Menu Mobile - Código Simples e Funcional
console.log('Script carregado! Verificando elementos...');

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM carregado! Iniciando menu mobile...');
    
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    console.log('Botão hamburguer:', navToggle);
    console.log('Menu:', navMenu);

    // Verificar se os elementos existem
    if (!navToggle || !navMenu) {
        console.error('Elementos do menu não encontrados!');
        return;
    }

    // Clique no hamburguer - FUNÇÃO PRINCIPAL
    navToggle.addEventListener('click', function() {
        console.log('✅ Hamburguer clicado!');
        
        // Alternar classes active
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
        
        // Bloquear/liberar scroll
        if (navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
            document.body.style.position = 'fixed';
            document.body.style.width = '100%';
            console.log('📱 Menu ABERTO - scroll bloqueado');
        } else {
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.width = '';
            console.log('📱 Menu FECHADO - scroll liberado');
        }
    });

    // Fechar menu ao clicar nos links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            console.log('🔗 Link clicado:', this.textContent);
            
            // Fechar menu mobile
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            
            // Restaurar scroll
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.width = '';
            
            console.log('📱 Menu fechado após clique no link');
        });
    });

    // Fechar menu ao clicar fora (apenas mobile)
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 768 && 
            navMenu.classList.contains('active') &&
            !navMenu.contains(e.target) && 
            !navToggle.contains(e.target)) {
            
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.width = '';
            
            console.log('📱 Menu fechado ao clicar fora');
        }
    });

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
        if (navbar) {
            if (window.scrollY > 100) {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            }
        }
    });

    console.log('✅ Menu mobile configurado com sucesso!');
    console.log('📱 Teste: Reduza a tela para menos de 768px e clique nos 3 traços');
});

// Carregamento completo da página
window.addEventListener('load', function() {
    console.log('🎉 Página totalmente carregada!');
    console.log('Largura da tela:', window.innerWidth);
    console.log('Altura da tela:', window.innerHeight);
});
// Debug para verificar se as imagens estão carregando
window.addEventListener('load', function() {
    console.log('🎉 Página totalmente carregada!');
    console.log('Largura da tela:', window.innerWidth);
    console.log('Altura da tela:', window.innerHeight);
    
    // Verificar se os placeholders estão visíveis
    const placeholders = document.querySelectorAll('.image-placeholder');
    console.log('Placeholders encontrados:', placeholders.length);
    
    placeholders.forEach((placeholder, index) => {
        const rect = placeholder.getBoundingClientRect();
        console.log(`Placeholder ${index + 1}:`, {
            visible: rect.width > 0 && rect.height > 0,
            width: rect.width,
            height: rect.height,
            top: rect.top,
            left: rect.left
        });
    });
});

// Forçar redesenho nos iPhones
if (/iPhone|iPad|iPod/.test(navigator.userAgent)) {
    document.addEventListener('DOMContentLoaded', function() {
        const forceRedraw = function(element) {
            if (element) {
                element.style.display = 'none';
                element.offsetHeight; // trigger reflow
                element.style.display = '';
            }
        };
        
        // Forçar redesenho das imagens após um breve delay
        setTimeout(function() {
            const placeholders = document.querySelectorAll('.image-placeholder');
            placeholders.forEach(forceRedraw);
        }, 100);
    });
}