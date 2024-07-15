
import React, { useState } from "react";
import { IoMdCloseCircle } from "react-icons/io";
import { motion } from "framer-motion";

const SearchFilter = ({ products, onClose }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
      <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50 px-3">
          <motion.div
            initial={{
              opacity: 0,
              scale:0.8
            }}
            animate={{
              opacity: 1,
              scale: 1
            }}
            transition={{
              duration: 0.2,
            }}
          className="bg-orange-50 bg-opacity-70 md:p-9 p-6 rounded-lg shadow-lg md:w-1/2 w-full relative"
          >
          <button
            className="absolute md:right-3 md:top-3 right-1 top-1 text-xl text-orange-500 hover:text-orange-700"
            onClick={onClose}
          >
            <IoMdCloseCircle className="w-6 h-6" />
          </button>
          <input
            type="text"
            placeholder="Search for products..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full md:p-2 p-1 rounded-lg md:mb-4 mb-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <ul>
            {filteredProducts.map((product) => (
              <li
                key={product.id}
                className="text-gray-800 md:text-md text-sm py-2 border-b border-gray-300 last:border-b-0"
              >
                {product.name}
              </li>
            ))}
          </ul>         
          </motion.div>
      </div>
  );
};

export default SearchFilter;
