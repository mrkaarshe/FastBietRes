
import toast from "react-hot-toast";
import * as jwt_decode from "jwt-decode";

import {useState} from "react"
import { useNavigate } from "react-router-dom"; 
import { loginSuccess } from "../Store/userSlice";
import { useDispatch } from "react-redux";

export default function AuthPage() {
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading , setloading] = useState(false)
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

const handleSubmit = async (e) => {
  e.preventDefault();
  setloading(true); // Start loading immediately
  try {
    const url = mode === "login"
      ? "https://fastbietres-1.onrender.com/api/auth/login"
      : "https://fastbietres-1.onrender.com/api/auth/register";

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Something went wrong");

    dispatch(loginSuccess(data));
    localStorage.setItem("user", JSON.stringify(data));
    localStorage.setItem("token", data.token);
    toast.success(mode === "login" ? "Login successful!" : "Registration successful!");
    navigate("/");
  } catch (err) {
    console.error(err);
    toast.error(err.message);
  } finally {
    setloading(false); // Stop loading regardless of success or error
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-800 text-cyan-400 px-4">
      <div className="w-full max-w-md bg-slate-800 rounded-2xl shadow-2xl backdrop-blur-lg p-8 transition-all duration-300 hover:shadow-cyan-600/30">
        {/* Title */}
        <h1 className="text-3xl font-bold text-center mb-8 tracking-tight">
          {mode === "login" ? "Login to your account" : "Register a new account"}
        </h1>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-slate-800 rounded-xl p-1">
            <button
              onClick={() => setMode("login")}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                mode === "login"
                  ? "bg-cyan-600 text-white shadow-md shadow-cyan-500/40"
                  : "text-cyan-400 hover:text-cyan-300"
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setMode("register")}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                mode === "register"
                  ? "bg-cyan-600 text-white shadow-md shadow-cyan-500/40"
                  : "text-cyan-400 hover:text-cyan-300"
              }`}
            >
              Register
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {mode === "register" && (
            <div>
              <label className="block text-sm mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full bg-slate-800  focus:bg-slate-800 text-white p-3 rounded-lg border border-slate-700 focus:ring-2 focus:ring-cyan-500 outline-none transition"
                placeholder="Your Name"
                required
              />
            </div>
          )}

          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full bg-slate-800  focus:bg-slate-800 text-white p-3 rounded-lg border border-slate-700 focus:ring-2 focus:ring-cyan-500 outline-none transition"
              placeholder="Email"
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full bg-slate-800  focus:bg-slate-800  text-white p-3 rounded-lg border border-slate-700 focus:ring-2 focus:ring-cyan-500 outline-none transition"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 mt-2 rounded-lg font-semibold bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-slate-900 transition-all duration-200 shadow-md shadow-cyan-600/30"
          >
           {loading ? "Loading" : mode === "login" ? "Login" : "Register"}


          </button>
        </form>

        {/* Footer links */}
        <p className="text-sm text-center text-slate-400 mt-8">
          {mode === "login" ? (
            <>
              Don't have an account?{" "}
              <span
                className="text-cyan-400 cursor-pointer hover:underline"
                onClick={() => setMode("register")}
              >
                Register
              </span>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <span
                className="text-cyan-400 cursor-pointer hover:underline"
                onClick={() => setMode("login")}
              >
                Login
              </span>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
