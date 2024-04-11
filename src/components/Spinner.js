import React, {useState, useEffect} from 'react';
import { useNavigate, useLocation } from "react-router-dom"


const Spinner = ( {path = 'login'} ) => {
const [count, setCount] = useState(3)
const navigate = useNavigate()
const location = useLocation()

 useEffect(() => {
  const interval = setInterval(() => {
    setCount((prevValue) => --prevValue)
  }, 1000)

  count === 0 && navigate(`/${path}`, {
    state: location.pathname,
  })
  return () =>clearInterval(interval)
 }, [count, navigate, location, path])
  return (
    <div className="flex justify-center items-center">
    <h1 className="text-center">redirecting to you in {count} second</h1>
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
    </div>
  );
};

export default Spinner;