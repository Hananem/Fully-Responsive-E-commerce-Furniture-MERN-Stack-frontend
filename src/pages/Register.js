// Register.js
import React, {useState} from 'react';
import Layout from "../components/Layout"
import {toast} from "react-toastify"
import axios from 'axios'
import {useNavigate} from "react-router-dom"
const Register = () => {
const [name, setName] = useState("")
const [email, setEmail] = useState("")
const [password, setPassword] = useState("")
const [phone, setPhone] = useState("")
const [answer, setAnswer] = useState("")
const [address, setAddress] = useState("")
const navigate = useNavigate()
const REACT_APP_API = 'http://localhost:5000';
//form function
const handleSubmit = async (e) => {
  e.preventDefault()
try{
  const res = await axios.post(`${REACT_APP_API}/api/v1/auth/register`, 
  {name, email,password,phone, address, answer}
  ) ; if(res.data.success) {
  toast.success(res.data.message)
    
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
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Create an account</h2>
        </div>
        <form className="mt-8 space-y-6"  onSubmit={handleSubmit} >
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="username" className="sr-only">Username</label>
              <input 
              id="username"
              value={name}
              onChange={(e) => setName(e.target.value)}
               name="username" 
               type="text" 
               autoComplete="username" 
               required 
               className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Username" />
            </div>
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
              <label htmlFor="address" className="sr-only">Address</label>
              <input id="address" value={address} 
              onChange={(e) => setAddress(e.target.value)}

              name="address" type="text" autoComplete="address" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Address" />
            </div>
            <div>
              <label htmlFor="phone" className="sr-only">Phone Number</label>
              <input id="phone"  value={phone} 
              onChange={(e) => setPhone(e.target.value)}

              name="phone" type="tel" autoComplete="tel" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Phone Number" />
            </div>
            <div>
              <label htmlFor="answer" className="sr-only">Answer</label>
              <input id="answer"  value={answer} 
              onChange={(e) => setAnswer(e.target.value)}

              name="answer" type="tel" autoComplete="answer" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Answer" />
            </div>

          </div>

          <div>
        
            <button type="submit" className="group  w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
             
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
    </Layout>
  );
};

export default Register;
