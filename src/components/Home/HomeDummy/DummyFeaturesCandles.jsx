import React from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

export const DummyFeaturesCandles = () => {

  const dummyArray = Array.from({ length: 4 });

  return (
    <div className="flex justify-center items-center lg:gap-8 md:gap-7 gap-0 overflow-x-hidden mt-4">
      <button
        onClick={() => scrollBy("left")}
        className="bg-white rounded-full p-2 shadow-md z-10"
      >
        <FaChevronLeft />
      </button>
      <div className="flex gap-4  py-5 px-0 overflow-x-scroll no-scrollbar"
        style={{
          scrollSnapType: "x mandatory",
          scrollBehavior: "smooth",
        }}
      >
        {dummyArray.map((_, index) => (
          <div key={index} className="flex-shrink-0 w-72 animate-pulse bg-gray-300 rounded-xl p-4">
            
            <div className="h-40 bg-gray-300 mb-2 rounded-xl"></div>
            <div className="h-6 w-3/4 bg-gray-300 mb-2 rounded-xl"></div>
            <div className="h-4 w-1/2 bg-gray-300 rounded-xl"></div>
          </div>
        ))}
      </div>
      <button
        onClick={() => scrollBy("right")}
        className="bg-white rounded-full p-2 shadow-md z-10"
      >
        <FaChevronRight />
      </button>
    </div>
  );
};

