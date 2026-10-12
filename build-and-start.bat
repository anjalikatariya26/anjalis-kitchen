@echo off
title Anjali's Kitchen - Production Build and Start
color 0A

echo ===================================================
echo   Anjali's Kitchen - Production Build and Start
echo ===================================================
echo.

cd /d "%~dp0"

echo [1/4] Checking Database Status...
docker info >nul 2>&1
if %errorlevel% equ 0 (
    echo [*] Starting Postgres container...
    docker compose up -d >nul 2>&1 || docker-compose up -d >nul 2>&1
    timeout /t 3 /nobreak >nul
)

echo.
echo [2/4] Generating Prisma Client...
call npx prisma db push --accept-data-loss >nul 2>&1
call npx prisma generate

echo.
echo [3/4] Building Production Web Application...
call pnpm run build
if %errorlevel% neq 0 (
    echo [X] Production build failed. Please fix compilation errors above.
    pause
    exit /b %errorlevel%
)

echo.
echo [4/4] Launching browser and starting server...
start "" "http://localhost:3000"
echo ===================================================
echo Production server running on http://localhost:3000
echo Press Ctrl+C to stop.
echo ===================================================
call pnpm run start
