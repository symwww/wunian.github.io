# Git Safety Protocol

These rules govern every git operation on this repository. They exist to
prevent committing to the wrong repo, pushing prematurely, or staging
unintended files (PDFs, fonts, secrets, large binaries).

## Rules (this repo)

Before any git operation:

1. **Verify repo root** — run `git rev-parse --show-toplevel` and confirm it
   is the intended project directory.
2. **Confirm remote** — run `git remote -v` and confirm `origin` matches the
   expected repository: `symwww/wunian.github.io`.
3. **Never push automatically** — `git push` only runs after the user has
   explicitly asked for it in that turn.
4. **Stage only after confirmation** — do not `git add` until the user has
   confirmed the change set. Add specific files by name; never `git add -A`.
5. **Show a summary before commit** — present `git status` and the list of
   files to be committed, and let the user review before the commit runs.
6. **Stop if context is unclear** — if the repo root, remote, or branch is
   ambiguous or unexpected, stop and ask the user rather than guessing.

## Quick checklist

```bash
git rev-parse --show-toplevel   # 1. correct repo?
git remote -v                   # 2. correct origin?
git status                      # 5. what will change?
# 4. stage named files only, after confirmation:
git add path/to/file
# 3. push ONLY when the user explicitly asks
```

---

# Template (other websites)

Copy this section into a new project's `_docs/GIT_SAFETY.md` and fill in the
two project-specific values.

> ## Git Safety Protocol
>
> Before any git operation:
>
> 1. Verify repo root with `git rev-parse --show-toplevel`.
> 2. Confirm `origin` matches the expected repository:
>    **`<OWNER>/<REPO>`**.
> 3. Never run `git push` automatically — only on explicit user request.
> 4. Stage changes only after explicit confirmation; add files by name,
>    never `git add -A`.
> 5. Always show a summary of files changed (`git status`) before commit.
> 6. If repo context is unclear, stop and ask the user.

Project-specific values to set:

- `<OWNER>/<REPO>` — the expected GitHub remote (e.g. `symwww/wunian.github.io`)
- Deploy branch / hosting note, if relevant (e.g. GitHub Pages on `main`)
