import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/cartSlice";
import { showPopup } from "../../store/popupSlice";
import { ProductCard } from "../../components/ProductCard";


const CategoryProducts = () => {
  const { categoryId, categoryName } = useParams();
  const navigate = useNavigate();
  const [priceRangeOption, setPriceRangeOption] = useState("all");
  const [sortBy, setSortBy] = useState("default");
  const [products, setProducts] = useState([]);
  const [productBackup, setProductBackup] = useState([]);
  const dispatch = useDispatch();
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
          console.error('Fetch products error:');
          navigate("/error");
        }
        setProducts(response.data);
        setProductBackup(response.data)
      } catch (error) {
        console.error('Fetch products error:', error);
        navigate("/error");
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
      all: { min: 0, max: 1000 },
      affordable: { min: 0, max: 500 },
      midRange: { min: 500, max: 1000 },
    };

    const { min, max } = priceRanges[priceRangeOption];

    const filteredProducts = productBackup.filter((product) => product.salePrice >= min && product.salePrice <= max);

    setProducts([...filteredProducts]); 
  }, [priceRangeOption]);

  
  return (
    loading ? (
      <div className="h-96 flex justify-center items-center z-50">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
        </div>
    ) : (
      
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
        {Array.isArray(products) &&  products?.map((product) => (
          <ProductCard key={product._id} check={true} product={product} />
        ))}
      </div>
    </div>
    )
  );
};

export default CategoryProducts;
