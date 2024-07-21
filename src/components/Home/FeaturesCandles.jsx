import { useState, useRef, useEffect, useCallback } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { bestSellerProduct } from "../../data/HomeData";

function FeaturedCandles() {
  const [isMostPopularActive, setIsMostPopularActive] = useState(true);
  const scrollRef = useRef(null);
  const [mostPopularProducts, setMostPopularProducts] = useState([]);
  const [newItems, setNewItems] = useState([]);
  const [loading, setLoading] = useState(true);

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
    }  finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFeaturedProducts();
  }, [fetchFeaturedProducts]);

  const scrollBy = (direction) => {
    const scrollAmount = scrollRef.current.clientWidth;
    if (direction === "left") {
      scrollRef.current.scrollLeft -= scrollAmount;
    } else {
      scrollRef.current.scrollLeft += scrollAmount;
    }
  };

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
      {
        loading && 
        <div className="h-96 flex justify-center items-center z-50">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
        </div>
      }
      {
        !loading && ((mostPopularProducts && mostPopularProducts.length === 0 && newItems && newItems.length === 0)) && 
        <div className="text-xl sm:text-2xl">No Products Available</div>
      }
      {!loading && (mostPopularProducts && mostPopularProducts.length > 0 && newItems && newItems.length > 0) &&
        <div className="flex justify-center items-center lg:gap-8 md:gap-7 gap-0 overflow-x-hidden mt-4">
          <button
            onClick={() => scrollBy("left")}
            className="bg-white rounded-full p-2 shadow-md z-10"
          >
            <FaChevronLeft />
          </button>
          <div
            ref={scrollRef}
            className="flex gap-4 py-5 px-0 overflow-x-scroll no-scrollbar"
            style={{
              scrollSnapType: "x mandatory",
              scrollBehavior: "smooth",
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
            className="bg-white rounded-full p-2 shadow-md z-10"
          >
            <FaChevronRight />
          </button>
        </div>
      }
    </div>
  );
}

function ProductCard({ product, isMostPopularActive }) {
  const navigate = useNavigate();
  return (
    <div onClick={() => navigate(`/product/${product._id}`)} className="flex-shrink-0 lg:w-72 w-64 h-96 px-4 py-5 bg-white rounded-lg shadow-lg hover:bg-gray-100 transition duration-300">
      <div className="relative overflow-hidden w-full h-2/3">
        <img
          className="w-full h-full object-cover absolute inset-0 rounded-t-lg translate-y-0 hover:translate-y-full transition-transform duration-500"
          src={product.images[0]}
          alt={product.name}
        />
        <img
          className="w-full h-full object-cover rounded-t-lg"
          src={product.images[1]}
          alt={product.name}
        />
      </div>
      <div className="w-full flex flex-col">
        <h1 className="text-lg p-1">{product.name}</h1>
        <h1 className="text-md text-gray-500">
          {product.description.substring(0, 40)}
        </h1>
      </div>
    </div>
  );
}

export default FeaturedCandles;