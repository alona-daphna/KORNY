document.addEventListener('DOMContentLoaded', function () {
  const saveButton = document.getElementById('saveButton');
  const definitionInput = document.getElementById('definitionInput');

  let selection = null;

  // Receiving the selection data from the background script
  chrome.runtime.onMessage.addListener((message) => {
    if (message.type === 'insert-definition') {
      selection = message.data;
    }
  });

  saveButton.addEventListener('click', function () {
    const definition = definitionInput.value.trim();
    chrome.runtime.sendMessage({
      type: 'save-definition',
      data: { selection, definition },
    });
    window.close(); // Close the popup
  });
});
