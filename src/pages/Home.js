import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Checkbox, Radio } from "antd";
import axios from "axios";
import Layout from '../components/Layout'
import { Prices } from "../components/Prices";
import { AiOutlineReload } from "react-icons/ai";
import {toast} from "react-toastify"
import { useCart } from "../context/cart";

const Home = () => {  
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [checked, setChecked] = useState([]);
    const [radio, setRadio] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const REACT_APP_API = 'http://localhost:5000';
    
      //get all cat
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(`${REACT_APP_API}/api/v1/category/get-category`);
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);


  //get products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${REACT_APP_API}/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

    //getTOtal COunt
    const getTotal = async () => {
      try {
        const { data } = await axios.get(`${REACT_APP_API}/api/v1/product/product-count`);
        setTotal(data?.total);
      } catch (error) {
        console.log(error);
      }
    };

    useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);
  //load more
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${REACT_APP_API}/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };



  // filter by cat
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };
  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  //get filterd product
  const filterProduct = async () => {
    try {
      const { data } = await axios.post(`${REACT_APP_API}/api/v1/product/product-filters`, {
        checked,
        radio,
      });
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

    return(
    <Layout>
 <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Product Page</h1>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-3">
        <div className="bg-gray-200 p-4 rounded">
      <h2 className="text-lg font-semibold mb-2">Filters</h2>
      <ul className="flex flex-col">
    
      {categories?.map((c) => (
              <Checkbox
                key={c._id}
                onChange={(e) => handleFilter(e.target.checked, c._id)}
              >
                {c.name}
              </Checkbox>
            ))}
             
      </ul>
      <ul>
      <h4 className="text-center mt-4">Filter By Price</h4>
          <div className="flex flex-column">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices?.map((p) => (
                <div key={p._id}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
      </ul>
          <button
          className="bg-blue-500 text-white text-sm px-4 py-2 rounded-lg hover:bg-blue-600"
          onClick={() => window.location.reload()}
        >
        Reset Filters
        </button>
    </div>
      
      
        </div>
     
     
     
        <div className="col-span-9">
        <div className="grid grid-cols-3 gap-4">
        {products?.map((p) => (
  <div className="bg-white p-4 rounded-lg shadow-lg m-2" key={p._id}>
    <img
      src={`${REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
      className="w-full h-54 object-cover rounded-lg"
      alt={p.name}
    />
    <div className="p-4">
      <div className="flex justify-between items-center mb-2">
        <h5 className="text-lg font-semibold">{p.name}</h5>
        <h5 className="text-lg font-semibold card-price">
          {p.price.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </h5>
      </div>
      <p className="text-gray-600">
        {p.description.substring(0, 60)}...
      </p>
      <div className="flex justify-between items-center mt-4">
        <button
          className="bg-blue-500 text-white text-sm px-4 py-2 rounded-lg hover:bg-blue-600"
          onClick={() => navigate(`/product/${p.slug}`)}
        >
          More Details
        </button>
        <button
          className="bg-gray-800 text-white  text-sm px-4 py-2 rounded-lg hover:bg-gray-900"
          onClick={() => {
                        setCart([...cart, p]);
                        localStorage.setItem(
                          "cart",
                          JSON.stringify([...cart, p])
                        );
                        toast.success("Item Added to cart");
                      }}
        >
          ADD TO CART
        </button>
      </div>
    </div>
  </div>
))}

    </div>

  <div className="m-2 p-3">
            {products && products.length < total && (
              <button
                className="bg-blue-500 text-white text-sm px-4 py-2 rounded-lg hover:bg-blue-600"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? (
                  "Loading ..."
                ) : (
                  <>
                    {" "}
                    Load more <AiOutlineReload />
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
    </Layout>
    )
}

export default Home