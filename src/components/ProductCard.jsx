/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { showPopup } from "../store/popupSlice";
import { addToCart } from "../store/cartSlice";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductStarRating = ({ rating }) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
  
    return (
      <div className="flex">
        {[...Array(fullStars)].map((_, i) => (
          <span key={i} className="text-yellow-500 text-lg">
            ★
          </span>
        ))}
        {halfStar && <span className="text-yellow-500 text-lg">☆</span>}
        {[...Array(emptyStars)].map((_, i) => (
          <span key={i + fullStars + 1} className="text-gray-300 text-lg">
            ★
          </span>
        ))}
      </div>
    );
  };

const ProductCard = (props) => {
    const navigate = useNavigate();
    const {product}=props;
    const {check}=props;
    const dispatch = useDispatch();
    const[userStatus, setUserStatus] = useState(false);
    const[loading, setLoading] = useState(false);

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
  

    // const handleAddToCart = async () => {
    //   if(userStatus) {
    //     setLoading(true);
    //     try {
    //       const productId = product._id;
    //       const token = JSON.parse(localStorage.getItem("Access Token"));
    //       let response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/cart/add-cart-product/${productId}`, {
    //         method: 'POST',
    //         mode: "cors",
    //         credentials: "include",
    //         headers: {
    //           'Content-Type': 'application/json',
    //           'Authorization': `Bearer ${token}`
    //         },
    //         body: JSON.stringify({
    //           quantity: 1
    //         }),
    //       });

    //       if (!response.ok) {
    //         throw new Error('Failed to add product in cart');
    //       }

    //       response = await response.json();
    //       const obj = {...product, quantity: response.data.quantity}
    //       dispatch(showPopup(obj));
    //     } catch (error) {
    //       toast.error("Failed to add product in cart. Please try again.");
    //       console.error('Adding product in cart error:', error);
    //     } finally {
    //       setLoading(false);
    //     }
    //   } else {
    //     navigate("/signin")
    //   }
    // }

    const handleAddToCart = async () => {

      let cartInfo = JSON.parse(localStorage.getItem('cartInfo'));

      let availableProducts = [];

      if(cartInfo && cartInfo.length === 2) {
        availableProducts = cartInfo[1]; 
      }

      let PrevproductData = availableProducts.filter(pro => pro._id === product._id);

      const productObj = {
        ...product,
        quantity: 1
      };

      dispatch(addToCart({ product: productObj }));

      cartInfo = JSON.parse(localStorage.getItem('cartInfo'));

      availableProducts = [];

      if(cartInfo && cartInfo.length === 2) {
        availableProducts = cartInfo[1]; 
      }

      if(PrevproductData[0]?.quantity !== availableProducts[0]?.quantity) {
        dispatch(showPopup({...product, "quantity": availableProducts[0].quantity}));
      } else {
        toast.error("Failed to add product in cart. Please try again.")
      } 
    }
    return (
        <div
            key={product._id}
            className="bg-white hover:bg-gray-100 duration-200 lg:px-6 px-4 py-6 shadow-md rounded-lg h-90 md:w-80 w-72 cursor-pointer"
          >
            <img
              src={product.images[0]}
              alt={product.name}
              className="rounded-lg mb-2 w-full md:h-56 h-52"
            />
            <h3 className="md:text-xl text-lg font-bold mb-2">{product.name}</h3>
            <p className="text-gray-600 mb-2">{product.description.substring(0, 40)}...</p>
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold">₹{product.salePrice}</span>
              <ProductStarRating rating={typeof product?.avgRating === 'undefined' ? 5 : product.avgRating} />
            </div>
            {check && <div className="flex justify-between items-center">
              <button
                onClick={() => handleAddToCart(product)}
                className="relative rounded-lg border-2 inline-flex items-center justify-start md:px-6 lg:px-5 px-4 py-2 overflow-hidden font-medium transition-all bg-orange-500 hover:bg-orange-500 hover:border-orange-500 group"
              >
                <span className="w-40 h-40 rounded rotate-[-40deg] bg-white absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-6 ml-6 group-hover:ml-0 group-hover:mb-24 group-hover:translate-x-0"></span>
                <span className="relative w-full text-center lg:text-md text-sm text-white transition-colors duration-300 ease-in-out group-hover:text-orange-500">
                  Add to cart
                </span>
              </button>
              <button
                onClick={() => navigate(`/product/${product._id}`, {replace: true})}
                className="relative rounded-lg border-2 border-orange-500 inline-flex items-center justify-start  md:px-6 lg:px-5 px-4 py-2 overflow-hidden font-medium transition-all bg-white hover:bg-white hover:border-white group"
              >
                <span className="w-40 h-40 rounded rotate-[-40deg] bg-orange-500 absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-6 ml-6 group-hover:ml-0 group-hover:mb-24 group-hover:translate-x-0"></span>
                <span className="relative w-full text-center lg:text-md text-sm text-orange-500 transition-colors duration-300 ease-in-out group-hover:text-white">
                  View
                </span>
              </button>
            </div>}
          </div>
    )
}

export {ProductCard, ProductStarRating}