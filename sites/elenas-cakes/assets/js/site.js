/* ==========================================================
   Elena's Cakes — site behaviour
   Mobile nav · gallery build · lightbox · form · reveals
   No dependencies.
   ========================================================== */
(function () {
  "use strict";

  /* ── Footer year ─────────────────────────────────────── */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ── Sticky header shadow ────────────────────────────── */
  var header = document.querySelector(".site-header");
  var onScroll = function () {
    header.classList.toggle("is-stuck", window.scrollY > 8);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ── Mobile nav ──────────────────────────────────────── */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");

  var closeNav = function () {
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  };

  toggle.addEventListener("click", function () {
    var open = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(open));
  });

  nav.addEventListener("click", function (e) {
    if (e.target.tagName === "A") closeNav();
  });

  /* ── Gallery ─────────────────────────────────────────── */
  var grid = document.getElementById("gallery-grid");
  var photos = (window.GALLERY_PHOTOS || []).slice();
  var loaded = [];

  photos.forEach(function (photo, i) {
    var fig = document.createElement("figure");
    fig.className = "gallery-item";
    fig.tabIndex = 0;
    fig.setAttribute("role", "button");
    fig.setAttribute("aria-label", "View photo: " + (photo.caption || photo.alt || "cake"));

    var img = document.createElement("img");
    img.src = "assets/img/" + photo.src;
    img.alt = photo.alt || "";
    img.loading = "lazy";

    // If a photo hasn't been added yet, drop the tile rather than
    // showing a broken image.
    img.addEventListener("error", function () {
      fig.remove();
      loaded = loaded.filter(function (p) { return p.el !== fig; });
      if (!grid.children.length) grid.closest(".section").hidden = true;
    });

    fig.appendChild(img);

    if (photo.caption) {
      var cap = document.createElement("figcaption");
      cap.textContent = photo.caption;
      fig.appendChild(cap);
    }

    var open = function () { openLightbox(fig); };
    fig.addEventListener("click", open);
    fig.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(); }
    });

    loaded.push({ el: fig, photo: photo, index: i });
    grid.appendChild(fig);
  });

  /* ── Lightbox ────────────────────────────────────────── */
  var box = document.getElementById("lightbox");
  var boxImg = document.getElementById("lightbox-img");
  var current = 0;
  var lastFocused = null;

  function visiblePhotos() {
    return loaded.filter(function (p) { return p.el.isConnected; });
  }

  function show(i) {
    var list = visiblePhotos();
    if (!list.length) return;
    current = (i + list.length) % list.length;
    var photo = list[current].photo;
    boxImg.src = "assets/img/" + photo.src;
    boxImg.alt = photo.alt || "";
  }

  function openLightbox(fig) {
    var list = visiblePhotos();
    var idx = list.findIndex(function (p) { return p.el === fig; });
    lastFocused = document.activeElement;
    show(idx < 0 ? 0 : idx);
    box.hidden = false;
    document.body.style.overflow = "hidden";
    box.querySelector(".lightbox-close").focus();
  }

  function closeLightbox() {
    box.hidden = true;
    boxImg.src = "";
    document.body.style.overflow = "";
    if (lastFocused) lastFocused.focus();
  }

  box.querySelector(".lightbox-close").addEventListener("click", closeLightbox);
  box.querySelector(".lightbox-prev").addEventListener("click", function () { show(current - 1); });
  box.querySelector(".lightbox-next").addEventListener("click", function () { show(current + 1); });
  box.addEventListener("click", function (e) { if (e.target === box) closeLightbox(); });

  document.addEventListener("keydown", function (e) {
    if (box.hidden) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") show(current - 1);
    if (e.key === "ArrowRight") show(current + 1);
  });

  /* ── Enquiry form ────────────────────────────────────
     Front-end validation only. To make it live, point
     ENDPOINT at your backend and the fetch below will POST
     the form as JSON.
     ---------------------------------------------------- */
  var ENDPOINT = ""; // e.g. "https://api.example.com/enquiries"

  var form = document.getElementById("enquiry-form");
  var status = document.getElementById("form-status");

  function setError(input, message) {
    clearError(input);
    input.setAttribute("aria-invalid", "true");
    var msg = document.createElement("p");
    msg.className = "field-error";
    msg.textContent = message;
    input.parentNode.appendChild(msg);
  }

  function clearError(input) {
    input.removeAttribute("aria-invalid");
    var existing = input.parentNode.querySelector(".field-error");
    if (existing) existing.remove();
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    status.textContent = "";
    status.className = "form-status";

    var name = form.elements.name;
    var email = form.elements.email;
    var ok = true;

    [name, email].forEach(clearError);

    if (!name.value.trim()) { setError(name, "Please tell me your name."); ok = false; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
      setError(email, "Please enter a valid email address.");
      ok = false;
    }

    if (!ok) {
      status.textContent = "Please check the highlighted fields.";
      status.className = "form-status is-error";
      return;
    }

    var payload = {
      name: name.value.trim(),
      email: email.value.trim(),
      occasion: form.elements.occasion.value,
      date: form.elements.date.value,
      details: form.elements.details.value.trim()
    };

    if (!ENDPOINT) {
      status.textContent = "Thanks " + payload.name + " — this demo form isn't connected to a backend yet.";
      status.className = "form-status is-ok";
      console.info("Enquiry payload:", payload);
      return;
    }

    var button = form.querySelector("button[type=submit]");
    button.disabled = true;
    status.textContent = "Sending…";

    fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    })
      .then(function (res) {
        if (!res.ok) throw new Error("Request failed: " + res.status);
        form.reset();
        status.textContent = "Thank you — your enquiry is with Elena. She'll be in touch shortly.";
        status.className = "form-status is-ok";
      })
      .catch(function () {
        status.textContent = "Sorry, something went wrong. Please email hello@elenascakes.example instead.";
        status.className = "form-status is-error";
      })
      .finally(function () { button.disabled = false; });
  });

  /* ── Reveal on scroll ────────────────────────────────── */
  var targets = document.querySelectorAll(".section-head, .card, .quote, .about-photo, .about-copy, .enquire-form, .gallery-item");

  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -60px 0px" });

    targets.forEach(function (el) {
      el.classList.add("reveal");
      observer.observe(el);
    });
  }
})();
