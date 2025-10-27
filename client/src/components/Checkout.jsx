import aos from "aos";
import "aos/dist/aos.css";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../Store/Cart";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

const banadirDistricts = [
  "Abdiaziz",
  "Bondhere",
  "Daynile",
  "Dharkenley",
  "Heliwaa",
  "Hodan",
  "Howlwadag",
  "Kaxda",
  "Karan",
  "Madina",
  "Wadajir",
  "Yaaqshid",
  "Shangani",
  "Boondheere",
  "Shibis",
  "Hamar Jajab",
  "Waaberi",
];

const Checkout = () => {
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const [cartProducts, setCartProducts] = useState([]);
  const [info, setInfo] = useState({
    district: banadirDistricts[0], // default first district
    country: "Somalia",
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    currency: "",
    phone: ""
  });
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("EVC"); // Default to EVC
  const navigate = useNavigate();
  const userExisting = localStorage.getItem("user");
  const user = userExisting ? JSON.parse(userExisting) : null;

  useEffect(() => {
    aos.init({ duration: 1000, once: true });
  }, []);

  useEffect(() => {
    const fetchCartProducts = async () => {
      try {
        const productsData = await Promise.all(
          cart.map(async (item) => {
            const res = await fetch(`https://fastbietres-1.onrender.com/api/foods/${item.productId}`);
            return await res.json();
          })
        );
        setCartProducts(productsData);
      } catch (err) {
        console.error("Failed to fetch cart products:", err);
      }
    };
    if (cart.length > 0) fetchCartProducts();
  }, [cart]);

  const subtotal = cart.reduce((sum, item) => {
    const product = cartProducts.find((p) => p._id === item.productId);
    return sum + (product ? product.price * item.quantity : 0);
  }, 0);

  const delivery = cart.length > 0 ? 0.75 : 0;
  const taxes = subtotal * 0.0035;
  const total = subtotal + delivery + taxes;

  const handleInputChange = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async () => {
    if (!info.email || !info.address || !info.district || !info.phone) {
      toast.error("Please fill in all required fields");
      return;
    }
    if (cart.length === 0) {
      toast.error("Your cart is empty");
      return;
    }
    if (!paymentMethod) {
      toast.error("Please select a payment method");
      return;
    }
    setLoading(true);
    try {
      const orderData = {
        userId: user._id,
        items: cart.map((item) => ({
          productId: item.productId,
          productTitle: cartProducts.find((p) => p._id === item.productId)?.title || "Unknown Product",
          quantity: item.quantity,
          totalPrice: total,
          status: "Pending",
        })),
        contact: info,
        paymentMethod,
      };

      const token = user?.token;

      const res = await fetch("https://fastbietres-1.onrender.com/api/history/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(orderData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to create order");
      }

      dispatch(clearCart());
      toast.success("Order placed successfully!");
      navigate("/order-confirmed");
    } catch (err) {
      toast.error(err.message || "Something went wrong while placing the order.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl min-w-sm mx-auto mt-10 p-6 flex flex-col md:flex-row gap-5">
      {/* Left: Form */}
      <div data-aos="fade-right" className="flex-1 max-h-[100vh] overflow-auto p-6 shadow rounded-lg">
        {!user ? (
          <div className="flex justify-between my-5 items-center">
            <span className="font-bold text-gray-300">Please Sign In First</span>
            <Link
              to={"/login"}
              className="border-zinc-800 text-white rounded-md border-1 px-10 py-1 hover:bg-yellow-500 transition-colors"
            >
              Sign In
            </Link>
          </div>
        ) : null}

        <h2 className="text-2xl font-bold mb-4 text-yellow-500">Contact & Shipping</h2>

        <input
          name="email"
          onChange={handleInputChange}
          placeholder="Email"
          className="border-1 border-zinc-800 placeholder-white text-white outline-cyan-500 p-2 mb-3 w-full h-13 rounded-md"
          type="email"
          required
          value={info.email}
        />

        <p className="text-white font-bold text-2xl my-2">Delivery</p>
        <input
          name="country"
          value={info.country}
          disabled
          className="border-1 border-zinc-800 placeholder-white text-white outline-cyan-500 p-2 mb-3 w-full h-13 rounded-md"
        />

        <select
          name="district"
          value={info.district}
          onChange={handleInputChange}
          className="border-1 border-zinc-800 bg-black  text-white outline-cyan-500 p-2 mb-3 w-full h-13 rounded-md"
        >
          {banadirDistricts.map((district) => (
            <option key={district} value={district}>
              {district}
            </option>
          ))}
        </select>

        <div className="flex gap-3">
          <input
            name="firstName"
            onChange={handleInputChange}
            placeholder="First Name"
            className="border-1 border-zinc-800 placeholder-white text-white outline-cyan-500 p-2 mb-3 w-full h-13 rounded-md"
            value={info.firstName}
          />
          <input
            name="lastName"
            onChange={handleInputChange}
            placeholder="Last Name"
            className="border-1 border-zinc-800 placeholder-white text-white outline-cyan-500 p-2 mb-3 w-full h-13 rounded-md"
            value={info.lastName}
          />
        </div>

        <input
          name="address"
          onChange={handleInputChange}
          placeholder="Address"
          className="border-1 border-zinc-800 placeholder-white text-white outline-cyan-500 p-2 mb-3 w-full h-13 rounded-md"
          value={info.address}
          required
        />
        <input
          name="currency"
          onChange={handleInputChange}
          placeholder="currency number"
          className="border-1 border-zinc-800 placeholder-white text-white outline-cyan-500 p-2 mb-3 w-full h-13 rounded-md"
          value={info.currency}
          required
        />
        <input
          name="phone"
          onChange={handleInputChange}
          placeholder="Phone"
          className="border-1 border-zinc-800 placeholder-white text-white outline-cyan-500 p-2 mb-3 w-full h-13 rounded-md"
          value={info.phone}
          required
          type="tel"
        />

        <div className="flex justify-between items-center border-1 border-zinc-800 text-white rounded-lg py-3 px-2">
          <p>Delivery</p>
          <p>1KM $0.75</p>
        </div>

        <h2 className="text-xl text-white font-bold mt-6 mb-3">Payment</h2>
        <p className="text-gray-300">All transactions are secure. Use one of the methods below:</p>
        <div className="flex flex-col gap-x-3 border-1 border-zinc-800 text-white p-1 mt-3 rounded-lg">
          <label className="flex gap-5 border-b-1 border-zinc-800 p-3 text-sm md:text-md cursor-pointer">
            <input
              type="radio"
              name="payment"
              value="EVC"
              checked={paymentMethod === "EVC"}
              onChange={() => setPaymentMethod("EVC")}
              className="w-5 md:w-10"
            />
            <p>EVC Pluse : *712*611011973*$#</p>
          </label>
          <label className="flex gap-5 border-b-1 border-zinc-800 p-3 text-sm md:text-md cursor-pointer">
            <input
              type="radio"
              name="payment"
              value="BusinessAccount"
              checked={paymentMethod === "BusinessAccount"}
              onChange={() => setPaymentMethod("BusinessAccount")}
              className="w-5 md:w-10"
            />
            <p>Business Account: *789*65463*$#</p>
          </label>
        
          {/* eDahab ready to add */}
          <label className="flex gap-5 p-3 text-sm md:text-md cursor-pointer">
            <input
              type="radio"
              name="payment"
              value="eDahab"
              checked={paymentMethod === "eDahab"}
              onChange={() => setPaymentMethod("eDahab")}
              className="w-5 md:w-10"
            />
            <p>eDahab: *710*6342234*$#</p>
          </label>
        </div>

        {!user ? (
          <button className="mt-6 w-full py-3 bg-yellow-500 hover:bg-transparent hover:border-1 border-zinc-800 text-white rounded-lg font-bold">
            Sign In First ${total.toFixed(2)}
          </button>
        ) : (
          <button
            onClick={handlePlaceOrder}
            disabled={loading}
            className="mt-6 w-full py-3 bg-yellow-500 hover:bg-transparent hover:border-1 border-zinc-800 text-white rounded-lg font-bold"
          >
            {loading ? "Placing Order..." : `Place Order $${total.toFixed(2)}`}
          </button>
        )}
      </div>

      {/* Right: Order Summary */}
      <div data-aos="fade-left" className="min-w-[350px] max-w-lg p-6 sm:p-2 shadow rounded-lg">
        <h2 className="text-2xl font-bold mb-4 text-yellow-500">Order Summary</h2>
        <div className="max-h-80 overflow-auto">
          {cart.map((item) => {
            const product = cartProducts.find((p) => p._id === item.productId);
            if (!product) return null;
            return (
              <div
                key={item.productId}
                className="flex justify-between items-center gap-2 mb-2 border-1 border-zinc-800 rounded-lg p-2"
              >
                <img
                  src={`https://fastbietres-1.onrender.com${product.image}`}
                  className="w-20 h-20 rounded-lg"
                  alt={product.title}
                />
                <div className="text-white">
                  {product.title} x {item.quantity}
                </div>
                <div className="text-white font-bold">${(product.price * item.quantity).toFixed(2)}</div>
              </div>
            );
          })}
        </div>

        <div className="mt-4 pt-2">
          <div className="text-gray-300 flex justify-between mb-1">
            <span>Subtotal</span> <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="text-gray-300 flex justify-between mb-1">
            <span>Delivery</span> <span>${delivery.toFixed(2)}</span>
          </div>
          <div className="text-gray-300 flex justify-between mb-1">
            <span>Taxes</span> <span>${taxes.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-bold text-lg mt-2">
            <span className="text-yellow-500">Total</span>{" "}
            <span className="text-yellow-500">${total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
