#!/usr/bin/env python3
"""Download marked README sections from GitHub main into the docs content folder.

Usage:
    python3 import_readme.py cli
    python3 import_readme.py mgmt

Each pair <!-- docs:<target>_readme_<section>:start --> / <!-- ...:end -->
creates <target>/<target>_readme_<section>.md alongside index.mdx.
Generated files are ignored by Git. Source repositories are never modified.
"""

import argparse
from pathlib import Path
import re
import sys
import tempfile
from urllib.request import urlopen


def extract_sections(markdown, target):
    lines = markdown.splitlines()
    pattern = re.compile(r"^\s*<!--\s*docs:(" + re.escape(target) + r"_readme_[a-z0-9_]+):(start|end)\s*-->\s*$")
    markers = {}
    for number, line in enumerate(lines):
        match = pattern.fullmatch(line)
        if match:
            name, kind = match.groups()
            markers.setdefault(name, {"start": [], "end": []})[kind].append(number)
    if not markers:
        raise ValueError(f"No docs:{target}_readme_<section>:start/end markers found in README.")
    sections = {}
    ranges = []
    for name, pair in markers.items():
        if len(pair["start"]) != 1 or len(pair["end"]) != 1:
            raise ValueError(f"Section {name} needs exactly one start marker and one end marker.")
        start, end = pair["start"][0], pair["end"][0]
        if start >= end:
            raise ValueError(f"Section {name}: start marker must precede end marker.")
        content = "\n".join(lines[start + 1:end]).strip("\n")
        if not content.strip():
            raise ValueError(f"Section {name} is empty.")
        sections[name] = content + "\n"
        ranges.append((start, end, name))
    ranges.sort()
    for previous, current in zip(ranges, ranges[1:]):
        if current[0] < previous[1]:
            raise ValueError(f"Sections {previous[2]} and {current[2]} overlap.")
    return sections


def write_section(destination, content, title):
    document = f"---\ntitle: {title}\n---\n\n" + content
    if destination.exists() and destination.read_text(encoding="utf-8") == document:
        return False
    destination.parent.mkdir(parents=True, exist_ok=True)
    temporary = None
    try:
        with tempfile.NamedTemporaryFile(mode="w", encoding="utf-8", newline="\n",
                                         dir=destination.parent, prefix=".readme-", suffix=".tmp",
                                         delete=False) as output:
            temporary = Path(output.name)
            output.write(document)
        temporary.replace(destination)
    finally:
        if temporary is not None and temporary.exists():
            temporary.unlink()
    return True


def main():
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("target", choices=["cli", "mgmt"])
    args = parser.parse_args()
    docs_root = Path(__file__).resolve().parent
    source = f"https://raw.githubusercontent.com/oreolag/{args.target}/main/README.md"
    try:
        with urlopen(source, timeout=30) as response:
            markdown = response.read().decode("utf-8")
        # Validate every section before changing any generated file.
        sections = extract_sections(markdown, args.target)
        for name, content in sections.items():
            section = name[len(f"{args.target}_readme_"):]
            title = "Introduction" if section == "intro" else section.replace("_", " ").capitalize()
            destination = docs_root / args.target / f"{name}.md"
            changed = write_section(destination, content, title)
            print(f'{"Generated" if changed else "Unchanged"}: {destination}')
    except (OSError, UnicodeError, ValueError) as error:
        parser.exit(1, f"Import failed: {error}\n")
    return 0


if __name__ == "__main__":
    sys.exit(main())
