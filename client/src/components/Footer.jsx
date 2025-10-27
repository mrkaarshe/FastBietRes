import React from 'react'
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa"
import { Link } from 'react-router-dom'
import { IoLocationOutline } from "react-icons/io5";
import { AiOutlineMail } from "react-icons/ai";
import { BsTelephone } from "react-icons/bs";

const Footer = () => {
  return (
    <footer className="font-Poppins bg-black border-t-2 border-zinc-800 rounded-t-lg shadow-2xl text-gray-300 pt-12">
      <div className=" px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
        {/* About */}
        <div>
          <h2 className="text-xl font-bold text-gray-200 font-bol mb-4"><span className='text-yellow-500 text-xl md:text-7xl lg:text-9xl'>FastBite</span> Restaurant <span>& Delivery</span></h2>
          <p className="text-gray-300 font-bol text-xs leading-relaxed">
           Where speed meets flavor — enjoy chef-crafted dishes prepared with passion and delivered with perfection. Every bite is a blend of freshness, flavor, and quality — from our kitchen to your doorstep. Whether you’re craving something spicy, sweet, or savory, our chefs bring restaurant-quality meals straight to your home — hot, fast, and full of love.
          </p>
        </div>

        {/* Quick Links */}
        <div className="text-xs md:text-sm flex gap-10 justify-start sm:justify-around md:justify-end">
          <div className=''>
             <h2 className="text-sm font-bold text-gray-400 f mb-4">Quick Links</h2>
          <ul className="flex flex-col gap-2  px-4 max-w-1/1 mx-auto text-gray-300">
            <div className="flex gap-3 jusfty-center">
            <span className="">1</span>
            <Link to='/home' className="  font-Poppins  hover:scale-110 hover:text-yellow-500">Home</Link>
            </div>
            <div className="flex gap-3 jusfty-center">
            <span className="text-gray-300 ">2</span>
            <Link to='/about' className="text-gray-300 font-Poppins  hover:scale-110 hover:text-yellow-500">About</Link>
            </div>
              <div className="flex gap-3 jusfty-center">
            <span className="text-gray-300 ">3</span>
            <Link to='/menu' className="text-gray-300 font-Poppins  hover:scale-110 hover:text-yellow-500">Menu</Link>
            </div>
                        <div className="flex gap-3 jusfty-center">
            <span className="text-gray-300 ">4</span>
            <Link to='/contact' className="text-gray-300 font-Poppins  hover:scale-110 hover:text-yellow-500">Contact</Link>
            </div>
          </ul>
          </div>
         
       

        {/* Contact */}
        <div className="text-xs md:text-sm ">
          <h2 className="font-bold text-gray-400 font-bol mb-4">Contact Us</h2>
          <p className="text-gray-400 flex gap-2 "><span className='text-yellow-500 font-bold'><IoLocationOutline/></span> somalia ,Mogadishu,teleex</p>
          <p className="text-gray-400 flex gap-2 "><span className='text-yellow-500 font-bold'><BsTelephone/></span>252 61 101 1973</p>
          <p className="text-gray-400 flex gap-2 "><span className='text-yellow-500 font-bold'><AiOutlineMail/></span> FastBite@gmail.com</p>

          {/* Socials */}
          <div className="flex gap-4 mt-3">
            <a href="#" className="border hover:border-yellow-500 w-10 h-10 flex justify-center items-center hover:bg-transparent hover:border-2 border-gray-400  rounded-full text-white text-xl"><FaFacebook /></a>
            <a href="#" className="border hover:border-yellow-500 w-10 h-10 flex justify-center items-center hover:bg-transparent hover:border-2 border-gray-400 rounded-full text-white text-xl"><FaInstagram /></a>
            <a href="#" className="border hover:border-yellow-500 w-10 h-10 flex justify-center items-center hover:bg-transparent hover:border-2 border-gray-400 rounded-full text-white text-xl"><FaTwitter /></a>
          </div>
        </div>
      </div>
       </div>

      {/* Bottom Bar */}
      <div className="border-t-2 border-zinc-800 mt-10 py-4 text-center text-gray-300 font-bol text-sm">
        © 2025 FastBite Restaurant. All Rights Reserved.
      </div>
    </footer>
  )
}

export default Footer
