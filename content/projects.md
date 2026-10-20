---
title: "Projects"
description: "Open-source security tools I've built and maintain."
---

Open-source security tools I've built and maintain.

---

## [sec-headers](https://github.com/barry-oc/sec-headers)

**Audit HTTP security headers. Scores A+ through F.**

A fast async Python CLI that checks 7 critical security headers on any
website. Pairs nicely with subfinder, httpx, or your bug bounty workflow.

```bash
pip install sec-headers
```

→ [GitHub](https://github.com/barry-oc/sec-headers) · [Blog post](/posts/sec-headers-launch/)

---

## [vt-scanner](https://github.com/barry-oc/vt-scanner)

**Scan files against VirusTotal. Hash caching, rate-limited.**

A CLI that hashes files and checks them against VirusTotal's database.
SQLite caching means unchanged files never hit the API twice. Three modes:
`scan`, `monitor`, and `cache`.

```bash
pip install git+https://github.com/barry-oc/vt-scanner.git
```

→ [GitHub](https://github.com/barry-oc/vt-scanner) · [Blog post](/posts/vt-scanner-launch/)
