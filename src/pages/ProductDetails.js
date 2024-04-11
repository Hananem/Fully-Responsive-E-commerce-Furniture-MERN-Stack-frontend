import React, { useState, useEffect } from "react";
import Layout from "../components/Layout"
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const ProductDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const REACT_APP_API = 'http://localhost:5000';
  //initalp details
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);
  //getProduct
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `${REACT_APP_API}/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };
  //get similar product
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `${REACT_APP_API}/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
    <div class="grid grid-cols-1 sm:grid-cols-2 container product-details">
      <div class="col-span-1 sm:col-span-1">
        <img
          src={`${REACT_APP_API}/api/v1/product/product-photo/${product._id}`}
          class="w-full h-300 object-cover"
          alt={product.name}
          width={"350px"}
        />
      </div>
      <div class="col-span-1 sm:col-span-1 product-details-info">
        <h1 class="text-center">Product Details</h1>
        <hr />
        <h6>Name : {product.name}</h6>
        <h6>Description : {product.description}</h6>
        <h6>
          Price :
          {product?.price?.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </h6>
        <h6>Category : {product?.category?.name}</h6>
        <button class="bg-gray-800 text-white px-4 py-2 mt-2 rounded-md">ADD TO CART</button>
      </div>
    </div>
    <hr />
    <div class="grid grid-cols-1 sm:grid-cols-2 container similar-products">
      <h4 class="col-span-1 sm:col-span-2">Similar Products ➡️</h4>
      {relatedProducts.length < 1 && (
        <p class="text-center col-span-1 sm:col-span-2">No Similar Products found</p>
      )}
      <div class="flex flex-wrap">
        {relatedProducts?.map((p) => (
          <div class="bg-white shadow-md rounded-lg overflow-hidden m-2" key={p._id}>
            <img
              src={`${REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
              class="w-full h-64 object-cover"
              alt={p.name}
            />
            <div class="px-6 py-4">
              <div class="font-bold text-xl mb-2">{p.name}</div>
              <p class="text-gray-700 text-base">
                {p.description.substring(0, 60)}...
              </p>
            </div>
            <div class="px-6 py-4">
              <button
                class="bg-blue-500 text-white px-4 py-2 mt-2 rounded-md"
                onClick={() => navigate(`/product/${p.slug}`)}
              >
                More Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </Layout>
  
  );
};

export default ProductDetails;