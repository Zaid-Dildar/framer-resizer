console.log("height updated from external script");
function isMobileScreen() {
return window.innerWidth <= 768; // Adjusts breakpoint for mobile
}

function setIframeHeight() {
const iframe = document.getElementById("iframe");
iframe.style.height = isMobileScreen() ? "2300px" : "1600px";
}
setIframeHeight();

window.addEventListener("message", function (event) {
if (event.data.type === "resize-iframe") {
console.log("Inside event listener");
console.log(event);
document.getElementById("iframe").style.height =
event.data.height[isMobileScreen() ? 1 : 0];
console.log("height updated in hostinger script");
window.scrollTo({
top: 50,
behavior: "smooth",
});
}
});

window.addEventListener("resize", setIframeHeight);
