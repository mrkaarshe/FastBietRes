import React from 'react'
import Layout from './components/Layout'
import Home from './pages/Home'
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
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>   
          <Route index element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/home' element={<Home />} />
          <Route path=':details/:id' element={<Detail />} />
          <Route path='/menu' element={<Menu />} />
          <Route path='/register' element={<Register />} />
           <Route path='/login' element={<Login />} />
           <Route path="/checkout" element={<Checkout />} />
           <Route path="/contact" element={<Contact />} />
            
           <Route path="/order-confirmed" element={<OrderConfirmed />} />
          <Route path='*' element={<div>404 page not founs</div>} />
        </Route>
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  )
}

export default App
