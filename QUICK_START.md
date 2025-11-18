# Quick Start - New Kiro Session

## 🚀 Starting a New Session (2 Steps)

### Step 1: Terminal
```bash
bash .kiro/hooks/session-start.sh
```

### Step 2: Kiro (Copy-Paste This)
```
Please read .kiro/SESSION_INIT.md to load the full project context
```

**That's it!** Kiro will now have full context from all previous sessions.

---

## 📋 During Your Session

### Save Progress Regularly
```bash
bash .kiro/hooks/session-checkpoint.sh
```
Run this every 30-60 minutes or after completing a task.

### Mark Task Complete
```bash
bash .kiro/hooks/task-complete.sh 1.2.3
```
Replace `1.2.3` with the actual task number.

### End Session
```bash
bash .kiro/hooks/session-end.sh
```
Run this before closing your terminal.

---

## 🔧 Quick Commands

### Build Backend + Frontend
```bash
cd backend
mvn clean package
```

### Run Development Mode
```bash
# Terminal 1 - Backend (port 2025)
cd backend && mvn spring-boot:run

# Terminal 2 - Frontend (port 2026)
cd frontend && npm run dev
```

### Run Production Mode
```bash
cd backend
mvn clean package
java -jar target/learning-portal-backend-1.0.0-SNAPSHOT.jar
# Access at http://localhost:2025
```

---

## 📊 Check Status

### View Current Phase
```bash
cat .kiro/session-state/current-phase.json
```

### View Next Tasks
```bash
grep "\[ \]" .kiro/specs/comprehensive-learning-portal/tasks.md | head -5
```

### View Recent Activity
```bash
git log --oneline -5
```

---

## 🆘 Troubleshooting

### Context Not Loading?
```bash
bash .kiro/hooks/session-resume.sh
```
Then provide the output to Kiro.

### Build Issues?
```bash
cd backend
mvn clean compile
```
Check the error and ask Kiro for help.

### Git Issues?
```bash
git status
git log --oneline -3
```
Share the output with Kiro.

---

## 📁 Important Files

- **Tasks**: `.kiro/specs/comprehensive-learning-portal/tasks.md`
- **Context**: `.kiro/session-state/resume-context.md`
- **Logs**: `.kiro/session-logs/conversation-history.md`
- **Build Fix**: `BUILD_FIXED.md`
- **This Guide**: `HOW_TO_START_NEW_SESSION.md`

---

**Remember**: Always start with `Please read .kiro/SESSION_INIT.md` in new Kiro sessions!
