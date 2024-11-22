const RGB_COLOR_PALETTE = ["#d10000", "#ff6622", "#ffda21", "#33dd00", "#1133cc", "#220066","#330044"];
const drawingBoard = document.querySelector("#drawing-board");
const rangeBar = document.querySelector("#board-size-selector");

let numOfSquares = rangeBar.value;
let pixelColor = "black";
let randomColorFlag = false;
let pixelNumber = 1;
let currentDiv = null;
let focusedButton = document.querySelector(".black-button");

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

function resetBoard() {
    document.querySelectorAll(".pixel").forEach((pixel) => {
        pixel.style.opacity = 0;
    });
}

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
        if(!randomColorFlag && currentOpacity === 0) {
            event.target.style.backgroundColor = "black";
        }
        event.target.style.opacity = currentOpacity + 0.1;}
};

// event handler function to for mobile
function trackTouchMovement(event) {
    
    event.preventDefault();

    const touchX = event.touches[0].clientX;
    const touchY = event.touches[0].clientY;

    // Get the element currently under the touch point
    const newDiv = document.elementFromPoint(touchX, touchY);

    // Check if the newDiv is different from the currentDiv
    if (newDiv !== currentDiv && newDiv.tagName === "DIV") {
        // Update the currentDiv and get opacity and color
        currentDiv = newDiv;
        let currentOpacity = Number(window.getComputedStyle(currentDiv).
        getPropertyValue("opacity"));
        if(randomColorFlag && currentOpacity === 0) {
            randomColorPicker();
            setPixelColor(currentDiv);
        }if(!randomColorFlag && currentOpacity === 0) {
            currentDiv.style.backgroundColor = "black";
        }
        currentDiv.style.opacity = currentOpacity + 0.1;
    }
};

//Event Listeners
document.querySelector("#board-size-selector").addEventListener("input", (event) => 
    {
        setBoardSize(event);
        event.preventDefault();
        focusedButton.focus();
    });
document.querySelector("#drawing-board").addEventListener("mouseover", darkenSquare);
document.querySelector(".black-button").addEventListener("click", () => randomColorFlag = false)
document.querySelector(".rgb-button").addEventListener("click", () => randomColorFlag = true);
document.querySelector("#drawing-board").addEventListener("touchmove", trackTouchMovement);
document.querySelector("#drawing-board").addEventListener("touchstart", trackTouchMovement);
document.querySelector(".black-button").addEventListener("mousedown", () => {
    focusedButton = document.querySelector(".black-button");
    focusedButton.focus()
});
document.querySelector(".reset").addEventListener("mousedown", (event) => {
    event.preventDefault();
    focusedButton.focus();
});

document.querySelector(".rgb-button").addEventListener("mousedown", () => {
    focusedButton = document.querySelector(".rgb-button"); 
    focusedButton.focus();
});



