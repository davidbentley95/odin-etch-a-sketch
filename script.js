const drawingBoard = document.querySelector("#drawing-board");
const rangeBar = document.querySelector("#board-size-selector");
let numOfSquares = rangeBar.value;

// Set default board on load

for(let i=1; i<=numOfSquares*numOfSquares; i++) {
    const pixel = document.createElement("div");
    pixel.classList.add("pixel");
    drawingBoard.appendChild(pixel);
}

// event handle function for changing slider
function setBoardSize(event) {
    numOfSquares = event.target.value;
    drawingBoard.innerHTML = "";
    drawingBoard.style.gridTemplateColumns = `repeat(${numOfSquares}, 1fr)`;
    drawingBoard.style.gridTemplateRows = `repeat(${numOfSquares}, 1fr)`;

    for(let i=1; i<=numOfSquares*numOfSquares; i++) {
        const pixel = document.createElement("div");
        pixel.classList.add("pixel");
        drawingBoard.appendChild(pixel);
    }
}

document.querySelector("#board-size-selector").addEventListener("input", setBoardSize);

document.querySelector("#drawing-board").addEventListener("mouseover", (e) => {
    let currentOpacity = Number(window.getComputedStyle(e.target).getPropertyValue("opacity"));
    e.target.style.opacity = currentOpacity + 0.1;
});

