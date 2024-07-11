import React, { useContext, useState } from 'react'
import { FaFacebook, FaGoogle, FaMicrosoft } from 'react-icons/fa';
import {Link, useLocation, useNavigate} from "react-router-dom";
import { useForm } from "react-hook-form";
import { AuthContext } from '../contexts/AuthProvider';


const Modal = () => {
  const { register, handleSubmit, watch, formState: { errors }, } = useForm();      // this is used from react-hook-form is a special react hook that handles Signup/login form input data , it validates the data as enterd, so manually using multiple usestates for each input feild is not required
    
  const [errorMessage, setErrorMessage] = useState("");

  const authContext = useContext(AuthContext);
  const signUpWithGmail = authContext.signUpWithGmail;              // import this signUpWithGmail to use in here
  const login = authContext.login;

  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || "/";


  // handling login via google sign up
    const handleLogin = () => {
      signUpWithGmail()
      .then((result) => {                   // format as mentioned in the firebase doc (doc link mentioned in firebase.config.js)
          const user = result.user;
          alert("Login Successful");
          window.location.reload();
        })
      .catch((error) => console.log(error));
    };
    
    // on submit of this form execute this
    const onSubmit = (data) => {

        const email = data.email;
        const password = data.password;

        login(email, password)
        .then((result) => {
            const user = result.user;
            document.getElementById("my_modal_5").close();      // close the modal once succesfully logged in
            navigate(from, { replace: true });
            
            alert("Login succesfull");
        })
        .catch((error) => {
            const errorMessage = error.message;
            setErrorMessage("provide a correct email and password ");
        });

    } 

  return (
    <>
    {/*  the code is used from daisyUi
         and then some modifications are done to it */}

        <dialog id="my_modal_5" className="modal modal-middle sm:modal-middle">
            <div className="modal-box ">
                <div className="modal-action flex flex-col justify-center -mt-4">
                    {/*  Form for the login inputs */}
                    <form className="card-body" method='dialog' onSubmit={handleSubmit(onSubmit)}>     {/* When a form's method is dialog , the state of the form is saved but not submitted, and the dialog gets closed. Without an action , submitting the form via the default GET method causes a page to reload. */}
                        
                        <h1 className="font-bold text-lg text-center">Please Login!</h1>
                        
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" placeholder="email" className="input input-bordered" required {...register("email")} />         {/* The email entered in the input box is now registered */}
                        </div>
                        
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" placeholder="password" className="input input-bordered" required {...register("password")} />    {/* The passowrd entered in the input box is now registered */}
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        
                        {/* errors */}

                        {
                            errorMessage ? (
                                <p className="text-red text-xs"> {errorMessage}</p>
                                ) : (
                                ""
                            )
                        }

                        {/* login btn */}
                        <div className="form-control mt-6">
                            <input type='submit' value="Login" className="btn bg-blue"/>
                        </div>



                        <p className="text-center my-2">
                            Don't have an account?
                            <Link
                                to="/signup"
                                className="underline text-blue ml-2"
                                onClick={() => document.getElementById("my_modal_5").close()}
                            >
                                SignUp!
                            </Link>
                        </p>

                        <button
                        htmlFor="my_modal_5"
                        onClick={() => document.getElementById("my_modal_5").close()}
                        className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                        >
                        ✕
                        </button>


                    </form>

                {/* Social Media handles */}
                    <div className="text-center">

                        <button className="btn btn-circle hover:bg-blue hover:text-white  m-4 " onClick={handleLogin}>
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
            </div>
        </dialog>

    </>
  )
}

export default Modal
