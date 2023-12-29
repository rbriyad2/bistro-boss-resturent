import React from "react";
import { Helmet } from "react-helmet-async";
import menuimg from '../../assets/menu/banner3.jpg';
import dessertImg from '../../assets/menu/dessert-bg.jpeg';
import pizzaimg from '../../assets/menu/pizza-bg.jpg';
import saladImg from '../../assets/menu/salad-bg.jpg';
import soupImg from '../../assets/menu/soup-bg.jpg';
import useMenu from "../../hooks/useMenu";
import SectionTitle from "../../Components/SectionTitle/SectionTitle";
import MenuCategory from "../MenuCategory/MenuCategory";
import MenuItem from "../../shared/MenuItem/MenuItem";
import Cover from "../../shared/Cover/Cover";

const Menus = () => {
    const [menu]=useMenu()
    const desserts= menu.filter(item => item.category ==='dessert')
    const offered= menu.filter(item => item.category ==='offered')
    const pizza= menu.filter(item => item.category ==='pizza')
    const salad= menu.filter(item => item.category ==='salad')
    const soup= menu.filter(item => item.category ==='soup')
  return (
    <div>
      <Helmet>
        <title>Bistro Boss | Menus</title>
      </Helmet>
      <Cover img={menuimg} title={'OUR MENU'} description={'Would you like to try a dish?'}></Cover>
          <SectionTitle subheading={" Dont't Miss"} heading={"Today's offer"}></SectionTitle>
      <div className="grid md:grid-cols-2 gap-10 my-16">
        {offered.map((item) => (
          <MenuItem key={item._id} item={item}></MenuItem>
        ))}
      </div>
      {/* <MenuCategory items={offered} coverImg={menuimg} title={'OUR MENU'}></MenuCategory> */}
      <MenuCategory items={desserts} coverImg={dessertImg} title={'dessert'}></MenuCategory>
      <MenuCategory items={pizza} coverImg={pizzaimg} title={'pizza'}></MenuCategory>
      <MenuCategory items={salad} coverImg={saladImg} title={'salad'}></MenuCategory>
      <MenuCategory items={soup} coverImg={soupImg} title={'soup'}></MenuCategory>
    </div>
  );
};

export default Menus;
