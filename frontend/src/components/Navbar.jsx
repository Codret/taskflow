// import React from 'react'
// import { useNavigate } from 'react-router-dom'
// import {Rocket} from "lucide-react"

// const Navbar = () => {
//     const navigate = useNavigate()
//   return (
//     <Header classname="sticky top-0 z-50 bg-white backdrop:blur-md shadow-sm border-b border-gray-200 font-sans">
//         <div className='flex items-center justify-between px-4 py-3 md:px-6 max-w-6 mx-auto'>
//             {/* {Logo} */}
//             <div className='flex items-center gap-2 cursor-pointer group' onClick={() => {navigate("/")}}>
//                 <div className='relative w-10 h-10 flex items-center justify-center rounded-xl bg-gradient-to-br from-fuchsia-500 via-purple-500 to-indigo-500 shadow-lg group-hover:shadow-purple-300/50 group-hover:scale-105 transistion-all duration-300 '>
//                     <Rocket />
//                 </div>
//             </div>
//         </div>
//     </Header>
//   )
// }

// export default Navbar

import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const navigate = useNavigate();
  const { user, setUser } = useAuth();

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:4000/api/auth/logout", {}, { withCredentials: true });
      toast.success("Logged out");
      setUser(null);
      navigate("/");
    } catch {
      toast.error("Logout failed");
    }
  };

  return (
    <nav className="bg-white shadow-md flex items-center justify-between px-6 py-3">
      <h1 className="text-xl font-semibold text-blue-600">Task Flow</h1>
      <div className="flex items-center gap-3">
        <span className="text-gray-700">{user?.name}</span>
        <button
          onClick={handleLogout}
          className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600"
        >
          <LogOut size={18} />
        </button>
      </div>
    </nav>
  );
}
