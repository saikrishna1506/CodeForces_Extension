console.log("content.js Script Loaded");

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("Received message:", message);

  const toggleCheckbox = document.getElementById("toggleEditorCheckbox");

  if (toggleCheckbox && !toggleCheckbox.checked) {
    showNotification("Please check the 'Switch on editor' checkbox. Paste Again!!");
    sendResponse({ status: "error", message: "Editor checkbox not checked." });
    return;
  }

  if (message.action === "pasteCode") {
    console.log("Pasting Code to Codeforces Editor");

    // Select the Codeforces editor element
    const codeEditorDiv = document.querySelector("#sourceCodeTextarea");

    if (codeEditorDiv) {
      // Clear any existing content
      codeEditorDiv.innerHTML = ""; 

      // Inject the copied code
      codeEditorDiv.textContent = message.code;

      console.log("Code Pasted:", codeEditorDiv.textContent);

      // Trigger input event to simulate manual paste
      const event = new Event('input', { bubbles: true });
      codeEditorDiv.dispatchEvent(event);

      sendResponse({ status: "success" });
    } else {
      console.log("Editor element not found.");
      sendResponse({ status: "error", message: "Editor element not found." });
    }
  }
});

// Function to show a custom notification banner
function showNotification(message) {
  const existingNotification = document.querySelector('.notification');
  if (existingNotification) {
    existingNotification.remove();
  }

  const notification = document.createElement('div');
  notification.className = 'notification';
  notification.textContent = message;

  notification.style.position = "fixed";
  notification.style.top = "10px";
  notification.style.left = "50%";
  notification.style.transform = "translateX(-50%)";
  notification.style.padding = "10px";
  notification.style.borderRadius = "5px";
  notification.style.color = "white";
  notification.style.backgroundColor = "red";
  notification.style.zIndex = "1000";
  notification.style.fontSize = "16px";
  notification.style.fontWeight = "bold";
  notification.style.textAlign = "center";

  document.body.appendChild(notification);

  // Remove notification after a delay
  setTimeout(() => {
    document.body.removeChild(notification);
  }, 10000);
}
