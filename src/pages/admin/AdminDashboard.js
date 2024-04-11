import React, { useState } from 'react';
import Layout from '../../components/Layout';
import AdminMenu from './AdminMenu';
import {useAuth} from "../../context/auth"
const AdminDashboard = () => {
  const [auth] = useAuth()
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Layout>
    <div className="flex h-screen">
      <AdminMenu isOpen={isOpen} toggle={toggleSidebar} />
      {/* Main content */}
      <div className="flex-1 overflow-y-auto bg-gray-200 p-8">
        <h1 className="text-3xl font-semibold mb-4">Admin  </h1>
        <p className="text-gray-700">
        Admin Name : {auth?.user?.name} 
        </p>
        
        <p className="text-gray-700">
        Admin Email : {auth?.user?.email} 
        </p>

         <p className="text-gray-700">
        Admin Contact : {auth?.user?.phone} 
        </p>

        <p className="text-gray-700">
        Admin Name : {auth?.user?.name} 
        </p>
        {/* Add more content here */}
      </div>
    </div>
    </Layout>
  );
}

export default AdminDashboard;
