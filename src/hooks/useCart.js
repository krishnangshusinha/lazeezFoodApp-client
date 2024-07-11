import React, { useContext } from 'react'
import { AuthContext } from '../contexts/AuthProvider'
import { useQuery } from '@tanstack/react-query';

const useCart = () => {
  const {user} = useContext(AuthContext);
  const token = localStorage.getItem("access-token");


// Refered from tanstack-react-query doc
// this function is used to refetch queries based on certain conditions
  const { refetch, data: cart = [] } = useQuery({

    queryKey: ["carts", user?.email],

    queryFn: async () => {
      const res = await fetch(
        `https://lazeezfoodapp-server.onrender.com/carts?email=${user?.email}`,
        {
          headers: {
            authorization: `Bearer ${token}`,   // to ensure only indivisual with valid token can access the url 
          },
        }
      );
      
      return res.json();
    },
  
  });

  return [cart, refetch];

}

export default useCart
