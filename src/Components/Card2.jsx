import React from 'react';
import { cross, download } from '../Assets/assets';

const Card2 = ({ item, handleDelete }) => {
    return (
        <div className='h-[2rem] min-w-[15rem] p-3 rounded shadow-lg flex flex-row gap-3 bg-white text-black justify-between items-center'>
            <span className='font-bold text-base text-nowrap'>{item?.name}</span>
            {/* Delete button */}
            <img
                onClick={() => handleDelete(item)}
                className='h-6 w-6 cursor-pointer'
                src={cross}
                alt='Delete Icon'
            />
        </div>
    );
};

export default Card2;
