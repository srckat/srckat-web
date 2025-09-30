const canvas = document.getElementById("drawing-canvas");
const ctx = canvas.getContext("2d");

let drawing = false;
let currentColor = "#000"; // default black
let lastPos = null;

// Buttons
document.getElementById("draw-color-black").onclick = () => currentColor = "#000";
document.getElementById("draw-color-red").onclick = () => currentColor = "#f00";
document.getElementById("draw-color-white").onclick = () => currentColor = "#fff"; // eraser
document.getElementById("draw-send").onclick = send;

// Mouse events
canvas.addEventListener("mousedown", (e) => {
  drawing = true;
  lastPos = { x: e.offsetX, y: e.offsetY };
});
canvas.addEventListener("mouseup", () => {
  drawing = false;
  lastPos = null;
});
canvas.addEventListener("mouseleave", () => {
  drawing = false;
  lastPos = null;
});
canvas.addEventListener("mousemove", draw);

function draw(e) {
  if (!drawing) return;

  const currentPos = { x: e.offsetX, y: e.offsetY };

  ctx.strokeStyle = currentColor;
  ctx.lineWidth = 10;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  ctx.beginPath();
  if (lastPos) ctx.moveTo(lastPos.x, lastPos.y);
  ctx.lineTo(currentPos.x, currentPos.y);
  ctx.stroke();

  lastPos = currentPos;
}

function send() {
    const data = new FormData();
    data.append("image", canvas.toDataURL());

    fetch("https://pop.srckat.me/api/processdrawing", { method: "POST", body: data })
        .then(res => res.text())
        .then(console.log);    
}