# Context Preservation Guide

## 🎯 The Problem

Kiro sessions can end abruptly without warning, causing complete loss of:
- What you were working on
- What problem you were solving
- What solution you applied
- What the current status is

## ✅ The Solution: Three-Layer Context System

### Layer 1: Real-Time Context (temporary.md) 🔥 CRITICAL

**What**: Copy your Kiro conversation to `temporary.md` every 10-15 minutes

**Why**: This is your ONLY way to preserve the actual conversation if the session ends abruptly

**How**:
1. Select all text in your Kiro conversation
2. Copy it (Cmd+C)
3. Open `temporary.md` in your editor
4. Paste and save (Cmd+V, Cmd+S)
5. Repeat every 10-15 minutes

**When to save**:
- ✅ Every 10-15 minutes during active work
- ✅ Before asking Kiro to do something complex
- ✅ After Kiro completes a major task
- ✅ When you see Kiro is taking a long time

### Layer 2: Structured Context (Hooks) ⚙️

**What**: Automated scripts that save git commits, file changes, and timestamps

**Available Hooks**:

1. **session-checkpoint.sh** (Master hook - use every 30 min)
   ```bash
   bash .kiro/hooks/session-checkpoint.sh
   # or use alias: save
   ```
   Does 3 things:
   - Commits and pushes to git
   - Logs to conversation-history.md
   - Updates resume-context.md

2. **save-conversation.sh** (Save temporary.md)
   ```bash
   bash .kiro/hooks/save-conversation.sh
   # or use alias: save-conv
   ```
   Saves temporary.md to session logs

3. **update-context.sh** (NEW! Manual context update)
   ```bash
   bash .kiro/hooks/update-context.sh
   ```
   Prompts you to describe what you did
   Updates context-summary.md with semantic meaning

### Layer 3: Semantic Context (Manual Updates) 📝

**What**: Human-written descriptions of what was actually accomplished

**Files to Update**:

1. **context-summary.md** - Add session updates at the bottom
   ```markdown
   ## Session Update: 2025-11-17 21:30
   
   ### What Was Accomplished
   Fixed JPA bean conflict by adding bean overriding to application.yml
   
   ### Problem Solved
   Application was failing to start with "jpaAuditingHandler already defined" error
   
   ### Current Status
   Build works, need to test if application starts successfully
   
   ### Next Steps
   1. Test application startup
   2. Complete remaining Phase 1 tasks
   ```

2. **Use the new update-context.sh hook**
   ```bash
   bash .kiro/hooks/update-context.sh
   ```
   This will prompt you for the information and update context-summary.md

## 🔄 Recommended Workflow

### During Active Work (Every 10-15 minutes):
1. Copy Kiro conversation to `temporary.md`
2. Save the file

### Every 30 Minutes:
1. Run checkpoint:
   ```bash
   save  # or: bash .kiro/hooks/session-checkpoint.sh
   ```

### At End of Session:
1. Copy final conversation to `temporary.md`
2. Save conversation:
   ```bash
   save-conv  # or: bash .kiro/hooks/save-conversation.sh
   ```
3. Update semantic context:
   ```bash
   bash .kiro/hooks/update-context.sh
   ```
4. Run final checkpoint:
   ```bash
   save  # or: bash .kiro/hooks/session-checkpoint.sh
   ```

### At Start of New Session:
1. Tell Kiro: "Please read .kiro/SESSION_INIT.md to load the full project context"
2. Kiro will read:
   - temporary.md (if it exists)
   - context-summary.md (with your session updates)
   - All other context files

## 🚨 Critical Rules

### DO:
✅ Copy conversation to temporary.md every 10-15 minutes
✅ Run save-conv at end of session
✅ Run update-context.sh to add semantic meaning
✅ Run checkpoint every 30 minutes
✅ Start new sessions by loading SESSION_INIT.md

### DON'T:
❌ Rely only on automated hooks (they don't capture semantic meaning)
❌ Skip copying to temporary.md (this is your safety net!)
❌ Forget to run save-conv at end of session
❌ Assume Kiro will remember from previous session without loading context

## 🔍 Why the Hooks Alone Aren't Enough

The automated hooks (`session-checkpoint.sh`) capture:
- ✅ Git commits (but with generic messages)
- ✅ File changes (but just names, not what changed)
- ✅ Timestamps

But they DON'T capture:
- ❌ What problem you were solving
- ❌ What solution you applied
- ❌ What the current blocker is
- ❌ The actual conversation content
- ❌ Why you made certain decisions

**That's why you need all three layers:**
1. temporary.md = Real conversation
2. Hooks = Structure and automation
3. Manual updates = Semantic meaning

## 📊 Context Health Checklist

Before ending a session, verify:

- [ ] Latest conversation copied to temporary.md
- [ ] Ran `save-conv` to save temporary.md
- [ ] Ran `update-context.sh` to add semantic context
- [ ] Ran `save` (checkpoint) to commit everything
- [ ] context-summary.md has session update at bottom
- [ ] All changes pushed to GitHub

## 🆘 Recovery: If You Lost Context

If a session ended abruptly and you didn't save:

1. **Check temporary.md**
   - If you were copying conversation there, you have it!
   - Run: `bash .kiro/hooks/save-conversation.sh`

2. **Check git history**
   ```bash
   git log --oneline -10
   git diff HEAD~1
   ```

3. **Check conversation-history.md**
   ```bash
   tail -100 .kiro/session-logs/conversation-history.md
   ```

4. **Manually reconstruct**
   - Look at file changes: `git diff`
   - Look at what was modified
   - Update context-summary.md manually

5. **For next session**
   - Update context-summary.md with what you remember
   - Add a "Session Update" section
   - Be specific about current status and next steps

## 💡 Pro Tips

1. **Set a timer** for 15 minutes to remind you to copy to temporary.md
2. **Use the aliases** - they're faster:
   - `save` instead of `bash .kiro/hooks/session-checkpoint.sh`
   - `save-conv` instead of `bash .kiro/hooks/save-conversation.sh`
3. **Keep temporary.md open** in a split pane while working with Kiro
4. **Write good session updates** - your future self will thank you
5. **Test the recovery** - Try loading context in a new session to verify it works

## 🎓 Example: Perfect Session End

```bash
# 1. Copy final Kiro conversation to temporary.md and save

# 2. Save the conversation
save-conv

# 3. Update semantic context
bash .kiro/hooks/update-context.sh
# Answer the prompts:
# - What did you accomplish? "Fixed JPA bean conflict"
# - What problem? "Application failing to start"
# - Current status? "Build works, need to test startup"
# - Next steps? "Test application, complete Phase 1 tasks"

# 4. Run final checkpoint
save

# 5. Verify everything is saved
git status  # Should show "nothing to commit"
cat .kiro/session-state/context-summary.md | tail -30  # Should show your update
```

## 📚 Related Files

- `.kiro/SESSION_INIT.md` - Instructions for loading context
- `.kiro/session-state/context-summary.md` - Main context file
- `.kiro/hooks/session-checkpoint.sh` - Automated checkpoint
- `.kiro/hooks/save-conversation.sh` - Save temporary.md
- `.kiro/hooks/update-context.sh` - Manual context update
- `temporary.md` - Your conversation backup

---

**Remember**: Context preservation is not optional. It's the foundation that enables long-term development without losing progress!
