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

// Draw image to canvas
var img = new Image();

function DisplayImageOnCanvas(imgSrc)
{
  img.src = imgSrc;
  img.onload = () =>
  {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);
  }

}

function RedrawCanvasImage(imgArr)
{
  canvas.width = imgArr[0].length;
  canvas.height = imgArr.length;
  let flattenedUint8Arr = FlattenImgArrUint8(imgArr, 4);
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
  imgArr = ZeroPad(imgArr, 100);
  RedrawCanvasImage(imgArr);
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

function ZeroPad(arr, padWidth)
{
  outputArr = Create2DArray(arr.length + padWidth, arr[0].length + padWidth, 0);
  for (let i = 0; i < arr.length; i++)
  {
    for (let j = 0; j < arr[0].length; j++)
    {
      outputArr[i+padWidth][j+padWidth] = arr[i][j];
    }
  }

  return outputArr;

}

function SpatialFilterGrayscale(img, kernel)
{
  
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
  flattenedUint8Arr = new Uint8ClampedArray(imgArr.length * imgArr[0].length * depth);

  for (let i = 0; i < imgArr.length; i++)
  {
    for (let j = 0; j < imgArr[0].length; j++)
    {
      for (let k = 0; k < depth; k++)
      {
        flattenedUint8Arr[i+j+k] = imgArr[i][j][k];
      }
    }
  }
  return flattenedUint8Arr;
}

function Create3DArray(dim0, dim1, dim2, initialValue = 0) 
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
        arr[i][j][k] = initialValue; 
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





