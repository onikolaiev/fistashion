import re
from pathlib import Path
from xml.etree import ElementTree as ET

tree = ET.parse("public/brand/logo.svg")
root = tree.getroot()
path = root.find(".//{http://www.w3.org/2000/svg}path")
assert path is not None
d = path.attrib["d"]
subpaths = re.findall(r"(M[^M]+)", d)

word = []
all_xs: list[float] = []
all_ys: list[float] = []
for sp in subpaths:
    nums = [float(x) for x in re.findall(r"[-+]?\d*\.?\d+", sp)]
    ys = nums[1::2]
    xs = nums[0::2]
    if not ys:
        continue
    midy = (min(ys) + max(ys)) / 2
    if 1650 < midy < 2100:
        word.append(sp.strip())
        all_xs.extend(xs)
        all_ys.extend(ys)

minx, maxx = min(all_xs), max(all_xs)
miny, maxy = min(all_ys), max(all_ys)
pad = 20
vb_x = minx - pad
vb_y = miny - pad
vb_w = maxx - minx + 2 * pad
vb_h = maxy - miny + 2 * pad
vb = f"{vb_x:.1f} {vb_y:.1f} {vb_w:.1f} {vb_h:.1f}"

svg = (
    f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{vb}" '
    f'fill="#E8D5A3" role="img" aria-label="FISTASHION">\n'
    f'  <path d="{" ".join(word)}" fill-rule="evenodd" />\n'
    f"</svg>\n"
)
Path("public/brand/wordmark.svg").write_text(svg, encoding="utf-8")
print("viewBox", vb)
print("letters", len(word))
print("saved public/brand/wordmark.svg", len(svg))
