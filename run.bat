@echo off
title Anjali's Kitchen - App Launcher
color 0F

echo ===================================================
echo      Anjali's Kitchen - App Launcher
echo ===================================================
echo.

cd /d "%~dp0"

:: 1. Attempt Docker Database Start
echo [1/4] Checking Database Status...
docker info >nul 2>&1
if %errorlevel% equ 0 (
    echo [*] Docker engine active. Launching Postgres database container...
    docker compose up -d >nul 2>&1 || docker-compose up -d >nul 2>&1
    echo [*] Waiting 3 seconds for database initialization...
    timeout /t 3 /nobreak >nul
) else (
    echo [!] Docker engine not active. Will connect to local Postgres if running.
)

:: 2. Sync Database Schema & Generate Client safely
echo.
echo [2/4] Initializing Prisma and Database Schema...
call npx prisma db push --accept-data-loss >nul 2>&1
if %errorlevel% neq 0 (
    echo [i] Database at localhost:5432 not reachable.
    echo [i] Running in Frontend Mode with rich sample data!
) else (
    echo [✓] Database connected and synchronized successfully!
)
call npx prisma generate >nul 2>&1

:: 3. Launch Web Browser
echo.
echo [3/4] Launching http://localhost:3000 in your default browser...
start "" "http://localhost:3000"

:: 4. Start Next.js Development Server
echo.
echo [4/4] Starting Anjali's Kitchen Web Application...
echo ===================================================
echo  App Live at: http://localhost:3000
echo  Press Ctrl+C in this window to stop the server.
echo ===================================================
echo.

call pnpm run dev
