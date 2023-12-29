import React from 'react';
import SectionTitle from '../../../Components/SectionTitle/SectionTitle';
import feturedimg from '../../../assets/home/featured.jpg'
import './Featured.css'; 

const Featured = () => {
    return (
        <div className='fetureditem bg-fixed pt-8 my-16  text-white'>
            <SectionTitle
            subheading={'---Check it out---'} heading={'Fetured Item'}>
            </SectionTitle>
            <div className='md:flex justify-center bg-slate-500 bg-opacity-50 items-center pb-20 pt-12 px-36'>
                <div>
                    <img src={feturedimg} alt="" />
                </div>
                <div className='md: ml-10'>
                    <p>Aug 20, 2023</p>
                    <p className='text-xl'>WHERE CAN I GET SOME?</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Error voluptate facere, deserunt dolores maiores quod nobis quas quasi. Eaque repellat recusandae ad laudantium tempore consequatur consequuntur omnis ullam maxime tenetur.</p>
                    <button className="btn btn-outline mt-5 border-0 border-b-4">Order Now</button>
                </div>
            </div>
        </div>
    );
};

export default Featured;