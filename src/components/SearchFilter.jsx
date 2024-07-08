/* eslint-disable react/prop-types */
import  { useState } from "react";
import { IoMdCloseCircle } from "react-icons/io";

const SearchFilter = ({ products, onClose }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-80 flex justify-center items-center z-50">
      <div className="bg-gray-300 bg-opacity-50 p-9 rounded shadow-lg w-1/2 relative">
        <button
          className="absolute right-3    bottom-40  text-xl"
          onClick={onClose}
        >
          <IoMdCloseCircle className="w-6 h-6" />
        </button>
        <input
          type="text"
          placeholder="Search for products..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-full p-2 rounded mb-4"
        />
        <ul>
          {filteredProducts.map((product) => (
            <li key={product.id}>{product.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SearchFilter;
