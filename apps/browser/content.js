// Content script to handle text enhancement
console.log('Prompt Enhancer content script loaded');

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('Content script received message:', request);
  
  if (request.action === "showEnhancedText") {
    showLoadingIndicator();
    // Small delay to show loading indicator
    setTimeout(() => {
      showEnhancedText(request.originalText, request.enhancedText);
    }, 500);
    sendResponse({ success: true, message: 'Enhanced text displayed' });
  } else if (request.action === "showError") {
    showError(request.message);
    sendResponse({ success: true, message: 'Error displayed' });
  }
  
  // Return true to indicate we will send a response asynchronously
  return true;
});

async function enhanceText(text, apiBaseUrl) {
  try {
    // Show loading indicator
    showLoadingIndicator();
    
    console.log('Enhancing text:', text);
    console.log('API URL:', apiBaseUrl);
    
    const response = await fetch(`${apiBaseUrl}/api/enhance`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt: text })
    });
    
    console.log('Response status:', response.status);
    console.log('Response headers:', response.headers);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error response:', errorText);
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
    }
    
    const data = await response.json();
    console.log('Response data:', data);
    const enhancedText = data.enhanced;
    
    // Show enhanced text in popup
    showEnhancedText(text, enhancedText);
    
  } catch (error) {
    console.error('Error enhancing text:', error);
    showError('Failed to enhance text: ' + error.message);
  }
}

function showLoadingIndicator() {
  const indicator = document.createElement('div');
  indicator.id = 'prompt-enhancer-loading';
  indicator.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 12px 20px;
    border-radius: 12px;
    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
    z-index: 10000;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    font-size: 14px;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 8px;
    backdrop-filter: blur(8px);
  `;
  indicator.innerHTML = `
    <div style="
      width: 16px;
      height: 16px;
      border: 2px solid rgba(255, 255, 255, 0.3);
      border-top: 2px solid white;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    "></div>
    <span>Enhancing with AI...</span>
    <style>
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    </style>
  `;
  document.body.appendChild(indicator);
}

function showEnhancedText(original, enhanced) {
  // Remove loading indicator
  const loading = document.getElementById('prompt-enhancer-loading');
  if (loading) loading.remove();
  
  const popup = document.createElement('div');
  popup.id = 'prompt-enhancer-popup';
  popup.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    width: 420px;
    max-height: 600px;
    background: #ffffff;
    border: 1px solid #e5e7eb;
    border-radius: 12px;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
    z-index: 10000;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    font-size: 14px;
    overflow: hidden;
    backdrop-filter: blur(8px);
  `;
  
  popup.innerHTML = `
    <div style="
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 16px 20px;
      color: white;
      font-weight: 600;
      font-size: 16px;
      display: flex;
      align-items: center;
      gap: 8px;
    ">
      <div style="
        width: 20px;
        height: 20px;
        background: rgba(255, 255, 255, 0.2);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
      ">✨</div>
      AI Enhanced
    </div>
    
    <div style="padding: 20px; max-height: 400px; overflow-y: auto;">
      <div style="margin-bottom: 20px;">
        <div style="
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 8px;
          color: #6b7280;
          font-size: 12px;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        ">
          <div style="width: 4px; height: 4px; background: #9ca3af; border-radius: 50%;"></div>
          Original
        </div>
        <div style="
          background: #f8fafc;
          padding: 12px;
          border-radius: 8px;
          border-left: 3px solid #e2e8f0;
          font-size: 13px;
          line-height: 1.5;
          color: #475569;
          word-wrap: break-word;
        ">
          ${original}
        </div>
      </div>
      
      <div style="margin-bottom: 20px;">
        <div style="
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 8px;
          color: #059669;
          font-size: 12px;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        ">
          <div style="width: 4px; height: 4px; background: #10b981; border-radius: 50%;"></div>
          Enhanced
        </div>
        <div style="
          background: linear-gradient(135deg, #ecfdf5 0%, #f0fdf4 100%);
          padding: 12px;
          border-radius: 8px;
          border-left: 3px solid #10b981;
          font-size: 13px;
          line-height: 1.5;
          color: #065f46;
          word-wrap: break-word;
        ">
          ${enhanced}
        </div>
      </div>
    </div>
    
    <div style="
      background: #f8fafc;
      padding: 16px 20px;
      border-top: 1px solid #e5e7eb;
      display: flex;
      gap: 8px;
    ">
      <button id="copy-enhanced" style="
        flex: 1;
        padding: 10px 16px;
        background: #3b82f6;
        color: white;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        font-weight: 500;
        font-size: 13px;
        transition: all 0.2s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 6px;
      " onmouseover="this.style.background='#2563eb'" onmouseout="this.style.background='#3b82f6'">
        📋 Copy
      </button>
      <button id="replace-text" style="
        flex: 1;
        padding: 10px 16px;
        background: #10b981;
        color: white;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        font-weight: 500;
        font-size: 13px;
        transition: all 0.2s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 6px;
      " onmouseover="this.style.background='#059669'" onmouseout="this.style.background='#10b981'">
        🔄 Replace
      </button>
      <button id="close-popup" style="
        padding: 10px 16px;
        background: #6b7280;
        color: white;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        font-weight: 500;
        font-size: 13px;
        transition: all 0.2s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 6px;
      " onmouseover="this.style.background='#4b5563'" onmouseout="this.style.background='#6b7280'">
        ✕
      </button>
    </div>
  `;
  
  document.body.appendChild(popup);
  
  // Add event listeners
  document.getElementById('copy-enhanced').onclick = () => {
    navigator.clipboard.writeText(enhanced);
    showTemporaryMessage('Copied to clipboard!');
  };
  
  document.getElementById('replace-text').onclick = () => {
    // Find and replace selected text
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      range.deleteContents();
      range.insertNode(document.createTextNode(enhanced));
    }
    popup.remove();
  };
  
  document.getElementById('close-popup').onclick = () => {
    popup.remove();
  };
  
  // Auto-close after 30 seconds
  setTimeout(() => {
    if (document.getElementById('prompt-enhancer-popup')) {
      popup.remove();
    }
  }, 30000);
}

function showError(message) {
  const loading = document.getElementById('prompt-enhancer-loading');
  if (loading) loading.remove();
  
  const error = document.createElement('div');
  error.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
    color: white;
    padding: 12px 20px;
    border-radius: 12px;
    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
    z-index: 10000;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    font-size: 14px;
    font-weight: 500;
    max-width: 350px;
    display: flex;
    align-items: center;
    gap: 8px;
    backdrop-filter: blur(8px);
  `;
  error.innerHTML = `
    <div style="
      width: 16px;
      height: 16px;
      background: rgba(255, 255, 255, 0.2);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
    ">⚠️</div>
    <span>${message}</span>
  `;
  document.body.appendChild(error);
  
  setTimeout(() => error.remove(), 5000);
}

function showTemporaryMessage(message) {
  const msg = document.createElement('div');
  msg.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
    color: white;
    padding: 10px 16px;
    border-radius: 8px;
    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
    z-index: 10001;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    font-size: 13px;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 6px;
    backdrop-filter: blur(8px);
  `;
  msg.innerHTML = `
    <div style="
      width: 14px;
      height: 14px;
      background: rgba(255, 255, 255, 0.2);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 10px;
    ">✓</div>
    <span>${message}</span>
  `;
  document.body.appendChild(msg);
  
  setTimeout(() => msg.remove(), 2000);
}

