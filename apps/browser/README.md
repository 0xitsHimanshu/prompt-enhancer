# Browser Extension - Prompt Enhancer

## Features
- Right-click context menu "Enhance with AI" for selected text
- Popup UI showing original vs enhanced text
- Copy enhanced text or replace original
- Configurable API base URL and model
- Works on all websites

## Installation

### Development
1. Open Chrome/Edge: Extensions → Developer mode → Load unpacked
2. Select the `apps/browser` folder
3. Configure API URL in extension popup (click extension icon)

### Production
1. Package as .zip or .crx for distribution
2. Submit to Chrome Web Store or Firefox Add-ons

## Usage
1. Select text on any webpage
2. Right-click → "Enhance with AI"
3. View enhanced text in popup
4. Copy or replace as needed

## Configuration
- Click extension icon to open popup
- Set API Base URL (default: http://localhost:3000)
- Set model preference (optional)

## Requirements
- Backend server running with `/api/enhance` endpoint
- `OPENAI_API_KEY` configured on server

## Files
- `manifest.json` - Extension configuration
- `background.js` - Service worker for context menu
- `content.js` - Content script for text enhancement
- `popup.html/js` - Settings popup UI
- `icons/` - Extension icons (replace with real icons)

