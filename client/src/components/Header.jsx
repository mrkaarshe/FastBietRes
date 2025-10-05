// import React, { useState, useEffect } from 'react'
// import { Link, useNavigate } from 'react-router-dom'
// import { IoCartOutline } from "react-icons/io5";
// import { FaAlignRight, FaShopify , FaUser } from "react-icons/fa";
// import { CiUser, CiLogout } from "react-icons/ci";
// import { IoMdClose } from "react-icons/io";
// import { PiSignIn } from "react-icons/pi";
// import Cart from './Cart';
// import { useSelector } from 'react-redux';
// import products from '../Products';

// const Header = () => {
//     const [togel, setTogle] = useState(true)
//     const [togelContact, setTogelContect] = useState(true)
//     const [open, setOpen] = useState(false)
//     const [togelProfile , setTogelProfile] = useState(false)
//     const [user, setUser] = useState(null)
//     const navigate = useNavigate()

   
//     const carts = useSelector(store => store.cart.items)
//     const TotalQuantity = carts.reduce((total, item) => total + item.quantity, 0)
//     const subtotal = carts.reduce((acc, item) => {
//         const product = products.find(p => p.id === item.productId);
//         if (product) {
//             return acc + product.price * item.quantity;
//         }
//         return acc;
//     }, 0);
//     const delivery = subtotal > 0 ? 5 : 0
//     const total = subtotal + delivery


//     useEffect(() => {
//         const storedUser = localStorage.getItem('user');
//         if (storedUser) setUser(JSON.parse(storedUser));
//         const handleStorageChange = () => {
//             const updatedUser = localStorage.getItem("user");
//             setUser(updatedUser ? JSON.parse(updatedUser) : null);
//         };

//         window.addEventListener("storage", handleStorageChange);

//         return () => {
//             window.removeEventListener("storage", handleStorageChange);
//         };
//     }, []);

//     const handleLogout = () => {
//         localStorage.removeItem('user')
//         localStorage.removeItem('token')
//         localStorage.removeItem('cart')
//         setUser(null)
//         navigate('/login')
//     }

//     return (
//         <>
//         <div className='py-4  max-w-94 md:max-w-7xl shadow-sm shadow-[#fa961d]  backdrop-blur-xl flex justify-between items-center mx-auto container px-10 rounded-lg fixed top-5 right- left-0 text-gray-700 font-bold z-100'>
        
//             {/* Logo */}
//             <div className='text-[#fa961d] font-mono font-extralight text-xl'>FastBite</div>

//             {/* Navigation */}
//             <div className='hidden md:block relative'>
//                 <ul className='flex gap-2'>
//                     <Link to={'/home'} className='text-gray-300 font-mono text-sm hover:scale-110'>Home</Link>
//                     <span className='text-[#fa961d] text-sm'>/</span>
//                     <Link to={'/about'} className='text-gray-300 font-mono text-sm hover:scale-110'>About</Link>
//                     <span className='text-[#fa961d] text-sm'>/</span>
//                     <Link to={'/menu'} className='text-gray-300 font-mono text-sm hover:scale-110'>Menu</Link>
//                     <span className='text-[#fa961d] text-sm'>/</span>
//                     <Link to={'/contact'}  className='text-gray-300 font-mono text-sm hover:scale-110'>ContactUs</Link>
//                 </ul>
//             </div>

//             {/* Right icons */}
//             <div className='relative flex justify-between items-center gap-10'>
//                 <div className='flex relative justify-between items-center gap-4'>
//                     <div className='flex justify-between items-center gap-5 px-3 py-1'>
//                         <button onClick={() => setOpen(!open)} className='text-3xl text-[#fa961d] relative'>
//                              <span className='absolute text-xl -top-5 text-gray-300'>{TotalQuantity}</span>
//                              <FaShopify /> 
//                         </button>

//                         {/* Profile dropdown */}
//                         {user ? (
//                         <>
//                             <div
//                             className="border rounded-full p-2 cursor-pointer"
//                             onClick={() => setTogelProfile(!togelProfile)}
//                             >
//                             <p className="text-2xl text-[#fa961d]">
//                                {togelProfile ? <IoMdClose/> : <FaUser/> }
//                             </p>
//                             </div>

//                             <div
//                             className={`absolute top-23 -right-10 bg-[#212e39] rounded-2xl p-5 min-w-[300px] min-h-[120px] shadow-2xl flex flex-col gap-2 transform transition-transform ease-in-out duration-300 ${
//                                 togelProfile ? "translate-x-0 opacity-100" : "translate-x-[200px] opacity-0 pointer-events-none"
//                             }`}
//                             >
//                             <div className="text-lg py-2 rounded-lg flex gap-2 items-center">
//                                 <span className="text-[#fa961d] font-bold text-2xl">
//                                 <CiUser />
//                                 </span>
//                                 <span className='text-white'>@</span>
//                             </div>

//                             <div className="text-lg py-2 rounded-lg flex gap-2 items-center">
//                                 <span className="text-[#fa961d] font-bold text-2xl">
//                                 <CiLogout />
//                                 </span>
//                                 <button
//                                 className="text-center px-1 text-white rounded-lg font-bold text-lg flex py-2"
//                                 onClick={handleLogout}
//                                 >
//                                 Log Out
//                                 </button>
//                             </div>
//                             </div>
//                         </>
//                         ) : (
//                         <Link
//                             to={"/login"}
//                             className="text-white border-2 rounded-full border-[#fa961d] hover:bg-[#fa961d] transition-colors py-2 px-5 text-sm font-extrabold flex justify-center items-center gap-3"
//                         >
//                             <span className="font-extrabold text-lg">
//                             <PiSignIn />
//                             </span>
//                             SignIn
//                         </Link>
//                         )}
//                     </div>

//                     {/* Mobile menu toggle */}
//                     <button onClick={() => setTogle(!togel)} className='block md:hidden text-2xl text-[#fa961d]'>
//                         {togel ? <FaAlignRight /> : <IoMdClose />}
//                     </button>
//                 </div>

//                 {/* Mobile nav */}
//                 <div className={`${togel ? 'translate-x-[1000px] duration-300' : 'translate-x-0 duration-300'} absolute bg-[#212e39] shadow-2xl backdrop-blur-3xl top-23 -right-10 min-w-sm rounded-md z-100`}>
//                     <ul className='flex flex-col gap-2'>
//                         <Link to={'/home'} className='text-gray-300 hover:text-[#fa961d] text-center px-10 py-2 rounded-lg mx-2 mt-3'>Home</Link>
//                         <Link to={'/about'} className='text-gray-300 hover:text-[#fa961d] text-center px-10 py-2 rounded-lg mx-2'>About</Link>
//                         <Link to={'/menu'} className='text-gray-300 hover:text-[#fa961d] text-center px-10 py-2 rounded-lg mx-2'>Menu</Link>
//                         <Link to={'/contact'} className='text-gray-300 hover:text-[#fa961d] px-10 py-2 rounded-lg text-center mx-2'>Contact Us</Link>
//                     </ul>
//                 </div>
//             </div>

//             {/* Cart sidebar */}
//             <div className="absolute right-0 top-23 z-100">
//                 <div className={`absolute min-h-[70vh] min-w-sm right-0 rounded-xl bg-[#212e39] text-gray-700 shadow-2xl z-10 transform transition-transform duration-300 ease-in-out
//                    ${open ? "translate-x-0" : "translate-x-[1000px]"}`}>
//                     {/* Header */}
//                     <div className="flex justify-between items-center p-4 bg-[#fa961d] rounded-xl h-20 text-white">
//                         <h2 className="text-xl font-bold">Cart</h2>
//                         <button onClick={() => setOpen(false)} className="text-gray-100 text-2xl">
//                             <IoMdClose />
//                         </button>
//                     </div>

//                     {/* Items */}
//                     <div className='max-h-[500px]  overflow-auto scrollbar-hide'>
//                         <div className="p-4 flex flex-col gap-4 rounded-lg">
//                             <Cart />
//                         </div>
//                     </div>                  

//                     {/* Cart total */}
//                     <div className="mt-2 absolute right-0 left-0 bottom-0 bg-[#fa961d] px-3 text-white rounded-xl p-4">
//                         <p className="flex justify-between"><span>Subtotal</span> <span>$ {subtotal.toFixed(2)}</span></p>
//                         <p className="flex justify-between"><span>Delivery</span> <span>$ {delivery.toFixed(2)}</span></p>
//                         <p className="flex justify-between font-bold text-lg"><span>Total</span> <span>$ {total.toFixed(2)}</span></p>
//                         <Link to={'/checkout'} className="px-10 flex justify-center mt-4 py-2 bg-[#212e39] hover:bg-[#333] text-white rounded">Checkout ${total.toFixed(2)}</Link>
//                     </div>
//                 </div>
//             </div>
//         </div>
//         </>
//     )
// }

// export default Header


import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { IoCartOutline } from "react-icons/io5";
import { FaAlignRight, FaShopify, FaUser } from "react-icons/fa";
import { CiUser, CiLogout } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import { PiSignIn } from "react-icons/pi";
import Cart from './Cart';
import { useSelector } from 'react-redux';
import products from '../Products';

const Header = () => {
  const [togel, setTogle] = useState(true)
  const [open, setOpen] = useState(false)
  const [togelProfile, setTogelProfile] = useState(false)
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  const carts = useSelector(store => store.cart.items)
  const TotalQuantity = carts.reduce((total, item) => total + item.quantity, 0)
  const subtotal = carts.reduce((acc, item) => {
    const product = products.find(p => p.id === item.productId);
    return product ? acc + product.price * item.quantity : acc;
  }, 0);
  const delivery = subtotal > 0 ? 5 : 0
  const total = subtotal + delivery

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) setUser(JSON.parse(storedUser));

    const handleStorageChange = () => {
      const updatedUser = localStorage.getItem("user");
      setUser(updatedUser ? JSON.parse(updatedUser) : null);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    localStorage.removeItem('cart')
    setUser(null)
    navigate('/login')
  }

  return (
    <>
    <div className=''>
      <div className="py-4  w-[97%] md:w-full mx-auto shadow-sm shadow-[#fa961d]  backdrop-blur-xl flex gap-x-10 justify-between items-center   px-5 rounded-lg fixed top-0.5 left-2 text-gray-700 font-bold z-100">

        {/* Logo */}
        <div className="text-[#fa961d] font-mono font-extralight text-xl">
          FastBite
        </div>

        {/* Navigation */}
        <div className="hidden md:block relative">
          <ul className="flex gap-2">
            <Link to={'/home'} className="text-gray-300 font-mono text-sm hover:scale-110">Home</Link>
            <span className="text-[#fa961d] text-sm">/</span>
            <Link to={'/about'} className="text-gray-300 font-mono text-sm hover:scale-110">About</Link>
            <span className="text-[#fa961d] text-sm">/</span>
            <Link to={'/menu'} className="text-gray-300 font-mono text-sm hover:scale-110">Menu</Link>
            <span className="text-[#fa961d] text-sm">/</span>
            <Link to={'/contact'} className="text-gray-300 font-mono text-sm hover:scale-110">ContactUs</Link>
          </ul>
        </div>

        {/* Right icons */}
        <div className="relative flex justify-between items-center gap-8">
          <div className="flex justify-between items-center gap-4">
            {/* Cart icon */}
            <button onClick={() => setOpen(!open)} className="text-3xl text-[#fa961d] relative">
              <span className="absolute text-sm -top-2 -right-3 bg-[#fa961d] text-white px-1 rounded-full">
                {TotalQuantity}
              </span>
              <FaShopify />
            </button>

            {/* Profile dropdown */}
            {user ? (
              <>
                <div
                  className="border rounded-full p-2 cursor-pointer"
                  onClick={() => setTogelProfile(!togelProfile)}
                >
                  <p className="text-2xl text-[#fa961d]">
                    {togelProfile ? <IoMdClose /> : <FaUser />}
                  </p>
                </div>

                <div
                  className={`absolute top-17 right-2 bg-[#212e39] rounded-2xl p-5 min-w-[250px] min-h-[120px] shadow-2xl flex flex-col gap-2 transform transition-all ease-in-out duration-300 ${
                    togelProfile ? "translate-x-0 opacity-100" : "translate-x-[1000px] opacity-0 pointer-events-none"
                  }`}
                >
                  <div className="text-lg py-2 rounded-lg flex gap-2 items-center text-white">
                    <CiUser className="text-[#fa961d] text-2xl" />
                    <span>@{user?.username || "User"}</span>
                  </div>

                  <div className="text-lg py-2 rounded-lg flex gap-2 items-center">
                    <CiLogout className="text-[#fa961d] text-2xl" />
                    <button
                      className="text-center px-1 text-white rounded-lg font-bold text-lg flex py-2"
                      onClick={handleLogout}
                    >
                      Log Out
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <Link
                to={"/login"}
                className="text-white border-2 rounded-full border-[#fa961d] hover:bg-[#fa961d] transition-colors py-2 px-5 text-sm font-extrabold flex justify-center items-center gap-3"
              >
                <PiSignIn className="text-lg" />
                SignIn
              </Link>
            )}

            {/* Mobile menu toggle */}
            <button
              onClick={() => setTogle(!togel)}
              className="block md:hidden text-2xl text-[#fa961d]"
            >
              {togel ? <FaAlignRight /> : <IoMdClose />}
            </button>
          </div>

          {/* Mobile nav */}
          <div
            className={`${
              togel ? "translate-x-[1000px]" : "translate-x-0"
            } absolute bg-[#212e39]/90 shadow-2xl backdrop-blur-3xl top-17 right-2 min-w-[320px] rounded-md z-[100] transition-transform duration-300`}
          >
            <ul className="flex flex-col gap-2 py-4">
              <Link to={'/home'} className="text-gray-300 hover:text-[#fa961d] text-center px-10 py-2 rounded-lg">Home</Link>
              <Link to={'/about'} className="text-gray-300 hover:text-[#fa961d] text-center px-10 py-2 rounded-lg">About</Link>
              <Link to={'/menu'} className="text-gray-300 hover:text-[#fa961d] text-center px-10 py-2 rounded-lg">Menu</Link>
              <Link to={'/contact'} className="text-gray-300 hover:text-[#fa961d] text-center px-10 py-2 rounded-lg">Contact Us</Link>
            </ul>
          </div>
        </div>

        {/* Cart sidebar */}
        <div className="absolute right-0 top-20 z-[100]">
          <div
            className={`absolute min-h-96 min-w-[300px] right-2 rounded-xl bg-[#212e39] text-gray-700 shadow-2xl transform transition-transform duration-300 ease-in-out ${
              open ? "translate-x-0" : "translate-x-[1000px]"
            }`}
          >
            {/* Header */}
            <div className="flex justify-between items-center p-4 bg-[#fa961d] rounded-t-xl h-20 text-white">
              <h2 className="text-xl font-bold">Cart</h2>
              <button onClick={() => setOpen(false)} className="text-gray-100 text-2xl">
                <IoMdClose />
              </button>
            </div>

            {/* Items */}
            <div className=" w-[350px] max-h-100 overflow-auto mb-10 ">
              <div className="p-4 flex flex-col gap-4 rounded-lg">
                <Cart />
              </div>
            </div>

            {/* Cart total */}
            <div className="mt-2 absolute right-0 left-0 bottom-0 bg-[#fa961d] px-3 text-white rounded-b-xl p-4">
              <p className="flex justify-between"><span>Subtotal</span> <span>$ {subtotal.toFixed(2)}</span></p>
              <p className="flex justify-between"><span>Delivery</span> <span>$ {delivery.toFixed(2)}</span></p>
              <p className="flex justify-between font-bold text-lg"><span>Total</span> <span>$ {total.toFixed(2)}</span></p>
              <Link to={'/checkout'} className="px-10 flex justify-center mt-4 py-2 bg-[#212e39] hover:bg-[#333] text-white rounded">
                Checkout ${total.toFixed(2)}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
      
    </>
  )
}

export default Header
