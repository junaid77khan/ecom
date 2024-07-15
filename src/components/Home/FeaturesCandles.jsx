import { useState, useRef, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

function FeaturedCandles() {
  const [isMostPopularActive, setIsMostPopularActive] = useState(true);
  const scrollRef = useRef(null);
  const [scrollIndex, setScrollIndex] = useState(0);

  const scrollBy = (direction) => {
    const productWidth = scrollRef.current.firstChild.clientWidth;
    const maxScrollIndex =
      Math.floor(scrollRef.current.scrollWidth / productWidth) - 1;

    if (direction === "left") {
      setScrollIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    } else {
      setScrollIndex((prevIndex) => Math.min(prevIndex + 1, maxScrollIndex));
    }
  };
  const scrollToIndex = () => {
    const productWidth = scrollRef.current.firstChild.clientWidth + 20;
    scrollRef.current.scrollTo({
      left: productWidth * scrollIndex,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    scrollToIndex();
  }, [scrollIndex]);

  return (
    <div className="h-full py-5 px-4 lg:px-24 bg-orange-50">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl mb-4">
        Featured Candles
      </h1>
      <h1 className="text-md sm:text-lg lg:text-xl text-gray-500">
        Our universally agreed, most loved products.
      </h1>
      <div className="flex flex-wrap justify-between items-center mt-8">
        <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-6">
          <button
            onClick={() => setIsMostPopularActive(true)}
            className={`duration-200 rounded-full text-sm sm:text-xl uppercase ${
              !isMostPopularActive
                ? "bg-gray-200 text-gray-800"
                : "bg-orange-500 text-white"
            } border border-gray-300 px-4 sm:px-6 py-2`}
          >
            Most Popular
          </button>
          <button
            onClick={() => setIsMostPopularActive(false)}
            className={`duration-200 rounded-full text-sm sm:text-xl uppercase ${
              isMostPopularActive
                ? "bg-gray-200 text-gray-800"
                : "bg-orange-500 text-white"
            } border border-gray-300 px-4 sm:px-6 py-2`}
          >
            New Items
          </button>
        </div>
      </div>
      <div className="relative overflow-x-hidden mt-4">
        <button
          onClick={() => scrollBy("left")}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md z-10"
        >
          <FaChevronLeft />
        </button>
        <div
          ref={scrollRef}
          className="flex gap-4 py-5 px-3 overflow-x-hidden"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {isMostPopularActive &&
            Array(16)
              .fill()
              .map((_, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-48 sm:w-56 md:w-64 lg:w-72 xl:w-80 px-2 py-5 bg-white rounded-lg shadow-lg hover:bg-gray-100 transition duration-300"
                >
                  <div className="relative overflow-hidden">
                    <img
                      className="w-full h-32 sm:h-48 md:h-56 lg:h-64 object-cover absolute inset-0 rounded-t-lg translate-y-0 hover:translate-y-[-100%] transition-transform duration-500"
                      src="/candle4.jpg"
                      alt="Product"
                    />
                    <img
                      className="w-full h-32 sm:h-48 md:h-56 lg:h-64 object-cover rounded-t-lg"
                      src="/candle2.jpg"
                      alt="Product"
                    />
                  </div>
                  <div className="p-3 text-center">
                    <h1 className="text-gray-500 text-sm">AURA DECOR</h1>
                    <h1 className="text-sm sm:text-md font-semibold">
                      AuraDecor Blue Premium Reed Diffuser Gift Set || Aroma
                      Diffuser
                    </h1>
                  </div>
                </div>
              ))}

          {!isMostPopularActive &&
            Array(16)
              .fill()
              .map((_, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-48 sm:w-56 md:w-64 lg:w-72 xl:w-80 px-2 py-5 bg-white rounded-lg shadow-lg hover:bg-gray-100 transition duration-300"
                >
                  <div className="relative overflow-hidden">
                    <img
                      className="w-full h-32 sm:h-48 md:h-56 lg:h-64 object-cover absolute inset-0 rounded-t-lg translate-y-0 hover:translate-y-[-100%] transition-transform duration-500"
                      src="/candle8.jpg"
                      alt="Product"
                    />
                    <img
                      className="w-full h-32 sm:h-48 md:h-56 lg:h-64 object-cover rounded-t-lg"
                      src="/candle1.jpg"
                      alt="Product"
                    />
                  </div>
                  <div className="p-3 text-center">
                    <h1 className="text-gray-500 text-sm">TEA LIGHT CANDLES</h1>
                    <h1 className="text-sm sm:text-md font-semibold">
                      AuraDecor Blue Premium Reed Diffuser Gift Set || Aroma
                      Diffuser
                    </h1>
                  </div>
                </div>
              ))}
        </div>
        <button
          onClick={() => scrollBy("right")}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md z-10"
        >
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
}

export default FeaturedCandles;
