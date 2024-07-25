import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { ProductCard } from "../components/ProductCard";
import { ProductInformation } from "../components/ProductInformation";
import { toast } from "sonner";
import { DummyBestSeller } from "../components/Home/HomeDummy/DummyBestSeller";
import { ShowReviews } from "../components/ShowReviews";

const ProductDetails = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [productReviews, setProductReviews] = useState([]);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [reviewLoading, setReviewLoading] = useState(false);
  const [userStatus, setUserStatus] = useState(false);
  const [name, setName] = useState(""); // New state for user name

  useEffect(() => {
    const checkUserStatus = async () => {
      try {
        let expiry = JSON.parse(localStorage.getItem("accessToken"));
        if (expiry && new Date().getTime() < expiry) {
          setUserStatus(true);
        } else {
          setUserStatus(false);
        }
      } catch (error) {
        console.error("Error checking user status:", error);
        // dispatch(logout());
        setUserStatus(false);
      }
    };

    checkUserStatus();
  }, []);

  const handleAddReview = useCallback(async () => {
    if (!name || !review) {
      toast.error("Please enter your name and review before submitting.");
      return;
    }

    setReviewLoading(true);
    try {
      let response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/v1/review/add-review`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            productId: product._id,
            rating,
            review,
            name,
          }),
        }
      );

      if (!response.ok) {
        toast.error("Failed to add review. Please try again.");
        throw new Error("Failed to add review");
      }
      toast.success("Added.");
      response = await response.json();
      setProductReviews(response.data);
    } catch (error) {
      toast.error("Failed to add review. Please try again.");
      console.error("Adding review error:", error);
    } finally {
      setReview("");
      setName("");
      setRating(0);
      setReviewLoading(false);
    }
  }, [userStatus, product._id, rating, review, name, navigate]);

  const Rating = () => {
    const handleStarClick = (starNumber) => {
      setRating(starNumber);
    };

    return (
      <div className="text-3xl">
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
        className={`cursor-pointer ${
          filled ? "text-yellow-500" : "text-gray-400"
        }`}
        onClick={onClick}
      >
        &#9733;
      </span>
    );
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        let response = await fetch(
          `${
            import.meta.env.VITE_API_URL
          }/api/v1/product/product-by-Id/${productId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        response = await response.json();

        if (!response.success) {
          console.error("Fetch products error:");
          navigate("/error");
        }
        setProduct(response.data.product);
        setRelatedProducts(response.data.relatedProducts);
      } catch (error) {
        console.error("Fetch products error:", error);
        navigate("/error");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();

    const fetchReviews = async () => {
      try {
        const data = {
          productId: productId,
        };
        let response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/v1/review/get-product-reviews`,
          {
            method: "POST",
            mode: "cors",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch product reviews");
        }

        response = await response.json();

        if (!response.success) {
          console.error("Fetch product reviews error:");
        }
        setProductReviews(response.data);
      } catch (error) {
        console.error("Fetch product reviews error:", error);
        navigate("/error");
      }
    };

    fetchReviews();
  }, []);

  return (
    <div className=" mx-auto lg:px-4 px-2 py-8 bg-orange-50">
      {loading && <DummyBestSeller />}
      {!loading && Object.entries(product).length === 0 && (
        <div className="w-[100%]   ">
          <div
            colSpan="6"
            className="w-full h-full text-xl lg:text-2xl py-10 px-5 font-bold"
          >
            No Product Information Available
          </div>
        </div>
      )}
      {!loading && Object.entries(product).length > 0 && (
        <div>
          <div className="bg-white py-7 shadow-md rounded-lg overflow-hidden">
            <ProductInformation product={product} />

            <div className="mt-12 flex flex-col md:flex-row gap-4 justify-between items-start">
              <div className="px-5 w-full md:w-1/3 ">
                <h1 className="lg:text-xl text-md font-semibold text-red-600">
                  Add your review
                </h1>
                <Rating />
                <input
                  type="text"
                  className="border border-gray-200 bg-gray-200 rounded-lg p-2 outline-none w-full mb-2"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <textarea
                  className="border border-gray-200 bg-gray-200 rounded-lg p-2 outline-none resize-none w-full h-32"
                  placeholder="Write your review"
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                />
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
                  {reviewLoading && (
                    <div className="h-10  flex justify-center items-center z-50">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-orange-500"></div>
                    </div>
                  )}
                </div>
              </div>
              <div className="px-5 w-full md:w-2/3  rounded-lg overflow-hidden">
                <h3 className="lg:text-xl text-lg font-semibold text-red-600 mb-2">
                  Customer Reviews
                </h3>
                {!loading && productReviews.length === 0 && (
                  <div className="w-[100%]   ">
                    <div
                      colSpan="6"
                      className="w-full h-full text-xl lg:text-2xl py-10 px-5 font-bold"
                    >
                      No reviews yet
                    </div>
                  </div>
                )}
                {!loading && productReviews.length > 0 && (
                  <ShowReviews reviews={productReviews} />
                )}
              </div>
            </div>
          </div>

          {!loading && relatedProducts.length === 0 && (
            <div className="w-[100%]   ">
              <div
                colSpan="6"
                className="w-full h-full text-xl lg:text-2xl py-10 px-5 font-bold"
              >
                No Related Product available
              </div>
            </div>
          )}
          {!loading && relatedProducts.length > 0 && (
            <div className="mt-12">
              <h3 className="lg:text-2xl text-lg font-semibold mb-4">
                Related Products
              </h3>
              <div className="flex flex-wrap justify-center md:justify-start mt-4  gap-4">
                {relatedProducts.length > 0 ? (
                  relatedProducts.map((product) => (
                    <a key={product._id} href={`/product/${product._id}`}>
                      <ProductCard check={false} product={product} />
                    </a>
                  ))
                ) : (
                  <p className="font-semibold text-center w-full h-40 text-xl ">
                    No Available related products{" "}
                    <span
                      onClick={() => navigate("/categories")}
                      className="border-b-2 cursor-pointer text-orange-500 border-orange-500 hover:text-orange-600 hover:border-orange-600"
                    >
                      See more Categories
                    </span>
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
