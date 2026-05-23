@echo off
cd /d "%~dp0.."
echo Starting Gesture OS backend...
if exist "venv\Scripts\python.exe" (
  start "Gesture OS Backend" venv\Scripts\python.exe -m backend.main
) else (
  start "Gesture OS Backend" python -m backend.main
)
timeout /t 2 /nobreak >nul
cd frontend
if not exist node_modules npm install
echo Starting HUD overlay...
npm start
