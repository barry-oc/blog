---
date: 2026-10-20
categories:
  - tools
---

# sec-headers: Audit Your Security Headers in One Command

Security headers are the cheapest defense you can deploy. They cost nothing,
take minutes to configure, and block entire classes of attacks — XSS,
clickjacking, MIME sniffing, SSL stripping. Yet most sites get them wrong,
or don't set them at all.

I built [**sec-headers**](https://github.com/barry-oc/sec-headers), a fast
Python CLI that audits seven critical HTTP security headers on any website
and gives you a straight A+ through F grade. Here's how it works and why you
should run it on your own stuff.

---

## The seven headers that matter

Not all security headers are equal. I weighted mine by real-world impact:

| Header | Weight | What it does |
|--------|--------|-------------|
| `Strict-Transport-Security` | ★★★★★ | Enforces HTTPS; kills SSL stripping |
| `Content-Security-Policy` | ★★★★★ | Your primary XSS and injection defense |
| `X-Content-Type-Options` | ★★★★ | Blocks MIME-type sniffing attacks |
| `X-Frame-Options` | ★★★★ | Clickjacking protection |
| `Referrer-Policy` | ★★★ | Controls how much info leaks via referrer |
| `Permissions-Policy` | ★★★ | Restricts browser feature/API access |
| `X-XSS-Protection` | ★★ | Legacy XSS filter (CSP supersedes it) |

So `Content-Security-Policy` and `Strict-Transport-Security` each carry
5x the weight of `X-XSS-Protection` in the final grade. Missing HSTS hurts
far more than a weak referrer policy — and it should.

---

## Why I built this

I wanted a single command that answers the question: *"Are these headers
actually doing anything?"*

Existing tools either require a browser extension (manual, doesn't scale),
are SaaS with rate limits, or give you a pass/fail without telling you *why*.

`sec-headers` is different. It's a CLI-first, pipe-friendly tool that:

- **Works on any URL** — give it one or a thousand
- **Explains every finding** — not just "fail," but *what's wrong and how to fix it*
- **Outputs JSON** — wire it into CI, scripts, or bug bounty reports
- **Scores honestly** — weighted grades that prioritize critical headers

---

## What it looks like

```text
$ sec-headers https://example.com

━━━ https://example.com ━━━
  Status: 200  │  Grade: B (82/100)  │  Time: 234ms
  ✓ 4 pass  ⚠ 2 warn  ✗ 1 fail

  Header                         Status   Detail
  ──────────────────────────────  ──────── ──────────────────────────────────────
  Strict-Transport-Security      ✓ PASS   max-age=31536000, includeSubDomains
  Content-Security-Policy        ⚠ WARN   contains 'unsafe-inline'
  X-Content-Type-Options         ✓ PASS   'nosniff'
  X-Frame-Options                ✓ PASS   DENY
  Referrer-Policy                ✗ FAIL   missing
  Permissions-Policy             ⚠ WARN   missing
  X-XSS-Protection               ✓ PASS   '1; mode=block'
```

Every header gets a clear message: what's right, what's wrong, and what to
do about it. No guesswork.

---

## Install and run

```bash
pip install git+https://github.com/barry-oc/sec-headers.git

# Single URL
sec-headers https://yoursite.com

# Pipe from other tools
subfinder -d example.com | httpx -silent | sec-headers

# Batch audit with JSON output
sec-headers -f targets.txt --json | jq '.[] | {url, grade}'
```

---

## The most common problems

Running this against a handful of sites, patterns emerge fast:

1. **Missing `Referrer-Policy`** — by far the most common failure. Set it to
   `strict-origin-when-cross-origin` and move on.
2. **CSP with `unsafe-inline`** — CSP *exists* but is toothless. If you're
   loading third-party scripts with inline handlers, you haven't really
   adopted CSP.
3. **Permissions-Policy absence** — almost nobody sets this.
4. **HSTS without `includeSubDomains`** — max-age looks good, but subdomains
   are left unprotected.

Each of these is a 5-minute fix. The hard part is knowing they exist.

---

## Wire it into CI

The tool exits with code `1` if any header fails, so it slots right into a
pipeline:

```yaml
# GitHub Actions
- name: Audit security headers
  run: |
    pip install git+https://github.com/barry-oc/sec-headers.git
    sec-headers https://staging.example.com
```

Bust the build if your staging environment drops HSTS during a deploy.

---

## What's next

I'm shipping one tool a week. On the shortlist:

- `--diff` mode — compare headers before and after a config change
- Additional header checks (`Clear-Site-Data`, `Cross-Origin-*`)
- Docker image for ephemeral CI use

---

**Run it on your own site.** [github.com/barry-oc/sec-headers](https://github.com/barry-oc/sec-headers)

Pull requests and bug reports welcome.