// sidebar.js
// 모든 페이지에서 공통으로 사용하는 사이드바 + 이미지 슬라이더 스크립트

document.addEventListener('DOMContentLoaded', () => {
  // 1) 사이드바 HTML 불러오기
  const sidebarEl = document.getElementById('sidebar');
  if (sidebarEl) {
    fetch('sidebar.html')
      .then((response) => response.text())
      .then((html) => {
        sidebarEl.innerHTML = html;
      })
      .catch((err) => {
        console.error('사이드바 로딩 오류:', err);
      });
  }

  // 2) 이미지 슬라이더 초기화
  const sliders = document.querySelectorAll('[data-slider]');

  sliders.forEach((slider) => {
    const track = slider.querySelector('.image-slider-track');
    const slides = Array.from(slider.querySelectorAll('.image-slide'));
    const btnPrev = slider.querySelector('.image-slider-arrow.prev');
    const btnNext = slider.querySelector('.image-slider-arrow.next');
    const currentEl = slider.querySelector('.image-slider-counter .current');
    const totalEl = slider.querySelector('.image-slider-counter .total');

    if (
      !track ||
      slides.length <= 1 ||
      !btnPrev ||
      !btnNext ||
      !currentEl ||
      !totalEl
    ) {
      return; // 슬라이드가 1장 이하이거나, 요소가 없으면 패스
    }

    let currentIndex = 0;
    const totalSlides = slides.length;
    totalEl.textContent = String(totalSlides);

    function update() {
      // 슬라이드 하나가 100% 폭을 차지하므로, 인덱스로만 이동
      track.style.transform = `translateX(${-currentIndex * 100}%)`;
      currentEl.textContent = String(currentIndex + 1);

      // 맨 앞/뒤에서는 버튼 비활성화 (필요 없으면 주석 처리해도 됨)
      btnPrev.disabled = currentIndex === 0;
      btnNext.disabled = currentIndex === totalSlides - 1;
    }

    btnPrev.addEventListener('click', () => {
      if (currentIndex > 0) {
        currentIndex -= 1;
        update();
      }
    });

    btnNext.addEventListener('click', () => {
      if (currentIndex < totalSlides - 1) {
        currentIndex += 1;
        update();
      }
    });

    // 창 크기 바뀔 때도 현재 인덱스 유지
    window.addEventListener('resize', update);

    update();
  });
});
