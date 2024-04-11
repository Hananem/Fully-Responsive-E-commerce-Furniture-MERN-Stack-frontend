import React, { useState, useEffect} from 'react';
import Layout from "../../components/Layout"
import AdminMenu from './AdminMenu';
import axios from "axios";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";
import {toast} from "react-toastify"
const { Option } = Select;


const CreateProduct =() => {
    const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const toggleSidebar = () => {
      setIsOpen(!isOpen);
    };
    const REACT_APP_API = 'http://localhost:5000';

    //get all category
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

  //create product function
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("photo", photo);
      productData.append("category", category);
      const { data } = axios.post(
       ` ${REACT_APP_API}/api/v1/product/create-product`,
        productData
      );
      if (data?.success) {
        toast.error(data?.message);
      } else {
        toast.success("Product Created Successfully");
        navigate("/dashboard/admin/products");
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };
    return(
<Layout title={"Dashboard - Create Product"}>
  <div className="">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="col-span-1 md:col-span-1">
        <AdminMenu isOpen={isOpen} toggle={toggleSidebar} />
      </div>
      <div className="col-span-1 md:col-span-2">
        <h1 className="text-3xl font-bold mb-4">Create Product</h1>
        <div className="m-1 w-3/4">
        <Select
  variant="default"
  placeholder="Select a category"
  size="large"
  showSearch
  className="form-select mb-3"
  onChange={(selectedValue) => {
    if (selectedValue && typeof selectedValue === 'string') {
      setCategory(selectedValue); // Assuming selectedValue is the ID or value of the selected option
    } else {
      console.error("Invalid event or target value:", selectedValue);
    }
  }}
>
  {categories?.map((c) => (
    <Option key={c._id} value={c._id}>
      {c.name}
    </Option>
  ))}
</Select>
          <div className="mb-3">
            <input
              id="photo"
              type="file"
              name="photo"
              accept="image/*"
              onChange={(e) => setPhoto(e.target.files[0])}
              className="border border-gray-300 bg-white text-gray-700 font-bold py-2 px-4 rounded w-full"
            />
          </div>
          {photo && (
            <div className="mb-3 text-center">
              <img
                src={URL.createObjectURL(photo)}
                alt="product_photo"
                height={"200px"}
                className="w-full h-auto"
              />
            </div>
          )}
          <div className="mb-3">
            <input
              type="text"
              value={name}
              placeholder="write a name"
              className="border border-gray-300 bg-gray-100 rounded-lg p-2 w-full"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <textarea
              value={description}
              placeholder="write a description"
              className="border border-gray-300 bg-gray-100 rounded-lg p-2 w-full"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <input
              type="number"
              value={price}
              placeholder="write a Price"
              className="border border-gray-300 bg-gray-100 rounded-lg p-2 w-full"
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <input
              type="number"
              value={quantity}
              placeholder="write a quantity"
              className="border border-gray-300 bg-gray-100 rounded-lg p-2 w-full"
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>
          <Select
  variant="default" // Use "default" for a bordered select
  placeholder="Select Shipping"
  size="large"
  showSearch
  className="border border-gray-300 bg-white rounded-lg p-2 mb-3 w-full"
  onChange={(selectedValue) => {
    if (selectedValue && typeof selectedValue === 'string') {
      setShipping(selectedValue);
    } else {
      console.error("Invalid event or target value:", selectedValue);
    }
  }}
>
  <Option value="">Select Shipping</Option>
  <Option value="0">No</Option>
  <Option value="1">Yes</Option>
</Select>
          <div className="mb-3">
            <button className="border border-gray-300 bg-white text-gray-700 font-bold py-2 px-4 rounded w-full" onClick={handleCreate}>
              CREATE PRODUCT
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</Layout>


    )
}

export default CreateProduct