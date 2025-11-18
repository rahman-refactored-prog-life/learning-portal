# 🚀 Run Everything on Port 2025

## Single Port Setup - Backend Serves Frontend

Both the React frontend and Spring Boot backend run on **http://localhost:2025**

---

## 🎯 Quick Start

### Option 1: Build and Run (Recommended)

```bash
cd backend
mvn clean package spring-boot:run
```

That's it! Everything runs on **http://localhost:2025**

### Option 2: Development Mode (Faster rebuilds)

**Terminal 1 - Build Frontend:**
```bash
cd frontend
npm install
npm run build
```

**Terminal 2 - Run Backend:**
```bash
cd backend
mvn spring-boot:run
```

---

## 📱 Access the Application

Open your browser:
```
http://localhost:2025
```

### Available Routes:
- **Home/Dashboard**: http://localhost:2025/
- **Login**: http://localhost:2025/login
- **Register**: http://localhost:2025/register
- **API Docs**: http://localhost:2025/swagger-ui.html
- **Health Check**: http://localhost:2025/actuator/health

---

## 🏗️ How It Works

1. **Frontend Build**: Vite builds React app to `frontend/dist/`
2. **Maven Copies**: Frontend build copied to `backend/target/classes/static/`
3. **Spring Boot Serves**: Static files served from `/static` directory
4. **SPA Routing**: `FrontendController` forwards all non-API routes to `index.html`
5. **API Routes**: `/api/*` handled by REST controllers

### Request Flow:

```
Browser Request: http://localhost:2025/login
         ↓
Spring Boot (Port 2025)
         ↓
FrontendController → forward to index.html
         ↓
React Router handles /login route
         ↓
LoginPage component renders
```

```
API Request: http://localhost:2025/api/auth/login
         ↓
Spring Boot (Port 2025)
         ↓
AuthController handles request
         ↓
Returns JSON response
```

---

## 🔧 Build Process

When you run `mvn clean package`, Maven:

1. ✅ Installs Node.js and npm (if not present)
2. ✅ Runs `npm install` in frontend directory
3. ✅ Runs `npm run build` to create production build
4. ✅ Copies `frontend/dist/*` to `backend/target/classes/static/`
5. ✅ Packages everything into a single JAR file

---

## 🚀 Production Deployment

### Build the JAR:
```bash
cd backend
mvn clean package
```

### Run the JAR:
```bash
java -jar target/learning-portal-backend-1.0.0-SNAPSHOT.jar
```

Everything (frontend + backend) runs on port 2025!

---

## 🛠️ Development Workflow

### For Frontend Changes:

**Option A: Quick rebuild**
```bash
cd frontend
npm run build
# Backend will serve the new build automatically
```

**Option B: Dev mode with hot reload**
```bash
cd frontend
npm run dev
# Frontend runs on port 3000 with hot reload
# Backend still on port 2025
```

### For Backend Changes:

Just restart Spring Boot:
```bash
cd backend
mvn spring-boot:run
```

---

## 📊 Advantages of Single Port

✅ **Simpler Deployment**: One port to manage
✅ **No CORS Issues**: Same origin for frontend and backend
✅ **Production Ready**: Standard Spring Boot static resource serving
✅ **Single JAR**: Everything packaged together
✅ **Easier Hosting**: Deploy one application

---

## 🧪 Testing

### Test Backend API:
```bash
curl http://localhost:2025/actuator/health
```

### Test Frontend:
```bash
curl http://localhost:2025/
# Should return HTML
```

### Test API Endpoint:
```bash
curl -X POST http://localhost:2025/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"test","email":"test@example.com","password":"password123"}'
```

---

## 📁 File Structure

```
backend/
├── src/main/resources/
│   └── static/              # Frontend build goes here
│       ├── index.html
│       ├── assets/
│       │   ├── index-*.js
│       │   └── index-*.css
│       └── vite.svg
└── target/
    └── learning-portal-backend-1.0.0-SNAPSHOT.jar  # Single deployable JAR

frontend/
└── dist/                    # Build output (copied to backend/static)
    ├── index.html
    ├── assets/
    └── vite.svg
```

---

## 🎯 Quick Commands

### Full Build and Run:
```bash
cd backend && mvn clean package spring-boot:run
```

### Just Run (if already built):
```bash
cd backend && mvn spring-boot:run
```

### Rebuild Frontend Only:
```bash
cd frontend && npm run build
```

### Clean Everything:
```bash
cd backend && mvn clean
cd ../frontend && rm -rf dist node_modules
```

---

## 🌐 Access Points

| What | URL |
|------|-----|
| **Frontend** | http://localhost:2025 |
| **Login** | http://localhost:2025/login |
| **Register** | http://localhost:2025/register |
| **Dashboard** | http://localhost:2025/dashboard |
| **API** | http://localhost:2025/api/* |
| **Swagger** | http://localhost:2025/swagger-ui.html |
| **Health** | http://localhost:2025/actuator/health |

---

## ✅ You're All Set!

**To run everything on port 2025:**

```bash
cd backend
mvn clean package spring-boot:run
```

Then open: **http://localhost:2025** 🎉

---

**Single Port. Single Command. Simple!** 🚀
