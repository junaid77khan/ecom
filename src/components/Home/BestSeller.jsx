import { useState, useEffect,} from "react";
import { ProductInformation } from "../ProductInformation";
import { DummyBestSeller } from "./HomeDummy/DummyBestSeller";
import { ShowReviews } from "../ShowReviews";

const BestSeller = () => {
  const [bestSellerProduct, setBestSellerProduct] = useState({});
  const [productId, setProductId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bestSellerProductReview, setBestSellerProductReview] = useState([]);

  useEffect(() => {
    try {
      const fetchBestSellerProduct = async () => {

        let response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/v1/product/best-seller`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        response = await response.json();

        if (!response.success) {
          throw new Error("Error fetching product data")
        }
        if(response.data.length > 0) setBestSellerProduct(response.data[0]);
        if(response.data.length > 0) setProductId(response.data[0]._id);
      };
      fetchBestSellerProduct();
    } catch (error) {
      console.log("Error fetching product data", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    try {
      const fetchReviews = async () => {
          if (!productId) return;
          try {
            let data = {
              productId: productId,
            };
            const token = JSON.parse(localStorage.getItem("Access Token"));
            const response = await fetch(
              `${import.meta.env.VITE_API_URL}/api/v1/review/get-product-reviews`,
              {
                method: "POST",
                mode: "cors",
                credentials: "include",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(data),
              }
            );
      
            if (!response.ok) {
              throw new Error("Failed to fetch product reviews");
            }
      
            data = await response.json();
      
            if (!data.success) {
              throw new Error("Fetch product reviews error");
            }
      
            setBestSellerProductReview(data.data);
          } catch (error) {
            console.error("Fetch product reviews error:", error);
          }
        };
        fetchReviews();
    } catch (error) {
      console.log("Error fetching product reviews", error);
    }
  }, [])


  return (
    <div className=" mx-auto lg:px-24 px-2 py-8 bg-orange-50">
      <div>
        <button className="duration-200 rounded-full md:text-xl  text-md uppercase bg-orange-500 text-white border border-gray-300 px-4 sm:px-6 py-2">
          Best Seller
        </button>
      </div>
      <div className="flex flex-wrap justify-center items-center gap-5 sm:gap-10 py-10 mt-4"></div>
      {(loading || !bestSellerProduct || !bestSellerProductReview) &&
        <DummyBestSeller />
      }    
      {!loading && Object.entries(bestSellerProduct).length === 0 && 
          <div className="w-[100%]   ">
            <div colSpan="6" className="w-full h-full text-xl lg:text-2xl py-10 px-5 font-bold">No Product Available</div>
          </div>
      }
      {
        !loading && Object.entries(bestSellerProduct).length > 0 &&
        <div className="bg-white py-7 shadow-md rounded-lg overflow-hidden">
            <ProductInformation product={bestSellerProduct} />

            
          <div className="mt-12 ">
            <div className="px-5">
                    <h3 className="lg:text-xl text-lg font-semibold text-red-600 mb-2">
                      Customer Reviews:
                    </h3>
                    {!loading && bestSellerProductReview.length === 0 &&
                      <div className="w-[100%]   ">
                        <div colSpan="6" className="w-full h-full text-xl lg:text-2xl py-10 px-5 font-bold">No reviews yet</div>
                      </div>
                    }
                    {!loading && bestSellerProductReview.length > 0 &&
                      <ShowReviews reviews={bestSellerProductReview} />
                    }
                  </div>
            </div>
        </div>
      }
    </div>
  );
};

export default BestSeller;
