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
          const res = await fetch(`https://fastbietres.onrender.com/api/foods/${item.productId}`);
          return await res.json();
        })
      );
      setCartProducts(productsData);
    };

    if (cart.length > 0) fetchCartProducts();
  }, [cart]);

  return (
    <div>
      {cartProducts.length === 0 ? (
        <p className="text-gray-200 flex justify-center items-center">Your cart is empty</p>
      ) : (
        cartProducts.map((product, i) => (
          <Cartitem
            key={product._id}
            product={product}
            quantity={cart[i].quantity}
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
