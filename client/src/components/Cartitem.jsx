// import React, { useState, useEffect } from 'react'
// import products from '../Products'
// import { FaTrash } from "react-icons/fa6";

// const Cartitem = (props) => {
//   const { productId, quantity } = props.data   // <-- Sax spelling
//   const [detail, setDetail] = useState(null)

//   useEffect(() => {
//     const findDetail = products.find(product => product.id === productId)
//     setDetail(findDetail || null)
//   }, [productId])

//   if (!detail) {
//     return <div className="text-gray-300">No cart item found</div>
//   }

//   return (
//     <div className='border-2 rounded-lg py-6 px-4 mb-3'>
//       <div className="flex justify-between items-center">
//         <img className='w-20 rounded-lg' src={detail.image} alt={detail.title} />
//         <div>
//           <h3 className="font-semibold">{detail.title}</h3>
//           <p className="text-gray-300">₹ {detail.price}</p>
//         </div>
//         <div className='flex gap-3 text-2xl items-center'>
//           <span className='cursor-pointer'>-</span>
//           <span>{quantity}</span>
//           <span className='cursor-pointer'>+</span>
//           <button className='text-purple-500'><FaTrash /></button>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Cartitem
// import React from 'react'
// import { FaTrash } from "react-icons/fa6";

// const Cartitem = ({ product, quantity, onIncrease, onDecrease, onRemove }) => {
//   if (!product) return null

//   return (
//     <div className='border-2 rounded-lg py-4 px-4 mb-3 flex justify-between items-center'>
//       <img src={product.image} alt={product.title} className='w-20 rounded-lg'/>
//       <div>
//         <h3 className="font-semibold">{product.title}</h3>
//         <p className="text-gray-300">₹ {product.price}</p>
//       </div>
//       <div className="flex gap-3 text-xl items-center">
//         <button onClick={() => onDecrease(product.id)} className="px-2 py-1 bg-gray-200 rounded">-</button>
//         <span>{quantity}</span>
//         <button onClick={() => onIncrease(product.id)} className="px-2 py-1 bg-gray-200 rounded">+</button>
//         <button onClick={() => onRemove(product.id)} className="text-purple-500">
//           <FaTrash />
//         </button>
//       </div>
//     </div>
//   )
// }

// export default Cartitem
import React from "react";
import { FaTrash } from "react-icons/fa6";

const Cartitem = ({ product, quantity, onIncrease, onDecrease, onRemove }) => {
  if (!product) return null;

  return (
    <div className="flex items-center justify-between border-1 border-[#fa961d] rounded-xl my-2 p-2">
      <div className="flex items-center gap-3">
        <img src={product.image} alt={product.title} className="w-16 h-16 object-cover rounded" />
        <div >
          <h3 className="font-semibold text-gray-300">{product.title}</h3>
          <p className="text-gray-300">${product.price}</p>
          
        </div>
      </div>
      <div className="flex items-center  gap-5">
        <button onClick={onDecrease} className="px-2 bg-[#fa961d] text-white rounded">-</button>
        <span className="text-gray-300">{quantity}</span>
        <button onClick={onIncrease} className="px-2 bg-[#fa961d] text-white rounded">+</button>
        <button onClick={onRemove} className="text-xl  text-[#fa961d] rounded"><FaTrash /></button>
      </div>
    </div>
  );
};

export default Cartitem;
