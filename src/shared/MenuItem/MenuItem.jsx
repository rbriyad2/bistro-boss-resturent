import React from 'react';

const MenuItem = ({item}) => {
    const {image, name, price, recipe} = item;
    return (
        <div className='flex space-x-3'>
            <img style={{borderRadius: '0 200px 200px 200px'}} className='w-[100px] ' src={image} alt="" />
            <div>
                <h3 className='uppercase text-xl'>{name}</h3>
                <p className='text-base'>{recipe}</p>
            </div>
            <p className='text-yellow-600 text-xl'>${price}</p>
        </div>
    );
};

export default MenuItem;