# Session Continuity Protocols

## Overview

This document defines the protocols for maintaining bulletproof session continuity throughout the 16-20 month development timeline. Following these protocols ensures zero context loss between sessions.

## Core Principles

1. **Log Everything**: Every conversation, decision, and change must be logged
2. **Commit Frequently**: Commit code after every significant change
3. **Document Decisions**: Record why decisions were made, not just what
4. **Preserve Context**: Maintain complete context for seamless resumption
5. **Automate**: Use hooks to automate repetitive tasks

## Hook Usage Guide

### session-start.sh

**When to use**: At the beginning of every development session

**What it does**:
- Creates a new session log file
- Loads previous context
- Shows where you left off
- Displays next tasks

**Usage**:
```bash
bash .kiro/hooks/session-start.sh
```

**Best Practice**: Run this FIRST thing when you start working

### session-checkpoint.sh (Master Hook)

**When to use**: 
- After completing a task
- After making significant progress
- Before taking a break
- At least once per hour of work
- Before ending session

**What it does** (3 actions):
1. **Git Commit & Push**: Saves all code changes
2. **Conversation Log**: Records what was done
3. **Context Summary**: Generates resume context

**Usage**:
```bash
bash .kiro/hooks/session-checkpoint.sh
```

**Best Practice**: Run this frequently! Can't run it too often.

### session-end.sh

**When to use**: At the end of every development session

**What it does**:
- Runs final checkpoint
- Updates session end time
- Ensures everything is saved

**Usage**:
```bash
bash .kiro/hooks/session-end.sh
```

**Best Practice**: ALWAYS run this before closing your terminal

### session-resume.sh

**When to use**: 
- After running session-start.sh
- When you need to remember what you were doing
- When returning after a break

**What it does**:
- Loads all previous context
- Shows recent activity
- Displays next tasks
- Suggests next actions

**Usage**:
```bash
bash .kiro/hooks/session-resume.sh
```

**Best Practice**: Run this whenever you feel lost or need context

### task-complete.sh

**When to use**: After completing a task from tasks.md

**What it does**:
- Marks task as complete in tasks.md
- Updates progress metrics
- Logs completion
- Shows next task

**Usage**:
```bash
bash .kiro/hooks/task-complete.sh <task-number>

# Example:
bash .kiro/hooks/task-complete.sh 1.1.1
```

**Best Practice**: Run immediately after completing and testing a task

### git-sync.sh

**When to use**: 
- When you want to commit and push quickly
- When checkpoint is overkill
- For quick saves

**What it does**:
- Commits all changes
- Pushes to remote

**Usage**:
```bash
bash .kiro/hooks/git-sync.sh "Your commit message"

# Or use default message:
bash .kiro/hooks/git-sync.sh
```

**Best Practice**: Use checkpoint instead for better context preservation

## Typical Session Workflow

### Starting a Session

```bash
# 1. Start session
bash .kiro/hooks/session-start.sh

# 2. Review context (automatically shown by session-start)
# Read the output carefully

# 3. Open relevant files
# - tasks.md (to see next task)
# - requirements.md (to understand requirements)
# - design.md (to understand architecture)

# 4. Start working on next task
```

### During a Session

```bash
# After completing a task:
bash .kiro/hooks/task-complete.sh 1.1.1

# After significant progress (every 30-60 minutes):
bash .kiro/hooks/session-checkpoint.sh

# Quick save (if needed):
bash .kiro/hooks/git-sync.sh "Quick save: working on feature X"
```

### Ending a Session

```bash
# 1. Complete current task or reach a good stopping point

# 2. Run final checkpoint
bash .kiro/hooks/session-checkpoint.sh

# 3. End session
bash .kiro/hooks/session-end.sh

# 4. Review session log (optional)
cat .kiro/session-logs/conversation-history.md
```

## Context Files

### .kiro/session-state/current-phase.json

**Purpose**: Tracks current phase and progress

**When to update**: 
- When moving to a new phase
- When completing major milestones

**Format**:
```json
{
  "currentPhase": "Phase 1: Foundation",
  "phaseNumber": 1,
  "phaseStatus": "in-progress",
  "nextPhase": "Phase 2: Java Complete",
  "completedTasks": ["1.1.1", "1.1.2"],
  "timestamp": "2024-01-15T10:30:00Z"
}
```

### .kiro/session-state/context-summary.md

**Purpose**: Comprehensive context for current state

**When to update**: Automatically updated by session-checkpoint

**Contains**:
- What was accomplished
- Current status
- Next actions
- Important decisions
- Technical environment

### .kiro/session-state/resume-context.md

**Purpose**: Quick resume guide for next session

**When to update**: Automatically updated by session-checkpoint

**Contains**:
- Quick status
- Recent activity
- Where you left off
- Next immediate actions

### .kiro/session-logs/conversation-history.md

**Purpose**: Complete log of all sessions

**When to update**: Automatically updated by session-checkpoint

**Contains**:
- All session entries
- Tasks completed
- Files modified
- Conversations
- Next actions

## Troubleshooting Context Loss

### If You Forget Where You Were

```bash
# 1. Run session resume
bash .kiro/hooks/session-resume.sh

# 2. Read resume context
cat .kiro/session-state/resume-context.md

# 3. Check conversation history
tail -100 .kiro/session-logs/conversation-history.md

# 4. Check git log
git log --oneline -10

# 5. Check task progress
grep "\[x\]" .kiro/specs/comprehensive-learning-portal/tasks.md | tail -5
```

### If Context Files Are Missing

```bash
# 1. Check git history
git log --all --full-history -- .kiro/session-state/

# 2. Restore from git
git checkout HEAD~1 -- .kiro/session-state/

# 3. If all else fails, reconstruct from:
# - Git commit messages
# - Completed tasks in tasks.md
# - Code changes in git diff
```

### If You Made Changes Without Committing

```bash
# 1. Check what changed
git status
git diff

# 2. Review changes carefully

# 3. Commit with descriptive message
git add .
git commit -m "Detailed description of changes"

# 4. Run checkpoint to update context
bash .kiro/hooks/session-checkpoint.sh
```

## Best Practices

### DO:
✅ Run session-start at beginning of every session
✅ Run session-checkpoint frequently (every 30-60 min)
✅ Run session-end at end of every session
✅ Commit after completing each task
✅ Write descriptive commit messages
✅ Document decisions in session logs
✅ Keep context files up-to-date
✅ Review context before starting work

### DON'T:
❌ Skip running hooks
❌ Make changes without committing
❌ Delete context files
❌ Work for hours without checkpoint
❌ End session without running session-end
❌ Ignore uncommitted changes
❌ Forget to push to remote

## Emergency Recovery

### If Everything Is Lost

1. **Check Git Remote**:
   ```bash
   git fetch origin
   git log origin/main
   ```

2. **Restore from Remote**:
   ```bash
   git reset --hard origin/main
   ```

3. **Reconstruct Context**:
   - Review git commit history
   - Check completed tasks in tasks.md
   - Review code to understand current state
   - Manually update context files

4. **Resume Work**:
   ```bash
   bash .kiro/hooks/session-start.sh
   ```

## Automation Tips

### Create Aliases

Add to your `.bashrc` or `.zshrc`:

```bash
alias session-start='bash .kiro/hooks/session-start.sh'
alias session-checkpoint='bash .kiro/hooks/session-checkpoint.sh'
alias session-end='bash .kiro/hooks/session-end.sh'
alias session-resume='bash .kiro/hooks/session-resume.sh'
alias task-done='bash .kiro/hooks/task-complete.sh'
```

Then use:
```bash
session-start
session-checkpoint
task-done 1.1.1
session-end
```

### Set Up Reminders

Use cron or system reminders to remind you to run checkpoints:

```bash
# Remind every hour during work hours
0 9-17 * * * notify-send "Run session-checkpoint!"
```

## Metrics to Track

- **Sessions per week**: Track how often you work
- **Tasks completed per session**: Measure productivity
- **Checkpoint frequency**: Ensure you're saving often
- **Context recovery success**: Measure if protocols work

## Continuous Improvement

- Review session logs monthly
- Identify patterns in context loss
- Update protocols based on learnings
- Share improvements with team

---

**Remember**: Session continuity is not optional. It's the foundation that enables a 16-20 month project to succeed without context loss. Use the hooks religiously!
