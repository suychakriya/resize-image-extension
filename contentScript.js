chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "resizeImages") {
    const images = document.querySelectorAll("img");
    images.forEach((img) => {
      img.style.width = `${message.width}px`;
    });
    sendResponse({ status: "success" });
  }
});
