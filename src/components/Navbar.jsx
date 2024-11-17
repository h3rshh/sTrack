import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white fixed w-full z-20 top-0 left-0 border-b border-gray-200">
      <div className="max-w-8xl w-8/12 flex flex-wrap items-center justify-between mx-auto px-4 py-1">
        {/* Logo Section */}
        <a href="#" className="flex items-center">
          <img src="https://flowbite.com/docs/images/logo.svg" className="h-6" alt="Logo" />
          <span className="ml-2 text-[1.7rem] font-semibold">sTrack</span>
        </a>
        
        {/* Navigation Links */}
        <div className="hidden w-full md:flex md:w-auto md:order-1 justify-center" id="navbar-sticky">
          <ul className="flex flex-col p-2 mt-2 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-4 md:mt-0 md:border-0 md:bg-white">
            <li>
              <NavLink 
                to="/" 
                className={({ isActive }) => 
                  isActive ? 'py-2 px-3 text-blue-700' : 'py-2 px-3 text-gray-900 hover:bg-gray-100'
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/about" 
                className={({ isActive }) => 
                  isActive ? 'py-2 px-3 text-blue-700' : 'py-2 px-3 text-gray-900 hover:bg-gray-100'
                }
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/contact" 
                className={({ isActive }) => 
                  isActive ? 'py-2 px-3 text-blue-700' : 'py-2 px-3 text-gray-900 hover:bg-gray-100'
                }
              >
                Contact
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
