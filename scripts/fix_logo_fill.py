from pathlib import Path

for name in ["logo-mark.svg", "logo.svg"]:
    path = Path("public/brand") / name
    text = path.read_text(encoding="utf-8")
    text = text.replace(
        'fill="currentColor" style="color: #E8D5A3;"',
        'fill="#E8D5A3"',
    )
    text = text.replace('fill="currentColor"', 'fill="#E8D5A3"')
    path.write_text(text, encoding="utf-8")
    print(name, "updated")
