import './App.css';
import {Routes, Route} from "react-router-dom"
import Home from "./pages/Home"
import ProductDetails from "./pages/ProductDetails";
import Categories from "./pages/Categories";
import CategoryProduct from "./pages/CategoryProduct";
import Dashboard from "./pages/user/Dashboard"
import Profile from "./pages/user/Profile"
import Orders from "./pages/user/Orders"
import AdminDashboard from "./pages/admin/AdminDashboard"
import CreateCategory from "./pages/admin/CreateCategory"
import CreateProduct from "./pages/admin/CreateProduct"
import UpdateProduct from "./pages/admin/UpdateProduct"
import Users from "./pages/admin/Users"
import Products from "./pages/admin/Products";
import Search from "./pages/Search";
import Cart from "./pages/Cart";
import Contact from "./pages/Contact"
import About from "./pages/About"
import Register from "./pages/Register"
import Login from "./pages/Login"
import ForgotPassword from "./pages/ForgotPassword"
import PrivateRoute from "./components/routes/Private"
import AdminRoute from "./components/routes/AdminRoute"
import {ToastContainer} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
function App() {
  return (
    <div>
         <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/search" element={<Search />} />
           <Route path="/categories" element={<Categories />} />
           <Route path="/cart" element={<Cart />} />
             <Route path="/category/:slug" element={<CategoryProduct />} />
          <Route path="/product/:slug" element={<ProductDetails />} />
          <Route path="/dashboard" element={<PrivateRoute/>} >
          <Route path="user" element={<Dashboard/>} />
          <Route path="user/profile" element={<Profile/>} />
          <Route path="user/orders" element={<Orders/>} />
          </Route>

          <Route path="/dashboard" element={<AdminRoute/>} >
          <Route path="admin" element={<AdminDashboard/>} />
          <Route path="admin/create-category" element={<CreateCategory/>} />
          <Route path="admin/create-product" element={<CreateProduct/>} />
           <Route path="admin/product/:slug" element={<UpdateProduct />} />
           <Route path="admin/products" element={<Products />} />
          <Route path="admin/users" element={<Users/>} />
          </Route>
          <Route path="/about" element={<About/>} />
          <Route path="/contact" element={<Contact/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/forgot-password" element={<ForgotPassword/>} />
          <Route path="/login" element={<Login/>} />
         </Routes>
    </div>
  );
}

export default App;
