// iOS 100vh helper (address bar) by using --vh
(function(){
  function setVh(){
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }
  setVh();
  window.addEventListener('resize', setVh);
  window.addEventListener('orientationchange', setVh);

  // Scroll progress bar
  const progressBar = document.getElementById('progressBar');
  function updateProgress(){
    const doc = document.documentElement;
    const scrollTop = window.scrollY || doc.scrollTop || 0;
    const scrollHeight = doc.scrollHeight - window.innerHeight;
    const p = scrollHeight > 0 ? (scrollTop / scrollHeight) : 0;
    progressBar.style.width = (p * 100).toFixed(2) + '%';
  }
  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();


  // Hero stat count-up animation
  const heroStatValue = document.getElementById('heroStatValue');
  if (heroStatValue) {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const targetValue = 85;

    if (reducedMotion) {
      heroStatValue.textContent = `${targetValue}%`;
    } else {
      let started = false;
      const duration = 1800;

      const animateHeroStat = () => {
        const start = performance.now();

        const tick = (now) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          const current = Math.round(targetValue * eased);
          heroStatValue.textContent = `${current}%`;

          if (progress < 1) {
            requestAnimationFrame(tick);
          }
        };

        requestAnimationFrame(tick);
      };

      const statObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started) {
            started = true;
            animateHeroStat();
            statObserver.disconnect();
          }
        });
      }, { threshold: 0.6 });

      statObserver.observe(heroStatValue);
    }
  }

  // Reveal on scroll
  const revealEls = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('isVisible');
      }
    });
  }, { threshold: 0.28 });
  revealEls.forEach(el => io.observe(el));
})();
