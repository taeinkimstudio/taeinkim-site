document.addEventListener('DOMContentLoaded', () => {
  const sliders = document.querySelectorAll('[data-slider]');

  sliders.forEach((slider) => {
    const track = slider.querySelector('.image-slider-track');
    const slides = Array.from(track.querySelectorAll('img'));
    const btnPrev = slider.querySelector('.image-slider-prev');
    const btnNext = slider.querySelector('.image-slider-next');
    const currentSpan = slider.querySelector('.current');
    const totalSpan = slider.querySelector('.total');

    if (!track || slides.length === 0 || !btnPrev || !btnNext) return;

    let index = 0;
    const total = slides.length;

    // 전체 장수 표시
    totalSpan.textContent = total;

    function update() {
      track.style.transform = `translateX(-${index * 100}%)`;
      currentSpan.textContent = index + 1;
    }

    btnPrev.addEventListener('click', () => {
      index = (index - 1 + total) % total;
      update();
    });

    btnNext.addEventListener('click', () => {
      index = (index + 1) % total;
      update();
    });

    // 초기 상태
    update();
  });
});

