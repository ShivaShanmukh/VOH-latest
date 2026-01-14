@echo off
echo ========================================
echo Pushing to GitHub Repository
echo ========================================
echo.
echo IMPORTANT: Replace YOUR_USERNAME with your actual GitHub username
echo.
pause

cd /d "%~dp0"

git remote add origin https://github.com/YOUR_USERNAME/VOH-cambridge-latest.git
git branch -M main
git push -u origin main

echo.
echo ========================================
echo Push Complete!
echo ========================================
pause
