$ErrorActionPreference = "Stop"

$repoRoot = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path
$gitCommand = Get-Command git.exe -ErrorAction SilentlyContinue
$git = if ($gitCommand) {
  $gitCommand.Source
} else {
  Join-Path $env:ProgramFiles "Git\cmd\git.exe"
}

if (-not (Test-Path $git)) {
  throw "No se encontró Git. Instala Git for Windows para activar la sincronización automática."
}

$userName = & $git -C $repoRoot config user.name
if ($LASTEXITCODE -ne 0 -or -not $userName) {
  & $git -C $repoRoot config user.name "Rush Concordia"
}

$userEmail = & $git -C $repoRoot config user.email
if ($LASTEXITCODE -ne 0 -or -not $userEmail) {
  & $git -C $repoRoot config user.email "rushcafeconcordia@gmail.com"
}

function Get-WorktreeStatus {
  $status = & $git -C $repoRoot status --porcelain --untracked-files=all
  if ($LASTEXITCODE -ne 0) {
    throw "No se pudo consultar el estado de Git."
  }
  return ($status -join "`n")
}

Write-Host "Sincronización automática activa. Se agruparán los cambios guardados antes de subirlos a main."

while ($true) {
  $status = Get-WorktreeStatus
  if ($status) {
    $stableSince = [DateTime]::UtcNow
    while ([DateTime]::UtcNow - $stableSince -lt [TimeSpan]::FromSeconds(4)) {
      Start-Sleep -Seconds 1
      $currentStatus = Get-WorktreeStatus
      if ($currentStatus -ne $status) {
        $status = $currentStatus
        $stableSince = [DateTime]::UtcNow
      }
    }

    if ($status) {
      & $git -C $repoRoot add --all
      if ($LASTEXITCODE -ne 0) {
        Write-Warning "No se pudieron preparar los cambios para Git."
        Start-Sleep -Seconds 5
        continue
      }

      & $git -C $repoRoot diff --cached --quiet
      if ($LASTEXITCODE -eq 1) {
        $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
        & $git -C $repoRoot commit -m "Auto-sync changes $timestamp" -m "Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>"
        if ($LASTEXITCODE -ne 0) {
          Write-Warning "No se pudo crear el commit automático."
          Start-Sleep -Seconds 5
          continue
        }
      } elseif ($LASTEXITCODE -ne 0) {
        Write-Warning "No se pudo revisar el contenido preparado para Git."
        Start-Sleep -Seconds 5
        continue
      }
    }
  }

  $ahead = & $git -C $repoRoot rev-list --count origin/main..HEAD
  if ($LASTEXITCODE -ne 0) {
    Write-Warning "No se pudo comparar la rama local con origin/main."
    Start-Sleep -Seconds 10
    continue
  }
  if ([int]$ahead -eq 0) {
    Start-Sleep -Seconds 2
    continue
  }

  & $git -C $repoRoot push origin HEAD:main
  if ($LASTEXITCODE -ne 0) {
    Write-Warning "No se pudo subir a GitHub. Revisa la conexión y las credenciales; no se forzó ningún cambio remoto."
    Start-Sleep -Seconds 10
    continue
  }

  Write-Host "Cambios subidos a GitHub y listos para publicarse."
}
