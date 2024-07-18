

import { useNavigate } from "react-router-dom";
import {
  FaArrowRight
} from "react-icons/fa";
import { useState, useEffect } from "react";

function Categories() {
  const navigate = useNavigate();
  const[productCategories, setProductCategories] = useState([]);

  useEffect(() => {
    const fetchProductCategories = async() => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/category/all-categories`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      });

      const dataFromServer = await response.json();

      if(!dataFromServer.success) {
        navigate("/error")
      }
      setProductCategories(dataFromServer.data);
    }

    fetchProductCategories();
  }, [])

  return (
    <div className="container py-12 flex flex-col justify-center items-center bg-orange-50">
      <h2 className="lg:text-3xl text-2xl font-bold mb-6 text-start">Categories</h2>
      <div className="flex flex-wrap justify-center items-center lg:gap-8 gap-4">
        {productCategories.map((category) => (
      <a
        key={category._id}
        href={`/categories/${category._id}/${category.name}`}
        className="flex flex-col justify-center items-start gap-3 lg:w-80 lg:h-96 w-72 h-80 lg:px-6 px-4 py-6 bg-white overflow-hidden hover:bg-gray-200 duration-200 rounded-lg"
      >
        <div className="w-full h-3/4 overflow-hidden">
          <img
            className="bg-cover h-full w-full bg-center rounded-lg hover:scale-105 transition-transform duration-300 transform-gpu"
            src={category.image}
            alt={category.name}
          />
        </div>
        <h1 className="text-lg lg:text-xl">
          {category.name}{" "}<FaArrowRight className="cursor-pointer inline" />{" "}
          
        </h1>
        <div>
          <p className="text-gray-500 text-sm lg:text-md hover:text-black">{category.description.substring(0,80)}... 
          </p>
        </div>
      </a>
    ))}
      </div>
    </div>
  );
}

export default Categories;
