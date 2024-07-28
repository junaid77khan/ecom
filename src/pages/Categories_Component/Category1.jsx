import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ProductCard } from "../../components/ProductCard";
import DummyProductCard from "./DummyProductCard";


const CategoryProducts = () => {
  const { categoryId, categoryName } = useParams();
  const navigate = useNavigate();
  const [priceRangeOption, setPriceRangeOption] = useState("all");
  const [sortBy, setSortBy] = useState("default");
  const [products, setProducts] = useState([]);
  const [productBackup, setProductBackup] = useState([]);
  const[loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/product/product-by-category/${categoryId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }

        response = await response.json();

        if (!response.success) {
          throw new Error("error fetching products")
        }
        setProducts(response.data);
        setProductBackup(response.data)
      } catch (error) {
        console.error('Fetch products error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryId, navigate]);

  useEffect(() => {

    let sortedProducts = [...productBackup];

    if (sortBy === "price-low-to-high") {
      sortedProducts.sort((a, b) => a.salePrice - b.salePrice);
    } else if (sortBy === "price-high-to-low") {
      sortedProducts.sort((a, b) => b.salePrice - a.salePrice);
    } else if (sortBy === "alphabetically") {
      sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
    }

    setProducts([...sortedProducts]); 
  }, [sortBy]);

  useEffect(() => {

    const priceRanges = {
      all: { min: 0, max: Infinity },
      affordable: { min: 1, max: 1000 },
      midRange: { min: 1000, max: 2000 },
    };

    const { min, max } = priceRanges[priceRangeOption];

    const filteredProducts = productBackup.filter((product) => product.salePrice >= min && product.salePrice <= max);

    setProducts([...filteredProducts]); 
  }, [priceRangeOption]);

  
  return (      
      <div className=" w-full mx-auto py-12 px-3 flex flex-col justify-center items-center bg-gradient-to-b from-orange-50 to-orange-0">
      <h2 className="lg:text-3xl text-2xl font-bold mb-6">{categoryName}</h2>
      <div className="flex gap-4 mb-6">
        <select
          className="border border-gray-300 rounded-md p-1 md:p-2 md:text-md text-sm"
          value={priceRangeOption}
          onChange={(e) => setPriceRangeOption(e.target.value)}
        >
          <option className="text-black" value="all">All Prices</option>
          <option value="affordable">1 - 1000 ₹</option>
          <option value="midRange">1000 - 2000 ₹</option>
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
      {(loading || !products) &&
        <DummyProductCard />
       }

       {
        !loading && products.length === 0 && 
        <div className="w-[100%]   ">
            <div colSpan="6" className="w-full h-full text-xl lg:text-2xl py-10 px-5 font-bold">No Products Available</div>
          </div>
       }
      {
        !loading && products.length > 0 &&
        <div className="flex flex-wrap justify-center items-center lg:gap-8 gap-4">
          {Array.isArray(products) &&  products?.map((product) => (
            <ProductCard key={product._id} check={true} product={product} />
          ))}
        </div>
      }
    </div>
    )
  
};

export default CategoryProducts;
