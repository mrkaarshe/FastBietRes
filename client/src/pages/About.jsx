import React from "react";

import aos  from 'aos'
import 'aos/dist/aos.css'
import { useEffect } from "react";
import { FaRegClock } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import { MdOutlinePhoneCallback } from "react-icons/md";
const About = () => {
  useEffect(()=>{
    aos.init({duration:1000})
  })
  return (
    <div data-aos="fade-up" className=" my-20 lg:mx-20 flex justify-between flex-col items-center   text-gray-800 ">
     <h2 className="text-[#f1961d] py-10 text-4xl  font-bold">about us</h2>
      <section className=" px-10 pt-10 grid md:grid-cols-2 gap-1 items-center justify-center"> 
        <img
          src='./fastBite.png'
          className="rounded-2xl shadow-lg w-150 h-150 bg-cover bg-center object-cover mx-auto"
        />
        <div className="flex flex-col gap-2 justify-start ">
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
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam exercitationem cum eligendi similique odio nisi quod, amet culpa quo rerum molestias ipsam enim, ab, hic minima quasi praesentium quibusdam totam neque. Hic dolore perspiciatis praesentium dignissimos harum placeat at aliquam, vitae deleniti, quisquam libero. Molestias repellendus quasi, earum mollitia dolor doloribus veritatis aliquam nam blanditiis exercitationem necessitatibus repudiandae repellat vero odit rem ratione sint! Aut accusamus ullam ipsum perferendis culpa ut ea repellat eligendi odio, nesciunt delectus quaerat perspiciatis quo nobis quidem autem. Provident qui velit quos possimus, asperiores laboriosam non incidunt tenetur, magnam inventore ratione suscipit dolorem. Explicabo, molestiae.
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Obcaecati, optio. Ullam provident ipsa, accusamus iusto quod quo autem blanditiis dicta, a est temporibus earum. Magnam, sunt autem atque fugit doloribus tempore distinctio similique. Minima, fuga? Id, minima blanditiis ipsa veritatis quo quam fugiat sint animi error facilis, autem quidem vel, iure modi obcaecati dolores dignissimos! Debitis voluptatem animi iste illum asperiores voluptate odit. Nulla sunt vel repellendus facilis doloribus error mollitia iusto quas tempora odit quidem reprehenderit quia, earum ullam, illum at inventore cupiditate ipsam sapiente a atque sint! Minima mollitia ea earum laboriosam sapiente blanditiis cupiditate iure molestiae nam.
          </p>
        </div>
      </section>

      {/* Our Values */}
      <section className="w-full py-16">
        <div className=" px-6 text-center">
          <h2 className="text-3xl font-bold text-[#fa961d] mb-8">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-10 ">
            <div data-aos="fade-right" className="p-7 border-1 border-[#fa961d]  rounded-xl shadow hover:shadow-lg transition">
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
            <div data-aos="fade-up"  className="p-7  border-1 border-[#fa961d] rounded-xl shadow hover:shadow-lg transition">
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
            <div data-aos="fade-left" className="p-7  border-1 border-[#fa961d] rounded-xl shadow hover:shadow-lg transition">
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
