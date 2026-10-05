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
  { src: "house-13.jpg", focus: "60% 50%", alt: "A round illuminated mirror above a gold vessel basin in a warm, gold-walled cloakroom" },
  { src: "mos-07.jpg", focus: "80% 50%", alt: "A DJ in silhouette looking out from the booth into a bright shaft of light" },
  { src: "house-04.jpg", focus: "62% 50%", alt: "A kitchen of glossy pink cabinets and a pale grey worktop against lilac walls" }
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
  },
  {
    title: "The Mews House",
    meta: ["Interiors", "Exteriors", "2026"],
    blurb: "A family home photographed room by room: a pink kitchen, a bedroom papered with herons, gold taps, and the garden studio out the back.",
    photos: [
      { src: "house-01.jpg", w: 2000, h: 1331, feature: true, caption: "Front of the house",
        alt: "A single-storey yellow-brick cottage with white sash windows and a black front door, behind a bed of roses and hydrangeas" },
      { src: "house-02.jpg", w: 2000, h: 1331, caption: "Virginia creeper",
        alt: "Red and green Virginia creeper trailing over yellow brick above open patio doors" },
      { src: "house-03.jpg", w: 2000, h: 1331, caption: "The garden studio",
        alt: "A timber-clad garden studio with French doors, on a grey deck beside a small lawn" },
      { src: "house-04.jpg", w: 2000, h: 1331, caption: "The pink kitchen",
        alt: "A kitchen of glossy pink cabinets with a pale grey worktop, against lilac walls" },
      { src: "house-05.jpg", w: 2000, h: 1331, caption: "Pink, down to the air fryer",
        alt: "A pink air fryer and a pink bowl on a black hob, between pink cupboards" },
      { src: "house-06.jpg", w: 2000, h: 1331, caption: "Living room",
        alt: "A pale pink living room opening through sliding doors onto the deck and garden, a pink kitchen island in the foreground" },
      { src: "house-07.jpg", w: 2000, h: 1331, caption: "Reading corner",
        alt: "A blush armchair, a floral wingback chair and a gold console table beside the garden doors" },
      { src: "house-08.jpg", w: 2000, h: 1331, feature: true, caption: "The heron room",
        alt: "A bedroom with violet carpet and a painted mural of herons, wisteria and reeds across one wall" },
      { src: "house-09.jpg", w: 2000, h: 1331, caption: "Herons",
        alt: "Close-up of the bedroom mural: herons among reeds and pink blossom" },
      { src: "house-10.jpg", w: 2000, h: 1331, caption: "Crystal and brass",
        alt: "A faceted crystal door knob on a brass rose against a violet wall" },
      { src: "house-11.jpg", w: 2000, h: 1331, caption: "Lotus light",
        alt: "A lotus-shaped ceiling light glowing white above a violet LED cove" },
      { src: "house-12.jpg", w: 2000, h: 1331, caption: "Rings of light",
        alt: "A ceiling light of interlocking chrome rings, lit, on a pale ceiling" },
      { src: "house-13.jpg", w: 2000, h: 1331, feature: true, caption: "The cloakroom",
        alt: "A round illuminated mirror above a gold vessel basin on dark marble, in a warm gold-walled cloakroom" },
      { src: "house-14.jpg", w: 2000, h: 1331, caption: "Marble and tile",
        alt: "A red rose in a glass vase on a dark marble shelf above patterned tiles" },
      { src: "house-15.jpg", w: 2000, h: 1331, caption: "Brushed gold",
        alt: "A brushed-gold rain shower head and handset against beige tiles with a strip of glass mosaic" },
      { src: "house-16.jpg", w: 2000, h: 1331, caption: "The palm room",
        alt: "A shower room with palm-leaf wallpaper, a chrome towel rail and a black rain shower" },
      { src: "house-17.jpg", w: 2000, h: 1331, caption: "Palm leaves",
        alt: "A matt-black rain shower against palm-leaf wallpaper" },
      { src: "house-18.jpg", w: 2000, h: 1331, feature: true, caption: "Out to the garden",
        alt: "The garden studio's French doors standing open onto the deck and lawn" }
    ]
  }
];
