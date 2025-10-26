"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { useToast } from "../hooks/use-toast"
import toast from "react-hot-toast";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading immediately
    try {
      const url  = "https://fastbietresdashboar-1.onrender.com/api/user/login"
      const form = { email, password };
  
      const res = await fetch(url,{
        method: "POST",
        headers: { "Content-Type":
           "application/json" },
        body: JSON.stringify(form),
      });
  
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Something went wrong");

      navigate("/dashboard");

      localStorage.setItem("user", JSON.stringify(data));
      localStorage.setItem("token", data.token);
      toast.success("Login successful!");
    
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Login failed");
    } finally {
      setLoading(false); 
    }
  };
  


  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-yellow-400 mb-2">FastBite</h1>
          <p className="text-gray-400">Admin Dashboard</p>
        </div>

        <div className=" border border-zinc-800  p-10 shadow-2xl backdrop-blur-lg bg-black/70 rounded-2xl">
          <h2 className="text-2xl font-semibold text-white mb-6">Sign In</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email" className="text-gray-300">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@fastbite.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-black border-zinc-700 text-white placeholder:text-gray-500 rounded-2xl focus:border-yellow-400"
                required
              />
            </div>

            <div>
              <Label htmlFor="password" className="text-gray-300">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-black border-zinc-700 text-white placeholder:text-gray-500 rounded-2xl focus:border-yellow-400"
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-yellow-400 hover:bg-yellow-500 rounded-2xl text-black font-semibold"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
