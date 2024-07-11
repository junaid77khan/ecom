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
        <div className='px-40 py-5 w-full bg-orange-50'>
            <h1 className='text-4xl mb-14'>Your Cart</h1>
            {
                cartProducts && cartProducts.length === 0 && (
                    <div>
                    <p>Your cart is empty</p>
                    <button onClick={() => navigate("/category")}>Continue Shopping</button>
                    </div>
                )
            }
            {
                cartProducts?.length > 0 &&
                <div className='flex flex-col justify-center items-center'>
                    {cartProducts?.map(product => (
                        <div key={product.id} className="border border-gray-300 w-full flex justify-between items-center px-8 py-5 my-3">
                            <div className="flex justify-center items-center gap-5">
                            <img className='w-24 h-24' src={product.images ? product.images[0] : ''} alt={product.name} />
                                <div>
                                    <p>{product.name}</p>
                                    <p>Price: ${product.salePrice}</p>
                                    <p>Rating: {product.rating}</p>
                                    <p>Availability: {product.availability ? <span className='text-green-500'>In stock</span> : <span className='text-red-500'>Out of stock</span>}</p>
                                </div>
                            </div>
                            <div className="flex justify-between items-center gap-5 px-5 py-2">
                                <div className="flex items-center mb-4">
                                    <div className="mr-4">Quantity:</div>
                                    <div className="flex border border-gray-300 rounded">
                                        <button onClick={() => decreaseProductQuantity(product.id)} className="px-3 py-1 bg-white">-</button>
                                        <div className="px-3 py-1 bg-white">{product.quantity}</div>
                                        <button onClick={() => increaseProductQuantity(product.id)} className="px-3 py-1 bg-white">+</button>
                                    </div>
                                </div>
                                <FontAwesomeIcon onClick={() => deleteProductFromCart(product.id)} icon={faTrash}/>
                                <div className=''>
                                    Total: ${(product.salePrice*product.quantity).toFixed(2)} 
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
