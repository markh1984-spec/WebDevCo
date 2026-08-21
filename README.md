# WebDevCo

A showcase site that hosts live example websites. The root page is the WebDevCo
hub; each demo lives in its own folder under `sites/` and is completely
self-contained.

Everything is plain static HTML, CSS and vanilla JS — no build step, no
dependencies, no framework. Open `index.html` in a browser and it works.

## Layout

```
index.html                     WebDevCo hub — lists the example sites
assets/
  css/site.css                 hub styles
  js/showcase.js               ← the list of example sites lives here
  img/                         hub thumbnails
sites/
  elenas-cakes/                Example site #1
    index.html
    assets/css/style.css
    assets/js/gallery.js       ← the list of gallery photos lives here
    assets/js/site.js          nav, lightbox, form, scroll reveals
    assets/img/                cake photos
```

## Running it locally

Any static server will do:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Adding Elena's real photos

The images currently in `sites/elenas-cakes/assets/img/` are placeholders, so
the site looks finished before the real photos arrive. To swap them in:

1. Drop the photos into `sites/elenas-cakes/assets/img/`.
2. Open `sites/elenas-cakes/assets/js/gallery.js` and edit the list — one line
   per photo, with a filename, an `alt` description and a caption.

The gallery builds itself from that list, so there's no HTML to touch. If a
filename in the list doesn't exist yet, that tile is quietly dropped rather
than showing a broken image.

Three photos are referenced directly in `index.html` rather than through the
gallery list:

| File | Where it appears |
|---|---|
| `cake-01.jpg` | main hero photo (portrait, roughly 4:5) |
| `cake-02.jpg` | small overlapping hero photo (square) |
| `inside.jpg` | the About section (portrait, roughly 4:5) |

The current photos are crops of three real photos of Elena's cakes. All EXIF
metadata — including GPS coordinates and capture dates — was stripped before
they were committed. Do the same for any photo added later: phone photos carry
the location they were taken at, which for a home baker is a home address.

## Deploying to GitHub Pages

`.github/workflows/deploy-pages.yml` builds and publishes on every push to the
default branch, and can be run by hand from the Actions tab.

**One-time setup.** Pages has to be switched on before the first deploy can
succeed: **Settings → Pages → Build and deployment → Source → GitHub Actions**.
The workflow can't do this itself — creating a Pages site needs permissions the
default Actions token doesn't have, so the run fails with
`Resource not accessible by integration` until the setting is flipped.

Once it's on, the site is at `https://markh1984-spec.github.io/WebDevCo/`:

| URL | Serves |
|---|---|
| `/WebDevCo/` | the WebDevCo hub |
| `/WebDevCo/elena/` | `sites/elenas-cakes/` |
| `/WebDevCo/deaddad/` | `sites/deaddad-ai/` |

Pages has no rewrite rules, so the workflow copies each demo into a real
directory at its short path. The original `/sites/...` paths are published too,
which is what the hub's own cards link to.

## Deploying to Vercel

Import the repo at [vercel.com/new](https://vercel.com/new). It's a static
site, so leave the framework preset as **Other** and leave the build and
output settings empty — there's nothing to build.

`vercel.json` maps a clean path to each demo, so the link you send a client
isn't the folder structure:

| URL | Serves |
|---|---|
| `/` | the WebDevCo hub |
| `/elena` | `sites/elenas-cakes/` |
| `/deaddad` | `sites/deaddad-ai/` |

`/elena` redirects to `/elena/` first. That trailing slash matters: the demo
sites use relative asset paths, so without it the browser would resolve
`assets/css/style.css` against the domain root and load the hub's stylesheet
instead. Keep that redirect when adding new paths.

To give a demo its own subdomain instead (`elenas-cakes.vercel.app`), create a
second Vercel project from the same repo and set **Root Directory** to
`sites/elenas-cakes`. No rewrites needed in that setup.

## Adding another example site

1. Create `sites/<your-site>/` with its own `index.html` and assets.
2. Optionally add a screenshot at `assets/img/<your-site>.jpg` (16:10). Without
   one, the card falls back to a plain tile with the site name.
3. Add an entry to the `SITES` array at the top of `assets/js/showcase.js`.
4. Optionally add a `/<name>` redirect and rewrite pair to `vercel.json`, so
   the site gets a clean URL too.

## Client work: the community site template

`templates/community-site/` is the starting point for real client sites —
nurseries, village halls, small schools. Same static approach as everything
else here, built to be reskinned in minutes rather than written from
scratch each time: every colour is a token at the top of its stylesheet, and
every piece of editable content (offerings, gallery, hours, quotes) lives in
one file, `assets/js/content.js`.

It isn't wired into the hub or into `vercel.json` — it's not a demo, it's raw
material for the next real client. See `templates/community-site/README.md`
for the full recipe: getting it into its own repo, what to edit, and the
GitHub Pages vs. Cloudflare Pages trade-off for client work specifically
(GitHub Pages needs a public repo on the free tier; Cloudflare Pages deploys
from a private one).

## Wiring the enquiry form to a backend

The form on the cake site validates in the browser and, by default, just
reports that it isn't connected. To make it live, set `ENDPOINT` near the
bottom of `sites/elenas-cakes/assets/js/site.js`:

```js
var ENDPOINT = "https://api.example.com/enquiries";
```

It then POSTs JSON and handles the success and failure states:

```json
{
  "name":     "Sophie",
  "email":    "sophie@example.com",
  "occasion": "Wedding",
  "date":     "2026-09-12",
  "details":  "Three tiers, lemon and elderflower…"
}
```

Any 2xx response is treated as success; anything else shows the error message.
The endpoint needs to allow CORS from wherever the site is hosted.

## Notes

- Responsive down to 320px, tested at 390px and 1440px.
- Keyboard accessible: skip links, focus styles, and a lightbox that traps
  Escape and arrow keys.
- Respects `prefers-reduced-motion`.
- The photos are real. The words are not: prices, reviews, phone number and
  email are all placeholder copy and must be replaced with Elena's real
  details before this goes anywhere near a live domain.
