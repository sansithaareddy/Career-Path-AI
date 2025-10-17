@echo off
echo ====================================
echo CareerPath AI Development Setup
echo ====================================
echo.

echo Starting Backend Server (Port 5000)...
start "CareerPath AI Backend" cmd /k "cd /d C:\Users\Yash\SIH2025\careerpath-ai\backend && node src/server.js"

echo Waiting 3 seconds for backend to start...
timeout /t 3 /nobreak > nul

echo.
echo Starting Frontend Server (Port 3000)...
start "CareerPath AI Frontend" cmd /k "cd /d C:\Users\Yash\SIH2025\careerpath-ai && npm run dev"

echo.
echo ====================================
echo Both servers are starting...
echo Backend: http://localhost:5000
echo Frontend: http://localhost:3000
echo ====================================
echo.
echo Press any key to close this window...
pause > nul