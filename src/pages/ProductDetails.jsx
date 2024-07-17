
import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/cartSlice";
import { showPopup } from "../store/popupSlice";


const ProductDetails = () => {
  const { productId } = useParams();
  const [productQuantity, setProductQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [allReviews, setAllReviews] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const[product, setProduct] = useState({});
  const[relatedProducts, setRelatedProducts] = useState([]);
  const[loading, setLoading] = useState(true);

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

  const increaseQuantity = () => {
    setProductQuantity(productQuantity + 1);
  };

  const decreaseQuantity = () => {
    if (productQuantity > 1) setProductQuantity(productQuantity - 1);
  };

  const handleAddToCart = () => {
    const obj = {...product, quantity: productQuantity}
    dispatch(addToCart({"product": obj}));
    dispatch(showPopup(obj));
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
            <div className="lg:flex">
              <div className="lg:w-1/2 lg:p-4 p-2">
                <div className="relative px-6 lg:px-2">
                  <img
                    src={product?.images[currentImageIndex]}
                    alt={product.name}
                    className="w-full lg:h-96 h-80 object-cover rounded-xl"
                  />
                </div>
                <div className="flex mt-4 overflow-x-auto">
                  {product.images.map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      alt={`${product.name} - Image ${index + 1}`}
                      className={`lg:w-56 w-40 lg:h-56 h-40 rounded-xl object-cover mx-2 cursor-pointer ${
                        currentImageIndex === index ? "border-2 border-orange-500" : ""
                      }`}
                      onClick={() => setCurrentImageIndex(index)}
                    />
                  ))}
                </div>
              </div>
              <div className="lg:w-1/2 p-4">
                <h2 className="lg:text-3xl text-2xl font-semibold lg:mb-2">{product.name}</h2>
                <div className="text-yellow-500">
                  {"★".repeat(product.ratingsReviews.length > 0 ? product.ratingsReviews.length : 5)}
                </div>        
                <div className="mb-4">
                  <span className="lg:text-2xl text-lg font-bold text-orange-500">₹{product.salePrice.toFixed(2)}</span>
                  <span className="lg:text-lg text-md text-gray-500 line-through ml-2">₹{product.actualPrice.toFixed(2)}</span>
                </div>
                <p className="text-gray-700 mb-4">{product.description}</p>
                <div className="mb-4">
                  <h3 className="lg:text-xl text-lg font-semibold mb-2">Features:</h3>
                  <ul className="list-disc list-inside lg:text-md text-sm text-gray-700">
                    {product.features.map((feature, index) => (
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

                    onClick={() => navigate(`/checkout`, {state: product})}
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
                      {product.specifications.map((spec, index) => (
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
          {product.ratingsReviews.length > 0 && (
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
                            {product?.reviews[0]?.user}
                          </div>
                          <div className="text-yellow-500">
                            {Array(product?.reviews[0]?.rating)
                              .fill("★")
                              .join("")}
                          </div>
                        </div>
                        <p className="text-gray-700 lg:text-md text-sm">
                          {product?.reviews[0]?.comment}
                        </p>
                      </div>
                      <div className="border-t border-gray-300 pt-4 mt-4">
                        <div className="flex items-center mb-2">
                          <div className="lg:text-lg text-md font-bold text-gray-800 mr-2">
                            {product?.reviews[1]?.user}
                          </div>
                          <div className="text-yellow-500">
                            {Array(product?.reviews[1]?.rating)
                              .fill("★")
                              .join("")}
                          </div>
                        </div>
                        <p className="text-gray-700 lg:text-md text-sm">
                          {product?.reviews[1]?.comment}
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
                      {product.reviews.map((review) => (
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
          <div className="mt-12">
        <h3 className="lg:text-2xl text-lg font-semibold mb-4">Related Products</h3>
        <div className="flex flex-wrap justify-center md:justify-start mt-4  gap-4">
         {relatedProducts.map((product) => (
          <div
            key={product._id}
            className="bg-white hover:bg-gray-100 duration-200 lg:px-6 px-4 py-6 shadow-md rounded-lg md:w-80 h-90 w-72 cursor-pointer"
            onClick={() => navigate(`/product/${product.id}`)}
          >
            <img
              src={product.images[0]}
              alt={product.name}
              className="rounded-lg mb-2 w-full md:h-56 h-52"
            />
            <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
            <div className="flex items-center justify-between mb-2">
              <span className="">₹{product.salePrice}</span>
            </div>
          </div>
        ))}

        {relatedProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white hover:bg-gray-100 duration-200 lg:px-6 px-4 py-6 shadow-md rounded-lg md:w-80 h-90 w-72 cursor-pointer"
            onClick={() => navigate(`/product/${product.id}`)}
          >
            <img
              src={product.images[0]}
              alt={product.name}
              className="rounded-lg mb-2 w-full md:h-56 h-52"
            />
            <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
            <div className="flex items-center justify-between mb-2">
              <span className="">₹{product.salePrice}</span>
            </div>
          </div>
        ))}
          
        </div>
      </div>
          </div>
        )
      }
    </div>
  );
};

export default ProductDetails;