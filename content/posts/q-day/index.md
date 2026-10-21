---
title: "The Day Encryption Stops Working"
date: 2026-10-20
draft: false
series: ["Post-Quantum Cryptography"]
tags: ["quantum-computing", "cryptography", "post-quantum-cryptography", "security-strategy"]
categories: ["cryptography"]
description: "A plain-language look at what changes when quantum computers can break today's encryption — and why long-lived data needs attention now."
---

{{< alert "info" >}}
This is **Part 1** of the *Post-Quantum Cryptography* series — a plain-language
guide to what's coming, why it matters, and what to do about it.
{{< /alert >}}

Most security problems announce themselves. A suspicious login, a port left
open, a file where it shouldn't be. You get a signal, and usually a chance to
respond.

Quantum computing doesn't work that way. There's no alert, no patch, and no log
entry. One day, the math that quietly protects a lot of everyday technology —
secure websites, signed software, encrypted messages — will simply stop being
reliable. It's worth understanding what that means before it happens, because
the fix can't be rushed at the last minute.

---

## What makes quantum computers different

You don't need to understand the physics. The idea that matters is small: these
machines don't work through problems one step at a time the way normal computers
do.

Think of a maze. A normal computer walks one path at a time — down a corridor,
back up, try the next — until it finds the way out. A quantum computer explores
every path at once and settles on the answer.

For most tasks, that difference is only interesting. But for the specific math
that protects most of our online security — the kind behind the padlock in your
browser, digital signatures, and secure messaging — it's a serious problem.
Problems that would take a normal computer billions of years to solve become
quick work for a large enough quantum machine.

---

## When might this happen?

The point at which a quantum computer becomes strong enough to break today's
encryption is often called **Q-Day**. Estimates vary widely — some say the
2030s, others the 2040s.

The exact date matters less than it seems. Think about how long the data you
protect needs to stay private. A credit card number might only matter for a few
years. A patient's medical record, a legal contract, or a government document
may need to stay confidential for decades. If you hold that kind of information,
the timeline is already relevant to you — whichever forecast turns out to be
right.

---

## A problem that's already started

There's a second part to the risk that's easy to miss: encrypted data can be
saved today and unlocked later. An attacker doesn't need a working quantum
computer to begin. They can collect encrypted information now and hold onto it
until the tools catch up.

This has a name — **harvest now, decrypt later** — and it's already happening.
The idea is straightforward: intercept encrypted traffic or copy encrypted files
today, store them, and decrypt them once quantum computers are available.
Re-encrypting your data now doesn't undo it, because the old copy is already
out there.

It changes how we should think about encryption. Most of us treat it as "turn it
on and forget it" — data encrypted, job done. But if data needs to stay private
for a long time and was protected with today's methods, it becomes a problem
waiting for the right tool to arrive.

What gets collected is predictable: anything that keeps its value over time.

- **Medical records and insurance details** — relevant for a person's whole life.
- **Legal documents and contracts** — often significant for decades.
- **Financial records** — payment details, account information, transaction history.
- **Everyday logins and messages** — credentials and private conversations.

One area worth particular attention is **digital certificates** — the system
that confirms a website is really what it claims to be, and that software
updates come from the people they say they do. If an attacker can forge these,
they could impersonate legitimate services or push out fake updates that look
genuine. That's a much bigger deal than any single stolen password.

---

## What actually breaks

It's easy to see this as a privacy problem: encrypted data becomes readable, so
secrets get exposed. That's part of it, but not the most important part.

The bigger issue is trust. Digital signatures prove who sent a message.
Certificates prove you're talking to the real website. Code signing proves
software hasn't been tampered with. These are the mechanisms that let people do
business online without meeting face to face.

When they stop being reliable, you don't just get a data leak. You get:

- **Documents that can't be verified.** A contract, a court filing, or a
  notarised record could have been altered — and there'd be no cryptographic way
  to prove it either way.
- **Fake websites that look genuine.** The certificate check passes, so there's
  no warning.
- **Software updates that can't be trusted.** The signature no longer proves the
  update is what the vendor actually shipped.

To be clear: none of this is happening at scale today. The point is that the raw
material for these problems — encrypted traffic, certificates, signed files — is
being collected now, so the pieces are in place when the capability arrives.

---

## Where to start

The practical response isn't panic. It's a checklist.

Start by finding where you rely on the kind of encryption that's at risk — the
public-key cryptography behind certificates, signatures, and secure connections.
Then identify which of those things would still matter if they were compromised
five or ten years from now. Those are the ones to address first.

The rest of this series walks through that migration: which replacement
algorithms NIST has standardised, how to test them in your own systems, and
where the practical pitfalls are.

The short version: the risk is real but manageable. The work is to find the
things that need protecting long-term, and start moving them to quantum-resistant
encryption before the old methods stop working.
