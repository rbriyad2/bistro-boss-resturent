import React from 'react';
import SectionTitle from '../../../Components/SectionTitle/SectionTitle';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import useMenu from '../../../hooks/useMenu';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const Manageitems = () => {
    const [menu, ,refetch] = useMenu()
    const [axiosSecure]= useAxiosSecure()
    const handleDeleteItem = id =>{
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then((result) => {
            if (result.isConfirmed) {
              axiosSecure.delete(`/menu/${id}`)
              .then(response =>{
                  console.log(response.data);
                    if(response.data.deletedCount > 0){
                        refetch()
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success"
                          });
                    }
                })
            }
          });
    }

    const handleUpdate=(item)=>{
        
    }
    return (
        <div className='bg-gray-200 p-8'>
            <SectionTitle heading={'Manage Items'} subheading={'All items Maintanance'}></SectionTitle>

            <div className="overflow-x-auto">
                <h2 className='text-2xl font-bold'>Total Items: {menu.length}</h2>
  <table className="table">
    {/* head */}
    <thead>
      <tr className="rounded-t-lg rounded-lg bg-[#D1A054] text-white">
        <th>#</th>
        <th>Item Image</th>
        <th>Item Name</th>
        <th>Price</th>
        <th>Update</th>
        <th>Delete</th>
      </tr>
    </thead>
    <tbody>

      {menu?.map((item, index) =>
      <tr key={item._id} className='hover'>
        <th> {index +1}</th>
        <td>
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="mask mask-squircle w-12 h-12">
                <img src={item?.image} alt="Avatar Tailwind CSS Component" />
              </div>
            </div>
          </div>
        </td>
        <td className='text-xl font-semibold'>{item?.name}</td>
        <td>${item?.price}</td>
        <td><button onClick={()=>handleUpdate(item)} className="btn btn-square bg-black hover:bg-green-950"><FaEdit className='text-white' /></button></td>
        <td><button onClick={()=>handleDeleteItem(item?._id)} className="btn btn-square bg-black hover:bg-red-700"><FaTrashAlt className='text-white' /></button></td>
      </tr>)}


    </tbody>

    
  </table>
</div>
        </div>
    );
};

export default Manageitems;