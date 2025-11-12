import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaAlignRight, FaShopify, FaUser } from "react-icons/fa";
import { IoFastFoodOutline } from "react-icons/io5";
import { CiUser, CiLogout } from "react-icons/ci";
import { FiUser } from "react-icons/fi"
import { IoMdClose } from "react-icons/io";
import { PiSignIn } from "react-icons/pi";
import { useDispatch, useSelector } from 'react-redux';
import {clearCart }from '../Store/Cart';
import Cart from './Cart';
import toast from 'react-hot-toast';
import { logout } from '../Store/userSlice';

const Header = () => {
  const [togel, setTogle] = useState(true);
  const [open, setOpen] = useState(false);
  const [togelProfile, setTogelProfile] = useState(false);
  const [products, setProducts] = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.user);
  const carts = useSelector(state => state.cart.items);

  const TotalQuantity = carts.reduce((total, item) => total + item.quantity, 0);
  const subtotal = carts.reduce((acc, item) => {
    const product = products.find(p => p._id === item.productId);
    return product ? acc + product.price * item.quantity : acc;
  }, 0);
  const delivery = subtotal > 0 ? 0.75 : 0;
  const total = subtotal ;

  // Fetch products
  useEffect(() => {
    const fetchFood = async () => {
      try {
        const res = await fetch("https://fastbietres-4.onrender.com/api/foods/getfood");
        if (!res.ok) throw new Error(`HTTP error ${res.status}`);
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch food");
      }
    };
    fetchFood();
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      const menu = document.getElementById("mobile-menu");
      const toggleBtn = document.getElementById("mobile-toggle");
      if (menu && !menu.contains(e.target) && toggleBtn && !toggleBtn.contains(e.target)) {
        setTogle(true);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);



  return (
    <div>
      <div className="py-4 w-[97%] md:w-full mx-auto shadow-sm shadow-slate-900 backdrop-blur-xl flex gap-x-10 justify-between items-center rounded-lg fixed top-[1px] px-2 md:px-7 left-1.5 text-gray-700 font-bold z-90">
        {/* Logo */}
        <div className="text-yellow-500 font-Poppins font-bold  text-xl">FastBite</div>

        {/* Desktop Navigation */}
        <div className="hidden md:block relative">
          <ul className="flex gap-6 text-xl">
            
            <Link to='/home' className="text-yellow-500 border-b-2 font-Poppins  hover:scale-110">Home</Link>
            
            <Link to='/about' className="text-gray-300 font-Poppins  hover:scale-110">About</Link>
           
            <Link to='/menu' className="text-gray-300 font-Poppins  hover:scale-110">Menu</Link>
          
            <Link to='/contact' className="text-gray-300 font-Poppins  hover:scale-110">ContactUs</Link>
          </ul>
        </div>

        {/* Right icons */}
        <div className="relative flex justify-between items-center gap-6">
          {/* Cart icon */}
          <button onClick={() => setOpen(!open)} className="text-3xl  text-white hover:text-yellow-500 relative">
            <span className="absolute text-[20px] -top-3 -right-4  text-yellow-500 px-1 rounded-full">{TotalQuantity}</span>
            <IoFastFoodOutline className='font-extralight' size={23}/>
          </button>

          {/* Profile dropdown */}
          {user ? (
            <div className="relative">
              <Link to={'/profile'}  className="flex justify-center items-center  text-black px-2 p-1" >
                <p className="text-2xl hover:text-yellow-500 text-white">{togelProfile ? <IoMdClose /> : <FiUser size={28}/> }</p>
                
              </Link>
            </div>
          ) : (
            <Link to="/login" className="text-white rounded border-yellow-500 hover:border-yellow-500 hover:text-yellow-400 transition-colors py-2 px-5 text-sm font-extrabold flex justify-center items-center gap-3">
              <PiSignIn className='font-extralight' size={23} />
              SignIn
            </Link>
          )}

          {/* Mobile menu toggle */}
          <button id="mobile-toggle" onClick={() => setTogle(!togel)} className="block md:hidden text-2xl hover:text-yellow-500 text-white">
            {togel ? <FaAlignRight className='font-extralight' size={23} /> : <IoMdClose className='font-extralight' size={23}/>}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          id="mobile-menu"
          className={`${togel ? "-translate-y-[1000px]" : "-translate-y-0"} fixed bg-gradient-to-r from-black via-zinc-900 to-black border-b  backdrop-blur-xl shadow-2xl top-17 left-0 right-0 min-w-[320px] max-w-full rounded-md z-10 transition-transform duration-300`}
        >
          <ul className="flex flex-col gap-2 py-4 px-4 max-w-1/1 mx-auto text-gray-300">
            <div className="flex gap-6 jusfty-center">
            
            <Link to='/home' className="text-yellow-500 border-b-2 font-Poppins  hover:scale-110">Home</Link>
            </div>
            <div className="flex gap-3 jusfty-center">
           
            <Link to='/about' className="text-gray-300 font-Poppins  hover:scale-110">About</Link>
            </div>
              <div className="flex gap-3 jusfty-center">
            
            <Link to='/menu' className="text-gray-300 font-Poppins  hover:scale-110">Menu</Link>
            </div>
                        <div className="flex gap-3 jusfty-center">
           
            <Link to='/contact' className="text-gray-300 font-Poppins  hover:scale-110">Contact</Link>
            </div>
          </ul>
        </div>

        {/* Cart sidebar */}
        <div className="absolute right-0 top-20 z-[100]">
          <div className={`absolute h-[60vh] min-h-96 min-w-[300px] right-1 rounded-xl bg-black text-gray-700 shadow-2xl transform transition-transform duration-300 ease-in-out ${open ? "translate-x-0" : "translate-x-[1000px]"}`}>
            <div className="flex justify-between items-center p-4 bg-yellow-500 rounded-t-xl h-20 text-white">
              <h2 className="text-xl font-bold">Cart</h2>
              <button onClick={() => setOpen(false)} className="text-gray-100 text-2xl"><IoMdClose /></button>
            </div>

            <div className="w-[350px] max-w-300 max-h-82 pb-10 overflow-auto mb-10">
              <div className="p-4 flex flex-col gap-4 rounded-lg">
                <Cart products={products} fallbackLink="#" />
              </div>
            </div>

            <div className="mt-2 absolute right-0 left-0 bottom-0 bg-yellow-500 px-3 text-white rounded-b-xl p-4">
              <p className="flex justify-between"><span>Subtotal</span> <span>${subtotal.toFixed(2)}</span></p>
              
              <p className="flex justify-between font-bold text-lg"><span>Total</span> <span>${total.toFixed(2)}</span></p>
              <Link to='/checkout' onClick={() => setOpen(false)} className="px-10 flex justify-center mt-4 py-2 bg-black hover:bg-[#0e0d0df8]  text-white rounded">
                Checkout ${total.toFixed(2)}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
