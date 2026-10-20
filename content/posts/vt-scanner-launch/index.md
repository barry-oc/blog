---
title: "vt-scanner: Check Any File Against VirusTotal in One Command"
date: 2026-10-20
draft: false
tags: ["python", "virus-total", "malware", "tooling"]
categories: ["tools"]
description: "A CLI that hashes files, checks VirusTotal, and caches results — no browser tabs required."
featureimage: "img/covers/vt-scanner.svg"
featureimagecaption: "vt-scanner verdict table"
---

If you handle suspicious files — malware samples, email attachments, downloads
from sketchy URLs — you've done the dance: hash the file, open VirusTotal,
paste the hash, wait, repeat. It's slow, manual, and burns your attention on
process instead of analysis.

I built [**vt-scanner**](https://github.com/barry-oc/vt-scanner), a CLI that
automates the entire workflow. Point it at a directory and it hashes every
file, checks VirusTotal, caches results, and tells you what's clean and what's
not. No browser tabs, no copy-paste, no wasted API calls.

## What it does

Three subcommands, each for a different workflow:

### `scan` — one-shot audit

```bash
vt-scanner scan ./malware-samples
```

Hashes every file, checks VT, prints a verdict table:

```text
FILE                                 VERDICT    ENGINES  NAME                LAST SEEN
──────────────────────────────────── ────────── ──────── ─────────────────── ────
samples/legit-setup.exe              CLEAN       0/72   setup_installer      2026-10-15
samples/backdoor.dll                 MALICIOUS  12/72   Trojan.Generic       2026-10-18
samples/unknown.bin                  UNKNOWN       -    -                         -
```

Malicious files are highlighted in red, suspicious in yellow, clean in green.
JSON output is available for scripting.

### `monitor` — continuous watch

```bash
vt-scanner monitor ~/Downloads --interval 60
```

Monitors a directory forever. New or modified files get hashed and checked
automatically. Good for a malware analysis VM, a shared download folder, or
monitoring where you drop samples during triage.

### `cache` — don't waste API calls

```bash
vt-scanner cache stats
```

Every lookup is stored in a local SQLite database. If a file hasn't changed
(same path, same modification time), the cached result is reused — zero API
hits. This is the main upgrade over the manual copy-paste workflow.

---

## Install and run

```bash
pip install git+https://github.com/barry-oc/vt-scanner.git
export VT_API_KEY="your_key_here"

vt-scanner scan ./samples
vt-scanner monitor ./incoming --interval 30
```

VirusTotal free tier allows **4 requests per minute**. The scanner spaces
requests automatically — set `--rate-limit` if you have a higher-tier key.

---

## Why I built this

The original version of this tool was a loop-and-sleep Python script I'd been
using for months. It worked but had all the usual raw-script problems:

- API key hardcoded in the file
- `time.sleep(30)` between every request regardless of rate limit
- Results printed as unformatted Python objects
- No caching — same file checked 50 times
- Only SHA-256

The rewrite adds proper CLI design (argparse, three subcommands), structured
caching (SQLite with path+mtime tracking), formatted output (color tables +
JSON), and support for SHA-256, SHA-1, and MD5. Same core idea, but it
doesn't feel like a script someone duct-taped together at 2am.

---

## Pipe it

JSON output makes it scriptable:

```bash
# Find all malicious files
vt-scanner scan ./samples --json | jq '.[] | select(.result.last_analysis_stats.malicious > 0)'

# Export clean files to a list
vt-scanner scan ./samples --json | jq -r '.[] | select(.result.last_analysis_stats.malicious == 0) | .path' > clean.txt
```

---

**Run it on your samples.** [github.com/barry-oc/vt-scanner](https://github.com/barry-oc/vt-scanner)

Pull requests and feature ideas welcome — especially if you have an edge case
in your malware workflow I haven't thought of yet.
