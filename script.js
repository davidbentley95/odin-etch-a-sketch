const drawingBoard = document.querySelector("#drawing-board");

function setBoardSize(event) {
    let numOfSquares = event.target.value;
    drawingBoard.innerHTML = "";
    drawingBoard.style.gridTemplateColumns = `repeat(${numOfSquares}, 1fr)`;
    drawingBoard.style.gridTemplateRows = `repeat(${numOfSquares}, 1fr)`;
    for(let i=1; i<=numOfSquares*numOfSquares; i++) {
        drawingBoard.innerHTML += `<div class="pixel"></div>`;  
    }
}

document.querySelector("#board-size-selector").addEventListener("input", setBoardSize);

document.querySelector("#drawing-board").addEventListener("mouseover", (e) => e.target.style.backgroundColor = "black");