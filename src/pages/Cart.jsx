import React, { useState, useEffect, useCallback } from 'react';
import { FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { increaseQuantity, decreaseQuantity, removeFromCart } from '../store/cartSlice';

function Cart() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [userStatus, setUserStatus] = useState(false);
    const [cartProducts, setCartProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkUserStatus = async () => {
            try {
                let expiry = JSON.parse(localStorage.getItem("accessToken"));
                if (expiry && new Date().getTime() < expiry) {
                    setUserStatus(true);
                } else {
                    setUserStatus(false);
                }
            } catch (error) {
                console.error('Error checking user status:', error);
                setUserStatus(false);
            }
        };

        checkUserStatus();
    }, []);

    const handleDelete =async (productId) => {
        try {
            const token = JSON.parse(localStorage.getItem("Access Token"));
            let response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/cart/remove-cart-product/${productId}`, {
                method: 'GET',
                mode: "cors",
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });

            if (!response.ok) {
                throw new Error('Failed to delete product from cart');
            }

            response = await response.json();
            window.location.reload();
        } catch (error) {
            console.error('Deleting product error:', error);
        }  finally {
            console.log(cartProducts);
        }
    }


    useEffect(() => {
        if (userStatus) {
            const getCartItems = async () => {
                setLoading(true); // Start loading

                try {
                    const token = JSON.parse(localStorage.getItem("Access Token"));
                    let response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/cart/cart-products`, {
                        method: 'GET',
                        mode: "cors",
                        credentials: "include",
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        },
                    });

                    if (!response.ok) {
                        throw new Error('Failed to get cart products');
                    }

                    response = await response.json();
                    setCartProducts(response.data.items);
                } catch (error) {
                    console.error('Getting cart products error:', error);
                    // Handle error or show feedback to user
                } finally {
                    setLoading(false); 
                    console.log(cartProducts);
                }
            };

            getCartItems();
        } else {
            setLoading(false); // Redirect to signin if not authenticated
        }
    }, [userStatus]);

    const increaseProductQuantity = useCallback((productId) => {
        // setQuant
    }, [dispatch]);

    const decreaseProductQuantity = useCallback((productId) => {
        dispatch(decreaseQuantity({ "productId": productId }));
    }, [dispatch]);

    const deleteProductFromCart = useCallback((productId) => {
        dispatch(removeFromCart({ "productId": productId }));
    }, [dispatch]);

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
                userStatus && loading && (
                    <div className="h-96 flex justify-center items-center z-50">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
                    </div>
                )
            }
            {
                userStatus && !loading && cartProducts && cartProducts.length === 0 && (
                    <div className='flex flex-col justify-center items-center'>
                        <p className='text-xl mb-2'>Cart is empty</p>
                        <button className='text-sm text-orange-500 font-bold border-b-2 border-orange-500 hover:border-orange-600 hover:text-orange-600' onClick={() => navigate("/categories")}>Continue Shopping</button>
                    </div>
                )
            }
            {
                userStatus && !loading && cartProducts?.length > 0 &&
                <div className='flex flex-col justify-center w-full items-center'>
                    {cartProducts?.map(item => (
                        <div key={item?._id} className="border border-gray-300 bg-white rounded-lg w-full flex justify-start lg:gap-5 gap-3 items-start lg:px-8 px-3 py-5 my-2">
                            <img className='w-24 md:h-24 h-20 rounded-lg' src={item.product.images ? item.product.images[0] : ''} alt={item.product.name} />
                            <div className="flex md:flex-row flex-col justify-between w-full items-start md:gap-5 gap-1 ">
                                <div className=' '>
                                    <p className='md:text-md text-sm'>{item.product.name}</p>
                                    <p className='md:text-md text-sm'>₹ {item.product.salePrice}</p>
                                    <p className='md:text-md text-xs'>{item.product.stock > 0 ? <span className='text-green-500'>In stock</span> : <span className='text-red-500'>Out of stock</span>}</p>
                                </div>
                                <div className="flex justify-center items-center mb-4">
                                    <div className='flex flex-col gap-1'>
                                        <div className='flex justify-center items-center '>
                                            <div className='md:text-md text-sm'>Quantity:</div>
                                            <div className="px-3 py-1 bg-white md:text-md text-sm">{item.quantity}</div>
                                            {/* <div className="flex rounded"> */}
                                                {/* <button onClick={() => decreaseProductQuantity(item.product._id)} className="px-3 py-1 md:text-md text-sm bg-white">-</button> */}
                                                {/* <div className="px-3 py-1 bg-white md:text-md text-sm">{item.quantity}</div>  */}
                                                {/* <button onClick={() => increaseProductQuantity(item.product._id)} className="px-3 py-1 md:text-md text-sm bg-white">+</button> */}
                                            {/* </div> */}
                                            {/* <FaTrash className='md:text-md text-sm' onClick={() => deleteProductFromCart(item.product._id)} /> */}
                                            <button
                                                onClick={() => handleDelete(item.product._id)}
                                                className="relative rounded-lg border-2 inline-flex items-center justify-start px-3 py-1 overflow-hidden font-medium transition-all bg-orange-500 hover:bg-orange-500 hover:border-orange-500 group"
                                            >
                                                <span className="w-40 h-40 rounded rotate-[-40deg] bg-white absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-6 ml-6 group-hover:ml-0 group-hover:mb-24 group-hover:translate-x-0"></span>
                                                <span className="relative w-full text-center lg:text-md text-sm text-white transition-colors duration-300 ease-in-out group-hover:text-orange-500">
                                                    Delete
                                                </span>
                                            </button>
                                        </div>
                                        <div className='md:text-md text-sm'>
                                            Total: ₹ {((item.product.salePrice) * item.quantity).toFixed(2)}
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
