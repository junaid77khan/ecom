

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { faTrash, faEdit, faE } from '@fortawesome/free-solid-svg-icons';

const ListCategory = ({ products }) => {
    const navigate = useNavigate();
    const[categories,setCategories] = useState([]);

    useEffect(() => {
      const fetchProductCategories = async() => {
        const response = await fetch(`http://localhost:8000/api/v1/category/all-categories`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
        });
  
        const dataFromServer = await response.json();
  
        if(!dataFromServer.success) {
          navigate("/error")
        }
        setCategories(dataFromServer.data);
      }
  
      fetchProductCategories();
    }, [])

    const handleAddProduct = () => {
      navigate('/addproduct');
    };

  return (
    <div className="container w-[60%] mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">All Categories</h2>
        <button   onClick={handleAddProduct}
         className="bg-orange-500 text-white px-4 py-2 rounded">ADD CATEGORY</button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white ">
          <thead className="border-b-2 border-gray-300">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 tracking-wider">Picture</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 tracking-wider">Name</th>
              <th className="px-6 py-3  text-left text-sm font-semibold text-gray-600 tracking-wider">Description</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr className="border-b border-gray-300" key={category._id}>
                <td className="px-6 py-4 ">
                  <img src={category.image} alt={category.name} className="w-12 h-12 rounded-full" />
                </td>
                <td className="px-6 py-4 ">{category.name}</td>
                <td className="px-6 py-4 ">{category.description}</td>
                
                <td className="px-6 py-4 flex ">
                  <button className="text-green-600 hover:text-green-900 mr-4">
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button className="text-red-600 hover:text-red-900">
                    <FontAwesomeIcon icon={faTrash} />
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

export default ListCategory;