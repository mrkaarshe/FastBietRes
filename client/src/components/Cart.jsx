import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Cartitem from "./Cartitem";

const Cart = () => {
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const [cartProducts, setCartProducts] = useState([]);

  useEffect(() => {
    const fetchCartProducts = async () => {
      const productsData = await Promise.all(
        cart.map(async (item) => {
          try {
            const res = await fetch(`https://fastbietres-4.onrender.com/api/foods/${item.productId}`);
            if (!res.ok) return null; // skip missing product
            const data = await res.json();
            return { ...data, quantity: item.quantity }; // attach quantity here
          } catch {
            return null; // skip errors
          }
        })
      );
      setCartProducts(productsData.filter(p => p !== null)); // remove nulls
    };

    if (cart.length > 0) fetchCartProducts();
    else setCartProducts([]);
  }, [cart]);

  return (
    <div>
      {cartProducts.length === 0 ? (
        <p className="text-gray-200 flex justify-center items-center">Your cart is empty</p>
      ) : (
        cartProducts.map((product) => (
          <Cartitem
            key={product._id}
            product={product}
            quantity={product.quantity} // now safe
            onIncrease={() => dispatch({ type: "cart/increase", payload: product._id })}
            onDecrease={() => dispatch({ type: "cart/decrease", payload: product._id })}
            onRemove={() => dispatch({ type: "cart/remove", payload: product._id })}
          />
        ))
      )}
    </div>
  );
};

export default Cart;
