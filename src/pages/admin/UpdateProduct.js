import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout"
import AdminMenu from './AdminMenu';
import axios from "axios";
import {toast} from "react-toastify"
import { Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";
const { Option } = Select;

const UpdateProduct = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");
  const [id, setId] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  const REACT_APP_API = 'http://localhost:5000';
  //get single product
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `${REACT_APP_API}/api/v1/product/get-product/${params.slug}`
      );
      setName(data.product.name);
      setId(data.product._id);
      setDescription(data.product.description);
      setPrice(data.product.price);
      setPrice(data.product.price);
      setQuantity(data.product.quantity);
      setShipping(data.product.shipping);
      setCategory(data.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getSingleProduct();
    //eslint-disable-next-line
  }, []);
  //get all category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(`${REACT_APP_API}/api/v1/category/get-category`);
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something wwent wrong in getting catgeory");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  //create product function
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      photo && productData.append("photo", photo);
      productData.append("category", category);
      const { data } = axios.put(
        `${REACT_APP_API}/api/v1/product/update-product/${id}`,
        productData
      );
      if (data?.success) {
        toast.error(data?.message);
      } else {
        toast.success("Product Updated Successfully");
        navigate("/dashboard/admin/products");
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  //delete a product
  const handleDelete = async () => {
    try {
      let answer = window.prompt("Are You Sure want to delete this product ? ");
      if (!answer) return;
      const { data } = await axios.delete(
        `${REACT_APP_API}/api/v1/product/delete-product/${id}`
      );
      toast.success("Product DEleted Succfully");
      navigate("/dashboard/admin/products");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <Layout title="Dashboard - Update Product">
    <div className="">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
        <AdminMenu isOpen={isOpen} toggle={toggleSidebar} />

        </div>
        <div className="md:col-span-2">
          <h1 className="text-3xl font-bold mb-8">Update Product</h1>
          <div className="w-full md:w-3/4">
          <Select
  bordered={false}
  placeholder="Select a category"
  size="large"
  showSearch
  className="rounded-lg border-gray-300 bg-white p-2 mb-6 w-full"
  onChange={(value) => setCategory(value)}
  value={category}
>
  {categories?.map((c) => (
    <Option key={c._id} value={c._id}>
      {c.name} {/* Display category name instead of ID */}
    </Option>
  ))}
</Select>
            <label htmlFor="photo" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full block mb-6 text-center cursor-pointer">
              {photo ? photo.name : 'Upload Photo'}
              <input
                type="file"
                name="photo"
                accept="image/*"
                onChange={(e) => setPhoto(e.target.files[0])}
                hidden
              />
            </label>
            <div className="mb-3">
                {photo ? (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="product_photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                ) : (
                  <div className="text-center">
                    <img
                      src={`${REACT_APP_API}/api/v1/product/product-photo/${id}`}
                      alt="product_photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                )}
              </div>

            <input
              type="text"
              value={name}
              placeholder="Write a name"
              className="rounded-lg border-gray-300 bg-gray-100 p-2 mb-6 w-full"
              onChange={(e) => setName(e.target.value)}
            />
            <textarea
              value={description}
              placeholder="Write a description"
              className="rounded-lg border-gray-300 bg-gray-100 p-2 mb-6 w-full"
              onChange={(e) => setDescription(e.target.value)}
            />
            <input
              type="number"
              value={price}
              placeholder="Write a Price"
              className="rounded-lg border-gray-300 bg-gray-100 p-2 mb-6 w-full"
              onChange={(e) => setPrice(e.target.value)}
            />
            <input
              type="number"
              value={quantity}
              placeholder="Write a quantity"
              className="rounded-lg border-gray-300 bg-gray-100 p-2 mb-6 w-full"
              onChange={(e) => setQuantity(e.target.value)}
            />
            <Select
              bordered={false}
              placeholder="Select Shipping"
              size="large"
              showSearch
              className="rounded-lg border-gray-300 bg-white p-2 mb-6 w-full"
              onChange={(value) => setShipping(value === '1')}
              value={shipping ? '1' : '0'}
            >
              <Option value="0">No</Option>
              <Option value="1">Yes</Option>
            </Select>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full mb-6" onClick={handleUpdate}>
              UPDATE PRODUCT
            </button>
            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-full" onClick={handleDelete}>
              DELETE PRODUCT
            </button>
          </div>
        </div>
      </div>
    </div>
  </Layout>
  );
};

export default UpdateProduct;