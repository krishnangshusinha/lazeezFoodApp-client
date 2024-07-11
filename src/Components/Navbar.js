import React, { useContext, useEffect, useState } from 'react'
import { FaRegUser } from "react-icons/fa";
import Modal from './Modal';
import { AuthContext } from '../contexts/AuthProvider';
import Profile from './Profile';
import { Link } from 'react-router-dom';
import useCart from '../hooks/useCart';


// This navbar component is being made using daisyui i.e a very popular framework of tailwind CSS follow this documentation of how to use it --> https://daisyui.com/docs/install/
// Follow instruction to install the dependency and use it

// The following navbar code is used from daisyui(under components section), and modification are done to it.


const Navbar = () => {
    const [isSticky, setSticky] = useState(false);

    const {user , loading} = useContext(AuthContext);

    const [cart, refetch] = useCart();


    // this useEffect hook mainly handles the scrolling of the screen , indicating our Navbar sticky
    useEffect(()=> {
        const handlescroll = () => {
            const offset = window.scrollY;
            if( offset > 0 ){
                setSticky(true);
            }
            else{
                setSticky(false);
            }

            // incase we have scrolling event call this handlescroll method
            window.addEventListener("scroll" , handlescroll);

            return () => {
                window.addEventListener("scroll" , handlescroll);
            }
        }
    }, [])

  return (
    <>
      <header className='max-w-screen-2xl container mx-auto sticky top-0 right-0 left-0'>

        <div className="navbar bg-base-100">
      
            <div className="navbar-start">
                <div className="dropdown">
                <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                </div>
                <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                    <li><a>Item 1</a></li>
                    <li>
                    <a>Parent</a>
                    <ul className="p-2">
                        <li><a>Submenu 1</a></li>
                        <li><a>Submenu 2</a></li>
                    </ul>
                    </li>
                    <li><a>Item 3</a></li>
                </ul>
                </div>
                <a href="/" className="btn btn-ghost text-xl">
                    <img src='/images/home/logo.png' alt='' height={50} width={50} /> Lazeez
                </a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <li><a href='/'>Home</a></li>
                    <li tabIndex={0}>
                        <details>
                            <summary>Menu</summary>
                            <ul className="p-2">
                                <li><a href='/menu'>All Menu</a></li>
                                {/* <li><a>Pizza</a></li>
                                <li><a>Biriyani</a></li> */}
                            </ul>
                        </details>
                    </li>
                    <li tabIndex={0}>
                        <details>
                            <summary>Services</summary>
                            <ul className="p-2">
                                <li><a>Online Order</a></li>
                                <li><a>Dine In</a></li>
                                <li><a>Order Tracking</a></li>
                            </ul>
                        </details>
                    </li>
                    <li><a>Offers</a></li>
                </ul>
            </div>
            <div className="navbar-end">

                {/* search button */}
                <button className="btn btn-ghost btn-circle hidden lg:flex">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                    </svg>
                </button>

                {/* Cart Items */}
                <Link to ="/cart-page">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle mr-3 lg:flex hidden flex items-center justify-center">
                        <div className="indicator">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                            <span className="badge badge-sm indicator-item">{cart.length || 0}</span>
                        </div>
                    </div>
                </Link>
                
                {/* Login button */}

                {
                    user ? (
                        <div>
                            <Profile user={user} />
                        </div>
                    ) :
                    (
                        <button className="btn bg-blue rounded-full" onClick={() => document.getElementById("my_modal_5").showModal()}>
                            <FaRegUser />Login 
                        </button>
                    )
                
                }

                {/* For the login modal */}
                <Modal/>
            </div>
        </div>
      </header>
    </>
  )
}

export default Navbar
