// sidebar.js
// 모든 페이지에서 공통으로 사용하는 사이드바 + 이미지 슬라이더 스크립트

document.addEventListener('DOMContentLoaded', () => {
  /* ---------------------------
     1. 사이드바 로드
  ---------------------------- */
  const sidebar = document.getElementById('sidebar');

  if (sidebar) {
    fetch('sidebar.html')
      .then((response) => response.text())
      .then((html) => {
        sidebar.innerHTML = html;
      })
      .catch((error) => {
        console.error('Sidebar load error:', error);
      });
  }

  /* ---------------------------
     2. 이미지 슬라이더
     - .image-slider[data-slider] 안의
       .image-slider-track > img 들을 순환
     - .image-slider-counter 안의
       .current / .total / .image-slider-prev / .image-slider-next 사용
  ---------------------------- */

  const sliders = document.querySelectorAll('[data-slider]');

  sliders.forEach((slider) => {
    const track = slider.querySelector('.image-slider-track');
    if (!track) return;

    // 각 슬라이더 안의 모든 이미지
    const slides = Array.from(track.querySelectorAll('img'));
    if (!slides.length) return;

    const counter = slider.querySelector('.image-slider-counter');
    if (!counter) return;

    const btnPrev = counter.querySelector('.image-slider-prev');
    const btnNext = counter.querySelector('.image-slider-next');
    const currentSpan = counter.querySelector('.current');
    const totalSpan = counter.querySelector('.total');

    if (!btnPrev || !btnNext || !currentSpan || !totalSpan) return;

    let currentIndex = 0;
    const total = slides.length;
    totalSpan.textContent = String(total);

    function updateSlide() {
      slides.forEach((img, idx) => {
        if (idx === currentIndex) {
          img.classList.add('is-active');
        } else {
          img.classList.remove('is-active');
        }
      });

      currentSpan.textContent = String(currentIndex + 1);
    }

    // 이전 버튼 (0에서 뒤로 가면 마지막으로)
    btnPrev.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + total) % total;
      updateSlide();
    });

    // 다음 버튼 (마지막에서 앞으로 가면 첫 번째로)
    btnNext.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % total;
      updateSlide();
    });

    // 초기 상태: 첫 번째 이미지 보이게
    updateSlide();
  });
});

