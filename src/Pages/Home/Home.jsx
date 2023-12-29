import React from 'react';
import Banner from './Banner/Banner';
import Catagory from './Catagory/Catagory';
import PopularMenu from './PopularMenu/PopularMenu';
import Featured from './Featured/Featured';
import Testimonials from './Testimonials/Testimonials';
import Information from './Information/Information';
import Callus from './Callus/Callus';
import ChefRecomended from './ChefRecomended/ChefRecomended';
import { Helmet } from 'react-helmet-async';

const Home = () => {
    return (
        <>
        <Helmet>
        <title>Bistro Boss | Home</title>
      </Helmet>
           <Banner></Banner>
           <Catagory></Catagory>
           <Information></Information>
           <PopularMenu></PopularMenu>
           <Callus></Callus>
           <ChefRecomended></ChefRecomended>
           <Featured></Featured>
           <Testimonials></Testimonials>
        </>
    );
};

export default Home;