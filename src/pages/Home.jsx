import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useRef, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/cartSlice";
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import {
  FaChevronLeft,
  FaChevronRight,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import { InfiniteMovingCards } from "../components/ui/infinite-moving-cards";
import {
  bestSellerProduct,
  productCategories,
  // mostPopularProducts,
  // newProducts,
  testimonials,
} from "../data/HomeData";
import { motion } from "framer-motion";

import { ImagesSlider } from "../components/ui/images-slider";
// import { showPopup } from "../store/popupSlice";

const images = [
  '/banner1.jpg',
  '/banner2.jpg',
  '/banner3.jpg'
];

function Home() {
  const navigate = useNavigate();
  const scrollRef = useRef(null);
  const dispatch = useDispatch();

  const [isMostPopularActive, setIsMostPopularActive] = useState(true);

  const [bestSellerAllReviews, setBestSellerAllReviews] = useState(false);

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
    const obj = {...bestSellerProduct, quantity: productQuantity}
    dispatch(addToCart({"product": obj}));
    // toast.success('Added to cart', {
    //   position: "top-right",
    //   autoClose: 3000,  
    //   hideProgressBar: false,
    //   closeOnClick: true,
    //   pauseOnHover: true,
    //   draggable: true,
    //   progress: undefined,
    // });
  };

  // const handleAddToCart = (product) => {
  //   const { id, category, name, description, images, salePrice, rating, availability } = product;
  //   const obj = { id, category, name, description, images, salePrice, rating, availability, quantity: 1 };
  //   dispatch(addToCart({ product: obj }));
  //   dispatch(showPopup(obj));
  // };

  useEffect(() => {
    setScrollIndex(0);
  }, [isMostPopularActive]);

  const [scrollIndex, setScrollIndex] = useState(0);

  const scrollBy = (direction) => {
    const productWidth = scrollRef.current.firstChild.clientWidth;
    const maxScrollIndex =
      Math.floor(scrollRef.current.scrollWidth / productWidth) - 1;

    if (direction === "left") {
      setScrollIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    } else {
      setScrollIndex((prevIndex) => Math.min(prevIndex + 1, maxScrollIndex));
    }
  };

  const scrollToIndex = () => {
    const productWidth = scrollRef.current.firstChild.clientWidth + 20;
    scrollRef.current.scrollTo({
      left: productWidth * scrollIndex,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    scrollToIndex();
  }, [scrollIndex]);

  return (
    <div className="w-full h-full text-black ">
      <div className=" relative">
        <ImagesSlider className="h-[40rem]" images={images}>
          <motion.div
            initial={{
              opacity: 0,
              y: -80,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.6,
            }}
            className="z-50 flex flex-col justify-center items-center"
          >
            <motion.p className="font-bold text-xl md:text-7xl text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 py-4">
              The art of home fragrance <br />{" "}
              <span className="text-4xl">
                Discover a sensory experience with our unique decors
              </span>
            </motion.p>

            <button
              onClick={() => navigate("/categories")}
              className="relative rounded-full border-2 border-orange-500 inline-flex items-center justify-start px-12 py-4 overflow-hidden font-medium transition-all bg-white hover:bg-white group"
            >
              <span className="w-36 h-36 border-6 border-orange-700 rounded rotate-[-40deg] bg-orange-600 absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-6 ml-6 group-hover:ml-0 group-hover:mb-24 group-hover:translate-x-0"></span>
              <span className="relative w-full text-center text-xl text-orange-500 transition-colors duration-300 ease-in-out group-hover:text-white">
                Shop
              </span>
            </button>
          </motion.div>
        </ImagesSlider>
      </div>

      <div className="h-full py-10 px-24 w-full bg-gradient-to-b from-orange-100 to-orange-50">
        <h1 className="text-6xl text-black font-semibold">Our Categories</h1>

        <div className="w-full flex justify-end items-center mt-10">
          {productCategories.length > 0  && <button
            onClick={() => navigate("/categories")}
            className={`border hover:bg-gray-200 transition-200 border-gray-200 bg-white px-8 py-3 `}
          >
            View All
          </button>}
        </div>
        <div className="flex flex-wrap justify-center items-center gap-10 py-10  mt-5">
          {productCategories.length === 0 && <div className="text-2xl">No Categories Available</div>}
          {productCategories.length > 0 &&
            productCategories.map((category) => (
              <a
                key={category.id}
                href={`/categories/${encodeURIComponent(
                  category.categoryName
                )}`}
                className="flex flex-col justify-start items-start gap-3 w-72 h-96 px-4 py-6 bg-white overflow-hidden hover:bg-gray-200 duration-200 rounded-lg"
              >
                <div className="w-full h-3/4 overflow-hidden">
                  <img
                    className="bg-cover h-full w-full bg-center rounded-lg hover:scale-105 transition-transform duration-300 transform-gpu"
                    src={category.image}
                    alt={category.categoryName}
                  />
                </div>
                <h1 className="text-xl">
                  {category.categoryName}{" "}
                  <FontAwesomeIcon
                    onClick={() => navigate("/collections")}
                    className="cursor-pointer"
                    icon={faArrowRight}
                  />{" "}
                </h1>
                <div>
                  <p className="text-gray-500 hover:text-black">
                    {category.description.substring(0, 40)}...
                  </p>
                </div>
              </a>
            ))}
        </div>
      </div>

      <div className="h-full py-5 px-24 bg-orange-50">
        <h1 className="text-4xl mb-4">Featured Candles</h1>
        <h1 className="text-xl text-gray-500">
          Our universally agreed, most loved products.
        </h1>
        <div className="flex flex-wrap justify-between items-center mt-8">
          <div className="flex flex-wrap justify-center items-center gap-6">
            <button
              onClick={() => setIsMostPopularActive(true)}
              className={`duration-200 rounded-full text-xl uppercase ${
                !isMostPopularActive
                  ? "bg-gray-200 text-gray-800"
                  : "bg-orange-500 text-white"
              } border border-gray-300 px-6 py-2`}
            >
              Most Popular
            </button>
            <button
              onClick={() => setIsMostPopularActive(false)}
              className={`duration-200 rounded-full text-xl uppercase ${
                isMostPopularActive
                  ? "bg-gray-200 text-gray-800"
                  : "bg-orange-500 text-white"
              } border border-gray-300 px-6 py-2`}
            >
              New Items
            </button>
          </div>
        </div>
        <div className="relative overflow-x-hidden">
          <button
            onClick={() => scrollBy("left")}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md z-10"
          >
            <FaChevronLeft />
          </button>
          <div
            ref={scrollRef}
            className="flex gap-4 py-5 px-3"
            style={{ overflow: "hidden" }}
          >
            {isMostPopularActive &&
              Array(16)
                .fill()
                .map((_, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0 sm:w-48 md:w-56 lg:w-80 px-5 py-5 bg-white rounded-lg shadow-lg hover:bg-gray-100 transition duration-300 "
                  >
                    <div className="relative overflow-hidden">
                      <img
                        className="w-full h-64 object-cover absolute inset-0 rounded-t-lg translate-y-0 hover:translate-y-[-100%] transition-transform duration-500"
                        src="/candle4.jpg"
                        alt="Product"
                      />
                      <img
                        className="w-full h-64 object-cover rounded-t-lg"
                        src="/candle2.jpg"
                        alt="Product"
                      />
                    </div>

                    <div className="p-3 text-center">
                      <h1 className="text-gray-500 text-sm">AURA DECOR</h1>
                      <h1 className="text-md font-semibold">
                        AuraDecor Blue Premium Reed Diffuser Gift Set || Aroma
                        Diffuser
                      </h1>
                    </div>
                  </div>
                ))}

            {!isMostPopularActive &&
              Array(16)
                .fill()
                .map((_, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0 sm:w-48 md:w-56 lg:w-80 px-5 py-5 bg-white rounded-lg shadow-lg hover:bg-gray-100 transition duration-300"
                  >
                    <div className="relative overflow-hidden">
                      <img
                        className="w-full h-64 object-cover absolute inset-0 rounded-t-lg translate-y-0 hover:translate-y-[-100%] transition-transform duration-500"
                        src="/candle8.jpg"
                        alt="Product"
                      />
                      <img
                        className="w-full h-64 object-cover rounded-t-lg"
                        src="/candle1.jpg"
                        alt="Product"
                      />
                    </div>
                    <div className="p-3 text-center">
                      <h1 className="text-gray-500 text-sm">
                        TEA LIGHT CANDLES
                      </h1>
                      <h1 className="text-md font-semibold">
                        AuraDecor Blue Premium Reed Diffuser Gift Set || Aroma
                        Diffuser
                      </h1>
                    </div>
                  </div>
                ))}
          </div>
          <button
            onClick={() => scrollBy("right")}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md z-10"
          >
            <FaChevronRight />
          </button>
        </div>
      </div>

      <div className="h-full w-full py-10 px-24 bg-orange-50">
        <div>
          <button
            className={`duration-200 rounded-full text-xl uppercase bg-orange-500 text-white  border border-gray-300 px-6 py-2`}
          >
            Best Seller
          </button>
        </div>

        <div className=" shadow-md rounded-lg overflow-hidden bg-white mt-5 py-6">
          <div className="lg:flex px-5">
            <div className="lg:w-1/2  flex flex-col justify-start items-center gap-2">
              <img
                src={bestSellerProduct.images[0]}
                alt={bestSellerProduct.name}
                className="w-full rounded-xl  h-96 object-cover bg-center transform transition-transform duration-300"
              />

              <div className="relative overflow-x-hidden">
                <div
                  className="flex gap-5 py-5 px-3"
                  style={{ overflow: "hidden" }}
                >
                  <img
                    src={bestSellerProduct.images[1]}
                    alt={bestSellerProduct.name}
                    className=" h-72 w-72  object-cover transform transition-transform duration-300 rounded-xl"
                  />
                  <img
                    src={bestSellerProduct.images[2]}
                    alt={bestSellerProduct.name}
                    className="w-72 h-72 object-cover transform transition-transform duration-300 rounded-xl"
                  />
                  <img
                    src={bestSellerProduct.images[3]}
                    alt={bestSellerProduct.name}
                    className="w-72 h-72 object-cover transform transition-transform duration-300 rounded-xl"
                  />
                </div>
              </div>
            </div>

            <div className="lg:w-1/2 p-4">
              <h2 className="text-3xl font-semibold mb-4">
                {bestSellerProduct.name}
              </h2>
              {/* ... (existing price display) */}
              <p className="text-gray-700 mb-4">
                {bestSellerProduct.description}
              </p>
              <div className="mb-4">
                <h3 className="text-xl font-semibold mb-2">Features:</h3>
                <ul className="list-disc list-inside text-gray-700">
                  {bestSellerProduct.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center mb-4">
                <div className="mr-4">Quantity:</div>
                <div className="flex border border-gray-300 rounded">
                  <button onClick={decreaseQuantity} className="px-3 py-1 bg-gray-100">-</button>
                  <div className="px-3 py-1">{productQuantity}</div>
                  <button onClick={increaseQuantity} className="px-3 py-1 bg-gray-100">+</button>
                </div>
              </div>
              <div className="flex mb-4 gap-2">

              <button
                onClick={handleAddToCart}
                className="relative rounded-lg border-2 inline-flex items-center justify-start px-6 py-2 overflow-hidden font-medium transition-all bg-orange-500 hover:bg-orange-500 hover:border-orange-500 group"
              >
                <span className="w-40 h-40 rounded rotate-[-40deg] bg-white absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-6 ml-6 group-hover:ml-0 group-hover:mb-24 group-hover:translate-x-0"></span>
                <span className="relative w-full text-center text-md text-white transition-colors duration-300 ease-in-out group-hover:text-orange-500">
                  Add to cart
                </span>
              </button>
              <button
                onClick={() => navigate(`/product/${bestSellerProduct.id}/checkout`, {state: bestSellerProduct})}
                className="relative rounded-lg border-2 border-orange-500 inline-flex items-center justify-start px-6 py-2 overflow-hidden font-medium transition-all bg-white hover:bg-white hover:border-white group"
              >
                <span className="w-40 h-40 rounded rotate-[-40deg] bg-orange-500 absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-6 ml-6 group-hover:ml-0 group-hover:mb-24 group-hover:translate-x-0"></span>
                <span className="relative w-full text-center text-md text-orange-500 transition-colors duration-300 ease-in-out group-hover:text-white">
                  Buy now
                </span>
              </button>
            </div>
              {/* ... (existing quantity selector and buttons) */}
              <div className="mt-6">
                <h3 className="text-xl font-semibold mb-2">Specifications:</h3>
                <table className="w-full border-collapse">
                  <tbody>
                    <tr className="border-b">
                      <td className="py-2 font-semibold">Capacity:</td>
                      <td className="py-2">500 ml</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 font-semibold">Power:</td>
                      <td className="py-2">24W</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 font-semibold">Weight:</td>
                      <td className="py-2">1.2 kg</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          {bestSellerProduct.reviews.length > 0 && (
            <div className="px-5">
              <div>
                <div className="">
                  <h3 className="text-xl font-semibold text-red-600 mb-2">
                    Customer Reviews:
                  </h3>
                </div>
              </div>
              {!bestSellerAllReviews && (
                <div className="ease-linear duration-200">
                  <div className="border-t border-gray-300 pt-4 mt-4">
                    <div className="flex items-center mb-2">
                      <div className="text-lg font-bold text-gray-800 mr-2">
                        {bestSellerProduct?.reviews[0]?.user}
                      </div>
                      <div className="text-yellow-500">
                        {Array(bestSellerProduct?.reviews[0]?.rating)
                          .fill("★")
                          .join("")}
                      </div>
                    </div>
                    <p className="text-gray-700">
                      {bestSellerProduct?.reviews[0]?.comment}
                    </p>
                  </div>
                  <div className="border-t border-gray-300 pt-4 mt-4">
                    <div className="flex items-center mb-2">
                      <div className="text-lg font-bold text-gray-800 mr-2">
                        {bestSellerProduct?.reviews[1]?.user}
                      </div>
                      <div className="text-yellow-500">
                        {Array(bestSellerProduct?.reviews[1]?.rating)
                          .fill("★")
                          .join("")}
                      </div>
                    </div>
                    <p className="text-gray-700">
                      {bestSellerProduct?.reviews[1]?.comment}
                    </p>
                  </div>
                  <button
                    onClick={() => setBestSellerAllReviews(true)}
                    className="flex justify-center items-center w-full "
                  >
                    <FaChevronDown className="text-2xl" />
                  </button>
                </div>
              )}
              {bestSellerAllReviews && (
                <div className="ease-out duration-300">
                  {bestSellerProduct.reviews.map((review) => (
                    <div
                      key={review.id}
                      className="border-t border-gray-300 pt-4 mt-4"
                    >
                      <div className="flex items-center mb-2">
                        <div className="text-lg font-bold text-gray-800 mr-2">
                          {review.user}
                        </div>
                        <div className="text-yellow-500">
                          {Array(review.rating).fill("★").join("")}
                        </div>
                      </div>
                      <p className="text-gray-700">{review.comment}</p>
                    </div>
                  ))}
                  <button
                    onClick={() => setBestSellerAllReviews(false)}
                    className="flex justify-center items-center w-full "
                  >
                    <FaChevronUp className="text-2xl" />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="h-full py-5 px-24 bg-orange-50">
        <h1 className="text-5xl font-medium text-center">Why to choose us?</h1>
        <div className="h-[30rem] rounded-md flex flex-col antialiased   items-center justify-center relative overflow-hidden">
          <InfiniteMovingCards
            items={testimonials}
            direction="right"
            speed="slow"
          />
        </div>
      </div>

      <div className="h-full  flex items-center justify-center py-6 bg-orange-50">
        <div className=" px-60 py-8  bg-white w-full text-center">
          <h1 className="text-3xl font-bold mb-4">Let&apos;s Stay In Touch</h1>
          <p className="text-gray-600 mb-8">
            Enjoy 10% off on your first purchase and be the first to know about
            offers, new releases, and latest stories.
          </p>
          <form className="pb-16">
            <input
              type="email"
              className="w-full px-4 py-3 text-center rounded-md bg-gray-200 focus:outline-none focus:bg-white focus:border-gray-300 mb-2"
              placeholder="Enter your email address"
            />
            <button
              type="submit"
              className="w-full bg-orange-500 text-white py-3 rounded-md hover:bg-orange-600 transition duration-300"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Home;
