import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout"
import UserMenu from './UserMenu';
import axios from "axios";
import { useAuth } from "../../context/auth";
import moment from "moment";
import { MdCheckCircle, MdCancel } from 'react-icons/md';
const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  const REACT_APP_API = 'http://localhost:5000';

  const getOrders = async () => {
    try {
      const { data } = await axios.get(`${REACT_APP_API}/api/v1/auth/orders`);
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);
  return (
    <Layout title={"Your Orders"}>
    <div className="">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-1">
        <UserMenu isOpen={isOpen} toggle={toggleSidebar} />
        </div>
        <div className="md:col-span-2">
          <h1 className="text-center text-3xl font-bold text-indigo-700 mb-8">All Orders</h1>
          {orders?.map((o, i) => {
            return (
              <div className="border border-gray-300 rounded-md shadow-lg p-4 mb-4">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-indigo-200">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-sm font-medium text-indigo-700 uppercase tracking-wider">#</th>
                      <th scope="col" className="px-6 py-3 text-left text-sm font-medium text-indigo-700 uppercase tracking-wider">Status</th>
                      <th scope="col" className="px-6 py-3 text-left text-sm font-medium text-indigo-700 uppercase tracking-wider">Buyer</th>
                      <th scope="col" className="px-6 py-3 text-left text-sm font-medium text-indigo-700 uppercase tracking-wider">Date</th>
                      <th scope="col" className="px-6 py-3 text-left text-sm font-medium text-indigo-700 uppercase tracking-wider">Payment</th>
                      <th scope="col" className="px-6 py-3 text-left text-sm font-medium text-indigo-700 uppercase tracking-wider">Quantity</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4">{i + 1}</td>
                      <td className="px-6 py-4">
                        {o?.payment.success ? (
                          <MdCheckCircle className="w-5 h-5 text-green-500" />
                        ) : (
                          <MdCancel className="w-5 h-5 text-red-500" />
                        )}
                      </td>
                      <td className="px-6 py-4">{o?.buyer?.name}</td>
                      <td className="px-6 py-4">{moment(o?.createAt).fromNow()}</td>
                      <td className="px-6 py-4">{o?.payment.success ? <span className="text-green-600 font-semibold">Success</span> : <span className="text-red-600 font-semibold">Failed</span>}</td>
                      <td className="px-6 py-4">{o?.products?.length}</td>
                    </tr>
                  </tbody>
                </table>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {o?.products?.map((p, i) => (
                    <div className="flex items-center p-4 bg-white shadow-md rounded-md" key={p._id}>
                      <div className="md:w-1/3">
                        <img
                          src={`/api/v1/product/product-photo/${p._id}`}
                          className="w-full h-auto rounded-md"
                          alt={p.name}
                        />
                      </div>
                      <div className="md:w-2/3">
                        <p className="text-lg font-semibold text-gray-800">{p.name}</p>
                        <p className="text-sm text-gray-600">{p.description.substring(0, 30)}</p>
                        <p className="text-sm text-gray-700">Price: {p.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  </Layout>
  );
};

export default Orders;