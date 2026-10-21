---
title: "Finding Where Encryption Lives"
date: 2026-10-21
draft: false
series: ["Post-Quantum Cryptography"]
tags: ["quantum-computing", "cryptography", "post-quantum-cryptography", "inventory", "strategy"]
categories: ["cryptography"]
description: "Before you can fix anything, you have to know where it lives. A practical guide to discovering and cataloguing every place encryption operates in your environment."
---

{{< alert "info" >}}
This is part of the *Post-Quantum Cryptography* series — a plain-language
guide to what's coming, why it matters, and what to do about it. Start with
[Part 1: The Day Encryption Stops Working](/posts/q-day) if you haven't read it.
{{< /alert >}}

Before you can fix anything, you have to know where it lives. In quantum
readiness, that means understanding where cryptography is used, how it's
configured, and what it protects.

Cryptography is everywhere now. Inside operating systems, woven through cloud
platforms, embedded in APIs, baked into firmware, and hidden in hardware. Some of
it is carefully maintained. Some of it is quietly forgotten. All of it matters.

This post is about surfacing that complexity. A successful quantum migration
starts with discovery, and discovery starts with inventory.

---

## Know what you have

Inventorying cryptographic assets may be the hardest part of this transition.
Unlike patching software or scanning endpoints, cryptographic elements rarely
have centralized management. DevOps teams own some. Others are buried deep inside
legacy applications. Many organisations don't know how many certificates they
have, let alone which algorithms those certificates use or how long they're
valid.

You need to answer three questions:

1. **What crypto is used?**
2. **Where is it used?**
3. **Who or what is using it?**

Begin with the protocols and systems most likely to contain vulnerable
cryptographic components: TLS configurations on web servers, VPN tunnels for
remote access, digital signatures that validate software, certificates that
secure APIs, firmware with embedded encryption, IoT devices with hardcoded keys,
and encrypted data-at-rest.

Every one of these may be using RSA, ECC, or another public-key system that
won't survive the quantum shift. Finding them isn't just inventory. It's
strategic defence.

---

## What to look for

A useful inventory goes beyond counting certificates. It covers every place a
cryptographic function appears.

Scan your infrastructure for:

- **TLS settings** in web applications and internal services.
- **VPN connections** relying on Diffie-Hellman or elliptic curve key exchange.
- **Certificates** used for authentication, code signing, and email encryption.
- **Digital signatures** on firmware, drivers, and packages.
- **Encrypted fields** in databases and backup archives.
- **Cryptographic libraries** embedded in IoT and operational technology.

Review each item not just for the algorithm it uses, but for its purpose,
lifespan, and level of exposure.

### Where to start

Start with the protocols and protections you already know are in use. Begin with
TLS and VPNs — the most widely deployed cryptography in any enterprise. Then
move to certificates, code signing mechanisms, firmware verification routines,
data-at-rest encryption, and embedded encryption within IoT and OT devices.

### What to document

Look for specific cryptographic artifacts: public and private key pairs, digital
certificates, session keys, key exchange protocols, and the algorithms in use —
RSA, ECDSA, AES, and their variants.

Trace how these elements protect data-in-motion, data-at-rest, and identity
validation. Examine API traffic, software build pipelines, and remote access
tools. Inventory every piece of software and hardware that uses or depends on
encryption.

Pay close attention to your endpoints. Which devices access sensitive data, and
how is that data protected at the endpoint? What browsers, applications, and
firmware versions are in use? In your network, trace how data moves, where it's
encrypted, and which devices provide protection — gateways, proxies, edge
devices, all of it.

Don't overlook cloud infrastructure, especially when platform services abstract
encryption away behind managed interfaces.

Document the algorithms, key lengths, and cipher modes. Knowing whether a system
uses RSA-2048 or AES-128 tells you exactly how exposed it is. Note whether each
system supports crypto-agility — the ability to swap algorithms without
rewriting the application.

Finally, connect each artifact to the data it protects and how long that data
must remain confidential. A certificate securing three-day session data is a
different problem from one protecting medical records with a thirty-year
retention requirement. This connection makes the inventory actionable.

---

## Tools that help

Several commercial tools support cryptographic discovery at scale.

**IBM Guardium** specialises in data discovery, classifying sensitive
information, and identifying encryption use across environments. It flags weak
configurations, identifies compliance gaps, and can generate Cryptographic Bills
of Materials (CBOMs).

**Sandbox AQ** offers AQtive Guard, a platform that combines analysis with
quantum readiness assessment. It scans your environment, identifies
cryptographic assets, evaluates their vulnerability, and supports long-term
crypto-agility. They also offer a structured Cryptographic Risk Assessment
service that evaluates maturity, identifies gaps, classifies data, and delivers
actionable reports.

**ISARA** helps organisations locate and replace vulnerable cryptographic
protocols, particularly in complex environments with embedded or legacy systems.

To keep the inventory current, integrate these tools into your asset management
platforms or CI/CD pipelines. Automation means your inventory reflects changes
as they happen. Set up alerting for unauthorised cryptographic components so
your team can respond before weaknesses are exploited.

### A practical process

If you're doing this manually, here's the sequence:

1. **Define scope.** Which systems, environments, and networks come first? Start
   with high-value or high-risk areas.

2. **Scan.** Use tools like AQtive Guard or Guardium to generate an initial list
   of where encryption is used.

3. **Validate.** Work with system owners. Review configuration files, logs, and
   application settings. Automated scans miss things.

4. **Document.** Record the specific algorithms, key lengths, cipher modes, and
   protocol versions.

5. **Map.** Tie each cryptographic element to the data or function it protects.

6. **Flag.** Mark each artifact by quantum vulnerability. RSA and ECC: high
   risk. AES-128: flag for future upgrade.

7. **Store.** Put it in a centralised format that can be updated over time and
   reviewed by both security and compliance teams.

---

## Building a Cryptographic Bill of Materials (CBOM)

To manage cryptographic assets at scale, you need structure. That's where a
Cryptographic Bill of Materials comes in. A CBOM is a schema extension of the
Software Bill of Materials (SBOM), built to describe cryptographic components
and their dependencies.

A CBOM is particularly useful in development environments where cryptography is
implemented within the software supply chain. It captures metadata about each
cryptographic component — version, source, dependencies. This makes it easier to
track vulnerabilities, plan replacements, and maintain crypto-agility.

In practical terms, a CBOM documents which algorithms, keys, protocols, and
certificates are in use. It captures expiration dates, key lengths, signing
authorities, and usage context. This metadata tells you not just whether
something is vulnerable, but how difficult it will be to replace and which
business processes depend on it.

When integrated with SBOMs, CBOMs reveal inherited cryptographic risk from
third-party packages, open-source libraries, and vendor-supplied tools. That
visibility strengthens procurement, supports secure development, and aligns with
broader software assurance work.

A CBOM is a working document, not a compliance checkbox. As post-quantum
standards evolve and vendor tools mature, the CBOM helps you track changes,
identify obsolete components, and coordinate upgrades across teams.

### Creating a CBOM

1. Integrate cryptographic scanning tools into your build pipeline.
2. Use static analysis to detect cryptographic function calls and identify
   libraries.
3. Extract metadata for each cryptographic artifact: algorithm name, version,
   key sizes, usage context, and whether it supports quantum-safe alternatives.
4. Use a standardised format — the CBOM schema extension for CycloneDX is the
   current reference.
5. Store CBOMs in version control, where they can be reviewed, updated, and
   audited.
6. Automate CBOM generation as part of your release process so every new build
   carries an associated cryptographic profile.
7. Review CBOMs during security assessments, vendor evaluations, and compliance
   reviews.

---

## Triage: from raw data to action

Once you've identified cryptographic artifacts, you need triage — categorising
findings by risk level, relevance, and actionability. Raw data isn't useful;
prioritised intelligence is.

Start by categorising each finding on three axes: algorithm type, risk profile,
and usage context.

- Findings involving RSA-2048 or ECC-based key exchange: **high risk** — they're
  directly vulnerable to quantum decryption.
- AES-128: **monitor** — flag for future upgrade as cryptanalysis evolves.
- AES-256 or SHA-3: **low risk** for now, pending further research.

Next, link these findings to your asset inventory and SBOM systems. A vulnerable
key exchange in a third-party API should be reflected in your SBOM. A
certificate used in both a cloud gateway and an internal microservice should
have both dependencies visible and traceable.

SBOM formats like CycloneDX and SPDX support custom metadata fields for
cryptographic attributes. Importing triaged findings into these formats allows
for richer risk modelling and traceability across the supply chain.

Once linked, cryptographic findings can trigger tickets in vulnerability
management systems, appear in audit checklists, or prompt review during patch
cycles and third-party assessments.

To keep triage and inventory aligned:

- Use tags (e.g., `quantum-vulnerable`, `crypto-agile`, `legacy-only`) in SBOM
  entries.
- Integrate scanning tools with CI/CD pipelines so new issues are triaged as
  builds are created.
- Establish SLAs for cryptographic risk remediation based on severity, exposure,
  and business impact.
- Correlate CBOM entries with incident response and risk management systems so
  failures can be traced and mitigated quickly.

Linking triaged findings to SBOM platforms and asset inventories gives you
visibility and control — the two things you need to coordinate upgrades, produce
reports, and respond to new standards or vulnerabilities as they emerge.

---

## Beyond the inventory

A strong inventory is more than a list. It's the map you use to navigate your
quantum transition. To make it actionable, go beyond the technical components
and ask harder questions about the systems they protect.

**Start with your data.** What are the highest-value datasets in your
environment? Which ones carry privacy regulations or long-term confidentiality
requirements? Some data matters for a day. Legal contracts, medical records, and
source code may need to stay trustworthy for decades. Those are your
high-priority items.

**Look at your applications.** How do they store and secure the data they
handle? Who uses those systems, and what happens if trust is broken?

**Examine your endpoints.** Where is data stored? Which servers host sensitive
information? What devices access it? Are any running old TLS configurations,
outdated libraries, or unpatched firmware?

**Review your network paths.** How does data move between endpoints? Is traffic
encrypted the entire way? Where does it hit the cloud? Are you relying on
third-party integrations with unknown cryptographic practices?

**Classify each asset by readiness.** Label artifacts that rely on vulnerable
algorithms as quantum-vulnerable. Note where crypto-agility is supported and
where post-quantum tools are already deployed. This pre-migration status helps
prioritise transitions and supports planning.

**Think dynamic, not static.** A one-time scan is a snapshot, but cryptographic
environments change constantly. Keys are added or replaced, certificates expire,
and code updates shift libraries. Implement continuous discovery. Integrate
scanning tools into CI/CD pipelines and asset management. Enable logging and
alerts for unauthorised cryptographic changes.

**Expect trouble with legacy systems.** Embedded devices and industrial
equipment often run on platforms without modern management interfaces. They may
use hardcoded keys or outdated libraries. Where automated tools fall short,
manual audits and coordination with OT teams and device manufacturers will be
necessary.

---

## This is where the work begins

Cryptographic inventory isn't a one-time project. It's an ongoing process built
into how you manage systems, evaluate risk, and maintain compliance. The more
complete your inventory, the more confident you can be in your ability to
identify quantum risk.

The work starts here, with inventory. It's tedious, detailed, and necessary. The
better you understand what you have, the more effectively you can protect it. In
the quantum era, knowing where cryptography resides is the first step in keeping
trust alive.

When your inventory is complete, you'll know what cryptographic assets you have,
what is at risk, where it lives, and what your options are for securing it. With
the right tools and a clear process, you gain a detailed picture of where
cryptography operates in your environment, which algorithms are in use, and
where vulnerabilities exist.

That understanding is the foundation for everything that follows.