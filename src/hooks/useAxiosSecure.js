import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";
// these hooks helps to provide access based control for URL and also base URL need not to be written again and again
// this axios hook is verified using token

// creating axios instance of baseURL
const axiosSecure = axios.create({
  baseURL: "http://localhost:5000",
});

// axios secure is for those that needs to be secure and private
const useAxiosSecure = () => {
  
  const navigate = useNavigate();
  const { logOut } = useAuth();

  // Axios interceptors are middleware functions that allow you to tap into the request and response flows.
  // Add a request interceptor
  axiosSecure.interceptors.request.use(
    function (config) {
      // Do something before request is sent
      const token = localStorage.getItem("access-token");
      config.headers.authorization = `Bearer ${token}`;
      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    }
    
  );

  // Add a response interceptor
  axiosSecure.interceptors.response.use(
    function (response) {
      return response;
    },

    async (error) => {
      const status = error.response.status;

      if (status === 401 || status === 403) {
        await logOut();
        navigate("/login");
      }

      return Promise.reject(error);
    }
  );

  return axiosSecure;
};

export default useAxiosSecure;