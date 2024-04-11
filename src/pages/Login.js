import React, {useState} from 'react';
import Layout from "../components/Layout"
import {toast} from "react-toastify"
import axios from 'axios'
import {useNavigate, useLocation} from "react-router-dom"
import {useAuth} from "../context/auth"


const Login = () => {
const [email, setEmail] = useState("")
const [password, setPassword] = useState("")
const [answer, setAnswer] = useState("")

const [auth,setAuth] = useAuth()
const navigate = useNavigate()
const location = useLocation()
const REACT_APP_API = 'http://localhost:5000';
//form function
const handleSubmit = async (e) => {
  e.preventDefault()
try{
  const res = await axios.post(`${REACT_APP_API}/api/v1/auth/login`, 
  {email,password}
  ) ; if(res.data.success) {
  toast.success(res.data.message)
  setAuth({
    ...auth,
    user:res.data.user,
    token:res.data.token,
  })
  localStorage.setItem('auth',JSON.stringify(res.data))
    navigate( location.state || '/')
  }
} catch (error) {
  console.log(error)
  toast.error('Something went wrong')
}
}
  return (
    <Layout>
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Login</h2>
        </div>
        <form className="mt-8 space-y-6"  onSubmit={handleSubmit} >
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
           
            <div>
              <label htmlFor="email-address" className="sr-only">Email address</label>
            
              <input id="email-address" value={email}  
              onChange={(e) => setEmail(e.target.value)}

              name="email" type="email" autoComplete="email" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Email address" />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input id="password" value={password} 
              onChange={(e) => setPassword(e.target.value)}

              name="password" type="password" autoComplete="new-password" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password" />
            </div>
            
            <div>
              <label htmlFor="answer" className="sr-only">Answer</label>
              <input id="answer"  value={answer} 
              onChange={(e) => setAnswer(e.target.value)}

              name="answer" type="tel" autoComplete="answer" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Answer" />
            </div>
          
          </div>

          <div>
          <button type="button" 
          onClick={() => {navigate('/forgot-password')}}
          className="group  w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
             
             Forgot Password?
           </button>
            <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
             
             Login
            </button>
          </div>
        </form>
      </div>
    </div>
    </Layout>
  );
};

export default Login;