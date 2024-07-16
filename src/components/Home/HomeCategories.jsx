import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
// import { productCategories } from "../../data/HomeData";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const HomeCategories = () => {
  const navigate = useNavigate();
  const[productCategories, setProductCategories] = useState(null)

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
      setProductCategories(dataFromServer.data.slice(0, 8));
    }

    fetchProductCategories();
  }, [])

  return (
    <div className="h-full py-10 px-4 sm:px-10 lg:px-24 w-full bg-gradient-to-b from-orange-100 to-orange-50">
      <h1 className="text-3xl sm:text-4xl lg:text-6xl text-black font-semibold">
        Our Categories
      </h1>

      <div className="flex flex-wrap justify-center items-center gap-5 sm:gap-10 py-10 mt-4">
        {productCategories?.length === 0 && (
          <div className="text-xl sm:text-2xl">No Categories Available</div>
        )}
        {productCategories?.length > 0 &&
          productCategories?.map((category) => (
            <a
              key={category._id}
              href={`/categories/${encodeURIComponent(
                category.name
              )}`}
              className="flex flex-col justify-start items-start gap-3 w-72 sm:w-72 h-80 sm:h-96 px-4 py-6 bg-white overflow-hidden hover:bg-gray-200 duration-200 rounded-lg"
            >
              <div className="w-full h-3/4 overflow-hidden">
                <img
                  className="bg-cover h-full w-full bg-center rounded-lg hover:scale-105 transition-transform duration-300 transform-gpu"
                  src={category.image}
                  alt={category.name}
                />
              </div>
              <h1 className="text-lg sm:text-xl">
                {category.name}{" "}
                <FontAwesomeIcon
                  onClick={() => navigate("/collections")}
                  className="cursor-pointer"
                  icon={faArrowRight}
                />{" "}
              </h1>
              <div>
                <p className="text-gray-500 hover:text-black">
                  {category.description.substring(0, 40)}...
                </p>
              </div>
            </a>
          ))}
      </div>

      <div className="w-full flex justify-end items-center">
        {productCategories?.length > 0 && (
          <button
            onClick={() => navigate("/categories")}
            className="border hover:bg-gray-200 transition-200 border-gray-200 bg-white px-4 py-2 sm:px-8 sm:py-3"
          >
            View All
          </button>
        )}
      </div>
    </div>
  );
};

export default HomeCategories;
