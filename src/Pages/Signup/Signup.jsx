import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";

const Signup = () => {
  const { signUpwithEmail, updateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate()
  const {
    register, reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    signUpwithEmail(data.email, data.password)
      .then(() => {
        const saveUser = {name: data.name, email: data.email}
        updateUserProfile(data.name, data.photoURL)
        .then(()=>{
          fetch('https://bistro-boss-server-g9yh1l47b-rbriyad2gmailcoms-projects.vercel.app/users',{
            method: 'POST',
            headers:{
              'content-type': 'application/json'
            },
            body: JSON.stringify(saveUser)
          })
          .then(res => res.json())
          .then(data => {
            if(data.insertedId){
              reset()
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Account Create Successfull",
                showConfirmButton: false,
                timer: 1500
              });
              navigate('/')
            }
          })
        })
      })
  };

  return (
    <>
      <Helmet>
        <title>Signup | Bistro Boss Bistro Boss </title>
      </Helmet>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col">
          <div className="text-center w-8/12">
            <h1 className="text-5xl font-bold">SignUp Account!</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
          </div>
          <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  placeholder="name"
                  {...register("name")}
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">PhotoURL</span>
                </label>
                <input
                  type="text"
                  placeholder="PhotoURL"
                  {...register("photoURL")}
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input required
                  type="email"
                  placeholder="email"
                  {...register("email")}
                  className="input input-bordered"
                />
                {errors.email && <span>Input Valid Email</span>}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  {...register("password")}
                  placeholder="password"
                  className="input input-bordered"
                />
                {errors.password && <span>Please Input Valid Password</span>}
                <label className="label">
                  <Link to="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </Link>
                </label>
              </div>
              <div className="form-control mt-6">
                <input
                  className="btn btn-primary"
                  value="SignUp"
                  type="submit"
                />
              </div>
            </form>
            <p className="pb-16 text-center">
              Already have an Account ?{" "}
              <Link className="text-orange-600 font-bold" to="/login">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
