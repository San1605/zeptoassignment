import React from 'react';
import Card from './Card';
import Banner from './Banner';
import { searchIcon } from '../Assets/assets';

const Home = ({ query, setQuery, filteredArray, selectedArray, setFilteredArray, setSelectedArray }) => {
  console.log(selectedArray);

  const handleDelete = (item) => {
    console.log(item, "item");
    const arr = selectedArray?.filter((ele) => ele?.name !== item?.name);
    console.log(arr, "arr");
    setSelectedArray(arr);
    setFilteredArray((prev) => [...prev, item]);
  };

  return (
    <div className='h-[calc(100%-_74px)] flex flex-col'>
      {/* Banner component */}
      <Banner />

      {/* Display selected items */}
      {selectedArray?.length > 0 ? (
        <div className='overflow-y-auto h-[calc(100%-_76px)] py-4 px-20 w-full grid grid-cols-6 '>
          {selectedArray?.map((item, index) => (
            <Card item={item} key={index} handleDelete={handleDelete} />
          ))}
        </div>
      ) : (
        /* Display welcome message when no items selected */
        <div className='w-full flex h-full  flex-col gap-8 items-center justify-center  '>
          <img className='h-[25%] w-[25%] rounded-lg' src={searchIcon} alt='Search Icon' />
          <div className='flex flex-col gap-3 items-center justify-center'>
            <span className='text-3xl font-bold'>
              Welcome to Zepto
            </span>
            <span className='text-xl'>
              Please search something
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
