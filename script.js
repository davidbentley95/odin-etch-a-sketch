const PASTEL_COLOR_PALETTE = ["#223030", "#523D35", "#959D90", "#BBA58F", "#E8D9CD", "#EFEFE9"];
const drawingBoard = document.querySelector("#drawing-board");
const rangeBar = document.querySelector("#board-size-selector");

let numOfSquares = rangeBar.value;
let pixelColor = "black";
let randomColorFlag = false;

let lastExecution = 0;
let lastPosition = {x: 0, y: 0};
let currentPosition = {x: 0, y: 0};
let lastTime = 0;


// Set default board on load

for(let i=1; i<=numOfSquares*numOfSquares; i++) {
    const pixel = document.createElement("div");
    pixel.classList.add("pixel");
    drawingBoard.appendChild(pixel);
}

function randomColorPicker() {
    let randomIndex = Math.floor(Math.random() * (PASTEL_COLOR_PALETTE.length -1));
    pixelColor = PASTEL_COLOR_PALETTE[randomIndex];
}

function setPixelColor(pixel) {
    pixel.style.backgroundColor = pixelColor;
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

    console.log(`Original Last position ${Object.values(lastPosition)}`);
    console.log(`Original Current position ${Object.values(currentPosition)}`);

    let x = event.clientX;
    let y = event.clientY;

    currentPosition = {x, y};
    console.log(`Updated current position ${Object.values(currentPosition)}`);
    let currentOpacity = Number(window.getComputedStyle(event.target).getPropertyValue("opacity"));
    if(randomColorFlag && currentOpacity === 0) {
        randomColorPicker();
        setPixelColor(event.target);
    }
    event.target.style.opacity = currentOpacity + 0.1;
    lastPosition= {x, y};
    console.log(`Updated Last position ${Object.values(lastPosition)}`);
};

document.querySelector("#board-size-selector").addEventListener("input", setBoardSize);

document.querySelector("#drawing-board").addEventListener("mouseover", darkenSquare);

document.querySelector(".black-button").addEventListener("click", () => randomColorFlag = false);

document.querySelector(".earthy-button").addEventListener("click", () => randomColorFlag = true);
