export function getLinearSearch(arr, key){
    let animations = [];
    for(let i=0; i<arr.length; i++){
        animations.push([i, false]);
        animations.push([i, false]);

        if(arr[i] === key){
            animations.push([i, true]);
            break;
        }
    }
    return animations;
}