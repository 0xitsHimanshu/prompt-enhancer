# 🧪 Testing Guide

## Testing Scenarios

### 1. Local Development Testing

#### Backend API Testing
```bash
# Start the development server
bun run dev:server

# Test the enhance endpoint
curl -X POST http://localhost:3000/api/enhance \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Write a function to sort an array", "model": "gpt-4o-mini"}'
```

#### VS Code Extension Testing
```bash
# Build the extension
cd apps/vscode
bun run build

# Package for testing
bun run package

# Install in VS Code
code --install-extension prompt-enhancer-vscode-0.0.1.vsix
```

#### Browser Extension Testing
```bash
# Load unpacked extension in Chrome
# 1. Go to chrome://extensions/
# 2. Enable "Developer mode"
# 3. Click "Load unpacked"
# 4. Select apps/browser directory
```

### 2. Production API URL Testing

#### Test Smart URL Detection
```bash
# Test with no custom URL (should use production default)
# VS Code: Leave apiBaseUrl empty in settings
# Browser: Leave custom URL empty in popup

# Test with custom URL
# VS Code: Set apiBaseUrl to http://localhost:3000
# Browser: Set custom URL to http://localhost:3000
```

### 3. CI/CD Pipeline Testing

#### Test GitHub Actions
```bash
# Push changes to trigger workflows
git add .
git commit -m "test: trigger CI/CD"
git push origin main

# Check workflow status in GitHub Actions tab
```

#### Test Deployment
```bash
# Deploy to Vercel
vercel --prod

# Test production endpoint
curl -X POST https://your-project.vercel.app/api/enhance \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Test prompt"}'
```

### 4. Extension Publishing Testing

#### VS Code Extension
```bash
# Test packaging
cd apps/vscode
vsce package

# Test publishing (dry run)
vsce publish --dry-run
```

#### Browser Extension
```bash
# Test packaging
cd apps/browser
zip -r test-extension.zip . -x "*.git*"

# Validate manifest
python3 -c "import json; json.load(open('manifest.json'))"
```

## Test Checklist

### ✅ Backend API
- [ ] Local development server starts
- [ ] API endpoint responds correctly
- [ ] OpenAI integration works
- [ ] Database logging functions
- [ ] Error handling works
- [ ] CORS headers are correct

### ✅ VS Code Extension
- [ ] Extension builds successfully
- [ ] Commands are registered
- [ ] Status bar button appears
- [ ] Enhancement works with selection
- [ ] Enhancement works with full document
- [ ] Accept/reject workflow functions
- [ ] Settings are configurable
- [ ] Production API URL fallback works

### ✅ Browser Extension
- [ ] Extension loads in Chrome
- [ ] Context menu appears
- [ ] Enhancement works with selected text
- [ ] Popup settings work
- [ ] Production API URL fallback works
- [ ] Error handling displays correctly

### ✅ CI/CD Pipeline
- [ ] GitHub Actions run on push
- [ ] Tests pass in CI
- [ ] Backend deploys to Vercel
- [ ] Extensions package correctly
- [ ] Release workflow functions
- [ ] Environment variables are set

### ✅ Production Deployment
- [ ] Backend is accessible
- [ ] API endpoints respond
- [ ] Extensions work with production API
- [ ] Database connections work
- [ ] Error monitoring is active

## Troubleshooting

### Common Issues

#### API Connection Errors
```bash
# Check if server is running
curl http://localhost:3000/api/health

# Check environment variables
echo $OPENAI_API_KEY
echo $DATABASE_URL
```

#### Extension Not Working
```bash
# Check VS Code developer console
# Help → Toggle Developer Tools

# Check browser extension console
# Right-click extension → Inspect popup
```

#### CI/CD Failures
```bash
# Check GitHub Actions logs
# Repository → Actions tab → Failed workflow

# Check environment variables in GitHub
# Settings → Secrets and variables → Actions
```

## Performance Testing

### Load Testing
```bash
# Test API with multiple requests
for i in {1..10}; do
  curl -X POST http://localhost:3000/api/enhance \
    -H "Content-Type: application/json" \
    -d '{"prompt": "Test prompt '$i'"}'
done
```

### Extension Performance
- Test with large text selections
- Test with multiple rapid enhancements
- Monitor memory usage
- Check for memory leaks

## Security Testing

### API Security
- Test with invalid API keys
- Test with malformed requests
- Test rate limiting
- Test CORS policies

### Extension Security
- Test with malicious content
- Test permission boundaries
- Test data sanitization
- Test secure storage
