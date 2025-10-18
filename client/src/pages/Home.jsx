
import React from 'react'
import  aos from 'aos';
import 'aos/dist/aos.css';


import Menu from './Menu'
import { MdAddShoppingCart } from "react-icons/md";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa"
import { useSelector, useDispatch } from 'react-redux'
import { addToCart } from '../Store/Cart'
import { Link } from 'react-router-dom';
import Contact from './Contact';
import About from './About';


const Home = () => {
    const carts = useSelector(store => store.cart.items)
    

  const dispatch = useDispatch();
  const items = [
  
{
id: 6,
    title: "Pizza",
    subtitle: "Melted Cheese",
    price: 12.99,
    image: "/bizza.jpg",
    category: "Pizza",
  },
  {
    id: 9,
    title: "Grilled Chicken",
    subtitle: "Tender and Flavorful",
    price: 9.99,
    image: './chiken.jpg',
    category: "Grilled",
  },
  {
    id: 10,
    title: "Pasta Alfredo",
    subtitle: "Creamy Fettuccine",
    price: 9.80,
    image: './bastaAlfredo.jpg',
    category: "Food",
  },
  {
    id: 12,
    title: "Chicken Biryani",
    subtitle: "Spicy and Savory",
    price: 9.10,
    image: './chikenBIryani.jpg',
    category: "Food",
  },

    
  ];
const handleAddToCart = (item) => {
  dispatch(addToCart({
    productId: item.id,
    quantity: 1
  }));
      useEffect(()=>{
        aos.init({duration:300},{once:true})
      })
};


  return (
    <>
      <div className="  w-screen sm:w-sm md:w-1/1 flex flex-col md:flex-col justify-around items-center mt-10 font-Poppins  lg:flex-row ">

        
        <div data-aos="fade-right" className=" mt-15 w-screen md:w-1/1 lg:w-1/2 mx-2 px-2 md:mx-5 flex flex-col  text-space-y-1 lg:space-y-2">
          <p className="text-yellow-500 text-6xl md:text-7xl lg:text-8xl font-bold  ">FastBite</p>
          <p className="text-3xl mb-3 font-bold lg:text-6xl max-w-4xl text-gray-300">
            The Fastest Food Delivery in <span className="text-yellow-500 text-4xl">Somalia</span>
          </p>
          <p className="text-gray-400 text-xs font-semibold sm:text-md md:text-[16px]  max-w-sm lg:max-w-3xl">
            Where speed meets flavor — enjoy chef-crafted dishes prepared with passion and delivered with perfection. Every bite is a blend of freshness, flavor, and quality — from our kitchen to your doorstep. Whether you’re craving something spicy, sweet, or savory, our chefs bring restaurant-quality meals straight to your home — hot, fast, and full of love.
          </p>
         <div className='grid grid-cols-1 md:grid-cols-2 gap-2 mt-5 lg:mt-10 lg:w-1/1'>
           <Link to={'/menu'} className='bg-yellow-500 border-slate-600 w-[95%] md:w-1/1 py-4 rounded-lg text-center text-white font-bold hover:bg-transparent hover:border-1 '>View Menu</Link>
           <button className='border-2  border-slate-600 w-[95%] md:w-1/1 py-4 rounded-lg font-bold hover:bg-yellow-500 text-white transition-colors duration-300 hover:border-0'>Sea More</button>
         </div>
                   <div className="flex gap-4 justify-start items-center mt-4">
                     <a href="#" className=" w-15 h-15 flex justify-center items-center hover:text-yellow-500 border-2 border-slate-600  rounded-full text-white text-xl"><FaFacebook /></a>
                     <a href="#" className=" w-15 h-15 flex justify-center items-center hover:text-yellow-500 border-2 border-slate-600 rounded-full text-white text-xl"><FaInstagram /></a>
                     <a href="#" className=" w-15 h-15 flex justify-center items-center hover:text-yellow-500 border-2 border-slate-600 rounded-full text-white text-xl"><FaTwitter /></a>
                   </div>
        </div>

        {/* Cards Section */}
      <div data-aos="fade-left" className=' bg-gradient-to-r from-slate-900/20 to-slate-950/30  mt-30 rounded-xl w-screen sm:w-sm md:w-1/1 mx-10  lg:w-1/2  z-10  pb-10'>
       
          <div className="flex flex-col  md:felx-row   sm:mt-10 md:mt-15 sm:pt-5  ">
         <h2 className='text-5xl text-yellow-300 text-center font-bold '>Our Specialist</h2>
            <div className='grid grid-cols-1  md:grid-cols-2  md:gap-5     p-2 lg:p-5 '>
            {items.map((item) => (
              <div data-aos="fade-up" key={item.id} className=" relative ">

                <div className="mt-5 shadow-2xl bg-black p-2 gap-1  rounded-full  flex justify-around  pt-2 min-w-sm lg:min-w-[300px]   lg:mx-2  relative z-100">
                 <div className="">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-35 h-35 object-cover rounded-full shadow-lg border-4 border-slate-600 hover:scale-125 duration-300 transition-transform cursor-pointer"
                  />
                </div>
                  <div className="text-center">
                    <h3 className="text-lg font-semibold text-gray-300 pt-10">{item.title}</h3>
                    <p className="mt-1 text-xl text-gray-300">{item.subtitle}</p>

                    <div className="">
                      <span className="text-xl font-bold text-yellow-300">${item.price}</span>
                    </div>
                  </div>
                </div>

               
                <div className=""></div>
              </div>
))}
            </div>

          </div>
        </div>
      </div>
      
      <Menu />
      <Contact />
      <About/>
    </>
  );
};

export default Home;
