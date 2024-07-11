import React, { useContext } from "react";
import { AuthContext } from "../../contexts/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import LoadingSpinner from "../../Components/LoadingSpinner";

const PrivateRouter = ({ children }) => {
  const { user, createUser, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {        // if loading is true this show spinner componenet
    return <LoadingSpinner />;
  }

  if (user) {       // if user is logged in then show child component
    return children;
  }

  return <Navigate to="/signup" state={{ from: location }} replace></Navigate>;
};

export default PrivateRouter;