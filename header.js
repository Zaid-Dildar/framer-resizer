window.addEventListener("message", function (event) {
// Check if the message is for resizing the Hostinger section
if (event.data.type === "resize-hostinger-section") {
const section = document.getElementById("zQmwix");
if (section) {
section.style.height = event.data.height;
console.log("Updated Hostinger section height to:", event.data.height);
} else {
console.log("Section with ID 'zQmwix' not found.");
}
}
});
