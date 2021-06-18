import { swap } from "./Swap";
export function getHeapSortAlgorithm(arr){
    const copy = [...arr];
    const animations = [];
    let n = copy.length;
    for(let i=n/2-1; i>=0; i--)
        heapify(copy, n, i, animations);
    for(let i=n-1; i>0; i--){
        animations.push([[i, copy[0]], true]);
        animations.push([[0, copy[i]], true]);
        swap(copy, 0, i);
        heapify(copy, i, 0, animations);
    }
    return animations;
}

function heapify(copy, n, i, animations){
    let large = i;
    let left = 2 * i + 1;
    let right = 2 * i + 2;

    if(left<n && copy[left]>copy[large])
        large = left;

    if(right<n && copy[right]>copy[large])
        large = right;

    animations.push([[i, large], false]);
    if(large != i){
        animations.push([[i, copy[large]], true]);
        animations.push([[large, copy[i]], true]);
        swap(copy, i, large);
        heapify(copy, n, large, animations);
    }
}