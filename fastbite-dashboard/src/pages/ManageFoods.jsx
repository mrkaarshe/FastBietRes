"use client"

import { useState, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import { Plus } from "lucide-react"
import { Button } from "../components/ui/button"
import { useToast } from "../hooks/use-toast"
import { MdAddShoppingCart } from "react-icons/md"
import { FiTrash } from "react-icons/fi";
import toast from "react-hot-toast";

export default function ManageFoods() {
  const [foods, setFoods] = useState([])
  const [loading, setLoading] = useState(true)

  const navigate = useNavigate()
  const { toast } = useToast()
  const categories = ["All", "Burgers", "Drinks", "Desserts", "Others"];
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredItems =
    activeCategory === "All"
      ? foods
      : foods.filter((item) => item.category === activeCategory);

  const fetchFoods = async () => {
    try {
      setLoading(true);
      const response = await fetch("https://fastbietres-4.onrender.com/api/foods/getfood");
      if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
      const data = await response.json();
      setFoods(data); // <-- Use setFoods here, not setFood
    } catch (error) {
      console.error("Error fetching foods:", error);
      toast({
        title: "Error",
        description: "Failed to fetch foods",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFoods();
  }, []);

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    try {
      setLoading(true);
      const res = await fetch(`https://fastbietres-4.onrender.com/api/foods/delete/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Failed to delete food");

      setFoods((prev) => prev.filter((f) => f._id !== id));
     
     
    } catch (err) {
      console.error(err);
     
    } finally {
      setLoading(false);
    }
  };


  return (
    <div>
      {/* Header */}
      <div className="mb-8  flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Manage Foods</h1>
          <p className="text-gray-400">View and manage your menu items.</p>
        </div>
        <Button
          onClick={() => navigate("/add-food")}
          className="bg-yellow-400 hover:bg-yellow-500 text-xs sm:text-md text-black font-semibold flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Add Food
        </Button>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap justify-center gap-4 mb-10">
        {categories.map((cat, i) => (
          <button
            key={i}
            onClick={() => setActiveCategory(cat)}
            className={`px-5 py-2 rounded-full font-medium shadow transition ${
              activeCategory === cat
                ? "bg-white text-black"
                : "border text-white hover:bg-transparent hover:border border-slate-600"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Food Items */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading
          ? Array(6).fill(0).map((_, index) => (
              <div
                key={index}
                className="w-full h-80 bg-zinc-800 animate-pulse rounded-xl"
              />
            ))
          : filteredItems.map((item) => (
              <div
                key={item._id}
                className="relative group flex flex-col justify-between items-center w-[97%] mr-2 rounded-xl overflow-hidden  backdrop-blur-lg shadow-md border border-zinc-700 transition-all duration-500"
              >
                {/* Image */}
                <div className="relative w-full overflow-hidden">
                  <img
                    src={`https://fastbietres-4.onrender.com${item.image}`}
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
                                            <button
                                              onClick={() => handleDelete(item._id)}
                                              className="p-3 border border-slate-600 rounded-full text-white hover:text-yellow-500 transition-all duration-300"
                                            >
                                              <FiTrash className="text-xl" />
                                            </button>
                  </div>
                </div>
              </div>
            ))}
      </div>
    </div>
  )
}
