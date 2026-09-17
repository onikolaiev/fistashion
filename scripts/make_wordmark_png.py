from PIL import Image

im = Image.open("public/brand/logo.png").convert("RGBA")
# Tight crop around FISTASHION
crop = im.crop((30, 430, 475, 510))
pixels = crop.load()
w, h = crop.size

out = Image.new("RGBA", (w, h), (0, 0, 0, 0))
out_px = out.load()

for y in range(h):
    for x in range(w):
        r, g, b, a = pixels[x, y]
        # Green background is roughly (15, 36, 24)
        # Keep light gold/cream letters
        brightness = 0.299 * r + 0.587 * g + 0.114 * b
        greenish = g > r * 0.7 and b < g
        if brightness > 90 and not (r < 40 and g < 50 and b < 40):
            # Force brand gold
            out_px[x, y] = (232, 213, 163, 255)
        elif brightness > 55:
            alpha = int(min(255, (brightness - 55) / 35 * 255))
            out_px[x, y] = (232, 213, 163, alpha)

# Trim empty margins
bbox = out.getbbox()
if bbox:
    out = out.crop(bbox)

# Upscale 3x with LANCZOS for crisp display
out = out.resize((out.width * 3, out.height * 3), Image.Resampling.LANCZOS)
out.save("public/brand/wordmark.png")
print("saved wordmark.png", out.size)
