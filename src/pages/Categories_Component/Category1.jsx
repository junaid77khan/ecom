import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";

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
  const [availabilityFilter, setAvailabilityFilter] = useState("all");
  const [priceRangeOption, setPriceRangeOption] = useState("all");
  const [sortBy, setSortBy] = useState("default");

  const products = [
    {
      id: 1,
      category: "Scented Candles",
      name: "Product 1",
      description: "Lorem ipsum dolor sit amet.",
      image: "/candle4.jpg",
      price: 699.99,
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
    return product.price >= min && product.price <= max;
  });

  const sortedProducts = [...filteredByPrice].sort((a, b) => {
    if (sortBy === "price-low-to-high") return a.price - b.price;
    if (sortBy === "price-high-to-low") return b.price - a.price;
    return a.name.localeCompare(b.name);
  });

  return (
    <div className="container mx-auto py-12 px-3 flex flex-col justify-center items-center bg-orange-50">
      <h2 className="text-3xl font-bold mb-6">{categoryName}</h2>
      <div className="flex gap-4 mb-6">
        <select
          className="border border-gray-300 rounded-md p-2"
          value={priceRangeOption}
          onChange={(e) => setPriceRangeOption(e.target.value)}
        >
          <option value="all">All Prices</option>
          <option value="affordable">0 - 500 ₹</option>
          <option value="midRange">500 - 1000 ₹</option>
        </select>
        <select
          className="border border-gray-300 rounded-md p-2"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="default">Default Sorting</option>
          <option value="alphabetically">Alphabetically</option>
          <option value="price-low-to-high">Price: Low to High</option>
          <option value="price-high-to-low">Price: High to Low</option>
        </select>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {sortedProducts.map((product) => (
          <div
            onClick={() => navigate(`/product/${product.id}`)}
            key={product.id}
            className="bg-white hover:bg-gray-100 duration-200 p-6 shadow-md rounded-lg h-full w-96 px-3 cursor-pointer"
          >
            <img
              src={product.image}
              alt={product.name}
              className="rounded-lg mb-2 w-full h-56"
            />
            <h3 className="text-xl font-bold mb-2">{product.name}</h3>
            <p className="text-gray-600 mb-2">{product.description}</p>
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold">₹{product.price}</span>
              <StarRating rating={product.rating} />
            </div>
            <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-8 rounded-lg">
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryProducts;
