const supportedSourceControl = [
    {
        name: "GitHub",
        urlPattern: "https://github.com",
        prPathPattern: "/compare/"
    },
    {
        name: "GitLab",
        urlPattern: "https://gitlab.com",
        prPathPattern: "/merge_requests/new"
    },
    {
        name: "localhost",
        urlPattern: "http://localhost:5173",
        prPathPattern: "/"
    }
]
chrome.sidePanel
  .setPanelBehavior({ openPanelOnActionClick: true })
    .catch((error) => console.error(error));

chrome.tabs.onActivated.addListener(async (d) => {
    let queryOptions = { active: true, lastFocusedWindow: true };
    // `tab` will either be a `tabs.Tab` instance or `undefined`.
    let [tab] = await chrome.tabs.query(queryOptions);
    console.log(tab);
    validateTab(tab);
});

chrome.tabs.onUpdated.addListener(async (tabId, info, tab) => {
    if (!tab.url) return;
    validateTab(tab);
});

async function validateTab(tab) {
    const url = new URL(tab.url);
    const isSupported = supportedSourceControl.includes(url.origin);
    console.log(url, isSupported, tab);
    if (isSupported) {
          await chrome.sidePanel.setOptions({
            tabId,
            path: `index.html`,
            enabled: true
        });
    }
    else {
        await chrome.sidePanel.setOptions({
            tabId,
            path: 'index.html',
            enabled: false
        });
    }
}

// Send message and wait for response
async function send(eventName, eventObject = {}) {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage(
      { event: eventName, data: eventObject },
      (response) => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          resolve(response);
        }
      }
    );
  });
}

// Listen for events in background/side panel
function on(eventName, handler) {
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.event === eventName) {
      // Handle async handlers
      const result = handler(message.data, sender);
      
      if (result instanceof Promise) {
        result.then(sendResponse);
        return true; // Keep channel open for async
      } else {
        sendResponse(result);
      }
    }
  });
}