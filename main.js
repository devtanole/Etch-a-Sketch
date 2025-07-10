const grid = document.querySelector(".grid-container");
const colorPicker = document.querySelector(".color-picker");
const colorButton = document.getElementById("color-btn");
const eraseButton = document.getElementById("eraser-btn");

let isMouseDown = false;
let currentColor = colorPicker.value;
let mode = "color";

colorPicker.addEventListener("input", (e) => {
  currentColor = e.target.value;
});

document.body.addEventListener("mousedown", () => {
  isMouseDown = true;
});
document.body.addEventListener("mouseup", () => {
  isMouseDown = false;
});

for (let i = 0; i < 16 * 16; i++) {
  const cell = document.createElement("div");
  cell.classList.add("cell");
  grid.appendChild(cell);
}

const cells = document.querySelectorAll(".cell");

function paintCell(cell) {
  if (mode === "erase") {
    cell.style.backgroundColor = "#ffffff";
  } else {
    cell.style.backgroundColor = currentColor;
  }
}

cells.forEach((cell) => {
  cell.addEventListener("mousedown", () => paintCell(cell));
  cell.addEventListener("mouseover", () => {
    if (isMouseDown) paintCell(cell);
  });
});

const buttons = document.querySelectorAll(".btn");
buttons.forEach((button) => {
  button.addEventListener("click", function () {
    buttons.forEach((btn) => btn.classList.remove("active"));
    this.classList.add("active");

    if (this.id === "eraser-btn") {
      mode = "erase";
    } else if (this.id === "color-btn") {
      mode = "color";
    }
  });
});

const clearButton = document.getElementById("clear-btn");
clearButton.addEventListener("click", () => {
  cells.forEach((cell) => {
    cell.style.backgroundColor = "#ffffff";
  });
});
