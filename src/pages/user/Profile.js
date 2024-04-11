import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout"
import UserMenu from './UserMenu';
import { useAuth } from "../../context/auth";
import {toast} from "react-toastify"
import axios from "axios";
const Profile = () => {
  //context
  const [auth, setAuth] = useAuth();
  //state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const REACT_APP_API = 'http://localhost:5000';
  //get user data
  useEffect(() => {
    const { email, name, phone, address } = auth?.user;
    setName(name);
    setPhone(phone);
    setEmail(email);
    setAddress(address);
  }, [auth?.user]);

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(`${REACT_APP_API}/api/v1/auth/profile`, {
        name,
        email,
        password,
        phone,
        address,
      });
      if (data?.error) {
        toast.error(data?.error);
      } else {
        setAuth({ ...auth, user: data?.updatedUser });
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = data.updatedUser;
        localStorage.setItem("auth", JSON.stringify(ls));
        toast.success("Profile Updated Successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <Layout title={"Your Profile"}>
  <div className="">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="col-span-1 md:col-span-1">
        <UserMenu isOpen={isOpen} toggle={toggleSidebar} />
      </div>
      <div className="col-span-1 md:col-span-2">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" style={{ marginTop: "-40px" }}>
          <form onSubmit={handleSubmit}>
            <h4 className="text-xl font-bold">USER PROFILE</h4>
            <div className="mb-3">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full py-2 px-3 border rounded-md"
                id="exampleInputEmail1"
                placeholder="Enter Your Name"
                autoFocus
              />
            </div>
            <div className="mb-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full py-2 px-3 border rounded-md"
                id="exampleInputEmail1"
                placeholder="Enter Your Email"
                disabled
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full py-2 px-3 border rounded-md"
                id="exampleInputPassword1"
                placeholder="Enter Your Password"
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full py-2 px-3 border rounded-md"
                id="exampleInputEmail1"
                placeholder="Enter Your Phone"
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full py-2 px-3 border rounded-md"
                id="exampleInputEmail1"
                placeholder="Enter Your Address"
              />
            </div>

            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md">
              UPDATE
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</Layout>

  );
};

export default Profile;