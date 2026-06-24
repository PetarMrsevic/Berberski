(function () {

  /** Onemogući browser scroll restoration */
  history.scrollRestoration = 'manual';

  /** Vrati na vrh pri refreshu i ukloni hash iz URL-a */
  if (window.location.hash) {
    history.replaceState(null, null, ' ');
  }
  window.scrollTo(0, 0);

  /** Dodaj .scrolled klasu na body pri skrolovanju */
  function toggleScrolled() {
    const header = document.querySelector('#header');
    if (
      !header.classList.contains('scroll-up-sticky') &&
      !header.classList.contains('sticky-top') &&
      !header.classList.contains('fixed-top')
    ) return;
    document.body.classList.toggle('scrolled', window.scrollY > 100);
  }

  /** Scroll top dugme */
  const scrollTopBtn = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTopBtn) {
      scrollTopBtn.classList.toggle('active', window.scrollY > 100);
    }
  }

  scrollTopBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /** Navmenu scrollspy */
  const navmenuLinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    const position = window.scrollY + 200;
    navmenuLinks.forEach(link => {
      if (!link.hash) return;
      const section = document.querySelector(link.hash);
      if (!section) return;
      const inView = position >= section.offsetTop && position <= section.offsetTop + section.offsetHeight;
      link.classList.toggle('active', inView);
    });
  }

  /** Throttled scroll handler za sve scroll funkcije */
  let ticking = false;
  document.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        toggleScrolled();
        toggleScrollTop();
        navmenuScrollspy();
        ticking = false;
      });
      ticking = true;
    }
  });

  window.addEventListener('load', () => {
    toggleScrolled();
    toggleScrollTop();
    navmenuScrollspy();
  });

  /** Mobile nav toggle */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToggle() {
    document.body.classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }

  mobileNavToggleBtn?.addEventListener('click', mobileNavToggle);

  document.querySelectorAll('#navmenu a').forEach(link => {
    link.addEventListener('click', () => {
      if (document.body.classList.contains('mobile-nav-active')) {
        mobileNavToggle();
      }
    });
  });

  /** Preloader */
  const preloader = document.querySelector('#preloader');
  window.addEventListener('load', () => preloader?.remove());

  /** AOS animacije */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  });

  /** PureCounter */
  new PureCounter();

  /** FAQ toggle */
  document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle').forEach(item => {
    item.addEventListener('click', () => {
      item.parentNode.classList.toggle('faq-active');
    });
  });

  /** Scroll na hash pri loadu */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      const section = document.querySelector(window.location.hash);
      if (section) {
        setTimeout(() => {
          const scrollMarginTop = parseInt(getComputedStyle(section).scrollMarginTop);
          window.scrollTo({ top: section.offsetTop - scrollMarginTop, behavior: 'smooth' });
        }, 100);
      }
    }
  });

  /** Gallery switcher */
  const galleryButtons = document.querySelectorAll('.gallery-type-button');
  const galleries = document.querySelectorAll('.mobile-gallery, .mobile-gallery-active');

  galleryButtons.forEach((btn, index) => {
    btn.addEventListener('click', () => {
      galleryButtons.forEach(b => b.classList.remove('gallery-type-button-active'));
      galleries.forEach(g => {
        g.classList.remove('mobile-gallery-active');
        g.classList.add('mobile-gallery');
      });
      btn.classList.add('gallery-type-button-active');
      galleries[index]?.classList.replace('mobile-gallery', 'mobile-gallery-active');
    });
  });

  /** Swiper */
  document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.js-swiper').forEach(el => {
    const isWorkers = el.closest('.workers');
    const isPromos = el.closest('.promos-wrap');

    new Swiper(el, {
      loop: isPromos ? true : false,
      speed: 1000,
      slidesPerView: 1,
      spaceBetween: 20,
      autoplay: isPromos ? {
        delay: 5000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
        freeMode: true
      } : false,
      pagination: { el: el.querySelector('.swiper-pagination'), clickable: true },
      navigation: {
        nextEl: el.querySelector('.swiper-button-next'),
        prevEl: el.querySelector('.swiper-button-prev'),
      },
      breakpoints: isWorkers ? {
        992: { slidesPerView: 3, spaceBetween: 30 }
      } : isPromos ? {
        768: { slidesPerView: 2 },
        992: { slidesPerView: 4, spaceBetween: 0 }
      } : {}
    });
  });
});

})();