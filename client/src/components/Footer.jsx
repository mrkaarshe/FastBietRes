import React from 'react'
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa"
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-[#212e39] border-t-2 border-[#fa961d] rounded-t-lg shadow-2xl text-gray-300 pt-12">
      <div className=" px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* About */}
        <div>
          <h2 className="text-xl font-bold text-gray-400 font-bol mb-4">🍴 <span className='text-[#fa961d] font-mono'>FastBite</span> Restaurant <span>& Delivery</span></h2>
          <p className="text-gray-400 font-bol text-sm leading-relaxed">
            Bringing you the best burgers, drinks, and desserts with love. 
            Fresh ingredients, bold flavors, and unforgettable taste.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-xl font-bold text-gray-400 f mb-4">Quick Links</h2>
          <ul className="space-y-1 text-gray-400 font-bol">
            <li><Link to={'/home'} className="hover:text-[#fa961d] text-white  font-mono">Home</Link></li>
            <li><Link  to={'/about'} className="hover:text-[#fa961d] text-white  font-mono">About</Link></li>
            <li><Link to={'/menu'}  className="hover:text-[#fa961d] text-white  font-mono">Menu</Link></li>
            <li><Link  to={'/contact'} className="hover:text-[#fa961d] text-white  font-mono">Contact Us</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h2 className="text-xl font-bold text-gray-400 font-bol mb-4">Contact Us</h2>
          <p className="text-gray-400 font-bol text-sm">📍 Mogadishu, Somalia</p>
          <p className="text-gray-400 font-bol text-sm">📞 +252 61 101 1973</p>
          <p className="text-gray-400 font-bol text-sm">✉️ FastBite@gmail.com</p>

          {/* Socials */}
          <div className="flex gap-4 mt-4">
            <a href="#" className=" bg-[#fa961d] w-10 h-10 flex justify-center items-center hover:bg-transparent hover:border border-[#fa961d]  rounded-full text-white text-xl"><FaFacebook /></a>
            <a href="#" className=" bg-[#fa961d] w-10 h-10 flex justify-center items-center hover:bg-transparent hover:border border-[#fa961d] rounded-full text-white text-xl"><FaInstagram /></a>
            <a href="#" className=" bg-[#fa961d] w-10 h-10 flex justify-center items-center hover:bg-transparent hover:border border-[#fa961d] rounded-full text-white text-xl"><FaTwitter /></a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t-2 font-mono border-[#fa961d] mt-10 py-4 text-center text-gray-300 font-bol text-sm">
        © 2025 FastBite Restaurant. All Rights Reserved.
      </div>
    </footer>
  )
}

export default Footer
