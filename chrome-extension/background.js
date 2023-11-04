let currentSet = null;

chrome.runtime.onMessage.addListener(async (message) => {
  if (message.type === 'get-set-id') {
    currentSet = message.setId;
  }
});

chrome.commands.onCommand.addListener(({ message }) => {
  if (message === 'save-to-db') {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        function: createStudyCard,
      });
    });
  }
});

chrome.runtime.onMessage.addListener(async (message) => {
  if (message.type === 'save-definition') {
    const { selection, definition } = message.data;
    await saveCard(selection, definition);
  }
});

const createStudyCard = () => {
  const selection = window.getSelection().toString().trim();
  if (selection !== '') {
    insertDefinition(selection);
  }
};

const insertDefinition = async (selection) => {
  chrome.windows.create(
    {
      url: 'popup.html',
      type: 'popup',
      width: 300,
      height: 200,
    },
    (newWindow) => {
      chrome.runtime.sendMessage({
        type: 'insert-definition',
        data: selection,
        tabId: newWindow.tabs[0].id,
      });
    }
  );
};

const saveCard = async (term, definition) => {
  // save definition and term to db
  console.log('Term:', term);
  console.log('Definition:', definition);
  console.log('Set ID:', currentSet);
};
