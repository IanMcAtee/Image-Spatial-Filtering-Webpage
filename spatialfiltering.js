// Script: spatialfiltering.js
// Author: Ian McAtee
// Description: TBD 

// Get the main image canvas and its context from the DOM
//const canvas = document.getElementById("MainImageCanvas");
//const ctx = canvas.getContext("2d");

// Draw image to canvas
const img = new Image();
img.src = "./peppers.png";
console.log(img.width);


// canvas.width = img.width;
// canvas.height = img.height;
// ctx.drawImage(img, 0, 0);

// // Access pixel data
// const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
// const pixels = imgData.data;

// // Each pixel is represented by 4 values: [R, G, B, A]
//   console.log(`Red value of first pixel: ${pixels[0]}`); // Red
//   console.log(`Green value of first pixel: ${pixels[1]}`); // Green
//   console.log(`Blue value of first pixel: ${pixels[2]}`); // Blue
//   console.log(`Alpha value of first pixel: ${pixels[3]}`); // Alpha
