import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
const Register = () => {
  const [name, setName] = useState(''); 
  const [email , setEmail] = useState(''); 
  const [password , setPassword] = useState('');
  const [loading , setLoading] = useState(false);
  const [error , setError] = useState('');
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:2000/api/auth/register', {
        name, 
        email,
        password
      });
      console.log(response.data);
      toast.success("Registered successfully!");
      navigate('/login')
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
      toast.error(err.response?.data?.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='mt-30 max-w-3xl mx-auto  h-[65vh]  pt-10'>
      <h1 className='font-bold text-[#fa961d] text-xl text-center my-2 '>Sign Up</h1>
      <form onSubmit={handleSubmit} className=' mx-2  '>
        <input  
          value={name} 
          onChange={(e)=> setName(e.target.value)} 
          className='border-1 border-[#fa961d] rounded-3xl h-14 w-full px-4 outline-[#fa961d] placeholder-white text-white ' 
          placeholder='First Name' 
          type="text" 
          required
        />
        <input 
          value={email} 
          onChange={(e)=> setEmail(e.target.value)} 
          className='border-1 border-[#fa961d] rounded-3xl h-14 w-full my-5 px-4 outline-[#fa961d] placeholder-white text-white ' 
          placeholder='Email' 
          type="email" 
          required
        />
        <input 
          value={password} 
          onChange={(e)=>setPassword(e.target.value)} 
          className='border-1 border-[#fa961d] rounded-3xl h-14 w-full  px-4 outline-[#fa961d] placeholder-white text-white ' 
          placeholder='Password' 
          type="password" 
          required
        />
        <button 
          type='submit' 
          disabled={loading}
          className='bg-[#fa961d] hover:bg-transparent hover:border border-[#fa961d] w-full rounded-3xl py-3 my-5 font-bold text-white'>
          {loading ? "Signing Up..." : "Sign Up"}
        </button>
        <p className='text-center text-white'>
           Already have an account? <span className='text-blue-600'><Link className='font-bold' to='/login'>Sign In</Link></span>
        </p>
      </form>  
    </div>
  )
}

export default Register
