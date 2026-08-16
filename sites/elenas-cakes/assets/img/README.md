# Cake photos

These are crops of Elena's real cake photos.

- `cake-01.jpg` — hero photo, whole two-tier cake (portrait, roughly 4:5)
- `cake-02.jpg` — hero detail, spider emblem (square)
- `cake-03.jpg` — rainbow sponge interior (square)
- `cake-04.jpg` — topper detail (square)
- `cake-05.jpg` — turquoise tier, cut (square)
- `inside.jpg`  — About section, rainbow interior (portrait, roughly 4:5)

## Adding more

Drop the file in here, then add a line to `../js/gallery.js`. Filenames in that
list that don't exist are skipped, so nothing breaks mid-swap.

Aim for roughly 1200–1600px on the long edge, JPEG around quality 80.

**Strip the metadata first.** Phone photos carry GPS coordinates and capture
dates. For a home baker that means publishing a home address. Re-saving the
pixels drops it:

```python
from PIL import Image, ImageOps
im = ImageOps.exif_transpose(Image.open("IMG_1234.jpeg")).convert("RGB")
clean = Image.new("RGB", im.size); clean.putdata(list(im.getdata()))
clean.save("cake-09.jpg", "JPEG", quality=82, optimize=True)
```

`exif_transpose` also bakes in the rotation, which matters because stripping
EXIF removes the orientation flag that phones rely on.
