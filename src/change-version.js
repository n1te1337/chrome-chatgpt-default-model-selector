const getDefaultGPTVersion = async () => {
  return new Promise((resolve) => {
    chrome.storage.sync.get('gpt_version', (data) => {
      const defaultVersion = data['gpt_version'] || 'gpt-4';

      resolve(defaultVersion);
    });
  });
}

const updateDefaultGPTVersion = async () => {
  const targetDomains ['chatgpt.com', 'chat.openai.com'];
  const currentURL = new URL(window.location.href);

  // Check if current URL's domain matches the target domain
  if (targetDomains.includes(currentURL.hostname)) {
    // Skip chat history
    if (currentURL.pathname.startsWith('/c/')) {
      return;
    }

    // Skip pages that already use the default model version
    const defaultVersion = await getDefaultGPTVersion();
    if ((currentURL.searchParams.get('model') || '').includes(defaultVersion)) {
      return;
    }

    // Set or update the 'model' query param to the saved default model version
    currentURL.searchParams.set('model', defaultVersion);

    // Redirect to the chat page using the saved default model version
    window.location.href = currentURL.toString();
  }
}

const observeDOMChanges = () => {
    // Get a target element
    const targetNode = document.body;

    // Set observer
    const config = { childList: true, subtree: true };

    // Callback function when new Chat page access
    const callback = async (mutationsList) => {
      for (const mutation of mutationsList) {
        if (mutation.type === 'childList') {
          updateDefaultGPTVersion();
        }
      }
    };

    // Create an observer instance
    const observer = new MutationObserver(callback);

    // Start observing to target element
    observer.observe(targetNode, config);
  }

  // Start observing DOM changes
  observeDOMChanges();
