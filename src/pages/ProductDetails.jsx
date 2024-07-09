import { useParams } from "react-router-dom";
import { useState } from "react";

const products = [
  {
    id: 1,
    name: "AuraDecor Fragrance Rose Heart Shape Tealight (Pack of 10)",
    originalPrice: 199.0,
    salePrice: 99.0,
    image: "/candle4.jpg",
    description:
      "Inhaling rose fragrance has therapeutic aroma benefits that help fight depression, overcome anxiety, reduce stress and insomnia.",
    features: [
      "Set of 10 Tealight Candles",
      "Rose Fragrance",
      "Heart Shape",
      "Perfect for Decoration and Gifting",
      "Burn Time: Up to 4 hours each",
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
    ],
  },
  {
    id: 2,
    name: "Product 2",
    originalPrice: 799.0,
    salePrice: 699.0,
    image: "/candle6.jpg",
    description:
      "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    features: ["Feature 1", "Feature 2"],
    reviews: [
      { id: 1, user: "John Doe", rating: 5, comment: "Great product!" },
      {
        id: 2,
        user: "Jane Smith",
        rating: 4,
        comment: "Good value for money.",
      },
    ],
  },
  {
    id: 3,
    name: "Product 3",
    originalPrice: 999.0,
    salePrice: 899.0,
    image: "/candle7.jpg",
    description:
      "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    features: ["Feature 1", "Feature 2"],
    reviews: [
      { id: 1, user: "John Doe", rating: 5, comment: "Fantastic!" },
      { id: 2, user: "Jane Smith", rating: 4, comment: "Very nice." },
    ],
  },
  {
    id: 4,
    name: "Product 4",
    originalPrice: 299.0,
    salePrice: 229.0,
    image: "/candle8.jpg",
    description:
      "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    features: ["Feature 1", "Feature 2"],
    reviews: [
      { id: 1, user: "John Doe", rating: 5, comment: "Excellent!" },
      { id: 2, user: "Jane Smith", rating: 4, comment: "Quite good." },
    ],
  },
];

const ProductDetails = () => {
  const { productId } = useParams();
  const [productQuantity, setProductQuantity] = useState(1);
  // const navigate = useNavigate();

  const product = products.find((p) => p.id === parseInt(productId));

  if (!product) {
    return <div>Product not found</div>;
  }

  const increaseQuantity = () => {
    setProductQuantity(productQuantity + 1);
  };

  const decreaseQuantity = () => {
    if (productQuantity > 0) setProductQuantity(productQuantity - 1);
  };

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="lg:flex">
          <div className="lg:w-1/2 p-4">
            <img
              src={product.image}
              alt={product.name}
              className="w-[80%]  h-80 object-cover transform transition-transform duration-300 hover:scale-105"
            />
          </div>
          <div className="lg:w-1/2 p-4">
            <h2 className="text-3xl font-semibold mb-4">{product.name}</h2>
            <div className="flex items-center mb-4">
              <span className="text-gray-500 line-through mr-2">
                Rs. {product.originalPrice.toFixed(2)}
              </span>
              <span className="text-2xl text-red-600 font-bold">
                Rs. {product.salePrice.toFixed(2)}
              </span>
              <span className="text-white bg-red-600 rounded-full px-3 py-1 ml-2">
                Sale
              </span>
            </div>
            <p className="text-gray-700 mb-4">{product.description}</p>
            <div className="mb-4">
              <h3 className="text-xl font-semibold mb-2">Features:</h3>
              <ul className="list-disc list-inside text-gray-700">
                {product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
            <div className="flex justify-between items-center gap-3  border border-black w-36 mb-4">
              <div
                onClick={decreaseQuantity}
                className="border-r border-black text-center  px-4 py-2"
              >
                -
              </div>
              <div className="py-2 px-2">{productQuantity}</div>
              <div
                onClick={increaseQuantity}
                className="border-l border-black text-center px-4 py-2"
              >
                +
              </div>
            </div>
            <div className="flex mb-4">
              <button className="bg-orange-500 text-white px-6 py-2 rounded mr-2 hover:bg-orange-600">
                Add to Cart
              </button>
              <button className="bg-gray-800 text-white px-6 py-2 rounded hover:bg-gray-900">
                Buy Now
              </button>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-red-600 mb-2">
                Customer Reviews:
              </h3>
              {product.reviews.map((review) => (
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
