import React from 'react';
import { cross, download } from '../Assets/assets';

const Card = ({ item, handleDelete }) => {
  return (
    <div className='h-[15rem] w-[10rem] p-3 rounded shadow-lg flex flex-col gap-3'>
      <img className='rounded h-[60%] w-full' src={download} alt='Product' />
      <div className="flex h-[40%] w-full flex-col justify-between items-center">
        {/* Product name */}
        <span className='font-bold text-base'>{item?.name}</span>

        {/* Delete button */}
        <img
          onClick={() => handleDelete(item)}
          className='h-6 w-6 cursor-pointer'
          src={cross}
          alt='Delete Icon'
        />
      </div>
    </div>
  );
};

export default Card;
