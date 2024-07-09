

import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";

const CategoryProducts = () => {
  const { categoryName } = useParams();
  const navigate = useNavigate();
  const [availabilityFilter, setAvailabilityFilter] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 1000]);
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
    {
      id: 2,
      category: "Pillar Candles",
      name: "Product 2",
      description: "Sed do eiusmod tempor.",
      image: "/candle6.jpg",
      price: 799.0,
      rating: 4.5,
      availability: true,
    },
    {
      id: 3,
      category: "Pillar Candles",
      name: "Product 3",
      description: "Sed do eiusmod tempor.",
      image: "/candle6.jpg",
      price: 898.99,
      rating: 4.2,
      availability: false,
    },
    {
      id: 4,
      category: "Pillar Candles",
      name: "Product 4",
      description: "Sed do eiusmod tempor.",
      image: "/candle6.jpg",
      price: 229.99,
      rating: 3.0,
      availability: true,
    },
    {
      id: 5,
      category: "Tea Light Candles",
      name: "Product 1",
      description: "Lorem ipsum dolor sit amet.",
      image: "/candle4.jpg",
      price: 699.99,
      rating: 4.7,
      availability: true,
    },
    {
      id: 6,
      category: "Tea Light Candles",
      name: "Product 2",
      description: "Lorem ipsum dolor sit amet.",
      image: "/candle5.jpg",
      price: 799.99,
      rating: 4.7,
      availability: true,
    },
    {
      id: 7,
      category: "Tea Light Candles",
      name: "Product 3",
      description: "Lorem ipsum dolor sit amet.",
      image: "/candle6.jpg",
      price: 899.99,
      rating: 4.7,
      availability: true,
    },
    {
      id: 1,
      category: "Jar Candles",
      name: "Product 1",
      description: "Lorem ipsum dolor sit amet.",
      image: "/candle4.jpg",
      price: 699.99,
      rating: 4.7,
      availability: true,
    },
    {
      id: 1,
      category: "Jar Candles",
      name: "Product 1",
      description: "Lorem ipsum dolor sit amet.",
      image: "/candle4.jpg",
      price: 699.99,
      rating: 4.7,
      availability: true,
    },

  ];

  const filteredProducts = products
    .filter((product) => product.category === categoryName)
    .filter((product) => {
      if (availabilityFilter === "all") return true;
      if (availabilityFilter === "available") return product.availability;
      if (availabilityFilter === "not-available") return !product.availability;
      return true;
    });

  const filteredByPrice = filteredProducts.filter(
    (product) =>
      product.price >= priceRange[0] && product.price <= priceRange[1]
  );

  const sortedProducts = [...filteredByPrice].sort((a, b) => {
    if (sortBy === "price-low-to-high") return a.price - b.price;
    if (sortBy === "price-high-to-low") return b.price - a.price;
    return a.name.localeCompare(b.name);
  });

  return (
    <div className="container mx-auto py-12 px-3 flex flex-col justify-center items-center">
      <h2 className="text-3xl font-bold mb-6">{categoryName}</h2>
      <div className="flex flex-wrap gap-4 mb-6">
        <select
          className="border border-gray-300 rounded-md p-2"
          value={availabilityFilter}
          onChange={(e) => setAvailabilityFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="available">Available</option>
          <option value="not-available">Not Available</option>
        </select>
        <input
          type="range"
          min="0"
          max="1000"
          value={priceRange[1]}
          onChange={(e) =>
            setPriceRange([priceRange[0], parseInt(e.target.value)])
          }
          className="border border-gray-300 rounded-md p-2 "
        />
        ${priceRange[0]} - ${priceRange[1]}
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
              <span className="font-bold">${product.price}</span>
              <span className="text-gray-600">{product.rating} <span className="text-yellow-500 text-lg">★</span></span>
            </div>
            <button className="bg-orange-500 hover:bg-orange-600  text-white font-bold py-2 px-8 rounded-lg">
                Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryProducts;
