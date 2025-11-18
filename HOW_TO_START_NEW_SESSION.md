# How to Start a New Kiro Session with Full Context

## The Problem You're Experiencing

When you start a new Kiro conversation, Kiro doesn't automatically know about:
- Previous work done
- Current phase and progress
- Technical decisions made
- Build configurations
- Issues that were resolved

This causes you to have to re-explain everything, which is frustrating and wastes time.

## The Solution

At the start of **EVERY new Kiro conversation**, use this exact message:

```
Please read .kiro/SESSION_INIT.md to load the full project context
```

That's it! This single command will make Kiro load all the context from previous sessions.

## What Happens When You Do This

1. **Kiro reads SESSION_INIT.md** - Gets instructions to load context
2. **Kiro loads all context files**:
   - `.kiro/session-state/resume-context.md` - Last session summary
   - `.kiro/session-state/context-summary.md` - Complete project state
   - `.kiro/session-state/current-phase.json` - Phase and progress
   - `.kiro/session-logs/conversation-history.md` - Recent conversations
   - `.kiro/specs/comprehensive-learning-portal/tasks.md` - Task list

3. **Kiro responds with current status**:
   - What phase you're in
   - How many tasks are complete
   - What was accomplished last session
   - Asks what you want to work on

## Example Workflow

### Step 1: Start Terminal Session
```bash
cd /path/to/interview-prep-attempt-100
bash .kiro/hooks/session-start.sh
```

This will show:
```
🚀 Starting New Session...
⚠️  IMPORTANT: If starting a NEW Kiro conversation, tell Kiro:
   'Please read .kiro/SESSION_INIT.md to load the full project context'
```

### Step 2: Start New Kiro Conversation

In Kiro, type:
```
Please read .kiro/SESSION_INIT.md to load the full project context
```

### Step 3: Kiro Loads Context

Kiro will respond with something like:
```
✅ Context loaded from previous sessions!

Current Status:
- Phase: Phase 1 - Foundation and Infrastructure
- Progress: 31/229 tasks (13.5%)
- Last Session: Fixed build issues, Node.js v22.12.0
- Build Status: ✅ Working perfectly
- Repository: Clean and optimized (868 KB)

What would you like to work on?
```

### Step 4: Continue Working

Now you can continue where you left off without re-explaining anything!

## Why This Works

The SESSION_INIT.md file contains explicit instructions for Kiro to:
1. Read all the context files
2. Load the project state
3. Understand what was done previously
4. Know what to work on next

Without this, Kiro starts "fresh" each time with no memory of previous sessions.

## What If You Forget?

If you forget to load the context and Kiro seems confused:

1. **Stop and load context**:
   ```
   Please read .kiro/SESSION_INIT.md to load the full project context
   ```

2. **Or provide recent context manually**:
   ```
   Please read .kiro/session-state/resume-context.md
   ```

## Making It Easier

### Create a Shell Alias

Add to your `~/.zshrc` or `~/.bashrc`:

```bash
alias kiro-start='cd /path/to/interview-prep-attempt-100 && bash .kiro/hooks/session-start.sh && echo "" && echo "📝 Now tell Kiro: Please read .kiro/SESSION_INIT.md to load the full project context"'
```

Then just run:
```bash
kiro-start
```

### Create a Text Snippet

Save this in a text file or snippet manager:
```
Please read .kiro/SESSION_INIT.md to load the full project context
```

Then copy-paste it at the start of each Kiro session.

## Files That Preserve Context

These files are automatically maintained by the session hooks:

```
.kiro/
├── SESSION_INIT.md                    ← Read this first!
├── session-state/
│   ├── resume-context.md              ← Quick resume guide
│   ├── context-summary.md             ← Complete project state
│   └── current-phase.json             ← Phase and progress
├── session-logs/
│   ├── conversation-history.md        ← All conversations
│   └── session-YYYY-MM-DD-HH-MM-SS.md ← Individual sessions
└── specs/comprehensive-learning-portal/
    ├── tasks.md                       ← Task list with checkboxes
    ├── requirements.md                ← Project requirements
    └── design.md                      ← Architecture design
```

## Troubleshooting

### If Kiro Still Doesn't Have Context

1. **Check context files exist**:
   ```bash
   ls -la .kiro/session-state/
   ```

2. **Regenerate context**:
   ```bash
   bash .kiro/hooks/session-resume.sh
   ```

3. **Provide the output to Kiro**:
   ```
   Here's the output from session-resume:
   [paste output]
   ```

### If Context Files Are Missing

Run a checkpoint to regenerate them:
```bash
bash .kiro/hooks/session-checkpoint.sh
```

## Summary

**Always start new Kiro sessions with:**
```
Please read .kiro/SESSION_INIT.md to load the full project context
```

This one command solves the context loss problem and lets you continue seamlessly!

---

**Created**: 2025-11-17
**Purpose**: Solve context loss between Kiro sessions
**Status**: ✅ Ready to use
