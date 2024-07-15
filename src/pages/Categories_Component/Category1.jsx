/* eslint-disable react/prop-types */
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/cartSlice";
import { showPopup } from "../../store/popupSlice";
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

const StarRating = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <div className="flex">
      {[...Array(fullStars)].map((_, i) => (
        <span key={i} className="text-yellow-500 text-lg">★</span>
      ))}
      {halfStar && <span className="text-yellow-500 text-lg">☆</span>}
      {[...Array(emptyStars)].map((_, i) => (
        <span key={i + fullStars + 1} className="text-gray-300 text-lg">★</span>
      ))}
    </div>
  );
};

const CategoryProducts = () => {
  const { categoryName } = useParams();
  const navigate = useNavigate();
  // const [availabilityFilter, setAvailabilityFilter] = useState("all");
  const [priceRangeOption, setPriceRangeOption] = useState("all");
  const [sortBy, setSortBy] = useState("default");
  const dispatch = useDispatch();

  const products = [
    {
      id: 1,
      category: "Scented Candles",
      name: "Product 1",
      description: "Lorem ipsum dolor sit amet.",
      images: ["/candle4.jpg"],
      salePrice: 699.99,
      rating: 4.7,
      availability: true,
    },
    {
      id: 2,
      category: "Scented Candles",
      name: "Product 1",
      description: "Lorem ipsum dolor sit amet.",
      images: ["/candle4.jpg"],
      salePrice: 699.99,
      rating: 4.7,
      availability: true,
    },
    {
      id: 3,
      category: "Scented Candles",
      name: "Product 1",
      description: "Lorem ipsum dolor sit amet.",
      images: ["/candle4.jpg"],
      salePrice: 699.99,
      rating: 4.7,
      availability: true,
    },
    {
      id: 4,
      category: "Scented Candles",
      name: "Product 1",
      description: "Lorem ipsum dolor sit amet.",
      images: ["/candle4.jpg"],
      salePrice: 699.99,
      rating: 4.7,
      availability: true,
    },
    // Add your product data here
  ];

  const filteredProducts = products
    .filter((product) => product.category === categoryName)

  const priceRanges = {
    all: { label: "All Prices", min: 0, max: 1000 },
    affordable: { label: "0 - 500", min: 0, max: 500 },
    midRange: { label: "500 - 1000", min: 500, max: 1000 },
  };

  const filteredByPrice = filteredProducts.filter((product) => {
    const { min, max } = priceRanges[priceRangeOption];
    return product.salePrice >= min && product.salePrice <= max;
  });

  const sortedProducts = [...filteredByPrice].sort((a, b) => {
    if (sortBy === "price-low-to-high") return a.salePrice - b.salePrice;
    if (sortBy === "price-high-to-low") return b.salePrice - a.salePrice;
    return a.name.localeCompare(b.name);
  });

 
    

  const handleAddToCart = (product, quantity) => {
    const { id, category, name, description, images, salePrice, rating, availability } = product;
    const obj = { id, category, name, description, images, salePrice, rating, availability, quantity };
    dispatch(addToCart({ product: obj }));
    dispatch(showPopup(obj));
  };

  // const handleAddToCart = (product) => {
  //   const obj = { ...product, quantity: 1 };
  //   dispatch(addToCart({ product: obj }));
  //   dispatch(showPopup(obj));
  // };

  return (
    <div className="container mx-auto py-12 px-3 flex flex-col justify-center items-center bg-orange-50">
      <h2 className="lg:text-3xl text-2xl font-bold mb-6">{categoryName}</h2>
      <div className="flex gap-4 mb-6">
        <select
          className="border border-gray-300 rounded-md p-1 md:p-2 md:text-md text-sm"
          value={priceRangeOption}
          onChange={(e) => setPriceRangeOption(e.target.value)}
        >
          <option className="text-black" value="all">All Prices</option>
          <option value="affordable">0 - 500 ₹</option>
          <option value="midRange">500 - 1000 ₹</option>
        </select>
        <select
          className="border border-gray-300 rounded-md p-1 md:p-2 md:text-md text-sm"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="default">Default Sorting</option>
          <option value="alphabetically">Alphabetically</option>
          <option value="price-low-to-high">Price: Low to High</option>
          <option value="price-high-to-low">Price: High to Low</option>
        </select>
      </div>
      <div className="flex flex-wrap justify-center items-center lg:gap-8 gap-4">
        {sortedProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white hover:bg-gray-100 duration-200 lg:px-6 px-4 py-6 shadow-md rounded-lg h-full md:w-80 w-72 cursor-pointer"
          >
            <img
              src={product.images[0]}
              alt={product.name}
              className="rounded-lg mb-2 w-full md:h-56 h-52"
            />
            <h3 className="md:text-xl text-lg font-bold mb-2">{product.name}</h3>
            <p className="text-gray-600 mb-2">{product.description}</p>
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold">₹{product.salePrice}</span>
              <StarRating rating={product.rating} />
            </div>
            <div className="flex justify-between items-center">
                <button
                  onClick={() => handleAddToCart(product)}
                  className="relative rounded-lg border-2 inline-flex items-center justify-start md:px-6 lg:px-5 px-4 py-2 overflow-hidden font-medium transition-all bg-orange-500 hover:bg-orange-500 hover:border-orange-500 group"
                >
                  <span className="w-40 h-40 rounded rotate-[-40deg] bg-white absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-6 ml-6 group-hover:ml-0 group-hover:mb-24 group-hover:translate-x-0"></span>
                  <span className="relative w-full text-center lg:text-md text-sm  text-white transition-colors duration-300 ease-in-out group-hover:text-orange-500">
                    Add to cart
                  </span>
                </button>
                <button
                   onClick={() => navigate(`/product/${product.id}`)}
                  className="relative rounded-lg border-2 border-orange-500 inline-flex items-center justify-start  md:px-6 lg:px-5 px-4 py-2 overflow-hidden font-medium transition-all bg-white hover:bg-white hover:border-white group"
                >
                  <span className="w-40 h-40 rounded rotate-[-40deg] bg-orange-500 absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-6 ml-6 group-hover:ml-0 group-hover:mb-24 group-hover:translate-x-0"></span>
                  <span onClick={() => navigate(`/product/${product.id}`)} className="relative w-full text-center lg:text-md text-sm text-orange-500 transition-colors duration-300 ease-in-out group-hover:text-white">
                    View
                  </span>
                </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryProducts;
CategoryProducts.js


