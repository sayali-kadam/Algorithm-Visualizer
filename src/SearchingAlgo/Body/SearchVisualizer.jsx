import React from 'react';
import "./SearchVisualizer.css";
import { getLinearSearch } from '../algorithms/LinearSearch';
import { getBinarySearch } from '../algorithms/BinarySearch';
import swal from "sweetalert";

export default class SearchVisualizer extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            array: [],
            key: [],
            disabled: false,
        }
    }

    componentDidMount(){
        this.resetArray();
    }

    //Generate array function
    resetArray(){
        const array = [];
        for(let i=0; i<12; i++){
            array.push(randomIntFromInterval(10, 200));
        }
        array.sort((a, b) => a - b);
        this.setState({ array });
    }

    getInputAlert(){
        const inputFieldStyle = document.getElementsByTagName("input")[0].style;
        inputFieldStyle.boxShadow = "1px 1px 5px 1px red";
        setTimeout(() => inputFieldStyle.boxShadow = "none", 100);
    }

    //Disabled buttons
    disabledButtons() {
        this.setState({ disabled: true });
        const buttonStyles = document.getElementsByClassName("button");
        for(let value of buttonStyles){
            value.style.color = "red";
        }
    }

    //Enabled buttons
    enabledButtons(animationLength){
        setTimeout(() => {
            const buttonStyles = document.getElementsByClassName("button");
            for(let i=0; i<buttonStyles.length; i++){
                buttonStyles[i].style.color = i === 0 ? "white" : "#223f6e";
            }
            this.setState({ disabled: false });
        }, (animationLength * 1000) + 3000);
    }

    //Linear search
    linearSearch() {
        swal({
            title: "Linear Search",
            text: "Time complexity: O(n)\nSpace complexity: O(1)\n\nAlgorithm: \n 1. Start from the leftmost element of arr[] and one by one compare x with each element of arr[] \n2. If x matches with an element, return the index \n3. If x doesn’t match with any of elements, return -1."
        });
        if(!this.state.key.length){
            this.getInputAlert();
            return;
        }
        this.disabledButtons();
        const animations = getLinearSearch(this.state.array, parseInt(this.state.key));
        this.enabledButtons(animations.length);
        
        for(let i=0; i<animations.length; i++){
            const[eleIdx, isEquall] = animations[i];
            const eleStyle = document.getElementsByClassName("array-elements")[eleIdx].style;
            if(i%2 === 0){
                setTimeout(() => {
                    eleStyle.backgroundColor = isEquall ? "#576115b3" : "#00FF00";
                    if(isEquall)
                        setTimeout(() => eleStyle.backgroundColor = "#dbf3fa", 3000);
                }, i * 1000);
            }else{
                setTimeout(() => {
                    eleStyle.backgroundColor = "#dbf3fa";
                }, i * 1000);
            }
        }
    }

    //Binary Search
    binarySearch(){
        swal({
            title: "Binary Search",
            text: "Time complexity: O(log n) \nSpace complexity: O(1) \n\nAlgorithm: \n1. Find the mid element of the array \n2. Compare x with the middle element. \n3. If x matches with the middle element, we return the mid index. \n4. Else If x is greater than the mid element, then x can only lie in the right half subarray after the mid element. So we recur for the right half. \n5. Else (x is smaller) recur for the left half."
        })
        if(!this.state.key.length){
            this.getInputAlert();
            return;
        }
        this.disabledButtons();
        const arrayElements = document.getElementsByClassName("array-elements");
        const animations = getBinarySearch(this.state.array, parseInt(this.state.key));
        this.enabledButtons(animations.length);
        for(let i=0; i<animations.length; i++){
            const [mid, isEquall, left, right] = animations[i];
            const partialArrayStyle = [];
            for(let i=left; i<=right; i++){
                partialArrayStyle.push(arrayElements[i].style);
            }
            const midStyle = arrayElements[mid].style;
            if(i%2 === 0){
                setTimeout(() => {
                    partialArrayStyle.forEach((value) => {
                        value.backgroundColor = "#ff0000ad";
                    });
                    midStyle.backgroundColor = isEquall ? "#576115b3" : "#00FF00";
                    if(isEquall)
                        setTimeout(() => midStyle.backgroundColor = "#dbf3fa", 3000);
                }, i * 1500);
            }else{
                setTimeout(() => {
                    partialArrayStyle.forEach((value) => {
                        value.backgroundColor = "#dbf3fa";
                    });
                    midStyle.backgroundColor = "#dbf3fa";
                }, i * 1500);
            }
        }
    }

    inputRead(e) {
        this.setState({ key: e.target.value });
    }

    render() {
        return (
            <div className="main container-fluid">
                <div disabled={this.state.disabled} className="button shadow1 reset-button" onClick={() => !this.state.disabled ? this.resetArray() : ""}>Reset</div>
                
                <div className="array-section shadow2">
                    {this.state.array.map((value, idx) => (
                        <div className="array-elements shadow1" key={idx}>{value}</div>
                    ))
                    }
                </div>
                <div className="bottom-tool-bar">
                    <input type="number" className="" value={this.state.key} placeholder="Enter key to be searched" onChange={this.inputRead.bind(this)} />
                    <div className="search-buttons">
                        <div className="button shadow1" onClick={() => !this.state.disabled ? this.linearSearch() : ""}> Linear Search </div>
                        <div className="button shadow1" onClick={() => !this.state.disabled ? this.binarySearch() : ""}> Binary Search </div>
                    </div>
                </div>
            </div>
        );
    }
}

//Random interval function
function randomIntFromInterval(min, max){
    return Math.abs(Math.floor(Math.random() * (max - min + 1) - min));
}