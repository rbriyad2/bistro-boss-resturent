import React, { useContext, useEffect, useState } from "react";
import {
  LoadCanvasTemplate,
  loadCaptchaEnginge,
  validateCaptcha,
} from "react-simple-captcha";
import { AuthContext } from "../../providers/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import { FaGoogle } from "react-icons/fa";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { loginWithEmail, signInwithGoogle } = useContext(AuthContext);
  const [disabled, setDisabled] = useState(true);
  const froms = location.state?.from?.pathname || "/";

  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);

  const handleLogin = (event) => {
    event.preventDefault();
    const from = event.target;
    const email = from.email.value;
    const password = from.password.value;
    loginWithEmail(email, password).then(() => {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Login Successfull",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate(froms, { replace: true });
    });
  };

  const handleGoogleLogin = () => {
    signInwithGoogle().then((result) => {
      const loggedUser = result.user;
      const saveUser = {
        name: loggedUser.displayName,
        email: loggedUser.email,
      };
      fetch("https://bistro-boss-server-g9yh1l47b-rbriyad2gmailcoms-projects.vercel.app/users",{
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(saveUser),
      })
        .then((res) => res.json())
        .then(() => {
            navigate(froms, { replace: true });
        });
    });
  };

  const handlevalidateCapcha = (e) => {
    const chapcha = e.target.value;
    if (validateCaptcha(chapcha)) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };


  return (
    <>
      <Helmet>
        <title>Login | Bistro Boss</title>
      </Helmet>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col">
          <div className="text-center w-8/12">
            <h1 className="text-5xl font-bold">Login now!</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
          </div>
          <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={handleLogin} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  name="email"
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="password"
                  className="input input-bordered"
                />
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>
              <div className="form-control">
                <label className="label">
                  <LoadCanvasTemplate />
                </label>
                <input
                  onBlur={handlevalidateCapcha}
                  type="text"
                  name="chapcha"
                  placeholder="Type above chapcha"
                  className="input input-bordered"
                />
              </div>
              <div className="form-control mt-6">
                <input
                  disabled={false}
                  className="btn btn-primary"
                  value="Login"
                  type="submit"
                />
              </div>
            </form>
            <p className="pb-5 text-center">
              Don't have an Account ?{" "}
              <Link
                className="text-orange-600 font-bold hover:text-red-600"
                to="/signup"
              >
                Signup
              </Link>
            </p>
            <div className="text-center mb-4">
              <button
                onClick={handleGoogleLogin}
                className="rounded-full p-4 bg-sky-900"
              >
                <FaGoogle className="text-3xl text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
