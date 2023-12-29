import React from 'react';
import SectionTitle from '../../../Components/SectionTitle/SectionTitle';
import MenuItem from '../../../shared/MenuItem/MenuItem';
import useMenu from '../../../hooks/useMenu';

const PopularMenu = () => {
    const [menu] = useMenu()
    const popular = menu.filter(item => item.category ==='popular')
    return (
        <section className='mb-16'>
            <SectionTitle
            heading={"From Our Menu"} subheading={"---Check it out---"}></SectionTitle>
            <div className='grid md:grid-cols-2 gap-10'>
                {popular.map(item=> <MenuItem key={item._id} item={item}></MenuItem>)}
            </div>
            <div className='text-center'>
            <button className="btn btn-outline text-center mt-5 border-0 border-b-4">View Full Menu</button>
            </div>
        </section>
    );
};

export default PopularMenu;