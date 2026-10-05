@echo off
set "PATH=%~dp0..\tools\node;%PATH%"
echo Starting Flare on http://localhost:3000 ...
call npm run dev
