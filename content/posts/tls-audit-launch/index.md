---
title: "tls-audit: Audit Any Host's TLS in One Command"
date: 2026-10-21
draft: false
tags: ["python", "tls", "cryptography", "tooling", "post-quantum", "defense"]
categories: ["tools"]
description: "A Python CLI that audits a host's TLS configuration, certificate, weak ciphers, and post-quantum readiness."
featureimage: "img/covers/tls-audit.svg"
featureimagecaption: "tls-audit auditing a live host"
---

Security headers are the front door. TLS is the lock. I built
[**sec-headers**](https://github.com/barry-oc/sec-headers) to check the headers;
now here's [**tls-audit**](https://github.com/barry-oc/tls-audit) to check the
lock.

It's a Python CLI that connects to a host and reports what it *actually*
negotiates — not what the config file claims. The certificate, which protocol
versions are enabled, whether known-weak ciphers are accepted, and whether
anything post-quantum is in play.

---

## What it checks

| Check | What it reports |
|-------|-----------------|
| Certificate | subject, issuer, serial, expiry, key type/size, signature algorithm, SANs |
| Chain | whether the certificate chain validates against the system trust store |
| Protocols | which of TLS 1.0 / 1.1 / 1.2 / 1.3 the server accepts |
| Weak ciphers | whether RC4, 3DES, NULL, EXPORT, or anonymous ciphers are accepted |
| Post-quantum | whether any PQC key exchange or signature is detected |

---

## Why I built this

`sec-headers` answers "are your headers doing anything?" It doesn't tell you
the certificate expires next week, that TLS 1.0 is still switched on, or that
a weak cipher is being accepted. Those are transport-layer problems, and they
need their own tool.

There's a second reason. I've been writing about post-quantum cryptography —
the [harvest-now-decrypt-later](/posts/q-day/) problem, where encrypted traffic
gets recorded today and cracked once a quantum computer is available. I wanted
a tool that answers the practical version of that question: *"Is my traffic
quantum-safe right now?"* For almost everyone the honest answer is no, and the
tool says so instead of pretending otherwise.

---

## What it looks like

This is a real run against this site:

```text
━━━ barryocallaghan.com:443  (2606:4700:3033::6815:24f5) ━━━
  Certificate
    Subject     barryocallaghan.com
    Issuer      WE1
    Serial      222020264202809002776278328253571420674
    Expiry      ✓ 89 days remaining
    Key         EC 256 bits (secp256r1)
    Signature   ✓ ecdsa-with-SHA256
    SANs        barryocallaghan.com
  Chain        ✓ validates
  Protocols
    ✓ TLS 1.0  disabled
    ✓ TLS 1.1  disabled
    ✓ TLS 1.2  enabled
    ✓ TLS 1.3  enabled
  Weak ciphers (TLS 1.2)
    • RC4      untestable (unavailable in local OpenSSL)
    • 3DES     untestable (unavailable in local OpenSSL)
    ✓ NULL     not accepted
    • EXPORT   untestable (unavailable in local OpenSSL)
    ✓ ANON     not accepted
  Post-quantum
    ⚠ classical key exchange (no PQC detected)
      → traffic is exposed to harvest-now-decrypt-later
  Result: ✓ clean (1 warning(s))
```

Every line is a claim the tool verified over the wire, not a guess from a
config file.

---

## The post-quantum bit

That last section is the one I care most about. TLS as deployed today uses
classical key exchange (RSA, ECDHE). That means recorded ciphertext is a
future liability — decryptable once a fault-tolerant quantum computer exists.
`tls-audit` checks for any sign of post-quantum key exchange or signatures and
reports what it finds. Today, that's "classical" for effectively every site.
As PQC rolls out, the tool will start flagging the ones that have moved.

The fix isn't "switch on a flag." It's migrating key exchange to hybrid or
ML-KEM-based schemes as implementations mature — the subject of
[Part 2 of the series](/posts/q-day/). This tool is how you'll *verify* that
migration actually happened.

---

## Honest limits

I'd rather tell you what the tool can't do than let you find out mid-audit:

- **Weak-cipher detection depends on your OpenSSL.** Modern OpenSSL 3.x builds
  removed RC4, 3DES, and EXPORT, so on those machines the tool reports
  `untestable` rather than guessing. (`NULL` and `ANON` are still available, so
  those get a definitive answer.)
- **Post-quantum detection is basic.** Python's TLS stack doesn't yet expose
  the negotiated key-exchange group, so detection is limited to cipher-suite
  and certificate-signature names. It correctly says "classical" for today's
  sites, which is the point.
- **This is a health check, not a lab-grade audit.** If you need every cipher
  and extension enumerated, use `testssl.sh` or
  `nmap --script ssl-enum-ciphers`.

`tls-audit` is for a fast, scriptable, honest answer — not a certification
report.

---

## Install and run

```bash
pip install git+https://github.com/barry-oc/tls-audit.git

# Single host
tls-audit example.com
tls-audit example.com:8443

# Batch from a file (one host per line, # for comments)
tls-audit -f hosts.txt

# JSON for scripts and pipelines
tls-audit example.com --json | jq '.[0].certificate.days_left'
```

It exits `1` on any failure — expired cert, SHA-1 signature, sub-2048-bit RSA
key, a chain that won't validate, TLS 1.0/1.1 still on, or a weak cipher
accepted — so it drops straight into CI.

```yaml
# GitHub Actions
- name: Audit TLS
  run: |
    pip install git+https://github.com/barry-oc/tls-audit.git
    tls-audit staging.example.com
```

---

## What's next

Same cadence as the other tools — one release a week. On the shortlist:

- OCSP stapling and certificate transparency checks
- A `--diff` mode to compare posture before and after a change
- Deeper PQC detection as Python's TLS stack exposes negotiated groups

---

**Run it against your own host.**
[github.com/barry-oc/tls-audit](https://github.com/barry-oc/tls-audit)

Pull requests welcome — especially if you find a cipher or extension I'm not
probing yet.
