import React from "react";
import Layout from "./../components/Layout";
import { useSearch } from "../context/search";
const Search = () => {
  const [values, setValues] = useSearch();
  const REACT_APP_API = 'http://localhost:5000';

  return (
    <Layout title={"Search results"}>
      <div className="px-8">
        <div className="text-center">
          <h1>Search Results</h1>
          <h6>
            {values?.results.length < 1
              ? "No Products Found"
              : `Found ${values?.results.length}`}
          </h6>
          {values?.results.map((p) => (
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
        
        >
          More Details
        </button>
        <button
          className="bg-gray-800 text-white  text-sm px-4 py-2 rounded-lg hover:bg-gray-900"
         
        >
          ADD TO CART
        </button>
      </div>
    </div>
  </div>
  ))}
        </div>
      </div>
    </Layout>
  );
};

export default Search;