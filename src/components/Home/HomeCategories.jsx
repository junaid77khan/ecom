/* eslint-disable no-undef */
/* eslint-disable react/jsx-key */

import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { DummyCategoryCard } from "./HomeDummy/DummyCategoryCard";

const HomeCategories = () => {
  const navigate = useNavigate();
  const [productCategories, setProductCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const fetchProductCategories = async () => {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/v1/category/all-categories`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const dataFromServer = await response.json();

        if (!dataFromServer.success) {
          navigate("/error");
        }
        setProductCategories(dataFromServer.data.slice(0, 8));
      };

      fetchProductCategories();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  return (
    <div className="h-full py-10 px-4 sm:px-10 lg:px-24 w-full bg-gradient-to-b from-orange-100 to-orange-50">
      <h1 className="text-3xl sm:text-4xl lg:text-6xl text-black font-semibold">
        Our Categories
      </h1>

      <div className="flex flex-wrap justify-center items-center gap-5 sm:gap-10 py-10 mt-4">
        {(loading || !productCategories) &&
          Array.from({ length: 8 }).map((_, index) => (
            <DummyCategoryCard key={index} />
          ))}
        {!loading && productCategories?.length === 0 && (
          <div className="w-[100%]   ">
            <div
              colSpan="6"
              className="w-full h-full text-xl lg:text-2xl py-10 px-5 font-bold"
            >
              No Categories Available
            </div>
          </div>
        )}
        {!loading &&
          productCategories?.length > 0 &&
          productCategories?.map((category) => (
            <div
              key={category._id}
              onClick={() =>
                navigate(`/categories/${category._id}/${category.name}`)
              }
              className="flex flex-col justify-start items-start gap-3 w-72 sm:w-72 h-80 sm:h-96 px-4 py-6 bg-white overflow-hidden hover:bg-white duration-200 rounded-lg"
            >
              <div className="w-full h-3/4 overflow-hidden">
                <img
                  className="bg-cover h-full w-full bg-center rounded-lg hover:scale-105 transition-transform duration-300 transform-gpu"
                  src={category.image}
                  alt={category.name}
                />
              </div>
              <h1 className="text-md md:text-lg">
                {category.name.length > 20
                  ? `${category.name.substring(0, 20)}...`
                  : category.name}{" "}
                <FaArrowRight className="inline" />{" "}
              </h1>
              <div>
                <p className="text-gray-500 hover:text-black">
                  {category.description.length > 50
                    ? `${category.description.substring(0, 50)}...`
                    : category.description}
                </p>
              </div>
            </div>
          ))}
      </div>

      <div className="w-full flex justify-end items-center">
        {productCategories?.length > 0 && (
          <button
            onClick={() => navigate("/categories")}
            className="border hover:bg-white transition-200 border-white bg-white px-4 py-2 sm:px-8 sm:py-3"
          >
            View All
          </button>
        )}
      </div>
    </div>
  );
};

export default HomeCategories;
