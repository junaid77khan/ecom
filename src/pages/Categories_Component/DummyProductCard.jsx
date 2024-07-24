import React from 'react';
import { FaStar } from 'react-icons/fa';

const DummyProductCard = () => {
  // Dummy array to simulate multiple product cards
  const dummyArray = Array.from({ length: 4 }); // Adjust based on your design

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {dummyArray.map((_, index) => (
        <div
          key={index}
          className="bg-white hover:bg-gray-100 duration-200 lg:px-6 px-4 py-6 shadow-md rounded-lg h-90 md:w-80 w-72 cursor-pointer"
        >
          {/* Dummy image placeholder */}
          <div className="bg-gray-300 animate-pulse rounded-lg mb-2 w-full md:h-56 h-52"></div>

          {/* Dummy title */}
          <h3 className="md:text-xl text-lg font-bold mb-2 bg-gray-300 animate-pulse rounded-lg h-6 w-4/5"></h3>

          {/* Dummy description */}
          <p className="text-gray-600 mb-2 bg-gray-300 animate-pulse rounded-lg h-16 w-full"></p>

          {/* Dummy price and rating */}
          <div className="flex items-center justify-between mb-2">
            <span className="font-bold bg-gray-300 animate-pulse rounded-lg h-6 w-1/4"></span>
            <div className="flex gap-1 items-center">
              <FaStar className="text-gray-300" />
              <FaStar className="text-gray-300" />
              <FaStar className="text-gray-300" />
              <FaStar className="text-gray-300" />
              <FaStar className="text-gray-300" />
            </div>
          </div>

          {/* Dummy buttons */}
          <div className="flex justify-between items-center">
            <button
              className="relative rounded-lg border-2 inline-flex items-center justify-start md:px-6 lg:px-5 px-4 py-2 overflow-hidden font-medium transition-all bg-gray-300 hover:bg-gray-300 hover:border-gray-300 group"
            >
              <span className="w-40 h-40 rounded rotate-[-40deg] bg-white absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-6 ml-6 group-hover:ml-0 group-hover:mb-24 group-hover:translate-x-0"></span>
              <span className="relative w-full text-center lg:text-md text-sm text-gray-300 transition-colors duration-300 ease-in-out group-hover:text-gray-300">
                Add to cart
              </span>
            </button>
            <button
              className="relative rounded-lg border-2 border-gray-300 inline-flex items-center justify-start  md:px-6 lg:px-5 px-4 py-2 overflow-hidden font-medium transition-all bg-gray-300 hover:bg-gray-300 hover:border-gray-300 group"
            >
              <span className="w-40 h-40 rounded rotate-[-40deg] bg-white absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-6 ml-6 group-hover:ml-0 group-hover:mb-24 group-hover:translate-x-0"></span>
              <span className="relative w-full text-center lg:text-md text-sm text-gray-300 transition-colors duration-300 ease-in-out group-hover:text-gray-300">
                View
              </span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DummyProductCard;
