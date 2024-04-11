import React, { useState } from 'react';
import Layout from "../../components/Layout"
import AdminMenu from './AdminMenu';

const Users =() => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleSidebar = () => {
      setIsOpen(!isOpen);
    };
    return(
<Layout>
    <div className="flex h-screen">
    <AdminMenu isOpen={isOpen} toggle={toggleSidebar} />
<div className="flex-1 overflow-y-auto bg-gray-200 p-8" >
<h1>Users</h1>
</div>
    </div>
</Layout>
    )
}

export default Users