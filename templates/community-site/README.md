# Community site template

A starting point for client sites — nurseries, village halls, small schools.
Same plain HTML/CSS/JS approach as everything else in this repo: no build
step, no framework, edit and deploy.

Live example of the pattern this is built on: [Elena's Cakes](../../sites/elenas-cakes/).

## What's here

```
index.html              structure — sections are generic, content is placeholder
assets/css/style.css    every colour is a token at the top — reskin by editing ~6 values
assets/js/content.js    ← THE FILE YOU EDIT PER CLIENT — offerings, gallery, hours, quotes
assets/js/site.js       behaviour (nav, gallery, lightbox, form, reveals) — shouldn't need touching
assets/img/             placeholder images — replace with real photos
```

Every `[Replace: ...]` in `index.html` and `content.js` is a marker for text
that needs writing for the actual client. Search the file for `[Replace`
before calling a site done.

## Starting a new client from this

1. **Get it into its own repo.** This folder lives inside the WebDevCo
   portfolio repo for now — a real client site needs its own repo so it can
   have its own custom domain and its own deploy history. Two ways to do that:
   - Create an empty repo on GitHub, then copy this folder's contents into it
     (`git init`, add the files, push).
   - Or ask Claude to do the copy/push once the empty repo exists — Claude
     can't create new repos itself in this session (only push to ones it's
     already scoped to), so the empty repo has to exist first.
2. **Edit `content.js`.** Replace every placeholder array entry — offerings,
   gallery captions, opening times/rates/dates, quotes.
3. **Edit `index.html`.** Replace every `[Replace: ...]` marker — title, meta
   description, hero copy, about copy, contact details, footer tagline.
4. **Swap the photos** in `assets/img/` for real ones, keeping the same
   filenames referenced in `content.js`, or update the filenames to match.
   **Strip EXIF metadata first** — phone photos carry GPS coordinates and a
   capture date, which for a nursery or hall is often a home address or a
   safeguarding concern if children are in shot. See the note in
   `sites/elenas-cakes/assets/img/README.md` for the one-liner that does it.
5. **Reskin the colours**, if the default sage-green doesn't suit — edit the
   `:root` block at the top of `style.css`. Keep the two-value pattern
   (`--sage` for fills/rules, `--sage-ink` for text) and re-check contrast if
   you change the hue — a bright accent that reads fine as a hairline can fail
   as button text. `python3` + the WCAG contrast formula used elsewhere in
   this repo's commit history is the quick way to check.
6. **Deploy.** Either:
   - **GitHub Pages** — free, but the repo must be public on the free tier,
     so the site's source (and git history) is publicly browsable. Fine for
     most community content; worth knowing before you commit anything you
     wouldn't want public.
   - **Cloudflare Pages** — free, deploys from a private repo, custom domain
     per project. The better default for client work specifically. Connect
     the GitHub repo in the Cloudflare dashboard (one-time account setup,
     a few minutes) and point the client's domain at it.

## Real testimonials only

The `QUOTES` placeholders in `content.js` say `[Replace with a real quote...]`
for a reason — do not invent reviews or attribute quotes to people who didn't
say them once this is a live site for a real business. That was fine as
placeholder demo copy on the portfolio sites; it isn't fine attributed to a
real name on a real nursery's site. Leave the section out entirely if there
isn't a real quote yet, rather than making one up.

## Enquiry form

Validates in the browser and reports that it isn't connected, by default.
Set `ENDPOINT` near the bottom of `assets/js/site.js` to wire it to a real
backend — same pattern as the cake site, documented in the top-level README.
