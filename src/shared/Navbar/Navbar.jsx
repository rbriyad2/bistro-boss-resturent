import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from "sweetalert2";
import { FaCartPlus } from "react-icons/fa";
import useCart from "../../hooks/useCart";
import useAdmin from "../../hooks/useAdmin";

const Navbar = () => {
  const {user, logOut}= useContext(AuthContext)
  const [cart]= useCart();
  const [isAdmin]=useAdmin()
  
  const handlelogout =()=>{
    Swal.fire({
      title: "Are you sure?",
      text: "You want logout this account?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, LogOut!"
    }).then((result) => {
      if (result.isConfirmed) {
    logOut()
    .then(() => {
    })
    .catch((error) => {
      console.log(error);
    });
        Swal.fire({
          title: "LogOut",
          text: "Logout Successfull",
          icon: "success",
          showConfirmButton: false,
          timer: 500
        });
      }
    });
    
  }
  const navoptions = (
    <>
      <li><Link to='/'>Home</Link></li>
      <li><Link to='/menus'>Our Menu</Link></li>
      <li><Link to='/order/salad'>Order Food</Link></li>
      {isAdmin ? <li><Link to='/dashboard/adminhome'>Dashboard</Link></li> : <li><Link to='/dashboard/userhome'>Dashboard</Link></li>}
      {
         user ? <>   <Link className="btn gap-2 bg-slate-800 border-0" to='/dashboard/mycart'><div className="badge badge-secondary"> <FaCartPlus />+{cart?.length|| 0}</div></Link> <button onClick={handlelogout} className="btn btn-ghost" >Logout</button> </> : <button><Link to='/login'>Login</Link></button>
      }
    </>
  );
  return (
    <>
      <div className="navbar text-white max-w-screen-xl fixed z-10 bg-black bg-opacity-40">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {navoptions}
            </ul>
          </div>
          <a className="btn btn-ghost text-xl">Bitro Boss</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navoptions}</ul>
        </div>
        <div className="navbar-end">
          <a className="btn bg-slate-900 text-white hover:bg-orange-950">Get Started</a>
        </div>
      </div>
    </>
  );
};

export default Navbar;
