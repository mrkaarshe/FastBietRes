import React, { useState, useEffect } from "react";
import aos from 'aos';
import 'aos/dist/aos.css';
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../Store/Cart";
import { MdAddShoppingCart } from "react-icons/md";
import toast from "react-hot-toast";

const Detail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(null); // New state for updated price
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    aos.init({ duration: 500 }, { once: true });

    const fetchFood = async () => {
      try {
        const res = await fetch(`https://fastbietres-4.onrender.com/api/foods/${id}`);
        if (!res.ok) throw new Error(`HTTP error ${res.status}`);
        const data = await res.json();
        setProduct(data);
        setPrice(data.price); // Set initial price on load
        console.log("Fetched food:", data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch food");
        navigate("/"); // redirect if not found
      }
    };

    fetchFood();
  }, [id, navigate]);

  // Update price whenever quantity changes
  useEffect(() => {
    if (product) {
      setPrice(product.price * quantity); // Update price based on quantity
    }
  }, [quantity, product]); // Runs when quantity or product changes

  if (!product) return <div className=" min-h-screen ">
    <p className="max-w-xl mx-auto flex justify-center items-center  w-20 h-20 rounded-full  border-t-4  border-yellow-500 animate-spin"></p>
  </div>;

  const handleAddToCart = () => {
    dispatch(addToCart({ productId: product._id, product: product, quantity }));
    navigate("/home");
  };

  return (
    <div className="max-w-7xl mx-auto min-h-[100vh] mt-40 px-2 py-6 rounded-lg flex flex-col md:flex-row gap-10">
      <img data-aos="fade-right" src={`https://fastbietres-1.onrender.com${product.image}`} alt={product.title} className="h-110 w-1/1  md:h-140 md:w-150 object-center rounded-2xl" />
      <div data-aos="fade-left">
        <h1 className="text-6xl text-yellow-500 font-bold">{product.title}</h1>
        <p className="text-gray-300 text-xl font-bold mt-1">{product.subtitle}</p>
        <p className="text-4xl font-semibold text-yellow-500 ">${price}</p> {/* Display updated price */}

        {/* Quantity */}
        <div className="flex items-center gap-4 mt-1">
          <button onClick={() => setQuantity(q => (q > 1 ? q - 1 : 1))} className="px-3 py-1  text-4xl text-white rounded">-</button>
          <span className="text-3xl text-yellow-500">{quantity}</span>
          <button onClick={() => setQuantity(q => q + 1)} className="px-3 py-1 text-4xl text-white rounded">+</button>
        </div>

        {/* Add to Cart */}
        <button onClick={handleAddToCart} className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-yellow-500 text-white text-lg font-medium shadow hover:bg-transparent hover:border-1 border-zinc-800 transition">
          <MdAddShoppingCart /> Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Detail;
