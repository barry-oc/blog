---
title: "The Day Encryption Stops Working"
date: 2026-10-20
draft: false
series: ["Post-Quantum Cryptography"]
tags: ["quantum-computing", "cryptography", "post-quantum-cryptography", "security-strategy"]
categories: ["cryptography"]
description: "A plain-language look at what changes when quantum computers can break today's encryption — and why long-lived data needs attention now."
---

Most threats in cybersecurity give you a sign. A phishing link lands in an
inbox. A port scanner rattles the perimeter. A CVE drops with a severity score
attached. Something happens, and you get a window to react.

The quantum threat doesn't announce itself. It arrives as a change in physics
that quietly undermines the mathematics holding up secure websites, signed
software, encrypted communication, and most of the digital trust infrastructure
the world runs on. There is no patch. There is no log entry. One day the
algorithms stop being reliable, and by the time anyone notices, the data they
were supposed to protect may have already been collected, stored, and broken.

This chapter is about understanding what that means before it happens. Because
the migration away from vulnerable cryptography is not something you can
compress into a weekend sprint after the fact.

---

## How quantum computers are different

You don't need the physics. What matters is that these machines don't solve
problems the way conventional computers do — one step, then the next, working
through possibilities in sequence.

Think of a combination lock. A classical computer tries each number in turn:
0000, 0001, 0002, all the way up. A quantum computer, given the right
algorithm, can explore all the combinations simultaneously and land on the
answer.

For most types of calculation, that's a curiosity. For the specific mathematics
that secures nearly all online communication — the integer factorisation behind
RSA, the discrete logarithm problem behind Diffie-Hellman and elliptic curve
cryptography — it is a direct threat. Problems that would take a conventional
machine longer than the age of the universe become solvable in practical
timeframes on a large enough quantum device.

---

## When this arrives

The moment a quantum computer grows capable of breaking today's public-key
cryptography is often called **Q-Day**. Forecasts range from the early 2030s to
the late 2040s, depending on who you ask and which technical hurdles they expect
to slow progress down.

The precise year matters less than people assume. What matters is how long your
data needs to stay private. A credit card number has a short shelf life. A
patient's medical history, a corporate acquisition document, or a diplomatic
cable might need to remain confidential for thirty years or more. If your
organisation holds that kind of information, you are already inside the window
where the data you protect today could be decrypted before its useful life is
over — no matter which forecast turns out to be right.

---

## The attack that doesn't wait

There is a second dimension to the risk that often gets overlooked, and it
changes the urgency of the whole conversation.

Encrypted data can be copied now and decrypted later. An adversary does not need
a working quantum computer to begin. They need access to encrypted traffic or
stored ciphertext. They collect it. They hold it. When the capability arrives,
they unlock it.

This is called **harvest now, decrypt later**, and it is not theoretical.
Nation-state actors have been recorded intercepting and archiving encrypted
communications for years. The economics are straightforward: storage is cheap,
and data that retains value for a decade or more is worth sitting on.

It also means that upgrading your encryption today does not retroactively
protect data that already left your network under older protection. If sensitive
traffic was intercepted three years ago and stored, turning on post-quantum
encryption tomorrow stops future collection but does nothing about the copy
already sitting on someone else's disk.

What gets harvested is predictable. Anything with long-term value:

- **Medical and insurance records** — relevant for a person's lifetime.
- **Legal documents and contracts** — significant for decades.
- **Financial data** — accounts, transactions, settlement records.
- **Credentials and private communications** — passwords, messages, internal
  discussions.

There is a particular risk around **digital certificates** — the infrastructure
that verifies websites are who they claim to be and that software updates
originate from the vendor that signed them. If an attacker can forge
certificates, they can impersonate legitimate services or distribute
authenticated malware. That's not a privacy breach. It's a trust failure across
the entire system.

---

## What actually breaks

It is tempting to frame this as a confidentiality problem: encrypted things
become readable, so secrets leak. That is true, but it is the smaller half of
the story.

The larger half is integrity. Digital signatures prove provenance. Certificates
prove identity. Code signing proves software hasn't been modified in transit.
These are the mechanisms that let two parties who have never met do business
online with confidence.

When they stop working, the consequences extend well beyond exposed data:

- **Documents lose verifiability.** A legal agreement, a notarised record, or a
  regulatory filing could have been altered — and there would be no
  cryptographic way to settle the question.
- **Impersonation becomes undetectable.** A forged certificate passes validation
  because the underlying mathematics no longer distinguishes real from fake.
- **Software updates become untrustworthy.** A signature that used to guarantee
  a patch came from the vendor now tells you nothing.

None of this is happening at scale today. The point is that the raw material —
encrypted traffic, signed binaries, certificate chains — is being stockpiled
now. The pieces are already in position.

---

## Where to begin

The practical response is not panic. It's a sequence of deliberate steps.

Start by finding where your organisation relies on the kind of cryptography that
quantum computers attack — the public-key algorithms behind TLS, digital
signatures, key exchange, and certificate validation. Then ask the harder
question: which of those protections would still matter if they failed five or
ten years from now? The assets where the answer is yes are your priority list.

The chapters that follow walk through that migration: locating your
cryptographic dependencies, understanding which replacement algorithms have been
standardised, testing them in real environments, and managing the transition
without breaking the systems people depend on every day.

The short version: the risk is real but manageable. The work is to find the
things that need protecting over the long term and start moving them onto
quantum-resistant foundations before the old ones give way.