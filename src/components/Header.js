import React, {useState}from "react"
import { NavLink, Link } from 'react-router-dom';
import {useAuth} from "../context/auth"
import SearchForm from "./form/SearchForm";
import useCategory from "../hooks/useCategory";
const Header = () => {
  const [auth, setAuth] = useAuth()
  const [showDropdown, setShowDropdown] = useState(false)
  const categories = useCategory();
  const handleLogout = () => {
    setAuth({
      ...auth, user:null, token:''
    })
    localStorage.removeItem('auth')
  }
    return(
      <nav className="bg-gray-800 p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <h2>Logo</h2> {/* Logo */}
          <NavLink exact to="/" activeClassName="text-white font-bold" className="text-gray-300 hover:text-white">Home</NavLink>

        </div>

        <SearchForm />
  
        <div className="flex space-x-4">
          {
            !auth.user ? (
              <>
                <NavLink to="/register" activeClassName="text-white" className="text-gray-300 hover:text-white">Register</NavLink>
                <NavLink to="/login" activeClassName="text-white" className="text-gray-300 hover:text-white">Login</NavLink>
              </>
            ) : (
              <div className="relative">
                <button onClick={() => setShowDropdown(!showDropdown)} className="text-gray-300 hover:text-white focus:outline-none"> {auth?.user.name} </button>
                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg">
                    <NavLink to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user" }` } activeClassName="text-gray-800" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Dashboard</NavLink>
                    <NavLink onClick={handleLogout} to="/login" activeClassName="text-gray-800" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Logout</NavLink>
                  </div>
                )}
              </div>
            )
          }

          <div className="relative group">
  <Link
    to={"/categories"}
    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
  >
    Categories
  </Link>
  <ul className="absolute left-0 z-10 hidden pt-1 group-hover:block bg-white border border-gray-200 rounded-lg shadow-lg">
    <li>
      <Link
        to="/categories"
        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
      >
        All Categories
      </Link>
    </li>
    {categories?.map((c) => (
      <li key={c.id}>
        <Link
          to={`/category/${c.slug}`}
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          {c.name}
        </Link>
      </li>
    ))}
  </ul>
</div>
          <NavLink to="/cart" activeClassName="text-white" className="text-gray-300 hover:text-white">Cart</NavLink>
        </div>
      </div>
    </nav>
    )
}

export default Header