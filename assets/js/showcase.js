/* ==========================================================
   WebDevCo — example site index
   ----------------------------------------------------------
   ADD A NEW EXAMPLE SITE BY ADDING ONE ENTRY BELOW.

   1. Put the site in  sites/<folder>/
   2. Add a screenshot at  assets/img/<name>.jpg  (optional —
      a placeholder tile shows if the file isn't there yet)
   3. Add an entry to SITES
   ========================================================== */

var SITES = [
  {
    name: "Elena's Cakes",
    blurb: "A single-page site for a home baker — themed birthday cakes, a lightbox gallery, pricing and an enquiry form ready to wire to a backend.",
    url: "sites/elenas-cakes/index.html",
    thumb: "assets/img/elenas-cakes.jpg",
    tags: ["Static", "Responsive", "Lightbox gallery", "Enquiry form"]
  }
];

(function () {
  "use strict";

  var grid = document.getElementById("site-grid");
  if (!grid) return;

  SITES.forEach(function (site) {
    var card = document.createElement("a");
    card.className = "site-card";
    card.href = site.url;

    var thumb = document.createElement("div");
    thumb.className = "site-thumb";

    var fallback = document.createElement("div");
    fallback.className = "site-thumb-fallback";
    fallback.textContent = site.name;
    thumb.appendChild(fallback);

    if (site.thumb) {
      var img = document.createElement("img");
      img.src = site.thumb;
      img.alt = "Screenshot of the " + site.name + " website";
      img.loading = "lazy";
      img.addEventListener("error", function () { img.remove(); });
      img.addEventListener("load", function () { fallback.remove(); });
      thumb.appendChild(img);
    }

    var body = document.createElement("div");
    body.className = "site-body";

    var h3 = document.createElement("h3");
    h3.textContent = site.name;

    var p = document.createElement("p");
    p.textContent = site.blurb;

    body.appendChild(h3);
    body.appendChild(p);

    if (site.tags && site.tags.length) {
      var tags = document.createElement("ul");
      tags.className = "site-tags";
      site.tags.forEach(function (tag) {
        var li = document.createElement("li");
        li.textContent = tag;
        tags.appendChild(li);
      });
      body.appendChild(tags);
    }

    var link = document.createElement("span");
    link.className = "site-link";
    link.textContent = "View site";
    body.appendChild(link);

    card.appendChild(thumb);
    card.appendChild(body);
    grid.appendChild(card);
  });
})();
