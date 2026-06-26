# Technical Debt

> *Reference: [Refactoring Guru — Technical Debt](https://refactoring.guru/refactoring/technical-debt)*

## Overview

Every developer strives to write clean code from the start — no one intentionally writes messy code to harm their project. Yet clean code can degrade over time. This is where the concept of **technical debt** comes in.

The metaphor was originally coined by **Ward Cunningham**. It works like a bank loan: borrowing money lets you move faster now, but you pay back more later — principal plus interest. If interest accumulates faster than you can repay it, you eventually become unable to pay it off at all.

The same applies to code. Skipping tests to ship features faster may seem like a win in the short term, but the slow-down compounds daily until you eventually pay off the debt through proper refactoring and testing.

---

## Causes of Technical Debt

### 1. Business Pressure
Competitive or deadline-driven circumstances can push teams to ship features before they're fully finished. The result: patches and workarounds that paper over incomplete implementations.

### 2. Lack of Understanding of Consequences
Management may not grasp that technical debt accrues "interest" — meaning it actively slows down future development. Without that understanding, there's little buy-in for allocating time to refactoring.

### 3. Failing to Combat Tight Component Coupling
When a project grows into a monolith instead of well-separated modules, changing one part ripples through everything else. This makes parallel team development difficult and increases the risk of regressions.

### 4. Lack of Tests
Without tests, there's no safety net — developers resort to quick, risky workarounds. In the worst cases, untested changes go straight to production with potentially catastrophic results (corrupted databases, broken emails, system outages).

### 5. Lack of Documentation
Poor documentation slows onboarding of new team members and can bring development to a halt if key contributors leave the project.

### 6. Lack of Interaction Between Team Members
When knowledge isn't distributed across the team, people operate on outdated assumptions. This problem worsens when junior developers are mentored incorrectly or in isolation.

### 7. Long-Term Development in Parallel Branches
Working in long-lived feature branches accumulates debt that multiplies when branches are merged. The longer the isolation, the larger the integration burden.

### 8. Delayed Refactoring
Requirements evolve, and code that once made sense can become obsolete or cumbersome. The longer refactoring is deferred, the more dependent code piles up on top of outdated foundations — making the eventual cleanup far more expensive.

### 9. Lack of Compliance Monitoring
Without enforced coding standards, every developer writes code however they prefer. Inconsistency compounds over time into a fragmented, hard-to-maintain codebase.

### 10. Incompetence
Sometimes the root cause is simply that a developer lacks the knowledge to write maintainable code. This isn't always avoidable, but it can be addressed through mentorship, code reviews, and continuous learning.

---

## Key Takeaways

- Technical debt is **not always intentional** — it often accumulates gradually from reasonable short-term decisions.
- Like financial debt, it **accrues interest**: the longer it's left unpaid, the more it costs to address.
- The best way to manage technical debt is **proactive refactoring**, clear documentation, thorough testing, and a shared team culture around code quality.
- **Management alignment** is essential — without understanding the cost of debt, teams won't get the time needed to repay it.
