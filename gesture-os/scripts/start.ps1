# Gesture OS launcher (Windows PowerShell)
$Root = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
Set-Location $Root

Write-Host "Starting Gesture OS vision backend..." -ForegroundColor Cyan
$venvPython = Join-Path $Root "venv\Scripts\python.exe"
if (-not (Test-Path $venvPython)) {
    Write-Host "Creating venv and installing dependencies..." -ForegroundColor Yellow
    python -m venv venv
    & "$Root\venv\Scripts\pip.exe" install -r requirements.txt -q
    & "$Root\venv\Scripts\python.exe" scripts\download_models.py
}
$python = $venvPython

if (-not (Test-Path "$Root\models\hand_landmarker.task")) {
    & $python scripts\download_models.py
}

Write-Host "Using: $python" -ForegroundColor DarkGray
Start-Process -FilePath $python -ArgumentList "-m", "backend.main" -WorkingDirectory $Root -WindowStyle Normal

Start-Sleep -Seconds 2

Write-Host "Starting holographic HUD overlay..." -ForegroundColor Cyan
Set-Location (Join-Path $Root "frontend")
if (-not (Test-Path "node_modules")) {
    npm install
}
npm start
