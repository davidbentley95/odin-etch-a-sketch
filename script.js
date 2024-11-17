const drawingBoard = document.querySelector("#drawing-board");

function setBoardSize(event) {
    let numOfSquares = event.target.value;
    drawingBoard.innerHTML = "";
    drawingBoard.style.display = "grid";
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

