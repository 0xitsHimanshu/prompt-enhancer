# 🔌 API Documentation

## Overview

The Prompt Enhancer API provides AI-powered prompt enhancement services through a simple REST endpoint. Built with Next.js 15, tRPC, and OpenAI integration.

## Base URL

- **Production**: `https://prompt-enhancer.vercel.app`
- **Development**: `http://localhost:3000`

## Authentication

Currently, no authentication is required. API keys are managed server-side.

## Endpoints

### POST `/api/enhance`

Enhances a given prompt using AI to make it more detailed, specific, and effective.

#### Request

**Headers:**
```
Content-Type: application/json
```

**Body:**
```json
{
  "prompt": "string (required)",
  "model": "string (optional)"
}
```

**Parameters:**
- `prompt` (string, required): The text prompt to enhance
- `model` (string, optional): AI model preference. Defaults to `gpt-4o-mini`

#### Response

**Success (200):**
```json
{
  "enhanced": "string"
}
```

**Error (400/500):**
```json
{
  "error": "string"
}
```

#### Example Usage

**cURL:**
```bash
curl -X POST https://prompt-enhancer.vercel.app/api/enhance \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "Write a function to sort an array",
    "model": "gpt-4o-mini"
  }'
```

**JavaScript:**
```javascript
const response = await fetch('https://prompt-enhancer.vercel.app/api/enhance', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    prompt: 'Write a function to sort an array',
    model: 'gpt-4o-mini'
  })
});

const data = await response.json();
console.log(data.enhanced);
```

**Python:**
```python
import requests

response = requests.post(
    'https://prompt-enhancer.vercel.app/api/enhance',
    json={
        'prompt': 'Write a function to sort an array',
        'model': 'gpt-4o-mini'
    }
)

data = response.json()
print(data['enhanced'])
```

## Error Handling

### HTTP Status Codes

- `200` - Success
- `400` - Bad Request (invalid input)
- `500` - Internal Server Error

### Common Error Responses

**Invalid JSON:**
```json
{
  "error": "Invalid JSON in request body"
}
```

**Missing prompt:**
```json
{
  "error": "Prompt is required"
}
```

**OpenAI API Error:**
```json
{
  "error": "OpenAI API error: [details]"
}
```

## Rate Limiting

Currently no rate limiting is implemented. Consider implementing if needed for production use.

## Supported Models

- `gpt-4o-mini` (default) - Fast and cost-effective
- `gpt-4o` - Higher quality, more expensive
- `gpt-3.5-turbo` - Legacy model

## Response Times

Typical response times:
- `gpt-4o-mini`: 1-3 seconds
- `gpt-4o`: 2-5 seconds
- `gpt-3.5-turbo`: 1-2 seconds

## Best Practices

### Input Guidelines

1. **Be Specific**: Provide context about what you want to achieve
2. **Include Examples**: Mention the format or style you prefer
3. **Set Constraints**: Specify any limitations or requirements
4. **Use Clear Language**: Avoid ambiguous or overly complex requests

### Example Transformations

**Before:**
```
"Write a function"
```

**After:**
```
"Write a comprehensive Python function that sorts a list of integers in ascending order. The function should:
- Accept a list of integers as input
- Return a new sorted list without modifying the original
- Handle edge cases like empty lists and single elements
- Include proper error handling for non-integer inputs
- Be well-documented with docstrings
- Include type hints
- Have a time complexity of O(n log n) or better"
```

## Integration Examples

### VS Code Extension

The API is designed to work seamlessly with the VS Code extension:

```typescript
async function enhancePrompt(prompt: string): Promise<string> {
  const response = await fetch('/api/enhance', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt })
  });
  
  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }
  
  const data = await response.json();
  return data.enhanced;
}
```

### Browser Extension

For browser extensions, ensure CORS is properly configured:

```javascript
// Background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'enhance') {
    fetch('https://prompt-enhancer.vercel.app/api/enhance', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: request.prompt })
    })
    .then(response => response.json())
    .then(data => sendResponse({ success: true, enhanced: data.enhanced }))
    .catch(error => sendResponse({ success: false, error: error.message }));
    
    return true; // Keep message channel open for async response
  }
});
```

## Monitoring and Logging

The API includes comprehensive logging for:
- Request/response times
- Error rates
- Model usage statistics
- Prompt enhancement patterns

Logs are stored in the database and can be accessed for analytics.

## Future Enhancements

Planned features:
- User authentication and API keys
- Rate limiting and quotas
- Custom model fine-tuning
- Batch processing
- Webhook notifications
- Analytics dashboard
