function toggleMenu() {
    const menu = document.getElementById('mobileLinks');
    const overlay = document.getElementById('menuOverlay');

    if (menu && overlay) {
        menu.classList.toggle('open');
        overlay.classList.toggle('show');
    }
}

function acProje(projeId) {
    const icerikler = document.querySelectorAll('.proje-icerik');
    if (icerikler.length > 0) {
        icerikler.forEach(ic => ic.classList.remove('aktif'));

        const secilenProje = document.getElementById(projeId);
        if (secilenProje) {
            secilenProje.classList.add('aktif');
        }

        const butonlar = document.querySelectorAll('.filter-button');
        butonlar.forEach(btn => btn.classList.remove('act'));

        if (event && event.currentTarget) {
            event.currentTarget.classList.add('act');
        }
    }
}

// Proje filtreleme fonksiyonu
function filterProjects(category) {
    // 1. Tüm kartları ve butonları seç
    const cards = document.querySelectorAll('.project-card');
    const buttons = document.querySelectorAll('.filter-btn');

    // 2. Tıklanan butona 'active' sınıfını ver, diğerlerinden kaldır
    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    // 3. Kartları kontrol et ve filtrele
    cards.forEach(card => {
        // Eğer kategori 'all' ise veya kartın class listesinde bu kategori varsa göster
        if (category === 'all' || card.classList.contains(category)) {
            card.classList.remove('hide');
        } else {
            // Uymuyorsa gizle
            card.classList.add('hide');
        }
    });
}