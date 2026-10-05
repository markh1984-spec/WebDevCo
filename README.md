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
  rory/                        Rory Joscelyne — photography portfolio
    index.html
    assets/css/style.css
    assets/js/photos.js        ← the hero slides and gallery photos live here
    assets/js/site.js          header, slideshow, gallery, lightbox
    assets/img/                web-sized copies of Rory's photos
tools/
  prepare_photos.py            camera originals → web-ready, metadata-free
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
| `/WebDevCo/riverside/` | `sites/riverside-hall/` |
| `/WebDevCo/rory/` | `sites/rory/` |

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
| `/riverside` | `sites/riverside-hall/` |
| `/rory` | `sites/rory/` |

`/elena` redirects to `/elena/` first. That trailing slash matters: the demo
sites use relative asset paths, so without it the browser would resolve
`assets/css/style.css` against the domain root and load the hub's stylesheet
instead. Keep that redirect when adding new paths.

To give a demo its own subdomain instead (`elenas-cakes.vercel.app`), create a
second Vercel project from the same repo and set **Root Directory** to
`sites/elenas-cakes`. No rewrites needed in that setup. Rory's site is set up
this way: project name `rory-joscelyne`, Root Directory `sites/rory`.

## Adding another example site

1. Create `sites/<your-site>/` with its own `index.html` and assets.
2. Optionally add a screenshot at `assets/img/<your-site>.jpg` (16:10). Without
   one, the card falls back to a plain tile with the site name.
3. Add an entry to the `SITES` array at the top of `assets/js/showcase.js`.
4. Optionally add a `/<name>` redirect and rewrite pair to `vercel.json`, so
   the site gets a clean URL too.

## Rory's photography site

`sites/rory/` is a portfolio for Rory Joscelyne of Cyberpunk Studios. Unlike
the other demos it's for a real person, built from his real photos in Google
Drive, picked by hand.

| Project | Source in Drive | Picked |
|---|---|---|
| Ministry of Sound | `DJ site/Ministry of Sound, c.2015` (31 photos) | 13 |
| The Mews House | `1 Magazine Mews – photos & video from Rory/Web` (80 photos) | 18 |

Both folders hold web-sized copies: 1600px for Ministry of Sound (WhatsApp
copies, so a touch soft at full screen) and 2000px for the house. Use the
`Web` folder rather than the room folders beside it: those hold Rory's
8–19 MB camera originals, and the Google Drive connector can't download
anything much over 2 MB.

Everything you'd want to change about the photos lives in
`sites/rory/assets/js/photos.js`:

- `HERO_PHOTOS` — the full-screen slideshow at the top. `focus` sets which
  part of a landscape photo stays in view on a tall phone screen.
- `PROJECTS` — one entry per shoot, each with a title, details line, blurb
  and photo list. A new shoot is a new entry; the page builds the section.
  `tone: "dark"` puts the project on black, which suits night work.
  `feature: true` gives a photo a full-width row of its own.

The gallery is a justified layout: rows are filled edge to edge and every
photo keeps its own shape, so nothing is cropped. That's why each photo
lists its `w` and `h` — `prepare_photos.py` prints them for you. End each
project on a `feature` photo so the last row is never left half-full.

### Adding new photos

1. Download the originals from Drive.
2. Run them through the prep script, which makes a full-size copy (up to
   2000px) for the viewer and a 960px one for the grid, bakes in rotation
   and strips every bit of metadata (capture times, camera serials and,
   from phones, GPS):

   ```bash
   pip install pillow
   python3 tools/prepare_photos.py --out sites/rory/assets/img \
       ~/Downloads/"Kitchen 003.jpg" ~/Downloads/"Garden 002.jpg"
   ```

3. Paste the lines it prints into `photos.js` and write the caption and
   `alt` text.

### Before it goes live

- The contact email is a placeholder (`hello@roryjoscelyne.example`), and
  the page carries `noindex` until the real one is in.
- The About photo is the club's lighting rig, standing in for a portrait of
  Rory. Swap `assets/img/mos-about.jpg` for one when there is one.
- The About copy is built from the Cyberpunk Studios podcast pitch — check
  it with Rory.
- The Mews House is a family home. Publish it under that name, with no
  street address: interiors plus an address tell a stranger exactly what's
  behind whose front door. For the same reason:
  - in `house-01.jpg` the house-name sign on the garden wall and the number
    plaque by the door are blurred;
  - nothing showing the CCTV monitor (its screen shows the camera views),
    the street with neighbours' houses and parked cars, or family members
    is used.
- The Ministry of Sound gallery shows guests only small in frame or from
  behind, at an awards night. Keep it that way when adding more.

## Client work: the community site template

`templates/community-site/` is the starting point for real client sites —
nurseries, village halls, small schools. Same static approach as everything
else here, built to be reskinned in minutes rather than written from
scratch each time: every colour is a token at the top of its stylesheet, and
every piece of editable content (offerings, gallery, hours, quotes) lives in
one file, `assets/js/content.js`.

It isn't wired into the hub or into `vercel.json` — it's not a demo, it's raw
material for the next real client. Client sites deploy on GitHub Pages, one
repo per client — decided over Vercel/Cloudflare because these sites hold
nothing sensitive, so the free tier's one real trade-off (the repo has to be
public) costs nothing here. The template already includes its own
`.github/workflows/deploy-pages.yml`. See
`templates/community-site/README.md` for the full recipe: creating the
client's repo, what to edit, and setting the custom domain via a `CNAME`
file.

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
