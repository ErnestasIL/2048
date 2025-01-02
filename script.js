const gridContainer = document.querySelector(".grid");
const scoreDisplay = document.querySelector(".score");
const restartButton = document.querySelector(".restart");
let score = 0;
let grid = [];

function createGrid() {
  gridContainer.innerHTML = "";
  grid = [];
  for (let i = 0; i < 4; i++) {
    grid[i] = [];
    for (let j = 0; j < 4; j++) {
      const tile = document.createElement("div");
      tile.classList.add("tile");
      grid[i][j] = 0;
      gridContainer.appendChild(tile);
    }
  }
  score = 0;
}

createGrid();
