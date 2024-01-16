import React, { useEffect, useRef, useState } from 'react';
import { bagIcon, searchIcon } from '../Assets/assets';

const Navbar = ({ arr, query, setQuery, filteredArray, selectedArray, setFilteredArray, setSelectedArray }) => {
  // State variables
  const [queryFilteredArray, setQueryFilteredArray] = useState(filteredArray);
  const [showul, setShowul] = useState(false);
  const wrapperRef = useRef(null);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [lastDeletedItem, setLastDeletedItem] = useState(null);

  // Handle item click in the suggestion list
  const handleItemClick = (item) => {
    setSelectedArray((prev) => [...prev, item]);
    setQuery('');
    setHighlightedIndex(-1);
    setShowul(false);
  };

  // Handle keydown events
  const handleKeyDown = (event) => {
    if (event.key === 'Backspace' && query === '') {
      setHighlightedIndex(selectedArray.length - 1);
      const deletedItem = selectedArray[selectedArray.length - 1];
      setLastDeletedItem(deletedItem);
    }

    if (event.key === 'Backspace' && highlightedIndex !== -1) {
      const updatedSelectedArray = [...selectedArray];
      updatedSelectedArray.splice(highlightedIndex, 1);
      setSelectedArray(updatedSelectedArray);
      setLastDeletedItem(null);
      setHighlightedIndex(-1);
    }
  };

  // Handle clicks outside the suggestion list
  const handleClickOutside = (event) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      setHighlightedIndex(-1);
      setLastDeletedItem(null);
      setShowul(false);
    }
  };

  // Effect to attach/detach event listeners
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedArray, query, highlightedIndex]);

  // Effect to update filteredArray when selectedArray changes
  useEffect(() => {
    const arr1 = arr.filter((item) => !selectedArray.includes(item));
    setFilteredArray(arr1);
  }, [selectedArray]);

  // Effect to update queryFilteredArray when query or filteredArray changes
  useEffect(() => {
    const arr = filteredArray?.filter((item) => item?.name?.toLowerCase().includes(query?.toLowerCase()));
    setQueryFilteredArray(arr);
  }, [query, filteredArray]);

  return (
    <div className='py-2 px-[3.5rem] flex flex-row items-center justify-between bg-[rgb(60,0,107,1)]'>
      {/* Zepto Logo */}
      <img onClick={() => window.open('https://www.zeptonow.com/')} className='h-[34px] w-[105px]' src='https://cdn.zeptonow.com/web-static-assets-prod/artifacts/6.20.0/images/logo.svg' alt='' />

      {/* Search Input */}
      <div onClick={() => setShowul(true)} className='relative bg-white px-6 py-1 flex items-center justify-center rounded-lg max-w-[56rem] w-full gap-2 shadow-md'>
        <img className='h-5 w-5' src={searchIcon} alt='' />
        <input
          className='whitespace-nowrap text-[0.875rem h-[2.2rem] outline-none w-full text-md flex bg-transparent'
          list='list'
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowul(true);
          }}
          placeholder='Search for Over 5000 products'
        />
      </div>

      {/* My Cart Button */}
      <div className='bg-[rgb(255,50,105,1)] flex items-center cursor-pointer justify-center h-[3.5rem] w-[10rem] px-[1.5rem] py-[0.5rem] rounded-lg text-white gap-2'>
        <img alt='' src={bagIcon} />
        <span className='text-white text-lg'>My cart</span>
      </div>

      {/* Suggestion List */}
      {showul && (
        <ul ref={wrapperRef} className='absolute top-[65px] left-[17%] border border-black rounded-lg max-w-[20rem] p-3 w-full bg-white'>
          {queryFilteredArray?.map((item, index) => (
            <li
              key={item.name}
              onClick={() => handleItemClick(item)}
              className={item?.name === selectedArray[highlightedIndex]?.name ? 'bg-yellow-200 cursor-pointer' : 'cursor-pointer'}
            >
              {item.name}
            </li>
          ))}
        </ul>
      )}

      {/* Last Deleted Item Notification */}
      {lastDeletedItem && (
        <div className='absolute top-[120px] left-[17%] border border-black rounded-lg max-w-[20rem] p-3 w-full bg-white'>
          <p>Last Added Item: {lastDeletedItem.name}</p>
        </div>
      )}
    </div>
  );
};

export default Navbar;
