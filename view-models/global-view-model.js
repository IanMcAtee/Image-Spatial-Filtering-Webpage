// SCRIPT: globalViewModel.js
// DESCRIPTION: JS Module that defines variables and method upon which 
//              the other viewmodels rely

const root = document.documentElement;

// Global Variables -----------------------------------------------------------------------------
export const btnToggledColor = getComputedStyle(root).getPropertyValue("--btnToggledColor");
export const btnUntoggledColor = getComputedStyle(root).getPropertyValue("--btnUntoggledColor");

// Global Methods --------------------------------------------------------------------------------

export function toggleVisibilityByDisplay(element, elementDefaultDisplay)
{
    if (window.getComputedStyle(element).display == elementDefaultDisplay)
    {
        element.style.display = "none";
    }
    else
    {
        element.style.display = elementDefaultDisplay;
    }
}

export function toggleVisibilityByHiddenClass(element)
{
    if (element.classList.contains("hidden"))
    {
        element.classList.remove("hidden");
    }
    else{
        element.classList.add("hidden");
    }
}

// Method to load in html from another file to a container
export async function loadHTMLToContainer(htmlFilePath, container)
{
    try 
    {
        let response = await fetch(htmlFilePath);
        if (!response.ok)
        {
            throw new Error(`HTTP Error: Status: ${response.status}`);
        }
        let htmlContent = await response.text();
        container.innerHTML = htmlContent;
        
        // Only needed to ensure that MathJax rescans DOM to render math
        if (typeof MathJax !== "undefined") 
        {
            MathJax.typesetPromise();
        }
    }
    catch (error)
    {
        console.error("Error loading: ", error);
        container.innerHTML = `<p>Error loading content: ${error.message}</p>`;
    }
}