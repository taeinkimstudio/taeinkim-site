// sidebar.js
// 모든 페이지에서 공통으로 사용하는 사이드바 + 이미지 슬라이더 스크립트

// sidebar.js

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
     .image-slider[data-slider] 안에
     - .image-slider-track  (img 여러 장)
     - .image-slider-prev / .image-slider-next  (버튼)
     - .current / .total   (카운트)
  ---------------------------- */

  const sliders = document.querySelectorAll('[data-slider]');

  sliders.forEach((slider) => {
    const track = slider.querySelector('.image-slider-track');
    const slides = track ? Array.from(track.querySelectorAll('img')) : [];
    const btnPrev = slider.querySelector('.image-slider-prev');
    const btnNext = slider.querySelector('.image-slider-next');
    const currentSpan = slider.querySelector('.current');
    const totalSpan = slider.querySelector('.total');

    if (!track || slides.length === 0 || !btnPrev || !btnNext || !currentSpan || !totalSpan) {
      return;
    }

    let currentIndex = 0;

    // 전체 개수 표시
    totalSpan.textContent = String(slides.length);

    function updateSlider() {
      const slideWidth = slides[0].getBoundingClientRect().width;
      track.style.transform = `translateX(${-currentIndex * slideWidth}px)`;
      currentSpan.textContent = String(currentIndex + 1);
      // 버튼은 비활성화하지 않아서 색이 변하지 않음 (계속 loop)
    }

    btnPrev.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + slides.length) % slides.length; // 뒤로 가도 loop
      updateSlider();
    });

    btnNext.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % slides.length; // 앞으로 가도 loop
      updateSlider();
    });

    window.addEventListener('resize', updateSlider);

    updateSlider();
  });
});

  // ----- 이미지 슬라이더 초기화 -----
  document.querySelectorAll('[data-slider]').forEach(setupSlider);
});

// DOMContentLoaded 바깥에 아래 함수들을 추가
function setupSlider(slider) {
  const track = slider.querySelector('.image-slider-track');
  const slides = Array.from(track.querySelectorAll('img'));
  const container = slider.parentElement; // slider의 부모 (project-section)
  const counter = container.querySelector('.image-slider-counter');
  const btnPrev = counter.querySelector('.image-slider-prev');
  const btnNext = counter.querySelector('.image-slider-next');
  const currentSpan = counter.querySelector('.current');
  const totalSpan = counter.querySelector('.total');

  if (!slides.length) return;

  let currentIndex = 0;
  const total = slides.length;
  totalSpan.textContent = total;

  function updateSlide() {
    slides.forEach((img, idx) => {
      img.classList.toggle('is-active', idx === currentIndex);
    });
    currentSpan.textContent = currentIndex + 1;
  }

  updateSlide();

  btnPrev.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + total) % total; // 0에서 뒤로 가면 마지막으로
    updateSlide();
  });

  btnNext.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % total; // 마지막에서 앞으로 가면 0으로
    updateSlide();
  });
}

