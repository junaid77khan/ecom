import { useState, useRef, useEffect, useCallback } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import debounce from "lodash/debounce";

function FeaturedCandles() {
  const [isMostPopularActive, setIsMostPopularActive] = useState(true);
  const scrollRef = useRef(null);
  const [scrollIndex, setScrollIndex] = useState(0);
  const [mostPopularProducts, setMostPopularProducts] = useState([]);
  const [newItems, setNewItems] = useState([]);

  const fetchFeaturedProducts = useCallback(async () => {
    try {
      let response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/v1/product/most-popular-products`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      let dataFromServer = await response.json();
      if (!dataFromServer.success) {
        throw new Error("Failed to fetch most popular products");
      }
      setMostPopularProducts(dataFromServer.data);

      response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/v1/product/new-items`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      dataFromServer = await response.json();
      if (!dataFromServer.success) {
        throw new Error("Failed to fetch new items");
      }
      setNewItems(dataFromServer.data);
    } catch (error) {
      console.error("Error fetching featured products:", error);
    }
  }, []);

  useEffect(() => {
    fetchFeaturedProducts();
  }, [fetchFeaturedProducts]);

  const debouncedScrollBy = useCallback(
    debounce((direction) => {
      const productWidth = scrollRef.current.firstChild.clientWidth;
      const maxScrollIndex =
        Math.floor(scrollRef.current.scrollWidth / productWidth) - 1;

      if (direction === "left") {
        setScrollIndex((prevIndex) => Math.max(prevIndex - 1, 0));
      } else {
        setScrollIndex((prevIndex) => Math.min(prevIndex + 1, maxScrollIndex));
      }
    }, 150),
    []
  );

  const scrollBy = (direction) => {
    debouncedScrollBy(direction);
  };

  const scrollToIndex = () => {
    const productWidth = scrollRef?.current?.firstChild?.clientWidth + 16;
    scrollRef?.current?.scrollTo({
      left: productWidth * scrollIndex,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    scrollToIndex();
  }, [scrollIndex]);

  return (
    <div className="h-full py-5 px-4 lg:px-24 bg-orange-50">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl mb-4 font-semibold">
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
      <div className="flex justify-center items-center lg:gap-8 md:gap-7 gap-0 overflow-x-hidden  mt-4">
        <button
          onClick={() => scrollBy("left")}
          className=" bg-white rounded-full p-2 shadow-md z-10"
        >
          <FaChevronLeft />
        </button>
        <div
          ref={scrollRef}
          className="flex gap-4 py-5 px-0 overflow-y-scroll no-scrollbar"
          style={{
            scrollSnapType: "x mandatory",
            willChange: "transform", 
            overflowY: "hidden", 
          }}
        >
          {isMostPopularActive
            ? mostPopularProducts.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  isMostPopularActive={isMostPopularActive}
                />
              ))
            : newItems.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  isMostPopularActive={isMostPopularActive}
                />
              ))}
        </div>
        <button
          onClick={() => scrollBy("right")}
          className=" bg-white rounded-full p-2 shadow-md z-10"
        >
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
}

function ProductCard({ product, isMostPopularActive }) {
  return (
    <div className="flex-shrink-0 lg:w-72 w-64 h-96 px-4 py-5 bg-white rounded-lg shadow-lg hover:bg-gray-100 transition duration-300">
      <div className="relative overflow-hidden w-full h-3/4">
        <img
          className="w-full h-full object-cover absolute inset-0 rounded-t-lg translate-y-0 transition-transform duration-500"
          src={product.images[0]}
          alt={product.name}
        />
        <img
          className="w-full h-full object-cover rounded-t-lg"
          src={product.images[1]}
          alt={product.name}
        />
      </div>
      <div className="p-3 text-center">
        <h1 className="text-gray-500 text-sm">{product.name}</h1>
        <h1 className="text-sm sm:text-md font-semibold">
          {isMostPopularActive
            ? product.description.substring(0, 40)
            : product.description}
        </h1>
      </div>
    </div>
  );
}

export default FeaturedCandles;
