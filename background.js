// Listens for messages from Mentorpick script and relays them to the content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log("Background script received message:", message);
  
    if (message.action === "pasteCode") {
      // Relay message to content script
      chrome.tabs.query({ url: "https://codeforces.com/problemset/submit" }, (tabs) => {
        if (tabs.length > 0) {
          chrome.tabs.sendMessage(tabs[0].id, message, (response) => {
            sendResponse(response);
          });
        } else {
          sendResponse({ status: "error", message: "Codeforces tab not found." });
        }
      });
      return true; // Indicates that the response will be sent asynchronously
    }
  });
  