// slider.js
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-slider]").forEach(setupSlider);
});

function setupSlider(slider) {
  const track = slider.querySelector(".image-slider-track");
  const slides = Array.from(track.querySelectorAll("img"));
  const prevBtn = slider.querySelector(".image-slider-prev");
  const nextBtn = slider.querySelector(".image-slider-next");
  const currentSpan = slider.querySelector(".image-slider-counter .current");
  const totalSpan = slider.querySelector(".image-slider-counter .total");

  let current = 0;
  const total = slides.length;
  totalSpan.textContent = total;

  function update() {
    track.style.transform = `translateX(-${current * 100}%)`;
    currentSpan.textContent = current + 1;
  }

  prevBtn.addEventListener("click", () => {
    current = (current - 1 + total) % total;
    update();
  });

  nextBtn.addEventListener("click", () => {
    current = (current + 1) % total;
    update();
  });

  update();
}
