const RGB_COLOR_PALETTE = ["#d10000", "#ff6622", "#ffda21", "#33dd00", "#1133cc", "#220066","#330044"];
const drawingBoard = document.querySelector("#drawing-board");
const rangeBar = document.querySelector("#board-size-selector");

let numOfSquares = rangeBar.value;
let pixelColor = "black";
let randomColorFlag = false;
let pixelNumber = 1;
let currentDiv = null;

// Set default board on load
for(let i=1; i<=numOfSquares*numOfSquares; i++) {
    const pixel = document.createElement("div");
    pixel.classList.add("pixel");
    pixel.setAttribute("name", pixelNumber);
    drawingBoard.appendChild(pixel);
    pixelNumber++;
}
roundCornerPixels();

// game functions
function randomColorPicker() {
    let randomIndex = Math.floor(Math.random() * (RGB_COLOR_PALETTE.length -1));
    pixelColor = RGB_COLOR_PALETTE[randomIndex];
}

function setPixelColor(pixel) {
    pixel.style.backgroundColor = pixelColor;
}

function roundCornerPixels() {
    const pixels = document.querySelectorAll(".pixel");
    const boardSize = numOfSquares*numOfSquares;

    pixels[0].style.borderRadius = "20px 0 0 0";
    pixels[numOfSquares-1].style.borderRadius = "0 20px 0 0";
    pixels[(boardSize)-numOfSquares].style.borderRadius = "0 0 0 20px";
    pixels[boardSize-1].style.borderRadius = "0 0 20px 0";
}

// function setPixelCoordinates() {
//     const pixels = document.querySelectorAll(".pixel");
//     pixels.forEach((cell) => {
//         const rect = cell.getBoundingClientRect();
//         console.log(`x=${rect.x}, y=${rect.y}`);
//     })
// }

// event handler function for changing slider
function setBoardSize(event) {
    numOfSquares = event.target.value;
    drawingBoard.innerHTML = "";
    drawingBoard.style.gridTemplateColumns = `repeat(${numOfSquares}, .5fr)`;
    drawingBoard.style.gridTemplateRows = `repeat(${numOfSquares}, .5fr)`;
    pixelNumber = 1;
    for(let i=1; i<=numOfSquares*numOfSquares; i++) {
        const pixel = document.createElement("div");
        pixel.classList.add("pixel");
        pixel.setAttribute("name", pixelNumber);
        drawingBoard.appendChild(pixel);
        pixelNumber++;
    }
    roundCornerPixels();
};

// event handler function for darkening squares
function darkenSquare(event) {
    if(event.target.classList.contains("pixel")){

        let currentOpacity = Number(window.getComputedStyle(event.target).getPropertyValue("opacity"));
        if(randomColorFlag && currentOpacity === 0) {
            randomColorPicker();
            setPixelColor(event.target);
        }
        event.target.style.opacity = currentOpacity + 0.1;}
};

//event handler function for touch movement
function handleTouch(event) {
    const touch = event.touches[0];
    const x = touch.clientX;
    const y = touch.clientY;
    const touchedElement = document.elementFromPoint(x,y);

};

//Event Listeners
document.querySelector("#board-size-selector").addEventListener("input", setBoardSize);
document.querySelector("#drawing-board").addEventListener("mouseover", darkenSquare);
document.querySelector(".black-button").addEventListener("click", () => randomColorFlag = false);
document.querySelector(".rgb-button").addEventListener("click", () => randomColorFlag = true);

// document.querySelector("#drawing-board").addEventListener("touchmove", e => {console.log(e.touches);
//     console.log(e.target.getBoundingClientRect());
//     console.log(`X: ${e.touches[0].clientX}`);
//     console.log(`Y: ${e.touches[0].clientY}`);
// });

document.querySelector("#drawing-board").addEventListener("touchmove", trackTouchMovement);
document.querySelector("#drawing-board").addEventListener("touchstart", trackTouchMovement);


function isWithinDiv(x, y, rect) {
    return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
};

function trackTouchMovement(event) {
    
    const touchX = event.touches[0].clientX;
    console.log(touchX);
    const touchY = event.touches[0].clientY;
    console.log(touchY);
    currentDiv = event.target;
    console.log(currentDiv);

    console.log((isWithinDiv(touchX, touchY, currentDiv.getBoundingClientRect())));
    if(isWithinDiv(touchX, touchY, currentDiv.getBoundingClientRect())) {
        currentDiv.style.backgroundColor = "yellow"
    }
};

