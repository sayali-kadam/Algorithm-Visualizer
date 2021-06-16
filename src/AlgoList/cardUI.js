import React, { Component } from 'react';
import AlgoCards from "./AlgoCards/AlgoCards";
import img1 from "../images/Sorting-Algorithm.png";
import img2 from "../images/Searching-Algorithm.jpg";

class Cards extends Component{
    render(){
        return(
            <div className="container">
                <div className="row">
                    <div className="col-sm-6">
                        <AlgoCards imgsrc={img1} title='Sorting Algorithm' path='/Sorting' text='A Sorting Algorithm is used to rearrange a given array elements 
                        according to a comparison operator on the elements. These types of algorithms are sort the elements in specific order.'/>
                    </div>
                    <div className="col-sm-6">
                        <AlgoCards imgsrc={img2} title='Searching Algorithms' path='/Searching' text='The searching algorithms are used to search or find one or 
                        more than one element from a array of elements. These type of algorithms are used to find elements from a specific data structures.'/>    
                    </div>
                </div>
            </div>
        );
    }
}

export default Cards;