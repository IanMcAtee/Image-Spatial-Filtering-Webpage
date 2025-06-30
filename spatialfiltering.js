// Script: spatialfiltering.js
// Author: Ian McAtee
// Description: TBD 


// KERNEL DEFINITIONS
const boxLowPass3 = [[0.11111, 0.11111, 0.11111],
                     [0.11111, 0.11111, 0.11111],
                     [0.11111, 0.11111, 0.11111]];

// Get the main image canvas and its context from the DOM
const canvas = document.getElementById("MainImageCanvas");
const ctx = canvas.getContext("2d");

// Register button onClick event
document.getElementById("DisplayImageBtn").addEventListener("click", DisplayImage_OnClick);
document.getElementById("ApplyPaddingBtn").addEventListener("click", ApplyPadding_OnClick);
document.getElementById("SpatialFilterBtn").addEventListener("click", SpatialFilter_OnClick);

// Draw image to canvas
var img = new Image();

function DisplayImageOnCanvas(imgSrc)
{
  // Debug Info //
  console.log("-------------------------------------------------------")
  console.log(`DisplayImageOnCavas called with imgSrc = ${imgSrc}`);

  img.src = imgSrc;
  img.onload = () =>
  {
    console.log("Image loaded");
    console.log(`Image Width: ${img.width}`);
    console.log(`Image Height: ${img.width}`);
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);
    imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    pixelsFlatArr = imgData.data;
    console.log(pixelsFlatArr);
  }

}

function RedrawCanvasImage(imgArr)
{
  // Debug Info //
  console.log("-------------------------------------------------------")
  console.log("RedrawCanvasImage called");
  console.log(`Image Width: ${imgArr[0].length}`);
    console.log(`Image Height: ${imgArr.length}`);

  canvas.width = imgArr[0].length;
  canvas.height = imgArr.length;
  let flattenedUint8Arr = FlattenImgArrUint8(imgArr, 4);
  console.log(flattenedUint8Arr);
  let imgData = new ImageData(flattenedUint8Arr, imgArr[0].length, imgArr.length);
  ctx.putImageData(imgData, 0, 0);
}

function DisplayImage_OnClick(event)
{
  console.log("Display Image Button Clicked");
  const button = event.target;
  console.log(button.dataset.imgPath);

  DisplayImageOnCanvas(button.dataset.imgPath);
}

function ApplyPadding_OnClick(event)
{
  console.log("Apply Padding Button Clicked");
  const button = event.target;
  console.log(button.dataset.paddingType);
  imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  pixelsFlatArr = imgData.data;
  let imgArr = ConvertImgDataToArray(pixelsFlatArr, img.width, img.height);
  console.log(imgArr);
  let padArr = ZeroPad(imgArr, 1, 4);
  console.log(padArr);
  RedrawCanvasImage(padArr);
}

function SpatialFilter_OnClick()
{
  console.log("-----------------------------------------------------");
  console.log("Spatial Filter Button Clicked");
  imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  pixelsFlatArr = imgData.data;
  let imgArr = ConvertImgDataToArray(pixelsFlatArr, img.width, img.height);
  let padArr = ZeroPad(imgArr, 1, 4);
  let filteredImgArr = SpatialFilter(padArr, boxLowPass3);
  RedrawCanvasImage(filteredImgArr);
}

// SPATIAL FILTERING FUNCTIONS ///////////////////////////////////////////


function Convolve(arr1, arr2)
{
  let sum = 0;
  for (let i = 0; i < arr1.length; i++)
  {
    for (let j = 0; j < arr1[0].length; j++)
    {
      sum += arr1[i][j] * arr2[i][j];
    }
  }
  return sum;
}

function ZeroPad(arr, padWidth, depth)
{
  let outputArr = Create3DArray(arr.length + 2*padWidth, arr[0].length + 2*padWidth, 4);
  for (let i = 0; i < arr.length; i++)
  {
    for (let j = 0; j < arr[0].length; j++)
    {
      for (let k = 0; k < depth; k++)
      {
        outputArr[i+padWidth][j+padWidth][k] = arr[i][j][k];
      }
    }
  }

  return outputArr;

}

function SpatialFilter(padImgArr, kernel)
{
  let padWidth = Math.floor(kernel.length/2);
  console.log(`Pad Width: ${padWidth}`);
  let outputArr = Create3DArray(padImgArr.length - 2*padWidth, padImgArr[0].length - 2*padWidth, 4);

  for (let i = 0; i < outputArr.length; i++)
  {
    for (let j = 0; j < outputArr[0].length; j++)
    {
      for (let k = 0; k < 3; k++)
      {
        let nhood = GetArrayNeighborHood(padImgArr, i+padWidth, j+padWidth, k, kernel.length);
        if (i == 0 && j == 0 && k == 0)
        {
          console.log(nhood);
        }
        outputArr[i][j][k] = Convolve(nhood, kernel);
      }
    }
  }

  return outputArr;
}

function GetArrayNeighborHood(arr, rowInd, colInd, depthInd, nhoodSize)
{
  let nHoodArr = [];
  let lateralOffset = Math.floor(nhoodSize/2);

  for (let i = rowInd-lateralOffset; i <= rowInd+lateralOffset; i++)
  {
    let currentRow = [];
    for (let j = colInd-lateralOffset; j <= colInd+lateralOffset; j++)
    {
      currentRow.push(arr[i][j][depthInd]);
    }
    nHoodArr.push(currentRow);
  }
  return nHoodArr;
}


// HELPER FUNCTIONS ///////////////////////////////////////////

function ConvertImgDataToArray(imgData, width, height)
{
  let imgArr = Create3DArray(width, height, 4);

  for (let i = 0; i < imgData.length; i += 4)
  {
    
    // Calculate array indices
    let rgbaBlockInd = Math.floor(i/4);
    let rowInd = Math.floor(rgbaBlockInd/width);
    let colInd = rgbaBlockInd % width;

    // Assign image array values
    imgArr[rowInd][colInd][0] = imgData[i];
    imgArr[rowInd][colInd][1] = imgData[i+1];
    imgArr[rowInd][colInd][2] = imgData[i+2];
    imgArr[rowInd][colInd][3] = imgData[i+3];
  }

  return imgArr;
}

function FlattenImgArrUint8(imgArr, depth=4)
{
  let flattenedUint8Arr = new Uint8ClampedArray(imgArr.length * imgArr[0].length * depth);
  let iterCount = 0;
  for (let i = 0; i < imgArr.length; i++)
  {
    for (let j = 0; j < imgArr[0].length; j++)
    {
      for (let k = 0; k < depth; k++)
      {
        flattenedUint8Arr[iterCount] = imgArr[i][j][k];
        iterCount += 1;
      }
    }
  }
  return flattenedUint8Arr;
}

function Create3DArray(dim0, dim1, dim2, initialDimValues = [0, 0, 0, 255]) 
{
  let arr = []; 
  for (let i = 0; i < dim0; i++) 
  {
    arr[i] = []; 
    for (let j = 0; j < dim1; j++) 
    {
      arr[i][j] = [];
      for (let k = 0; k < dim2; k++) 
      {
        arr[i][j][k] = initialDimValues[k]; 
      }
    }
  }
  return arr;
}

function Create2DArray(dim0, dim1, initialValue = 0)
{
  let arr = [];
  for (let i = 0; i < dim0; i++)
  {
    arr[i] = [];
    for (let j = 0; j < dim1; j++)
    {
      arr[i][j] = initialValue;
    }
  }
  return arr;
}





