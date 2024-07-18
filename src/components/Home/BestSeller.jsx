import { useState, useEffect, useCallback } from "react";
import { FaChevronDown, FaChevronUp, FaArrowRight } from "react-icons/fa";
import { ProductInformation } from "../ProductInformation";
import { ProductReview } from "../ProductReview";

const BestSeller = () => {
  const [allReviews, setAllReviews] = useState(false);
  const[bestSellerProduct, setBestSellerProduct] = useState({});
  const[productId, setProductId] = useState(null);
  const[loading, setLoading] = useState(true);
  const[bestSellerProductReview, setBestSellerProductReview] = useState([]);

  useEffect(() => {
    try {
      const fetchBestSellerProduct = async() => {
          let response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/product/best-seller`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            },
          });
    
          response = await response.json();
    
          if(!response.success) {
            console.log("Error fetching best seller data");
          }
          setBestSellerProduct(response.data[0]);
          setProductId(response.data[0]._id)
      }
      fetchBestSellerProduct();
      } catch (error) {
          console.log("Error fetching product data", error);
      } finally {
        setLoading(false)
      }
  }, [])

  const fetchReviews = useCallback(async () => {
    if (!productId) return; 

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/product/get-reviews/${productId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch product reviews');
      }

      const data = await response.json();

      if (!data.success) {
        throw new Error('Fetch product reviews error');
      }

      setBestSellerProductReview(data.data.ratingsReviews);
    } catch (error) {
      console.error('Fetch product reviews error:', error);
    }
  }, [productId]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews, productId]);
  
  return (

      <div className=" mx-auto lg:px-24 px-2 py-8 bg-orange-50">
        <div>
          <button className="duration-200 rounded-full md:text-xl mb-3 text-md uppercase bg-orange-500 text-white border border-gray-300 px-4 sm:px-6 py-2">
            Best Seller
          </button>
        </div>
        { loading || Object.entries(bestSellerProduct).length === 0 || bestSellerProductReview.length === 0? (
          <div className="h-96 flex justify-center items-center z-50">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
          </div>
        ) :
        (
            <>
            <div className="bg-white py-7 shadow-md rounded-lg overflow-hidden">
              <ProductInformation product={bestSellerProduct} />

              <div className="mt-12 ">
                  {bestSellerProductReview && bestSellerProductReview.length > 0 && (
                  <div className="px-5">
                        <h3 className="lg:text-xl text-lg font-semibold text-red-600 mb-2">
                          Customer Reviews:
                        </h3>
                        {!bestSellerProductReview || bestSellerProduct.length === 0 ? (<div className="text-xl w-full text-center font-semibold">No Reviews Yet</div>): 
                    (
                      <>
                      {!allReviews && (
                        <div className="ease-linear duration-200">
                          { bestSellerProductReview?.length > 0 && <ProductReview ratingReview={bestSellerProductReview[0]} />}
                          { bestSellerProductReview?.length > 1 && <ProductReview ratingReview={bestSellerProductReview[1]} />}
                          <button
                            onClick={() => setAllReviews(true)}
                            className="flex justify-center items-center w-full "
                          >
                            <FaChevronDown className="lg:text-2xl text-md" />
                          </button>
                        </div>
                      )}
                      {allReviews && (
                        <div className="ease-out duration-300">
                          {bestSellerProductReview.map((ratingReview) => (
                            <ProductReview key={ratingReview._id} ratingReview = {ratingReview} />
                          ))}
                          <button
                            onClick={() => setAllReviews(false)}
                            className="flex justify-center items-center w-full "
                          >
                            <FaChevronUp className="lg:text-2xl text-md" />
                          </button>
                        </div>
                      )}
                      </>
                    )
                  }
                  </div>
                )}
            </div>
          </div>
            </>
          )
        }
    </div>
  );
};

export default BestSeller;
