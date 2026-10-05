@echo off
set "PATH=%~dp0..\tools\node;%PATH%"
echo Starting Flare (Production Preview) on http://localhost:5173 ...
call npm run preview
