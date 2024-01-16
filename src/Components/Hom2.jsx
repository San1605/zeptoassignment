import React, { useEffect, useRef, useState } from 'react';
import { searchIcon } from '../Assets/assets';
import Card2 from './Card2';

const Home2 = ({ arr, query, setQuery, filteredArray, selectedArray, setFilteredArray, setSelectedArray }) => {
    // State variables
    const [queryFilteredArray, setQueryFilteredArray] = useState(filteredArray);
    const [showul, setShowul] = useState(false);
    const wrapperRef = useRef(null);
    const [highlightedIndex, setHighlightedIndex] = useState(-1);
    const [lastDeletedItem, setLastDeletedItem] = useState(null);
    const handleDelete = (item) => {
        console.log(item, "item");
        const arr = selectedArray?.filter((ele) => ele?.name !== item?.name);
        console.log(arr, "arr");
        setSelectedArray(arr);
        setFilteredArray((prev) => [...prev, item]);
    };

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
        <div className='py-4 px-[3rem] flex flex-row items-center gap-6 bg-[rgb(60,0,107,1)]'>
            {selectedArray?.length > 0 && (
                <div className='w-auto max-w-[calc(100%_-_16rem)] overflow-x-auto  h-full flex gap-4 justify-center items-center'>
                    {selectedArray?.map((item, index) => (
                        <Card2 item={item} key={index} handleDelete={handleDelete} />
                    ))}
                </div>)
            }
            {/* Search Input */}
            <div onClick={() => setShowul(true)} className='relative bg-white px-6  flex items-center justify-center rounded-lg max-w-[16rem] w-full gap-2 shadow-md'>
                <img className=' h-5 w-5' src={searchIcon} alt='' />
                <input
                    className='whitespace-nowrap text-[0.875rem h-[2rem] outline-none w-full text-md flex bg-transparent'
                    list='list'
                    value={query}
                    onChange={(e) => {
                        setQuery(e.target.value);
                        setShowul(true);
                    }}
                    placeholder='Search for products'
                />
                {showul && (
                    <ul ref={wrapperRef} className='absolute top-[45px] border border-black rounded-lg max-w-[20rem] p-3 w-full bg-white'>
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
                 {lastDeletedItem && (
                <div className='absolute top-[100px] border border-black rounded-lg max-w-[20rem] p-3 w-full bg-white'>
                    <p>Last Item: {lastDeletedItem.name}</p>
                </div>
            )}
            </div>
        
        </div>
    );
};

export default Home2;
