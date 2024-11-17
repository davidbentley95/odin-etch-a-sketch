const drawingBoard = document.querySelector("#drawing-board");
const rangeBar = document.querySelector("#board-size-selector");

let numOfSquares = rangeBar.value;
let lastExecution = 0;
let lastPosition = {x: -1, y: -1};


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
};

// event handle function for darkening squares
function darkenSquare(event) {

    let x = event.clientX;
    console.log(x);
    let y = event.clientY;
    console.log(y);

    let currentOpacity = Number(window.getComputedStyle(event.target).getPropertyValue("opacity"));
    event.target.style.opacity = currentOpacity + 0.1;
};

document.querySelector("#board-size-selector").addEventListener("input", setBoardSize);

document.querySelector("#drawing-board").addEventListener("mousemove", darkenSquare);

