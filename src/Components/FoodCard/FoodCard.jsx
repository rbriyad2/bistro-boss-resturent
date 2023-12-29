import React, { useContext } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import Swal from 'sweetalert2';
import { useLocation, useNavigate } from 'react-router-dom';
import useCart from '../../hooks/useCart';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FoodCard = ({item}) => {
  
  const {user} = useContext(AuthContext)
  const {image, name, price, recipe, _id} = item;
  const [ ,refetch]= useCart()
  const navigate = useNavigate()
  const location= useLocation()

  const addtoCart = item =>{
    if(user && user.email){
      const cartItem = {menuitemId: _id, image, price, name, email: user.email}
      fetch('https://bistro-boss-server-g9yh1l47b-rbriyad2gmailcoms-projects.vercel.app/carts', {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(cartItem)
      })
      .then(res => res.json())
      .then(data => {
        if(data.insertedId){
          refetch()
          toast.success('Food Added!', {
            position: "top-right",
            autoClose: 500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            });
        }
      })
    }
    else{
      Swal.fire({
        title: "Please Login?",
        text: "After Login Add to Cart!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Go Gogin!"
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/login', {state: {from: location}})
        }
      });
    }
    
  }
  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <figure>
        <img
          src={image}
          alt="Shoes"
        />
      </figure>
      <p className="absolute right-0 mr-4 mt-4 rounded bg-slate-950 px-5 py-2 text-white">${price}</p>
      <div className="card-body">
        <h2 className="card-title text-2xl font-semibold justify-center">{name}</h2>
        <p className="w-3/9">{recipe}</p>
        <div className="card-actions justify-center">
          <button onClick={()=>addtoCart(item)} className="btn bg-slate-200 hover:bg-black border-0 border-b-4 hover:border-b-0 border-b-orange-400 hover:text-white">Add to Cart</button>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default FoodCard;