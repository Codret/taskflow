// src/components/Navbar.jsx
import { Zap, Settings, ChevronDown, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const Navbar = ({ user, setUser }) => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:4000/api/auth/logout",
        {},
        { withCredentials: true }
      );
      toast.success("Logged out successfully");
      setUser(null);
      navigate("/login");
    } catch {
      toast.error("Logout failed");
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        {/* Logo */}
        <div
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-2 cursor-pointer group"
        >
          <div className="relative w-10 h-10 flex items-center justify-center rounded-xl bg-gradient-to-br from-fuchsia-500 to-indigo-500 shadow-lg group-hover:scale-105 transition">
            <Zap className="w-6 h-6 text-white" />
            <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-white rounded-full animate-ping"></span>
          </div>
          <span className="text-2xl font-extrabold bg-gradient-to-r from-fuchsia-500 to-indigo-500 bg-clip-text text-transparent">
            TaskFlow
          </span>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/profile")}
            className="p-2 rounded-full hover:bg-purple-50"
          >
            <Settings className="w-5 h-5 text-gray-600" />
          </button>

          {/* User Menu */}
          <div ref={menuRef} className="relative">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex items-center gap-2 px-3 py-2 rounded-full hover:bg-purple-50"
            >
              <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gradient-to-br from-fuchsia-500 to-purple-600 text-white font-semibold">
                {user?.name?.slice(0, 2).toUpperCase() || "U"}
              </div>
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  menuOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {menuOpen && (
              <ul className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-xl border">
                <li
                  onClick={() => {
                    navigate("/profile");
                    setMenuOpen(false);
                  }}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  Profile
                </li>
                <li
                  onClick={handleLogout}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-500"
                >
                  Logout
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
