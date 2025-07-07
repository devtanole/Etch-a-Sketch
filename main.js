const grid = document.querySelector(".grid-container");
const colorPicker = document.querySelector(".color-picker");

let isMouseDown = false;
let currentColor = colorPicker.value;

colorPicker.addEventListener("input", (e) => {
  currentColor = e.target.value;
});

for (let i = 0; i < 16; i++) {
  for (let j = 0; j < 16; j++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    grid.appendChild(cell);
  }
}

document.body.addEventListener("mousedown", () => {
  isMouseDown = true;
});
document.body.addEventListener("mouseup", () => {
  isMouseDown = false;
});

const buttons = document.querySelectorAll(".btn");
buttons.forEach((button) => {
  button.addEventListener("click", function () {
    buttons.forEach((btn) => btn.classList.remove("active"));
    this.classList.add("active");
  });
});

const cells = document.querySelectorAll(".cell");
cells.forEach((cell) => {
  cell.addEventListener("mousedown", () => {
    cell.style.backgroundColor = currentColor;
  });

  cell.addEventListener("mouseover", () => {
    if (isMouseDown) {
      cell.style.backgroundColor = currentColor;
    }
  });
});
