import React, {useState, useEffect} from 'react';
import { FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, increaseQuantity, decreaseQuantity } from '../store/cartSlice';

function Cart() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const[userStatus, setUserStatus] = useState(false);

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

    const {cartProducts} = useSelector(state => state.cart);



    const increaseProductQuantity = (productId) => {
        dispatch(increaseQuantity({"productId": productId})); 
      }
      
      const decreaseProductQuantity = (productId) => {
        dispatch(decreaseQuantity({"productId": productId})); 
      }
      
      const deleteProductFromCart = (productId) => {
        dispatch(removeFromCart({"productId": productId})); 
      }
      

    return (
        <div className='md:px-40 px-5 py-5 w-full bg-orange-50'>
            <h1 className='md:text-4xl text-2xl lg:mb-14 mb-7'>Your Cart</h1>
            {
                !userStatus && (
                    <div className='flex flex-col justify-center items-center'>
                        <p className='text-xl mb-2'>Please Login</p>
                        <button
                            onClick={() => navigate('/signin')}
                            className="relative rounded-lg border-2 inline-flex items-center justify-start md:px-6 lg:px-5 px-4 py-2 overflow-hidden font-medium transition-all bg-orange-500 hover:bg-orange-500 hover:border-orange-500 group"
                        >
                            <span className="w-40 h-40 rounded rotate-[-40deg] bg-white absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-6 ml-6 group-hover:ml-0 group-hover:mb-24 group-hover:translate-x-0"></span>
                            <span className="relative w-full text-center lg:text-md text-sm text-white transition-colors duration-300 ease-in-out group-hover:text-orange-500">
                            Login
                            </span>
                        </button>
                    </div>
                )
            }
            {
                userStatus && cartProducts && cartProducts.length === 0 && (
                    <div className='flex flex-col justify-center items-center'>
                    <p className='text-xl mb-2'>Cart is empty</p>
                    <button className='text-sm text-orange-500 font-bold border-b-2 border-orange-500 hover:border-orange-600 hover:text-orange-600' onClick={() => navigate("/categories")}>Continue Shopping</button>
                    </div>
                )
            }
            {
                userStatus && cartProducts?.length > 0 &&
                <div className='flex flex-col justify-center w-full items-center'>
                    {cartProducts?.map(product => (
                        <div key={product.id} className="border border-gray-300 bg-white rounded-lg w-full flex justify-start lg:gap-5 gap-3 items-start lg:px-8 px-3 py-5 my-2">
                            <img className='w-24 md:h-24 h-20 rounded-lg' src={product.images ? product.images[0] : ''} alt={product.name} />
                            <div className="flex md:flex-row flex-col justify-between w-full items-start md:gap-5 gap-1 ">
                                    <div className=' '>
                                        <p className='md:text-md text-sm'>{product.name}</p>
                                        <p className='md:text-md text-sm'>₹ {product.salePrice}</p>
                                        <p className='md:text-md text-xs'>{product.availability ? <span className='text-green-500'>In stock</span> : <span className='text-red-500'>Out of stock</span>}</p>
                                    </div>
                                    <div className="flex justify-center items-center mb-4">
                                        <div className='flex flex-col gap-1'>
                                            <div className='flex justify-center items-center gap-4'>
                                                <div className='md:text-md text-sm'>Quantity:</div>
                                                <div className="flex border border-gray-300 rounded">
                                                    <button onClick={() => decreaseProductQuantity(product.id)} className="px-3 py-1 md:text-md text-sm bg-white">-</button>
                                                    <div className="px-3 py-1 bg-white md:text-md text-sm">{product.quantity}</div>
                                                    <button onClick={() => increaseProductQuantity(product.id)} className="px-3 py-1 md:text-md text-sm bg-white">+</button>
                                                </div>
                                                <FaTrash className='md:text-md text-sm' onClick={() => deleteProductFromCart(product.id)} />
                                            </div>
                                            <div className='md:text-md text-sm'>
                                                Total: ₹ {(product.salePrice*product.quantity).toFixed(2)} 
                                            </div>
                                        </div>
                                    </div>
                                    
                            </div>
                        </div>
                    ))}
                </div>
            }
        </div>
    )
}

export default Cart;
