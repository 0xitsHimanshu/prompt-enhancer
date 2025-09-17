// Background service worker for context menu
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "enhanceText",
    title: "Enhance with AI",
    contexts: ["selection"]
  });
});

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId === "enhanceText" && info.selectionText) {
    try {
      console.log('Context menu clicked, selected text:', info.selectionText);
      
      // Get stored API URL or use production default
      const result = await chrome.storage.sync.get(['apiBaseUrl', 'productionApiUrl']);
      const apiBaseUrl = result.apiBaseUrl || result.productionApiUrl || 'https://prompt-enhancer.vercel.app';
      
      console.log('Using API URL:', apiBaseUrl);
      console.log('Sending message to tab:', tab.id);
      
      // Make API call from background script to avoid blocking
      try {
        console.log('Making API call from background script...');
        const response = await fetch(`${apiBaseUrl}/api/enhance`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ prompt: info.selectionText })
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('API response received:', data);
        
        // Send enhanced text to content script for display
        chrome.tabs.sendMessage(tab.id, {
          action: "showEnhancedText",
          originalText: info.selectionText,
          enhancedText: data.enhanced
        }, (response) => {
          if (chrome.runtime.lastError) {
            console.error('Error sending enhanced text to content script:', chrome.runtime.lastError.message);
            // If content script isn't loaded, inject it first
            if (chrome.runtime.lastError.message.includes('Could not establish connection')) {
              console.log('Content script not loaded, injecting it...');
              chrome.scripting.executeScript({
                target: { tabId: tab.id },
                files: ['content.js']
              }, () => {
                if (chrome.runtime.lastError) {
                  console.error('Failed to inject content script:', chrome.runtime.lastError.message);
                } else {
                  console.log('Content script injected, retrying message...');
                  // Retry sending the message after a short delay
                  setTimeout(() => {
                    chrome.tabs.sendMessage(tab.id, {
                      action: "showEnhancedText",
                      originalText: info.selectionText,
                      enhancedText: data.enhanced
                    });
                  }, 500);
                }
              });
            }
          } else {
            console.log('Enhanced text sent to content script successfully');
          }
        });
        
      } catch (error) {
        console.error('Error making API call:', error);
        // Send error to content script for display
        chrome.tabs.sendMessage(tab.id, {
          action: "showError",
          message: 'Failed to enhance text: ' + error.message
        });
      }
    } catch (error) {
      console.error('Error enhancing text:', error);
    }
  }
});

