import { useParams } from "react-router-dom";
import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const products = [
  {
    id: 1,
    name: "AuraDecor Blue Premium Reed Diffuser Gift Set",
    originalPrice: 599.0,
    salePrice: 399.0,
    images: [
      "../../public/candle2.jpg",
      "../../public/candle3.jpg",
      "../../public/candle3.jpg",
      "../../public/candle3.jpg",
      "../../public/candle3.jpg",
    ],
    description: "AuraDecor Luxury Reed Diffuser & Scented Candle Gift Set: Includes a scented tomb lid jar candle and reed diffuser with oil and sticks, all beautifully packaged for an exquisite presentation.",
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
      { id: 1, user: "John Doe", rating: 5, comment: "Amazing product! The fragrance is wonderful and lasts long." },
      { id: 2, user: "Jane Smith", rating: 4, comment: "Beautiful design and great scent, but the burning time could be longer." }
    ]
  },
  // ... (other products)
];

const ProductDetails = () => {
  const { productId } = useParams();
  const [productQuantity, setProductQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const product = products.find((p) => p.id === parseInt(productId));

  if (!product) {
    return <div>Product not found</div>;
  }

  const increaseQuantity = () => {
    setProductQuantity(productQuantity + 1);
  };

  const decreaseQuantity = () => {
    if (productQuantity > 1) setProductQuantity(productQuantity - 1);
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      (prevIndex + 1) % product.images.length
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      (prevIndex - 1 + product.images.length) % product.images.length
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="lg:flex">
          <div className="lg:w-1/2 p-4">
            <div className="relative">
              <img
                src={product.images[currentImageIndex]}
                alt={product.name}
                className="w-full h-96 object-cover"
              />
              <button 
                onClick={prevImage}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full"
              >
                <FaChevronLeft />
              </button>
              <button 
                onClick={nextImage}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full"
              >
                <FaChevronRight />
              </button>
            </div>
            <div className="flex mt-4 overflow-x-auto">
              {product.images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`${product.name} - Image ${index + 1}`}
                  className={`w-20 h-20 object-cover mx-2 cursor-pointer ${
                    currentImageIndex === index ? "border-2 border-orange-500" : ""
                  }`}
                  onClick={() => setCurrentImageIndex(index)}
                />
              ))}
            </div>
          </div>
          <div className="lg:w-1/2 p-4">
            <h2 className="text-3xl font-semibold mb-4">{product.name}</h2>
            <div className="mb-4">
              <span className="text-2xl font-bold text-orange-500">₹{product.salePrice.toFixed(2)}</span>
              <span className="text-lg text-gray-500 line-through ml-2">₹{product.originalPrice.toFixed(2)}</span>
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
            <div className="flex items-center mb-4">
              <div className="mr-4">Quantity:</div>
              <div className="flex border border-gray-300 rounded">
                <button onClick={decreaseQuantity} className="px-3 py-1 bg-gray-100">-</button>
                <div className="px-3 py-1">{productQuantity}</div>
                <button onClick={increaseQuantity} className="px-3 py-1 bg-gray-100">+</button>
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
            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-2">Specifications:</h3>
              <table className="w-full border-collapse">
                <tbody>
                  {product.specifications.map((spec, index) => (
                    <tr key={index} className="border-b">
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
      <div className="mt-12">
        <h3 className="text-2xl font-semibold mb-4">Customer Reviews</h3>
        {product.reviews.map((review) => (
          <div key={review.id} className="border-t border-gray-300 pt-4 mt-4">
            <div className="flex items-center mb-2">
              <div className="text-lg font-bold text-gray-800 mr-2">{review.user}</div>
              <div className="text-yellow-500">
                {Array(review.rating).fill("★").join("")}
              </div>
            </div>
            <p className="text-gray-700">{review.comment}</p>
          </div>
        ))}
      </div>
      <div className="mt-12">
        <h3 className="text-2xl font-semibold mb-4">Related Products</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {products
            .filter((p) => p.id !== product.id)
            .slice(0, 4)
            .map((relatedProduct) => (
              <div key={relatedProduct.id} className="border p-4 rounded">
                <img
                  src={relatedProduct.images[0]}
                  alt={relatedProduct.name}
                  className="w-full h-48 object-cover mb-2"
                />
                <h4 className="text-sm font-semibold">{relatedProduct.name}</h4>
                <p className="text-sm text-gray-600">
                  ₹{relatedProduct.salePrice.toFixed(2)}
                </p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;


