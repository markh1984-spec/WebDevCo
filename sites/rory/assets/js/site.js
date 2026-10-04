/* ==========================================================
   Rory Joscelyne — site behaviour
   Header · hero slideshow · gallery build · lightbox · reveals
   No dependencies. Content comes from assets/js/photos.js.
   ========================================================== */
(function () {
  "use strict";

  var IMG = "assets/img/";
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // "kitchen-01.jpg" -> "kitchen-01-sm.jpg"
  function small(src) { return src.replace(/(\.\w+)$/, "-sm$1"); }
  function pad(n) { return (n < 10 ? "0" : "") + n; }

  /* ── Footer year ─────────────────────────────────────── */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ── Header: clear over the hero, solid after it ─────── */
  var header = document.querySelector(".site-header");
  var hero = document.querySelector(".hero");
  var onScroll = function () {
    var edge = hero ? hero.offsetHeight - header.offsetHeight : 8;
    header.classList.toggle("is-solid", window.scrollY > edge);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);

  /* ── Hero slideshow ──────────────────────────────────── */
  (function () {
    var wrap = document.getElementById("hero-slides");
    var counter = document.getElementById("hero-counter");
    var list = window.HERO_PHOTOS || [];
    if (!wrap || !list.length) return;

    var first = wrap.querySelector(".hero-slide");
    var slides = list.map(function (photo, i) {
      var img = i === 0 && first ? first : document.createElement("img");
      img.className = "hero-slide" + (i === 0 ? " is-active" : "");
      img.alt = photo.alt || "";
      if (photo.focus) img.style.objectPosition = photo.focus;
      if (i === 0) {
        if (img.getAttribute("src") !== IMG + photo.src) img.src = IMG + photo.src;
      } else {
        img.loading = "lazy";
        img.decoding = "async";
        img.src = IMG + photo.src;
        wrap.appendChild(img);
      }
      img.addEventListener("error", function () {
        img.remove();
        slides = slides.filter(function (s) { return s !== img; });
      });
      return img;
    });

    var current = 0;
    function render() {
      if (counter) counter.textContent = slides.length > 1 ? pad(current + 1) + " / " + pad(slides.length) : "";
    }
    render();

    if (reduceMotion || slides.length < 2) return;

    setInterval(function () {
      if (document.hidden || slides.length < 2) return;
      var prev = slides[current];
      current = (current + 1) % slides.length;
      var next = slides[current];
      // Only move on once the next picture has actually arrived.
      if (!next.complete || !next.naturalWidth) { current = slides.indexOf(prev); return; }
      prev.classList.remove("is-active");
      next.classList.add("is-active");
      render();
    }, 6500);
  })();

  /* ── Projects & galleries ────────────────────────────── */
  var mount = document.getElementById("projects");
  var projects = window.PROJECTS || [];

  projects.forEach(function (project) {
    var section = document.createElement("article");
    section.className = "project";

    var head = document.createElement("header");
    head.className = "project-head";
    var h3 = document.createElement("h3");
    h3.textContent = project.title;
    head.appendChild(h3);

    if (project.meta && project.meta.length) {
      var meta = document.createElement("ul");
      meta.className = "project-meta";
      project.meta.forEach(function (m) {
        var li = document.createElement("li");
        li.textContent = m;
        meta.appendChild(li);
      });
      head.appendChild(meta);
    }
    section.appendChild(head);

    if (project.blurb) {
      var blurb = document.createElement("p");
      blurb.className = "project-blurb";
      blurb.textContent = project.blurb;
      section.appendChild(blurb);
    }

    var grid = document.createElement("div");
    grid.className = "gallery";
    section.appendChild(grid);

    var items = [];

    // Frame numbers, redone whenever a missing photo is dropped.
    var renumber = function () {
      items.forEach(function (it, i) { it.num.textContent = pad(i + 1); });
    };

    (project.photos || []).forEach(function (photo) {
      var ar = photo.w && photo.h ? photo.w / photo.h : 1.5;

      var fig = document.createElement("figure");
      fig.className = "photo" + (photo.feature ? " is-feature" : "");
      fig.style.setProperty("--ar", ar.toFixed(4));
      fig.tabIndex = 0;
      fig.setAttribute("role", "button");
      fig.setAttribute("aria-label", "View larger: " + (photo.caption || photo.alt || "photograph"));

      var img = document.createElement("img");
      img.src = IMG + small(photo.src);
      img.srcset = IMG + small(photo.src) + " 960w, " + IMG + photo.src + " 2000w";
      img.sizes = photo.feature ? "100vw" : "(max-width: 720px) 100vw, 50vw";
      img.alt = photo.alt || "";
      img.loading = "lazy";
      img.decoding = "async";
      if (photo.w && photo.h) { img.width = photo.w; img.height = photo.h; }

      // A photo that isn't in assets/img yet is dropped, not shown broken.
      img.addEventListener("error", function () {
        fig.remove();
        items = items.filter(function (it) { return it.el !== fig; });
        if (!items.length) section.remove();
        renumber();
      });

      fig.appendChild(img);

      var cap = document.createElement("figcaption");
      var label = document.createElement("span");
      label.textContent = photo.caption || "";
      var num = document.createElement("span");
      cap.appendChild(label);
      cap.appendChild(num);
      fig.appendChild(cap);

      var item = { el: fig, photo: photo, num: num };
      items.push(item);

      var open = function () { openLightbox(items, items.indexOf(item)); };
      fig.addEventListener("click", open);
      fig.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(); }
      });

      grid.appendChild(fig);
    });

    renumber();

    if (mount) mount.appendChild(section);
  });

  /* ── Lightbox ────────────────────────────────────────── */
  var box = document.getElementById("lightbox");
  var boxImg = document.getElementById("lightbox-img");
  var boxTitle = document.getElementById("lightbox-title");
  var boxCount = document.getElementById("lightbox-count");
  var closeBtn = box.querySelector(".lightbox-close");
  var prevBtn = box.querySelector(".lightbox-prev");
  var nextBtn = box.querySelector(".lightbox-next");
  var list = [];
  var current = 0;
  var lastFocused = null;

  function preload(i) {
    if (!list.length) return;
    var p = list[(i + list.length) % list.length].photo;
    new Image().src = IMG + p.src;
  }

  function show(i) {
    if (!list.length) return;
    current = (i + list.length) % list.length;
    var photo = list[current].photo;
    boxImg.classList.add("is-loading");
    boxImg.onload = function () { boxImg.classList.remove("is-loading"); };
    boxImg.src = IMG + photo.src;
    boxImg.alt = photo.alt || "";
    boxTitle.textContent = photo.caption || "";
    boxCount.textContent = pad(current + 1) + " / " + pad(list.length);
    preload(current + 1);
    preload(current - 1);
  }

  function openLightbox(items, i) {
    list = items.filter(function (it) { return it.el.isConnected; });
    lastFocused = document.activeElement;
    show(Math.max(0, list.indexOf(items[i])));
    box.hidden = false;
    document.body.style.overflow = "hidden";
    closeBtn.focus();
  }

  function closeLightbox() {
    box.hidden = true;
    boxImg.removeAttribute("src");
    document.body.style.overflow = "";
    if (lastFocused) lastFocused.focus();
  }

  closeBtn.addEventListener("click", closeLightbox);
  prevBtn.addEventListener("click", function () { show(current - 1); });
  nextBtn.addEventListener("click", function () { show(current + 1); });
  box.addEventListener("click", function (e) {
    if (e.target === box || e.target.classList.contains("lightbox-figure")) closeLightbox();
  });

  document.addEventListener("keydown", function (e) {
    if (box.hidden) return;
    if (e.key === "Escape") closeLightbox();
    else if (e.key === "ArrowLeft") show(current - 1);
    else if (e.key === "ArrowRight") show(current + 1);
    else if (e.key === "Tab") {
      // Keep focus inside the viewer while it's open.
      var stops = [closeBtn, prevBtn, nextBtn];
      var at = stops.indexOf(document.activeElement);
      e.preventDefault();
      stops[(at + (e.shiftKey ? -1 : 1) + stops.length) % stops.length].focus();
    }
  });

  // Swipe left/right on touch screens.
  var touchX = null;
  box.addEventListener("touchstart", function (e) { touchX = e.touches[0].clientX; }, { passive: true });
  box.addEventListener("touchend", function (e) {
    if (touchX === null) return;
    var dx = e.changedTouches[0].clientX - touchX;
    touchX = null;
    if (Math.abs(dx) > 45) show(current + (dx < 0 ? 1 : -1));
  });

  /* ── Reveal on scroll ────────────────────────────────── */
  var targets = document.querySelectorAll(".section-head, .project-head, .project-blurb, .photo, .about-photo, .about-copy, .contact-inner");

  if ("IntersectionObserver" in window && !reduceMotion) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -40px 0px" });

    targets.forEach(function (el) {
      el.classList.add("reveal");
      observer.observe(el);
    });
  }
})();
