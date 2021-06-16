import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import './AlgoCards.css';

const AlgoCards = props => {
    return(
        <>
            <div className="card text-center">
                <div className="overflow"><img src={props.imgsrc} className="card-img-top" height="200px" alt="sorting"/></div>
                <div className="card-body">
                    <h5 className="card-title">{props.title}</h5>
                    <p className="card-text">{props.text}</p>
                    <Link to={props.path} className="btn btn-success">Learn Algorithms</Link>
                </div>
            </div>
        </>
    )
}

export default AlgoCards;