// Sayfa yüklendiğinde otomatik olarak çalışacak sistem (DOM Manipülasyonu)
document.addEventListener('DOMContentLoaded', () => {

    // 1. Sayfadaki tüm görsel kaydırma alanlarını bul
    const sliders = document.querySelectorAll('.card-image-slider');

    // 2. Her bir alanı tek tek kontrol et
    sliders.forEach(slider => {
        const imageCount = slider.querySelectorAll('img').length;

        // 3. Sadece 1'den fazla görsel varsa okları ve sistemi kur
        if (imageCount > 1) {

            // Sarıcı (wrapper) ana div oluştur
            const wrapper = document.createElement('div');
            wrapper.className = 'slider-wrapper';

            // Sarıcıyı HTML'de slider'ın olduğu yere yerleştir ve slider'ı içine al
            slider.parentNode.insertBefore(wrapper, slider);
            wrapper.appendChild(slider);

            // Sol ok butonunu oluştur
            const leftBtn = document.createElement('button');
            leftBtn.className = 'slide-btn left-btn';
            leftBtn.innerHTML = '<i class="fas fa-chevron-left"></i>';
            leftBtn.onclick = function () { slide(this, -1); };

            // Sağ ok butonunu oluştur
            const rightBtn = document.createElement('button');
            rightBtn.className = 'slide-btn right-btn';
            rightBtn.innerHTML = '<i class="fas fa-chevron-right"></i>';
            rightBtn.onclick = function () { slide(this, 1); };

            // Butonları sarıcının içine yerleştir
            wrapper.insertBefore(leftBtn, slider);
            wrapper.appendChild(rightBtn);
        }
    });
});

// Görsel kaydırma ve döngü (loop) fonksiyonu
function slide(button, direction) {
    const wrapper = button.parentElement;
    const slider = wrapper.querySelector('.card-image-slider');

    const scrollAmount = slider.clientWidth; // Tek bir görselin ekrandaki genişliği
    const maxScrollLeft = slider.scrollWidth - slider.clientWidth; // Kaydırılabilecek maksimum alan

    // Sola tıklanıyorsa VE kaydırma çubuğu en baştaysa
    if (direction === -1 && slider.scrollLeft <= 5) {
        // En sona zıpla
        slider.scrollTo({
            left: maxScrollLeft,
            behavior: 'smooth'
        });
    }
    // Sağa tıklanıyorsa VE kaydırma çubuğu en sondaysa
    else if (direction === 1 && slider.scrollLeft >= maxScrollLeft - 5) {
        // En başa zıpla
        slider.scrollTo({
            left: 0,
            behavior: 'smooth'
        });
    }
    // Ortadaki görsellerdeysek normal kaydırmaya devam et
    else {
        slider.scrollBy({
            left: scrollAmount * direction,
            behavior: 'smooth'
        });
    }
}

// Proje kategori filtreleme fonksiyonu
function filterProjects(category) {
    const cards = document.querySelectorAll('.project-card');
    const buttons = document.querySelectorAll('.filter-btn');

    // Tıklanan butonu aktif yap
    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    // Kartları kontrol et ve filtrele
    cards.forEach(card => {
        if (category === 'all' || card.classList.contains(category)) {
            card.classList.remove('hide');
        } else {
            card.classList.add('hide');
        }
    });
}