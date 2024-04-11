import React, { useState, useEffect } from 'react';
import Layout from "../../components/Layout"
import AdminMenu from './AdminMenu';
import CategoryForm from "../../components/form/CategoryForm";
import axios from "axios";
import { Modal } from "antd";
import {toast} from "react-toastify"
const CreateCategory =() => {
    const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const REACT_APP_API = 'http://localhost:5000';
    const toggleSidebar = () => {
      setIsOpen(!isOpen);
    };

 //handle Form
 const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const { data } = await axios.post(`${REACT_APP_API}/api/v1/category/create-category`, {
      name,
    });
    if (data?.success) {
      toast.success(`${name} is created`);
      getAllCategory();
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    console.log(error);
    // toast.error("somthing went wrong in input form");
  }
};

//get all cat
const getAllCategory = async () => {
  try {
    const { data } = await axios.get(`${REACT_APP_API}/api/v1/category/get-category`);
    if (data?.success) {
      setCategories(data?.category);
    }
  } catch (error) {
    console.log(error);
    toast.error("Something went wrong in getting category");
  }
};

useEffect(() => {
  getAllCategory();
}, []);

//update category
const handleUpdate = async (e) => {
  e.preventDefault();
  try {
    const { data } = await axios.put(
      `${REACT_APP_API}/api/v1/category/update-category/${selected._id}`,
      { name: updatedName }
    );
    if (data?.success) {
      toast.success(`${updatedName} is updated`);
      setSelected(null);
      setUpdatedName("");
      setVisible(false);
      getAllCategory();
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    console.log(error);
  }
};
//delete category
const handleDelete = async (pId) => {
  try {
    const { data } = await axios.delete(
      `${REACT_APP_API}/api/v1/category/delete-category/${pId}`
    );
    if (data.success) {
      toast.success(`category is deleted`);

      getAllCategory();
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    toast.error("Something went wrong");
  }
};
    return(

<Layout title={"Dashboard - Create Category"}>
  <div className=" ">
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div className="md:col-span-1">
           <AdminMenu isOpen={isOpen} toggle={toggleSidebar} />

      </div>
      <div className="md:col-span-3">
        <h1 className="text-2xl font-bold">Manage Category</h1>
        <div className="mt-4">
          <CategoryForm
            handleSubmit={handleSubmit}
            value={name}
            setValue={setName}
            className="w-full md:w-1/2"
          />
        </div>
        <div className="mt-6">
          <table className="w-full border-collapse border border-gray-300">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories?.map((c) => (
                <tr key={c._id}>
                  <td className="px-4 py-2">{c.name}</td>
                  <td className="px-4 py-2">
                    <button
                      className="btn-primary px-3 py-1 rounded-md mr-2"
                      onClick={() => {
                        setVisible(true);
                        setUpdatedName(c.name);
                        setSelected(c);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="btn-danger px-3 py-1 rounded-md"
                      onClick={() => {
                        handleDelete(c._id);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Modal onCancel={() => setVisible(false)} footer={null} visible={visible}>
          <CategoryForm
            value={updatedName}
            setValue={setUpdatedName}
            handleSubmit={handleUpdate}
          />
        </Modal>
      </div>
    </div>
  </div>
</Layout>

    )
}

export default CreateCategory