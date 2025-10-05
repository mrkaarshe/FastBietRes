import  aos from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';  
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import products from "../Products";
import { clearCart } from "../Store/Cart";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


const Checkout = () => {
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  
  const navigate = useNavigate();
  const userExisting = localStorage.getItem("user");

  const user = JSON.parse(userExisting);

  const [info, setInfo] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postal: "",
    phone: "",
  });

  const subtotal = cart.reduce((sum, item) => {
    const product = products.find((p) => p.id === item.productId);
    return sum + (product ? product.price * item.quantity : 0);
  }, 0);

  const shipping = cart.length > 0 ? 1 : 0; 
  const taxes = subtotal * 0.0035;
  const total = subtotal + shipping + taxes;

  const handleInputChange = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = () => {
    if (!info.email || !info.address || !info.city || !info.phone) {
      alert("Please fill all required fields!");
      return;
    }

    dispatch(clearCart());
    navigate("/order-confirmed");
    useEffect(()=>{
      aos.init({duration:1000},{once:true})
    },[userExisting])
  };

  return (
    <div className="max-w-6xl min-w-sm mx-auto mt-34 p-6 flex flex-col md:flex-row  gap-5">
      {/* Left: Form */}
      <div data-aos="fade-right" className="flex-1 max-h-[90vh] overflow-auto  p-6 shadow rounded-lg">

        {!user ? (<div className="flex justify-between my-5 items-center ">
          <span className="font-bold text-gray-300"> Please SignIn First</span>
          <Link to={'/login'} className='border-[#fa961d] text-white rounded-md border-1  px-10 py-1  hover:bg-[#fa961d] transition-colors '>SignIn</Link>
        </div>) : '' }


        <h2 className="text-2xl font-bold mb-4 text-[#fa961d]">Contact & Shipping</h2>
                <input name="email" onChange={handleInputChange} placeholder="Email" className="border-1 border-[#fa961d] placeholder-white text-white outline-[#fa961d] p-2 mb-3 w-full h-13 rounded-2xl"/>
        <div>
        <p className="text-[#fa961d] font-bold text-2xl my-2">Delivery</p>
        <select name="" id="" className="border-1 border-[#fa961d] placeholder-white text-white outline-[#fa961d] p-2 mb-3 w-full h-13 rounded-2xl" placeholder="Select Country">
          <option value="somalia" >somalia</option>
        </select>
        <div className="flex gap-3">
            <input name="firstName" onChange={handleInputChange} placeholder="First Name" className="border-1 border-[#fa961d] placeholder-white text-white outline-[#fa961d] p-2 mb-3 w-full h-13 rounded-2xl"/>
        <input name="lastName" onChange={handleInputChange} placeholder="Last Name" className="border-1 border-[#fa961d] placeholder-white text-white outline-[#fa961d] p-2 mb-3 w-full h-13 rounded-2xl"/>
        </div>
        <input name="address" onChange={handleInputChange} placeholder="Address" className="border-1 border-[#fa961d] placeholder-white text-white outline-[#fa961d] p-2 mb-3 w-full h-13 rounded-2xl"/>
       <div className="flex gap-3">
         <input name="city" onChange={handleInputChange} placeholder="City" className="border-1 border-[#fa961d] placeholder-white text-white outline-[#fa961d] p-2 mb-3 w-full h-13 rounded-2xl"/>
        <input name="postal" onChange={handleInputChange} placeholder="Postal Code (optional)" className="border-1 border-[#fa961d] placeholder-white text-white outline-[#fa961d] p-2 mb-3 w-full h-13 rounded-2xl"/>
       </div>
        <input name="phone" onChange={handleInputChange} placeholder="Phone" className="border-1 border-[#fa961d] placeholder-white text-white outline-[#fa961d] p-2 mb-3 w-full h-13 rounded-2xl"/>
        </div>
        <div className="flex justify-between items-center border-1 border-[#fa961d] placeholder-white text-white outline-[#fa961d]-1 rounded-lg py-3 px-2">
          <p>Delevery</p>
          <p>$2.00</p>
        </div>
        <h2 className="text-xl text-[#fa961d] font-bold mt-6 mb-3">Payment</h2>
        <p className='text-gray-300'>All transactions are secure. Use one of the methods below:</p>
        <div className="flex flex-col gap-x-3 border-1 border-[#fa961d] placeholder-white text-white outline-[#fa961d]-1 p-1 mt-3 rounded-lg">
        <div className="flex gap-5 border-b-1 border-[#fa961d] placeholder-white text-white  p-3 text-sm md:text-md">
           <input type="radio" name="payment" id="card" className=" w-5 md:w-10" />
           <p> EVC Plus: *712*614711110*$#</p>
            </div>
              <div className="flex gap-5 border-b-1 border-[#fa961d] placeholder-white text-white  p-3 text-sm md:text-md">
           <input type="radio" name="payment" id="card" className="w-5 md:w-10" />
           <p> eDahab: *712*624777710*$#</p>
            </div>
           <div className="flex gap-5  p-3  text-sm md:text-md">
           <input type="radio" name="payment" id="card" className="w-5 md:w-10" />
           <p> Premier Walet:  252614777710</p>
            </div>

        </div>
        {!user ? 
        (<button className="mt-6 w-full py-3 bg-[#fa961d] hover:bg-transparent hover:border-1 border-[#fa961d] text-white rounded-lg font-bold" >Sign In Frist   ${total.toFixed(2)}</button>) 
        : 
       ( <button onClick={handlePlaceOrder} className="mt-6 w-full py-3 bg-[#fa961d] hover:bg-transparent hover:border-1 border-[#fa961d] text-white rounded-lg font-bold">Place Order ${total.toFixed(2)}</button>) }
      </div>

      {/* Right: Order Summary */}
      <div data-aos="fade-left" className="min-w-[350px] max-w-lg   p-6 sm:p-2 shadow rounded-lg">
        <h2 className="text-2xl font-bold mb-4 text-[#fa961d] ">Order Summary</h2>
        <div className="max-h-136 overflow-auto">
         {cart.map((item) => {
          const product = products.find((p) => p.id === item.productId);
          if (!product) return null;
          return (
            <div key={item.productId} className="flex justify-between items-center gap-2 mb-2 border-1 border-[#fa961d] outline-[#fa961d]-1 rounded-lg p-2">
              <img src={product.image} className="w-20 h-20 rounded-lg" alt="" />
              <div className='text-white'>{product.title} x {item.quantity}</div>
              <div className="text-[#fa961d] font-bold">${(product.price * item.quantity).toFixed(2)}</div>
            </div>
          );
        })}         
        </div>

        <div className=" mt-4 pt-2">
          <div className="text-gray-300 flex justify-between mb-1"><span>Subtotal</span> <span>${subtotal.toFixed(2)}</span></div>
          <div className="text-gray-300 flex justify-between mb-1"><span>Shipping</span> <span>${shipping.toFixed(2)}</span></div>
          <div className="text-gray-300 flex justify-between mb-1"><span>Taxes</span> <span>${taxes.toFixed(2)}</span></div>
          <div className="flex justify-between font-bold text-lg mt-2"><span className="text-[#fa961d]">Total</span> <span className='text-[#fa961d]'>${total.toFixed(2)}</span></div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
