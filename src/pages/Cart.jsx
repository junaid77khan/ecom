import React, {useState} from 'react';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, increaseQuantity, decreaseQuantity } from '../store/cartSlice';

function Cart() {

    const navigate = useNavigate();
    const dispatch = useDispatch();



    // const cartProducts = [
    //     {
    //         id: 1,
    //         category: "Pillar Candles",
    //         name: "Product 1",
    //         description: "Lorem ipsum dolor sit amet.",
    //         images: ["/candle1.jpg"],
    //         price: 19.99,
    //         rating: 4.5,
    //         availability: true,
    //         quantity: 1
    //     },
    //     {
    //         id: 2,
    //         category: "Scented Candles",
    //         name: "Product 2",
    //         description: "Consectetur adipiscing elit.",
    //         images: ["/candle2.jpg"],
    //         price: 24.99,
    //         rating: 4.0,
    //         availability: true,
    //         quantity: 1
    //     },
    //     {
    //         id: 3,
    //         category: "Pillar Candles",
    //         name: "Product 3",
    //         description: "Sed do eiusmod tempor.",
    //         images: ["/candle3.jpg"],
    //         price: 29.99,
    //         rating: 4.2,
    //         availability: false,
    //         quantity: 1
    //     }
    // ];

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
                cartProducts && cartProducts.length === 0 && (
                    <div className='flex flex-col justify-center items-center'>
                    <p className='text-xl mb-2'>Cart is empty</p>
                    <button className='text-sm text-orange-500 font-bold border-b-2 border-orange-500 hover:border-orange-600 hover:text-orange-600' onClick={() => navigate("/categories")}>Continue Shopping</button>
                    </div>
                )
            }
            {
                cartProducts?.length > 0 &&
                <div className='flex flex-col justify-center w-full items-center'>
                    {cartProducts?.map(product => (
                        <div key={product.id} className="border border-gray-300 bg-white rounded-lg w-full flex justify-start gap-5 items-start px-8 py-5 my-3">
                            <img className='w-24 md:h-24 h-20 rounded-lg' src={product.images ? product.images[0] : ''} alt={product.name} />
                            <div className="flex md:flex-row flex-col justify-between w-full items-start md:gap-5 gap-1 ">
                                    <div className=' '>
                                        <p className='md:text-lg text-sm'>{product.name}</p>
                                        <p className='md:text-lg text-sm'>₹ {product.salePrice}</p>
                                        <p className='md:text-md text-xs'>{product.availability ? <span className='text-green-500'>In stock</span> : <span className='text-red-500'>Out of stock</span>}</p>
                                    </div>
                                    <div className="flex justify-center items-center mb-4">
                                        <div className='flex flex-col gap-1'>
                                            <div className='flex justify-center items-center gap-4'>
                                                <div className='md:text-lg text-sm'>Quantity:</div>
                                                <div className="flex border border-gray-300 rounded">
                                                    <button onClick={() => decreaseProductQuantity(product.id)} className="px-3 py-1 md:text-lg text-sm bg-white">-</button>
                                                    <div className="px-3 py-1 bg-white md:text-lg text-sm">{product.quantity}</div>
                                                    <button onClick={() => increaseProductQuantity(product.id)} className="px-3 py-1 md:text-lg text-sm bg-white">+</button>
                                                </div>
                                                <FontAwesomeIcon className='md:text-lg text-sm' onClick={() => deleteProductFromCart(product.id)} icon={faTrash}/>
                                            </div>
                                            <div className='md:text-lg text-sm'>
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
