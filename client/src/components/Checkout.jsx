import aos from 'aos';
import 'aos/dist/aos.css';
import { useEffect, useState } from 'react';
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../Store/Cart";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
const Checkout = () => {
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const [cartProducts, setCartProducts] = useState([]);
  const [info, setInfo] = useState({});
  const navigate = useNavigate();
  const userExisting = localStorage.getItem("user");
  const user = JSON.parse(userExisting);

  useEffect(() => {
    aos.init({ duration: 1000, once: true });
  }, []);

  useEffect(() => {
    const fetchCartProducts = async () => {
      try {
        const productsData = await Promise.all(
          cart.map(async (item) => {
            const res = await fetch(`https://fastbietres-1.onrender.com/api/foods/${item.productId}`);
            return await res.json();
          })
        );
        setCartProducts(productsData);
      } catch (err) {
        console.error("Failed to fetch cart products:", err);
      }
    };
    if (cart.length > 0) fetchCartProducts();
  }, [cart]);

  const subtotal = cart.reduce((sum, item) => {
    const product = cartProducts.find((p) => p._id === item.productId); // ✅ sax
    return sum + (product ? product.price * item.quantity : 0);
  }, 0);

  const delivery = cart.length > 0 ? 2 : 0;
  const taxes = subtotal * 0.0035;
  const total = subtotal + delivery + taxes;

  const handleInputChange = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  };

 const handlePlaceOrder = async () => {
  if (!info.email || !info.address || !info.city || !info.phone) {
    toast.error("Please fill all fields");
    return;
  }

  // Prepare order data
  const items = cart.map(item => {
    const prod = cartProducts.find(p => p._id === item.productId);
    return {
      productId: item.productId,
      title: prod?.title || "",
      quantity: item.quantity,
      price: prod?.price || 0
    };
  });

  const orderData = {
    userId: user._id,           // user kaaga Redux/localStorage
    items,
    subtotal,
    delivery,
    taxes,
    total
  };

  try {
    const response = await fetch('https://fastbietres-1.onrender.com/api/history/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(orderData)
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Order failed');
    }

    // Success: clear cart, navigate, toast
    dispatch(clearCart());
    toast.success("Order placed successully!");
    navigate("/order-confirmed");
  } catch (err) {
    console.error("Order error:", err);
    toast.error("Failed to place order");
  }
};

  return (
    <div className="max-w-6xl min-w-sm mx-auto mt-34 p-6 flex flex-col md:flex-row gap-5">
      {/* Left: Form */}
      <div data-aos="fade-right" className="flex-1 max-h-[100vh] overflow-auto p-6 shadow rounded-lg">

        {!user ? (
          <div className="flex justify-between my-5 items-center">
            <span className="font-bold text-gray-300">Please SignIn First</span>
            <Link to={'/login'} className="border-slate-600 text-white rounded-md border-1 px-10 py-1 hover:bg-yellow-500 transition-colors">SignIn</Link>
          </div>
        ) : null}

        <h2 className="text-2xl font-bold mb-4 text-yellow-500">Contact & Shipping</h2>
        <input name="email" onChange={handleInputChange} placeholder="Email" className="border-1 border-slate-600 placeholder-white text-white outline-cyan-500 p-2 mb-3 w-full h-13 rounded-md" />

        <p className="text-white font-bold text-2xl my-2">Delivery</p>
        <select name="country" className="border-1 border-slate-600 placeholder-white text-white outline-cyan-500 p-2 mb-3 w-full h-13 rounded-md">
          <option value="somalia">Somalia</option>
        </select>

        <div className="flex gap-3">
          <input name="firstName" onChange={handleInputChange} placeholder="First Name" className="border-1 border-slate-600 placeholder-white text-white outline-cyan-500 p-2 mb-3 w-full h-13 rounded-md" />
          <input name="lastName" onChange={handleInputChange} placeholder="Last Name" className="border-1 border-slate-600 placeholder-white text-white outline-cyan-500 p-2 mb-3 w-full h-13 rounded-md" />
        </div>

        <input name="address" onChange={handleInputChange} placeholder="Address" className="border-1 border-slate-600 placeholder-white text-white outline-cyan-500 p-2 mb-3 w-full h-13 rounded-md" />
        <div className="flex gap-3">
          <input name="city" onChange={handleInputChange} placeholder="City" className="border-1 border-slate-600 placeholder-white text-white outline-cyan-500 p-2 mb-3 w-full h-13 rounded-md" />
          <input name="postal" onChange={handleInputChange} placeholder="Postal Code (optional)" className="border-1 border-slate-600 placeholder-white text-white outline-cyan-500 p-2 mb-3 w-full h-13 rounded-md" />
        </div>

        <input name="phone" onChange={handleInputChange} placeholder="Phone" className="border-1 border-slate-600 placeholder-white text-white outline-cyan-500 p-2 mb-3 w-full h-13 rounded-md" />

        <div className="flex justify-between items-center border-1 border-slate-600 text-white rounded-lg py-3 px-2">
          <p>Delivery</p>
          <p>$2.00</p>
        </div>

        <h2 className="text-xl text-white font-bold mt-6 mb-3">Payment</h2>
        <p className="text-gray-300">All transactions are secure. Use one of the methods below:</p>
        <div className="flex flex-col gap-x-3 border-1 border-slate-600 text-white p-1 mt-3 rounded-lg">
          <div className="flex gap-5 border-b-1 border-slate-600 p-3 text-sm md:text-md">
            <input type="radio" name="payment" className="w-5 md:w-10" />
            <p>EVC Plus: *712*614711110*$#</p>
          </div>
          <div className="flex gap-5 border-b-1 border-slate-600 p-3 text-sm md:text-md">
            <input type="radio" name="payment" className="w-5 md:w-10" />
            <p>eDahab: *712*624777710*$#</p>
          </div>
          <div className="flex gap-5 p-3 text-sm md:text-md">
            <input type="radio" name="payment" className="w-5 md:w-10" />
            <p>Premier Wallet: 252614777710</p>
          </div>
        </div>

        {!user ? (
          <button className="mt-6 w-full py-3 bg-yellow-500 hover:bg-transparent hover:border-1 border-slate-600 text-white rounded-lg font-bold">
            Sign In First ${total.toFixed(2)}
          </button>
        ) : (
          <button onClick={()=>handlePlaceOrder()} className="mt-6 w-full py-3 bg-yellow-500 hover:bg-transparent hover:border-1 border-slate-600 text-white rounded-lg font-bold">
            Place Order ${total.toFixed(2)}
          </button>
        )}
      </div>

      {/* Right: Order Summary */}
      <div data-aos="fade-left" className="min-w-[350px] max-w-lg p-6 sm:p-2 shadow rounded-lg">
        <h2 className="text-2xl font-bold mb-4 text-yellow-500">Order Summary</h2>
        <div className="max-h-80 overflow-auto ">
          {cart.map((item) => {
            const product = cartProducts.find((p) => p._id === item.productId); // ✅ sax
            if (!product) return null;
            return (
              <div key={item.productId} className="flex justify-between items-center gap-2 mb-2 border-1 border-slate-600 rounded-lg p-2">
                <img src={`https://fastbietres-1.onrender.com${product.image}`} className="w-20 h-20 rounded-lg" alt={product.title} />
                <div className="text-white">{product.title} x {item.quantity}</div>
                <div className="text-white font-bold">${(product.price * item.quantity).toFixed(2)}</div>
              </div>
            );
          })}
        </div>

        <div className="mt-4 pt-2">
          <div className="text-gray-300 flex justify-between mb-1"><span>Subtotal</span> <span>${subtotal.toFixed(2)}</span></div>
          <div className="text-gray-300 flex justify-between mb-1"><span>Delivery</span> <span>${delivery.toFixed(2)}</span></div>
          <div className="text-gray-300 flex justify-between mb-1"><span>Taxes</span> <span>${taxes.toFixed(2)}</span></div>
          <div className="flex justify-between font-bold text-lg mt-2"><span className="text-yellow-500">Total</span> <span className="text-yellow-500">${total.toFixed(2)}</span></div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
