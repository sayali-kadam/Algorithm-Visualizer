export function getBinarySearch(arr, key){
    let animations = [];
    let left = 0;
    let right = arr.length - 1;
    let mid = Math.floor((left + right) / 2);

    while(left <= right){
        mid = Math.floor((left + right) / 2);
        animations.push([mid, false, left, right]);
        animations.push([mid, false, left, right]);

        if(arr[mid] === key){
            animations.push([mid, true, mid, mid]);
            break;
        }else if(arr[mid] > key){
            right = mid - 1;
        }else{
            left = mid + 1;
        }
    }
    return animations;
}