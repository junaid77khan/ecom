
import { useParams, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/cartSlice";
// import { showPopup } from "../store/popupSlice";
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

const products = [
  {
    id: 1,
    category: "Scented Candles",
    name: "AuraDecor Blue Premium Reed Diffuser Gift Set",
    originalPrice: 599.0,
    salePrice: 399.0,
    images: [
      "/candle2.jpg",
      "/candle3.jpg",
      "/candle3.jpg",
      "/candle3.jpg",
      "/candle3.jpg",
    ],
    description: "AuraDecor Luxury Reed Diffuser & Scented Candle Gift Set: Includes a scented tomb lid jar candle and reed diffuser with oil and sticks, all beautifully packaged for an exquisite presentation.",
    rating: 4.2,
    availability: true,
    features: [
      "Aromatherapy Benefits: Enjoy the calming effects of blue sage and lavender, promoting a sense of well-being and tranquility in your living space.",
      "Long-lasting Fragrance: The jar candle burns for up to 50 hours, while the reed diffuser oil provides a continuous, soothing aroma of blue sage and lavender.",
      "High-Quality Packaging: The premium gift box presentation ensures this set is ready to impress, making it an excellent choice for gifting or personal use.",
      "Perfect Gift for Loved Ones: This luxurious gift set is ideal for birthdays, anniversaries, or any special occasion, offering a touch of elegance and relaxation."
    ],
    specifications: [
      { name: "Candle Burn Time", value: "Up to 50 hours" },
      { name: "Fragrance", value: "Blue Sage and Lavender" },
      { name: "Packaging", value: "Premium Gift Box" },
      { name: "Diffuser Volume", value: "100ml" }
    ],
    reviews: [
      {
        id: 1,
        user: "John Doe",
        rating: 5,
        comment: "Amazing product! The fragrance is wonderful and lasts long.",
      },
      {
        id: 2,
        user: "Jane Smith",
        rating: 4,
        comment:
          "Beautiful design and great scent, but the burning time could be longer.",
      },
      {
        id: 3,
        user: "Jane Smith",
        rating: 4,
        comment:
          "Beautiful design and great scent, but the burning time could be longer.",
      },
      {
        id: 4,
        user: "Jane Smith",
        rating: 4,
        comment:
          "Beautiful design and great scent, but the burning time could be longer.",
      },
    ]
  },
  {
    id: 2,
    category: "Scented Candles",
    name: "Lavender Dream Candle",
    originalPrice: 499.0,
    salePrice: 349.0,
    images: ["/candle4.jpg", "/candle5.jpg", "/candle6.jpg"],
    description: "Experience the soothing aroma of lavender with our Lavender Dream Candle.",
    rating: 4.5,
    availability: true,
    features: [
      "100% natural soy wax",
      "Cotton wick for clean burning",
      "30-hour burn time",
      "Handcrafted in small batches"
    ],
    specifications: [
      { name: "Burn Time", value: "30 hours" },
      { name: "Fragrance", value: "Lavender" },
      { name: "Weight", value: "8 oz" }
    ],
    reviews: [
      {
        id: 1,
        user: "John Doe",
        rating: 5,
        comment: "Amazing product! The fragrance is wonderful and lasts long.",
      },
      {
        id: 2,
        user: "Jane Smith",
        rating: 4,
        comment:
          "Beautiful design and great scent, but the burning time could be longer.",
      },
      {
        id: 3,
        user: "Jane Smith",
        rating: 4,
        comment:
          "Beautiful design and great scent, but the burning time could be longer.",
      },
      {
        id: 4,
        user: "Jane Smith",
        rating: 4,
        comment:
          "Beautiful design and great scent, but the burning time could be longer.",
      },
    ]
  },
  {
    id: 3,
    category: "Reed Diffusers",
    name: "Citrus Burst Reed Diffuser",
    originalPrice: 699.0,
    salePrice: 549.0,
    images: ["/candle5.jpg"],
    rating: 4.5,
    availability: false,
    description: "Fill your home with the refreshing scent of citrus with our Citrus Burst Reed Diffuser.",
    features: [
      "Long-lasting fragrance for up to 3 months",
      "Natural rattan reeds",
      "Pet-friendly and eco-friendly formula",
      "Elegant glass bottle design"
    ],
    specifications: [
      { name: "Volume", value: "200ml" },
      { name: "Fragrance", value: "Citrus Blend" },
      { name: "Duration", value: "Up to 3 months" }
    ],
    reviews: [
      {
        id: 1,
        user: "John Doe",
        rating: 5,
        comment: "Amazing product! The fragrance is wonderful and lasts long.",
      },
      {
        id: 2,
        user: "Jane Smith",
        rating: 4,
        comment:
          "Beautiful design and great scent, but the burning time could be longer.",
      },
      {
        id: 3,
        user: "Jane Smith",
        rating: 4,
        comment:
          "Beautiful design and great scent, but the burning time could be longer.",
      },
      {
        id: 4,
        user: "Jane Smith",
        rating: 4,
        comment:
          "Beautiful design and great scent, but the burning time could be longer.",
      },
    ]
  },
  {
    id: 4,
    category: "Reed Diffusers",
    name: "Citrus Burst",
    originalPrice: 699.0,
    salePrice: 549.0,
    images: ["/candle5.jpg"],
    rating: 4.5,
    availability: false,
    description: "Fill your home with the refreshing scent of citrus with our Citrus Burst Reed Diffuser.",
    features: [
      "Long-lasting fragrance for up to 3 months",
      "Natural rattan reeds",
      "Pet-friendly and eco-friendly formula",
      "Elegant glass bottle design"
    ],
    specifications: [
      { name: "Volume", value: "200ml" },
      { name: "Fragrance", value: "Citrus Blend" },
      { name: "Duration", value: "Up to 3 months" }
    ],
    reviews: [
      {
        id: 1,
        user: "John Doe",
        rating: 5,
        comment: "Amazing product! The fragrance is wonderful and lasts long.",
      },
      {
        id: 2,
        user: "Jane Smith",
        rating: 4,
        comment:
          "Beautiful design and great scent, but the burning time could be longer.",
      },
      {
        id: 3,
        user: "Jane Smith",
        rating: 4,
        comment:
          "Beautiful design and great scent, but the burning time could be longer.",
      },
      {
        id: 4,
        user: "Jane Smith",
        rating: 4,
        comment:
          "Beautiful design and great scent, but the burning time could be longer.",
      },
    ]
  },
  {
    id: 5,
    category: "Scented Candles",
    name: "Lavender Dream Candle Stand",
    originalPrice: 499.0,
    salePrice: 349.0,
    images: ["/candle6.jpg", "/candle7.jpg", "/candle5.jpg"],
    description: "Experience the soothing aroma of lavender with our Lavender Dream Candle.",
    rating: 4.5,
    availability: true,
    features: [
      "100% natural soy wax",
      "Cotton wick for clean burning",
      "30-hour burn time",
      "Handcrafted in small batches"
    ],
    specifications: [
      { name: "Burn Time", value: "30 hours" },
      { name: "Fragrance", value: "Lavender" },
      { name: "Weight", value: "8 oz" }
    ],
    reviews: [
      {
        id: 1,
        user: "John Doe",
        rating: 5,
        comment: "Amazing product! The fragrance is wonderful and lasts long.",
      },
      {
        id: 2,
        user: "Jane Smith",
        rating: 4,
        comment:
          "Beautiful design and great scent, but the burning time could be longer.",
      },
      {
        id: 3,
        user: "Jane Smith",
        rating: 4,
        comment:
          "Beautiful design and great scent, but the burning time could be longer.",
      },
      {
        id: 4,
        user: "Jane Smith",
        rating: 4,
        comment:
          "Beautiful design and great scent, but the burning time could be longer.",
      },
    ]
  },
];

const ProductDetails = () => {
  const { productId } = useParams();
  const [productQuantity, setProductQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [allReviews, setAllReviews] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const product = products.find((p) => p.id === parseInt(productId));

  if (!product) {
    return <div>Product not found</div>;
  }

  const relatedProducts = products.filter(p => p.category === product.category && p.id !== product.id);

  const increaseQuantity = () => {
    setProductQuantity(productQuantity + 1);
  };

  const decreaseQuantity = () => {
    if (productQuantity > 1) setProductQuantity(productQuantity - 1);
  };

  const handleAddToCart = () => {
    const obj = {...product, quantity: productQuantity}
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
  //   const obj = { ...product, quantity: 1 };
  //   dispatch(addToCart({ product: obj }));
  //   dispatch(showPopup(obj));
  // };
  return (
    <div className=" mx-auto lg:px-4 px-2 py-8 bg-orange-50">
      <div className="bg-white py-7 shadow-md rounded-lg overflow-hidden">
        <div className="lg:flex">
          <div className="lg:w-1/2 lg:p-4 p-2">
            <div className="relative px-6 lg:px-2">
              <img
                src={product.images[currentImageIndex]}
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
            <h2 className="lg:text-3xl text-2xl font-semibold lg:mb-4">{product.name}</h2>
            <div className="text-yellow-500">
              {"★".repeat(product.rating)}
            </div>        
            <div className="mb-4">
              <span className="lg:text-2xl text-lg font-bold text-orange-500">₹{product.salePrice.toFixed(2)}</span>
              <span className="lg:text-lg text-md text-gray-500 line-through ml-2">₹{product.originalPrice.toFixed(2)}</span>
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

                onClick={() => navigate(`/product/${productId}/payment`, {state: product})}
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
      </div>
      <div className="mt-12 ">
      {product.reviews.length > 0 && (
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
      <div className="mt-12">
        <h3 className="lg:text-2xl text-lg font-semibold mb-4">Related Products</h3>
        <div className="flex flex-wrap mt-4  gap-4">
          {relatedProducts.slice(0, 4).map((relatedProduct) => (
            <Link to={`/product/${relatedProduct.id}`} key={relatedProduct.id} className="lg:w-64 w-64 lg:h-72 h-72 py-4 px-2 flex flex-col items-center bg-white  rounded-sm object-cover cursor-pointer">
              <img
                src={relatedProduct.images[0]}
                alt={relatedProduct.name}
                className="h-3/4 w-11/12 rounded-sm"
              />
              <div className=" w-full mt-2 px-2">
                <h4 className="text-sm font-semibold">{relatedProduct.name}</h4>
                <p className="text-sm text-gray-600">
                  ₹{relatedProduct.salePrice.toFixed(2)}
                </p>
              </div>
            </Link>
          ))}

          {relatedProducts.slice(0, 4).map((relatedProduct) => (
            <Link to={`/product/${relatedProduct.id}`} key={relatedProduct.id} className="lg:w-64 w-64 lg:h-72 h-72 py-4 px-2 flex flex-col items-center bg-white  rounded-sm object-cover cursor-pointer">
              <img
                src={relatedProduct.images[0]}
                alt={relatedProduct.name}
                className="h-3/4 w-11/12 rounded-sm"
              />
              <div className=" w-full mt-2 px-2">
                <h4 className="text-sm font-semibold">{relatedProduct.name}</h4>
                <p className="text-sm text-gray-600">
                  ₹{relatedProduct.salePrice.toFixed(2)}
                </p>
              </div>
            </Link>
          ))}
          
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;