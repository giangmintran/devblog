# When Should You Refactor?

> Refactoring isn't rewriting — it's making code better without changing what it does.

---

## What Is Refactoring?

Refactoring is the process of improving the **internal structure** of existing code without changing its **external behavior**. The goal is to make code easier to read, easier to maintain, and easier to extend over time.

---

## Signs It's Time to Refactor

### 1. Code Smells

These are the most common warning signs:

- **Long functions**: A function doing too many things is hard to read and harder to test.
- **God Classes**: A single class that knows and does too much.
- **Magic numbers/strings**: Hardcoded values scattered throughout the codebase with no explanation.
- **Code duplication**: The same logic appearing in multiple places — fix one, forget the others.
- **Meaningless names**: `x`, `temp`, `doStuff()` tell you nothing about intent.
- **Deep nesting**: Multiple layers of `if/else` turning code into a labyrinth.

### 2. The Rule of Three

> First time: just do it. Second time: wince and duplicate. Third time: refactor.

When you're about to copy-paste a piece of logic for the third time, that's your signal to extract it into a shared function or module.

### 3. Adding a Feature Feels Painful

If every small feature addition requires touching 5–10 unrelated places in the codebase, the architecture is telling you something. The code structure no longer fits the problem it's solving.

### 4. Writing Tests Is Hard

Good code is usually easy to test. If writing a unit test requires mocking half the universe, the code likely has too many responsibilities or is too tightly coupled to its dependencies.

### 5. Right After Fixing a Bug

After fixing a bug, look at the surrounding code. If something makes you think "this is a dangerous area," that's the ideal moment to refactor — you understand the code deeply right now.

### 6. Before Adding a New Feature

Refactor first, then add the feature. Adding features to messy code only makes it messier. Kent Beck calls this: *"Make the change easy, then make the easy change."*

### 7. The Same Code Review Comments Keep Appearing

If reviewers repeatedly flag the same patterns ("extract this function," "rename this variable"), it's a signal for systematic refactoring, not just one-off fixes.

---

## When **Not** to Refactor

- **Deadline pressure**: Refactoring without time to test introduces new bugs under stress.
- **No test coverage**: Refactoring without tests is navigating in the dark — you won't know if something broke.
- **Code about to be deleted**: Don't invest in code that's on its way out.
- **You don't understand the code well enough**: Rushing into refactoring unfamiliar logic can cause more harm than good.

---

## A Safe Refactoring Workflow

```
1. Ensure test coverage exists for the area you're refactoring
2. Make small, incremental changes — don't change everything at once
3. Run tests after each step
4. Commit frequently with clear, descriptive messages
5. Review the result before moving on
```

---

## Summary

| Situation | Should You Refactor? |
|---|---|
| Repeated duplicate logic | ✅ Yes |
| Adding features feels painful | ✅ Yes |
| Right after fixing a bug | ✅ Yes |
| Deadline tomorrow | ❌ No |
| No tests in place | ⚠️ Add tests first |
| Code is about to be removed | ❌ No |

---

> **The Golden Rule**: Always leave the code a little cleaner than you found it — *The Boy Scout Rule*.
