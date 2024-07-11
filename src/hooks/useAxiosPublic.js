import axios from "axios";

// these hooks helps to provide access based control for URL and also base URL need not to be written again and again


// creating axios instance of base URL
const axiosPublic = axios.create({
  baseURL: "http://localhost:5000",
});

// axios public is for those URL that can be accesed publically
const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;