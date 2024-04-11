import React from "react";

const CategoryForm = ({ handleSubmit, value, setValue }) => {
  return (
    <>
     <form onSubmit={handleSubmit} className="mb-3">
    <input
      type="text"
      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
      placeholder="Enter new category"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
    <button
      type="submit"
      className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
    >
      Submit
    </button>
  </form>
    </>
  );
};

export default CategoryForm;