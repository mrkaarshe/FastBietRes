import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AddFood = () => {
  const navigate = useNavigate();
  const [loading , setloading] = useState(false)
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user || user.role !== "admin") {
    navigate("/"); // redirect if not admin
  }

  const [form, setForm] = useState({
    title: "",
    subtitle: "",
    price: "",
    category: "",
    image: null, // file object
  });

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setForm({ ...form, image: e.target.files[0] }); // ✅ file not string
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  setloading(true); // Start loading

  try {
    const token = user.token;
    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("subtitle", form.subtitle);
    formData.append("price", form.price);
    formData.append("category", form.category);
    formData.append("image", form.image);

    const res = await fetch("https://fastbietres-1.onrender.com/api/foods/addFood", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to add food");

    toast.success("Food added successfully!");
    setForm({ title: "", subtitle: "", price: "", category: "", image: null });
    navigate("/");
  } catch (err) {
    toast.error(err.message);
  } finally {
    setloading(false); // Stop loading regardless of outcome
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center  px-4">
      <div className="w-full max-w-lg border border-gray-900 bg-black p-8 rounded-2xl shadow-2xl backdrop-blur-lg">
        <h2 className="text-3xl font-bold text-yellow-500 mb-6 text-center">
          Add New Food
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm mb-1 text-white">Title</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Food Title"
              className="w-full bg-black focus:bg-black text-white p-3 rounded-lg border border-slate-700 focus:ring-2 focus:ring-yellow-500 outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-1 text-white">Subtitle</label>
            <input
              type="text"
              name="subtitle"
              value={form.subtitle}
              onChange={handleChange}
              placeholder="Short description"
              className="w-full bg-black focus:bg-black text-white p-3 rounded-lg border border-slate-700 focus:ring-2 focus:ring-yellow-500 outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-1 text-white">Price ($)</label>
            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              placeholder="Price"
              step="0.01"
              className="w-full bg-black focus:bg-black text-white p-3 rounded-lg border border-slate-700 focus:ring-2 focus:ring-yellow-500 outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-1 text-white">Category</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full bg-black focus:bg-black text-white p-3 rounded-lg border border-slate-700 focus:ring-2 focus:ring-yellow-500 outline-none"
              required
            >
              <option value="">Select Category</option>
              <option value="Burgers">Burgers</option>
              <option value="Drinks">Drinks</option>
              <option value="Desserts">Desserts</option>
              <option value="Food">Food</option>
              <option value="Others">Others</option>
            </select>
          </div>

          <div>
            <label className="block text-sm mb-1 text-white">Image</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="w-full bg-black focus:bg-black text-white p-3 rounded-lg border border-slate-700 focus:ring-2 focus:ring-yellow-500 outline-none"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 mt-2 rounded-lg font-semibold bg-yellow-500 hover:from-white hover:bg-yellow-400 hover:text-white text-slate-900 shadow-md shadow-cyan-600/30 transition"
          >
            {loading ? "Loading..." : "Add Food"} 
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddFood;
