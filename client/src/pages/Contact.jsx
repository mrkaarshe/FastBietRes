import React from 'react'
import  aos from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import { LuMapPin } from "react-icons/lu";
import { MdOutlineEmail } from "react-icons/md";
import { MdOutlineLocalPhone } from "react-icons/md";
import { FaRegClock } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
const Contact = () => {
  useEffect(()=>{
    aos.init({duration:1000},{once:true})
  })
  return (
    <>
    
      <div className="mt-25 mb-20 pb-5 "> 
        <div className=" px-5  lg:px-10">
          <div  className="text-center mb-16 animate-on-scroll">
            <h2 className="text-4xl font-bold text-[#fa961d]">Contact Us</h2>
            <p className="text-gray-300 mt-4 text-xl max-w-2xl mx-auto">
             Get in touch with our team to order your favorite meals or ask about our delivery service.
            </p>
          </div>

          <div className="grid grid-cols-1  lg:grid-cols-2 gap-12">
            {/* Form Section */}
            <div  data-aos="fade-right"  className="container  w-screen  md:w-1/1">
              <form
                id="contact-form"
                className="rounded-xl shadow-sm border border-[#fa961d] p-8"
              >
                <div className="mb-6">
                  <label htmlFor="name" className="block text-gray-300 font-medium mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-3 border border-[#fa961d] placeholder-white   rounded-lg 
                               focus:outline-none focus:ring-2 focus:ring-[#fa961d] focus:border-transparent 
                               text-gray-300"
                  />
                </div>

                <div className="mb-6">
                  <label htmlFor="email" className="block text-gray-300 font-medium mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 border border-[#fa961d] placeholder-white   rounded-lg 
                               focus:outline-none focus:ring-2 focus:ring-[#fa961d] focus:border-transparent 
                               text-gray-300"
                  />
                </div>

                <div className="mb-6">
                  <label htmlFor="phone" className="block text-gray-300 font-medium mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="w-full px-4 py-3 border border-[#fa961d] placeholder-white   rounded-lg 
                               focus:outline-none focus:ring-2 focus:ring-[#fa961d] focus:border-transparent 
                               text-gray-300"
                  />
                </div>

                <div className="mb-6">
                  <label htmlFor="message" className="block text-gray-300 font-medium mb-2">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    required
                    className="w-full px-4 py-3 border min-h-90 max-h-90 border-[#fa961d] placeholder-white   rounded-lg 
                               focus:outline-none focus:ring-2 focus:ring-[#fa961d] focus:border-transparent 
                               text-gray-300"
                  ></textarea>
                </div>

                <div>
                  <button
                    type="submit"
                    className="w-full bg-[#fa961d] hover:bg-transparent hover:border-1 border-[#fa961d] text-white font-bold py-3 px-6 
                               rounded-lg transition duration-300 shadow-md hover:shadow-lg"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>

            {/* Info Section */}
            <div data-aos="fade-left" className="container w-screen md:w-1/1">
              <div className="rounded-xl shadow-sm border border-[#fa961d]   overflow-hidden h-full">
                <div className="h-64">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3251.9601327172354!2d45.309051470227764!3d2.042475209763933!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3d5843ffa8a16db3%3A0x909f40422de8119d!2sTaleex!5e0!3m2!1sen!2sso!4v1758471149260!5m2!1sen!2sso"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
                <div className="p-8">
                  <h3 className="text-xl font-bold mb-6 text-gray-300">My Information</h3>
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-10 h-10 bg-[#fa961d] hover:bg-transparent hover:border border-[#fa961d] text-white rounded-full flex items-center justify-center">
                          <LuMapPin/>
                        </div>
                      </div>
                      <div className="ml-4">
                        <h4 className="font-medium text-gray-300">Address</h4>
                        <p className="text-gray-400 mt-1">Mogadishu/Talex</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-10 h-10 bg-[#fa961d] hover:bg-transparent hover:border border-[#fa961d] text-white rounded-full flex items-center justify-center">
                         <MdOutlineLocalPhone/>
                        </div>
                      </div>
                      <div className="ml-4">
                        <h4 className="font-medium text-gray-300">Phone</h4>
                        <p className="text-gray-400 mt-1">(+252)611011973</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-10 h-10 bg-[#fa961d] hover:bg-transparent hover:border border-[#fa961d]  text-white rounded-full flex items-center justify-center">
                        
                        <MdOutlineEmail/>
                        </div>
                      </div>
                      <div className="ml-4">
                        <h4 className="font-medium text-gray-300">Email</h4>
                        <p className="text-gray-400 mt-1">FastBite@gmail.com</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-10 h-10 bg-[#fa961d] hover:bg-transparent hover:border border-[#fa961d]  text-white rounded-full flex items-center justify-center">
                          <FaRegClock/>
                        </div>
                      </div>
                      <div className="ml-4">
                        <h4 className="font-medium text-gray-300">Working Hours</h4>
                        <p className="text-gray-400 mt-1">
                          Saturday - Wednesday: 9am - 6pm <br />
                          Saturday: 10am - 4pm <br />
                          Friday: Closed
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-[#fa961d] placeholder-white  ">
                    <h4 className="font-medium text-gray-300 mb-4">Connect With Me</h4>
                    <div className="flex space-x-4">
                      <a
                        href="#"
                        className="w-10 h-10 bg-[#fa961d] hover:border border-[#fa961d]   text-white hover:bg-transparent rounded-full 
                                   flex items-center justify-center  transition-colors"
                      >
                       <FaFacebook/>  
                      </a>
                      <a
                        href="#"
                        className="w-10 h-10 bg-[#fa961d] hover:border border-[#fa961d]  text-white  hover:bg-transparent rounded-full 
                                   flex items-center justify-center  transition-colors"
                      >
                        <FaInstagram/>
                      </a>
                      <a
                        href="#"
                        className="w-10 h-10 bg-[#fa961d] hover:border border-[#fa961d]  text-white hover:bg-transparent rounded-full 
                                   flex items-center justify-center  transition-colors"
                      >
                        <FaWhatsapp/>
                      </a>
                      <a
                        href="#"
                        className="w-10 h-10 bg-[#fa961d] hover:border border-[#fa961d] text-white hover:bg-transparent rounded-full 
                                   flex items-center justify-center  transition-colors"
                      >
                        <FaTwitter/>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* End Info Section */}
          </div>
        </div>
      </div>
    </>
  )
}

export default Contact