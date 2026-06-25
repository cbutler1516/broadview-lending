Add-Type -AssemblyName System.Drawing

$src = "C:\Users\cbutl\.cursor\projects\c-Users-cbutl-Projects-broadview-lending\assets\c__Users_cbutl_AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_Untitled_design__29_-b612a52c-d5ea-484b-9db3-e0e2b3baa04d.png"
$outDir = "C:\Users\cbutl\Projects\broadview-lending\public\brand"

$bmp = New-Object System.Drawing.Bitmap([System.Drawing.Image]::FromFile($src))
$w = $bmp.Width
$h = $bmp.Height
Write-Output ("source " + $w + "x" + $h)

# Build a black-keyed ARGB bitmap (near-black -> transparent with a soft edge)
$keyed = New-Object System.Drawing.Bitmap($w, $h, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
for ($y = 0; $y -lt $h; $y++) {
  for ($x = 0; $x -lt $w; $x++) {
    $p = $bmp.GetPixel($x, $y)
    $maxc = [Math]::Max($p.R, [Math]::Max($p.G, $p.B))
    if ($maxc -le 24) {
      $keyed.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(0, $p.R, $p.G, $p.B))
    }
    elseif ($maxc -lt 48) {
      $a = [int](($maxc - 24) / (48 - 24) * 255)
      $keyed.SetPixel($x, $y, [System.Drawing.Color]::FromArgb($a, $p.R, $p.G, $p.B))
    }
    else {
      $keyed.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(255, $p.R, $p.G, $p.B))
    }
  }
}

function Save-Trimmed($region, $outPath, $pad) {
  # region: array x0,y0,x1,y1 (inclusive-ish) to search within
  $rx0 = $region[0]; $ry0 = $region[1]; $rx1 = $region[2]; $ry1 = $region[3]
  $minX = $rx1; $minY = $ry1; $maxX = $rx0; $maxY = $ry0
  for ($y = $ry0; $y -le $ry1; $y++) {
    for ($x = $rx0; $x -le $rx1; $x++) {
      if ($keyed.GetPixel($x, $y).A -gt 16) {
        if ($x -lt $minX) { $minX = $x }
        if ($x -gt $maxX) { $maxX = $x }
        if ($y -lt $minY) { $minY = $y }
        if ($y -gt $maxY) { $maxY = $y }
      }
    }
  }
  $minX = [Math]::Max(0, $minX - $pad)
  $minY = [Math]::Max(0, $minY - $pad)
  $maxX = [Math]::Min($w - 1, $maxX + $pad)
  $maxY = [Math]::Min($h - 1, $maxY + $pad)
  $cw = $maxX - $minX + 1
  $ch = $maxY - $minY + 1
  $crop = New-Object System.Drawing.Bitmap($cw, $ch, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
  for ($y = 0; $y -lt $ch; $y++) {
    for ($x = 0; $x -lt $cw; $x++) {
      $crop.SetPixel($x, $y, $keyed.GetPixel($minX + $x, $minY + $y))
    }
  }
  $crop.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Png)
  $crop.Dispose()
  Write-Output ($outPath + " => " + $cw + "x" + $ch + " (bbox " + $minX + "," + $minY + " - " + $maxX + "," + $maxY + ")")
}

# Regions are generous search windows; Save-Trimmed tightens to actual content.
# Full stacked lockup: everything
Save-Trimmed @(0, 0, ($w - 1), ($h - 1)) (Join-Path $outDir "broadview-barrett-lockup-full.png") 10
Copy-Item (Join-Path $outDir "broadview-barrett-lockup-full.png") (Join-Path $outDir "broadview-barrett-lockup-footer.png") -Force

# Broadview block only (mark + BROADVIEW / LENDING) — upper third
Save-Trimmed @(0, 200, ($w - 1), 448) (Join-Path $outDir "broadview-header-logo.png") 8

# Broadview house mark only — left side of upper block
Save-Trimmed @(80, 220, 380, 448) (Join-Path $outDir "broadview-mark-official.png") 6
Copy-Item (Join-Path $outDir "broadview-mark-official.png") (Join-Path $outDir "broadview-mobile-mark.png") -Force

$keyed.Dispose()
$bmp.Dispose()
Write-Output "done"
