import React from 'react'
import Layout from './components/Layout'
import Home from './pages/Home'
import { Toaster } from "react-hot-toast";
import Detail from './pages/Detail'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import About from './pages/About'
import Menu from './pages/Menu'
import Register from './pages/Register'
import Login from './pages/Login'
import Checkout from './components/Checkout'
import OrderConfirmed from './components/OrderConfirmed'
import Contact from './pages/Contact'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthPage from './pages/AuthPage'
import AddFood from './pages/AddFood';
import ErrorPage from './pages/ErrorPage';
import Profile from './pages/Peofile';
const App = () => {
  return (
    <BrowserRouter>
    <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        <Route path='/' element={<Layout />}>   
          <Route index element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/home' element={<Home />} />
          <Route path=':details/:id' element={<Detail />} />
          <Route path='/menu' element={<Menu />} />
          <Route path='/register' element={<AuthPage/>} />
           <Route path='/login' element={<AuthPage />} />
           <Route path="/checkout" element={<Checkout />} />
           <Route path="/contact" element={<Contact />} />
           <Route path="/add-food" element={<AddFood />} />
           <Route path="/order-confirmed" element={<OrderConfirmed />} />
           <Route path='/profile' element={<Profile />} />
          <Route path='*' element={<ErrorPage/>} />
        </Route>
        
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  )
}

export default App
