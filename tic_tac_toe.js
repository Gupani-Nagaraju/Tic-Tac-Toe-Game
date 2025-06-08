let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;

const winPatterns = [
  [0,1,2], [3,4,5], [6,7,8], // Rows
  [0,3,6], [1,4,7], [2,5,8], // Columns
  [0,4,8], [2,4,6]           // Diagonals
];

const boardElement = document.getElementById("board");
const statusElement = document.getElementById("status");

function renderBoard() {
  boardElement.innerHTML = "";
  board.forEach((cell, index) => {
    const cellElement = document.createElement("div");
    cellElement.classList.add("cell");
    cellElement.innerText = cell;
    cellElement.addEventListener("click", () => handleClick(index));
    boardElement.appendChild(cellElement);
  });
}

function handleClick(index) {
  if (board[index] !== "" || !gameActive) return;

  board[index] = currentPlayer;
  renderBoard();
  if (checkWinner()) {
    statusElement.innerText = `Player ${currentPlayer} wins!`;
    gameActive = false;
    return;
  }

  if (!board.includes("")) {
    statusElement.innerText = "It's a draw!";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusElement.innerText = `Player ${currentPlayer}'s turn`;
}

function checkWinner() {
  return winPatterns.some(pattern => {
    const [a, b, c] = pattern;
    return board[a] && board[a] === board[b] && board[b] === board[c];
  });
}

function restartGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameActive = true;
  statusElement.innerText = `Player ${currentPlayer}'s turn`;
  renderBoard();
}

renderBoard();
statusElement.innerText = `Player ${currentPlayer}'s turn`;
