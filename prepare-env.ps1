# PowerShell script to prepare projects data for Vercel environment variable

if (Test-Path "data/projects.json") {
    Write-Host "==================================================" -ForegroundColor Cyan
    Write-Host "Copy the content below to PROJECTS_DATA" -ForegroundColor Cyan
    Write-Host "Vercel Environment Variables:" -ForegroundColor Cyan
    Write-Host "==================================================" -ForegroundColor Cyan
    
    $content = Get-Content "data/projects.json" -Raw
    # Remove unnecessary whitespace for env variable
    $minified = $content | ConvertFrom-Json | ConvertTo-Json -Compress
    
    Write-Host $minified -ForegroundColor Yellow
    
    Write-Host ""
    Write-Host "==================================================" -ForegroundColor Cyan
    Write-Host "✓ Content copied to clipboard" -ForegroundColor Green
    Write-Host "Paste this in your Vercel dashboard at:" -ForegroundColor Cyan
    Write-Host "Settings → Environment Variables → PROJECTS_DATA" -ForegroundColor Cyan
    Write-Host "==================================================" -ForegroundColor Cyan
    
    # Copy to clipboard
    $minified | Set-Clipboard
    Write-Host "📋 Copied to clipboard!" -ForegroundColor Green
} else {
    Write-Host "Error: data/projects.json not found" -ForegroundColor Red
}
