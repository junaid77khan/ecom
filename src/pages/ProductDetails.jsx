
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import { ProductReview } from "../components/ProductReview";
import { ProductCard } from "../components/ProductCard";
import { ProductInformation } from "../components/ProductInformation";


const ProductDetails = () => {
  const { productId } = useParams();
  const [allReviews, setAllReviews] = useState(false);
  const navigate = useNavigate();
  const[product, setProduct] = useState({});
  const[productReviews, setProductReviews] = useState([]);
  const[relatedProducts, setRelatedProducts] = useState([]);
  const[loading, setLoading] = useState(true);
  const [rating, setRating] = useState(0);
  const[review, setReview] = useState("");
  const[reviewLoading, setReviewLoading] = useState(false);
  const[userStatus, setUserStatus] = useState(false);

  useEffect(() => {
    const checkUserStatus = async () => {
        try {
            let expiry = JSON.parse(localStorage.getItem("accessToken"));
            if(expiry && new Date().getTime() < expiry) {
                setUserStatus(true);
            } else {
                setUserStatus(false);                        
            }    
        } catch (error) {
            console.error('Error checking user status:', error);
            dispatch(logout());
            setUserStatus(false); 
        }
    };

    checkUserStatus();
  }, []);

  const handleAddReview = async() => {
    if(userStatus) {
      setReviewLoading(true);
      try {
        let response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/product/add-review`, {
          method: 'POST',
          mode: "cors",
          credentials: "include",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            productId: product._id,
            rating,
            review,
          }),
        });

        if (!response.ok) {
          toast.error("Failed to add review. Please try again.");
          throw new Error('Failed to add review');
        }

        response = await response.json();
        
      } catch (error) {
        toast.error("Failed to add review. Please try again.");
        console.error('Adding review error:', error);
      } finally {
        setReview("");
        setRating(0);
        setReviewLoading(false);
      }
    } else {
      navigate("/signin");
    }
  }

  const Rating = () => {
    const handleStarClick = (starNumber) => {
      console.log("Clicked");
      setRating(starNumber);
    };
  
    return (
      <div className='text-3xl'>
      {[1, 2, 3, 4, 5].map((starNumber) => (
        <Star
          key={starNumber}
          onClick={() => handleStarClick(starNumber)}
          filled={starNumber <= rating}
        />
      ))}
    </div>
    );
  };
  
  const Star = ({ filled, onClick }) => {
    return (
      <span
        className={`cursor-pointer ${filled ? 'text-yellow-500' : 'text-gray-400'}`}
        onClick={onClick}
      >
        &#9733;
      </span>
    );
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        let response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/product/product-by-Id/${productId}`, {
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
        setProduct(response.data.product);
        setRelatedProducts(response.data.relatedProducts);
        
      } catch (error) {
        console.error('Fetch products error:', error);
        navigate("/error");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, []);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        let response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/product/get-reviews/${productId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch product reviews');
        }

        response = await response.json();

        if (!response.success) {
          console.error('Fetch product reviews error:');
        }
        setProductReviews(response.data.ratingsReviews)
        
      } catch (error) {
        console.error('Fetch product reviews error:', error);
        navigate("/error");
      } 
    };

    fetchReviews();
  }, [handleAddReview]);

  const handleRatingChange = (rating) => {
    setRating(rating);
  };

  return (
    <div className=" mx-auto lg:px-4 px-2 py-8 bg-orange-50">
      {loading ?
        (<div className="h-96 flex justify-center items-center z-50">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
        </div>) :
        (
          <div>
          <div className="bg-white py-7 shadow-md rounded-lg overflow-hidden">
            <ProductInformation product={product} />

            {/* product reviews section */}
            <div className="mt-12 flex flex-col md:flex-row gap-4 justify-between items-start">
                <div className="px-5 w-full md:w-1/3 ">
                  <h1 className="lg:text-xl text-md font-semibold text-red-600">Add your review</h1>
                  <Rating />
                    <textarea className="border border-gray-200 bg-gray-200 rounded-lg p-2 outline-none resize-none w-full h-32" placeholder="Write your review" value={review} onChange={(e) => setReview(e.target.value)}/>
                    <div className="flex gap-2">
                      <button
                        onClick={handleAddReview}
                        disabled={reviewLoading}
                        className="relative rounded-lg border-2 inline-flex items-center justify-start md:px-6 lg:px-5 px-4 py-2 overflow-hidden font-medium transition-all bg-orange-500 hover:bg-orange-500 hover:border-orange-500 group"
                      >
                        <span className="w-40 h-40 rounded rotate-[-40deg] bg-white absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-6 ml-6 group-hover:ml-0 group-hover:mb-24 group-hover:translate-x-0"></span>
                        <span className="relative w-full text-center lg:text-md text-sm text-white transition-colors duration-300 ease-in-out group-hover:text-orange-500">
                          Add 
                        </span>
                      </button>
                      { reviewLoading && <div className="h-10  flex justify-center items-center z-50">
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-orange-500"></div>
                      </div>}
                    </div>
                </div>
                <div className="px-5 w-full md:w-2/3  rounded-lg overflow-hidden">
                  <h3 className="lg:text-xl text-lg font-semibold text-red-600 mb-2">
                    Customer Reviews
                  </h3>
                  {!productReviews || productReviews.length === 0 ? (<div className="text-xl w-full text-center font-semibold">No Reviews Yet</div>): 
                    (
                      <>
                      {!allReviews && (
                        <div className="ease-linear duration-200">
                          {productReviews?.length > 0 && <ProductReview ratingReview={productReviews[0]} />}
                          { productReviews?.length > 1 && <ProductReview ratingReview={productReviews[1]} />}
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
                          {productReviews.map((ratingReview) => (
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
            </div>

          </div>

          {/* Related product */}
          <div className="mt-12">
        <h3 className="lg:text-2xl text-lg font-semibold mb-4">Related Products</h3>
        <div className="flex flex-wrap justify-center md:justify-start mt-4  gap-4">
        {relatedProducts.length > 0 ? (
            relatedProducts.map((product) => (
                <a key={product._id} href={`/product/${product._id}`}>
                    <ProductCard check={false} product={product} />
                </a>
            ))
        ) : (
            <p className="font-semibold text-center w-full h-40 text-xl ">No Available related products <span onClick={() => navigate('/categories')} className="border-b-2 cursor-pointer text-orange-500 border-orange-500 hover:text-orange-600 hover:border-orange-600">See more Categories</span></p>
        )}
        </div>
      </div>
          </div>
        )
      }
    </div>
  );
};

export default ProductDetails;