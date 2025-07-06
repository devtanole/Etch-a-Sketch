const grid = document.querySelector(".grid-container");

for (let i = 0; i < 16; i++) {
  for (let j = 0; j < 16; j++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    grid.appendChild(cell);
  }
}

document.querySelector(".color-picker").onchange = (e) => {
  console.log(e.target.value);
};
