document.addEventListener('keydown', (e) => {
  if (e.key === 'k' && e.ctrlKey && e.code === 'ControlRight') {
    chrome.runtime.sendMessage({ message: 'save-to-db' });
  }
});
