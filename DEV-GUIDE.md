# CareerPath AI Development Guide

## Quick Start

### Option 1: Start Both Servers (Recommended)
```bash
# Double-click or run:
start-both-servers.bat
```

### Option 2: Start Individually

**Frontend (Next.js):**
```bash
# Double-click or run:
start-frontend.bat
```

**Backend (Express API):**
```bash
# Double-click or run:
backend/start-backend.bat
```

### Option 3: Manual Commands (PowerShell)
```powershell
# Frontend
cd C:\Users\Yash\SIH2025\careerpath-ai
npm run dev

# Backend (separate terminal)
cd C:\Users\Yash\SIH2025\careerpath-ai\backend
node src/server.js
```

## Important Notes

### Directory Issues
- **npm/node commands start from SIH2025 directory by default**
- **Always use full paths or the provided .bat files**
- **Frontend MUST run from careerpath-ai directory**
- **Backend MUST run from careerpath-ai/backend directory**

### Server URLs
- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:5000
- **API Base**: http://localhost:5000/api

### MongoDB Required
Ensure MongoDB is running on localhost:27017

## Project Structure
```
careerpath-ai/
├── app/                    # Next.js 15 App Router
│   ├── components/         # React components
│   ├── context/           # React Context (CareerContext)
│   ├── lib/              # API service layer
│   ├── (pages)/          # Route pages
│   └── globals.css       # Global styles
├── backend/              # Express.js API
│   ├── src/
│   │   ├── models/       # MongoDB models
│   │   ├── routes/       # API routes
│   │   ├── middleware/   # Auth & validation
│   │   └── server.js     # Express server
│   └── uploads/          # Profile pictures
├── public/              # Static assets
└── *.bat               # Helper scripts
```

## Features Implemented
- ✅ User Authentication (JWT)
- ✅ Profile Management
- ✅ File Upload (Profile Pictures)
- ✅ Progress Tracking (MongoDB)
- ✅ Account Management (Reset/Delete)
- ✅ Full Stack Integration

## Development Workflow
1. Start both servers using `start-both-servers.bat`
2. Access frontend at http://localhost:3000
3. Test API endpoints via frontend or directly at http://localhost:5000/api
4. MongoDB data persists in `careerpath-ai` database