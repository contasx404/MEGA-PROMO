// Criar partículas de fundo
function createParticles() {
  const container = document.querySelector('.particles');
  const colors = ['#229ED9', '#1a73b8', '#25D366', '#FFFFFF'];
  
  // Limpar partículas existentes
  container.innerHTML = '';
  
  for (let i = 0; i < 30; i++) {
    const particle = document.createElement('div');
    
    // Tamanho aleatório
    const size = Math.random() * 4 + 1;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    
    // Posição aleatória
    particle.style.left = `${Math.random() * 100}vw`;
    particle.style.top = `${Math.random() * 100}vh`;
    
    // Cor aleatória
    particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    particle.style.opacity = Math.random() * 0.6 + 0.2;
    particle.style.borderRadius = '50%';
    particle.style.position = 'fixed';
    particle.style.pointerEvents = 'none';
    particle.style.zIndex = '1';
    
    // Velocidade de animação aleatória
    const duration = Math.random() * 20 + 10;
    const delay = Math.random() * 5;
    
    // Animar movimento
    particle.style.animation = `
      float ${duration}s infinite linear ${delay}s,
      pulse ${duration / 2}s infinite ease-in-out ${delay}s
    `;
    
    container.appendChild(particle);
  }
}

// Efeito de clique no botão
function setupButtonEffects() {
  const btn = document.querySelector('.telegram-btn');
  
  btn.addEventListener('click', function(e) {
    // Efeito visual de clique
    this.style.transform = 'scale(0.95)';
    
    // Adicionar efeito de "splash"
    createClickEffect(e.clientX, e.clientY);
    
    // O link já redireciona diretamente para o Telegram
    // Nenhum redirecionamento manual necessário
  });
  
  btn.addEventListener('mousedown', function() {
    this.style.transform = 'scale(0.95)';
  });
  
  btn.addEventListener('mouseup', function() {
    this.style.transform = 'translateY(-5px) scale(1.03)';
  });
  
  btn.addEventListener('mouseleave', function() {
    this.style.transform = '';
  });
}

// Criar efeito de clique
function createClickEffect(x, y) {
  const effect = document.createElement('div');
  effect.style.position = 'fixed';
  effect.style.left = `${x}px`;
  effect.style.top = `${y}px`;
  effect.style.width = '0';
  effect.style.height = '0';
  effect.style.borderRadius = '50%';
  effect.style.background = 'radial-gradient(circle, rgba(34,158,217,0.8) 0%, transparent 70%)';
  effect.style.pointerEvents = 'none';
  effect.style.zIndex = '1000';
  effect.style.transform = 'translate(-50%, -50%)';
  
  document.body.appendChild(effect);
  
  // Animar expansão
  const animation = effect.animate([
    { width: '0', height: '0', opacity: 1 },
    { width: '200px', height: '200px', opacity: 0 }
  ], {
    duration: 600,
    easing: 'ease-out'
  });
  
  animation.onfinish = () => effect.remove();
}

// Adicionar efeitos de brilho aleatório
function addRandomSparkles() {
  const btn = document.querySelector('.telegram-btn');
  const sparklesContainer = btn.querySelector('.btn-sparkles');
  
  setInterval(() => {
    if (Math.random() > 0.7) {
      const sparkle = document.createElement('span');
      sparkle.className = 'sparkle';
      
      // Posição aleatória
      const x = Math.random() * 80 + 10;
      const y = Math.random() * 80 + 10;
      
      sparkle.style.left = `${x}%`;
      sparkle.style.top = `${y}%`;
      
      sparklesContainer.appendChild(sparkle);
      
      // Remover após animação
      setTimeout(() => {
        if (sparkle.parentNode) {
          sparkle.remove();
        }
      }, 2000);
    }
  }, 800);
}

// Verificar se é dispositivo móvel
function isMobile() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Inicializar quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
  // Criar partículas de fundo
  createParticles();
  
  // Configurar efeitos do botão
  setupButtonEffects();
  
  // Adicionar brilhos aleatórios
  addRandomSparkles();
  
  // Otimizar para mobile
  if (isMobile()) {
    // Adicionar feedback tátil para mobile
    const btn = document.querySelector('.telegram-btn');
    
    btn.addEventListener('touchstart', function() {
      this.style.transform = 'scale(0.95)';
    });
    
    btn.addEventListener('touchend', function() {
      setTimeout(() => {
        this.style.transform = '';
      }, 200);
    });
  }
  
  // Garantir que o vídeo toque em mobile
  const video = document.querySelector('video');
  if (video) {
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Se autoplay for bloqueado, tentar com mute
        video.muted = true;
        video.play();
      });
    }
  }
  
  // Adicionar estilos CSS dinâmicos
  const style = document.createElement('style');
  style.textContent = `
    @keyframes float {
      0%, 100% { transform: translateY(0) rotate(0deg); }
      25% { transform: translateY(-20px) rotate(90deg); }
      50% { transform: translateY(0) rotate(180deg); }
      75% { transform: translateY(20px) rotate(270deg); }
    }
    
    @keyframes pulse {
      0%, 100% { opacity: 0.3; }
      50% { opacity: 0.8; }
    }
  `;
  document.head.appendChild(style);
});
