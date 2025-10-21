import React from "react";
import { Link } from "react-router-dom";
import { FaCheckDouble } from "react-icons/fa6";
const OrderConfirmed = () => {
  return (
    <div className="h-[80vh] min-w-sm mx-2 flex flex-col items-center justify-center  p-4">
      <div className="border-1 border-slate-600 rounded-xl p-8 w-full max-w-2xl min-h-lg text-center">
        <h1 className="text-3xl font-bold text-yellow-500 mb-4">Order Confirmed!</h1>
        <div className=" text-5xl border-4 text-yellow-500 mx-auto rounded-full items-center max-w-20 min-h-20 font-extrabold mb-4 flex justify-center">
          <FaCheckDouble />
        </div>
        <p className="text-gray-300 mb-6">
          Thank you for your purchase. Your order has been placed successfully.
        </p>
        <Link
          to="/home"
          className="inline-block mr-5 bg-yellow-500 hover:bg-transparent hover:border border-slate-600 text-white px-6 py-3 rounded-full font-semibold transition"
        >
          Back to Home
        </Link>
                <Link
          to="/profile"
          className="inline-block  border border-slate-600 text-white px-6 py-3 rounded-full font-semibold transition"
        >
          view your orders 
        </Link>
      </div>
    </div>
  );
};

export default OrderConfirmed;
