import React from 'react';
import { Helmet } from 'react-helmet-async';
import useCart from '../../hooks/useCart';
import SectionTitle from '../../Components/SectionTitle/SectionTitle';
import { FaTrashAlt } from "react-icons/fa";
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';


const Mycart = () => {
    const [cart, refetch]= useCart()
    const total = parseFloat(cart.reduce((sum, item) => item.price + sum, 0).toFixed(2));

    const handleDelete = item =>{
        Swal.fire({
            title: "Are you sure?",
            text: "You want delete this item!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then((result) => {
            if (result.isConfirmed) {
              fetch(`https://bistro-boss-server-g9yh1l47b-rbriyad2gmailcoms-projects.vercel.app/carts/${item._id}`,{
                method: 'DELETE'
              })
              .then(res=> res.json())
              .then(data =>{
                if(data.deletedCount > 0){
                    refetch()
                    Swal.fire({
                        title: "Deleted!",
                        text: "Deleted Successfull.",
                        icon: "success",
                        showConfirmButton: false,
                        timer: 500
                      });
                }
              })
            }
          });
    }
    return (
        <div>
            <Helmet>
        <title>Dashboard | Bistro Boss </title>
      </Helmet>
      <SectionTitle></SectionTitle>
      <div className='flex justify-between'>
      <h3>Total Item {cart.length}</h3>
      <h3>Total Price ${total}</h3>
      <Link  to='/dashboard/payment'><button className='btn mr-16 btn-warning bt-sm'>Pay</button></Link>
      </div>

      <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>#</th>
        <th>Food</th>
        <th>Item Name</th>
        <th>Price</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {cart.map((item, index)=> <tr className="hover cursor-pointer" key={item._id}>
        <th>{index +1}</th>
        <td>
          
            <div className="avatar">
              <div className="mask mask-squircle w-12 h-12">
                <img src={item.image} alt="Avatar Tailwind CSS Component" />
              </div>
            </div>
        </td>
        <td> {item.name}</td>
        <td className='text-end'>{item.price}</td>
        <th>
          <button onClick={()=>handleDelete(item)} className="btn btn-outline border-0 btn-error"><FaTrashAlt className='text-xl'/></button>
        </th>
      </tr>)}
    </tbody>
  </table>
</div>
        </div>
    );
};

export default Mycart;