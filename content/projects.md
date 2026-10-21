---
title: "Projects"
description: "Open-source security tools I build and maintain — CLI-first, scriptable, and free."
---

I build small, sharp, open-source security tools that solve problems I actually
hit in the field. Each one is **CLI-first**, **scriptable**, and **free** — no
SaaS dashboard, no browser extension, no signup. They slot into the same
pipelines you already run.

---

## sec-headers

**Audit HTTP security headers. Score A+ through F.**

A fast Python CLI that checks the seven security headers that matter most and
gives you an honest, weighted grade — plus a plain-English fix for every
finding.

{{< badge >}}Python{{< /badge >}} {{< badge >}}async{{< /badge >}} {{< badge >}}CLI{{< /badge >}} {{< badge >}}CI-ready{{< /badge >}}

**What it does**

- Audits `HSTS`, `CSP`, `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`, and `X-XSS-Protection`
- Weighted scoring — a missing HSTS costs you more than a weak referrer policy
- Explains *why* each header matters and *how* to fix it
- JSON output for piping into CI, scripts, or bug bounty reports
- Exits non-zero on failure, so it breaks your build when staging regresses

```bash
pip install git+https://github.com/barry-oc/sec-headers.git
sec-headers https://yoursite.com
```

→ [GitHub](https://github.com/barry-oc/sec-headers) · [Read the writeup](/posts/sec-headers-launch/)

---

## vt-scanner

**Check any file against VirusTotal — no browser tabs.**

A CLI that hashes files, queries VirusTotal, and caches every result in SQLite.
Unchanged files never burn an API call twice. Three modes: `scan`, `monitor`,
and `cache`.

{{< badge >}}Python{{< /badge >}} {{< badge >}}VirusTotal{{< /badge >}} {{< badge >}}SQLite{{< /badge >}} {{< badge >}}CLI{{< /badge >}}

**What it does**

- `scan` — hash a directory and print a color-coded verdict table
- `monitor` — watch a folder forever; new files get checked automatically
- `cache` — reuse results by path + modification time, zero wasted API hits
- SHA-256, SHA-1, and MD5 support
- JSON output for scripting; auto-spaces requests to respect rate limits

```bash
pip install git+https://github.com/barry-oc/vt-scanner.git
export VT_API_KEY="your_key_here"
vt-scanner scan ./samples
```

→ [GitHub](https://github.com/barry-oc/vt-scanner) · [Read the writeup](/posts/vt-scanner-launch/)

---

## tls-audit

**Audit any host's TLS, certificate, and post-quantum readiness.**

A Python CLI that connects to a host and reports what it actually negotiates —
certificate details, protocol versions, weak-cipher acceptance, and whether any
post-quantum crypto is in play.

{{< badge >}}Python{{< /badge >}} {{< badge >}}TLS{{< /badge >}} {{< badge >}}cryptography{{< /badge >}} {{< badge >}}CLI{{< /badge >}}

**What it does**

- Parses the certificate: subject, issuer, expiry, key type/size, signature algorithm, SANs
- Verifies the chain against the system trust store
- Probes which of TLS 1.0 / 1.1 / 1.2 / 1.3 are accepted
- Tests RC4, 3DES, NULL, EXPORT, and anonymous cipher acceptance
- Flags whether any post-quantum key exchange or signature is detected
- JSON output; exits non-zero on any failure

```bash
pip install git+https://github.com/barry-oc/tls-audit.git
tls-audit yourhost.com
```

→ [GitHub](https://github.com/barry-oc/tls-audit) · [Read the writeup](/posts/tls-audit-launch/)

---

## In the pipeline

I ship **one tool a week**. Current shortlist:

- **OCSP stapling + certificate transparency** checks for tls-audit
- **`--diff` mode** — compare TLS/header posture before and after a change
- **Docker images** for all three tools — ephemeral CI use, no local Python required
- **More header checks** for sec-headers — `Clear-Site-Data`, `Cross-Origin-*` families

---

## Want a tool?

If there's a repetitive security task eating your time, I probably want to
script it too. [Open an issue](https://github.com/barry-oc) or reach out —
good ideas become the next tool on this page.
