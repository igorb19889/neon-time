<<<<<<< HEAD
# start-tunnel.ps1
Write-Host "==============================================="
Write-Host "🚀 Pornim dev server si tunel Cloudflare (PowerShell)"
Write-Host "==============================================="

# 1) Start npm run dev intr-un proces separat
Start-Process -NoNewWindow -FilePath "cmd.exe" -ArgumentList "/c npm run dev"

# 2) Asteapta 8 secunde sa porneasca vite
Start-Sleep -Seconds 8

# 3) Verifica cloudflared
$cf = Get-Command cloudflared -ErrorAction SilentlyContinue
if (-not $cf) {
    Write-Host "❌ cloudflared nu este instalat sau nu este in PATH."
    Write-Host "👉 Descarca: https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/install-and-setup/installation/"
    pause
    exit 1
}

# 4) Porneste cloudflared si citeste output-ul pentru linkul https
$process = Start-Process -FilePath "cloudflared" -ArgumentList "tunnel --url http://localhost:5173" -NoNewWindow -RedirectStandardOutput "cloudflared_output.txt" -RedirectStandardError "cloudflared_err.txt" -PassThru

# asteapta putin ca sa apara output
Start-Sleep -Seconds 2

# citeste fisierul de output si cauta prima linie cu https://
$text = Get-Content -Raw "cloudflared_output.txt" -ErrorAction SilentlyContinue
if (-not $text) { $text = Get-Content -Raw "cloudflared_err.txt" -ErrorAction SilentlyContinue }

$match = Select-String -InputObject $text -Pattern "https://[^\s]+" -AllMatches | Select-Object -First 1
if ($match) {
    $url = ($match.Matches | Select-Object -First 1).Value
    Write-Host "🔗 Tunel activ: $url"
    $url | Set-Clipboard
    Write-Host "(Link copiat in clipboard)"
} else {
    Write-Host "⚠️ Nu am gasit automat linkul. Verifica fereastra cloudflared."
    Write-Host "Vezi continut cloudflared_output.txt sau cloudflared_err.txt"
}

Write-Host "Apasa Enter pentru a inchide aceasta fereastra (tunelul ramane activ)."
Read-Host
=======
# start-tunnel.ps1
Write-Host "==============================================="
Write-Host "🚀 Pornim dev server si tunel Cloudflare (PowerShell)"
Write-Host "==============================================="

# 1) Start npm run dev intr-un proces separat
Start-Process -NoNewWindow -FilePath "cmd.exe" -ArgumentList "/c npm run dev"

# 2) Asteapta 8 secunde sa porneasca vite
Start-Sleep -Seconds 8

# 3) Verifica cloudflared
$cf = Get-Command cloudflared -ErrorAction SilentlyContinue
if (-not $cf) {
    Write-Host "❌ cloudflared nu este instalat sau nu este in PATH."
    Write-Host "👉 Descarca: https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/install-and-setup/installation/"
    pause
    exit 1
}

# 4) Porneste cloudflared si citeste output-ul pentru linkul https
$process = Start-Process -FilePath "cloudflared" -ArgumentList "tunnel --url http://localhost:5173" -NoNewWindow -RedirectStandardOutput "cloudflared_output.txt" -RedirectStandardError "cloudflared_err.txt" -PassThru

# asteapta putin ca sa apara output
Start-Sleep -Seconds 2

# citeste fisierul de output si cauta prima linie cu https://
$text = Get-Content -Raw "cloudflared_output.txt" -ErrorAction SilentlyContinue
if (-not $text) { $text = Get-Content -Raw "cloudflared_err.txt" -ErrorAction SilentlyContinue }

$match = Select-String -InputObject $text -Pattern "https://[^\s]+" -AllMatches | Select-Object -First 1
if ($match) {
    $url = ($match.Matches | Select-Object -First 1).Value
    Write-Host "🔗 Tunel activ: $url"
    $url | Set-Clipboard
    Write-Host "(Link copiat in clipboard)"
} else {
    Write-Host "⚠️ Nu am gasit automat linkul. Verifica fereastra cloudflared."
    Write-Host "Vezi continut cloudflared_output.txt sau cloudflared_err.txt"
}

Write-Host "Apasa Enter pentru a inchide aceasta fereastra (tunelul ramane activ)."
Read-Host
>>>>>>> 77155f431fe86f3b78a75dde0dca21ee2a4053fd
