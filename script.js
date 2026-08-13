(function() {
  AOS.init({ once: false, duration: 800, offset: 20 });

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (prefersReduced.matches) {
    document.body.classList.add('no-animation');
  }

  const images = ['assets/images/1.jpg','assets/images/2.jpg','assets/images/3.jpg','assets/images/4.jpg','assets/images/5.jpg'];
  let currentImg = 0;
  const imgEl = document.getElementById('gallery-img');
  const counter = document.getElementById('gallery-counter');
  const prevBtn = document.getElementById('prevGallery');
  const nextBtn = document.getElementById('nextGallery');
  const endMsg = document.getElementById('gallery-end');

  function updateGallery(direction) {
    if (direction === 'next') {
      if (currentImg >= images.length - 1) return;
      currentImg++;
    } else if (direction === 'prev') {
      if (currentImg <= 0) return;
      currentImg--;
    } else return;

    imgEl.style.opacity = '0';
    imgEl.style.transform = 'scale(0.92)';
    setTimeout(() => {
      imgEl.src = images[currentImg];
      imgEl.style.opacity = '1';
      imgEl.style.transform = 'scale(1)';
      AOS.refresh();
    }, 300);
    counter.textContent = (currentImg+1) + ' / ' + images.length;
    endMsg.style.display = (currentImg === images.length - 1) ? 'block' : 'none';
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', function() { updateGallery('next'); });
    prevBtn.addEventListener('click', function() { updateGallery('prev'); });
    if (imgEl) imgEl.addEventListener('click', function() { updateGallery('next'); });
  }
  if (endMsg) endMsg.style.display = 'none';

  // Envelope logic
  const envelopeWrapper = document.getElementById('envelopeWrapper');
  const letterBtn = document.getElementById('letterBtnWrap');
  if (envelopeWrapper) {
    envelopeWrapper.addEventListener('click', function() {
      this.classList.toggle('open');
      if (letterBtn) letterBtn.style.display = this.classList.contains('open') ? 'block' : 'none';
    });
    if (envelopeWrapper.classList.contains('open') && letterBtn) {
      letterBtn.style.display = 'block';
    }
  }

  document.querySelectorAll('.reveal-card').forEach(card => {
    card.addEventListener('click', function(e) {
      e.stopPropagation();
      this.classList.toggle('revealed');
    });
  });

  AOS.refresh();
})();