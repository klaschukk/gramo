# Packaging & Distribution

## Build pipeline
```
npm run build        # compile TS → dist/main + dist/renderer
npm run package:mac  # electron-builder → release/*.dmg
npm run package:win  # electron-builder → release/*.exe (cross-compile or Windows CI)
```

## macOS (.dmg)
- Targets: x64 (Intel) + arm64 (Apple Silicon) via universal build
- Category: public.app-category.education
- Icon: assets/icon.icns (1024×1024 PNG → convert to icns)
- No code signing for personal distribution — users right-click → Open to bypass Gatekeeper

## Windows (.exe)
- NSIS installer (not one-click — user can choose install dir)
- Icon: assets/icon.ico
- Cross-compile from macOS: needs Wine or Windows runner in CI

## App ID
`com.klaschuk.gramo`

## Distribution
Phase 1: share .dmg directly (Google Drive, GitHub Releases)
Phase 2: GitHub Releases with auto-update (electron-updater)

## electron.builder.json key settings
- `extraResources`: bundles `data/` dir (excluding .db files)
- `files`: excludes test files and changelogs from bundle
- `directories.output`: `release/`

## Creating icons
```bash
# macOS: convert 1024x1024 PNG to icns
mkdir assets/icon.iconset
sips -z 1024 1024 assets/icon.png --out assets/icon.iconset/icon_1024x1024.png
iconutil -c icns assets/icon.iconset -o assets/icon.icns

# Windows icon: use ImageMagick or online converter
```
