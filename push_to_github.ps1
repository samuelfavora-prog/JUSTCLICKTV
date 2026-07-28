$git = "C:\Program Files\Git\cmd\git.exe"
Set-Location "C:\Users\PC\.gemini\antigravity\scratch\justclicktv"

& $git init
& $git config user.name "samuelfavora-prog"
& $git config user.email "samuelfavora-prog@users.noreply.github.com"

# Remove existing remote if present
try {
    & $git remote remove origin
} catch {
    # Ignore if remote didn't exist
}

& $git remote add origin https://github.com/samuelfavora-prog/JUSTCLICKTV.git
& $git add index.html styles.css app.js assets/
& $git commit -m "Initial commit: JUST CLICK TV premium eCommerce & entertainment website"
& $git branch -M main
& $git push -u origin main
