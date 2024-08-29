console.log("mentorpick.js Script Loaded");

if (!document.getElementById("copyToCFButton")) {
  console.log("Creating Copy to Codeforces button");

  const button = document.createElement("button");
  button.textContent = "Copy to Codeforces";
  button.id = "copyToCFButton";
  button.style.position = "fixed";
  button.style.top = "10px";
  button.style.right = "10px";
  button.style.padding = "10px";

   button.style.backgroundImage = "linear-gradient(0deg, rgba(36,220,222,1) 32%, rgba(253,228,45,1) 100%)";
  button.style.color = "white";
  
  button.style.border = "none";
  button.style.borderRadius = "5px";
  button.style.cursor = "pointer";
  button.style.fontWeight="bold";
  button.style.zIndex = "1000";

  document.body.appendChild(button);

  button.addEventListener("click", () => {
    const editorContentDiv = document.querySelector("#codeEdit > div > div.cm-scroller > div.cm-content");

    if (editorContentDiv) {
      const code = editorContentDiv.innerText;
      console.log("Copied Code:", code);

      navigator.clipboard.writeText(code).then(() => {
        
        // Send the code to Codeforces via messaging
        chrome.runtime.sendMessage({
          action: "pasteCode",
          code: code
        }, (response) => {
          if (response.status === "success") {
            showNotification("Code copied to Codeforces!");
            console.log("Code pasted successfully on Codeforces.");
          } else {
            alert(response.message+"! Open submit page of the problem!!");
            console.log("Error pasting code:", response.message);
          }
        });

        // Navigate to Codeforces submit page
        // window.location.href = "https://codeforces.com/problemset/submit";
      });
    } else {
      alert("Editor content element not found.");
      console.log("Editor content element not found.");
    }
  });
} else {
  console.log("Button already exists");
}

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
  notification.style.backgroundColor = "green";
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
