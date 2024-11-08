console.log("height updated from external script");

function isMobileScreen() {
  return window.innerWidth <= 768; // Adjusts breakpoint for mobile
}

function setIframeHeight() {
  // Only set height if height hasn't been updated recently by message event
  if (!window.heightSetByMessage) {
    const iframe = document.getElementsByTagName("iframe")[0];
    iframe.style.height = isMobileScreen() ? "2300px" : "1600px";
    console.log("setIframeHeight triggered");
  }
}

// Initial setting of iframe height
setIframeHeight();

// Listen for the resize event
window.addEventListener("resize", setIframeHeight);

// Reset the flag after a short delay
function resetHeightSetByMessageFlag() {
  setTimeout(() => {
    window.heightSetByMessage = false;
  }, 1000); // Adjust timeout as needed
}

// Listen for messages from the iframe
window.addEventListener("message", function (event) {
  if (event.data.type === "resize-iframe") {
    console.log("Inside event listener");
    console.log(event);

    const iframe = document.getElementsByTagName("iframe")[0];
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
