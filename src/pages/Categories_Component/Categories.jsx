import { useNavigate } from "react-router-dom";
import {
  FaArrowRight
} from "react-icons/fa";
import { useState, useEffect } from "react";
import { DummyCategoryCard } from "../../components/Home/HomeDummy/DummyCategoryCard";

function Categories() {
  const navigate = useNavigate();
  const[productCategories, setProductCategories] = useState([]);
  const[loading, setLoading] = useState(true); 

  useEffect(() => {
    try {
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
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [])

  return (
    <div className=" w-[100%] py-12 flex flex-col justify-center items-center bg-orange-50">
      <h2 className="lg:text-3xl text-2xl font-bold mb-6 text-start">Categories</h2>
      <div className="flex flex-wrap justify-center items-center lg:gap-8 gap-4">
      {(loading || !productCategories) && 
        Array.from({ length: 8 }).map((_, index) => (
            <DummyCategoryCard key={index}/>
          ))
      } 
      {
        !loading && productCategories.length === 0 && 
        <div className="w-[100%]   ">
            <div colSpan="6" className="w-full h-full text-xl lg:text-2xl py-10 px-5 font-bold">No Categories Available</div>
          </div>
      }
      {
        !loading && productCategories.length > 0 &&
        
        productCategories.map((category) => (
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
              {category.name.length > 20 ? `${category.name.substring(0, 20)}...` : category.name}{" "}<FaArrowRight className="cursor-pointer inline" />{" "}
              
            </h1>
            <div>
            {category.description.length > 50 ? `${category.description.substring(0, 50)}...` : category.description}
            </div>
          </a>
        ))
          
      }
      </div>
    </div>
  );
}

export default Categories;
