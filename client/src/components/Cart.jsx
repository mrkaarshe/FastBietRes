import React from "react";
import { useSelector, useDispatch } from "react-redux";
import products from "../Products";
import { increase, decrease, remove } from "../Store/Cart";
import Cartitem from "./Cartitem";

const Cart = () => {
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();



  return (
    <div className="">
      {cart.length === 0 ? (
        <p className="text-gray-800 font-bold text-center text-xl">Your cart is empty see the menu</p>
      ) : (
        <>
          {cart.map((item , key) => {
           
            return (
              <Cartitem
                key={item.productId}
                product={products.find((p) => p.id === item.productId)}
                quantity={item.quantity}
                onIncrease={() => dispatch(increase(item.productId))}
                onDecrease={() => dispatch(decrease(item.productId))}
                onRemove={() => dispatch(remove(item.productId))}
              />
            );
          })}

        
        </>
      )}
    </div>
  );
};

export default Cart;
