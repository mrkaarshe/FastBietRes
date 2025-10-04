
import React from 'react'
import  aos from 'aos';
import 'aos/dist/aos.css';


import Menu from './Menu'
import { MdAddShoppingCart } from "react-icons/md";
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
      <div className=" lg:mx-10  flex flex-col md:flex-col justify-around items-center mt-10   lg:flex-row ">

        
        <div data-aos="fade-right" className=" mt-30 w-1/1 md:w-1/1 lg:w-1/2 md:px-10 ">
          <p className="text-[#fa961d] text-8xl font-bold font-mono ">FastBite</p>
          <p className="text-xl mb-3 font-bold lg:text-6xl max-w-3xl text-gray-300">
            The Fastest Food Delivery in <span className="text-[#fa961d]">Somalia</span>
          </p>
          <p className="text-gray-300 text-xs font-semibold sm:text-lg max-w-sm lg:max-w-2xl">
            Where speed meets flavor – enjoy chef-crafted dishes delivered with passion and quality, right to your doorstepion.
          </p>
         <div className='grid grid-cols-1 md:grid-cols-2 gap-2 mt-5 lg:mt-10 lg:w-1/2'>
           <Link to={'/menu'} className=' bg-[#fa961d] w-full py-2 rounded-lg text-center text-white font-bold hover:bg-transparent hover:border-1 border-[#fa961d] '>View Menu</Link>
           <button className='border-2  border-[#fa961d] w-full py-2 rounded-lg font-bold hover:bg-[#fa961d] text-white transition-colors duration-300 hover:border-0'>Sea More</button>
         </div>
        </div>

        {/* Cards Section */}
      <div data-aos="fade-left" className=' bg-gradient-to-r from-[#1d242c] to-[#1a2129]  mt-30 rounded-xl w-1/1 md:w-1/1 mx-10  lg:w-1/2  z-10  pb-10'>
       
          <div className="flex flex-col  md:felx-row   sm:mt-10 md:mt-20 sm:pt-5  ">
         <h2 className='text-3xl text-[#fa961d] text-center font-bold '>our specialist</h2>
            <div className='grid grid-cols-1  md:grid-cols-2  md:gap-5     p-2 lg:p-5 '>
            {items.map((item) => (
              <div data-aos="fade-up" key={item.id} className=" relative ">

                <div className="mt-5 shadow-lg p-2 gap-1  rounded-full  flex justify-around  pt-2 min-w-sm lg:min-w-[300px]   lg:mx-2 border-t-4 border-[#fa961d] relative z-100">
                 <div className="">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-28 h-28 object-cover rounded-full shadow-lg border-4 border-[#fa961d] hover:scale-125 duration-300 transition-transform cursor-pointer"
                  />
                </div>
                  <div className="text-center">
                    <h3 className="text-lg font-semibold text-gray-300 pt-10">{item.title}</h3>
                    <p className="mt-1 text-sm text-gray-300">{item.subtitle}</p>

                    <div className="">
                      <span className="text-xl font-bold text-[#fa961d]">${item.price}</span>
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
