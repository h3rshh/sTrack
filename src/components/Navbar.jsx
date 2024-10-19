import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-white fixed w-full z-20 top-0 left-0 border-b border-gray-200">
      <div className="max-w-8xl w-8/12 flex flex-wrap items-center justify-between mx-auto px-4 py-1">
        <a href="#" className="flex items-center">
          <img src="https://flowbite.com/docs/images/logo.svg" className="h-6" alt="Logo" />
          <span className="ml-2 text-[1.7rem] font-semibold">sTrack</span>
        </a>
        <div className="flex md:order-2">
          <button type="button" className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none font-medium rounded-md text-sm px-3 py-1">
            Get Started
          </button>
          <button data-collapse-toggle="navbar-sticky" type="button" className="inline-flex items-center p-2 ml-2 w-10 h-10 justify-center text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none">
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button>
        </div>
        <div className="hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
          <ul className="flex flex-col p-2 mt-2 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-4 md:mt-0 md:border-0 md:bg-white">
            <li>
              <a href="#" className="py-2 px-3 text-blue-700">Home</a>
            </li>
            <li>
              <a href="#" className="py-2 px-3 text-gray-900 hover:bg-gray-100">About</a>
            </li>
            <li>
              <a href="#" className="py-2 px-3 text-gray-900 hover:bg-gray-100">Services</a>
            </li>
            <li>
              <a href="#" className="py-2 px-3 text-gray-900 hover:bg-gray-100">Contact</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
