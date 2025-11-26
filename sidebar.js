// sidebar.js : 모든 페이지에서 공통 사이드바를 불러와서 삽입
document.addEventListener("DOMContentLoaded", function () {
  const sidebar = document.getElementById("sidebar");
  if (!sidebar) return;

  fetch("sidebar.html")
    .then((response) => response.text())
    .then((html) => {
      sidebar.innerHTML = html;
    })
    .catch((error) => {
      console.error("Sidebar load error:", error);
    });
});
// sidebar.js

// 1) 사이드바 HTML 불러오기
document.addEventListener('DOMContentLoaded', () => {
  const sidebarEl = document.getElementById('sidebar');
  if (sidebarEl) {
    fetch('sidebar.html')
      .then(res => res.text())
      .then(html => {
        sidebarEl.innerHTML = html;
      })
      .catch(err => console.error('Sidebar load error:', err));
  }

  // 2) 이미지 슬라이더 초기화
 // ----- Image slider -----
document.addEventListener('DOMContentLoaded', function () {
  const sliders = document.querySelectorAll('[data-slider]');

  sliders.forEach(function (slider) {
    const track = slider.querySelector('.image-slider-track');
    const slides = Array.from(track.querySelectorAll('.slide'));
    const btnPrev = slider.querySelector('.image-slider-prev');
    const btnNext = slider.querySelector('.image-slider-next');
    const currentEl = slider.querySelector('.current');
    const totalEl = slider.querySelector('.total');

    if (!slides.length) return;

    let currentIndex = 0;
    totalEl.textContent = slides.length;

    function update() {
      const offset = -currentIndex * 100; // 퍼센트 기준 이동
      track.style.transform = `translateX(${offset}%)`;
      currentEl.textContent = currentIndex + 1;
    }

    btnPrev.addEventListener('click', function () {
      if (currentIndex > 0) {
        currentIndex--;
        update();
      }
    });

    btnNext.addEventListener('click', function () {
      if (currentIndex < slides.length - 1) {
        currentIndex++;
        update();
      }
    });

    window.addEventListener('resize', update);
    update();
  });
});
