function getPackage() {
  const btn = document.querySelector('.get-package');
  const btnInner = btn.querySelector('.btn-inner');
  
  // Efeito visual de clique
  btn.style.transform = 'translateY(-2px) scale(0.95)';
  btnInner.innerHTML = `
    <div class="btn-loading">
      <div class="spinner"></div>
      <span class="btn-text">Preparing Your Package...</span>
    </div>
  `;
  
  // Criar efeito de partículas
  createClickParticles(btn);
  
  // Redirecionar após delay
  setTimeout(() => {
    window.location.href = "https://t.me/GetYourFoldersHere10_14?start=MegaPromo";
  }, 1200);
}

// Criar partículas para efeito de clique
function createClickParticles(element) {
  const rect = element.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  
  for (let i = 0; i < 15; i++) {
    const particle = document.createElement('div');
    particle.style.position = 'fixed';
    particle.style.width = '8px';
    particle.style.height = '8px';
    particle.style.borderRadius = '50%';
    particle.style.background = i % 2 === 0 ? '#25D366' : '#229ED9';
    particle.style.left = `${centerX}px`;
    particle.style.top = `${centerY}px`;
    particle.style.pointerEvents = 'none';
    particle.style.zIndex = '1000';
    particle.style.boxShadow = '0 0 10px currentColor';
    
    document.body.appendChild(particle);
    
    // Animar partícula
    const angle = Math.random() * Math.PI * 2;
    const speed = 2 + Math.random() * 3;
    const distance = 50 + Math.random() * 100;
    
    const animation = particle.animate([
      { 
        transform: 'translate(0, 0) scale(1)', 
        opacity: 1 
      },
      { 
        transform: `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) scale(0)`, 
        opacity: 0 
      }
    ], {
      duration: 800 + Math.random() * 400,
      easing: 'cubic-bezier(0.1, 0.8, 0.3, 1)'
    });
    
    animation.onfinish = () => particle.remove();
  }
}

// Criar confetti
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
      if (Math.random() > 0.7) { // 30% de chance de criar brilho
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
  
  // Adicionar efeito de digitação no título (opcional)
  const title = document.querySelector('.title-text');
  if (title && !title.dataset.animated) {
    const originalText = title.textContent;
    title.textContent = '';
    title.dataset.animated = 'true';
    
    let i = 0;
    const typeWriter = () => {
      if (i < originalText.length) {
        title.textContent += originalText.charAt(i);
        i++;
        setTimeout(typeWriter, 50);
      }
    };
    
    setTimeout(typeWriter, 1000);
  }
});
