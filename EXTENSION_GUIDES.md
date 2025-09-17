# 🔌 Extension Installation & Usage Guides

## VS Code Extension

### Installation

#### From VS Code Marketplace (Recommended)
1. Open VS Code
2. Go to Extensions (Ctrl+Shift+X / Cmd+Shift+X)
3. Search for "Prompt Enhancer"
4. Click "Install"

#### From VSIX Package (Development)
1. Download the `.vsix` file from releases
2. Open VS Code
3. Go to Extensions → "..." menu → "Install from VSIX..."
4. Select the downloaded file

#### From Source (Development)
```bash
cd apps/vscode
bun install
bun run build
bun run package
code --install-extension prompt-enhancer-vscode-0.0.1.vsix
```

### Usage

#### Basic Enhancement
1. **Select text** in any editor
2. **Click the sparkle icon** (✨) in the status bar, or
3. **Use keyboard shortcut**: `Ctrl+Alt+E` (Windows/Linux) or `Cmd+Alt+E` (Mac), or
4. **Right-click** → "Prompt Enhancer: Enhance Selection"

#### Workflow
1. **Enhancement Applied**: Text is replaced with enhanced version
2. **Visual Feedback**: Enhanced text is highlighted in green
3. **Choose Action**:
   - **"Keep Enhancement"** - Accept the changes
   - **"Revert to Original"** - Undo and restore original text

#### Configuration

**Settings** (File → Preferences → Settings → Extensions → Prompt Enhancer):

- **API Base URL**: Custom API endpoint (leave empty for production default)
- **Production API URL**: Default production endpoint
- **Model**: AI model preference (gpt-4o-mini, gpt-4o, etc.)

**Example Configuration:**
```json
{
  "promptEnhancer.apiBaseUrl": "",
  "promptEnhancer.productionApiUrl": "https://prompt-enhancer.vercel.app",
  "promptEnhancer.model": "gpt-4o-mini"
}
```

#### Features
- ✅ **Smart API Detection**: Automatically uses production API
- ✅ **Inline Enhancement**: No separate windows or popups
- ✅ **One-Click Workflow**: Select → Enhance → Accept/Reject
- ✅ **Keyboard Shortcuts**: Quick access via hotkeys
- ✅ **Context Menu**: Right-click integration
- ✅ **Status Bar**: Visual indicator and quick access

#### Troubleshooting

**Extension not working:**
1. Check VS Code Developer Console (Help → Toggle Developer Tools)
2. Verify API URL in settings
3. Check internet connection
4. Restart VS Code

**API errors:**
1. Verify API endpoint is accessible
2. Check OpenAI API key is configured on server
3. Ensure prompt is not empty

## Browser Extension

### Installation

#### From Chrome Web Store (Recommended)
1. Open Chrome
2. Go to Chrome Web Store
3. Search for "Prompt Enhancer"
4. Click "Add to Chrome"

#### From Source (Development)
1. Download or clone the repository
2. Open Chrome → Extensions (chrome://extensions/)
3. Enable "Developer mode"
4. Click "Load unpacked"
5. Select the `apps/browser` directory

### Usage

#### Basic Enhancement
1. **Select any text** on any webpage
2. **Right-click** → "Enhance with AI"
3. **View enhanced text** in the popup overlay
4. **Choose action**:
   - **"Accept"** - Replace original text with enhanced version
   - **"Copy Enhanced"** - Copy enhanced text to clipboard
   - **"Cancel"** - Dismiss without changes

#### Configuration

**Popup Settings**:
1. Click the extension icon in the toolbar
2. Configure settings:
   - **Custom API URL**: Override default endpoint
   - **Production API URL**: Default production endpoint
   - **Model**: AI model preference

#### Features
- ✅ **Context Menu Integration**: Right-click any selected text
- ✅ **Beautiful UI**: Modern, minimal design with shadcn components
- ✅ **Smart API Detection**: Automatic production API fallback
- ✅ **Cross-Site Support**: Works on any website
- ✅ **Non-Intrusive**: Minimal UI footprint
- ✅ **Error Handling**: Graceful error display

#### Supported Websites
- ✅ All websites (universal compatibility)
- ✅ Text areas and input fields
- ✅ Content pages and articles
- ✅ Code repositories (GitHub, GitLab, etc.)
- ✅ Documentation sites
- ✅ Social media platforms

#### Troubleshooting

**Extension not appearing:**
1. Check if extension is enabled in chrome://extensions/
2. Refresh the webpage
3. Try selecting different text
4. Check browser console for errors

**Context menu not showing:**
1. Ensure text is selected
2. Try right-clicking on different elements
3. Check extension permissions
4. Restart browser

**API errors:**
1. Check extension popup for error messages
2. Verify API URL in settings
3. Test API endpoint directly
4. Check internet connection

## Configuration Examples

### Development Setup

**VS Code Extension:**
```json
{
  "promptEnhancer.apiBaseUrl": "http://localhost:3000",
  "promptEnhancer.model": "gpt-4o-mini"
}
```

**Browser Extension:**
- Custom API URL: `http://localhost:3000`
- Model: `gpt-4o-mini`

### Production Setup

**VS Code Extension:**
```json
{
  "promptEnhancer.apiBaseUrl": "",
  "promptEnhancer.productionApiUrl": "https://prompt-enhancer.vercel.app",
  "promptEnhancer.model": "gpt-4o-mini"
}
```

**Browser Extension:**
- Custom API URL: (leave empty)
- Production API URL: `https://prompt-enhancer.vercel.app`
- Model: `gpt-4o-mini`

### Self-Hosted Setup

**VS Code Extension:**
```json
{
  "promptEnhancer.apiBaseUrl": "https://your-api.example.com",
  "promptEnhancer.model": "gpt-4o-mini"
}
```

**Browser Extension:**
- Custom API URL: `https://your-api.example.com`
- Model: `gpt-4o-mini`

## Best Practices

### For Users
1. **Select meaningful text**: Choose complete thoughts or questions
2. **Use for improvement**: Enhance prompts for better AI responses
3. **Review changes**: Always review enhanced text before accepting
4. **Configure models**: Choose appropriate model for your needs

### For Developers
1. **Test locally**: Use development API endpoints for testing
2. **Monitor usage**: Check API logs for usage patterns
3. **Handle errors**: Implement proper error handling in integrations
4. **Respect rate limits**: Be mindful of API usage

## Support

### Common Issues
- **Slow responses**: Try a faster model like `gpt-4o-mini`
- **API errors**: Check server status and configuration
- **Extension not working**: Restart VS Code/browser and check settings

### Getting Help
1. Check the troubleshooting sections above
2. Review API documentation
3. Check GitHub issues
4. Contact support

### Feature Requests
Submit feature requests via:
- GitHub Issues
- VS Code Marketplace reviews
- Chrome Web Store reviews
