@echo off
echo ==========================================
echo   BugTrack - Automated Bug Tracking System
echo ==========================================
echo.
echo STEP 1: Starting MongoDB...
echo (Keep this window open!)
echo.

:: Create data directory if not exists
if not exist "C:\data\db" mkdir "C:\data\db"

:: Start MongoDB in background
start "MongoDB" "C:\Program Files\MongoDB\Server\8.2\bin\mongod.exe" --dbpath "C:\data\db"

echo Waiting for MongoDB to start...
timeout /t 4 /nobreak >nul

echo.
echo STEP 2: Starting Backend (port 5000)...
start "Backend" cmd /k "cd /d %~dp0backend && node server.js"

echo Waiting for backend to start...
timeout /t 3 /nobreak >nul

echo.
echo STEP 3: Starting Frontend (port 3000)...
start "Frontend" cmd /k "cd /d %~dp0frontend && npm start"

echo.
echo ==========================================
echo   All services starting!
echo   Frontend: http://localhost:3000
echo   Backend:  http://localhost:5000
echo ==========================================
echo.
pause
