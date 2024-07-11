import React, { useContext } from 'react'
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FaFacebook, FaGoogle, FaMicrosoft } from "react-icons/fa";
import Modal from "./Modal";
import { AuthContext } from '../contexts/AuthProvider';
import useAxiosPublic from '../hooks/useAxiosPublic';

const Signup = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();
    
    const authContext = useContext(AuthContext);
    const createUser = authContext.createUser;
    const login = authContext.login;
    const updateUserProfile = authContext.updateUserProfile;
    const signUpWithGmail = authContext.signUpWithGmail;

    const axiosPublic = useAxiosPublic();

    const location = useLocation();
    const navigate = useNavigate();

    const from = location.state?.from?.pathname || "/";

    // on successfull submission of signup form execute this
    const onSubmit = (data) => {

        const email = data.email;
        const password = data.password;

        createUser(email, password)
          .then((result) => {
            // Signed up
            const user = result.user;

            updateUserProfile(data.email, data.photoURL).then(() => {
              const userInfo = {
                name: data.name,
                email: data.email,
              };
    
              axiosPublic.post("/users", userInfo).then((response) => {
                alert("Signin successful!");
                navigate(from, { replace: true });
              });

            });
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
            console.log(errorMessage);
          });
    };
      
    // signup with google
    const handleRegister = () => {
        signUpWithGmail()
          .then((result) => {
            const user = result.user;
            const userInfo = {
              name: result?.user?.displayName,
              email: result?.user?.email,
            };
            axiosPublic.post("/users", userInfo).then((response) => {
              
              alert("Signin successful!");
              navigate("/");
            });
          })
          .catch((error) => console.log(error));
      };
    
  return (
    <>
        <div className="max-w-md bg-white shadow w-full mx-auto text-center flex justify-center my-20 rounded-2xl">
            
                    
            <div className="modal-action flex flex-col justify-center  mt-0">
                
                {/* Signup form (refered from react-hook-form doc)  */}
                <form
                className="card-body"
                method="dialog"
                onSubmit={handleSubmit(onSubmit)}
                >
                    <h1 className="font-bold text-lg text-center text-bold text-black">Create an Account </h1>
                    
                    <div className="form-control">
                        <label className="label">
                        <span className="label-text text-bold text-black">Email</span>
                        </label>
                        <input
                        type="email"
                        placeholder="email"
                        className="input input-bordered"
                        required
                        {...register("email")}
                        />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-black text-bold">Password</span>
                        </label>
                        <input
                        type="password"
                        placeholder="password"
                        className="input input-bordered"
                        required
                        {...register("password")}
                        />
                        <label className="label">
                        <a href="#" className="label-text-alt link link-hover text-bold text-black mt-2">
                            Forgot password?
                        </a>
                        </label>
                    </div>

                    {/* errors */}

                    {/* sign btn */}
                    <div className="form-control mt-6">
                        <input type="submit" value="Signup" className="btn bg-blue" />
                    </div>

                    <p className="text-center my-2 text-black">
                        Already have an account?
                        <button
                        className="underline text-red ml-2"
                        onClick={() => document.getElementById("my_modal_5").showModal()}
                        >
                            Login!
                        </button>
                    </p>
                   
                    {/* <Link to="/" className="btn btn-sm btn-circle absolute ">
                        ✕
                    </Link>
                     */}

                    

                     

                </form>

                

                {/* social sign in */}
                <div className="text-center">
                <button className="btn btn-circle hover:bg-blue hover:text-white  m-4" onClick={handleRegister}>
                    <FaGoogle />
                </button>
                <button className="btn btn-circle hover:bg-blue hover:text-white  m-4">
                    <FaMicrosoft />
                </button>
                <button className="btn btn-circle hover:bg-blue hover:text-white  m-4">
                    <FaFacebook />
                </button>
                </div>
            
            </div>

        {/* this is added so that login modal opens up  */}
            
            <Modal />
            
        </div>
    </>
  )
}

export default Signup
