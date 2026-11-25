#!/usr/bin/env python3
"""Download and extract the marked introduction from a repository's main README.

Usage (run from any directory):
    python3 import_readme.py cli
    python3 import_readme.py mgmt

Writes <docs repository>/<target>/intro.md. Only content between the standalone
<!-- docs:intro:start --> and <!-- docs:intro:end --> markers is copied.
Reads https://raw.githubusercontent.com/oreolag/<target>/main/README.md.
This script never modifies source repositories or commits generated files.
"""

import argparse
from pathlib import Path
import sys
import tempfile
from urllib.request import urlopen

START = '<!-- docs:intro:start -->'
END = '<!-- docs:intro:end -->'


def extract_intro(markdown):
    lines = markdown.splitlines()
    starts = [i for i, line in enumerate(lines) if line.strip() == START]
    ends = [i for i, line in enumerate(lines) if line.strip() == END]
    if len(starts) != 1 or len(ends) != 1:
        raise ValueError('README must contain exactly one standalone intro start marker and one end marker.')
    if starts[0] >= ends[0]:
        raise ValueError('The intro start marker must appear before the end marker.')
    content = '\n'.join(lines[starts[0] + 1:ends[0]]).strip('\n')
    if not content.strip():
        raise ValueError('The marked introduction is empty.')
    return content + '\n'


def write_intro(destination, content):
    # Keep the generated file compatible with the current Fumadocs page schema.
    document = '---\ntitle: Introduction\n---\n\n' + content
    if destination.exists() and destination.read_text(encoding='utf-8') == document:
        return False
    destination.parent.mkdir(parents=True, exist_ok=True)
    temporary = None
    try:
        with tempfile.NamedTemporaryFile(mode='w', encoding='utf-8', newline='\n',
                                         dir=destination.parent, prefix='.intro-', suffix='.tmp',
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
    parser.add_argument('target', choices=['cli', 'mgmt'], help='Source repository and destination content folder.')
    args = parser.parse_args()
    docs_root = Path(__file__).resolve().parent
    source = f'https://raw.githubusercontent.com/oreolag/{args.target}/main/README.md'
    destination = docs_root / args.target / 'intro.md'
    try:
        # Validate the complete source before touching any existing generated file.
        with urlopen(source, timeout=30) as response:
            markdown = response.read().decode('utf-8')
        content = extract_intro(markdown)
        changed = write_intro(destination, content)
    except (OSError, UnicodeError, ValueError) as error:
        parser.exit(1, f'Import failed: {error}\n')
    print(f'{"Generated" if changed else "Unchanged"}: {destination}')
    return 0


if __name__ == '__main__':
    sys.exit(main())
