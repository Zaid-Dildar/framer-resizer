// Log to confirm the script is loaded
console.log("External script loaded");

// Function to determine mobile screen size
function isMobileScreen() {
  return window.innerWidth <= 768;
}

// Set initial iframe height based on screen size
function setIframeHeight() {
  const iframe = document.getElementById("iframe");
  iframe.style.height = isMobileScreen() ? "2300px" : "1700px"; // Initial height for testing
  console.log("Set iframe height");
}

// Listen for resize events and messages
window.addEventListener("resize", setIframeHeight);

// Function to reset the flag after a short delay
function resetHeightSetByMessageFlag() {
  setTimeout(() => {
    window.heightSetByMessage = false;
  }, 1000); // Adjust timeout as needed
}

// Listen for messages from the iframe
window.addEventListener("message", function (event) {
  if (event.data.type === "resize-iframe") {
    const iframe = document.getElementById("iframe");
    iframe.style.height = event.data.height[isMobileScreen() ? 1 : 0];
    console.log("Height updated from message");

    // Prevent immediate height reset
    window.heightSetByMessage = true;
    resetHeightSetByMessageFlag();

    window.scrollTo({
      top: 50,
      behavior: "smooth",
    });
  }
});

// Send the height adjustment message to the parent (Hostinger)
function sendHeightToHostingerSection(height) {
  if (window.parent) {
    window.parent.postMessage({ type: "resize-hostinger-section", height: height }, "*");
    console.log("Resizing Hostinger section to", height);
  } else {
    console.log("Hostinger section not found.");
  }
}

// Trigger the height change
sendHeightToHostingerSection(1700); // Adjust based on your needs
