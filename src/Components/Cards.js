import React, { useContext, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FaHeart } from "react-icons/fa";
import { AuthContext } from '../contexts/AuthProvider';
import Swal from 'sweetalert2'
import axios from "axios";
import useCart from '../hooks/useCart';


const Cards = ({item}) => {
    // destructure item
    const { name, image, price, recipe, _id } = item;

    const [isHeartFilled , setHeartFilled] = useState(false);       // if heart is not filled allowing adding item to cart/wishlist
    
    const {user} = useContext(AuthContext);
    const [cart, refetch] = useCart();
  
    const navigate = useNavigate();
    const location = useLocation();

    const handleHeartClick = () => {
        setHeartFilled( !isHeartFilled );
    }

    // add to cart handler
  const handleAddToCart = (item) => {
    
    if (user && user.email) {
      const cartItem = {
        menuItemId: _id,
        name,
        quantity: 1,
        image,
        price,
        email: user.email,
      };

      axios
        .post("http://localhost:5000/carts", cartItem)
        .then((response) => {
          console.log(response);
          if (response) {
            refetch();  // refetch cart

            Swal.fire({
              position: "center",
              icon: "success",
              title: "Food added on the cart.",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        })
        .catch((error) => {
          console.log(error.response.data.message);
          const errorMessage = error.response.data.message;
          Swal.fire({
            position: "center",
            icon: "warning",
            title: `${errorMessage}`,
            showConfirmButton: false,
            timer: 1500,
          });
        });
    } 
    else {
      Swal.fire({
        title: "Please login to order the food",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Login now!",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login", { state: { from: location } });
        }
      });
    }
  };


  return (
    <>
      <div className="card w-96 bg-base-100 shadow-xl relative">
        
        <div
            className={`rating gap-1 absolute right-2 top-2 p-4 heartStar bg-blue mr-4 ${
            isHeartFilled ? "text-rose-500" : "text-white"
            }`}
            onClick={handleHeartClick}
        >
            <FaHeart className="h-5 w-5 cursor-pointer " />
        </div>
        
        <Link to={`/menu/${item._id}`}>
            <figure>
                <img src={item.image} className="hover:scale-105 transition-all duration-200 md:h-32 md:w-42 gap-10 "/>
            </figure>
        </Link>
        
        <div className="card-body">
            <h2 className="card-title">{item.title}</h2>
            <Link to={`/menu/${item._id}`}></Link>
            <p>{item.recipe}</p>
            <div className="card-actions justify-between items-center mt-2">
                <h5 className="font-semibold">
                    <span className="text-sm text-red">$</span>
                    {item.price}
                </h5>
                <button className="btn bg-blue text-white" onClick={()=> handleAddToCart(item)}>
                    Add to Cart
                </button>
            </div>
        </div>
      </div>
    </>
  )
}

export default Cards
