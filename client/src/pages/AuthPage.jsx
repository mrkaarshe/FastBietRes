
import toast from "react-hot-toast";
import * as jwt_decode from "jwt-decode";

import {useState} from "react"
import { useNavigate } from "react-router-dom"; 
import { loginSuccess } from "../Store/userSlice";
import { useDispatch } from "react-redux";

export default function AuthPage() {
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading , setloading] = useState(false)
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

const handleSubmit = async (e) => {
  e.preventDefault();
  setloading(true); // Start loading immediately
  try {
    const url = mode === "login"
      ? "https://fastbietres-1.onrender.com/api/auth/login"
      : "https://fastbietres-1.onrender.com/api/auth/register";

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    console.log(data)
    if (!res.ok) throw new Error(data.message || "Something went wrong");
    
    localStorage.setItem("token", data.token);
    dispatch(loginSuccess(data.user))
    toast.success(mode === "login" ? "Login successful!" : "Registration successful!");
    navigate("/home");
  } catch (err) {
    console.error(err);
    toast.error(err.message);
  } finally {
    setloading(false); // Stop loading regardless of success or error
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center  text-yellow-500 px-4">
      <div className="w-full border border-zinc-800 max-w-md bg-black rounded-2xl shadow-2xl backdrop-blur-lg p-8 transition-all duration-300 hover:shadow-yellow-500/30">
        {/* Title */}
        <h1 className="text-3xl font-bold text-center mb-8 tracking-tight">
          {mode === "login" ? "Login to your account" : "Register a new account"}
        </h1>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex  border border-slate-600  rounded-xl p-1">
            <button
              onClick={() => setMode("login")}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                mode === "login"
                  ? "bg-yellow-500 text-white shadow-md shadow-yellow-500/40"
                  : "text-white hover:text-yellow-500"
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setMode("register")}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                mode === "register"
                  ? "bg-yellow-500 text-white shadow-md shadow-yellow-500/40"
                  : "text-white hover:text-yellow-500"
              }`}
            >
              Register
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {mode === "register" && (
            <div>
              <label className="block text-sm mb-1 text-white">Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full bg-black  focus:bg-black text-white p-3 rounded-lg border border-slate-700 focus:ring-2 focus:ring-yellow-500 outline-none transition"
                placeholder="Your Name"
                required
              />
            </div>
          )}

          <div>
            <label className="block text-sm mb-1 text-white">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full bg-black  focus:bg-zinc-800 text-white p-3 rounded-lg border border-slate-700 focus:ring-2 focus:ring-yellow-500 outline-none transition"
              placeholder="Email"
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-1 text-white">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full bg-black  focus:bg-zinc-800  text-white p-3 rounded-lg border border-slate-700 focus:ring-2 focus:ring-yellow-500 outline-none transition"
              placeholder="******"
              required
            />
             </div>
            {mode === 'register' ? '' : 
            (         
            <p
            onClick={() => navigate('/forgot-password')}
            className='mb-6 text-yellow-500 cursor-pointer'
          >
            Forgot Password ?
          </p>)}

          <button
            type="submit"
            className="w-full py-3 mt-2 rounded-lg font-semibold bg-yellow-500  hover:from-yellow-500 hover:bg-transparent hover:border border-slate-600 hover:text-white text-slate-900 transition-all duration-200 "
          >
           {loading ? "Loading..." : mode === "login" ? "Login" : "Register"}


          </button>
        </form>

        {/* Footer links */}
        <p className="text-sm text-center text-slate-400 mt-8">
          {mode === "login" ? (
            <>
              Don't have an account?{" "}
              <span
                className="text-yellow-500 cursor-pointer hover:underline"
                onClick={() => setMode("register")}
              >
                Register
              </span>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <span
                className="text-yellow-500 cursor-pointer hover:underline"
                onClick={() => setMode("login")}
              >
                Login
              </span>
            </>
          )}
        </p>
      </div>
    </div>
  );
}


// import React, { useState, useContext, useEffect } from 'react'
// import { assets } from '../assets/assets'
// import { useNavigate } from 'react-router-dom'

// import axios from 'axios'
// import { toast } from 'react-toastify'

// const AuthPage = () => {
//   const navigate = useNavigate()

//   const [state, setState] = useState('sign in')
//   const [name, setName] = useState('')
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')
//   const [userData, setUserData] = useState(null)

//   // ✅ sax error-ka: waa inaad sugtaa await marka aad sameyneyso get request
//   const getUsersData = async () => {
//     try {
//       const token = JSON.parse(localStorage.getItem('user'))?.token
//       if (!token) return toast.info('Please login first')

//       const { data } = await axios.get(`https://fastbietres-1.onrender.com//api/user/data`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       })
//       console.log('✅ User data:', data)
//       setUserData(data)
//     } catch (error) {
//       toast.error(error.response?.data?.message || error.message)
//     }
//   }

//   const submitHandler = async (e) => {
//     e.preventDefault()
//     axios.defaults.withCredentials = true

//     try {
//       if (state === 'sign up') {
//         const { data } = await axios.post(`https://fastbietres-1.onrender.com//api/auth/register`, {
//           name,
//           email,
//           password,
//         })
//         toast.success('Account created successfully ✅')
//         localStorage.setItem('user', JSON.stringify(data.data))
        
//         setUserData(data.data)
        
//         navigate('/')
//       } else {
//         const { data } = await axios.post(`https://fastbietres-1.onrender.com//api/auth/login`, {
//           email,
//           password,
//         })
//         toast.success('Login successful ')
//         localStorage.setItem('user', JSON.stringify(data.data))
        
        
//         setUserData(data.data)
//         navigate('/home')
//       }
//     } catch (error) {
//       toast.error(error.response?.data?.message || error.message)
//     }
//   }

//   // ✅ markii component-ku mount gareeyo, hel xogta user-ka haddii uu login yahay
//   useEffect(() => {
    
//   }, [])

//   return (
//     <div className='flex items-center justify-center min-h-screen px-6 sm:px-0 bg-black'>

//       <div className='border border-zinc-800 p-10 rounded-lg shadow-lg w-full sm:w-96 text-white text-sm'>
//         <h2 className='text-3xl font-semibold text-yellow-500- text-center mb-3'>
//           {state === 'sign up' ? 'Create Account' : 'Login'}
//         </h2>
//         <p className='text-center  text-sm mb-6'>
//           {state === 'sign up'
//             ? 'Create Your Account'
//             : 'Login to Your Account'}
//         </p>

//         <form onSubmit={submitHandler}>
//           {state === 'sign up' && (
//             <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-zinc-900'>
//               <img src={assets.person_icon} alt='' />
//               <input
//                 type='text'
//                 placeholder='Full Name'
//                 className='bg-transparent outline-none'
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 required
//               />
//             </div>
//           )}

//           <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-zinc-900'>
//             <img src={assets.mail_icon} alt='' />
//             <input
//               type='email'
//               placeholder='Email ID'
//               className='bg-transparent outline-none'
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>

//           <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-zinc-900'>
//             <img src={assets.lock_icon} alt='' />
//             <input
//               type='password'
//               placeholder='Password'
//               className='bg-transparent outline-none'
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>

          // <p
          //   onClick={() => navigate('/reset-password')}
          //   className='mb-6 text-yellow-500 cursor-pointer'
          // >
          //   Forgot Password ?
          // </p>

//           <button
//             type='submit'
//             className='w-full rounded-full text-white py-2.5 bg-gradient-to-r from-yellow-500 to-yellow-400 font-medium'
//           >
//             {state === 'sign up' ? 'Sign Up' : 'Login'}
//           </button>
//         </form>

//         {state === 'sign up' ? (
//           <p className='text-gray-400 text-center text-sm mt-4'>
//             Already have an account?{' '}
//             <span
//               onClick={() => setState('Login')}
//               className='text-yellow-400 cursor-pointer underline'
//             >
//               Login Now
//             </span>
//           </p>
//         ) : (
//           <p className='text-gray-400 text-center text-sm mt-4'>
//             Don’t have an account?{' '}
//             <span
//               onClick={() => setState('sign up')}
//               className='text-blue-400 cursor-pointer underline'
//             >
//               Sign Up Here
//             </span>
//           </p>
//         )}
//       </div>
//     </div>
//   )
// }

// export default AuthPage
