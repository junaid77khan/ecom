import React, {useState} from 'react';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "@fortawesome/fontawesome-svg-core/styles.css";

function Cart() {
    const cartProducts = [
        {
            id: 1,
            category: "Pillar Candles",
            name: "Product 1",
            description: "Lorem ipsum dolor sit amet.",
            image: "/candle1.jpg",
            price: 19.99,
            rating: 4.5,
            availability: true,
            quantity: 1
        },
        {
            id: 2,
            category: "Scented Candles",
            name: "Product 2",
            description: "Consectetur adipiscing elit.",
            image: "/candle2.jpg",
            price: 24.99,
            rating: 4.0,
            availability: true,
            quantity: 1
        },
        {
            id: 3,
            category: "Pillar Candles",
            name: "Product 3",
            description: "Sed do eiusmod tempor.",
            image: "/candle3.jpg",
            price: 29.99,
            rating: 4.2,
            availability: false,
            quantity: 1
        }
    ];

    const[productQuantity, setProductQuantity] = useState(1);

    const increaseQuantity = () => {
        setProductQuantity(productQuantity+1);
    }

    const decreaseQuantity = () => {
        if(productQuantity > 0) setProductQuantity(productQuantity-1);
    }

    return (
        <div className='px-40 py-5 w-full bg-orange-50'>
            <h1 className='text-4xl mb-14'>Your Cart</h1>
            {
                cartProducts.length == 0 && 
                <div>
                    <p>Your cart is empty</p>
                    <button onClick={continueShopping}>Continue Shopping</button>
                </div>
            }
            {
                cartProducts.length > 0 &&
                <div className='flex flex-col justify-center items-center'>
                    {cartProducts.map(product => (
                        <div key={product.id} className="border border-gray-300 w-full flex justify-between items-center px-8 py-5 my-3">
                            <div className="flex justify-center items-center gap-5">
                                <img className='w-24 h-24' src={product.image} alt={product.name} />
                                <div>
                                    <p>{product.name}</p>
                                    <p>Price: ${product.price}</p>
                                    <p>Rating: {product.rating}</p>
                                    <p>Availability: {product.availability ? <span className='text-green-500'>In stock</span> : <span className='text-red-500'>Out of stock</span>}</p>
                                </div>
                            </div>
                            <div className="flex justify-between items-center gap-5 px-5 py-2">
                                <div className='flex justify-between items-center gap-3  border border-black '>
                                    <div className='border-r border-black text-center  px-4 py-2'>-</div>
                                    <div className='py-2 px-2'>{productQuantity}</div>
                                    <div className='border-l border-black text-center px-4 py-2'>+</div>
                                </div>
                                <FontAwesomeIcon icon={faTrash}/>
                                <div>
                                    Total: ${product.price*product.quantity} 
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
