// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import {
//   increaseQuantity,
//   decreaseQuantity,
//   removeFromCart,
// } from "../store/cartSlice";
// import CryptoJS from "crypto-js";

// function Cart() {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const [loading, setLoading] = useState(true);
//   const [cartProducts, setCartProducts] = useState([]);
//   const [check, setCheck] = useState(false);

//   const handleDelete = async (productId) => {
//     try {
//       const token = JSON.parse(localStorage.getItem("Access Token"));
//       let response = await fetch(
//         `${
//           import.meta.env.VITE_API_URL
//         }/api/v1/cart/remove-cart-product/${productId}`,
//         {
//           method: "GET",
//           mode: "cors",
//           credentials: "include",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Failed to delete product from cart");
//       }

//       response = await response.json();
//       window.location.reload();
//     } catch (error) {
//       console.error("Deleting product error:", error);
//     } finally {
//       console.log(cartProducts);
//     }
//   };

//   const increaseProductQuantity = (productId) => {
//     setCheck((prev) => !prev);
//     dispatch(increaseQuantity({ productId: productId }));
//   };

//   const decreaseProductQuantity = (productId) => {
//     setCheck((prev) => !prev);
//     dispatch(decreaseQuantity({ productId: productId }));
//   };

//   const deleteProductFromCart = (productId) => {
//     setCheck((prev) => !prev);
//     dispatch(removeFromCart({ productId: productId }));
//   };
//   const handleButtonClick = () => {
//     navigate("/otp");
//   };

//   useEffect(() => {
//     setLoading(true);

//     const cartInfo = JSON.parse(localStorage.getItem("cartInfo"));

//     if (cartInfo && cartInfo.length === 2) {
//       let storedKey = cartInfo[0];
//       const productsFromStorage = cartInfo[1];
//       let cryptoKey = CryptoJS.SHA256(
//         JSON.stringify(productsFromStorage)
//       ).toString();
//       if (cryptoKey === storedKey) {
//         setCartProducts(cartInfo[1]);
//       } else {
//         localStorage.removeItem("cartInfo");
//       }
//     }

//     setLoading(false);
//   }, [check]);

//   return (
//     <div className="md:px-40 px-5 py-5 w-full bg-orange-50">
//       <h1 className="md:text-4xl text-2xl lg:mb-14 mb-7">Your Cart</h1>

//       {loading && (
//         <div className="h-96 flex justify-center items-center z-50">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
//         </div>
//       )}
//       {!loading && cartProducts && cartProducts.length === 0 && (
//         <div className="flex flex-col justify-center items-center">
//           <p className="text-xl mb-2">Cart is empty</p>
//           <button
//             className="text-sm text-orange-500 font-bold border-b-2 border-orange-500 hover:border-orange-600 hover:text-orange-600"
//             onClick={() => navigate("/categories")}
//           >
//             Continue Shopping
//           </button>
//         </div>
//       )}
//       {!loading && cartProducts?.length > 0 && (
//         <div className="flex flex-col justify-center w-full items-center">
//           {cartProducts?.map((item) => (
//             <div
//               key={item?._id}
//               className="border border-gray-300 bg-white rounded-lg w-full flex justify-start lg:gap-5 gap-3 items-start lg:px-8 px-3 py-5 my-2"
//             >
//               <img
//                 className="w-24 md:h-24 h-20 rounded-lg"
//                 src={item.images ? item.images[0] : ""}
//                 alt={item.name}
//               />
//               <div className="flex md:flex-row flex-col justify-between w-full items-start md:gap-5 gap-1 ">
//                 <div className=" flex flex-col justify-center items-start gap-1 lg:gap-2">
//                   <p className="md:text-md text-sm">{item.name}</p>
//                   <p className="md:text-md text-sm">₹ {item.salePrice}</p>
//                   <p className="md:text-md text-xs">
//                     {item.stock > 0 ? (
//                       <span className="text-green-500">In stock</span>
//                     ) : (
//                       <span className="text-red-500">Out of stock</span>
//                     )}
//                   </p>
//                 </div>
//                 <div className="flex justify-center items-center mb-4">
//                   <div className="flex flex-col gap-1">
//                     <div className="flex flex-col justify-center items-center gap-2">
//                       <div className="flex justify-center items-center gap-2">
//                         <div className="md:text-md text-sm">Quantity:</div>
//                         <div className="flex border border-gray-300 rounded text-md">
//                           <button
//                             onClick={() => decreaseProductQuantity(item._id)}
//                             className="px-3 py-1 bg-gray-100"
//                           >
//                             -
//                           </button>
//                           <div className="px-3 py-1">{item.quantity}</div>
//                           <button
//                             onClick={() => increaseProductQuantity(item._id)}
//                             className="px-3 py-1 bg-gray-100"
//                           >
//                             +
//                           </button>
//                         </div>
//                       </div>
//                       <div className="flex justify-center items-center gap-2">
//                         <button
//                           onClick={() => deleteProductFromCart(item._id)}
//                           className="relative rounded-lg border-2 inline-flex items-center justify-start px-3 py-1 overflow-hidden font-medium transition-all bg-orange-500 hover:bg-orange-500 hover:border-orange-500 group"
//                         >
//                           <span className="w-40 h-40 rounded rotate-[-40deg] bg-white absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-6 ml-6 group-hover:ml-0 group-hover:mb-24 group-hover:translate-x-0"></span>
//                           <span className="relative w-full text-center lg:text-md text-sm text-white transition-colors duration-300 ease-in-out group-hover:text-orange-500">
//                             Delete
//                           </span>
//                         </button>
//                         <button
//                           onClick={handleButtonClick}
//                           className="relative rounded-lg border-2 inline-flex items-center justify-start px-3 py-1 overflow-hidden font-medium transition-all bg-orange-500 hover:bg-orange-500 hover:border-orange-500 group"
//                         >
//                           <span className="w-40 h-40 rounded rotate-[-40deg] bg-white absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-6 ml-6 group-hover:ml-0 group-hover:mb-24 group-hover:translate-x-0"></span>
//                           <span className="relative w-full text-center lg:text-md text-sm text-white transition-colors duration-300 ease-in-out group-hover:text-orange-500">
//                             Check out
//                           </span>
//                         </button>
//                       </div>
//                     </div>
//                     <div className="md:text-md text-sm">
//                       Total: ₹ {(item.salePrice * item.quantity).toFixed(2)}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// export default Cart;

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} from "../store/cartSlice";
import { Toaster, toast } from 'sonner'
import CryptoJS from "crypto-js";

function Cart() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [cartProducts, setCartProducts] = useState([]);
  const [check, setCheck] = useState(false);

  const increaseProductQuantity = (productId) => {
    setCheck((prev) => !prev);
    dispatch(increaseQuantity({ productId }));
  };

  const decreaseProductQuantity = (productId) => {
    setCheck((prev) => !prev);
    dispatch(decreaseQuantity({ productId }));
  };

  const deleteProductFromCart = (productId) => {
    setCheck((prev) => !prev);
    dispatch(removeFromCart({ productId }));
    toast.success("Deleted")
  };

  const handleButtonClick = (product) => {
    navigate("/otp", { state: { product } });
  };

  useEffect(() => {
    setLoading(true);

    const cartInfo = JSON.parse(localStorage.getItem("cartInfo"));

    if (cartInfo && cartInfo.length === 2) {
      let storedKey = cartInfo[0];
      const productsFromStorage = cartInfo[1];
      let cryptoKey = CryptoJS.SHA256(
        JSON.stringify(productsFromStorage)
      ).toString();
      if (cryptoKey === storedKey) {
        setCartProducts(cartInfo[1]);
      } else {
        localStorage.removeItem("cartInfo");
      }
    }

    setLoading(false);
  }, [check]);

  return (
    <div className="md:px-40 px-5 py-5 w-full bg-orange-50">
      <h1 className="md:text-4xl text-2xl lg:mb-14 mb-7">Your Cart</h1>

      {loading && (
        <div className="h-96 flex justify-center items-center z-50">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
        </div>
      )}
      {!loading && cartProducts && cartProducts.length === 0 && (
        <div className="flex flex-col justify-center items-center">
          <p className="text-xl mb-2">Cart is empty</p>
          <button
            className="text-sm text-orange-500 font-bold border-b-2 border-orange-500 hover:border-orange-600 hover:text-orange-600"
            onClick={() => navigate("/categories")}
          >
            Continue Shopping
          </button>
        </div>
      )}
      {!loading && cartProducts?.length > 0 && (
        <div className="flex flex-col justify-center w-full items-center">
          {cartProducts?.map((item) => (
            <div
              key={item?._id}
              className="border border-gray-300 bg-white rounded-lg w-full flex justify-start lg:gap-5 gap-3 items-start lg:px-8 px-3 py-5 my-2"
            >
              <img
                className="w-24 md:h-24 h-20 rounded-lg"
                src={item.images ? item.images[0] : ""}
                alt={item.name}
              />
              <div className="flex md:flex-row flex-col justify-between w-full items-start md:gap-5 gap-1 ">
                <div className=" flex flex-col justify-center items-start gap-1 lg:gap-2">
                  <p className="md:text-md text-sm">{item.name}</p>
                  <p className="md:text-md text-sm">₹ {item.salePrice}</p>
                  <p className="md:text-md text-xs">
                    {item.stock > 0 ? (
                      <span className="text-green-500">In stock</span>
                    ) : (
                      <span className="text-red-500">Out of stock</span>
                    )}
                  </p>
                </div>
                <div className="flex justify-center items-center mb-4">
                  <div className="flex flex-col gap-1">
                    <div className="flex flex-col justify-center items-center gap-2">
                      <div className="flex justify-center items-center gap-2">
                        <div className="md:text-md text-sm">Quantity:</div>
                        <div className="flex border border-gray-300 rounded text-md">
                          <button
                            onClick={() => decreaseProductQuantity(item._id)}
                            className="px-3 py-1 bg-gray-100"
                          >
                            -
                          </button>
                          <div className="px-3 py-1">{item.quantity}</div>
                          <button
                            onClick={() => increaseProductQuantity(item._id)}
                            className="px-3 py-1 bg-gray-100"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div className="flex justify-center items-center gap-2">
                        <button
                          onClick={() => deleteProductFromCart(item._id)}
                          className="relative rounded-lg border-2 inline-flex items-center justify-start px-3 py-1 overflow-hidden font-medium transition-all bg-orange-500 hover:bg-orange-500 hover:border-orange-500 group"
                        >
                          <span className="w-40 h-40 rounded rotate-[-40deg] bg-white absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-6 ml-6 group-hover:ml-0 group-hover:mb-24 group-hover:translate-x-0"></span>
                          <span className="relative w-full text-center lg:text-md text-sm text-white transition-colors duration-300 ease-in-out group-hover:text-orange-500">
                            Delete
                          </span>
                        </button>
                        <button
                          onClick={() => handleButtonClick(item)}
                          className="relative rounded-lg border-2 inline-flex items-center justify-start px-3 py-1 overflow-hidden font-medium transition-all bg-orange-500 hover:bg-orange-500 hover:border-orange-500 group"
                        >
                          <span className="w-40 h-40 rounded rotate-[-40deg] bg-white absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-6 ml-6 group-hover:ml-0 group-hover:mb-24 group-hover:translate-x-0"></span>
                          <span className="relative w-full text-center lg:text-md text-sm text-white transition-colors duration-300 ease-in-out group-hover:text-orange-500">
                            Check out
                          </span>
                        </button>
                      </div>
                    </div>
                    <div className="md:text-md text-sm">
                      Total: ₹ {(item.salePrice * item.quantity).toFixed(2)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Cart;
