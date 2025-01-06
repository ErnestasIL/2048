const gridContainer = document.querySelector(".grid");
const scoreDisplay = document.querySelector(".score");
const restartButton = document.querySelector(".restart");
let score = 0;
let grid = [];
let highScore = localStorage.getItem("highScore")
  ? parseInt(localStorage.getItem("highScore"))
  : 0;
document.querySelector(".highscore");
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

  if (isGameOver()) {
    alert("Game Over!");
  }
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

function moveUp() {
  let moved = false;
  for (let j = 0; j < 4; j++) {
    let column = [grid[0][j], grid[1][j], grid[2][j], grid[3][j]];
    column = merge(column);
    for (let i = 0; i < 4; i++) {
      if (grid[i][j] !== column[i]) moved = true;
      grid[i][j] = column[i];
    }
  }
  return moved;
}
function moveDown() {
  let moved = false;
  for (let j = 0; j < 4; j++) {
    let column = [grid[3][j], grid[2][j], grid[1][j], grid[0][j]];
    column = merge(column);
    for (let i = 0; i < 4; i++) {
      if (grid[i][j] !== column[i]) moved = true;
      grid[3 - i][j] = column[i];
    }
  }
  return moved;
}
function moveLeft() {
  let moved = false;
  for (let i = 0; i < 4; i++) {
    let row = grid[i];
    row = merge(row);
    if (JSON.stringify(grid[i]) !== JSON.stringify(row)) moved = true;
    grid[i] = row;
  }
  return moved;
}
function moveRight() {
  let moved = false;
  for (let i = 0; i < 4; i++) {
    let row = grid[i].slice().reverse();
    row = merge(row);
    row = row.reverse();
    if (JSON.stringify(grid[i]) !== JSON.stringify(row)) moved = true;
    grid[i] = row;
  }
  return moved;
}

function merge(line) {
  let newLine = line.filter((value) => value !== 0);
  for (let i = 0; i < newLine.length - 1; i++) {
    if (newLine[i] === newLine[i + 1]) {
      newLine[i] *= 2;
      score += newLine[i];
      newLine[i + 1] = 0;
    }
  }
  newLine = newLine.filter((value) => value !== 0);
  while (newLine.length < 4) {
    newLine.push(0);
  }
  return newLine;
}

document.addEventListener("keydown", (e) => {
  let moved = false;
  switch (e.key) {
    case "ArrowUp":
      moved = moveUp();
      break;
    case "ArrowDown":
      moved = moveDown();
      break;
    case "ArrowLeft":
      moved = moveLeft();
      break;
    case "ArrowRight":
      moved = moveRight();
      break;
    default:
      break;
  }
  if (moved) {
    addTile();
    updateGrid();
  }
});
function isGameOver() {
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (grid[i][j] === 0) return false;
      if (i < 3 && grid[i][j] === grid[i + 1][j]) return false;
      if (j < 3 && grid[i][j] === grid[i][j + 1]) return false;
    }
  }
  return true;
}

restartButton.addEventListener("click", () => {
  if (score > highScore) {
    highScore = score;
    localStorage.setItem("highScore", highScore);
  }
  document.querySelector(".highscore").textContent = highScore;
  createGrid();
});
createGrid();
