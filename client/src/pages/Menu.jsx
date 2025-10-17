import aos from 'aos';
import 'aos/dist/aos.css';
import { FaTrash } from "react-icons/fa"
import React, { useState, useEffect } from 'react';
import { MdAddShoppingCart } from "react-icons/md";
import { useDispatch } from 'react-redux';
import { addToCart } from '../Store/Cart';
import { Link, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { useSelector } from 'react-redux';
const Menu = ({onRemove}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [foods, setFoods] = useState([]);

  
 const { user } = useSelector((state) => state.user);
  const fetchFoods = async () => {
    try {
      const response = await fetch('https://fastbietres-1.onrender.com/api/foods/getfood');
      if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
      const data = await response.json();
      setFoods(data);
    } catch (error) {
      console.error('Error fetching foods:', error);
      toast.error("Failed to fetch foods");
    }
  };

  useEffect(() => {
    fetchFoods();
    aos.init({ duration: 1000 }, { once: true });
    
  }, []);

  const categories = ["All", "Burgers", "Drinks", "Desserts", "Others"];
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredItems =
    activeCategory === "All"
      ? foods
      : foods.filter(item => item.category === activeCategory);

const handleDelete = async (id) => {
  if (!window.confirm("Are you sure you want to delete this food?")) return;

  const token = user?.token;
  if (!token) {
    toast.error("Please login first!");
    return;
  }

  try {
    const res = await fetch(`https://fastbietres-1.onrender.com/api/foods/delete/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) throw new Error("Failed to delete food");

    setFoods(prev => prev.filter(f => f._id !== id));
    toast.success("Food deleted successfully!");
  } catch (err) {
    console.error(err);
    toast.error("Error deleting food");
  }
};


  return (
    <div className="lg:px-15 pt-16 pb-6 w-screen sm:w-sm md:w-1/1 mt-30 m mx-auto font-Poppins mb-6 rounded-2xl">
      <Toaster position="top-right" reverseOrder={false} />

      <h2 className="text-4xl text-center md:text-6xl font-extrabold mb-12 text-cyan-500">
        Our Hot Dishes
      </h2>

      {/* Categories */}
      <div className="flex flex-wrap justify-center gap-4 mb-10">
        {categories.map((cat, i) => (
          <button
            key={i}
            onClick={() => setActiveCategory(cat)}
            className={`px-5 py-2 rounded-full font-medium shadow transition ${activeCategory === cat
              ? "bg-white text-black"
              : "bg-cyan-500 text-white hover:bg-transparent hover:border border-slate-600"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Food Items */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
       {filteredItems.map((item) => (
    <div
      key={item._id}
      data-aos="fade-up"
      className="relative group flex flex-col justify-between items-center max-w-lg mr-2 rounded-xl overflow-hidden
                bg-gradient-to-br from-slate-900/60 via-slate-800/70 to-slate-900/60
                backdrop-blur-lg shadow-xl hover:shadow-cyan-500/20
                transition-all duration-500 "
    >
      {/* Image Section */}
      <div className="relative w-full overflow-hidden">
        <img
          src={`https://fastbietres-1.onrender.com${item.image}`}
          alt={item.title}
          className="object-cover w-full h-40 rounded-t-xl transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-70 group-hover:opacity-50 transition-opacity duration-500"></div>
      </div>

      {/* Content */}
      <div className="z-10 text-start p-2 w-full space-y-">
        <h3 className="text-xl font-bold text-cyan-500 group-hover:text-cyan-400 transition-colors duration-300">
          {item.title}
        </h3>
        <p className="text-gray-300 text-md line-clamp-2">{item.subtitle}</p>
      </div>

      {/* Bottom Section */}
      <div className="flex items-center justify-between w-full px-4 pb-4 mt-auto">
        <span className="text-3xl font-bold text-cyan-400">${item.price}</span>

        <div className="flex items-center gap-3">
          <Link
            to={`/details/${item._id}`}
            className="flex items-center justify-center gap-2 px-5 py-3 rounded-full 
                      bg-cyan-600 text-white text-lg font-semibold shadow-md 
                      hover:bg-transparent hover:border border-slate-600 hover:text-cyan-400
                      transition-all duration-300"
          >
            <MdAddShoppingCart className="text-xl" />
          </Link>

          {user?.role === "admin" && (
            <button
              onClick={() => handleDelete(item._id)}
              className="p-3 border border-slate-600 rounded-full text-white hover:text-cyan-500 
                        transition-all duration-300"
            >
              <FaTrash className="text-xl" />
            </button>
          )}
        </div>
      </div>
    </div>
  ))}
 

        {user?.role === "admin" && (
          <div data-aos="fade-up" className="flex justify-center mb-8">
            <button
              onClick={() => navigate("/add-food")}
              className="items-center flex justify-center  border border-slate-600  h-20 mt-20 rounded-full text-center px-8  
                         text-white font-bold text-lg 
                         hover:scale-105 transition-transform duration-300
                         active:scale-95"
            >
              Add New Food
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;
