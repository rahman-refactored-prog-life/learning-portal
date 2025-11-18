# 🌐 How to Access Your Learning Portal

## Quick Access

### Frontend (User Interface)
```
http://localhost:3000
```

### Backend API
```
http://localhost:2025
```

### API Documentation (Swagger)
```
http://localhost:2025/swagger-ui.html
```

---

## 🚀 Quick Start (3 Steps)

### Step 1: Install Frontend Dependencies (First Time Only)
```bash
cd frontend
npm install
```

### Step 2: Start Backend
```bash
cd backend
mvn spring-boot:run
```
Backend will be available at **http://localhost:2025**

### Step 3: Start Frontend (New Terminal)
```bash
cd frontend
npm run dev
```
Frontend will be available at **http://localhost:3000**

---

## 🎯 What You'll See

### 1. Login Page (http://localhost:3000/login)
- Beautiful AWS-inspired design
- Username/Email and Password fields
- "Sign In" button
- Link to register page

### 2. Register Page (http://localhost:3000/register)
- Create new account
- Username, Email, Password fields
- Password confirmation
- "Create Account" button

### 3. Dashboard (http://localhost:3000/dashboard)
- Welcome message with your username
- Progress cards
- Streak counter
- Questions solved counter

---

## 📱 Features You Can Try

✅ **Create Account**
- Go to /register
- Fill in username, email, password
- Click "Create Account"
- Automatically logged in!

✅ **Login**
- Go to /login
- Enter credentials
- Click "Sign In"
- Redirected to dashboard

✅ **Protected Routes**
- Try accessing /dashboard without login
- You'll be redirected to /login
- After login, you can access dashboard

✅ **Logout**
- Click on your avatar (top right)
- Click "Logout"
- Redirected to login page

---

## 🔧 Port Configuration

| Service | Port | URL |
|---------|------|-----|
| **Frontend** | 3000 | http://localhost:3000 |
| **Backend** | 2025 | http://localhost:2025 |
| **Database** | 5432 | localhost:5432 |

**Note**: Frontend and backend are on different ports, but the frontend proxies all `/api/*` requests to the backend automatically!

---

## 🎨 UI Components Available

You'll see these components in action:

1. **Global Header**
   - Logo and branding
   - Search bar (placeholder)
   - User avatar menu

2. **Sidebar** (coming in next phase)
   - Learning path navigation
   - Progress indicators
   - Collapsible sections

3. **Forms**
   - Beautiful input fields
   - Error messages
   - Loading states

4. **Buttons**
   - Primary, secondary, outline variants
   - Loading spinners
   - Hover effects

5. **Cards**
   - Dashboard cards
   - Hoverable effects
   - Clean shadows

---

## 🧪 Test the API

### Health Check
```bash
curl http://localhost:2025/actuator/health
```

### Register User
```bash
curl -X POST http://localhost:2025/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "password123"
  }'
```

### Login
```bash
curl -X POST http://localhost:2025/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "usernameOrEmail": "testuser",
    "password": "password123"
  }'
```

---

## 📚 API Documentation

Visit **http://localhost:2025/swagger-ui.html** to see:
- All available endpoints
- Request/response schemas
- Try out API calls directly
- Authentication requirements

---

## 🛠️ Troubleshooting

### "Cannot connect to backend"
1. Check backend is running: `curl http://localhost:2025/actuator/health`
2. Check port 2025 is not in use: `lsof -i :2025`
3. Restart backend: `cd backend && mvn spring-boot:run`

### "Frontend won't load"
1. Check port 3000 is not in use: `lsof -i :3000`
2. Reinstall dependencies: `cd frontend && npm install`
3. Restart frontend: `npm run dev`

### "Database connection error"
1. Check PostgreSQL is running
2. Verify database exists: `psql -U postgres -l | grep learning-portal`
3. Test connection: `bash test-db-connection.sh`

---

## 🎉 You're All Set!

**To access your Learning Portal:**

1. Open terminal and start backend: `cd backend && mvn spring-boot:run`
2. Open another terminal and start frontend: `cd frontend && npm run dev`
3. Open browser: **http://localhost:3000**
4. Create an account and start learning!

---

**Frontend**: http://localhost:3000  
**Backend**: http://localhost:2025  
**Swagger**: http://localhost:2025/swagger-ui.html

**Happy Learning!** 🚀
