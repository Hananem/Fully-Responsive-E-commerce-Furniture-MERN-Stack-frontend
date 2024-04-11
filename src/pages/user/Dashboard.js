import React, { useState } from "react";
import UserMenu from './UserMenu';
import Layout from "../../components/Layout"
import { useAuth } from "../../context/auth";


const Dashboard = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleSidebar = () => {
      setIsOpen(!isOpen);
    };
    const [auth] = useAuth();
 return(
    <Layout title={"Dashboard - Ecommerce App"}>
      <div className="">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="col-span-1 md:col-span-1">
          <UserMenu isOpen={isOpen} toggle={toggleSidebar} />
          </div>
          <div className="col-span-1 md:col-span-2">
    <div className="bg-white w-3/4 p-3">
      <h3 className="text-xl font-bold">{auth?.user?.name}</h3>
      <h3>{auth?.user?.email}</h3>
      <h3>{auth?.user?.address}</h3>
    </div>
          </div>
        </div>
      </div>
    </Layout>
 )
}

export default Dashboard