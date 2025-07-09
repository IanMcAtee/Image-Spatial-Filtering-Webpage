// SCRIPT: nav-panel-view-model.js
// DESCRIPTION: Controls UI interactions for the navigation panel

// Import the global viewmodel
import * as globalViewModel from "./global-view-model.js";

// Get references to all necessary UI elements
const filterSpecificSettingsContainer = document.getElementById("filter-specific-settings-container");
const explainerContainer = document.getElementById("explainer-container"); 
const settingsNavBtns = document.getElementsByClassName("settings-nav-btn");
const headerNavBtns = document.getElementsByClassName("header-nav-btn");
const defaultSettingsNavBtn = document.getElementById("default-settings-nav-btn");


// Assign the click event of the nav buttons
Array.from(settingsNavBtns).forEach(btn => {
    btn.addEventListener("click", displaySettingsAndExplainer);
});

// Assign the click event of the header buttons
Array.from(headerNavBtns).forEach(btn => {
    btn.addEventListener("click", toggleSubmenu)
});

// Initialize content 
let curSelectedSettingsNavBtn = defaultSettingsNavBtn;
defaultSettingsNavBtn.style.backgroundColor = globalViewModel.btnToggledColor;
globalViewModel.loadHTMLToContainer(defaultSettingsNavBtn.dataset.settingsHtmlPath, filterSpecificSettingsContainer);
globalViewModel.loadHTMLToContainer(defaultSettingsNavBtn.dataset.explainerHtmlPath, explainerContainer);


// Function to load set the inner html of the settings container based on settings nav btn click
function displaySettingsAndExplainer(event)
{
    // Get the button and the nav-target data
    let btn = event.target;
    let settingsHTMLPath = btn.dataset.settingsHtmlPath;
    let explainerHTMLPath = btn.dataset.explainerHtmlPath;

    // Set the syling of prev btn to unclicked and this btn to clicked
    if (btn != curSelectedSettingsNavBtn)
    {
        curSelectedSettingsNavBtn.style.backgroundColor = globalViewModel.btnUntoggledColor;
        curSelectedSettingsNavBtn = btn;
        curSelectedSettingsNavBtn.style.backgroundColor = globalViewModel.btnToggledColor;

        globalViewModel.loadHTMLToContainer(settingsHTMLPath, filterSpecificSettingsContainer);
        globalViewModel.loadHTMLToContainer(explainerHTMLPath, explainerContainer);
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
        globalViewModel.toggleVisibilityByHiddenClass(submenu);
    }
}