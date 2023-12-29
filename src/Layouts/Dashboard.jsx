import React, { useState } from 'react';
import { FaBook, FaCartPlus, FaHome, FaUsers } from 'react-icons/fa';
import { Link, Outlet } from 'react-router-dom';
import { IoMenu, IoWallet } from "react-icons/io5";
import { MdManageSearch, MdReviews, MdShoppingBag } from "react-icons/md";
import { GiSecretBook } from "react-icons/gi";
import { BiSolidMessageDetail } from "react-icons/bi";
import { Helmet } from 'react-helmet-async';
import useCart from '../hooks/useCart';
import { ImSpoonKnife } from "react-icons/im";
import useAdmin from '../hooks/useAdmin';




const Dashboard = () => {
  const [cart]=useCart()
  // const isAdmin = true;
  const [isAdmin]= useAdmin()
    const [active, setActive]= useState(false)
    const activeMenu =()=>{
        setActive(!active)
    }
    return (

        <section>
            <Helmet>
        <title>Dashboard | Bistro Boss </title>
      </Helmet>

        <div className="drawer lg:drawer-open">
  <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content flex flex-col ">
   <Outlet></Outlet>
    <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>
  
  </div> 
  <div className="drawer-side">
    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label> 
    <ul className="menu p-4 w-80 min-h-full bg-[#D1A054] text-base-content">
      {
        isAdmin ? <>
        <li><Link onClick={()=>activeMenu} style={{color: active ? 'red' : 'black', fontWeight: active ? 'bold' : 'normal'}} to='/dashboard/adminhome'><FaHome /> ADMIN HOME</Link></li>
      <li><Link to='/dashboard/additem'><ImSpoonKnife />ADD ITEMS</Link></li>
      <li><Link to='/dashboard/manageitems'><MdManageSearch />MANAGE ITEMS</Link></li>
      <li><Link to='/dashboard/addreview'><FaBook />MANAGE BOOKING</Link></li>
      <li><Link  className='flex' to='/dashboard/allusers'><FaUsers />ALL USERS <span className="badge badge-secondary">+{cart?.length|| 0}</span></Link></li>
      </>  : <>
        <li><Link onClick={()=>activeMenu} style={{color: active ? 'red' : 'black', fontWeight: active ? 'bold' : 'normal'}} to='/dashboard/userhome'><FaHome /> USER HOME</Link></li>
      <li><Link to='/dashboard/history'><IoWallet />PAYMENT HISTORY</Link></li>
      <li><Link className='flex' to='/dashboard/mycart'><FaCartPlus />My Cart <span className="badge badge-secondary">+{cart?.length|| 0}</span></Link></li>
      <li><Link to='/dashboard/addreview'><MdReviews />ADD REVIEW</Link></li>
      <li><Link to='/dashboard/booking'><GiSecretBook />MY BOOKING</Link></li>
      </>
      }
      
      
      <div className="divider"></div> 
      <li><Link to='/'><FaHome />HOME</Link></li>
      <li><Link to='/menus'><IoMenu />MENU</Link></li>
      <li><Link to='/order/salad'><MdShoppingBag />ORDER FOOD</Link></li>
      <li><Link to='/contact'><BiSolidMessageDetail />SHOP</Link></li>
    </ul>
  
  </div>
</div>
        </section>
    );
};

export default Dashboard;