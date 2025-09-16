# Prompt Enhancer VS Code Extension

## Features
- Command: "Prompt Enhancer: Enhance Selection" (`promptEnhancer.enhanceSelection`)
- Enhances current selection (or full document) by calling your server REST endpoint `/api/enhance`

## Requirements
- Backend running at `http://localhost:3000` (or set env `VSCODE_ENHANCER_API`)
- `OPENAI_API_KEY` configured for the server

## Development
1. Install deps
```sh
bun install
```
2. Build once or watch
```sh
bun run build
# or
bun run watch
```
3. Debug in VS Code
- Open this folder (`apps/vscode`) in VS Code
- Press `F5` (Run → "Run Extension") to start the Extension Development Host
- Open a file, select text, run "Prompt Enhancer: Enhance Selection"

## Packaging
1. Install vsce (if not installed)
```sh
npm i -g vsce
```
2. Package
```sh
vsce package
```
This produces a `.vsix` you can install via "Extensions → ... → Install from VSIX".

## Configuration
- `VSCODE_ENHANCER_API`: override server base URL (default `http://localhost:3000`)

## Notes
- The `vscode` module is marked external in the esbuild config.
- Adjust publisher name in `package.json` before publishing.
