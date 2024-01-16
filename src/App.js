import React, { useEffect, useState } from 'react';
import './App.css';
import Home from './Components/Home';
import Navbar from './Components/Navbar';
import Home2 from './Components/Hom2';

function App() {
  // Initial array of products
  const initialProductsArray = [
    { name: 'Awesome Chair' },
    { name: 'Fantastic Table' },
    { name: 'Elegant Lamp' },
    { name: 'Sleek Sofa' },
    { name: 'Premium Bookcase' },
    { name: 'Gorgeous Mirror' },
    { name: 'Innovative Clock' },
    { name: 'Modern Vase' },
    { name: 'Chic Rug' },
    { name: 'Exquisite Artwork' },
  ];

  // State variables
  const [query, setQuery] = useState("");
  const [filteredArray, setFilteredArray] = useState(initialProductsArray);
  const [selectedArray, setSelectedArray] = useState([]);
  const [arr, setArr] = useState(initialProductsArray);

  // Effect to set initial filtered array
  useEffect(() => {
    setFilteredArray(arr);
  }, [arr]);

  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden box-border m-0 p-0 ">

      {/* modified */}
      
      {/* Navbar component */}
      {/* <Navbar
        arr={arr}
        query={query}
        setQuery={setQuery}
        filteredArray={filteredArray}
        selectedArray={selectedArray}
        setFilteredArray={setFilteredArray}
        setSelectedArray={setSelectedArray}
      /> */}

      {/* Home component */}
      {/* <Home
        query={query}
        setQuery={setQuery}
        filteredArray={filteredArray}
        selectedArray={selectedArray}
        setFilteredArray={setFilteredArray}
        setSelectedArray={setSelectedArray}
      /> */}



{/*  required */}
      <Home2
        arr={arr}
        query={query}
        setQuery={setQuery}
        filteredArray={filteredArray}
        selectedArray={selectedArray}
        setFilteredArray={setFilteredArray}
        setSelectedArray={setSelectedArray} />
    </div>
  );
}

export default App;
