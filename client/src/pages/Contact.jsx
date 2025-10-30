import React, { useState, useEffect } from 'react';
import aos from 'aos';
import 'aos/dist/aos.css';
import { LuMapPin } from "react-icons/lu";
import { MdOutlineEmail } from "react-icons/md";
import { MdOutlineLocalPhone } from "react-icons/md";
import { FaRegClock } from "react-icons/fa";
import { FaFacebook, FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";

const Contact = () => {
  useEffect(() => {
    aos.init({ duration: 1000 }, { once: true });
  });

  return (
    <>
      <div className="mt-25 mb-20 pb-5 ">
        <div className="px-2 lg:px-10">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-4xl font-bold text-yellow-500">Contact Us</h2>
            <p className="text-gray-300 mt-4 text-xl max-w-2xl mx-auto">
              Get in touch with our team to order your favorite meals or ask about our delivery service.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-12">
            <div id="contact" className="flex flex-col px-3 gap-10">
              {/* Contact info section */}
              <div data-aos="fade-up" className="w-full grid grid-cols-1 md:grid-cols-2 gap-10 ">
                <div data-aos="fade-right" className="flex flex-col gap-5 w-full sm:w-1/1 md:w-1/1 lg:w-1/1">
                  <h2 className="text-yellow-500 my-">CONTACT-INFO</h2>
                  <div className="flex gap-3">
                    <div className="border-1 border-zinc-800 rounded-lg hover:border-white hover:duration-300 w-20 h-20 flex justify-center items-center text-gray-300">
                      <LuMapPin />
                    </div>
                    <div className="h-5">
                      <h4 className="font-medium text-gray-300">Address</h4>
                      <p className="text-gray-400 mt-1">Mogadishu/Talex</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="border-1 border-zinc-800 rounded-lg hover:border-green-500 hover:duration-300 w-20 h-20 flex justify-center items-center text-gray-300">
                      <MdOutlineLocalPhone />
                    </div>
                    <div className="h-5">
                      <h4 className="font-medium text-gray-300">Phone</h4>
                      <p className="text-gray-400 mt-1">(+252)611011973</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="border-1 border-zinc-800 rounded-lg hover:border-red-400 hover:duration-300 min-w-19 h-20 flex justify-center items-center text-gray-400">
                      <FaRegClock />
                    </div>
                    <div className="h-5">
                      <h4 className="font-medium text-gray-300">Working Hours</h4>
                      <p className="text-gray-400 mt-1 text-xs">
                        Saturday - Wednesday: 9am - 12pm <br />
                        Saturday: 10am - 12pm <br />
                        Friday: Morning Closed
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <p className="h-20 rounded-full flex justify-center items-center min-w-20 text-white border-1 border-zinc-800 hover:border-white">
                      <FaEnvelope size={20} />
                    </p>
                    <p className="h-20 rounded-full flex justify-center items-center min-w-20 text-white border-1 border-zinc-800 hover:border-green-500">
                      <FaWhatsapp size={20} />
                    </p>
                    <p className="h-20 rounded-full flex justify-center items-center min-w-20 text-white border-1 border-zinc-800 hover:border-blue-400">
                      <FaFacebook size={20} />
                    </p>
                  </div>
                </div>

                {/* Contact Form */}
                <div className="w-full rounded-2xl p- flex flex-col gap-5">
                  <h2 className="text-white text-2xl">
                    We’d Love to Hear From <span className="text-yellow-500">You</span>
                  </h2>

                  <form
                    action="https://formspree.io/f/xkgpzpjk" // Replace with your actual Formspree ID
                    method="POST"
                    className="flex flex-col gap-5"
                  >
                    <input
                      type="text"
                      className="h-10 px-3 w-1/1 rounded-lg text-white border-1 border-zinc-800 focus:ring-yellow-500 outline-0"
                      required
                      placeholder="Your Name"
                      name="name" // Add name attribute for Formspree
                    />
                    <input
                      type="email"
                      className="h-10 px-3 w-1/1 rounded-lg text-white border-1 border-zinc-800 focus:ring-yellow-500 outline-0"
                      required
                      placeholder="Your Email"
                      name="email" // Add name attribute for Formspree
                    />
                    <input
                      type="text"
                      className="h-10 px-3 w-1/1 rounded-lg text-white border-1 border-zinc-800 focus:ring-yellow-500 outline-0"
                      required
                      placeholder="Your Phone"
                      name="phone" // Add name attribute for Formspree
                    />
                    <textarea
                      className="min-h-40 text-white max-h-40 border-1 border-zinc-800 focus:ring-yellow-500 outline-0 rounded-lg p-5"
                      required
                      placeholder="Type your message..."
                      name="message" // Add name attribute for Formspree
                    ></textarea>
                    <button
                      type="submit"
                      className="w-full bg-yellow-500 border-zinc-800 text-white rounded-lg py-4 hover:bg-transparent transform-colors duration-300"
                    >
                      Send
                    </button>
                  </form>
                </div>
              </div>

              {/* Reservations Section */}
              <div className="border border-zinc-800 text-gray-300 p-7 rounded-lg w-1/1 ">
                <div>Reservations</div>
                <div>For the best dining experience, we recommend making a reservation.</div>
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    Call us at <span className="font-semibold text-yellow-500">(+252611011973) FAST-BITE</span>
                  </p>
                  <div className="space-y-2 text-gray-300">
                    <p className="text-sm">
                      <strong>Party Size:</strong> We accommodate parties of 1-12 guests
                    </p>
                    <p className="text-sm">
                      <strong>Cancellation:</strong> Please provide 24-hour notice
                    </p>
                    <p className="text-sm">
                      <strong>Special Occasions:</strong> Let us know about birthdays, anniversaries, or special dietary needs
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Map Section */}
            <div className="h-[400px] md:h-[720px] w-full rounded-lg overflow-hidden" data-aos="fade-left">
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
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
