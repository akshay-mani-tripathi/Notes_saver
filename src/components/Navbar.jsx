import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white text-gray-800 px-6 py-4 shadow-md flex justify-between items-center">
      <h1 className="text-2xl font-bold text-indigo-600 tracking-wide">📋 PasteCraft</h1>
      <div className="flex gap-6">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `px-4 py-2 rounded-lg text-sm font-medium transition ${
              isActive ? 'bg-indigo-100 text-indigo-700' : 'hover:text-indigo-500'
            }`
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/pastes"
          className={({ isActive }) =>
            `px-4 py-2 rounded-lg text-sm font-medium transition ${
              isActive ? 'bg-indigo-100 text-indigo-700' : 'hover:text-indigo-500'
            }`
          }
        >
          All Pastes
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
