import { swap } from "./Swap";
export function getSelectionSortAlgorithm(arr){
    const copy = [...arr];
    const animations = [];
    for(let i=0; i<copy.length-1; i++){
        for(let j=i+1; j<copy.length; j++){
            animations.push([[i, j], false]);
            if(copy[i] > copy[j]){
                animations.push([[j, copy[i]], true]);
                animations.push([[i, copy[j]], true]);
                swap(copy, i, j);
            }
        }
    }
    return animations;
}