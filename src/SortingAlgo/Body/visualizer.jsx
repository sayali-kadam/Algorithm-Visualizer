import React, { useState, useEffect, useRef } from 'react';
import "./visualizer.css";
import { getMergeSortAlgorithm } from '../algorithms/MergeSort';
import { getInsertionSortAlgorithm } from '../algorithms/InsertionSort';
import { getQuickSortAlgorithm } from '../algorithms/QuickSort';
import { getSelectionSortAlgorithm } from '../algorithms/SelectionSort';
import { getHeapSortAlgorithm } from '../algorithms/HeapSort';
import swal from 'sweetalert';
import Swal from 'sweetalert2';

//Global vaiables
const ARR_LEN = 50;
const MIN_NUM = 5;
const MAX_NUM = 70;
const DELAY = 250;
const ACCESSED_COLOUR = 'turquoise';
const SORTED_COLOUR = 'green';

export default function Visualizer(props) {
  //Hooks defined
  const [arr, setArr] = useState([]);
  const [isSorting, setIsSorting] = useState(false);
  const [isSorted, setIsSorted] = useState(false);
  const containerRef = useRef(null);

  useEffect(generateArray, []);

  //Generate array function
  function generateArray() {
    if (isSorting) 
      return;
    if (isSorted) 
      resetArrayColour();
    setIsSorted(false);
    const arr = [];
    for (let i = 0; i < ARR_LEN; i++) {
      arr.push((MAX_NUM - MIN_NUM) * (i / ARR_LEN) + MIN_NUM);
    }
    shuffle(arr);
    setArr(arr);
  }

  //Merge sort
  function mergeSort() {
    Swal.fire({
      title: "Merge Sort",
      html: "Time Complexity: O(nlogn)<br>Space Complexity: O(n)<br>Stability: Stable",
      imageUrl: "https://media.geeksforgeeks.org/wp-content/cdn-uploads/Merge-Sort-Tutorial.png",
      imageHeight: 400
    })
    const animations = getMergeSortAlgorithm(arr);
    animateArrayUpdate(animations);
  }

  //Insertion sort
  function insertionSort() {
    swal({
      title: "Insertion Sort",
      text: "Time complexity: O(n^2)\nSpace complexity: O(1)\nStability: Stable\n\nAlgorithm: \n1. First pass consider first element as a key.\n2. Iterate from arr[1] to arr[n] over the array.\n3. Compare the current element (key) to its predecessor.\n4. If the key element is smaller than its predecessor, compare it to the elements before.\n5. Move the greater elements one position up to make space for the swapped element.\n6. Continue this loop till key is not a last element"
    });
    const animations = getInsertionSortAlgorithm(arr);
    animateArrayUpdate(animations);
  }

  //Selection sort
  function selectionSort(){
    swal({
      title: "Selection Sort",
      text: "Time complexity: O(n^2)\nSpace complexity: O(1)\nStability: Unstable\n\nAlgorithm: \n1. Divide the array into two different parts \n2. One part is sorted array and another part is unsorted array\n3. Pick the minimum element from the unsorted subarray.\n4. Swap it with the leftmost element of the unsorted subarray.\n5. Now the leftmost element of unsorted subarray becomes a part (rightmost) of sorted subarray.\n6. Continue this process till all array is not becoming a sorted array."
    })
    const animations = getSelectionSortAlgorithm(arr);
    animateArrayUpdate(animations);
  }

  //Heap Sort 
  function heapSort(){
    swal({
      title: "Heap Sort",
      text: "Time complexity: O(nlogn)\nSpace complexity: O(1)\nStability: Unstable\n\nAlgorithm:\n 1. Suppose an array consists of N distinct elements in memory\n 2. To begin with, a heap is built by moving the elements to its proper position within the array.\n 3. This means that as the elements are traversed from the array the root, its left child, its right child are filled in respectively forming a binary tree.\n 4. In the second phase, the root element is eliminated from the heap by moving it to the end of the array.\n 5. The balance elements may not be a heap.\n 6. So again steps 1 and 2 are repeated for the balance elements.\n 7. The procedure is continued until all the elements are eliminated."
    })
    const animations = getHeapSortAlgorithm(arr);
    animateArrayUpdate(animations);
  }

  //Quick sort
  function quickSort(){
    swal({
      title: "Quick Sort",
      text: "Time complexity: O(nlogn)\nSpace complexity: O(logn)\nStability: Stable\n\nAlgorithm:\npick pivot in different ways:\n  1.  Always pick first element as pivot.\n  2. Always pick last element as pivot (implemented below)\n  3. Pick a random element as pivot.\n  4. Pick median as pivot.\nTechnically, quick sort follows the below steps:\n  Step 1 − Make any element as pivot\n  Step 2 − Partition the array on the basis of pivot\n  Step 3 − Apply quick sort on left partition recursively\n  Step 4 − Apply quick sort on right partition recursively"
    })
    const animations = getQuickSortAlgorithm(arr);
    animateArrayUpdate(animations);
  }

  //Animation of the array
  function animateArrayUpdate(animations) {
    if (isSorting) return;
    setIsSorting(true);
    animations.forEach(([comparison, swapped], index) => {
      setTimeout(() => {
        if (!swapped) {
          if (comparison.length === 2) {
            const [i, j] = comparison;
            animateArrayAccess(i);
            animateArrayAccess(j);
          } else {
            const [i] = comparison;
            animateArrayAccess(i);
          }
        } else {
          setArr((prevArr) => {
            const [k, newValue] = comparison;
            const newArr = [...prevArr];
            newArr[k] = newValue;
            return newArr;
          });
        }
      }, index * DELAY);
    });
    setTimeout(() => {
      animateSortedArray();
    }, animations.length * DELAY);
  }

  //Current comparison changes
  function animateArrayAccess(index) {
    const arrayBars = containerRef.current.children;
    const arrayBarStyle = arrayBars[index].style;
    setTimeout(() => {
      arrayBarStyle.backgroundColor = ACCESSED_COLOUR;
    }, DELAY);
    setTimeout(() => {
      arrayBarStyle.backgroundColor = '';
    }, DELAY * 2);
  }

  //Final sorting checking
  function animateSortedArray() {
    const arrayBars = containerRef.current.children;
    for (let i = 0; i < arrayBars.length; i++) {
      const arrayBarStyle = arrayBars[i].style;
      setTimeout(
        () => (arrayBarStyle.backgroundColor = SORTED_COLOUR),
        DELAY,
      );
    }
    setTimeout(() => {
      setIsSorted(true);
      setIsSorting(false);
    }, arrayBars.length * DELAY);
  }

  //Reset the array if sorted
  function resetArrayColour() {
    const arrayBars = containerRef.current.children;
    for (let i = 0; i < arr.length; i++) {
      const arrayBarStyle = arrayBars[i].style;
      arrayBarStyle.backgroundColor = '';
    }
  }

  return (
    <div className="visualizer-container">
        <div className="toolbar">
            <button className="generate-button" onClick={generateArray}>
                Generate new array !!
            </button>
            <div className="sort-buttons">
              <div className="separator"></div>
              <button className="app-button" onClick={insertionSort}>
                  Insertion sort
              </button>
              <button className="app-button" onClick={selectionSort}>
                  Selection sort
              </button>
              <button className="app-button" onClick={heapSort}>
                  Heap sort
              </button>
              <button className="app-button" onClick={mergeSort}>
                  Merge sort
              </button>
              <button className="app-button" onClick={quickSort}>
                  Quick sort
              </button>
              <div className="separator"></div>
            </div>
        </div>
        <div className="array-container" ref={containerRef}>
            {arr.map((barHeight, index) => (
            <div
                className="array-bar"
                style={{
                  height: `${barHeight}vmin`,
                  width: `${100 / ARR_LEN}vw`,
                }}
                key={index}
            ></div>
            ))}
        </div>
    </div>
  );
}

const shuffle = (arr) => {
  for (let i = arr.length - 1; i >= 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    const temp = arr[i];
    arr[i] = arr[randomIndex];
    arr[randomIndex] = temp;
  }
};