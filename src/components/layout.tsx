import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

const Layout: React.FC = () => {
  // State to manage the open/closed state of the sidebar
  const [isOpen, setIsOpen] = useState(false);

  // State to manage the open/closed state of the sidebar
  const toggleNav = () => setIsOpen(!isOpen);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 bg-gray-800 transition-transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:relative lg:w-64 lg:translate-x-0`}
      >
        <div className="p-4 h-full flex flex-col">
          <button onClick={toggleNav} className="lg:hidden text-white">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
          <ul className="flex flex-col flex-grow">
            <li>
              <Link
                to="/"
                className="block text-white py-2 px-4 hover:bg-gray-700"
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard"
                className="block text-white py-2 px-4 hover:bg-gray-700"
              >
                Charts and Maps
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <header className="p-4 bg-gray-800 text-white flex items-center lg:hidden">
          <button onClick={toggleNav} className="text-white">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </header>
        {/* Main content area where nested routes will be rendered */}
        <main className="overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
