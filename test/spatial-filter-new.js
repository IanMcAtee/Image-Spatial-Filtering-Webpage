

class SpatialFilter
{
    static applyPadding(arr, padWidth, padType)
    {
        switch (padType)
        {
            case PadType.ZERO:
                return this.zeroPad(arr, padWidth);
                break;
            case PadType.REPLICATE:
                return this.replicatePad(arr, padWidth);
                break;
            case PadType.MIRROR:
                return this.mirrorPad(arr. padWidth);
                break;
        }
    }

    static zeroPad(arr, padWidth)
    {
        // Preallocate the padded array with zeros
        let padArr = Array.from({ length: arr.length+(2*padWidth) }, () => new Array(arr[0].length+(2*padWidth)).fill(0));
        // Fill the interior of the padded array with the original values
        for (let i = 0; i < arr.length; i++)
        {
            for (let j = 0; j < arr[0].length; j++)
            {
                padArr[i+padWidth][j+padWidth] = arr[i][j];
            }
        }
        // Return the zero-padded array
        return padArr;
    }

    static replicatePad(arr, padWidth)
    {
        throw new Error("Not Implemented Exception");
    }

    static mirrorPad(arr, padWidth)
    {
        throw new Error("Not Implemented Exception");
    }

    static getNeighborhoodArray(arr, rowInd, colInd, nhoodSize)
    {
        let halfSlice = Math.floor(nhoodSize/2)
        let nhoodArr = [];
        for (let i = rowInd-halfSlice; i <= rowInd+halfSlice; i++)
        {
            let row = [];
            for (let j = colInd-halfSlice; j <= colInd+halfSlice; j++)
            {
                row.push(arr[i][j]);
            }
            nhoodArr.push(row);
        }
        return nhoodArr;
    }
}

class LinearFilter extends SpatialFilter
{
    static filter(arr, kernel, padType)
    {

    }

    static convolve(nhoodArr, kernel)
    {

    }
}

class NonLinearFilter extends SpatialFilter
{
    static filter(arr, nHoodSize, padType, filterFunc)
    {
        // Calculate necessary padding and apply
        let padWidth = Math.floor(nHoodSize/2);
        let padArr = super.applyPadding(arr, padWidth, padType);
        // Preallocate the output array
        let outputArr = Array.from({ length: arr.length }, () => new Array(arr[0].length).fill(0));
        // Preallocate the neighborhood array
        let nhoodArr = Array.from({ length: nHoodSize }, () => new Array(nHoodSize).fill(0));
        // Perform the filtering
        for (let i = 0; i < outputArr.length; i++)
        {
            for (let j = 0; j < outputArr[0].length; j++)
            {
                // Get the current neighborhood
                nhoodArr = super.getNeighborhoodArray(padArr, i+padWidth, j+padWidth, nHoodSize);
                // Apply the nonlinear filter function
                outputArr[i][j] = filterFunc(nhoodArr);
            }
        }
        // Return the filtered output
        return outputArr;
    }
}

// -------------------- LINEAR FILTERS --------------------

// Smoothing Filters --------------------------------------

export class BoxFilter extends LinearFilter
{

}

export class GaussianFilter extends LinearFilter
{

}

// Sharpening Filters --------------------------------------

export class LaplacianFilter extends LinearFilter
{

}

export class UnsharpMaskingFilter extends LinearFilter
{

}

export class SobelFilter extends LinearFilter
{

}

// -------------------- NON-LINEAR FILTERS --------------------

export class MedianFilter extends NonLinearFilter
{

}

export class MaxFilter extends NonLinearFilter
{
    static filter(arr, nhoodSize, padType)
    {
        let maxFunc = (arr) =>
        {
            arr = arr.flat();
            return Math.max(...arr);
        };
        return super.filter(arr, nhoodSize, padType, maxFunc);
    }
}

export class MinFilter extends NonLinearFilter
{
    static filter(arr, nhoodSize, padType)
    {
        let minFunc = (arr) =>
        {
            arr = arr.flat();
            return Math.min(...arr);
        };
        return super.filter(arr, nhoodSize, padType, minFunc);
    }
}



export const PadType = 
{
    ZERO: "zero",
    REPLICATE: "replicate",
    MIRROR: "mirror"
};