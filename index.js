<iframe
  id="iframe"
  src="https://booking-form-beta.vercel.app/"
  sandbox="allow-same-origin allow-scripts allow-forms allow-modals"
  scrolling="no"
  frameborder="0"
  style="width: 100%; height: 800px; border: none;">
</iframe>

<script>
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

// Initial setting of iframe height
setIframeHeight();

window.addEventListener("resize", setIframeHeight);

function resetHeightFlag() {
  setTimeout(() => {
    isHeightUpdatedByMessage = false;
  }, 1000); // Adjust the delay if necessary
}

// Wait for the DOM to be fully loaded to access the section
window.onload = function () {
  const section = document.getElementById("zuhczw");

  if (section) {
    console.log("Section found:", section);

    window.addEventListener("message", function (event) {
      if (event.data.type === "resize-iframe") {
        const newHeight = event.data.height[isMobileScreen() ? 1 : 0];
        console.log("Resizing section to", newHeight);

        // Update iframe height
        const iframe = document.getElementById("iframe");
        iframe.style.height = newHeight;

        // Update section height
        section.style.height = `${newHeight}px`;
        console.log("Section height updated to:", newHeight);

        // Set flag to prevent immediate reset by resize
        isHeightUpdatedByMessage = true;
        resetHeightFlag();

        window.scrollTo({
          top: 50,
          behavior: "smooth",
        });
      }
    });
  } else {
    console.warn("Section with ID 'zuhczw' not found.");
  }
};
</script>
