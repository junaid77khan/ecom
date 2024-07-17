/* eslint-disable react/prop-types */

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { faTrash, faEdit, faE } from '@fortawesome/free-solid-svg-icons';
import { FaTrash, FaEdit } from "react-icons/fa";

const ListProduct = () => {
    const navigate = useNavigate();
    const[products,setProducts] = useState([]);
    useEffect(() => {
      const fetchProducts = async() => {
        const response = await fetch(`http://localhost:8000/api/v1/product/all-products`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
        });
  
        const dataFromServer = await response.json();
  
        if(!dataFromServer.success) {
          navigate("/error")
        }
        setProducts(dataFromServer.data);
      }
  
      fetchProducts();
    }, [])

  const handleAddProduct = () => {
    navigate('/addproduct');
  };

  return (
    <div className="container w-[60%] mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">All Products</h2>
        <button   onClick={handleAddProduct}
         className="bg-orange-500 text-white px-4 py-2 rounded">ADD PRODUCT</button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead className="border-b-2 border-gray-300">
            <tr>
              <th className="px-6 py-3  text-left text-sm font-semibold text-gray-600 tracking-wider">Image</th>
              <th className="px-6 py-3  text-left text-sm font-semibold text-gray-600 tracking-wider">Name</th>
              {/* <th className="px-6 py-3  text-left text-sm font-semibold text-gray-600 tracking-wider">Description</th> */}
              <th className="px-6 py-3  text-left text-sm font-semibold text-gray-600 tracking-wider">Category</th>
              {/* <th className="px-6 py-3  text-left text-sm font-semibold text-gray-600 tracking-wider">Price</th> */}

              <th className="px-6 py-3  text-left text-sm font-semibold text-gray-600 tracking-wider">Stock</th>
              <th className="px-6 py-3  text-left text-sm font-semibold text-gray-600 tracking-wider">Units sold</th>

            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id} className="border-b border-gray-300">
                <td className="px-6 py-4 ">
                  <img src={product.images[0]} alt={product.name} className="w-10 h-10 rounded-full" />
                </td>
                <td className="px-6 py-4 ">{product.name}</td>
                {/* <td className="px-6 py-4 ">{product.description}</td> */}
                <td className="px-6 py-4 ">{product.categoryId.name}</td>
                {/* <td className="px-6 py-4 ">{product.price}</td> */}
                <td className="px-6 py-4 ">{product.stock}</td>
                <td className="px-6 py-4 ">{product.unitsSold}</td>
                
                <td className="px-6 py-4 flex gap-2">
                  <button className="text-gray-600 hover:text-gray-900 mr-4">
                    <FaEdit/>
                  </button>
                  <button className="text-gray-600 hover:text-gray-900">
                    <FaTrash/>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListProduct;
