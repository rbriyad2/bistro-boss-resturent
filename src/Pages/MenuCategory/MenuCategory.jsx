import React from "react";
import MenuItem from "../../shared/MenuItem/MenuItem";
import Cover from "../../shared/Cover/Cover";
import { Link } from "react-router-dom";

const MenuCategory = ({ items, coverImg, title, description}) => {
  return (
    <div className="pt-8 mb-8">
        {title && <Cover img={coverImg} title={title} description={description}></Cover>}
      <div className="grid md:grid-cols-2 gap-10 mt-16 mb-8">
        {items.map((item) => (
          <MenuItem key={item._id} item={item}></MenuItem>
        ))}
      </div>
      <div className="text-center"><Link to={`/order/${title}`}><button className="btn btn-outline border-0 border-b-4">Order Your Favorite Food</button></Link></div>
    </div>
  );
};

export default MenuCategory;
