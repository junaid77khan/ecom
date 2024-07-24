/* eslint-disable react/prop-types */
// PopupCart.js
import { useDispatch } from "react-redux";
import { closePopup } from "../store/popupSlice"; // You need to create this action
import { useNavigate } from "react-router-dom";
import { IoCloseOutline } from "react-icons/io5";

const PopupCart = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (!product) {
    return null; // or render a fallback UI
  }

  return (
    <div className="fixed w-[20rem] top-16 md:right-10 bg-white p-4 shadow-lg rounded-xl animate-jump z-50">
      <div className="relative">
        <button
          onClick={() => dispatch(closePopup())}
          className="absolute top-0 right-0 text-xl text-black hover:text-gray-400 "
        >
          <IoCloseOutline />
        </button>
        <h4 className="text-lg  ">✓ Item added to your cart</h4>
        <div className="flex justify-around gap-2">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-20 h-20 rounded mt-2"
          />
          <div className="pt-4">
            <p>{product.name}</p>
            <p>Quantity: {product.quantity}</p>
          </div>
        </div>
        <div className="flex flex-col justify-between mt-4">
          <button
            onClick={() => {
              dispatch(closePopup())
              navigate(`/cart`)
            }}
            className="relative my-2 rounded-lg border-2 border-orange-500 inline-flex items-center justify-start px-6 py-2 overflow-hidden font-medium transition-all bg-white hover:bg-white hover:border-white group"
          >
            <span className="w-40 h-40 rounded rotate-[-40deg] bg-orange-500 absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-6 ml-6 group-hover:ml-0 group-hover:mb-24 group-hover:translate-x-0"></span>
            <span className="relative w-full text-center text-md text-orange-500 transition-colors duration-300 ease-in-out group-hover:text-white">
              view cart
            </span>
          </button>
          <button
            onClick={() => {
              dispatch(closePopup())
              navigate(`/otp`, {state: {product}})
            }}
            className="relative rounded-lg border-2 inline-flex items-center justify-start px-6 py-2 overflow-hidden font-medium transition-all bg-orange-500 hover:bg-orange-500 hover:border-orange-500 group"
          >
            <span className="w-40 h-40 rounded rotate-[-40deg] bg-white absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-6 ml-6 group-hover:ml-0 group-hover:mb-24 group-hover:translate-x-0"></span>
            <span className="relative w-full text-center text-md text-white transition-colors duration-300 ease-in-out group-hover:text-orange-500">
              checkout
            </span>
          </button>
          <button
            className=" text-black hover:text-gray-500  underline underline-offset-4 py-1 text-sm rounded"
            onClick={() => dispatch(closePopup())}
          >
            Continue Shopping
          </button>
        </div>
       
      </div>
    </div>
  );
};

export default PopupCart;
