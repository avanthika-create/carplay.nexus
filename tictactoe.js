const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector(".status");
const nextBtn = document.querySelector(".next-level");
const restartBtn = document.querySelector(".restart-btn");

let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = false;

const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

initializeGame();

function initializeGame() {
    cells.forEach(cell => cell.addEventListener("click", cellClicked));

    nextBtn.addEventListener("click", nextLevel);

    restartBtn.addEventListener("click", () => {
        location.reload();
    });

    statusText.textContent = "X's turn (You)";
    nextBtn.style.display = "none";
    restartBtn.style.display = "none";

    running = true;
}

function cellClicked() {
    const cellIndex = this.getAttribute("cellIndex");

    if (options[cellIndex] !== "" || !running || currentPlayer !== "X") {
        return;
    }

    placeImage(this, "X");
    options[cellIndex] = "X";

    if (checkWinner("X")) return;

    setTimeout(computerMove, 400);
}

function placeImage(cell, player) {
    const img = document.createElement("img");
    img.src = player === "X"
        ? "assets/clip1.png"
        : "assets/clip2.png";

    img.classList.add("piece");
    cell.appendChild(img);
}

function computerMove() {
    currentPlayer = "O";

    let emptyCells = options
        .map((value, index) => value === "" ? index : null)
        .filter(v => v !== null);

    if (emptyCells.length === 0) return;

    let randomIndex =
        emptyCells[Math.floor(Math.random() * emptyCells.length)];

    options[randomIndex] = "O";
    placeImage(cells[randomIndex], "O");

    if (checkWinner("O")) return;

    currentPlayer = "X";
    statusText.textContent = "X's turn (You)";
}

function checkWinner(player) {
    for (let condition of winConditions) {
        const [a, b, c] = condition;

        if (
            options[a] === player &&
            options[b] === player &&
            options[c] === player
        ) {
            running = false;

            if (player === "X") {
                statusText.textContent = "You Win!";
                nextBtn.style.display = "block";
            } else {
                statusText.textContent = "Try Again!";
                restartBtn.style.display = "block";
            }

            return true;
        }
    }

    if (!options.includes("")) {
        statusText.textContent = "Try Again!";
        restartBtn.style.display = "block";
        running = false;
        return true;
    }

    return false;
}

function nextLevel() {
    window.location.href = "index.html";
}