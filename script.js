/**
 * MESUT ALPEREN KIR — PORTFOLYO
 * Modern & İnteraktif JavaScript İşlevleri
 */

document.addEventListener('DOMContentLoaded', () => {
    initCarousels();
    initProjectFilters();
    initMobileMenu();
    initEmailCopy();
    initBackToTop();
    initScrollSpy();
    initAccessibilityWidget();
});

/* ---------------------------------------------------------
   1. GÖRSEL CAROUSEL / SLIDER SİSTEMİ
   --------------------------------------------------------- */
function initCarousels() {
    const carousels = document.querySelectorAll('[data-carousel]');

    carousels.forEach(carousel => {
        const track = carousel.querySelector('.carousel-track');
        const images = track ? track.querySelectorAll('img') : [];
        const total = images.length;
        const counter = carousel.querySelector('.carousel-counter');

        if (total <= 1) {
            // Tek görsel varsa sayacı ve okları gizle
            if (counter) counter.style.display = 'none';
            return;
        }

        // Sol Ok Butonu
        const prevBtn = document.createElement('button');
        prevBtn.className = 'carousel-btn carousel-prev';
        prevBtn.setAttribute('aria-label', 'Önceki Görsel');
        prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i>';

        // Sağ Ok Butonu
        const nextBtn = document.createElement('button');
        nextBtn.className = 'carousel-btn carousel-next';
        nextBtn.setAttribute('aria-label', 'Sonraki Görsel');
        nextBtn.innerHTML = '<i class="fas fa-chevron-right"></i>';

        carousel.appendChild(prevBtn);
        carousel.appendChild(nextBtn);

        // Kaydırma Olayı
        prevBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            scrollCarousel(track, -1, total, counter);
        });

        nextBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            scrollCarousel(track, 1, total, counter);
        });

        // Kullanıcı elle kaydırdığında sayacı güncelle
        track.addEventListener('scroll', () => {
            updateCounter(track, total, counter);
        }, { passive: true });
    });
}

function scrollCarousel(track, direction, total, counter) {
    const slideWidth = track.clientWidth;
    const maxScroll = track.scrollWidth - track.clientWidth;
    const currentScroll = track.scrollLeft;

    // En başa veya en sona sarma (loop)
    if (direction === -1 && currentScroll <= 5) {
        track.scrollTo({ left: maxScroll, behavior: 'smooth' });
    } else if (direction === 1 && currentScroll >= maxScroll - 5) {
        track.scrollTo({ left: 0, behavior: 'smooth' });
    } else {
        track.scrollBy({ left: slideWidth * direction, behavior: 'smooth' });
    }
}

function updateCounter(track, total, counter) {
    if (!counter) return;
    const slideWidth = track.clientWidth || 1;
    const currentIndex = Math.round(track.scrollLeft / slideWidth) + 1;
    const safeIndex = Math.min(Math.max(currentIndex, 1), total);
    counter.textContent = `${safeIndex} / ${total}`;
}

/* ---------------------------------------------------------
   2. PROJE KATEGORİ FİLTRELEME
   --------------------------------------------------------- */
function initProjectFilters() {
    const filterTabs = document.querySelectorAll('.filter-tab');
    const projectCards = document.querySelectorAll('.project-card');

    filterTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            filterTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const category = tab.getAttribute('data-category');

            projectCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                if (category === 'all' || cardCategory === category) {
                    card.classList.remove('hide');
                } else {
                    card.classList.add('hide');
                }
            });
        });
    });
}

/* ---------------------------------------------------------
   3. MOBİL MENÜ (HAMBURGER)
   --------------------------------------------------------- */
function initMobileMenu() {
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');

    if (!hamburgerBtn || !mobileMenu) return;

    hamburgerBtn.addEventListener('click', () => {
        hamburgerBtn.classList.toggle('open');
        mobileMenu.classList.toggle('active');
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburgerBtn.classList.remove('open');
            mobileMenu.classList.remove('active');
        });
    });
}

/* ---------------------------------------------------------
   4. E-POSTA KOPYALAMA & TOAST BİLDİRİMİ
   --------------------------------------------------------- */
function initEmailCopy() {
    const copyBtn = document.getElementById('copyEmailBtn');
    const toast = document.getElementById('toastNotification');
    const email = 'mesutalperenkir52@gmail.com';

    if (!copyBtn) return;

    copyBtn.addEventListener('click', async () => {
        try {
            await navigator.clipboard.writeText(email);
            showToast();
        } catch (err) {
            // Geriye dönük uyumluluk
            const tempInput = document.createElement('input');
            tempInput.value = email;
            document.body.appendChild(tempInput);
            tempInput.select();
            document.execCommand('copy');
            document.body.removeChild(tempInput);
            showToast();
        }
    });

    function showToast() {
        if (!toast) return;
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 2800);
    }
}

/* ---------------------------------------------------------
   5. SAYFA BAŞINA DÖN (BACK TO TOP)
   --------------------------------------------------------- */
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTopBtn');
    if (!backToTopBtn) return;

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/* ---------------------------------------------------------
   6. SCROLLSPY (AKTİF MENÜ TAKİBİ)
   --------------------------------------------------------- */
function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-list .nav-link');

    window.addEventListener('scroll', () => {
        let currentSectionId = '';
        const scrollPosition = window.pageYOffset + 140;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    }, { passive: true });
}

/* ---------------------------------------------------------
   7. ERİŞİLEBİLİRLİK VE GÖRÜNÜM ARACI (TEMA & ÖLÇEKLENDİRME)
   --------------------------------------------------------- */
function initAccessibilityWidget() {
    const widget = document.getElementById('a11yWidget');
    const toggleBtn = document.getElementById('a11yToggleBtn');
    const panel = document.getElementById('a11yPanel');
    const resetBtn = document.getElementById('a11yResetBtn');
    const themeBtns = document.querySelectorAll('[data-theme-choice]');
    const scaleDownBtn = document.getElementById('scaleDownBtn');
    const scaleResetBtn = document.getElementById('scaleResetBtn');
    const scaleUpBtn = document.getElementById('scaleUpBtn');
    const scaleValueDisplay = document.getElementById('a11yScaleValue');

    if (!widget || !toggleBtn || !panel) return;

    const scaleSteps = [90, 100, 110, 120, 130];
    let currentTheme = localStorage.getItem('mak_theme') || 'light';
    let currentScale = parseInt(localStorage.getItem('mak_scale') || '100', 10);

    if (!scaleSteps.includes(currentScale)) {
        currentScale = 100;
    }

    // Başlangıç ayarlarını uygula
    applyTheme(currentTheme);
    applyScale(currentScale);

    // Paneli aç / kapat
    toggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = panel.classList.toggle('open');
        toggleBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        panel.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
    });

    // Dışarı tıklandığında paneli kapat
    document.addEventListener('click', (e) => {
        if (!widget.contains(e.target) && panel.classList.contains('open')) {
            panel.classList.remove('open');
            toggleBtn.setAttribute('aria-expanded', 'false');
            panel.setAttribute('aria-hidden', 'true');
        }
    });

    // ESC tuşuna basıldığında kapat
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && panel.classList.contains('open')) {
            panel.classList.remove('open');
            toggleBtn.setAttribute('aria-expanded', 'false');
            panel.setAttribute('aria-hidden', 'true');
            toggleBtn.focus();
        }
    });

    // Tema butonları
    themeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const chosenTheme = btn.getAttribute('data-theme-choice');
            currentTheme = chosenTheme;
            applyTheme(currentTheme);
            localStorage.setItem('mak_theme', currentTheme);
        });
    });

    // Ölçeklendirme butonları
    if (scaleDownBtn) {
        scaleDownBtn.addEventListener('click', () => {
            const idx = scaleSteps.indexOf(currentScale);
            if (idx > 0) {
                currentScale = scaleSteps[idx - 1];
                applyScale(currentScale);
                localStorage.setItem('mak_scale', String(currentScale));
            }
        });
    }

    if (scaleResetBtn) {
        scaleResetBtn.addEventListener('click', () => {
            currentScale = 100;
            applyScale(currentScale);
            localStorage.setItem('mak_scale', '100');
        });
    }

    if (scaleUpBtn) {
        scaleUpBtn.addEventListener('click', () => {
            const idx = scaleSteps.indexOf(currentScale);
            if (idx < scaleSteps.length - 1) {
                currentScale = scaleSteps[idx + 1];
                applyScale(currentScale);
                localStorage.setItem('mak_scale', String(currentScale));
            }
        });
    }

    // Tüm ayarları sıfırla
    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            currentTheme = 'light';
            currentScale = 100;
            applyTheme(currentTheme);
            applyScale(currentScale);
            localStorage.removeItem('mak_theme');
            localStorage.removeItem('mak_scale');
        });
    }

    function applyTheme(theme) {
        if (theme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
        } else {
            document.documentElement.removeAttribute('data-theme');
        }

        themeBtns.forEach(btn => {
            if (btn.getAttribute('data-theme-choice') === theme) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }

    function applyScale(scalePercent) {
        // Kök font boyutunu (16px baz alınarak) güncelle
        const basePx = (16 * scalePercent) / 100;
        document.documentElement.style.fontSize = `${basePx}px`;

        if (scaleValueDisplay) {
            scaleValueDisplay.textContent = `%${scalePercent}`;
        }

        if (scaleResetBtn) {
            if (scalePercent === 100) {
                scaleResetBtn.classList.add('active');
            } else {
                scaleResetBtn.classList.remove('active');
            }
        }
    }
}