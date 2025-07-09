// SCRIPT: explainer-panel-view-model.js
// DESCRIPTION: Controls UI interactions for the explainer panel

// Import the global viewmodel
import * as globalViewModel from "./global-view-model.js";

const explainerContainer = document.getElementById("explainer-container");
const explainerVisibilityBtn = document.getElementById("explainer-visibility-btn");
const explainerUpIcon = document.getElementById("explainer-up-icon");
const explainerDownIcon = document.getElementById("explainer-down-icon");

explainerVisibilityBtn.addEventListener("click", () => {
    globalViewModel.toggleVisibilityByDisplay(explainerContainer, "flex");
    globalViewModel.toggleVisibilityByDisplay(explainerUpIcon, "inline");
    globalViewModel.toggleVisibilityByDisplay(explainerDownIcon, "inline");
});

