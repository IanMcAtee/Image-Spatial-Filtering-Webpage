
class SpatialFilter
{
    static filter(padArr, nhoodSize, padType, filterFunc)
    {   
        let nhArr = this.getNeighborhood(padArr, 1, 1, nhoodSize);
        console.log(nhArr);
        let max = filterFunc(nhArr);
        console.log(max);
    }

    static getNeighborhood(arr, rowInd, colInd, nhoodSize)
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

    static convolve(nhoodArr, kernel)
    {
        console.log("Convolving");
        // let sum = 0;
        // for (let i = 0; i < nhoodArr.length; i++)
        // {
        //     for (let j = 0; j < nhoodArr[0].length; j++)
        //     {
        //         sum += nhoodArr[i][j] * kernel[i][j]
        //     }
        // }
        // return sum; 
    }



}

export class BoxFilter extends SpatialFilter
{
    static filter()
    {
        
    }
}

export class MedianFilter 
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
}

export class MaxFilter extends SpatialFilter
{
    static filter(imgArr, nhoodSize, padType)
    {
        let maxFunc = (nHoodArr) =>
        {
            nHoodArr = nHoodArr.flat();
            return Math.max(...nHoodArr);
        }
        super.filter(imgArr, nhoodSize, padType, maxFunc);
    }
}



export const PadType = 
{
    ZERO: "zero",
    REPLICATE: "replicate",
    MIRROR: "mirror"
};



