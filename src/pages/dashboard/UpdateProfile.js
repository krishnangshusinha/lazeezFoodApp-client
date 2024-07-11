import React, { useContext } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { AuthContext } from "../../contexts/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";

const UpadateProfile = () => {
  const { updateUserProfile } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  // on submit of the form
  const onSubmit = (data) => {
    const name = data.name;
    const photoURL = data.photoURL;

    updateUserProfile(name, photoURL)
      .then(() => {
        window.location.reload();           // update and reload the page
        navigate(from, { replace: true });
      })
      .catch((error) => {});

  };

  return (

    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Update Profile!</h1>
          <p className="py-6">
            You can update or modify your profile anytime, feel free visit this
            website! Make sure you remenber the details
          </p>
        </div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                placeholder="name"
                className="input input-bordered"
                required
                {...register("name")}           
              />                                {/* The name entered in the input box is now registered */}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Upload photo</span>
              </label>
              <input
                {...register("photoURL")}
                type="text"
                placeholder="Enter URL of your photo"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary bg-blue text-white">
                Update Profile
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpadateProfile;