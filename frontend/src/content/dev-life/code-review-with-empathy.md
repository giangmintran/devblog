---
title: "Code Review with Empathy"
slug: "code-review-with-empathy"
id: "post-code-review-with-empathy"
summary: "Practical habits to make code review faster, kinder, and more effective for the whole team."
tags: ["team", "career", "decision-making"]
category: "dev-life"
authorId: "admin"
seriesId: "team-collaboration"
status: "published"
publishedAt: "2026-04-06"
updatedAt: "2026-04-07"
coverImage: ""
canonicalUrl: ""
---

## Review the code, not the person

A harsh tone slows down collaboration. Helpful review comments improve code quality and team trust at the same time.

## Comment template I use

- **What I observed**: be specific.
- **Why it matters**: impact on maintainability or bugs.
- **Suggestion**: one concrete alternative.

### Example

```text
Observed: This function does two responsibilities.
Why: It is harder to test and change.
Suggestion: Split parsing and persistence into separate functions.
```

## Team agreements

1. Prefer questions over commands.
2. Keep comments actionable.
3. Approve quickly when concerns are resolved.

## Final thought

Empathy in review is not about being soft. It is about making feedback easier to apply.
