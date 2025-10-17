import React from 'react'
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa"
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="font-Poppins bg-slate-900 border-t-2 border-cyan-500 rounded-t-lg shadow-2xl text-gray-300 pt-12">
      <div className=" px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* About */}
        <div>
          <h2 className="text-xl font-bold text-gray-400 font-bol mb-4">🍴 <span className='text-cyan-500'>FastBite</span> Restaurant <span>& Delivery</span></h2>
          <p className="text-gray-400 font-bol text-xs leading-relaxed">
            Bringing you the best burgers, drinks, and desserts with love. 
            Fresh ingredients, bold flavors, and unforgettable taste.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-sm font-bold text-gray-400 f mb-4">Quick Links</h2>
          <ul className="space-y-1 text-sm text-gray-400 font-bol">
            <li><Link to={'/home'} className="hover:text-cyan-500 text-white ">Home</Link></li>
            <li><Link  to={'/about'} className="hover:text-cyan-500 text-white ">About</Link></li>
            <li><Link to={'/menu'}  className="hover:text-cyan-500 text-white ">Menu</Link></li>
            <li><Link  to={'/contact'} className="hover:text-cyan-500 text-white ">Contact Us</Link></li>
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
            <a href="#" className=" bg-cyan-500 w-10 h-10 flex justify-center items-center hover:bg-transparent hover:border border-cyan-500  rounded-full text-white text-xl"><FaFacebook /></a>
            <a href="#" className=" bg-cyan-500 w-10 h-10 flex justify-center items-center hover:bg-transparent hover:border border-cyan-500 rounded-full text-white text-xl"><FaInstagram /></a>
            <a href="#" className=" bg-cyan-500 w-10 h-10 flex justify-center items-center hover:bg-transparent hover:border border-cyan-500 rounded-full text-white text-xl"><FaTwitter /></a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t-2 border-cyan-500 mt-10 py-4 text-center text-gray-300 font-bol text-sm">
        © 2025 FastBite Restaurant. All Rights Reserved.
      </div>
    </footer>
  )
}

export default Footer
