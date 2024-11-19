const RGB_COLOR_PALETTE = ["#d10000", "#ff6622", "#ffda21", "#33dd00", "#1133cc", "#220066","#330044"];
const drawingBoard = document.querySelector("#drawing-board");
const rangeBar = document.querySelector("#board-size-selector");

let numOfSquares = rangeBar.value;
let pixelColor = "black";
let randomColorFlag = false;

// Set default board on load

for(let i=1; i<=numOfSquares*numOfSquares; i++) {
    const pixel = document.createElement("div");
    pixel.classList.add("pixel");
    drawingBoard.appendChild(pixel);
}

function randomColorPicker() {
    let randomIndex = Math.floor(Math.random() * (RGB_COLOR_PALETTE.length -1));
    pixelColor = RGB_COLOR_PALETTE[randomIndex];
}

function setPixelColor(pixel) {
    pixel.style.backgroundColor = pixelColor;
}

// event handle function for changing slider
function setBoardSize(event) {
    numOfSquares = event.target.value;
    drawingBoard.innerHTML = "";
    drawingBoard.style.gridTemplateColumns = `repeat(${numOfSquares}, .5fr)`;
    drawingBoard.style.gridTemplateRows = `repeat(${numOfSquares}, .5fr)`;

    for(let i=1; i<=numOfSquares*numOfSquares; i++) {
        const pixel = document.createElement("div");
        pixel.classList.add("pixel");
        drawingBoard.appendChild(pixel);
    }
};

// event handle function for darkening squares
function darkenSquare(event) {
    if(event.target.classList.contains("pixel")){

        let currentOpacity = Number(window.getComputedStyle(event.target).getPropertyValue("opacity"));
        if(randomColorFlag && currentOpacity === 0) {
            randomColorPicker();
            setPixelColor(event.target);
        }
        event.target.style.opacity = currentOpacity + 0.1;}
};

//Event Listeners
document.querySelector("#board-size-selector").addEventListener("input", setBoardSize);
document.querySelector("#drawing-board").addEventListener("mouseover", darkenSquare);
document.querySelector(".black-button").addEventListener("click", () => randomColorFlag = false);
document.querySelector(".rgb-button").addEventListener("click", () => randomColorFlag = true);

