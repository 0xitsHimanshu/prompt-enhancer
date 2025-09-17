# 🚀 Deployment Guide

## Production API Configuration

### Backend Deployment (Vercel)

1. **Deploy to Vercel:**
   ```bash
   # Install Vercel CLI
   npm i -g vercel
   
   # Deploy from project root
   vercel --prod
   ```

2. **Set Environment Variables:**
   ```bash
   vercel env add OPENAI_API_KEY
   vercel env add DATABASE_URL
   ```

3. **Your production API will be available at:**
   ```
   https://your-project-name.vercel.app
   ```

### Extension Configuration

#### VS Code Extension
- **Default Production URL:** `https://your-project-name.vercel.app`
- **User Override:** Users can set custom URL in VS Code settings
- **Development:** Uses `http://localhost:3000` when available

#### Browser Extension
- **Default Production URL:** `https://your-project-name.vercel.app`
- **User Override:** Users can configure in extension popup
- **Development:** Uses `http://localhost:3000` when available

### Smart Configuration Logic

Both extensions use this priority order:

1. **Custom URL** (if user sets one)
2. **Environment Variables** (for development)
3. **Production Default** (automatic fallback)

### User Experience

**For End Users:**
- ✅ **Zero Configuration Required** - Works out of the box with production API
- ✅ **Optional Customization** - Can override for self-hosted instances
- ✅ **Development Friendly** - Automatically detects local development

**For Developers:**
- ✅ **Environment Variables** - Set `VSCODE_ENHANCER_API` or `NEXT_PUBLIC_SERVER_URL`
- ✅ **Local Development** - Automatically uses `localhost:3000` when available
- ✅ **Production Ready** - Defaults to your deployed API

### Configuration Examples

#### VS Code Extension Settings
```json
{
  "promptEnhancer.apiBaseUrl": "", // Empty = use production default
  "promptEnhancer.productionApiUrl": "https://your-api.vercel.app",
  "promptEnhancer.model": "gpt-4o-mini"
}
```

#### Browser Extension Storage
```javascript
{
  "apiBaseUrl": "", // Empty = use production default
  "productionApiUrl": "https://your-api.vercel.app",
  "model": "gpt-4o-mini"
}
```

### Deployment Checklist

- [ ] Deploy backend to Vercel/Railway/Fly.io
- [ ] Set `OPENAI_API_KEY` environment variable
- [ ] Set `DATABASE_URL` environment variable
- [ ] Update production URL in extension configurations
- [ ] Test extensions with production API
- [ ] Package and distribute extensions

### Self-Hosting

For self-hosted instances:

1. **Update Production URL:**
   - VS Code: Set `promptEnhancer.productionApiUrl`
   - Browser: Set production URL in popup

2. **Or Use Custom URL:**
   - VS Code: Set `promptEnhancer.apiBaseUrl`
   - Browser: Set custom URL in popup

This approach ensures your extensions work seamlessly in production while remaining flexible for development and self-hosting scenarios.
