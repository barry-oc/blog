---
title: "The Race Against Three Clocks"
date: 2026-11-05
draft: false
series: ["Post-Quantum Cryptography"]
tags: ["quantum-computing", "cryptography", "post-quantum-cryptography", "risk-management", "strategy"]
categories: ["cryptography"]
description: "The Mosca Model reduces quantum risk to a single inequality. Most organisations that run the numbers find they're already behind."
---

One of the more unsettling aspects of quantum risk is that it gives you no signal.
No incident opens a ticket. No alert fires. The threat is purely mathematical: at
some point, probably within the next decade, a machine will exist that can undo
the cryptography protecting most of the world's encrypted data. The only question
that matters is whether you will have finished preparing by the time it arrives.

That question is harder to answer than it looks, because it involves forecasting
three things at once: how long your data needs to stay protected, how long it will
take to replace the cryptography that guards it, and when the quantum threat
actually materialises. Get any of those wrong, and the calculation breaks.

Michele Mosca gave the problem a shape. His model reduces quantum exposure to a
single inequality, and in doing so, it forces organisations to stop treating
post-quantum migration as something that can be deferred.

## What the model says

Michele Mosca is a Canadian mathematician, a professor at the University of
Waterloo, and a co-founder of the Institute for Quantum Computing. For more than
twenty years he has been translating advances in quantum information science into
guidance that governments, financial institutions, and infrastructure operators
can act on. The model that bears his name came out of a straightforward
observation: every organisation is racing three clocks, and the only way to know
whether you are winning is to compare them.

The model is an inequality. It says you are safe only if:

**X + Y < Z**

Each letter measures time, but each measures something different.

**X** is your remediation window. It covers everything from the moment you decide
to act until the moment your last vulnerable system has been migrated, tested, and
signed off. That includes discovery, budgeting, procurement, integration,
validation, and training. If you have never done a cryptographic inventory, your X
is longer than you think.

**Y** is your data's shelf life. How many years must the information you encrypt
today remain confidential? Trade secrets might need a decade. Medical records
might need a lifetime. National security classifications might need more. Y is
the number you cannot shorten without changing what the data is worth.

**Z** is the arrival estimate. When do experts believe a cryptographically
relevant quantum computer will exist — one large enough and stable enough to break
RSA-2048 or ECC-256 in a practical timeframe? Z is the only variable you do not
control.

If the time you need to prepare plus the time your data needs to stay safe adds up
to more than the time remaining before quantum decryption becomes feasible, you
are already exposed. The maths is simple. The implications are not.

## Running the numbers

Suppose your organisation holds intellectual property that needs at least fifteen
years of protection. That sets Y at 15. Now estimate the migration: discovery,
replacement, testing, and operational acceptance across every system that touches
cryptography. If your environment is large, heterogeneous, or light on
documentation, five years would not be unreasonable. That makes X equal to 5.

Current consensus among cryptographers places a plausible arrival date for a
quantum decryption capability somewhere between 2030 and 2035. If the year is
2028, that leaves Z at roughly 7.

The inequality looks like this:

**X (5) + Y (15) = 20**

**Z = 7**

Twenty is larger than seven. The data is at risk.

That calculation only gets worse under Harvest Now, Decrypt Later, the attack
pattern described earlier in this series. If an adversary is recording encrypted
traffic today, they do not need to wait for your migration to finish. They only
need to wait for Z. The longer X stretches, and the longer Y extends, the wider
the window they have to monetise the gap before you close it.

## Why X is the hard one

At first glance, Z looks like the difficult variable because nobody can predict
exactly when a large-scale quantum computer will appear. Estimates shift as
research progresses. But Z is not the one that keeps security architects awake.
The real challenge is X — remediation time — because it is the variable you are
supposed to control, yet it is full of things you cannot yet measure.

Many of the tools and standards needed for a full post-quantum migration are still
maturing. Algorithm selections are finalised, but implementations are incomplete,
hardware support is sparse, and few organisations have run a production PQC
deployment at scale. You might know what needs protecting without knowing what to
replace it with. That makes it nearly impossible to pin down a realistic X.

History offers a sobering reference point. When the industry moved from DES to
3DES, the transition took most of a decade, and back then, cryptographic
operations were largely confined to hardware security modules and dedicated
appliances. Today, encryption is distributed across cloud workloads, mobile
devices, embedded controllers, API gateways, and software supply chains. DES was a
single algorithm in a handful of places. Today's cryptography is a sprawling
dependency graph that most organisations have never fully mapped. If DES took ten
years, a post-quantum migration is unlikely to be faster.

The problem deepens when you add long-lived hardware into the equation. Industrial
control systems, operational technology, and IoT devices are frequently built on
platforms expected to operate for ten, fifteen, or even twenty years. Some of them
run in environments where physical access is difficult. Others use cryptographic
primitives baked into silicon, with no upgrade path short of a hardware swap. In
many cases, quantum-safe alternatives for these platforms do not yet exist.

That leaves two unpalatable choices. Replace the hardware early, absorbing the
capital expenditure and disrupting replacement cycles that were planned years in
advance. Or wait until the normal end-of-life window, which may push X well past
Z, leaving systems and their secrets exposed long before a fix arrives.

This is why many organisations underestimate both X and Y. The question is not
simply how long you want your data to remain confidential. It is how long it will
actually take to replace the cryptography that surrounds it, including the parts
buried inside systems that were never designed to support a migration of this
kind.

## What makes the model stick

The Mosca Model has endured because it cuts through noise. The quantum readiness
conversation is crowded with academic papers, vendor roadmaps, and threat reports
that describe risk in qualitative terms. The model replaces all of that with three
numbers and a comparison operator. It does not tell you how to migrate or what to
migrate to. It tells you whether you have time to figure that out.

That shift matters. The word "someday" is a comfortable place to park a hard
problem. The model takes the problem out of "someday" and anchors it to a specific
timeline. If your systems will still be running in fifteen years, and your
migration will take five, you are already living inside the risk window whether
you acknowledge it or not.

Delay is not a neutral choice under this framework. Every month you postpone the
start of migration is a month you take away from the end. The model makes it
visible that waiting is not preserving options. It is consuming them.

Mosca did not develop this model to frighten people. He built it to break the
cycle of paralysis that often accompanies large-scale cryptographic transitions.
By expressing quantum risk in temporal terms — time to migrate, time data must
survive, time until the threat is real — he gave boardrooms, regulators, and
engineering teams a shared language. Fear is not a strategy. A timeline is.

That timeline is especially legible in sectors where confidentiality obligations
are measured in decades. Financial services firms, for example, are legally
required to protect transaction records, client data, and trade details for
extended periods. An encrypted record from a 2024 trade may need to remain secure
into the 2050s. Banks, payment networks, and clearing houses should already be
piloting hybrid key exchange in their VPN infrastructure and evaluating
post-quantum signature schemes for SWIFT and ISO 20022 messaging flows.

Healthcare faces the same maths with different inputs. Patient records carry
indefinite confidentiality requirements. Government agencies operate under
classification timelines that extend well past the expected arrival of quantum
decryption. Critical infrastructure operators manage hardware lifecycles that
outlast entire generations of enterprise IT. In every one of these sectors, the
Mosca Model produces the same result: start now, because finishing later may mean
not finishing at all.

The deeper threat is not that quantum computers will arrive sooner than the
consensus predicts. The deeper threat is that migration will take longer than
anyone is willing to admit. The model makes that risk impossible to ignore.

Organisations that internalise this have an advantage. They can look past vendor
promises and marketing timelines and build their own readiness assessment. They
can construct rational roadmaps, secure executive sponsorship, and set realistic
expectations with auditors. They do not panic, and they do not procrastinate. They
simply do the arithmetic and act on what it tells them.

## Measuring what you cannot see

If your data has a long shelf life or your systems take years to upgrade, the
Mosca Model may already be telling you something uncomfortable. Many organisations
are closer to their risk threshold than they realise. Some operate with
procurement cycles and infrastructure planning horizons that make rapid change
impossible. Others depend on legacy platforms that resist patching or
reconfiguration. Some steward data — medical histories, financial instruments,
classified material — whose confidentiality requirements extend decades into the
future.

Assessing exposure begins with scope. You do not need a complete cryptographic
inventory to identify the areas most likely to create risk. Start by examining the
systems that support critical business functions or hold long-lived, high-value
information. If a system handles authentication, signs transactions, generates
regulatory reports, or protects sensitive communications, it almost certainly
depends on cryptographic components that need evaluation.

From there, traditional risk assessment frameworks provide a structure for
quantifying what the exposure means. Quantum risk is unconventional in origin, but
it behaves like any other risk once you scope it properly.

Likelihood, in this context, is a function of timing. When does the consensus
suggest a cryptographically relevant quantum computer will arrive? Combine that
with your Y value and your migration estimate to determine whether your window is
still open.

Impact is about consequence. If the cryptography securing a given system were
broken, what would the organisation lose? Confidentiality? Service availability?
System integrity? Would customer data be exposed? Would regulatory standing be
compromised?

Exploitability asks whether the data is both attractive and accessible to an
attacker today. If encrypted traffic can be intercepted and stored now for
decryption later, the exposure is not theoretical. It is present tense.

Several established frameworks can accommodate quantum risk alongside traditional
threats. FAIR — Factor Analysis of Information Risk — expresses exposure in
financial terms, translating threat frequency and probable loss into numbers that
executive teams can weigh against other priorities. The NIST Risk Management
Framework and ISO 27005 offer structured methodologies for documenting quantum
risk within existing information security programmes, ensuring consistent
prioritisation. DoCRA, the Duty of Care Risk Analysis model, evaluates whether an
organisation's protections are reasonable and proportionate given the sensitivity
of the data and the likelihood of harm — a lens that fits compliance-heavy
industries well.

Beyond individual systems, there is the problem of cascading trust failure.
Breaking the encryption on one component can propagate in ways that are hard to
predict. Compromise a certificate authority, and you may be able to impersonate
entire branches of an organisation's digital identity. Undermine cryptographic
integrity in a supply chain, and the consequences can travel outward to customers,
vendors, and regulators. The value of data can sometimes be estimated in revenue
or liability. The value of trust is harder to quantify, but its absence is
unmistakable. If your systems can no longer prove who they are or verify the
information they exchange, operations become difficult to sustain, and stakeholder
confidence erodes quickly.

Not every exposure carries the same weight. The ones that matter most tend to
share three characteristics: long timelines, broad access, and deep connections to
the infrastructure of trust. Identifying those exposures is the first step toward
prioritising them.

## The questions to ask now

The Mosca Model is not a forecast. It is a diagnostic. It tells you whether your
current trajectory intersects with the quantum threat before you are ready, and it
gives you a way to explain that intersection to people who control budgets and
timelines.

Begin with a handful of direct questions.

How long must the information you store remain confidential or trustworthy? Be
conservative. If in doubt, round up.

Which systems in your environment contain or depend on cryptography? You do not
need an exhaustive list on day one, but you need enough to estimate X.

How long would a full migration to post-quantum standards take across those
systems? Factor in discovery, procurement, integration, testing, and operational
validation. If the answer is "we do not know," assume it is at least as long as
your most recent major platform migration — and probably longer.

What share of your environment relies on third-party vendors for cryptographic
functions or security updates? Every external dependency adds time you cannot
directly control.

Do any critical systems run on embedded hardware with decade-scale replacement
cycles? Are there OT, ICS, or IoT devices in the estate that are difficult or
expensive to upgrade?

Has anyone inventoried your cryptographic assets and protocols recently? If the
answer is no, your X starts from a higher baseline.

How soon could quantum computers realistically compromise the cryptographic tools
you rely on today? Consult published estimates from NIST, national cybersecurity
agencies, and the academic community. The range is narrowing.

If these questions point toward a gap — and for most organisations, they will —
the response is not to panic. It is to begin. The Mosca Model does not demand that
you fix everything at once. It demands that you recognise the window is closing
and that every month of delay shortens the time you have to act.

Understanding the model means accepting an uncomfortable truth: if X plus Y
exceeds Z, you are already behind. The organisations that fare best will be the
ones that acknowledge that fact earliest, not the ones with the largest budgets or
the most sophisticated tooling. The race is against time, and the first step is
knowing where the finish line sits.