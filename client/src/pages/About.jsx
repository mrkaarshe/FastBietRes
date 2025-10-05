import React from "react";

import aos  from 'aos'
import 'aos/dist/aos.css'
import { useEffect } from "react";
import { FaRegClock } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import { MdOutlinePhoneCallback } from "react-icons/md";
import hero from '/hero.jpg'
const About = () => {
  useEffect(()=>{
    aos.init({duration:1000})
  })
  return (
    <div data-aos="fade-up" className=" my-20 lg:mx-10 flex justify-between flex-col items-center   text-gray-800 ">
     <h2 className="text-[#f1961d] py-10 text-4xl font-bold">about us</h2>
     
      <section className=" max-w-7xl mx-auto pt-10 grid grid-cols-1 md:grid-cols-2 gap-10   "> 
         <img data-aos="fade-right" src={hero} className="w-1/1 rounded-2xl h-100" alt="" />
        <div data-aos="fade-left" className="flex flex-col w-1/1  gap-2 justify-start ">
         
          <h2 className="text-3xl  font-bold text-[#fa961d] mb-2">Our Story</h2>
          <p className="text-gray-300 leading-relaxed">
            Founded in 2025, <span className="font-semibold text-[#fa961d] font-mono">FastBite</span> was built on one simple idea: 
            creating meals that bring people together. From our freshly grilled burgers to refreshing drinks, 
            every item is crafted with love and passion.
          </p>
          <p className="mt-1 text-gray-300 leading-relaxed">
            We started as a small family kitchen, and today we continue to grow while keeping our tradition alive — 
            serving happiness on every plate.
            Our team of culinary artists works tirelessly to push the boundaries of traditional cuisine while respecting the fundamentals that make great food timeless. From our signature wagyu preparations to our innovative dessert creations, each plate represents our dedication to excellence.
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab, praesentium aspernatur. Cupiditate ad tempore nisi aut iusto? Sequi dolor nihil ipsam a labore, adipisci fugiat aperiam, enim, vitae accusantium ad. Odit iure tempore modi qui, fuga quod aut repellat natus nostrum ducimus consequuntur aliquid accusantium dolorum optio? Non, inventore ipsum?
           
          </p>
        </div>
      </section>

      {/* Our Values */}
      <section className="w-full py-16">
        <div className=" px-6 text-center">
          <h2 className="text-3xl font-bold text-[#fa961d] mb-8">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-10 ">
            <div data-aos="fade-right" className="p-7 border-1 hover:-translate-y-3 border-[#fa961d]  rounded-xl shadow hover:shadow-lg transition">
              <div  className="flex items-center gap-2 mb-2  justify-center">
                <span className="text-lg font-bold text-[#fa961d]"><FaRegClock/></span>
                <h3 className="text-xl text-white font-semibold mb-2"> Houres</h3>
              </div>
              <div  className="flex justify-center text-xs md:text-md  gap-5">
                <div>
                   <p className="text-gray-300">
               Monday - Thursday
              </p>
              <p className="text-gray-300">
               Monday - Thursday
              </p>
              <p className="text-gray-300">
               Monday - Thursday
              </p>
                </div>
                <div>
                    <p className="text-gray-400 font-bold">5:00 PM - 10:00 PM</p>
                     <p className="text-gray-400 font-bold">5:00 PM - 11:00 PM</p>
                     <p className="text-gray-400 font-bold">5:00 PM - 9:00 PM</p>
                </div>
             
              </div>
              

            </div>
            <div data-aos="fade-up"  className="p-7 hover:-translate-y-3  border-1 border-[#fa961d] rounded-xl shadow hover:shadow-lg transition">
              <div className="flex items-center gap-2 mb-2  justify-center">
                <span className="text-[#fa961d]"><IoLocationOutline/></span>
                <h3 className="text-xl font-semibold text-white mb-2">Location</h3>
              </div>
              <div className="text-xs md:text-md">
              <p className="text-gray-300">
                123 Flavor Street, Foodie City, FC 45678
              </p>
              <p className="text-gray-300">
                456 Gourmet Ave, Taste Town, TT 12345
              </p>
              <p className="text-gray-300">
                789 Culinary Blvd, Dishville, DV 67890
              </p>
              </div>
            </div>
            <div data-aos="fade-left" className="p-7 hover:-translate-y-3 hover:duration-700 duration-700   border-1 border-[#fa961d] rounded-xl shadow hover:shadow-lg">
              <div className="flex items-center gap-2 mb-2 justify-center">
                <span className="text-[#fa961d]"><MdOutlinePhoneCallback/></span>
                <h3 className="text-xl font-semibold text-white mb-2">Contact</h3>
              </div>
              <div className="text-xs text-gray-300 md:text-md">

              
              <p>(333)123-fOoDy</p>
              <p>fOoDy@gmail.com</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}

    </div>
  );
};

export default About;
