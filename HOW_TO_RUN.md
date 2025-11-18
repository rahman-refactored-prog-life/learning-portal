# 🚀 How to Run the Learning Portal

## Port Configuration

- **Backend**: http://localhost:2025
- **Frontend**: http://localhost:3000
- **Database**: PostgreSQL on localhost:5432

## Prerequisites

✅ Java 21 installed
✅ Maven installed
✅ Node.js 18+ installed
✅ PostgreSQL 18 running
✅ Database `learning-portal` created

## Quick Start (First Time)

### 1. Install Frontend Dependencies
```bash
cd frontend
npm install
```

This will install all React, TypeScript, and Vite dependencies.

### 2. Start the Backend
Open a new terminal:
```bash
cd backend
mvn spring-boot:run
```

Backend will start on **http://localhost:2025**

### 3. Start the Frontend
Open another terminal:
```bash
cd frontend
npm run dev
```

Frontend will start on **http://localhost:3000**

### 4. Access the Application
Open your browser:
```
http://localhost:3000
```

## Available Endpoints

### Frontend (Port 3000)
- **Home**: http://localhost:3000
- **Login**: http://localhost:3000/login
- **Register**: http://localhost:3000/register
- **Dashboard**: http://localhost:3000/dashboard

### Backend API (Port 2025)
- **Health Check**: http://localhost:2025/actuator/health
- **API Docs**: http://localhost:2025/swagger-ui.html
- **OpenAPI JSON**: http://localhost:2025/api-docs

### API Endpoints
- **Register**: POST http://localhost:2025/api/auth/register
- **Login**: POST http://localhost:2025/api/auth/login

## Development Workflow

### Option 1: Two Terminals (Recommended)

**Terminal 1 - Backend:**
```bash
cd /Users/syedrahman/Desktop/Career-and-Growth/KIRO/interview-prep-attempt-100/backend
mvn spring-boot:run
```

**Terminal 2 - Frontend:**
```bash
cd /Users/syedrahman/Desktop/Career-and-Growth/KIRO/interview-prep-attempt-100/frontend
npm run dev
```

### Option 2: Background Processes

**Start Backend in Background:**
```bash
cd backend
mvn spring-boot:run &
```

**Start Frontend in Background:**
```bash
cd frontend
npm run dev &
```

## Testing the Setup

### 1. Test Backend Health
```bash
curl http://localhost:2025/actuator/health
```

Expected response:
```json
{"status":"UP"}
```

### 2. Test Database Connection
```bash
cd backend
mvn test -Dtest=DatabaseConnectionTest
```

### 3. Test Frontend
Open browser to http://localhost:3000 - you should see the login page.

## API Proxy Configuration

The frontend is configured to proxy all `/api/*` requests to the backend:

```
Frontend Request: http://localhost:3000/api/auth/login
↓ (proxied to)
Backend: http://localhost:2025/api/auth/login
```

This means you can make API calls from frontend like:
```typescript
fetch('/api/auth/login', { ... })
```

And it will automatically go to the backend!

## First Time Usage

### 1. Create an Account
1. Go to http://localhost:3000/register
2. Fill in:
   - Username (min 3 characters)
   - Email
   - Password (min 6 characters)
   - Confirm Password
3. Click "Create Account"
4. You'll be automatically logged in and redirected to dashboard

### 2. Login
1. Go to http://localhost:3000/login
2. Enter username/email and password
3. Click "Sign In"
4. You'll be redirected to dashboard

## Troubleshooting

### Backend won't start
```bash
# Check if port 2025 is in use
lsof -i :2025

# Kill process if needed
kill -9 <PID>

# Check PostgreSQL is running
psql -U postgres -d learning-portal -c "SELECT 1"
```

### Frontend won't start
```bash
# Clear node_modules and reinstall
cd frontend
rm -rf node_modules package-lock.json
npm install

# Check if port 3000 is in use
lsof -i :3000
```

### Database connection fails
```bash
# Check PostgreSQL is running
brew services list | grep postgresql

# Start PostgreSQL if needed
brew services start postgresql@18

# Verify database exists
psql -U postgres -l | grep learning-portal
```

### API calls fail (CORS errors)
- Make sure backend is running on port 2025
- Check vite.config.ts proxy configuration
- Verify SecurityConfig.java has CORS enabled for localhost:3000

## Hot Reload

Both frontend and backend support hot reload:

- **Frontend**: Changes to .tsx, .ts, .css files reload automatically
- **Backend**: Changes to .java files require restart (or use Spring DevTools)

## Build for Production

### Backend
```bash
cd backend
mvn clean package
java -jar target/learning-portal-backend-1.0.0-SNAPSHOT.jar
```

### Frontend
```bash
cd frontend
npm run build
# Output in frontend/dist/
```

## Environment Variables

### Backend (.env or application.yml)
```yaml
DB_PASSWORD=your_password
JWT_SECRET=your-secret-key-256-bits
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:2025
```

## Useful Commands

### Backend
```bash
# Run tests
mvn test

# Clean and compile
mvn clean compile

# Package
mvn package

# Run specific test
mvn test -Dtest=DatabaseConnectionTest
```

### Frontend
```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## Next Steps

1. ✅ Install frontend dependencies: `cd frontend && npm install`
2. ✅ Start backend: `cd backend && mvn spring-boot:run`
3. ✅ Start frontend: `cd frontend && npm run dev`
4. ✅ Open http://localhost:3000
5. ✅ Create an account and start learning!

---

**Happy Coding!** 🚀

**Backend**: http://localhost:2025  
**Frontend**: http://localhost:3000  
**Swagger**: http://localhost:2025/swagger-ui.html
