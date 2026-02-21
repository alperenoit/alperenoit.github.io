const navbarHTML = `
    <div class="desktop-view">
        <div class="navbar">
            <div class="isim"><a href="index.html">Portfolyo</a></div>
            <div class="social-links">
                <a href="https://github.com/alperenoit" target="_blank"><i class="fab fa-github"></i></a>
                <a href="https://www.instagram.com/artulatif/" target="_blank"><i class="fab fa-instagram"></i></a>
                <a href="https://www.linkedin.com/in/mesut-alperen-kir-01920a2a7/" target="_blank"><i class="fab fa-linkedin"></i></a>
            </div>
            <ul>
                <li><a href="index.html" id="nav-index">Ana Sayfa</a></li>
                <li><a href="programlarim.html" id="nav-programlar">Programlarım</a></li>
                <li><a href="oyunlarim.html" id="nav-oyunlar">Oyunlarım</a></li>
                <li><a href="projelerim.html" id="nav-projeler">3D Projelerim</a></li>
            </ul>
        </div>
    </div>

    <div class="mobile-view">
        <div class="mobile-navbar">
            <div class="mobile-isim"><a href="index.html">Portfolyo</a></div>
            <div class="hamburger" onclick="toggleMenu()">
                <span></span><span></span><span></span>
            </div>
        </div>
        <div id="menuOverlay" class="menu-overlay" onclick="toggleMenu()"></div>
        <div id="mobileLinks" class="mobile-links">
            <a href="index.html" id="mob-index">Ana Sayfa</a>
            <a href="programlarim.html" id="mob-programlar">Programlarım</a>
            <a href="oyunlarim.html" id="mob-oyunlar">Oyunlarım</a>
            <a href="projelerim.html" id="mob-projeler">3D Projelerim</a>
            
            <div class="mobile-social-links">
                <a href="https://github.com/alperenoit" target="_blank"><i class="fab fa-github"></i></a>
                <a href="https://www.instagram.com/artulatif/" target="_blank"><i class="fab fa-instagram"></i></a>
                <a href="https://www.linkedin.com/in/mesut-alperen-kir-01920a2a7/" target="_blank"><i class="fab fa-linkedin"></i></a>
            </div>
        </div>
    </div>
`;

document.addEventListener("DOMContentLoaded", function() {
    const placeholder = document.getElementById("navbar-placeholder");
    if (placeholder) {
        placeholder.innerHTML = navbarHTML;
    }
});