import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();


  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/85 backdrop-blur-md shadow-[0px_10px_30px_rgba(25,28,30,0.06)] flex items-center justify-between px-8 h-16">
      {/* Left - Logo */}
      <div className="flex items-center">
        <span className="text-xl font-bold tracking-tighter text-blue-900">
          Cliper
        </span>
      </div>

      {/* Center - Navigation Links */}
      <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 gap-10 items-center text-sm font-semibold tracking-tight">
        <a
          className="text-slate-600 hover:text-blue-800 transition-colors"
          href="#"
        >
          Lecture Q&A
        </a>
        <a
          className="text-slate-600 hover:text-blue-800 transition-colors"
          href="#"
        >
          Forum
        </a>
        <a
          className="text-slate-600 hover:text-blue-800 transition-colors"
          href="#"
        >
          Lecture Resources
        </a>
        <a
          className="text-slate-600 hover:text-blue-800 transition-colors"
          href="#"
        >
          Attendance
        </a>
      </div>

      {/* Right - Buttons */}
      <div className="flex items-center gap-4">
        <button 
          className="border-2 border-[#0056D2] text-[#0056D2] px-5 py-2 rounded-full text-sm font-semibold hover:bg-[#dae2ff] transition-all scale-95 active:scale-90"
          onClick={() => navigate("/login")}
        >
          Login
        </button>

        <button 
          className="bg-[#0040a1] text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-[#0056d2] transition-all scale-95 active:scale-90"
          onClick={() => navigate("/signup")}
        >
          Sign Up
        </button>
      </div>
    </nav>
  );
};

export default Navbar;