$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $PSScriptRoot
$screenshots = Join-Path $root "screenshots"
New-Item -ItemType Directory -Force -Path $screenshots | Out-Null
Get-ChildItem -Path $screenshots -File -ErrorAction SilentlyContinue | Remove-Item -Force

Add-Type -AssemblyName System.Drawing

function New-ScenarioImage {
  param(
    [string]$Title,
    [string]$Subtitle,
    [string[]]$Bullets,
    [string]$OutputPath
  )

  $width = 1600
  $height = 900
  $bmp = New-Object System.Drawing.Bitmap($width, $height)
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.SmoothingMode = "AntiAlias"
  $bg = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(7, 10, 15))
  $panelPen = New-Object System.Drawing.Pen ([System.Drawing.Color]::FromArgb(60, 120, 255, 170), 2)
  $textBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(233, 243, 255))
  $mutedBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(186, 200, 218))
  $accentBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(55, 255, 139))
  $dotBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(25, 199, 255))
  $fontTitle = New-Object System.Drawing.Font("Georgia", 30, [System.Drawing.FontStyle]::Bold)
  $fontSub = New-Object System.Drawing.Font("Segoe UI", 16)
  $fontBody = New-Object System.Drawing.Font("Segoe UI", 14)

  $g.FillRectangle($bg, 0, 0, $width, $height)
  $rect = New-Object System.Drawing.Rectangle(40, 40, 1520, 820)
  $g.DrawRectangle($panelPen, $rect)
  $g.DrawString("Board Investment Priority Engine", $fontSub, $accentBrush, 70, 85)
  $g.DrawString($Title, $fontTitle, $textBrush, 70, 135)
  $subtitleRect = New-Object System.Drawing.RectangleF(70, 220, 1400, 80)
  $g.DrawString($Subtitle, $fontSub, $mutedBrush, $subtitleRect)

  $y = 320
  foreach ($bullet in $Bullets) {
    $g.FillEllipse($dotBrush, 85, $y + 8, 10, 10)
    $bulletRect = New-Object System.Drawing.RectangleF(110, $y, 1320, 48)
    $g.DrawString($bullet, $fontBody, $textBrush, $bulletRect)
    $y += 72
  }

  $g.DrawString("Synthetic scenario render for README packaging.", $fontSub, $mutedBrush, 70, 800)
  $bmp.Save($OutputPath, [System.Drawing.Imaging.ImageFormat]::Png)
  $g.Dispose()
  $bmp.Dispose()
}

New-ScenarioImage -Title "Board-ready overview for the next investment packet" -Subtitle "One investment-priority layer for fund, protect, hold, trim, savings leverage, and capital reallocation." -Bullets @(
  "The overview keeps the strongest fund and protect lanes visible in one committee-safe surface.",
  "Leadership can see where capital should move next and where proof quality still blocks an expansion ask.",
  "This layer turns scattered scorecards into one ranked board narrative instead of another manual synthesis cycle."
) -OutputPath (Join-Path $screenshots "01-overview-proof.png")

New-ScenarioImage -Title "Priority lane keeps action, owner, and next ask connected" -Subtitle "Every route retains the audience, owner, action, priority theme, and next board ask." -Bullets @(
  "The priority-lane view makes it obvious which systems should be funded, protected, held, or trimmed first.",
  "Board questions stay attached to actual owners and concrete asks instead of generic strategy language.",
  "Leadership can tighten the committee packet before the next board, investor, or diligence review begins."
) -OutputPath (Join-Path $screenshots "02-priority-lane-proof.png")

New-ScenarioImage -Title "Board asks show which motions are ready for approval" -Subtitle "Priority, conviction, board confidence, and company-tag signals stay visible in one decision readout." -Bullets @(
  "This view keeps IBM, CyberArk, procurement, biotech, and revenue traces tied to actual live surfaces and next asks.",
  "Weak asks stay visible before the committee overclaims what the estate can really defend.",
  "Leadership can see which funding or protection move will strengthen the board story fastest."
) -OutputPath (Join-Path $screenshots "03-board-asks-proof.png")

New-ScenarioImage -Title "Capital sequence keeps urgency and payback together" -Subtitle "Urgency, payback, savings leverage, and downside exposure stay grounded in the same sequence view." -Bullets @(
  "The executive story stays tied to actual investment timing instead of vague transformation language.",
  "Thin proof remains visible before it turns into another inconclusive board discussion.",
  "This creates a repeatable packet that can travel into diligence, investor, and operating reviews."
) -OutputPath (Join-Path $screenshots "04-capital-sequence-proof.png")
