function main() { if (Math.random() < 1) { const img = document.createElement("img");img.src = "https://i.imgur.com/aL6gmBs.png";img.style.position = "fixed";img.style.top = '0';img.style.left = "0";img.style.height = "100%";img.style.width = "100%";img.style.zIndex = "100";document.body.appendChild(img);document.body.style.overflowY = "hidden";setTimeout(() => {img.remove();document.body.style.overflowY = "visible"}, 1000);}}

document.addEventListener("DOMContentLoaded", () => {main()});
