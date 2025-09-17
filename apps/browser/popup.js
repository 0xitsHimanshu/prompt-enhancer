// Popup script for settings management
document.addEventListener('DOMContentLoaded', async () => {
  // Load saved settings
  const result = await chrome.storage.sync.get(['apiBaseUrl', 'productionApiUrl', 'model']);
  document.getElementById('apiUrl').value = result.apiBaseUrl || '';
  document.getElementById('productionUrl').value = result.productionApiUrl || 'https://prompt-enhancer.vercel.app';
  document.getElementById('model').value = result.model || '';
  
  // Save settings button
  document.getElementById('saveSettings').addEventListener('click', async () => {
    const apiUrl = document.getElementById('apiUrl').value.trim();
    const productionUrl = document.getElementById('productionUrl').value.trim();
    const model = document.getElementById('model').value.trim();
    
    if (!productionUrl) {
      showStatus('Production API URL is required', 'error');
      return;
    }
    
    try {
      await chrome.storage.sync.set({
        apiBaseUrl: apiUrl,
        productionApiUrl: productionUrl,
        model: model
      });
      showStatus('Settings saved successfully!', 'success');
    } catch (error) {
      showStatus('Failed to save settings: ' + error.message, 'error');
    }
  });
});

function showStatus(message, type) {
  const status = document.getElementById('status');
  status.textContent = message;
  status.className = `status ${type}`;
  status.style.display = 'block';
  
  setTimeout(() => {
    status.style.display = 'none';
  }, 3000);
}
