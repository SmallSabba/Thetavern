document.addEventListener("DOMContentLoaded", () => {

    currentPage = document.location.pathname.replace("/", "").replace(".html", "");

    importNavBar();
});