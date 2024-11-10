// Log to confirm the script is loaded
console.log("External script loaded");

let heightSetByMessage = false; // Flag to prevent setIframeHeight after message update

// Function to determine mobile screen size
function isMobileScreen() {
  return window.innerWidth <= 768;
}

// Set initial iframe height based on screen size, only if not set by message
function setIframeHeight() {
  if (!heightSetByMessage) {
    const iframe = document.getElementById("iframe");
    iframe.style.height = isMobileScreen() ? "2300px" : "1600px"; // Initial height for testing
    console.log("Set iframe height");
  }
}

// Initial call to set iframe height
setIframeHeight();

// Reset the flag after a short delay to allow future resizing
function resetHeightSetByMessageFlag() {
  setTimeout(() => {
    heightSetByMessage = false;
  }, 1000); // Adjust timeout as needed
}

// Listen for messages from the iframe
window.addEventListener("message", function (event) {
  if (event.data.type === "resize-iframe") {
    const iframe = document.getElementById("iframe");
    iframe.style.height = `${event.data.height[isMobileScreen() ? 1 : 0]}px`;
    console.log("Height updated from message");
    // Trigger the height change
    sendHeightToHostingerSection(`${event.data.height[isMobileScreen() ? 1 : 0]}px`); // Adjust based on your needs
    // Set flag to prevent immediate height reset
    heightSetByMessage = true;
    resetHeightSetByMessageFlag();

    window.scrollTo({
      top: 50,
      behavior: "smooth",
    });
  }
});

// Listen for resize events
window.addEventListener("resize", setIframeHeight);

// Send the height adjustment message to the parent (Hostinger)
function sendHeightToHostingerSection(height) {
  if (window.parent) {
    window.parent.postMessage({ type: "resize-hostinger-section", height: height }, "*");
    console.log("Resizing Hostinger section to", height);
  } else {
    console.log("Hostinger section not found.");
  }
}

