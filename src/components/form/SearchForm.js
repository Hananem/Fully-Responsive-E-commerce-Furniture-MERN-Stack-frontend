import React from "react";
import { useSearch } from "../../context/search";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { RiSearchLine } from 'react-icons/ri';

const  SearchForm = () => {
    const [values, setValues] = useSearch();
    const navigate = useNavigate();
    const REACT_APP_API = 'http://localhost:5000';
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const { data } = await axios.get(
          `${REACT_APP_API}/api/v1/product/search/${values.keyword}`
        );
        setValues({ ...values, results: data });
        navigate("/search");
        console.log("search");
      } catch (error) {
        console.log(error);
      }
    };
    return(
        <form className="relative"
        role="search"
        onSubmit={handleSubmit}
        >
        <input  placeholder="Search..." className="bg-gray-700 text-white px-3 py-1 rounded-md focus:outline-none" 
             type="search"
          aria-label="Search"
          value={values.keyword}
          onChange={(e) => setValues({ ...values, keyword: e.target.value })}
        />
        <button className="absolute right-0 top-0 h-full px-2 text-gray-300 hover:text-white focus:outline-none"
        type="submit"
        >
          <RiSearchLine />
        </button>
      </form>
    )
}

export default SearchForm