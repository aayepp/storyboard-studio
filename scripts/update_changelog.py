#!/usr/bin/env python3
"""Auto-update CHANGELOG in src/App.jsx before every git push."""
import subprocess, re, sys
from datetime import datetime

APP = 'src/App.jsx'
content = open(APP, encoding='utf-8').read()

# Get latest commit message
msg = subprocess.check_output(['git', 'log', '-1', '--pretty=%s'], text=True).strip()

# Get HIGHEST version from CHANGELOG
all_versions = re.findall(r"version:\s*'v(\d+)\.(\d+)'", content)
if not all_versions:
    print('[changelog] Could not find version — skipping')
    sys.exit(0)

major, minor = max(all_versions, key=lambda x: (int(x[0]), int(x[1])))
new_version = f'v{int(major)}.{int(minor) + 1}'
today = datetime.now().strftime('%#d %b %Y')

# Build new entry
new_entry = f"""  {{
    version: '{new_version}', date: '{today}', isNew: true,
    changes: [
      '{msg}',
    ]
  }},\n"""

# Set all existing isNew: true → false
content = content.replace("isNew: true,", "isNew: false,")

# Insert new entry at top of CHANGELOG array
content = content.replace('const CHANGELOG = [\n', f'const CHANGELOG = [\n{new_entry}', 1)

open(APP, 'w', encoding='utf-8').write(content)
print(f'[changelog] Added {new_version} — {today}: {msg}')
