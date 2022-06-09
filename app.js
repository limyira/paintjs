const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const changeColor = document.querySelectorAll(".jsColor");
const range = document.querySelector("#jsRange");
const mode = document.querySelector("#jsMode");
const clear = document.querySelector("#jsClear");
const save = document.querySelector("#jsSave");

const IN_COLOR = "#2c2c2c";
let painting = false;
let filling = false;
const CANVAS_SIZE = 700;
canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.strokeStyle = IN_COLOR;
ctx.fillStyle = IN_COLOR;
ctx.lineWidth = 2.5;

function stopPainting() {
  painting = false;
}
function startPainting() {
  painting = true;
}
function MouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if (!painting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}
function onMouseDown(event) {
  painting = true;
}


function paintPath() {
    if (filling) {
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    }
}

if (canvas) {
  canvas.addEventListener("mousemove", MouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", paintPath);
}

function handleColor(event) {
    const willChangeColor =  event.target.style.backgroundColor;
    ctx.strokeStyle = willChangeColor;
    ctx.fillStyle = willChangeColor;
}


Array.from(changeColor).forEach(color => 
    color.addEventListener("click", handleColor));

    
function changeRange(event) {
    const strokeSize = event.target.value;
    ctx.lineWidth = strokeSize;

}
    

if (range) {
    range.addEventListener("input", changeRange);
}

function changeMode() {
    if (filling ===true) {
        filling = false;
        mode.innerText = "FILL";
    } else {
        filling = true;
        mode.innerHTML = "PAINT";
        
    }
}


if (mode) {
    mode.addEventListener("click", changeMode);
}


function allClear() {
    ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
}

if (clear) {
    clear.addEventListener("click", allClear);
}

function doSave() {
  const image = canvas.toDataURL();
  const link = document.createElement("a");
  link.href = image;
  link.download = "PAINTJS";
  link.click();
}


if (save) {
  save.addEventListener("click", doSave);
}
