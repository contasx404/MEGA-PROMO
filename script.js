function createConfetti() {
  const container = document.querySelector('.confetti-container');
  const colors = ['#25D366', '#229ED9', '#FFD700', '#FF6B6B', '#A8E6CF'];
  
  for (let i = 0; i < 50; i++) {
    const confetti = document.createElement('div');
    confetti.style.position = 'fixed';
    confetti.style.width = `${Math.random() * 10 + 5}px`;
    confetti.style.height = confetti.style.width;
    confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
    confetti.style.left = `${Math.random() * 100}vw`;
    confetti.style.top = '-20px';
    confetti.style.opacity = '0.9';
    confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
    confetti.style.boxShadow = '0 0 5px currentColor';
    
    container.appendChild(confetti);
    
    // Animar confetti
    const animation = confetti.animate([
      { 
        transform: `translate(0, 0) rotate(0deg)`, 
        opacity: 1 
      },
      { 
        transform: `translate(${Math.random() * 100 - 50}px, 100vh) rotate(${Math.random() * 720}deg)`, 
        opacity: 0 
      }
    ], {
      duration: 3000 + Math.random() * 2000,
      delay: Math.random() * 1000,
      easing: 'cubic-bezier(0.1, 0.8, 0.3, 1)'
    });
    
    animation.onfinish = () => confetti.remove();
  }
}

// Adicionar efeitos de brilho aleatório nos botões
function addButtonSparkles() {
  const buttons = document.querySelectorAll('.premium-btn');
  
  buttons.forEach(btn => {
    setInterval(() => {
      if (Math.random() > 0.7) {
        const sparkle = document.createElement('div');
        sparkle.className = 'btn-sparkle';
        
        const rect = btn.getBoundingClientRect();
        sparkle.style.left = `${Math.random() * rect.width}px`;
        sparkle.style.top = `${Math.random() * rect.height}px`;
        
        btn.querySelector('.btn-inner').appendChild(sparkle);
        
        // Animar e remover brilho
        const animation = sparkle.animate([
          { opacity: 0, transform: 'scale(0)' },
          { opacity: 1, transform: 'scale(1)' },
          { opacity: 0, transform: 'scale(0)' }
        ], {
          duration: 800,
          easing: 'ease-out'
        });
        
        animation.onfinish = () => sparkle.remove();
      }
    }, 1000);
  });
}

// Inicializar efeitos quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
  // Criar confetti inicial
  setTimeout(createConfetti, 500);
  setTimeout(createConfetti, 1500);
  
  // Adicionar efeitos de brilho nos botões
  addButtonSparkles();
  
  // Adicionar feedback visual ao clicar
  const buttons = document.querySelectorAll('.btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', function() {
      this.style.opacity = '0.9';
      this.style.transform = 'scale(0.98)';
      
      setTimeout(() => {
        this.style.opacity = '';
        this.style.transform = '';
      }, 200);
    });
  });
  
  // Adicionar efeitos de toque para mobile
  if ('ontouchstart' in window) {
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
      btn.addEventListener('touchstart', function() {
        this.style.transform = 'translateY(-3px) scale(1.02)';
      });
      
      btn.addEventListener('touchend', function() {
        setTimeout(() => {
          this.style.transform = '';
        }, 150);
      });
    });
  }
  
  // Garantir autoplay do vídeo
  const video = document.querySelector('video');
  if (video) {
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        video.muted = true;
        video.play();
      });
    }
  }
});
