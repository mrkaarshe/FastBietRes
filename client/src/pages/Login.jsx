import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import axios from 'axios'

const Login = () => {
  const [email , setEmail] = useState('');
  const [password , setPassword] = useState('');
  const [error , setError] = useState('');
  const [loading , setLoading] = useState(false);
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('https://fastbietres.onrender.com/api/auth/login', {
        email,
        password
      });
      console.log(response.data);

        if (response.data.success && response.data.user) {
          localStorage.setItem('user', JSON.stringify(response.data.user));
          localStorage.setItem('token', response.data.token); // optional
          toast.success(response.data.message || 'Login successful');
          navigate('/home'); // redirect home
        } else {
          toast.error('Login failed: user info missing');
        }

    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
      toast.error(err.response?.data?.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='mt-30 max-w-3xl mx-auto h-[65vh] pt-10 gap-10 flex flex-col  '>
        <h1 className='font-bold text-[#fa961d] text-xl text-center my-2 '>Sign In</h1>
      <form onSubmit={handleSubmit} className='mx-2'>
         <input 
           value={email} 
           onChange={(e)=>setEmail(e.target.value)} 
           className='border-1 border-[#fa961d] text-white rounded-3xl h-14 w-full my-5 px-4 outline-[#fa961d] placeholder-white' 
           placeholder='Email' 
           type="email" 
         />
         <input 
           value={password} 
           onChange={(e)=>setPassword(e.target.value)} 
           className='border-1 border-[#fa961d] text-white rounded-3xl h-14 w-full px-4 outline-[#fa961d] placeholder-white' 
           placeholder='Password' 
           type="password" 
         />
          {error && <p className='text-red-500 my-2'>{error}</p>}
          <Link className='text-[#fa961d] pt-10 font-bold'>Forget Password ?</Link>
        <button type='submit' className='bg-[#fa961d] hover:bg-transparent hover:border border-[#fa961d] w-full font-bold rounded-3xl py-3 my-5 text-white'>
          {loading ? 'Signing in...' : 'SignIn'}
        </button>
        <p className='text-center text-white'>
         Don’t have an account? <span className='text-blue-600'><Link className='font-bold' to='/register'>SignUp</Link></span>
        </p>
      </form>  
    </div>
  )
}

export default Login
