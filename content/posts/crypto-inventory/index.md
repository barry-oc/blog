---
title: "Finding Where Encryption Lives"
date: 2026-10-21
draft: false
series: ["Post-Quantum Cryptography"]
tags: ["quantum-computing", "cryptography", "post-quantum-cryptography", "inventory", "strategy"]
categories: ["cryptography"]
description: "Before you can fix anything, you have to know where it lives. A practical guide to discovering and cataloguing every place encryption operates in your environment."
---

The first thing you learn in any migration project is that you can't secure what
you can't see. Quantum readiness is no different. Before anyone upgrades an
algorithm or swaps a certificate, the organisation has to answer a much simpler
question: where is the cryptography actually sitting?

That question is harder than it sounds. Encryption has crept into nearly every
layer of modern infrastructure. It lives in the obvious places — web servers,
VPN concentrators, certificate stores — and in plenty of less obvious ones:
embedded controllers, firmware images, backup tapes, configuration files,
third-party SDKs. Some of it was deployed deliberately, with documentation and
ownership. Some of it arrived bundled inside a vendor appliance five years ago
and nobody has looked at it since.

All of it counts. A quantum computer won't care whether the RSA key it breaks
was part of a carefully managed PKI or a forgotten TLS certificate on a
development server. If the key protects data that still matters, the exposure is
real.

This chapter is about building the map. Discovery first, then classification,
then the structures — like the Cryptographic Bill of Materials — that turn a
one-off exercise into something durable.

---

## Three questions every inventory has to answer

A cryptographic inventory isn't a list of certificates. It's the answer to three
questions, asked repeatedly across every system you own:

1. **What crypto is in use?** Not just the protocols, but the specific
   algorithms, key sizes, and configurations.

2. **Where does it sit?** Which servers, which appliances, which codebases,
   which third-party services.

3. **Who or what depends on it?** What breaks if it changes, what data does it
   protect, and how long must that protection last.

Start with the surface area most likely to matter. TLS endpoints on public and
internal services. VPN tunnels — site-to-site and client access. Digital
signatures that verify firmware, packages, and application code. API
certificates. Encrypted storage volumes. Hardcoded keys in IoT firmware.

That list alone covers most of what runs in a typical enterprise. Each entry on
it probably relies on RSA or ECC in some form, and both of those are on the
clock.

---

## What you're actually looking for

Go beyond the obvious. A cryptographic inventory that only counts TLS
certificates misses the bulk of the problem.

### The checklist

Scan for all of this:

- **Transport encryption.** TLS on web servers, APIs, internal services, mail
  servers, and database connections. Don't assume internal traffic is fine just
  because it's behind a firewall. If it uses RSA or ECDH for key exchange, it's
  in scope.
- **VPNs.** IPsec and WireGuard tunnels, SSL VPN appliances, SD-WAN overlays.
  Most established VPN architectures lean heavily on Diffie-Hellman or elliptic
  curve key agreement.
- **Certificates.** Not just the ones on web servers. Code-signing certificates,
  email (S/MIME), client authentication, mutual TLS, and internal PKI
  infrastructure. Expiry isn't the only concern — the algorithm underneath
  matters.
- **Firmware and device signatures.** Anything that boots from signed images.
  Anything that validates a package before installation. If the signing key is
  RSA or ECDSA, a future adversary can forge valid signatures.
- **Data at rest.** Full-disk encryption, database column encryption, backup
  encryption, encrypted archives. The algorithms used to wrap the data keys are
  almost always asymmetric.
- **Embedded and OT.** Industrial controllers, building management systems,
  medical devices. These often have cryptographic functions baked in at the
  factory with no update path.

For every item you find, document more than the algorithm. Capture its *purpose*
(what function does it serve?), its *lifespan* (when was it deployed, when does
it expire or get replaced?), and its *exposure* (is it reachable from the
internet, a partner network, or only locally?).

### Where to begin

Don't try to inventory everything at once. Start with the protocols you already
know about. TLS and VPNs are universal — every organisation uses them, and
they're the easiest to scan. From there, expand outward: certificates, code
signing, firmware verification, storage encryption, and finally the embedded and
operational technology that requires specialised tooling.

### What belongs in each entry

For each cryptographic artifact, record the algorithm family (RSA, ECDSA, AES,
etc.), the key length or curve, the cipher mode where applicable, and the
protocol version. Note whether the implementation supports algorithm
replacement without re-architecting the application — what we'll call
crypto-agility later on.

Then connect the artifact to the data it protects. How sensitive is that data,
and how long does its confidentiality need to hold? A TLS certificate securing
session data with a one-hour lifespan is a fundamentally different priority from
an encryption key wrapping medical records with a statutory thirty-year
retention period. Tying technical findings to data classification is what turns
the inventory from a compliance artefact into a decision-making tool.

---

## Tooling and automation

No one does this by hand at scale. The tooling landscape falls into several
categories.

**Discovery scanners** can crawl networks, interrogate TLS endpoints, enumerate
certificates from public and internal sources, and produce structured output.
They handle the broad sweep — flagging weak configurations, expired
certificates, and compliance gaps. Many can now export a Cryptographic Bill of
Materials directly.

**Quantum readiness platforms** go a step further. They correlate discovery data
against known quantum-vulnerable algorithms, assign risk scores, and track
crypto-agility across the estate. Some include professional services that
combine the scan output with maturity assessments and regulatory mapping.

**Protocol-level analyzers** are for environments where agents can't run.
Embedded systems, industrial controllers, legacy appliances — these need
network-based fingerprinting. The tools are more specialised and the coverage is
less complete, but they're the only option for devices you can't instrument.

Whatever you choose, the real value comes from integration. Plug the scanner
into your CI/CD pipeline so new deployments get checked the moment they're
built. Feed the output into your CMDB or asset management platform so the
inventory stays current. Set up alerts for anything that introduces a
vulnerable algorithm or an unauthorised certificate.

### The process, step by step

Whether the scan is automated or manual, the workflow is the same:

1. **Scope it.** Pick your starting surface — a business unit, a network
   segment, a set of critical applications. Don't boil the ocean.
2. **Scan it.** Run the tools. Get the raw output.
3. **Verify it.** Talk to the people who own the systems. Review configs, build
   scripts, and deployment manifests. Scanners produce false positives and gaps;
   human review closes them.
4. **Document it.** Normalise everything into a consistent format. Algorithm,
   key length, mode, version, owner, data classification.
5. **Map it.** Connect each entry to the asset it protects and the business
   process it supports.
6. **Flag it.** RSA and ECC: high priority. AES-128: watch. AES-256 and SHA-3:
   low risk for now.
7. **Store it.** Put the inventory somewhere version-controlled and
   queryable — not a spreadsheet that goes stale the moment it's saved.

---

## The Cryptographic Bill of Materials

If an SBOM tells you what software components are in a product, a CBOM tells you
what cryptography those components rely on. It's a structured extension of the
SBOM standard, designed to capture cryptographic dependencies with the same
rigour that SBOMs apply to library versions.

Why does this matter? Because most cryptographic risk doesn't come from your own
code. It comes from the library you imported, the framework you depended on, or
the appliance your vendor shipped. A CBOM makes that inherited risk visible.

A well-formed CBOM records the algorithm, the implementation, the key length,
the purpose (signing, encryption, key exchange), and any known quantum
vulnerabilities. It ties each entry to the component that uses it and the
supplier who provided it. This turns an abstract concern — "we might have RSA
somewhere" — into something actionable: "version 2.3.1 of the authentication
library uses RSA-2048 for JWT signing, and the fix is in version 2.4.0."

Beyond development, CBOMs support procurement. When a vendor claims their
product is quantum-ready, a CBOM lets you verify that claim instead of taking it
on faith. They also support compliance: auditors increasingly expect evidence
that cryptographic risk is being managed systematically, and a maintained CBOM
is one of the strongest forms that evidence can take.

### Building one

1. Add cryptographic scanning to your build pipeline. Static analysis can
   identify calls into crypto libraries even when the configuration is hidden.
2. Extract the metadata: algorithm, library name and version, key parameters,
   usage pattern.
3. Express it in a standard format. The CycloneDX CBOM extension is the current
   reference.
4. Commit the result alongside your SBOM in version control.
5. Generate a fresh CBOM with every release so it stays accurate as dependencies
   change.
6. Review it during security assessments, vendor evaluations, and architecture
   reviews — not just at audit time.

---

## Turning findings into priorities

Discovery produces data. Triage turns it into something you can act on.

Every finding should be assessed on three dimensions: the algorithm's
vulnerability to quantum attack, the sensitivity of the data it protects, and
the difficulty of replacing it.

RSA and ECC key exchange are immediately vulnerable once a cryptographically
relevant quantum computer exists. Flag them as high priority regardless of where
they sit. Symmetric algorithms like AES-128 sit in a middle tier — they're not
directly broken by quantum algorithms, but the effective key strength is halved,
which means an upgrade will be needed eventually. AES-256 and SHA-3-based
constructions are fine for now.

Next, link each finding into your broader operational systems. A vulnerable TLS
configuration on an API gateway should create a ticket in your vulnerability
management platform. A certificate shared between a cloud frontend and an
internal service should appear in both asset records. The inventory only
delivers value when it's connected to the systems that drive remediation.

To keep the link live:

- Tag assets with searchable labels: `quantum-vulnerable`, `crypto-agile`,
  `legacy-no-upgrade-path`.
- Wire the scanning tools into CI/CD so new findings surface in real time.
- Define SLA timelines based on severity and exposure — not everything needs to
  be fixed this quarter, but the highest-risk items need hard deadlines.
- Tie CBOM entries to incident response playbooks. If a vulnerability drops in
  a library you depend on, you should be able to identify every affected system
  in minutes.

---

## What the inventory reveals

A complete inventory does more than list encryption. It answers questions about
risk that most organisations have never formally asked.

**Which data matters most?** Walk through your datasets and ask how long each
one needs to stay confidential. Transaction logs might have a short shelf life.
Intellectual property, legal records, and personal health data might need
decades. The data with the longest privacy tail should drive your migration
schedule.

**Which applications handle it?** Map the applications that touch your
high-value data. How do they encrypt it in transit and at rest? What happens
if the trust model breaks — can someone decrypt stored data, impersonate a user,
or inject signed code?

**Where are the weak endpoints?** Some devices will be easy to upgrade. Others
won't. Find the servers running old TLS stacks, the applications with hardcoded
ciphers, the firmware that hasn't seen an update since installation. Catalogue
them now, because they'll take the longest to fix.

**What's happening on the network?** Trace the paths your data travels. Is
encryption applied end-to-end, or are there decryption points where traffic
sits in the clear? Do third-party integrations introduce cryptography you don't
control?

**Where is crypto-agility possible?** Some systems were designed to swap
algorithms. Most weren't. Identify which ones can be reconfigured and which need
to be rebuilt. That distinction will determine your migration timeline more than
anything else.

**How do legacy and OT devices fit in?** These are the hardest problem. Embedded
devices with cryptographic functions burned into silicon. Industrial controllers
that can't be patched without a production outage. Equipment from vendors who
have no post-quantum roadmap. You may not be able to fix these on the same
schedule as your web servers, but you need to know they're there so they don't
get forgotten.

---

## The inventory is never finished

A one-time cryptographic audit has a shelf life measured in weeks. Certificates
expire. Keys rotate. Code ships. New services come online. If your inventory
lives in a static document, it's already wrong by the time you finish reading
it.

The goal is continuous discovery. Wire the scanning tools into the systems that
already manage your infrastructure — CI/CD pipelines, asset databases,
monitoring platforms. When something changes, the inventory should reflect it.
When something appears that shouldn't — a self-signed certificate on a
production endpoint, a legacy cipher enabled after an update — the right people
should know immediately.

None of this is glamorous. Inventory work rarely is. But it's the prerequisite
for every decision that follows. You can't prioritise a migration if you don't
know what you're migrating. You can't measure progress if you don't know where
you started. And you can't claim quantum readiness if you never did the work
to find out what you were running in the first place.

This chapter describes the foundation. The chapters that follow build on it.