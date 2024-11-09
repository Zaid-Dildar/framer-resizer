
console.log("External script loaded");

function isMobileScreen() {
  return window.innerWidth <= 768; // Adjusts breakpoint for mobile
}

function setIframeHeight() {
  const iframe = document.getElementById("iframe");
  iframe.style.height = isMobileScreen() ? "2300px" : "1600px";
  console.log("Set iframe height");
}

// Set an initial height for the iframe
setIframeHeight();

window.addEventListener("resize", setIframeHeight);

// Listen for messages from the iframe and adjust parent section height
window.addEventListener("message", function (event) {
  if (event.data.type === "resize-iframe") {
    const section = document.getElementById("zuhczw");
    const newHeight = event.data.height[isMobileScreen() ? 1 : 0];
    console.log("Resizing section to", newHeight);
    
    // Update iframe height
    document.getElementById("iframe").style.height = newHeight;
    
    // Update the section height in Hostinger
    if (section) {
      section.style.height = `${newHeight}px`;
      console.log("Section height updated to:", newHeight);
    }
    
    window.scrollTo({
      top: 50,
      behavior: "smooth",
    });
  }
});

