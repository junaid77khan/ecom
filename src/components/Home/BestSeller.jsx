import { useNavigate } from "react-router-dom";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { bestSellerProduct } from "../../data/HomeData";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/cartSlice";
import { showPopup } from "../../store/popupSlice";

const BestSeller = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [allReviews, setAllReviews] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const [productQuantity, setProductQuantity] = useState(1);

  const [activeButton, setActiveButton] = useState("");

  const increaseQuantity = () => {
    setProductQuantity(productQuantity + 1);
    setActiveButton("increase");
    setTimeout(() => setActiveButton(""), 200);
  };

  const decreaseQuantity = () => {
    if (productQuantity > 0) {
      setProductQuantity(productQuantity - 1);
      setActiveButton("decrease");
      setTimeout(() => setActiveButton(""), 200);
    }
  };

  const handleAddToCart = () => {
    const obj = { ...bestSellerProduct, quantity: productQuantity };
    dispatch(addToCart({ "product": obj }));
    dispatch(showPopup(obj));
  };
  return (

      <div className=" mx-auto lg:px-24 px-2 py-8 bg-orange-50">
        <div>
        <button className="duration-200 rounded-full md:text-xl mb-3 text-md uppercase bg-orange-500 text-white border border-gray-300 px-4 sm:px-6 py-2">
          Best Seller
        </button>
      </div>
      <div className="bg-white py-7 shadow-md rounded-lg overflow-hidden">
        <div className="lg:flex">
          <div className="lg:w-1/2 lg:p-4 p-2">
            <div className="relative px-6 lg:px-2">
              <img
                src={bestSellerProduct.images[currentImageIndex]}
                alt={bestSellerProduct.name}
                className="w-full lg:h-96 h-80 object-cover rounded-xl"
              />
            </div>
            <div className="flex mt-4 overflow-x-auto no-scrollbar">
              {bestSellerProduct.images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`${bestSellerProduct.name} - Image ${index + 1}`}
                  className={`lg:w-56 w-40 lg:h-56 h-40 rounded-xl object-cover mx-2 cursor-pointer ${
                    currentImageIndex === index ? "border-2 border-orange-500" : ""
                  }`}
                  onClick={() => setCurrentImageIndex(index)}
                />
              ))}
            </div>
          </div>
          <div className="lg:w-1/2 p-4">
            <h2 className="lg:text-3xl text-2xl font-semibold lg:mb-4">{bestSellerProduct.name}</h2>
            <div className="text-yellow-500">
              {"★".repeat(bestSellerProduct.rating)}
            </div>        
            <div className="mb-4">
              <span className="lg:text-2xl text-lg font-bold text-orange-500">₹{bestSellerProduct.salePrice.toFixed(2)}</span>
              <span className="lg:text-lg text-md text-gray-500 line-through ml-2">₹{bestSellerProduct.originalPrice.toFixed(2)}</span>
            </div>
            <p className="text-gray-700 mb-4">{bestSellerProduct.description}</p>
            <div className="mb-4">
              <h3 className="lg:text-xl text-lg font-semibold mb-2">Features:</h3>
              <ul className="list-disc list-inside lg:text-md text-sm text-gray-700">
                {bestSellerProduct.features.map((feature, index) => (
                  <li className="mt-2" key={index}>{feature}</li>
                ))}
              </ul>
            </div>
            <div className="flex items-center mb-4">
              <div className="mr-4 font-bold">Quantity:</div>
              <div className="flex border border-gray-300 rounded text-md">
                <button onClick={decreaseQuantity} className="px-3 py-1 bg-gray-100">-</button>
                <div className="px-3 py-1">{productQuantity}</div>
                <button onClick={increaseQuantity} className="px-3 py-1 bg-gray-100">+</button>
              </div>
            </div>
            <div className="flex mb-4 gap-2">

              <button
                onClick={handleAddToCart}
                className="relative rounded-lg border-2 inline-flex items-center justify-start md:px-6 lg:px-5 px-4 py-2 overflow-hidden font-medium transition-all bg-orange-500 hover:bg-orange-500 hover:border-orange-500 group"
              >
                <span className="w-40 h-40 rounded rotate-[-40deg] bg-white absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-6 ml-6 group-hover:ml-0 group-hover:mb-24 group-hover:translate-x-0"></span>
                <span className="relative w-full text-center lg:text-md text-sm text-white transition-colors duration-300 ease-in-out group-hover:text-orange-500">
                  Add to cart
                </span>
              </button>
              <button

                onClick={() => navigate(`/checkout`, {state: bestSellerProduct})}
                className="relative rounded-lg border-2 border-orange-500 inline-flex items-center justify-start md:px-6 lg:px-5 px-4 py-2 overflow-hidden font-medium transition-all bg-white hover:bg-white hover:border-white group"
              >
                <span className="w-40 h-40 rounded rotate-[-40deg] bg-orange-500 absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-6 ml-6 group-hover:ml-0 group-hover:mb-24 group-hover:translate-x-0"></span>
                <span className="relative w-full text-center lg:text-md text-sm text-orange-500 transition-colors duration-300 ease-in-out group-hover:text-white">
                  Buy now
                </span>
              </button>
            </div>
            <div className="mt-6">
              <h3 className="lg:text-xl text-lg font-semibold mb-2">Specifications:</h3>
              <table className="w-full border-collapse">
                <tbody>
                  {bestSellerProduct.specifications.map((spec, index) => (
                    <tr key={index} className="border-b lg:text-md text-sm">
                      <td className="py-2 font-semibold">{spec.name}:</td>
                      <td className="py-2">{spec.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="mt-12 ">
      {bestSellerProduct.reviews.length > 0 && (
            <div className="px-5">
              <div>
                <div className="">
                  <h3 className="lg:text-xl text-lg font-semibold text-red-600 mb-2">
                    Customer Reviews:
                  </h3>
                </div>
              </div>
              {!allReviews && (
                <div className="ease-linear duration-200">
                  <div className="border-t border-gray-300 pt-4 mt-4">
                    <div className="flex items-center mb-2">
                      <div className="lg:text-lg text-md font-bold text-gray-800 mr-2">
                        {bestSellerProduct?.reviews[0]?.user}
                      </div>
                      <div className="text-yellow-500">
                        {Array(bestSellerProduct?.reviews[0]?.rating)
                          .fill("★")
                          .join("")}
                      </div>
                    </div>
                    <p className="text-gray-700 lg:text-md text-sm">
                      {bestSellerProduct?.reviews[0]?.comment}
                    </p>
                  </div>
                  <div className="border-t border-gray-300 pt-4 mt-4">
                    <div className="flex items-center mb-2">
                      <div className="lg:text-lg text-md font-bold text-gray-800 mr-2">
                        {bestSellerProduct?.reviews[1]?.user}
                      </div>
                      <div className="text-yellow-500">
                        {Array(bestSellerProduct?.reviews[1]?.rating)
                          .fill("★")
                          .join("")}
                      </div>
                    </div>
                    <p className="text-gray-700 lg:text-md text-sm">
                      {bestSellerProduct?.reviews[1]?.comment}
                    </p>
                  </div>
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
                  {bestSellerProduct.reviews.map((review) => (
                    <div
                      key={review.id}
                      className="border-t border-gray-300 pt-4 mt-4"
                    >
                      <div className="flex items-center mb-2">
                        <div className="lg:text-lg text-md font-bold text-gray-800 mr-2">
                          {review.user}
                        </div>
                        <div className="text-yellow-500">
                          {Array(review.rating).fill("★").join("")}
                        </div>
                      </div>
                      <p className="text-gray-700 lg:text-md text-sm">{review.comment}</p>
                    </div>
                  ))}
                  <button
                    onClick={() => setAllReviews(false)}
                    className="flex justify-center items-center w-full "
                  >
                    <FaChevronUp className="lg:text-2xl text-md" />
                  </button>
                </div>
              )}
            </div>
          )}
      </div>
      </div>
    </div>
  );
};

export default BestSeller;
