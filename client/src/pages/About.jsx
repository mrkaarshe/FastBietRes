import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaRegClock } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import { MdOutlinePhoneCallback } from "react-icons/md";
import hero from "/hero.jpg";

const About = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <div
      data-aos="fade-up"
      className="my-20 lg:mx-10 flex flex-col items-center text-gray-300"
    >
      <h2 className="text-cyan-500 py-10 text-4xl font-bold uppercase tracking-wide">
        About Us
      </h2>

      {/* OUR STORY */}
      <section className=" mx-auto pt-10 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <img
          data-aos="fade-right"
          src={hero}
          alt="Our restaurant"
          className="h-150 w-1/1 rounded-2xl border border-slate-600 object-cover shadow-lg hover:shadow-cyan-500/20 transition"
        />

      <div data-aos="fade-left" className="flex flex-col gap-5">
        <h2 className="text-3xl font-bold text-cyan-500">Our Story</h2>

        <p className="leading-relaxed">
          Founded in 2025,{" "}
          <span className="font-semibold text-cyan-500 font-mono">FastBite</span>{" "}
          began as a dream shared between passionate food lovers who believed that
          fast food didnt have to mean low quality. What started as a small kitchen
          serving a handful of loyal customers quickly evolved into a full-scale
          culinary experience known for its speed, flavor, and heart.
        </p>

        <p className="leading-relaxed">
          Every dish we create tells a story — a story of flavor, craftsmanship, and
          dedication. From the sizzling sound of freshly grilled burgers to the
          comforting aroma of homemade sauces, every detail matters. We source our
          ingredients responsibly, partner with local farmers, and make sure that
          every bite you take reflects both quality and care.
        </p>

        <p className="leading-relaxed">
          But{" "}
          <span className="font-semibold text-cyan-500 font-mono">FastBite</span> is
          more than just food — it`s about connection. We believe that great meals
          bring people together, whether it`s family dinners, friends hanging out, or
          late-night cravings after a long day. That`s why our mission is simple:
          bring the warmth of home-cooked flavor right to your doorstep, without the
          wait.
        </p>

        <p className="leading-relaxed">
          Our chefs combine global inspirations with modern culinary techniques to
          craft menus that surprise and satisfy. Each recipe goes through multiple
          rounds of testing to ensure it meets our golden standard — quick, tasty, and
          unforgettable. From juicy burgers to crisp fries and refreshing beverages,
          every item is made with passion and precision.
        </p>

        <p className="leading-relaxed">
          As we continue to grow, our vision remains unchanged — to redefine fast food
          through quality, creativity, and love for flavor. We don`t just make meals;
          we create moments that stay with you. Every order is a promise of freshness,
          speed, and a taste you`ll come back for.
        </p>

        <p className="italic text-gray-400 border-l-4 border-cyan-500 pl-4 mt-3">
          “Where speed meets flavor - enjoy chef-crafted dishes delivered with
          passion and quality, right to your doorstep.”
        </p>
      </div>
      </section>

      {/* VALUES SECTION */}
      <section className="w-full py-16">
        <div className=" text-center">
          <h2 className="text-3xl font-bold text-cyan-500 mb-12">
            Our Core Values
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {/* HOURS */}
            <div
              data-aos="fade-right"
              className="p-8 border border-slate-600 rounded-2xl hover:-translate-y-2 hover:border-cyan-500 transition duration-300 bg-slate-900/40"
            >
              <div className="flex items-center justify-center gap-3 mb-4">
                <FaRegClock className="text-cyan-500 text-xl" />
                <h3 className="text-xl font-semibold text-cyan-500">Hours</h3>
              </div>
              <div className="flex justify-center text-sm md:text-base gap-5">
                <div className="text-gray-400 text-left">
                  <p>Monday - Thursday</p>
                  <p>Friday - Saturday</p>
                  <p>Sunday</p>
                </div>
                <div className="text-gray-300 font-semibold text-left">
                  <p>5:00 PM - 10:00 PM</p>
                  <p>5:00 PM - 11:00 PM</p>
                  <p>5:00 PM - 9:00 PM</p>
                </div>
              </div>
            </div>

            {/* LOCATION */}
            <div
              data-aos="fade-up"
              className="p-8 border border-slate-600 rounded-2xl hover:-translate-y-2 hover:border-cyan-500 transition duration-300 bg-slate-900/40"
            >
              <div className="flex items-center justify-center gap-3 mb-4">
                <IoLocationOutline className="text-cyan-500 text-xl" />
                <h3 className="text-xl font-semibold text-cyan-500">
                  Location
                </h3>
              </div>
              <div className="text-sm md:text-base text-gray-400 space-y-2">
                <p>123 Flavor Street, Foodie City</p>
                <p>456 Gourmet Ave, Taste Town</p>
                <p>789 Culinary Blvd, Dishville</p>
              </div>
            </div>

            {/* CONTACT */}
            <div
              data-aos="fade-left"
              className="p-8 border border-slate-600 rounded-2xl hover:-translate-y-2 hover:border-cyan-500 transition duration-300 bg-slate-900/40"
            >
              <div className="flex items-center justify-center gap-3 mb-4">
                <MdOutlinePhoneCallback className="text-cyan-500 text-xl" />
                <h3 className="text-xl font-semibold text-cyan-500">Contact</h3>
              </div>
              <div className="text-sm md:text-base text-gray-400 space-y-1">
                <p>(333) 123-FOODY</p>
                <p>fastbite@gmail.com</p>
                <p>Instagram: @FastBite</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <div
        data-aos="zoom-in"
        className="mt-10 max-w-3xl flex flex-col items-center text-centerrounded-2xl p-10 bg-slate-900/30 hover:border-cyan-500 transition duration-300"
      >
        <h3 className="text-2xl font-bold text-cyan-500 mb-3">
          Hungry for something amazing?
        </h3>
        <p className="text-gray-400 mb-6 max-w-2xl">
          Join thousands of happy foodies who trust FastBite for fast,
          high-quality meals delivered hot and fresh every day.
        </p>
        <button className="px-10 py-3 bg-cyan-500 hover:bg-transparent hover:border border-cyan-500 text-white rounded-full font-semibold transition">
          Order Now
        </button>
      </div>
    </div>
    
  );
};

export default About;
