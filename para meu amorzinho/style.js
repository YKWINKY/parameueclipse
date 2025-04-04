// Cria corações flutuantes
function createHearts() {
    const container = document.getElementById('floating-hearts');
    const heart = document.createElement('div');
    heart.className = 'heart';
    
    // Escolhe aleatoriamente entre vários emojis de coração
    const heartEmojis = ['❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '💖', '💗', '💘', '💝'];
    heart.innerHTML = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
    
    // Posição aleatória
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.fontSize = (Math.random() * 20 + 15) + 'px';
    
    // Duração e atraso aleatórios
    const duration = Math.random() * 5 + 5;
    heart.style.animation = `float ${duration}s linear forwards`;
    heart.style.animationDelay = Math.random() * 2 + 's';
    
    container.appendChild(heart);
    
    // Remover após animação
    setTimeout(() => {
        heart.remove();
    }, (duration + 2) * 1000);
}

// Iniciar corações
function startHearts() {
    createHearts();
    setInterval(createHearts, 300);
}

// Mostrar texto surpresa
function showSurprise() {
    const surpriseText = document.getElementById('surpriseText');
    const isVisible = surpriseText.style.display === 'block';
    
    // Alternar visibilidade
    surpriseText.style.display = isVisible ? 'none' : 'block';
    
    // Criar efeito de corações apenas quando mostrar
    if (!isVisible) {
        for (let i = 0; i < 15; i++) {
            setTimeout(() => {
                createHearts();
            }, i * 200);
        }
    }
    
    // Efeito no botão
    const btn = document.getElementById('surpriseBtn');
    btn.innerHTML = isVisible ? 'Clique para ver o segredo ✨' : 'Ocultar mensagem 💝';
}

// Configurar upload de foto
function setupPhotoUpload() {
    const photo = document.getElementById('love-photo');
    
    photo.addEventListener('click', function() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        
        input.onchange = function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(event) {
                    photo.src = event.target.result;
                    
                    // Criar corações ao mudar a foto
                    for (let i = 0; i < 10; i++) {
                        setTimeout(createHearts, i * 200);
                    }
                };
                reader.readAsDataURL(file);
            }
        };
        
        input.click();
    });
}

// Inicializar tudo quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
    startHearts();
    setupPhotoUpload();
    
    // Configurar botão de surpresa
    document.getElementById('surpriseBtn').addEventListener('click', showSurprise);
    
    // Efeito de digitação na primeira visita (opcional)
    if (!localStorage.getItem('visited')) {
        const originalText = document.getElementById('surpriseText').innerHTML;
        document.getElementById('surpriseText').innerHTML = '';
        localStorage.setItem('visited', 'true');
    }
});