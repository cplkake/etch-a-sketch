var gridLength = 16;
const sketchContainer = document.getElementById("sketch-container");

function renderGrid(length) {
    let totalGrids = length * length; 

    sketchContainer.style.setProperty('--length', length);
    for (i = 0; i < totalGrids; i++) {
        let cell = document.createElement("div");
        cell.className = "grid-item";
        sketchContainer.appendChild(cell);
    }
}

function resetGrid() {
    while (sketchContainer.hasChildNodes()) {
        sketchContainer.removeChild(sketchContainer.lastChild);
    }
}

function addSketchingFunction(colourSelection) {
    const gridItems = document.querySelectorAll(".grid-item");

    gridItems.forEach((gridItem) => {
        gridItem.addEventListener('mouseover', () => {
            gridItem.setAttribute('style', `background-color: ${colourSelection}`);
        });
    });
}

function addColourPicker() {
    colourSelection = document.querySelector("#colourSelection");
    colourSelection.addEventListener("change", (e) => {
        addSketchingFunction(e.target.value);
        console.log(e.target.value);
    });
}

function changeToBlack() {
    addSketchingFunction("black");
}

function clearSketch() {
    const gridItems = document.querySelectorAll(".grid-item");

    gridItems.forEach((gridItem) => {
        gridItem.setAttribute('style', "background-color: '';");
    })
}

function increaseResolution() {
    if (gridLength + 1 > 64) {
        return;
    }
    resetGrid();

    gridLength += 1;

    renderGrid(gridLength);
    addSketchingFunction("black");
    updateResolutionDisplay();
}

function decreaseResolution() {
    if (gridLength - 1 < 1) {
        return;
    }
    resetGrid();

    gridLength -= 1;

    renderGrid(gridLength);
    addSketchingFunction("black");
    updateResolutionDisplay();
}

function updateResolutionDisplay() {
    document.getElementById("resolution-display-value").innerHTML = `${gridLength} x ${gridLength}`;
}

function startup() {
    renderGrid(gridLength);
    addSketchingFunction("black");
    addColourPicker();
    updateResolutionDisplay();
}

window.addEventListener("load", startup, false);