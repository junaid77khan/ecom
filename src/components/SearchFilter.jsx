import React, { useEffect, useState } from "react";
import { IoMdCloseCircle } from "react-icons/io";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

const SearchFilter = ({ products, onClose }) => {
  const [searchInput, setSearchInput] = useState("");
  const [allProducts, setAllProducts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();
  

  const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      return () => {
        clearTimeout(handler);
      };
    }, [value, delay]);

    return debouncedValue;
  };


  const debouncedSearchInput = useDebounce(searchInput, 1000);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/product/all-products`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
        });
    
        const dataFromServer = await response.json();
    
        if (!dataFromServer.success) {
          throw new Error("Something went wrong while fetching products data");
        }
        setAllProducts(dataFromServer.data);
      } catch (error) {
        console.log("Something went wrong while fetching products data", error);
      }
    };
  
    fetchProducts();
  }, []);

  const handleSearch = (event) => {
    setSearchInput(event.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/product/search-product/${debouncedSearchInput}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
        });
        response = await response.json();
  
        if (!response.success) {
          throw new Error("Something went wrong while searching");
        }
  
        setSearchResults(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, [debouncedSearchInput]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50 px-3">
      <motion.div
        initial={{
          opacity: 0,
          scale: 0.8
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
          placeholder="Search products"
          value={searchInput}
          onChange={handleSearch}
          className="w-full md:p-2 p-1 rounded-lg md:mb-4 mb-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        <ul>
          {searchResults.map((product) => (
            <a
              key={product._id}
              href={`/product/${product._id}`}
              onClick={onClose}
              className="text-gray-900 md:text-md text-md py-2 border-b border-gray-500 last:border-b-0"
            >
              {product.name.length > 30 ? `${product.name.substring(0, 30)}...` : product.name}
            </a>
          ))}
        </ul>         
      </motion.div>
    </div>
  );
};

export default SearchFilter;
