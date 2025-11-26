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
  initImageSliders();
});

function initImageSliders() {
  const sliders = document.querySelectorAll('[data-slider]');
  if (!sliders.length) return;

  sliders.forEach(setupSlider);
}

function setupSlider(slider) {
  const track = slider.querySelector('.image-slider-track');
  const imgs = Array.from(track.querySelectorAll('img'));

  if (!imgs.length) return;

  const prevBtn = slider.querySelector('.image-slider-prev');
  const nextBtn = slider.querySelector('.image-slider-next');
  const currentSpan = slider.querySelector('.current');
  const totalSpan = slider.querySelector('.total');

  let index = 0;
  const total = imgs.length;
  totalSpan.textContent = total;

  // 스타일 세팅
  track.style.display = 'flex';
  track.style.transition = 'transform 0.4s ease';
  imgs.forEach(img => {
    img.style.width = '100%';
    img.style.flexShrink = '0';
    img.loading = 'lazy';
  });

  function update() {
    track.style.transform = `translateX(-${index * 100}%)`;
    currentSpan.textContent = index + 1;
  }

  prevBtn.addEventListener('click', () => {
    index = (index - 1 + total) % total;
    update();
  });

  nextBtn.addEventListener('click', () => {
    index = (index + 1) % total;
    update();
  });

  update();
}
