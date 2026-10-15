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
    const navLinks = document.querySelectorAll('.nav-links .nav-link');

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