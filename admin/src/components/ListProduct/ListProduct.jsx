/* eslint-disable react/prop-types */

import { useState } from "react";
import { useNavigat } from "react-router-dom";

const ListProduct = ({ products }) => {
    // const navigate = useNavigate();
    // const[allProducts,setAllProducts] = useState([]);

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
          <thead>
            <tr>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm font-semibold text-gray-600 tracking-wider">Picture</th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm font-semibold text-gray-600 tracking-wider">Name</th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm font-semibold text-gray-600 tracking-wider">Category</th>

              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm font-semibold text-gray-600 tracking-wider">OldPrice</th>

              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm font-semibold text-gray-600 tracking-wider">NewPrice</th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm font-semibold text-gray-600 tracking-wider">Stock</th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm font-semibold text-gray-600 tracking-wider">Status</th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm font-semibold text-gray-600 tracking-wider">Remove</th>

            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td className="px-6 py-4 border-b border-gray-300">
                  <img src={product.image} alt={product.name} className="w-12 h-12 rounded-full" />
                </td>
                <td className="px-6 py-4 border-b border-gray-300">{product.name}</td>
                <td className="px-6 py-4 border-b border-gray-300">{product.price}</td>
                <td className="px-6 py-4 border-b border-gray-300">{product.stock}</td>
                <td className="px-6 py-4 border-b border-gray-300">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${product.status === 'Active' ? 'bg-orange-100 text-orange-800' : 'bg-red-100 text-red-800'}`}>
                    {product.status}
                  </span>
                </td>
                <td className="px-6 py-4 border-b border-gray-300">
                  <button className="text-orange-600 hover:text-orange-900 mr-4">
                    <i className="fas fa-edit"></i>
                  </button>
                  <button className="text-red-600 hover:text-red-900">
                    <i className="fas fa-trash"></i>
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
