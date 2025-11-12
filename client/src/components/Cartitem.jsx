import React from "react";
import { FaTrash } from "react-icons/fa6";

const Cartitem = ({ product, quantity, onIncrease, onDecrease, onRemove }) => {
  if (!product) return null;

const imageUrl = product?.image
  ? product.image.startsWith("http")
    ? product.image
    : `${product.image}`
  : ""; // fallback image haddii image ma jiro

  return (
    <div className="flex items-center justify-between border-1 border-zinc-800 rounded-xl my-2 p-2">
      <div className="flex items-center gap-3">
        <img src={`${product.image}`} alt={product.title} className="w-16 h-16 object-cover rounded" />
        <div>
          <h3 className="font-semibold text-xs text-gray-300">{product.title}</h3>
          <p className="text-yellow-500">${product.price}</p>
        </div>
      </div>
      <div className="flex items-center gap-5">
        <button onClick={onDecrease} className="px-2 text-2xl text-white rounded">-</button>
        <span className="text-gray-300">{quantity}</span>
        <button onClick={onIncrease} className="px-2  text-white rounded">+</button>
        <button onClick={onRemove} className="text-xl text-yellow-500 rounded"><FaTrash /></button>
      </div>
    </div>
  );
};

export default Cartitem;
