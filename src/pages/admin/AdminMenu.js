import React from 'react';
import {NavLink} from "react-router-dom"
const AdminMenu = ({ isOpen, toggle }) => {
  return (
    <div
      className={`fixed h-screen inset-y-0 left-0 z-50 w-64 bg-gray-900 px-4 py-6 transition duration-300 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'
        } relative sm:translate-x-0`}
    >
      <button
        className="absolute top-0 right-0  mt-4 p-3 rounded-lg bg-gray-800 text-white focus:outline-none focus:bg-gray-700"
        onClick={toggle}
      >
        Close
      </button>
      {/* AdminMenu content */}
      <div className="mt-6">
        <h1 className="text-white text-xl font-semibold">AdminMenu</h1>
        <ul className="mt-4">
          <li className="mb-2">
          <NavLink to="/dashboard/admin/create-category" activeClassName="text-white" className="text-gray-300 hover:text-white">Create Category</NavLink>

          </li>
          <li className="mb-2">
          <NavLink to="/dashboard/admin/create-product" activeClassName="text-white" className="text-gray-300 hover:text-white">Create Product</NavLink>

          </li>
          <li className="mb-2">
          <NavLink to="/dashboard/admin/users" activeClassName="text-white" className="text-gray-300 hover:text-white">Users</NavLink>

          </li>
          {/* Add more links as needed */}
        </ul>
      </div>
    </div>
  );
};

export default AdminMenu;

