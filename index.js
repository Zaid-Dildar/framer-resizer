console.log("External script loaded");

function isMobileScreen() {
  return window.innerWidth <= 768;
}

let isHeightUpdatedByMessage = false; // Flag to track if height was set by message

function setIframeHeight() {
  if (!isHeightUpdatedByMessage) {
    const iframe = document.getElementById("iframe");
    iframe.style.height = isMobileScreen() ? "2300px" : "1600px";
    console.log("Set iframe height");
  }
}

// Set an initial height for the iframe
setIframeHeight();

window.addEventListener("resize", setIframeHeight);

function resetHeightFlag() {
  setTimeout(() => {
    isHeightUpdatedByMessage = false;
  }, 1000); // Adjust the delay if necessary
}

window.addEventListener("message", function (event) {
  if (event.data.type === "resize-iframe") {
    const section = document.getElementById("zuhczw");
    const newHeight = event.data.height[isMobileScreen() ? 1 : 0];
    console.log("Resizing section to", newHeight);

    // Update iframe height
    const iframe = document.getElementById("iframe");
    iframe.style.height = newHeight;

    // Update section height
    if (section) {
      section.style.height = `${newHeight}px`;
      console.log("Section height updated to:", newHeight);
    }

    // Set flag to prevent immediate reset by resize
    isHeightUpdatedByMessage = true;
    resetHeightFlag();

    window.scrollTo({
      top: 50,
      behavior: "smooth",
    });
  }
});

