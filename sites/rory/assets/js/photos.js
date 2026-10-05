/* ==========================================================
   Photos — Rory Joscelyne
   ----------------------------------------------------------
   THIS IS THE ONLY FILE YOU NEED TO EDIT TO CHANGE PHOTOS.

   1. Run the originals through  tools/prepare_photos.py
      (it writes the files into assets/img/ and prints the
      lines to paste below, with width and height filled in)
   2. Add those lines to a project, or start a new project.

   Photo fields:
   `src`      filename in assets/img/ (a "-sm" copy sits beside it)
   `w`, `h`   pixel size, so rows can be laid out without cropping
   `caption`  shown on hover and in the viewer
   `alt`      what the photo shows, for screen readers
   `feature`  true gives the photo a full-width row of its own

   Filenames that don't exist yet are skipped, so nothing
   breaks while photos are being swapped in.
   ========================================================== */

/* The full-screen slideshow at the top of the page.
   `focus` is the part of the photo to keep in view when a
   tall phone screen crops a landscape shot (CSS object-position). */
window.HERO_PHOTOS = [
  { src: "mos-01.jpg", focus: "45% 50%", alt: "Ministry of Sound's mirror ball and moving-head lights cutting blue beams through haze" },
  { src: "mos-07.jpg", focus: "80% 50%", alt: "A DJ in silhouette looking out from the booth into a bright shaft of light" },
  { src: "mos-03.jpg", focus: "70% 50%", alt: "Over a DJ's shoulder: headphones on, laptop glowing, blue beams sweeping the club" }
];

window.PROJECTS = [
  {
    title: "Ministry of Sound",
    meta: ["Event", "London", "c. 2015"],
    tone: "dark",
    blurb: "The CorpComms Awards at Ministry of Sound: the club's rig, the booth and the DJ at work, shot from the decks and the floor.",
    photos: [
      { src: "mos-01.jpg", w: 1600, h: 1064, feature: true, caption: "Mirror ball and moving heads",
        alt: "The club's lighting rig: a large mirror ball hung from steel truss, with blue beams cutting through haze over the balcony" },
      { src: "mos-02.jpg", w: 1600, h: 1064, caption: "At the decks",
        alt: "A DJ in headphones works a pair of CDJs beside an open laptop, blue beams and the balcony lights behind him" },
      { src: "mos-03.jpg", w: 1600, h: 1064, caption: "The view from the booth",
        alt: "Over the DJ's shoulder: headphones on, laptop glowing orange, blue beams sweeping the club and its balcony" },
      { src: "mos-04.jpg", w: 1064, h: 1600, caption: "Over the mixer",
        alt: "Seen from above, the DJ leans over the mixer and CDJs, lit red on one side and blue on the other" },
      { src: "mos-05.jpg", w: 1600, h: 1064, caption: "Red and blue",
        alt: "Profile of the DJ looking down at the decks, headphones round his neck, face lit red against a wash of blue" },
      { src: "mos-06.jpg", w: 1600, h: 1064, caption: "Beams over the floor",
        alt: "Wide view from the DJ booth across the club, blue beams and a mirror ball above guests at high tables" },
      { src: "mos-07.jpg", w: 1600, h: 1064, feature: true, caption: "In the beam",
        alt: "The DJ in silhouette, looking out from the booth into a bright shaft of light, guests at tables beyond" },
      { src: "mos-08.jpg", w: 1064, h: 1600, caption: "Headphones on",
        alt: "The DJ bends over the decks in headphones, face lit blue, the mixer glowing below" },
      { src: "mos-09.jpg", w: 1600, h: 1064, caption: "A look back",
        alt: "The DJ glances back at the camera from the edge of the booth, a blue beam slicing across the club behind him" },
      { src: "mos-10.jpg", w: 1600, h: 1064, caption: "From the floor",
        alt: "The DJ booth seen from the floor, bathed in deep blue, the DJ in headphones behind a laptop" },
      { src: "mos-11.jpg", w: 1600, h: 1064, caption: "Hands on the decks",
        alt: "The DJ's hands on two CDJs and a mixer, laptop glowing red, the lit balcony behind" },
      { src: "mos-12.jpg", w: 1600, h: 1064, caption: "The booth",
        alt: "Wide shot of the DJ booth: monitors, speakers and the DJ at the decks under red and blue light" },
      { src: "mos-13.jpg", w: 1600, h: 1064, feature: true, caption: "Haze and light",
        alt: "The DJ, lit red, turns towards the room as blue spotlights fall through haze" }
    ]
  }
];
