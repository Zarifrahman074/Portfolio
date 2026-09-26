(function () {
  document.documentElement.classList.remove('no-js');

  var header = document.getElementById('siteHeader');
  var navToggle = document.getElementById('navToggle');
  var navMobile = document.getElementById('navMobile');
  var progressBar = document.getElementById('progressBar');
  var backToTop = document.getElementById('backToTop');
  var yearEl = document.getElementById('year');

  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------------- Header scroll state + progress bar ---------------- */
  function onScroll() {
    var scrollY = window.scrollY || window.pageYOffset;
    header.classList.toggle('scrolled', scrollY > 20);

    var docHeight = document.documentElement.scrollHeight - window.innerHeight;
    var pct = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;
    if (progressBar) progressBar.style.width = pct + '%';
  }
  document.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------------- Mobile nav toggle ---------------- */
  if (navToggle && navMobile) {
    navToggle.addEventListener('click', function () {
      var isOpen = navMobile.classList.toggle('open');
      navToggle.classList.toggle('open', isOpen);
      navToggle.setAttribute('aria-expanded', isOpen);
    });

    navMobile.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navMobile.classList.remove('open');
        navToggle.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------------- Back to top ---------------- */
  if (backToTop) {
    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------------- Scroll-spy active nav link ---------------- */
  var sections = document.querySelectorAll('main section[id]');
  var navLinks = document.querySelectorAll('.nav-link');

  function setActiveLink(id) {
    navLinks.forEach(function (link) {
      link.classList.toggle('active', link.getAttribute('href') === '#' + id);
    });
  }

  if ('IntersectionObserver' in window && sections.length) {
    var spyObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) setActiveLink(entry.target.id);
      });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

    sections.forEach(function (sec) { spyObserver.observe(sec); });
  }

  /* ---------------- Animated stat counters ---------------- */
  function animateCounter(el) {
    var target = parseFloat(el.getAttribute('data-target'), 10) || 0;
    var prefix = el.getAttribute('data-prefix') || '';
    var suffix = el.getAttribute('data-suffix') || '';
    var obj = { val: 0 };

    if (window.gsap) {
      gsap.to(obj, {
        val: target,
        duration: 1.6,
        ease: 'power2.out',
        onUpdate: function () {
          el.textContent = prefix + Math.round(obj.val).toLocaleString() + suffix;
        }
      });
    } else {
      el.textContent = prefix + target.toLocaleString() + suffix;
    }
  }

  var counters = document.querySelectorAll('.stat-number');
  if ('IntersectionObserver' in window && counters.length) {
    var counterObserver = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.6 });

    counters.forEach(function (c) { counterObserver.observe(c); });
  } else {
    counters.forEach(animateCounter);
  }

  /* ---------------- Case study accordion ---------------- */
  document.querySelectorAll('[data-case]').forEach(function (card) {
    var summary = card.querySelector('.case-summary');
    var body = card.querySelector('.case-body');

    summary.addEventListener('click', function () {
      var isOpen = card.classList.contains('open');

      if (isOpen) {
        if (window.gsap) {
          gsap.to(body, { height: 0, duration: 0.35, ease: 'power2.inOut' });
        } else {
          body.style.height = '0px';
        }
        card.classList.remove('open');
        summary.setAttribute('aria-expanded', 'false');
      } else {
        card.classList.add('open');
        summary.setAttribute('aria-expanded', 'true');
        if (window.gsap) {
          gsap.set(body, { height: 'auto' });
          var autoHeight = body.offsetHeight;
          gsap.fromTo(body, { height: 0 }, { height: autoHeight, duration: 0.4, ease: 'power2.out' });
        } else {
          body.style.height = 'auto';
        }
      }
    });
  });

  /* ---------------- GSAP scroll reveals ---------------- */
  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);

    var heroReveals = document.querySelectorAll('.hero .reveal');
    gsap.timeline({ defaults: { ease: 'power3.out' } })
      .to(heroReveals, { opacity: 1, y: 0, duration: 0.9, stagger: 0.12 });

    document.querySelectorAll('.section .reveal, .stats-strip.reveal').forEach(function (el) {
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      });
    });

    gsap.utils.toArray('.timeline-item').forEach(function (item, i) {
      gsap.from(item.querySelector('.timeline-dot'), {
        scale: 0,
        duration: 0.5,
        ease: 'back.out(2)',
        scrollTrigger: { trigger: item, start: 'top 80%' }
      });
    });
  } else {
    // Fallback: reveal everything immediately if GSAP fails to load
    document.querySelectorAll('.reveal').forEach(function (el) {
      el.style.opacity = 1;
      el.style.transform = 'none';
    });
  }
})();
