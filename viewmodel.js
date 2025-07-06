
// NAVIGATION PANE LOGIC ///////////////////////////////////////////////////
// Get reference to settings container
const settingsContainer = document.getElementById("settings-container");
// Get references to all settings panels html
const customSettingsHTML = document.getElementById("custom-settings").innerHTML;
const boxFilterSettingsHTML = document.getElementById("box-filter-settings").innerHTML;
const gaussianSettingsHTML = document.getElementById("gaussian-settings").innerHTML;
// Get references to navigation buttons
const settingsNavBtns = document.getElementsByClassName("settings-nav-btn");
const headerNavBtns = document.getElementsByClassName("header-nav-btn");

let curSelectedSettingsNavBtn = settingsNavBtns[0];
curSelectedSettingsNavBtn.style.backgroundColor = "cyan";


Array.from(settingsNavBtns).forEach(btn => {
    btn.addEventListener("click", navigateToSettingsPanel);
});

Array.from(headerNavBtns).forEach(btn => {
    btn.addEventListener("click", toggleSubmenu)
});

//const explainerContainer = document.getElementById("explainer-container");
//explainerContainer.style.height = "40%";
//const explainerVisibilityBtn = document.getElementById("explainer-visibility-btn");
//explainerVisibilityBtn.addEventListener("click", toggleExplainerContainerHeight)

function navigateToSettingsPanel(event)
{
    let btn = event.target;
    let navTarget = btn.dataset.navTarget

    if (btn != curSelectedSettingsNavBtn)
    {
        curSelectedSettingsNavBtn.style.backgroundColor = "white";
        curSelectedSettingsNavBtn = btn;
        curSelectedSettingsNavBtn.style.backgroundColor = "cyan";
    }

    // Debug
    console.log(`NavigateToSettingsPane called with navTarget = ${navTarget}`);

    switch (navTarget)
    {
        case "custom":
            console.log("In Custom");
            settingsContainer.innerHTML = customSettingsHTML;
            break;
        case "box-filter":
            console.log("In box-filter");
            settingsContainer.innerHTML = boxFilterSettingsHTML;
            break;
        case "gaussian":
            console.log("In gaussian");
            settingsContainer.innerHTML = gaussianSettingsHTML;
    }   
}

function toggleSubmenu(event)
{
    btn = event.target;
    let submenu = btn.parentNode.querySelector(".nav-submenu-container");
    console.log(submenu);
    if (submenu != null)
    {
        toggleElementVisibility(submenu);
    }
}

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