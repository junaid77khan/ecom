import { ProductStarRating } from "./ProductCard";
import { addToCart } from "../store/cartSlice";
import { showPopup } from "../store/popupSlice";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProductInformation = (props) => {
    const {product} = props
    const [productQuantity, setProductQuantity] = useState(1);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const navigate = useNavigate();
    const dispatch = useDispatch();

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
      }
    return (
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
          <ProductStarRating rating={typeof product?.avgRating === 'undefined' ? 5 : product.avgRating} />        
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
    )
}

export {ProductInformation} 