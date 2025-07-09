// GLOBAL VARIABLES AND LOGIC -----------------------------------------------------------------
const root = document.documentElement;
const btnToggledColor = getComputedStyle(root).getPropertyValue("--btnToggledColor");
const btnUntoggledColor = getComputedStyle(root).getPropertyValue("--btnUntoggledColor");






function toggleExplainerContainerHeight()
{
    let openHeight = "40%";
    let closedHeight = "0%";

    console.log(explainerContainer.style.height);

    if (explainerContainer.style.height === openHeight)
    {
        explainerContainer.style.height = closedHeight;
    }
    else
    {
        explainerContainer.style.height = openHeight;
    }
}

function toggleElementVisibility(element)
{
    if (element.classList.contains("hidden"))
    {
        element.classList.remove("hidden");
    }
    else
    {
        element.classList.add("hidden");
    }
}


// SETTINGS CONTAINER PROPERTIES ///////////////////
let kernelSizeInput = document.getElementById("kernel-size-input");
let kernelSize = 3;
let kernelGrid = document.getElementById("kernel-grid");
kernelSizeInput.oninput = updateKernelSize;
console.log(`Original number of cells: ${kernelGrid.children.length}`);


function updateKernelSize()
{
    kernelSize = kernelSizeInput.value;
    console.log(kernelSize);
    let oldCells = kernelGrid.children;
    console.log(`Number of old cells: ${oldCells.length}`)

    // Clear old cells
    kernelGrid.innerHTML = "";

    console.log(`Number of old cells after clearing: ${oldCells.length}`)

    // Reformat grid layout
    kernelGrid.style.gridTemplateColumns = `repeat(${kernelSize}, 1fr)`;
    kernelGrid.style.gridTemplateRows = `repeat(${kernelSize}, 1fr)`;

    console.log(`Grid Template Rows: ${kernelGrid.style.gridTemplateRows}`);

    // Add new cells
    for (let i = 0; i < kernelSize*kernelSize; i++)
    {
        let newCell = document.createElement("input");
        newCell.type = "number";
        newCell.classList.add("kernel-cell");
        kernelGrid.appendChild(newCell);
    }
}




//const explainerContainer = document.getElementById("explainer-container");
//explainerContainer.style.height = "40%";
//const explainerVisibilityBtn = document.getElementById("explainer-visibility-btn");
//explainerVisibilityBtn.addEventListener("click", toggleExplainerContainerHeight)