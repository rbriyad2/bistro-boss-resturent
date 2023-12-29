import React from 'react';

const SectionTitle = ({heading, subheading}) => {
    return (
        <div className='my-5 md:w-4/12 mx-auto text-center'>
            <p className='text-yellow-600 text-xl my-3 '>{subheading}</p>
            <h3 className='text-4xl border-y-4 py-3 '>{heading}</h3>
        </div>
    );
};

export default SectionTitle;