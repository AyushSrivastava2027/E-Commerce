import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { authContext } from '../context/AuthContext';
import { motion } from 'motion/react'
import toast from 'react-hot-toast';


const Navbar = () => {
    const { user, logout, loggedIn, setSearch } = useContext(authContext);
    const { cartProducts } = useContext(authContext);
    const [showMenu, setShowMenu] = useState(false);
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const handleLogout = () => {
        logout();
        setShowMenu(false);

    }

    return (
        <motion.nav
            initial={{ y: -30 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="bg-gray-800  text-white border-gray-200 dark:bg-gray-900  sticky top-0 z-10">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between h-20 md:h-max mx-auto p-2 px-5 md:p-3 md:px-10">
                {/* Logo */}
                <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <span className="self-center text-2xl font-bold whitespace-nowrap dark:text-white">Grabbly</span>
                </Link>
                <div className="relative hidden md:block">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <i className="bi bi-search text-gray-500 dark:text-gray-400"></i>
                    </div>
                    <input
                        type="text"
                        onChange={(e) => setSearch(e.target.value)}
                        className="block w-full p-3 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 
              focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 
              dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Search..."
                    />
                </div>

                {/* Right Section: Search + Cart + Profile */}
                <div className="flex items-center md:order-2 md:space-x-8 space-x-4  ">
                    {/* Search Input (Desktop only) */}

                   {showSearch ? (
  <div className="relative flex items-center h-10">
    <input
      type="text"
      autoFocus
      onChange={(e) => setSearch(e.target.value)}
      className="border border-gray-300 rounded-md pl-3 pr-8 py-2 text-sm text-gray-700 w-30 bg-white focus:outline-none"
      placeholder="Search..."
    />
    <i
      onClick={() => {
        setSearch("");
        setShowSearch(false);
      }}
      className="bi bi-x absolute right-2 text-gray-500 text-lg cursor-pointer"
    ></i>
  </div>
) : (
  <i
    onClick={() => setShowSearch(true)}
    className="bi bi-search font-bold text-2xl text-white md:hidden dark:text-gray-400"
  ></i>
)}


                    {/* Cart Icon */}
                    <div className="relative">
                        <i onClick={() => localStorage.getItem('loggedInUser') ? navigate('/mycart') : toast.error("Login First!")} className="bi bi-cart-fill text-2xl md:text-3xl cursor-pointer hover:text-blue-400"></i>
                        <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs font-bold rounded-full px-1.5 py-0.5">
                            {cartProducts ? cartProducts.length : 0}
                        </span>
                    </div>

                    {/* Profile Icon */}
                    {
                        localStorage.getItem('loggedInUser') ? <><i className="bi bi-person-circle text-2xl md:text-3xl cursor-pointer hover:text-blue-400" onClick={() => showMenu === true ? setShowMenu(false) : setShowMenu(true)} ></i></> : <>
                            <div className='hidden gap-2 md:flex'>
                                <Link to='/login' className='text-gray-800 bg-white p-1 px-2 text-md md:text-md md:px-4 cursor-pointer rounded-md'>Login</Link>
                                <Link to='/signup' className='text-gray-800 bg-white p-1 px-2 text-md md:text-md md:px-4 cursor-pointer rounded-md'>Signup</Link>
                            </div>
                             <Link to='/login' className='text-gray-800 md:hidden bg-white p-1 px-2 text-md md:text-md md:px-4 cursor-pointer rounded-md'>SignIn</Link>
                        </>
                    }

                    {/* Hamburger Menu (Mobile) */}

                </div>
            </div>

            {
                showMenu ? <> <ul className="absolute right-5 top-13 z-10 w-50  bg-gray-100 rounded-lg shadow-lg text-gray-800 overflow-hidden">
                    <i onClick={() => setShowMenu(false)} className=' absolute right-5 text-lg bi bi-x' style={{ fontFamily: 'monospace' }}></i>
                    <li className="border-b mt-2 text-sm md:text-md border-gray-300 text-center py-2 hover:bg-gray-200 cursor-pointer"><button>Profile</button></li>
                    <li className="border-b text-sm md:text-md border-gray-300 text-center py-2 hover:bg-gray-200 cursor-pointer">Setting</li>
                    <li className="border-b border-gray-300 text-sm md:text-md text-center py-2 hover:bg-gray-200 cursor-pointer">My Orders</li>
                    <li onClick={handleLogout} className="text-center py-2 hover:bg-red-100 text-sm md:text-md text-red-600 font-semibold cursor-pointer">Log Out</li>
                </ul></> : ''
            }



        </motion.nav >
    );
};

export default Navbar;
