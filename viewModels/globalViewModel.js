// SCRIPT: globalViewModel.js
// DESCRIPTION: JS Module that defines variables and method upon which 
//              the other viewmodels rely

const root = document.documentElement;

// Global Variables -----------------------------------------------------------------------------
export const btnToggledColor = getComputedStyle(root).getPropertyValue("--btnToggledColor");
export const btnUntoggledColor = getComputedStyle(root).getPropertyValue("--btnUntoggledColor");

// Global Methods --------------------------------------------------------------------------------

// Method to toggle the visibility of html element by adding/removing the hidden class
export function toggleElementVisibility(element)
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