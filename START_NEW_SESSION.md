# 🚀 How to Start a New Kiro Session

## One Command. That's It.

When you start a new Kiro session, just type this in the chat:

```
Read .kiro/session-state/context-summary.md
```

**Done.** Kiro is now up to speed.

---

## Why This Works

- ✅ `context-summary.md` is **automatically updated** after every task
- ✅ Even if Kiro crashes, the file has the latest status
- ✅ All your progress is saved automatically
- ✅ No manual work required during sessions

---

## During Your Session

**You don't have to do anything!**

Kiro automatically:
- Updates context after each task
- Commits changes to git
- Keeps everything current

---

## Optional: Add Personal Notes

If you want to add notes about what you did:

```bash
bash .kiro/hooks/update-context.sh
```

This lets you add:
- What you accomplished
- Problems you solved
- Things to remember

**But this is optional!** The auto-update already saves the important stuff.

---

## That's It!

**Start session**: `Read .kiro/session-state/context-summary.md`  
**During session**: Nothing (auto-updates)  
**End session**: Just close Kiro (already saved)

---

**No more spending 30 minutes getting Kiro up to speed!**
