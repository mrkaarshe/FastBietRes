import  aos from 'aos';
import 'aos/dist/aos.css';


import React, { use, useState } from 'react'
import { useEffect } from 'react';
import { MdAddShoppingCart } from "react-icons/md"
import { useSelector, useDispatch } from 'react-redux'
import { addToCart } from '../Store/Cart'
import { Link } from 'react-router-dom'
import products from '../Products'
const Menu = () => {

    useEffect(()=>{
      aos.init({duration:1000},{once:true})
    })


  const categories = ["All", "Burgers", "Drinks", "Desserts", "Others"]
  const [activeCategory, setActiveCategory] = useState("All")

  const filteredItems =
    activeCategory === "All"
      ? products
      : products.filter(item => item.category === activeCategory)

  return (
    <div className="lg:px-15 sm:mx-4
    pt-16 pb-6 mt-30 mx-w-6xl mx-auto lg:mx-20 mb-6 rounded-2xl">
      {/* Title */}
      <h2 className="text-4xl text-center md:text-6xl font-extrabold mb-12 text-[#fa961d] " data-aos="fade-down">
        Our Hot Dishes
      </h2>

      
      <div className="flex flex-wrap justify-center gap-4 mb-10">
        {categories.map((cat, i) => (
          <button
            key={i}
            onClick={() => setActiveCategory(cat)}
            className={`px-5 py-2 rounded-full font-medium shadow transition ${activeCategory === cat
              ? "bg-white text-black"
              : "bg-[#fa961d] text-white hover:bg-transparent hover:border border-[#fa961d] "
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

    
      <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 gap-6  ">
        {filteredItems.map((item) => (
          <div key={item.id}  data-aos="fade-up" className="relative flex shadow-2xl   justify-between pr-10 rounded-full min-w-sm lg:min-w-[300px]  border-t-3 border-[#fa961d] p-5 ">
            
            <div className="">
              <img
                src={item.image}
                alt={item.title}
                className="w-38 h-38 object-cover rounded-full shadow-lg border-4 border-[#fa961d] hover:scale-125 duration-300 transition-transform cursor-pointer"
              />
            </div>

            
            <div className=" z-10 ">
              <div className="text-center ">
                <h3 className="text-lg font-semibold text-gray-200 pt-10">{item.title}</h3>
                <p className="mt-1 text-sm text-gray-300">{item.subtitle}</p>

                <div className="mt-4 flex items-center justify-betwee gap-4">
                  <div>
                    <span className="text-xl font-bold text-[#fa961d]">${item.price}</span>
                  </div>
                <Link
                  to={`/details/${item.id}`}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#fa961d] text-white text-lg font-medium shadow hover:bg-transparent hover:border-1 border-[#fa961d] transition"
                 
                >
                  <MdAddShoppingCart />
                </Link>


                </div>
              </div>
            </div>

            {/* Decorative Shadow */}
            <div className="absolute inset-x-6 -bottom-4 h-4 rounded-ful opacity-60 filter blur-xl z-0"></div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Menu
