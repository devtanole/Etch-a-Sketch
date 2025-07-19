const grid = document.querySelector(".grid-container");
const colorPicker = document.querySelector(".color-picker");
const colorButton = document.getElementById("color-btn");
const eraseButton = document.getElementById("eraser-btn");
const clearButton = document.getElementById("clear-btn");
const sizeSlider = document.querySelector(".size-value");
const sizeLabel = document.querySelector(".size-slider");
const deleteButton = document.getElementById("delete-btn");
const loadButton = document.getElementById("load-btn");
const saveButton = document.getElementById("save-btn");

let isMouseDown = false;
let currentColor = colorPicker.value;
let mode = "color";
let gridSize = parseInt(sizeSlider.value);

colorPicker.addEventListener("input", (e) => {
  currentColor = e.target.value;
});

document.body.addEventListener("mousedown", () => {
  isMouseDown = true;
});
document.body.addEventListener("mouseup", () => {
  isMouseDown = false;
});

function createGrid(size) {
  grid.innerHTML = "";
  grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;

  for (let i = 0; i < size * size; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.style.backgroundColor = "#ffffff";

    cell.addEventListener("mousedown", () => paintCell(cell));
    cell.addEventListener("mouseover", () => {
      if (isMouseDown) paintCell(cell);
    });
    grid.appendChild(cell);
  }
}

function getRainbow() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}

function paintCell(cell) {
  if (mode === "erase") {
    cell.style.backgroundColor = "#ffffff";
  } else if (mode === "rainbow") {
    cell.style.backgroundColor = getRainbow();
  } else {
    cell.style.backgroundColor = currentColor;
  }
}
const buttons = document.querySelectorAll(".btn");
buttons.forEach((button) => {
  button.addEventListener("click", function () {
    buttons.forEach((btn) => btn.classList.remove("active"));
    this.classList.add("active");

    if (this.id === "eraser-btn") {
      mode = "erase";
    } else if (this.id === "color-btn") {
      mode = "color";
    } else if (this.id === "rainbow-btn") {
      mode = "rainbow";
    }
  });
});

clearButton.addEventListener("click", () => {
  const cells = document.querySelectorAll(".cell");
  cells.forEach((cell) => (cell.style.backgroundColor = "#ffffff"));
});

sizeSlider.addEventListener("input", (e) => {
  gridSize = parseInt(e.target.value);
  updateSizeLabel(gridSize);
  createGrid(gridSize);
});

function updateSizeLabel(size) {
  sizeLabel.firstChild.textContent = `${size}x${size} `;
}

updateSizeLabel(gridSize);
createGrid(gridSize);

function saveDrawing() {
  const name = prompt("Enter a name.");
  if (!name) return;
  const $cells = document.querySelectorAll(".cell");
  const cells = [];

  $cells.forEach((cell) => {
    const color = window.getComputedStyle(cell).backgroundColor;
    cells.push(color);
  });

  const gridSize = Math.sqrt($cells.length);

  const newDrawing = {
    name,
    gridSize,
    colors: cells,
  };

  let savedDrawings = JSON.parse(localStorage.getItem("savedDrawings"));
  if (!savedDrawings) {
    savedDrawings = [];
  }
  const existingIndex = savedDrawings.findIndex((d) => d.name === name);

  if (existingIndex !== -1) {
    const confirmUpdate = confirm(
      `A drawing named "${name}" already exists. Overwrite it?`
    );
    if (!confirmUpdate) return;

    savedDrawings[existingIndex] = newDrawing;
  } else {
    savedDrawings.push(newDrawing);
  }

  localStorage.setItem("savedDrawings", JSON.stringify(savedDrawings));
  updateDrawingDropdown();
  alert("Drawing saved");
}

function loadDrawing(name) {
  const savedDrawings = JSON.parse(localStorage.getItem("savedDrawings"));
  if (!savedDrawings) return;

  const drawing = savedDrawings.find((d) => d.name === name);
  if (!drawing) return;

  createGrid(drawing.gridSize);
  const $cells = document.querySelectorAll(".cell");

  $cells.forEach((cell, index) => {
    cell.style.backgroundColor = drawing.colors[index];
  });
}

function updateDrawing(nameToUpdate) {
  const $cells = document.querySelectorAll(".cell");
  const updatedCells = [];

  $cells.forEach((cell) => {
    const color = window.getComputedStyle(cell).backgroundColor;
    updatedCells.push(color);
  });

  let savedDrawings = JSON.parse(localStorage.getItem("savedDrawings")) || [];

  savedDrawings.forEach((d) => {
    if (d.name === nameToUpdate) {
      drawing.colors = updatedCells;
      drawing.gridSize = Math.sqrt($cells.length);
      // break;
    }
  });

  localStorage.setItem("savedDrawings", JSON.stringify(savedDrawings));
  alert("Drawing updated");
}

function deleteDrawing(drawingToDelete) {
  let savedDrawings = JSON.parse(localStorage.getItem("savedDrawings")) || [];
  savedDrawings = savedDrawings.filter((d) => d.name !== drawingToDelete);

  localStorage.setItem("savedDrawings", JSON.stringify(savedDrawings));

  alert("Successfully deleted");
}

function updateDrawingDropdown() {
  const select = document.getElementById("drawing-select");
  const savedDrawings = JSON.parse(localStorage.getItem("savedDrawings")) || [];

  select.innerHTML = '<option value="">-- Select a drawing --</option>';

  savedDrawings.forEach((drawing) => {
    const option = document.createElement("option");
    option.value = drawing.name;
    option.textContent = drawing.name;
    select.appendChild(option);
  });
}

deleteButton.addEventListener("click", () => {
  const select = document.getElementById("drawing-select");
  const name = select.value;
  if (!name) {
    alert("select a drawing to delete");
    return;
  }
  if (confirm(`Are you sure you want to delete "${name}"?`)) {
    deleteDrawing(name);
    updateDrawingDropdown();
    createGrid(gridSize);
  }
});

loadButton.addEventListener("click", () => {
  const name = document.getElementById("drawing-select").value;
  if (!name) {
    alert("select a drawing to load");
    return;
  }
  loadDrawing(name);
});

saveButton.addEventListener("click", () => {
  saveDrawing();
  updateDrawingDropdown();
});
