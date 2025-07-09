// SCRIPT: navigationPanelViewModel.js
// DESCRIPTION: Controls UI interactions for the navigation panel

// Import the global viewmodel
import * as globalViewModel from "./globalViewModel.js";

// Get references to all necessary UI elements
const settingsContainer = document.getElementById("settings-container"); 
const customSettingsHTML = document.getElementById("custom-settings").innerHTML; 
const boxFilterSettingsHTML = document.getElementById("box-filter-settings").innerHTML;
const gaussianSettingsHTML = document.getElementById("gaussian-settings").innerHTML;
const settingsNavBtns = document.getElementsByClassName("settings-nav-btn");
const headerNavBtns = document.getElementsByClassName("header-nav-btn");

// Set the default currently selected nav button to be the custom filter
let curSelectedSettingsNavBtn = settingsNavBtns[0];
curSelectedSettingsNavBtn.style.backgroundColor = globalViewModel.btnToggledColor;

// Assign the click event of the nav buttons
Array.from(settingsNavBtns).forEach(btn => {
    btn.addEventListener("click", navigateToSettingsPanel);
});

// Assign the click event of the header buttons
Array.from(headerNavBtns).forEach(btn => {
    btn.addEventListener("click", toggleSubmenu)
});


// Function to load set the inner html of the settings container based on settings nav btn click
function navigateToSettingsPanel(event)
{
    // Get the button and the nav-target data
    let btn = event.target;
    let navTarget = btn.dataset.navTarget

    // Set the syling of prev btn to unclicked and this btn to clicked
    if (btn != curSelectedSettingsNavBtn)
    {
        curSelectedSettingsNavBtn.style.backgroundColor = globalViewModel.btnUntoggledColor;
        curSelectedSettingsNavBtn = btn;
        curSelectedSettingsNavBtn.style.backgroundColor = globalViewModel.btnToggledColor;
    }

    // Debug
    console.log(`NavigateToSettingsPane called with navTarget = ${navTarget}`);

    // Set the inner html of the settings container to that of the nav target
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

// Function to toggle the submenu navigation lists on header nav btn click
function toggleSubmenu(event)
{
    let btn = event.target;
    let submenu = btn.parentNode.querySelector(".nav-submenu-container");
    console.log(submenu);
    if (submenu != null)
    {
        globalViewModel.toggleElementVisibility(submenu);
    }
}