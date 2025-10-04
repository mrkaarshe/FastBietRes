import React, { useState, useEffect } from "react";
import  aos from 'aos';
import 'aos/dist/aos.css';
import { useParams, useNavigate } from "react-router-dom";
import products from "../Products";
import { useDispatch } from "react-redux";
import { addToCart } from "../Store/Cart";
import { MdAddShoppingCart } from "react-icons/md";

const Detail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    aos.init({duration:500},{once:true})
    const found = products.find((p) => p.id === Number(id));
    if (found) setProduct(found);
    else navigate("/");
  }, [id, navigate]);

  if (!product) return <div className="my-50 max-w-xl mx-auto flex justify-center items-center  w-20 h-20 rounded-full  border-x-4  border-teal-300 animate-spin"></div>;;

  const handleAddToCart = () => {
    dispatch(addToCart({ productId: product.id, quantity }));
    navigate("/home");
  };
  

  return (
    <div className="max-w-7xl mx-auto min-h-[75vh] my-40 px-2 py-6  rounded-lg flex flex-col md:flex-row gap-20">
      <img data-aos="fade-right" src={product.image} alt={product.title} className="h-150 w-150 object-center rounded-lg" />
      <div data-aos="fade-left">
        <h1 className="text-6xl text-[#fa961d] font-bold">{product.title}</h1>
        <p className="text-gray-300 text-xl font-bold mt-2">{product.subtitle}</p>
        <p className="text-4xl font-semibold text-[#fa961d] mt-4">${product.price}</p>
        {/* Quantity */}
        <div className="flex items-center gap-4 mt-6">
          <button
            onClick={() => setQuantity((q) => (q > 1 ? q - 1 : 1))}
            className="px-3 py-1 bg-[#fa961d] text-white rounded"
          >
            -
          </button>
          <span className="text-lg text-white">{quantity}</span>
          <button
            onClick={() => setQuantity((q) => q + 1)}
            className="px-3 py-1 bg-[#fa961d] text-white rounded"
          >
            +
          </button>
        </div>

        {/* Add to Cart */}
        <button
          onClick={handleAddToCart}
          className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#fa961d] text-white text-lg font-medium shadow hover:bg-transparent hover:border-1 border-[#fa961d] transition"
        >
          <MdAddShoppingCart />
          Add to Cart
        </button>
      </div>
     
    </div>
  );
};

export default Detail;
