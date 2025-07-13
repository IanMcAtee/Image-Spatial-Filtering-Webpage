// Import the global viewmodel
import * as spatialFilter from "./spatial-filter-new.js";

function printArray (arr)
{

}
const testArr = [[ 1, 2, 3, 4, 5],
                 [ 6, 7, 8, 9,10],
                 [11,12,13,14,15],
                 [16,17,18,19,20],
                 [21,22,23,24,25]];

console.log(testArr);

let maxOutput = spatialFilter.MaxFilter.filter(testArr, 3, spatialFilter.PadType.ZERO);
let minOutput = spatialFilter.MinFilter.filter(testArr, 3, spatialFilter.PadType.ZERO);

console.log(maxOutput);
console.log(minOutput);