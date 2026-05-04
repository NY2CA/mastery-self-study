# Wave SS-1.1 — Self-Study build hotfix

**Shipped:** May 2, 2026
**Scope:** Restore the `getCourse(id)` helper to `src/data/courses.ts` that was lost when I rewrote the file in Wave SS-1. Build was failing during `next build` type-check because `src/hooks/useCourse.ts` imports `getCourse` and the new courses.ts didn't export it.

## What changed

`src/data/courses.ts` — added the missing helper:

```ts
export function getCourse(id: string): Course | undefined {
  return COURSES.find((c) => c.id === id);
}
```

Mirrors the Live codebase API verbatim so the shared `useCourse` hook works without modification.

## Files changed

```
src/data/courses.ts     ← added getCourse() helper
```

## Deploy

Same git-push flow as the existing repo:

```bash
cd ~/Downloads
unzip -o mastery-selfstudy-wave-ss-1.1-hotfix.zip

rsync -av ~/Downloads/wave-ss-1-1-hotfix/src/data/courses.ts \
          ~/Documents/mastery-self-study/src/data/courses.ts

cp ~/Downloads/wave-ss-1-1-hotfix/CHANGES-WAVE-SS-1.1.md \
   ~/Documents/mastery-self-study/

cd ~/Documents/mastery-self-study
git add src/data/courses.ts CHANGES-WAVE-SS-1.1.md
git commit -m "Wave SS-1.1: Restore getCourse() helper in data/courses.ts"
git push
```

Netlify auto-rebuilds on push. The build should succeed this time.
