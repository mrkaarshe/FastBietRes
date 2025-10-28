import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";

export default function VerifyOtp() {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const { state } = useLocation();
  const email = state?.email;

const handleNext = async (e) => {
  e.preventDefault();
  if (!otp) return toast.error("Enter the OTP");

  try {
    const res = await fetch('https://fastbietres-1.onrender.com/api/auth/verify-reset-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, otp }),
    });

    const data = await res.json();

    if (!data.success) {
      return toast.error(data.message); // Haddii OTP khaldan ama dhacay
    }

    // Haddii OTP sax yahay
    navigate("/reset-password", { state: { email, otp } });

  } catch (err) {
    toast.error("Something went wrong. Please try again.");
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full border border-zinc-700 p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-yellow-500 text-center mb-6">Verify OTP</h2>
        <p className="text-center mb-4 text-gray-400">
          We’ve sent a 6-digit code to your email: <span className="font-medium">{email}</span>
        </p>
        <form className="flex gap-2 " onSubmit={handleNext}>
          <input
            type="text"
           
            onChange={(e) => setOtp(e.target.value)}
            required
            className="w-full px-4 py-3 mb-4 border border-zinc-700 placeholder:text-xs text-gray-400 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
                    <input
            type="text"
           
            onChange={(e) => setOtp(e.target.value)}
            required
            className="w-full px-4 py-3 mb-4 border border-zinc-700 placeholder:text-xs text-gray-400 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
                    <input
            type="text"
           
           
            onChange={(e) => setOtp(e.target.value)}
            required
            className="w-full px-4 py-3 mb-4 border border-zinc-700 placeholder:text-xs text-gray-400 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
                    <input
            type="text"
           
           
            onChange={(e) => setOtp(e.target.value)}
            required
            className="w-full px-4 py-3 mb-4 border border-zinc-700 placeholder:text-xs text-gray-400 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
                    <input
            type="text"
           
            onChange={(e) => setOtp(e.target.value)}
            required
            className="w-full px-4 py-3 mb-4 border border-zinc-700 placeholder:text-xs text-gray-400 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
                    <input
            type="text"
           
            onChange={(e) => setOtp(e.target.value)}
            required
            className="w-full px-4 py-3 mb-4 border border-zinc-700 placeholder:text-xs text-gray-400 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />

        </form>
                  <button
            type="submit"
            className="w-full py-3 rounded-md bg-yellow-500 text-white font-semibold hover:bg-yellow-600"
          >
            Continue
          </button>
      </div>
    </div>
  );
}
