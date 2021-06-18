import React from 'react';
import "./SearchBar.css";
import { Dropdown } from 'react-bootstrap';

const SearchBar = (props) => {
    return(
        <Dropdown>
        <Dropdown.Toggle variant="btn btn-outline-success" id="dropdown-basic">
            Algorithms....
        </Dropdown.Toggle>

        <Dropdown.Menu className="menu">
            <Dropdown.Item href="/Searching">Linear Search</Dropdown.Item>
            <Dropdown.Item href="/Searching">Binary Search</Dropdown.Item>
            <Dropdown.Item href="/Sorting">Insertion Sort</Dropdown.Item>
            <Dropdown.Item href="/Sorting">Selection Sort</Dropdown.Item>
            <Dropdown.Item href="/Sorting">Heap Sort</Dropdown.Item>
            <Dropdown.Item href="/Sorting">Quick Sort</Dropdown.Item>
            <Dropdown.Item href="/Sorting">Merge Sort</Dropdown.Item>
        </Dropdown.Menu>
        </Dropdown>
    );
}
export default SearchBar;