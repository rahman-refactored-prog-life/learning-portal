# How to Prevent Context Loss When Sessions End Unexpectedly

## The Problem

Kiro sessions can end suddenly without warning due to:
- ⏱️ Timeout (inactivity)
- 🔢 Token limits reached
- 🌐 Connection issues
- 💻 Browser/app crashes

When this happens, **the entire conversation is lost** unless you saved it.

## The Solution: Multiple Safety Nets

Use **all three** of these strategies to ensure you never lose work:

---

## Strategy 1: The Temporary File Method (BEST)

This is what you've been doing, and it works great!

### Setup (One Time)

1. Keep `temporary.md` open in your editor
2. Position it side-by-side with Kiro

### During Your Session

**Every 10-15 minutes:**

1. **Select all** the Kiro conversation (Cmd+A / Ctrl+A)
2. **Copy** it (Cmd+C / Ctrl+C)
3. **Switch to** `temporary.md`
4. **Select all** in temporary.md (Cmd+A / Ctrl+A)
5. **Paste** the conversation (Cmd+V / Ctrl+V)
6. **Save** the file (Cmd+S / Ctrl+S)

This takes **5 seconds** and saves your entire conversation!

### When Session Ends (Expected or Unexpected)

Run this command:
```bash
bash .kiro/hooks/save-conversation.sh
```

This will:
- ✅ Copy `temporary.md` to session logs
- ✅ Ask if you want to run a full checkpoint
- ✅ Preserve everything

---

## Strategy 2: Regular Checkpoints

Set a **30-minute timer** on your phone/computer.

When it goes off, run:
```bash
bash .kiro/hooks/session-checkpoint.sh
```

This saves:
- ✅ Git commit (all code changes)
- ✅ Conversation log (appended to history)
- ✅ Context summary (for next session)

**Pro Tip**: Create a shell alias:
```bash
alias save='bash .kiro/hooks/session-checkpoint.sh'
```

Then just type `save` every 30 minutes!

---

## Strategy 3: Checkpoint After Important Actions

Run checkpoint immediately after:
- ✅ Completing a task
- ✅ Fixing a bug
- ✅ Making an important decision
- ✅ Having a breakthrough
- ✅ Before taking a break

```bash
bash .kiro/hooks/session-checkpoint.sh
```

---

## Quick Reference: All Save Commands

### Save Conversation from temporary.md
```bash
bash .kiro/hooks/save-conversation.sh
```

### Full Checkpoint (Git + Logs + Context)
```bash
bash .kiro/hooks/session-checkpoint.sh
```

### Quick Git Save (No logs)
```bash
bash .kiro/hooks/git-sync.sh "Quick save"
```

### End Session Properly
```bash
bash .kiro/hooks/session-end.sh
```

---

## Workflow Example

### Morning (Start Session)
```bash
# Terminal
bash .kiro/hooks/session-start.sh

# Kiro
Please read .kiro/SESSION_INIT.md to load the full project context
```

### Every 15 Minutes (During Work)
1. Copy Kiro conversation
2. Paste into `temporary.md`
3. Save file

### Every 30 Minutes (Checkpoint)
```bash
bash .kiro/hooks/session-checkpoint.sh
```

### After Completing Task
```bash
bash .kiro/hooks/task-complete.sh 1.2.3
bash .kiro/hooks/session-checkpoint.sh
```

### Evening (End Session)
```bash
# Save final conversation
bash .kiro/hooks/save-conversation.sh

# End session
bash .kiro/hooks/session-end.sh
```

---

## Recovery: What If You Forgot to Save?

### If You Have temporary.md
```bash
# Save it immediately!
bash .kiro/hooks/save-conversation.sh
```

### If You Lost Everything
Check what's in git:
```bash
# See recent commits
git log --oneline -10

# See what was changed
git show HEAD

# Check conversation history
tail -100 .kiro/session-logs/conversation-history.md
```

You might have saved more than you think!

---

## Automation Ideas

### 1. Create Shell Aliases
Add to `~/.zshrc` or `~/.bashrc`:
```bash
alias save='bash .kiro/hooks/session-checkpoint.sh'
alias save-conv='bash .kiro/hooks/save-conversation.sh'
alias kiro-start='bash .kiro/hooks/session-start.sh'
alias kiro-end='bash .kiro/hooks/session-end.sh'
```

### 2. Set Up Reminders
Use your OS to remind you:

**macOS:**
```bash
# Remind every 30 minutes during work hours
osascript -e 'display notification "Run: save" with title "Kiro Checkpoint"'
```

**Linux:**
```bash
notify-send "Kiro Checkpoint" "Run: save"
```

### 3. Use a Timer App
- Set recurring 30-minute timer
- Label it "Kiro Checkpoint"
- When it goes off, run `save`

---

## Best Practices

### ✅ DO:
- Keep `temporary.md` open while working
- Copy conversation every 10-15 minutes
- Run checkpoint every 30 minutes
- Save after completing tasks
- End sessions properly with `session-end.sh`

### ❌ DON'T:
- Work for hours without saving
- Close Kiro without saving conversation
- Forget to copy to `temporary.md`
- Skip checkpoints because "it's working fine"
- Assume the session will stay open

---

## The Golden Rule

**If you haven't saved it in the last 15 minutes, you're at risk of losing it.**

Set a timer. Make it a habit. Save often.

---

## Summary: Your Safety Net

1. **Every 10-15 min**: Copy conversation to `temporary.md`
2. **Every 30 min**: Run `bash .kiro/hooks/session-checkpoint.sh`
3. **After tasks**: Run checkpoint
4. **End of day**: Run `bash .kiro/hooks/save-conversation.sh`

Follow this, and you'll **never lose context again**! 🎯

---

**Created**: 2025-11-17
**Purpose**: Prevent context loss from unexpected session endings
**Status**: ✅ Ready to use
