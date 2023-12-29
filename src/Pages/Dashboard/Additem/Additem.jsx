import React from "react";
import { useForm } from "react-hook-form";
import { ImSpoonKnife } from "react-icons/im";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const img_host_token = import.meta.env.VITE_IMAGE_HOST;
const Additem = () => {
const [axiosSecure]= useAxiosSecure()
    const imgHost = `https://api.imgbb.com/1/upload?key=${img_host_token}`

  const { register, handleSubmit , reset} = useForm();

  const onSubmit = data => {
    Swal.fire({
        title: "Are you sure?",
        text: "You want to add this item",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Add"
      }).then((result) => {
        if (result.isConfirmed) {
            const formData = new FormData()
            formData.append('image', data.image[0])
            fetch(imgHost,{
                method: 'POST',
                body:formData
            })
            .then(res => res.json())
            .then(imageResponse =>{
                if(imageResponse.success){
                    const imgUrl = imageResponse.data.display_url;
                    const {name, category, price, recipe}= data;
                    const newItem = {name, category: category.toLowerCase(), recipe, price: parseFloat(price), image: imgUrl}
                    
                    axiosSecure.post('/menu', newItem)
                    .then(data =>{
                        if(data?.data?.insertedId){
                            reset()
                            Swal.fire({
                                title: "Success",
                                text: "Item Added Successfull",
                                icon: "success"
                              });
                        }
                    })
                }
            })
        }
      });



  };

  return (
    <div className="bg-slate-100 p-9 mx-4 rounded-lg w-full">
      <h2 className="text-2xl font-bold text-center">Add a items</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Recipe name*</span>
          </div>
          <input required
            type="text"
            {...register("name", {})}
            placeholder="Recipe name"
            className="input input-bordered w-full"
          />
        </label>
        
        <div className="flex justify-between my-3">
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Category*</span>
            </div>

            <select {...register("category")} required className="select select-bordered">
              <option>SALAD</option>
              <option>PIZZA</option>
              <option>SOUP</option>
              <option>DESSERTS</option>
              <option>DRINKS</option>
            </select>
          </label>

          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Price*</span>
            </div>
            <input
              type="number"
              {...register("price", {})} required
              placeholder="Price"
              className="input input-bordered w-full max-w-xs"
            />
          </label>
        </div>
        <textarea
          {...register("recipe", {})} required
          className="textarea w-full my-5 h-20 textarea-bordered"
          placeholder="Recipe Details"
        ></textarea>
<div>
<input type="file" {...register("image", {})} required className="file-input file-input-bordered file-input-sm max-w-xs" />
</div>

        <button className="bg-[#835D23] btn btn-active btn-neutral mt-5">
        <input placeholder="Add a Item" type="submit" /> <ImSpoonKnife />
        </button>
      </form>
    </div>
  );
};

export default Additem;
