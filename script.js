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

        const butonlar = document.querySelectorAll('.filter-item');
        butonlar.forEach(btn => btn.classList.remove('active'));
        
        if (event && event.currentTarget) {
            event.currentTarget.classList.add('active');
        }
    }
}