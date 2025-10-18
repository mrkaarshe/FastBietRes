import React from 'react'
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa"
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="font-Poppins bg-black border-t-2 border-slate-600 rounded-t-lg shadow-2xl text-gray-300 pt-12">
      <div className=" px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* About */}
        <div>
          <h2 className="text-xl font-bold text-gray-200 font-bol mb-4"><span className='text-yellow-500 text-xl md:text-7xl lg:text-9xl'>FastBite</span> Restaurant <span>& Delivery</span></h2>
          <p className="text-gray-300 font-bol text-xs leading-relaxed">
           Where speed meets flavor — enjoy chef-crafted dishes prepared with passion and delivered with perfection. Every bite is a blend of freshness, flavor, and quality — from our kitchen to your doorstep. Whether you’re craving something spicy, sweet, or savory, our chefs bring restaurant-quality meals straight to your home — hot, fast, and full of love.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-sm font-bold text-gray-400 f mb-4">Quick Links</h2>
          <ul className="space-y-1 text-sm text-gray-400 font-bol">
            <li><Link to={'/home'} className="hover:text-yellow-500 text-white ">Home</Link></li>
            <li><Link  to={'/about'} className="hover:text-yellow-500 text-white ">About</Link></li>
            <li><Link to={'/menu'}  className="hover:text-yellow-500 text-white ">Menu</Link></li>
            <li><Link  to={'/contact'} className="hover:text-yellow-500 text-white ">Contact Us</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h2 className="text-sm md:text-xl font-bold text-gray-400 font-bol mb-4">Contact Us</h2>
          <p className="text-gray-400 font-bol text-sm">📍 Mogadishu, Somalia</p>
          <p className="text-gray-400 font-bol text-sm">📞 +252 61 101 1973</p>
          <p className="text-gray-400 font-bol text-sm">✉️ FastBite@gmail.com</p>

          {/* Socials */}
          <div className="flex gap-4 mt-4">
            <a href="#" className=" bg-yellow-500 w-10 h-10 flex justify-center items-center hover:bg-transparent hover:border border-yellow-500  rounded-full text-white text-xl"><FaFacebook /></a>
            <a href="#" className=" bg-yellow-500 w-10 h-10 flex justify-center items-center hover:bg-transparent hover:border border-yellow-500 rounded-full text-white text-xl"><FaInstagram /></a>
            <a href="#" className=" bg-yellow-500 w-10 h-10 flex justify-center items-center hover:bg-transparent hover:border border-yellow-500 rounded-full text-white text-xl"><FaTwitter /></a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t-2 border-slate-600 mt-10 py-4 text-center text-gray-300 font-bol text-sm">
        © 2025 FastBite Restaurant. All Rights Reserved.
      </div>
    </footer>
  )
}

export default Footer
