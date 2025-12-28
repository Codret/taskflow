// src/components/Header.jsx
import React from "react";
import { Home, Plus } from "lucide-react";

export default function Header({ onAdd }) {
  return (
    <div className="header flex justify-between items-start gap-4 py-4 px-2 md:px-6 bg-white shadow-sm rounded-md">
      {/* Left Section */}
      <div className="min-w-0">
        <h1 className="text-xl md:text-3xl font-bold text-gray-800 flex items-center gap-2">
          <Home className="text-purple-500 w-5 h-5 md:w-6 md:h-6 shrink-0" />
          <span className="truncate">Task Overview</span>
        </h1>
        <p className="text-sm text-gray-500 mt-1 ml-7">
          Manage your tasks efficiently
        </p>
      </div>

      {/* Right Section - Add Button */}
      <button
        onClick={onAdd}
        className="add-button flex items-center gap-2 bg-purple-500 hover:bg-purple-600 text-white px-3 py-2 rounded-md shadow-sm transition-colors duration-200"
      >
        <Plus size={18} />
        Add New Task
      </button>
    </div>
  );
}
