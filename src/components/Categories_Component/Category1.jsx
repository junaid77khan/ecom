// import  { useState } from 'react';

// const products = [
//     {
//         id: 1,
//         category: 'Category 1',
//         name: 'Product 1',
//         description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//         image: '../../../public/featured1.webp',
//         price: 699.99,
//         rating: 4.7,
//         availability: true,
//     },
//     {
//         id: 2,
//         category: 'Category 2',
//         name: 'Product 2',
//         description: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
//         image: '../../../public/f2.webp',
//         price: 799.00,
//         rating: 4.5,
//         availability: true,
//     },
//     {
//         id: 3,
//         category: 'Category 2',
//         name: 'Product 2',
//         description: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
//         image: '../../../public/candle1.jpeg',
//         price: 898.99,
//         rating: 4.2,
//         availability: false,
//     },
//     {
//         id:4,
//         category: 'Category 2',
//         name: 'Product 2',
//         description: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
//         image: '../../../public/candle2.webp',
//         price: 229.99,
//         rating: 3.0,
//         availability: true,
//     },
// ];

// const ProductPage = () => {
//     const [availabilityFilter, setAvailabilityFilter] = useState('all');
//     const [priceRange, setPriceRange] = useState([0, 1000]);
//     const [sortBy, setSortBy] = useState('default');

//     const filteredProducts = products.filter(product => {
//         if (availabilityFilter === 'all') {
//             return true;
//         } else if (availabilityFilter === 'available') {
//             return product.availability;
//         } else if (availabilityFilter === 'not-available') {
//             return !product.availability;
//         }
//         return true;
//     });

//     const filteredByPrice = filteredProducts.filter(product => {
//         return product.price >= priceRange[0] && product.price <= priceRange[1];
//     });

//     const sortedProducts = [...filteredByPrice].sort((a, b) => {
//         if (sortBy === 'price-low-to-high') {
//             return a.price - b.price;
//         } else if (sortBy === 'price-high-to-low') {
//             return b.price - a.price;
//         } else {
//             return a.name.localeCompare(b.name);
//         }
//     });

//     return (
//         <div className="container mx-auto py-12 px-3 flex flex-col justify-center items-center">
//             <h2 className="text-3xl font-bold mb-6">Category Name</h2>

//             <div className="flex flex-wrap gap-4 mb-6">
//                 <select
//                     className="border border-gray-300 rounded-md p-2"
//                     value={availabilityFilter}
//                     onChange={(e) => setAvailabilityFilter(e.target.value)}
//                 >
//                     <option value="all">All</option>
//                     <option value="available">Available</option>
//                     <option value="not-available">Not Available</option>
//                 </select>

//                 <input
//                     type="range"
//                     min="0"
//                     max="1000"
//                     value={priceRange[1]}
//                     onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
//                     className="border border-gray-300 rounded-md p-2"
//                 />
//                 ${priceRange[0]} - ${priceRange[1]}

//                 <select
//                     className="border border-gray-300 rounded-md p-2"
//                     value={sortBy}
//                     onChange={(e) => setSortBy(e.target.value)}
//                 >
//                     <option value="default">Default Sorting</option>
//                     <option value="alphabetically">Alphabetically</option>
//                     <option value="price-low-to-high">Price: Low to High</option>
//                     <option value="price-high-to-low">Price: High to Low</option>
//                 </select>
//             </div>

//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
//                 {sortedProducts.map(product => (
//                     <div key={product.id} className="bg-white hover:bg-gray-100 duration-200 p-6 shadow-md rounded-lg h-full w-96 px-3 py-4">
//                         <img src={product.image} alt={product.name} className="rounded-lg mb-2 w-full h-56" />
//                         <h3 className="text-xl font-bold mb-2">{product.name}</h3>
//                         <p className="text-gray-600 mb-2">{product.description}</p>
//                         <div className="flex items-center justify-between mb-2">
//                             <span className="font-bold">${product.price}</span>
//                             <span className="text-gray-600">{product.rating} Stars</span>
//                         </div>
//                         <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
//                             Add to Cart
//                         </button>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default ProductPage;

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
      image: "/featured1.webp",
      price: 699.99,
      rating: 4.7,
      availability: true,
    },
    {
      id: 2,
      category: "Pillar Candles",
      name: "Product 2",
      description: "Sed do eiusmod tempor.",
      image: "/f2.webp",
      price: 799.0,
      rating: 4.5,
      availability: true,
    },
    {
      id: 3,
      category: "Pillar Candles",
      name: "Product 3",
      description: "Sed do eiusmod tempor.",
      image: "/candle1.jpeg",
      price: 898.99,
      rating: 4.2,
      availability: false,
    },
    {
      id: 4,
      category: "Pillar Candles",
      name: "Product 4",
      description: "Sed do eiusmod tempor.",
      image: "/candle2.webp",
      price: 229.99,
      rating: 3.0,
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
          className="border border-gray-300 rounded-md p-2"
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
            key={product.id}
            className="bg-white hover:bg-gray-100 duration-200 p-6 shadow-md rounded-lg h-full w-96 px-3 py-4 cursor-pointer"
            onClick={() => navigate(`/product/${product.id}`)}
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
              <span className="text-gray-600">{product.rating} Stars</span>
            </div>
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryProducts;
