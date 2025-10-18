import aos from "aos";
import "aos/dist/aos.css";
import { FaTrash } from "react-icons/fa";
import React, { useState, useEffect } from "react";
import { MdAddShoppingCart } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { remove } from "../Store/Cart";
import ckooker from "/ckooker.jpeg";

const Menu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => state.user);

  const fetchFoods = async () => {
    try {
      setLoading(true);
      const response = await fetch("https://fastbietres-1.onrender.com/api/foods/getfood");
      if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
      const data = await response.json();
      setFoods(data);
    } catch (error) {
      console.error("Error fetching foods:", error);
      toast.error("Failed to fetch foods");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFoods();
    aos.init({ duration: 1000, once: true });
  }, []);

  const categories = ["All", "Burgers", "Drinks", "Desserts", "Others"];
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredItems =
    activeCategory === "All"
      ? foods
      : foods.filter((item) => item.category === activeCategory);

  const handleDelete = async (id) => {
    const token = user?.token;
    if (!token) {
      toast.error("Please login first!");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`https://fastbietres-1.onrender.com/api/foods/delete/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Failed to delete food");

      setFoods((prev) => prev.filter((f) => f._id !== id));
      dispatch(remove(id));
      toast.success("Food deleted successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Error deleting food");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="lg:px-15 pt-16 pb-6 w-screen mx-auto font-Poppins mb-6 rounded-2xl">
        <h2 className="text-4xl text-center md:text-6xl font-extrabold mb-12 text-yellow-500">
          Our Hot Dishes
        </h2>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {categories.map((cat, i) => (
            <button
              key={i}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full font-medium shadow transition ${
                activeCategory === cat
                  ? "bg-white text-black"
                  : "bg-yellow-500 text-white hover:bg-transparent hover:border border-slate-600"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Food Items */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading
            ? // Loading Skeletons
              filteredItems.map((_, index) => (
                <div
                  key={index}
                  data-aos="fade-up"
                  className="relative group flex flex-col justify-between items-center w-[97%] mr-2 rounded-xl overflow-hidden bg-gradient-to-br from-transparent animate-pulse via-slate-950 to-black backdrop-blur-lg shadow-md shadow-yellow-500/10 transition-all duration-500"
                >
                  <div className="relative w-full overflow-hidden">
                    <div className="w-full h-60 bg-[#333] animate-pulse rounded-t-xl"></div>
                  </div>
                  <div className="p-4 w-full bg-[#0a0a0a] h-24 animate-pulse"></div>
                </div>
              ))
            : // Loaded Foods
              filteredItems.map((item) => (
                <div
                  key={item._id}
                  data-aos="fade-up"
                  className="relative group flex flex-col justify-between items-center w-[97%] mr-2 rounded-xl overflow-hidden bg-gradient-to-br from-transparent via-slate-950 to-black backdrop-blur-lg shadow-md shadow-yellow-500/10 transition-all duration-500"
                >
                  {/* Image Section */}
                  <div className="relative w-full overflow-hidden">
                    <img
                      src={`https://fastbietres-1.onrender.com${item.image}`}
                      alt={item.title}
                      className="object-cover w-full h-60 rounded-t-xl transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-70 group-hover:opacity-50 transition-opacity duration-500"></div>
                  </div>

                  {/* Content */}
                  <div className="z-10 text-start p-3 w-full">
                    <h3 className="text-xl font-bold text-yellow-500 group-hover:text-gray-300 transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="text-gray-300 text-md line-clamp-2">{item.subtitle}</p>
                  </div>

                  {/* Bottom Section */}
                  <div className="flex items-center justify-between w-full px-4 pb-4 mt-auto">
                    <span className="text-3xl font-bold text-yellow-400">${item.price}</span>

                    <div className="flex items-center gap-3">
                      <Link
                        to={`/details/${item._id}`}
                        className="flex items-center justify-center gap-2 px-5 py-3 rounded-full text-yellow-500 text-lg font-semibold shadow-md hover:bg-transparent border border-slate-600 hover:text-gray-200 transition-all duration-300"
                      >
                        <MdAddShoppingCart className="text-xl" />
                      </Link>

                      {user?.role === "admin" && (
                        <button
                          onClick={() => handleDelete(item._id)}
                          className="p-3 border border-slate-600 rounded-full text-white hover:text-yellow-500 transition-all duration-300"
                        >
                          <FaTrash className="text-xl" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}

          {/* Add Food Button for Admin */}
          {!loading &&
          <div>
        {user?.role === "admin" && (
            <div data-aos="fade-up" className="flex relative justify-center">
              <img
                src={ckooker}
                alt="ckook-image"
                className="object-cover bg-center w-full h-90 rounded-t-xl hover:scale-110 transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute w-full h-full bg-black/20 inset-0 flex justify-center items-center">
                <button
                  onClick={() => navigate("/add-food")}
                  className="items-center flex justify-center py-3 rounded-md w-1/2 text-white bg-yellow-500 hover:border border-yellow-500 hover:bg-transparent transition-all duration-300"
                >
                  Add Some Food
                </button>
              </div>
            </div>
          )}
          </div> }
          
        </div>
      </div>

    
    </>
  );
};

export default Menu;
