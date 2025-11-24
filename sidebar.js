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
