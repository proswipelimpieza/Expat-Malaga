@echo off
title Expat Malaga - dev server
cd /d "%~dp0"

if not exist node_modules (
  echo Installation des dependances ^(1-2 min^)...
  call npm install
  if errorlevel 1 (
    echo.
    echo Installation echouee. Voir les messages ci-dessus.
    pause
    exit /b 1
  )
)

start "" http://localhost:3000

echo.
echo Site en local : http://localhost:3000
echo Pour arreter  : Ctrl+C puis fermez cette fenetre
echo.
call npm run dev

echo.
echo Le serveur s est arrete.
pause
