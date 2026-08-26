/* =========================================================
   CHIRAG KASHYAP — Portfolio
   Vanilla JS. No dependencies. No build step.
   ========================================================= */
(() => {
  'use strict';

  const $  = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const lerp  = (a, b, t) => a + (b - a) * t;

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isTouch = window.matchMedia('(hover: none)').matches;

  /* =======================================================
     1. SPLIT HERO LETTERS
     ======================================================= */
  const splitTitle = () => {
    let i = 0;
    $$('.hero__title .w').forEach(word => {
      const text = word.dataset.text || '';
      word.innerHTML = [...text]
        .map(ch => `<span class="ltr" style="--li:${i++}">${ch}</span>`)
        .join('');
    });
  };
  splitTitle();

  /* =======================================================
     1b. RENDER GALLERY + CERTIFICATES FROM data.js
     ======================================================= */
  const esc = (s = '') => String(s).replace(/[&<>"]/g, c =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  const galleryEl = $('#gallery');
  const filtersEl = $('#filters');
  const certGrid  = $('#certgrid');

  /* ---- work gallery ---- */
  if (galleryEl && typeof WORK !== 'undefined') {
    galleryEl.innerHTML = WORK.map((w, i) => {
      const label = (typeof CATEGORIES !== 'undefined' && CATEGORIES[w.category]) || w.category;
      const chips = (w.tags || []).map(t => `<li>${esc(t)}</li>`).join('');
      const link  = w.url
        ? `<a class="gcard__link" href="${esc(w.url)}" target="_blank" rel="noopener" data-cursor="link">Visit <span>↗</span></a>`
        : '';
      const repo  = w.repo
        ? `<a class="gcard__link gcard__link--alt" href="${esc(w.repo)}" target="_blank" rel="noopener" data-cursor="link">Code <span>↗</span></a>`
        : '';
      return `
        <article class="gcard reveal" data-cat="${esc(w.category)}" data-tilt style="--d:${(i % 3) * 70}ms">
          <div class="gcard__inner">
            <div class="gcard__media" data-glyph="${esc(label)}">
              <span class="gcard__badge">${esc(label)}</span>
              <img src="${esc(w.img)}" alt="${esc(w.title)}" loading="lazy" />
            </div>
            <div class="gcard__body">
              <h3>${esc(w.title)}</h3>
              <p>${esc(w.desc)}</p>
              <div class="gcard__foot">
                <ul class="chips">${chips}</ul>
                <span class="gcard__links">${repo}${link}</span>
              </div>
            </div>
          </div>
        </article>`;
    }).join('');

    // placeholder when a screenshot isn't uploaded yet
    $$('.gcard__media img', galleryEl).forEach(img => {
      const kill = () => { img.parentElement.classList.add('noimg'); img.remove(); };
      img.addEventListener('error', kill);
      if (img.complete && img.naturalWidth === 0) kill();
    });

    /* ---- filter chips (counts computed from the data) ---- */
    if (filtersEl) {
      const counts = WORK.reduce((a, w) => (a[w.category] = (a[w.category] || 0) + 1, a), {});
      const order  = Object.keys(typeof CATEGORIES !== 'undefined' ? CATEGORIES : counts)
                           .filter(k => counts[k]);

      filtersEl.innerHTML =
        `<button class="fbtn on" data-filter="all">All <em>${WORK.length}</em></button>` +
        order.map(k =>
          `<button class="fbtn" data-filter="${esc(k)}">${esc(CATEGORIES[k])} <em>${counts[k]}</em></button>`
        ).join('');

      const gcards = $$('.gcard', galleryEl);

      filtersEl.addEventListener('click', e => {
        const btn = e.target.closest('.fbtn');
        if (!btn) return;
        $$('.fbtn', filtersEl).forEach(b => b.classList.toggle('on', b === btn));

        const f = btn.dataset.filter;
        gcards.forEach(c => {
          const match = f === 'all' || c.dataset.cat === f;
          if (match) {
            c.classList.remove('gone');
            requestAnimationFrame(() => c.classList.remove('hide'));
          } else {
            c.classList.add('hide');
            setTimeout(() => { if (c.classList.contains('hide')) c.classList.add('gone'); }, 300);
          }
        });
      });
    }
  }

  /* ---- certificates ---- */
  if (certGrid && typeof CERTIFICATES !== 'undefined') {
    certGrid.innerHTML = CERTIFICATES.map((c, i) => `
      <figure class="cert reveal" data-i="${i}" data-cursor="link" style="--d:${i * 70}ms">
        <div class="cert__media">
          <img src="${esc(c.img)}" alt="${esc(c.title)} certificate" loading="lazy" />
          <span class="cert__zoom">⤢</span>
        </div>
        <figcaption class="cert__body">
          <b>${esc(c.title)}</b>
          <i>${esc(c.issuer)}</i>
          <span>${esc(c.note)}</span>
        </figcaption>
      </figure>`).join('');

    $$('.cert__media img', certGrid).forEach(img => {
      const kill = () => { img.parentElement.classList.add('noimg'); img.remove(); };
      img.addEventListener('error', kill);
      if (img.complete && img.naturalWidth === 0) kill();
    });

    /* ---- lightbox ---- */
    const lb    = $('#lightbox');
    const lbBox = $('#lbBox');

    const openLB = (i) => {
      const c = CERTIFICATES[i];
      const missing = $(`.cert[data-i="${i}"] .cert__media`, certGrid).classList.contains('noimg');
      const verify  = c.link
        ? `<a class="lb__verify" href="${esc(c.link)}" target="_blank" rel="noopener">Verify <span>↗</span></a>`
        : '';
      const cap = `<div class="lb__cap"><b>${esc(c.title)}</b><span class="mono">${esc(c.issuer)}</span>${verify}</div>`;
      lbBox.innerHTML = missing
        ? `<div class="lb__miss">Certificate image not uploaded yet<br />— add ${esc(c.img)}</div>${cap}`
        : `<img src="${esc(c.img)}" alt="${esc(c.title)} certificate" />${cap}`;
      lb.classList.add('on');
      document.body.classList.add('lb-open');
    };
    const closeLB = () => { lb.classList.remove('on'); document.body.classList.remove('lb-open'); };

    certGrid.addEventListener('click', e => {
      const card = e.target.closest('.cert');
      if (card) openLB(+card.dataset.i);
    });
    $('#lbClose').addEventListener('click', closeLB);
    lb.addEventListener('click', e => { if (e.target === lb) closeLB(); });
    addEventListener('keydown', e => { if (e.key === 'Escape') closeLB(); });
  }

  /* =======================================================
     2. LOADER
     ======================================================= */
  const loader   = $('#loader');
  const fill     = $('#loaderFill');
  const num      = $('#loaderNum');
  document.body.classList.add('is-loading');

  const startSite = () => {
    document.body.classList.remove('is-loading');
    document.body.classList.add('ready');
    loader.classList.add('done');
  };

  if (reduced) {
    startSite();
  } else {
    let p = 0;
    const tick = setInterval(() => {
      p += Math.random() * 14 + 6;
      if (p >= 100) { p = 100; clearInterval(tick); setTimeout(startSite, 420); }
      fill.style.width = p + '%';
      num.textContent = String(Math.floor(p)).padStart(2, '0');
    }, 110);
  }

  /* =======================================================
     3. CUSTOM CURSOR
     ======================================================= */
  if (!isTouch && !reduced) {
    const ring = $('#cursor'), dot = $('#cursorDot');
    let mx = innerWidth / 2, my = innerHeight / 2, rx = mx, ry = my;

    addEventListener('mousemove', e => {
      mx = e.clientX; my = e.clientY;
      dot.style.transform = `translate3d(${mx}px, ${my}px, 0)`;
    }, { passive: true });

    (function follow() {
      rx = lerp(rx, mx, 0.16);
      ry = lerp(ry, my, 0.16);
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      requestAnimationFrame(follow);
    })();

    const hoverables = 'a, button, [data-cursor="link"], .card, .gcard, .cert, .job, .pcard';
    document.addEventListener('mouseover', e => {
      if (e.target.closest(hoverables)) ring.classList.add('grow');
    });
    document.addEventListener('mouseout', e => {
      if (e.target.closest(hoverables)) ring.classList.remove('grow');
    });
  }

  /* =======================================================
     4. MOBILE MENU
     ======================================================= */
  const burger = $('#burger');
  burger.addEventListener('click', () => {
    const open = document.body.classList.toggle('menu-open');
    burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    burger.setAttribute('aria-expanded', String(open));
  });
  $$('.menu a').forEach(a =>
    a.addEventListener('click', () => document.body.classList.remove('menu-open'))
  );
  addEventListener('keydown', e => {
    if (e.key === 'Escape') document.body.classList.remove('menu-open');
  });

  /* =======================================================
     5. REVEAL ON ENTER
     ======================================================= */
  $$('.reveal').forEach(el => {
    if (el.dataset.delay) el.style.setProperty('--d', el.dataset.delay + 'ms');
  });

  const io = new IntersectionObserver((entries) => {
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      en.target.classList.add('in');
      io.unobserve(en.target);
    });
  }, { threshold: 0.14, rootMargin: '0px 0px -8% 0px' });

  $$('.reveal').forEach(el => io.observe(el));

  /* =======================================================
     6. STAT COUNTERS
     ======================================================= */
  const countIO = new IntersectionObserver((entries) => {
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      const el  = en.target;
      const to  = parseFloat(el.dataset.count);
      const dec = parseInt(el.dataset.dec || '0', 10);
      const t0  = performance.now();
      const dur = 1400;

      const step = (now) => {
        const t = clamp((now - t0) / dur);
        const e = 1 - Math.pow(1 - t, 4);          // easeOutQuart
        el.textContent = (to * e).toFixed(dec);
        if (t < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
      countIO.unobserve(el);
    });
  }, { threshold: 0.6 });

  $$('[data-count]').forEach(el => countIO.observe(el));

  /* =======================================================
     7. 3D WORD CUBE
     ======================================================= */
  const cube = $('#cube');
  if (cube && !reduced) {
    let face = 0;
    setInterval(() => {
      face++;
      cube.style.transform = `rotateX(${face * -90}deg)`;
    }, 2600);
  }

  /* =======================================================
     8. HERO MOUSE PARALLAX
     ======================================================= */
  const heroStage = $('#heroStage');
  const hero = $('#hero');
  if (heroStage && !isTouch && !reduced) {
    hero.addEventListener('mousemove', e => {
      const r = hero.getBoundingClientRect();
      heroStage.style.setProperty('--mx-x', ((e.clientX - r.width / 2) / r.width).toFixed(3));
      heroStage.style.setProperty('--mx-y', ((e.clientY - r.height / 2) / r.height).toFixed(3));
    }, { passive: true });

    hero.addEventListener('mouseleave', () => {
      heroStage.style.setProperty('--mx-x', '0');
      heroStage.style.setProperty('--mx-y', '0');
    });
  }

  /* =======================================================
     9. PHOTO STACK — the scroll-driven 3D deck
     ======================================================= */
  const photoSection = $('.photos');
  const cards        = $$('.pcard');
  const copies       = $$('.pc');
  const photoIdx     = $('#photoIdx');
  const N            = cards.length;

  // graceful fallback when an image file isn't there yet
  cards.forEach(card => {
    const img = $('img', card);
    if (!img) return;
    img.addEventListener('error', () => { card.classList.add('noimg'); img.remove(); });
    if (img.complete && img.naturalWidth === 0) { card.classList.add('noimg'); img.remove(); }
  });

  let stackTarget = 0;   // where scroll says we are
  let stackNow    = 0;   // smoothed value
  let lastCopy    = -1;

  const readStack = () => {
    if (!photoSection) return;
    const r = photoSection.getBoundingClientRect();
    const travel = r.height - innerHeight;
    const p = clamp(-r.top / (travel || 1));
    stackTarget = p * (N - 1);
  };

  const drawStack = () => {
    for (let i = 0; i < N; i++) {
      const d   = i - stackNow;              // signed distance from the front card
      const ad  = Math.abs(d);
      const card = cards[i];

      // cards behind push back + up, cards already passed slide away
      const z   = d >= 0 ? -ad * 175 : -ad * 260;
      const y   = d >= 0 ? -ad * 26  : -ad * 150;
      const x   = d >= 0 ?  ad * 30  :  ad * 90;
      const rY  = d >= 0 ? -ad * 8   :  ad * 20;
      const rZ  = d >= 0 ?  ad * 2.4 : -ad * 6;
      const sc  = 1 - clamp(ad * 0.05, 0, 0.4);
      const op  = d < -1.1 ? 0 : clamp(1 - ad * 0.34, 0, 1);

      card.style.transform =
        `translate3d(calc(-50% + ${x}px), calc(-50% + ${y}px), ${z}px) ` +
        `rotateY(${rY}deg) rotateZ(${rZ}deg) scale(${sc})`;
      card.style.opacity = op;
      card.style.zIndex  = String(100 - Math.round(ad * 10));
      // filter() is a per-frame repaint — skip it on touch hardware
      if (!isTouch) card.style.filter = `brightness(${(1 - clamp(ad * 0.14, 0, 0.45)).toFixed(2)})`;
    }

    // paragraph + index swap in step with the deck
    const active = clamp(Math.round(stackNow), 0, N - 1);
    if (active !== lastCopy) {
      lastCopy = active;
      copies.forEach((c, i) => c.classList.toggle('active', i === Math.min(active, copies.length - 1)));
      if (photoIdx) photoIdx.textContent = String(active + 1).padStart(2, '0');
    }
  };

  /* =======================================================
     10. TILT CARDS
     ======================================================= */
  if (!isTouch && !reduced) {
    $$('[data-tilt]').forEach(card => {
      const inner = $('.card__inner, .gcard__inner', card);
      const glow  = $('.card__glow', card);
      if (!inner) return;
      const amp = inner.classList.contains('gcard__inner') ? 7 : 13;

      card.addEventListener('mousemove', e => {
        const r  = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        inner.style.transform =
          `perspective(900px) rotateY(${(px - .5) * amp}deg) rotateX(${(.5 - py) * amp}deg) translateZ(10px)`;
        if (glow) {
          glow.style.setProperty('--gx', px * 100 + '%');
          glow.style.setProperty('--gy', py * 100 + '%');
        }
      }, { passive: true });

      card.addEventListener('mouseleave', () => { inner.style.transform = ''; });
    });
  }

  /* =======================================================
     11. MARQUEE (auto + scroll velocity)
     ======================================================= */
  const track = $('#marqueeTrack');
  let mOffset = 0, mHalf = 0, mBoost = 0, mVisible = true;
  const measureMarquee = () => { if (track) mHalf = track.scrollWidth / 2; };
  measureMarquee();

  // don't burn frames animating a marquee nobody can see
  if (track) {
    new IntersectionObserver(([e]) => { mVisible = e.isIntersecting; })
      .observe(track.parentElement);
  }

  /* =======================================================
     12. SCROLL STATE
     ======================================================= */
  const nav      = $('#nav');
  const mobar    = $('#mobar');
  const progress = $('#progressBar');
  const tlFill   = $('#tlFill');
  const tl       = $('.tl');
  let lastY = window.scrollY;
  let velocity = 0;

  function onScroll() {
    const y = window.scrollY;
    velocity = y - lastY;

    // nav
    nav.classList.toggle('scrolled', y > 40);
    nav.classList.toggle('hidden', y > 500 && velocity > 4 && !document.body.classList.contains('menu-open'));

    // thumb-reachable email/call bar — appears once the hero is behind you
    if (mobar) mobar.classList.toggle('up', y > innerHeight * 0.75);

    // page progress
    const max = document.documentElement.scrollHeight - innerHeight;
    progress.style.width = clamp(y / (max || 1)) * 100 + '%';

    // hero depth
    document.documentElement.style.setProperty('--sp-hero', clamp(y / innerHeight).toFixed(3));
    if (heroStage) heroStage.style.opacity = String(clamp(1 - y / (innerHeight * 0.78)));

    // timeline fill
    if (tl && tlFill) {
      const r = tl.getBoundingClientRect();
      tlFill.style.height = clamp((innerHeight * 0.72 - r.top) / (r.height || 1)) * 100 + '%';
    }

    readStack();
    lastY = y;
  }

  /* =======================================================
     13. RENDER LOOP
     ======================================================= */
  const render = () => {
    // smooth the deck so every scroll notch nudges the photos gently
    stackNow = lerp(stackNow, stackTarget, 0.09);
    if (!reduced) drawStack();

    // marquee: constant drift + a kick from scroll speed
    if (track && mHalf && mVisible) {
      mBoost = lerp(mBoost, velocity * 0.55, 0.08);
      mOffset -= 0.55 + mBoost;
      if (mOffset <= -mHalf) mOffset += mHalf;
      if (mOffset > 0) mOffset -= mHalf;
      track.style.transform = `translate3d(${mOffset}px,0,0)`;
    }

    velocity *= 0.9;
    requestAnimationFrame(render);
  };

  addEventListener('scroll', onScroll, { passive: true });
  addEventListener('resize', () => { measureMarquee(); onScroll(); });
  addEventListener('load', () => { measureMarquee(); onScroll(); });

  onScroll();
  if (!reduced) { stackNow = stackTarget; drawStack(); }
  requestAnimationFrame(render);

  /* =======================================================
     14. MISC
     ======================================================= */
  $('#yr').textContent = new Date().getFullYear();

  // keep hash links smooth even with the fixed header
  $$('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href');
      if (id.length < 2) return;
      const t = document.querySelector(id);
      if (!t) return;
      e.preventDefault();
      // clear the fixed header so section headings aren't hidden under it
      const offset = id === '#home' ? 0 : nav.offsetHeight + 10;
      window.scrollTo({
        top: t.getBoundingClientRect().top + window.scrollY - offset,
        behavior: reduced ? 'auto' : 'smooth'
      });
    });
  });
})();
