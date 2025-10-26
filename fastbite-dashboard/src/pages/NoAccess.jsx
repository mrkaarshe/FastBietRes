import React from "react";
import { Lock } from 'lucide-react';
import { Link } from "react-router-dom";

function NoAccess() {
  return (
    <div className="h-screen w-full flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-10 text-center max-w-md">
        <div className="flex justify-center mb-4">
          <div className="bg-red-100 text-red-600 p-4 rounded-full">
            <Lock size={40} />
          </div>
        </div>

        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          No Access
        </h1>
        <p className="text-gray-600 mb-6">
          You do not have permission to access this page.
        </p>

        <Link
          to="/"
          className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}

export default NoAccess