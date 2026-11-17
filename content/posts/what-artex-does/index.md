---
title: "What ARTEX Does"
date: 2026-11-17
draft: false
series: ["ARTEX"]
tags: ["artex", "pentesting", "offensive-security", "llm", "ai-security"]
categories: ["security"]
description: "ARTEX hands control of a penetration test to a large language model. Here's what it actually does, how a run works, and where the guardrails sit."
featureimage: "img/covers/artex.svg"
featureimagecaption: "ARTEX mapping a target during a run"
---

Most security tools are deterministic. You give them a target and a checklist, they
work through it, and they hand back whatever matched. ARTEX is a different kind of
tool. It's an open-source platform, released under the AGPL-3.0 licence, that puts
a large language model in charge of the testing loop and lets it decide what to do
next.

The idea is simple enough to state in one line: instead of a scanner running a
fixed script, an agent reads what it finds and chooses its next move. That is the
entire difference between a vulnerability scanner and an agentic penetration test,
and it matters more than most of the surrounding hype suggests.

## A scanner follows a script; an agent reasons

A conventional scanner can only find what its authors anticipated. It looks for
known signatures, checks a list of version strings, and fires the checks it was
shipped with. If a weakness falls outside that list, the scanner walks straight
past it.

An agent behaves differently. It can notice that a login form returns a different
error for a valid username than for an invalid one, connect that observation to a
separate password-reset endpoint, and test a chain that no checklist ever
described. It is not smarter in some abstract sense; it is just willing to follow
a lead instead of waiting for a signature.

That is what ARTEX does. It wraps that reasoning loop in a web application, gives
it a scope and a target, and records everything it does.

## How a run actually works

The workflow is deliberately close to what a human tester would do, just
automated. It starts with a target and a scope, and it ends with a report.

First, you create a task. You give ARTEX a target — a host or application — and
you define the scope, because scope is what keeps the tool honest. In a lab
environment we pointed it at a deliberately vulnerable web application and told it
the root domain was in scope.

From there the agent enumerates. It maps the application, discovers endpoints,
identifies technologies, and builds a picture of what it is looking at. That
picture is rendered live as an asset graph, so you can watch the model's
understanding of the target take shape in real time.

Then it tests. It probes, it attempts, and — this is the part that separates an
agent from a script — it chains findings together. A weak session token found in
one place becomes the key it tries in another. Nothing is fixed in advance.

Every request is recorded. ARTEX keeps a traffic log for the whole session, so the
exploration is reproducible rather than a black box.

And at each point where the agent is about to do something consequential, it stops
and asks. The human-in-the-loop approval gate is not an afterthought; it is a core
part of the design. The model proposes, and a person approves or rejects before
the action executes.

Finally, it writes up the findings into a report, with severity and evidence for
each issue, so the run ends in something a team can actually act on.

## The guardrails are part of the design

A tool whose job is to break into things needs limits built into it, not bolted
on. ARTEX ships with them.

The source includes a set of automatic deny rules — eighteen in the version we
reviewed — patterns the agent is flatly refused, no matter what the model
proposes. These cover the obvious lines a testing tool should never cross, such
as attempts to destroy a system, exfiltrate data, or act outside the declared
scope.

That is only the first layer. The defence is stacked three deep. Automatic deny
rules reject known-bad actions outright. A second layer, a judge, reviews the
model's proposals for anything the static rules might have missed. And a third
layer checks every action against the task's authorised scope before it can run.

The result is that the autonomy is bounded. The model has freedom to explore, but
only within a space that has already been walled off from the outcomes nobody
wants.

## What it is, and what it is not

ARTEX is best understood as an assistant, not a replacement. It removes the
mechanical work of enumeration and testing, and it can pursue chains of reasoning
a human would, but it still needs a scope set by someone who understands the
target, and it still needs a person to approve the high-impact steps.

It is also not magic. The quality of the run depends on the model behind it, on
the scope that was set, and on the person watching the approval queue. Tooling
like this raises the ceiling on what a small team can cover, but it does not
remove the need for judgement.

That, in the end, is what the tool does: it turns a language model into a
penetration tester's working partner, with the guardrails that role demands.
