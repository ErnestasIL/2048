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
  addTile();
  addTile();
  updateGrid();
}
function addTile() {
  let emptyTiles = [];
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (grid[i][j] === 0) {
        emptyTiles.push({ x: i, y: j });
      }
    }
  }
  if (emptyTiles.length > 0) {
    const { x, y } = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
    grid[x][y] = Math.random() < 0.9 ? 2 : 4;
  }
}

function updateGrid() {
  const tiles = document.querySelectorAll(".tile");
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      const value = grid[i][j];
      const tile = tiles[i * 4 + j];
      tile.textContent = value === 0 ? "" : value;
      tile.style.background = getColor(value);
    }
  }
  scoreDisplay.textContent = score;
}
function getColor(value) {
  const colors = {
    0: "#cdc1b4",
    2: "#eee4da",
    4: "#ede0c8",
    8: "#f2b179",
    16: "#f59563",
    32: "#f67c5f",
    64: "#f65e3b",
    128: "#edcf72",
    256: "#edcc61",
    512: "#edc850",
    1024: "#edc53f",
    2048: "#edc22e",
  };
  return colors[value] || "#3c3a32";
}
createGrid();
