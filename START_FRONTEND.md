# 🚀 How to Access the Frontend

## Quick Start

### 1. Install Dependencies (First Time Only)
```bash
cd frontend
npm install
```

### 2. Start the Frontend
```bash
npm run dev
```

### 3. Access the Application
Open your browser and go to:
```
http://localhost:3000
```

## Available Pages

- **Login**: http://localhost:3000/login
- **Register**: http://localhost:3000/register
- **Dashboard**: http://localhost:3000/dashboard (requires login)

## Backend Connection

The frontend is configured to proxy API requests to the backend:
- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:8080/api`

All `/api/*` requests from frontend are automatically proxied to the backend.

## Development Workflow

### Start Both Services:

**Terminal 1 - Backend:**
```bash
cd backend
mvn spring-boot:run
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

## Troubleshooting

### If npm install fails:
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
```

### If port 3000 is busy:
The frontend will automatically use the next available port (3001, 3002, etc.)

### To check if backend is running:
```bash
curl http://localhost:8080/actuator/health
```

## Features Available

✅ Login page with form validation
✅ Register page with password confirmation
✅ Dashboard with user info
✅ Protected routes (redirects to login if not authenticated)
✅ JWT token storage in localStorage
✅ Responsive design (mobile-friendly)
✅ AWS-inspired UI

## Next Steps

1. Install dependencies: `cd frontend && npm install`
2. Start backend: `cd backend && mvn spring-boot:run`
3. Start frontend: `cd frontend && npm run dev`
4. Open browser: http://localhost:3000
5. Create an account or login!

---

**Note**: Make sure PostgreSQL is running and the backend is started before using the frontend!
