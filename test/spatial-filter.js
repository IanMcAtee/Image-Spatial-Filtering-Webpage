
class SpatialFilter
{
    static filter(padArr, filterFunc, nhoodSize)
    {   
        console.log("Im a filter");
    }

    #getNeighborhood(arr, rowInd, colInd, nhoodSize)
    {
        let halfSlice = Math.floor(nhoodSize/2)
        nhoodArr = [];
        for (let i = rowInd-halfSlice; i < rowInd+halfSlice; i++)
        {
            let row = [];
            for (let j = colInd-halfSlice; j < colInd+halfSlice; j++)
            {
                row.push(arr[i][j]);
            }
            nhoodArr.push(row);
        }
        return nhoodArr;
    }

    #applyPadding(arr, padType)
    {
        switch (padType)
        {
            case PadType.ZERO:
                break;
            case PadType.REPLICATE:
                break;
            case PadType.MIRROR:
                break;
        }
    }


}

class LinearFilter extends SpatialFilter
{
    constructor(kernel)
    {
        this.kernel = kernel;
        this.convolve = (nhoodArr, kernel) => {
            let sum = 0;
            for (let i = 0; i < nhoodArr.length; i++)
            {
                for (let j = 0; j < nhoodArr[0].length; j++)
                {
                    sum += nhoodArr[i][j] * kernel[i][j]
                }
            }
            return sum;
        };
    }
}

class NonlinearFilter extends SpatialFilter
{
    static filter(imgArr, nhoodSize, padType, filterFunc)
    {
        super(filter(imgArr, nhoodSize, padType, filterFunc));
    }
}

export class BoxFilter extends LinearFilter
{
    
}

export class MedianFilter extends NonlinearFilter
{
    constructor(nhoodSize)
    {
        this.nhoodSize = nhoodSize;
        this.medianFunction = (arr) =>
        {
            arr = arr.flat();
            arr.sort((a, b) => a - b);
            let midPoint = Math.floor(arr.length / 2);
            if (arr.length % 2 != 0)
            {
                return arr[midPoint];
            }
            else
            {
                return (arr[midPoint] + arr[midPoint+1])/2
            }
        };
    }
    filter(imgArr)
    {
        super(filter(imgArr, this.medianFunction))
    }
}

export class MaxFilter
{
    static filter(imgArr, nhoodSize, padType)
    {
        let maxFunc = (nHoodArr) =>
        {
            nHoodArr = nHoodArr.flat();
            return Math.max(...nHoodArr);
        }
        super(filter(imgArr, nhoodSize, padType, maxFunc));
    }
}



export const PadType = 
{
    ZERO: "zero",
    REPLICATE: "replicate",
    MIRROR: "mirror"
};



