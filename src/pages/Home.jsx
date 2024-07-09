import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import React, { useRef, useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { InfiniteMovingCards } from '../components/ui/infinite-moving-cards';


function Home() {
    const navigate = useNavigate();
    const scrollRef = useRef(null);

    const[isMostPopularActive, setIsMostPopularActive] = useState(true);

    const[bestSellerAllReviews, setBestSellerAllReviews] = useState(false);

    const [productQuantity, setProductQuantity] = useState(1);

    const increaseQuantity = () => {
        setProductQuantity(productQuantity+1);
    }

    const decreaseQuantity = () => {
        if(productQuantity > 0) setProductQuantity(productQuantity-1);
    }

    const bestSellerProduct = { id: 1, name: 'AuraDecor Fragrance Rose Heart Shape Tealight (Pack of 10)', originalPrice: 199.00, salePrice: 99.00, image: '/candle6.jpg', description: 'Inhaling rose fragrance has therapeutic aroma benefits that help fight depression, overcome anxiety, reduce stress and insomnia.', features: ['Set of 10 Tealight Candles', 'Rose Fragrance', 'Heart Shape', 'Perfect for Decoration and Gifting', 'Burn Time: Up to 4 hours each'], reviews: [{ id: 1, user: 'John Doe', rating: 5, comment: 'Amazing product! The fragrance is wonderful and lasts long.' }, { id: 2, user: 'Jane Smith', rating: 4, comment: 'Beautiful design and great scent, but the burning time could be longer.' }, { id: 3, user: 'Jane Smith', rating: 4, comment: 'Beautiful design and great scent, but the burning time could be longer.' }, { id: 4, user: 'Jane Smith', rating: 4, comment: 'Beautiful design and great scent, but the burning time could be longer.' }] };

    useEffect(() => {
        setScrollIndex(0);
    }, [isMostPopularActive]);

    const [scrollIndex, setScrollIndex] = useState(0);

    const scrollBy = (direction) => {
        const productWidth = scrollRef.current.firstChild.clientWidth;
        const maxScrollIndex = Math.floor(scrollRef.current.scrollWidth / productWidth) - 1;

        if (direction === 'left') {
            setScrollIndex(prevIndex => Math.max(prevIndex - 4, 0));
        } else {
            setScrollIndex(prevIndex => Math.min(prevIndex + 4, maxScrollIndex));
        }
    };

    const scrollToIndex = () => {
        const productWidth = scrollRef.current.firstChild.clientWidth;
        scrollRef.current.scrollTo({
            left: productWidth * scrollIndex,
            behavior: 'smooth'
        });
    };

    React.useEffect(() => {
        scrollToIndex();
    }, [scrollIndex]);

    return (
        <div className='w-full h-full text-black'>
            <div className=' h-[40rem] relative'>
                <div className='h-full  w-full'>
                    <img className='bg-cover bg-center brightness-75 w-screen h-full ' src='../../public/hero4.jpeg' />
                </div>

                <div className=" inset-0 flex items-center justify-center absolute">
                    <div className="text-white text-center">
                        <h1 className="text-5xl font-bold">Luxury For Every Home</h1>
                        <h3 className="text-xl py-2 pb-8">Stay one step ahead in the world of Aroma & Candles.</h3>
                        <button onClick={() => navigate("/categories")} className="relative rounded-full border-2 border-orange-500 inline-flex items-center justify-start px-12 py-4 overflow-hidden font-medium transition-all bg-white hover:bg-white group">
                        <span className="w-36 h-36 border-6 border-orange-700 rounded rotate-[-40deg] bg-orange-600 absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-6 ml-6 group-hover:ml-0 group-hover:mb-24 group-hover:translate-x-0"></span>
                        <span className="relative w-full text-center text-xl text-orange-500 transition-colors duration-300 ease-in-out group-hover:text-white">Shop</span>
                        </button>
                    </div>
                </div>
            </div>
            <div className='h-full py-10 px-36 w-full bg-orange-200 bg-gradient-to-b from-orange-200 to-orange-50'>
                <h1 className='text-6xl text-white font-bold'>Our Categories</h1>

                <div className='w-full flex justify-end items-center mt-10'>
                    <button onClick={() => navigate("/categories")} className='border hover:bg-gray-200 transition-200 border-gray-200 bg-white px-8 py-3'>View All</button>
                </div>
                <div className='flex flex-wrap justify-center items-center gap-5 py-10  mt-5'>
            
                    <a href='/categories/Pillar Candles' className='flex flex-col justify-center items-start gap-3 w-72 h-96 px-4 py-6  bg-white hover:bg-gray-200 duration-200 rounded-lg'>
                        <img className='bg-cover bg-center w-full h-3/4 rounded-lg' src='../../public/candle6.jpg' />
                        <h1 className='text-xl'>Pillar Candles <FontAwesomeIcon onClick={() => navigate('/collections')} className='cursor-pointer' icon={faArrowRight}/> </h1>
                    </a>
                    <a href='/categories/Tea Light Candles' className='flex flex-col justify-center items-start gap-3 w-72 h-96 px-4 py-6 bg-white  hover:bg-gray-200 duration-200 rounded-lg'>
                        <img className='bg-cover bg-center w-full h-3/4 rounded-lg' src='../../public/candle8.jpg' />
                        <h1 className='text-xl'>Tea Light Candles <FontAwesomeIcon onClick={() => navigate('/collections')} className='cursor-pointer' icon={faArrowRight}/> </h1>
                    </a>
                    <a href='/categories/Jar Candles' className='flex flex-col justify-center items-start gap-3 w-72 h-96 px-4 py-6  bg-white hover:bg-gray-200 duration-200 rounded-lg'>
                        <img className='bg-cover bg-center w-full h-3/4 rounded-lg' src='../../public/candle2.jpg' />
                        <h1 className='text-xl'>Jar Candles <FontAwesomeIcon onClick={() => navigate('/collections')} className='cursor-pointer' icon={faArrowRight}/> </h1>
                    </a>
                    <a href='/categories/Jar Candles' className='flex flex-col justify-center items-start gap-3 w-72 h-96 px-4 py-6  bg-white hover:bg-gray-200 duration-200 rounded-lg'>
                        <img className='bg-cover bg-center w-full h-3/4 rounded-lg' src='../../public/candle2.jpg' />
                        <h1 className='text-xl'>Jar Candles <FontAwesomeIcon onClick={() => navigate('/collections')} className='cursor-pointer' icon={faArrowRight}/> </h1>
                    </a>
                    <a href='/categories/Jar Candles' className='flex flex-col justify-center items-start gap-3 w-72 h-96 px-4 py-6  bg-white hover:bg-gray-300 duration-200 rounded-lg'>
                        <img className='bg-cover bg-center w-full h-3/4 rounded-lg' src='../../public/candle2.jpg' />
                        <h1 className='text-xl'>Jar Candles <FontAwesomeIcon onClick={() => navigate('/collections')} className='cursor-pointer' icon={faArrowRight}/> </h1>
                    </a>
                    <a href='/categories/Jar Candles' className='flex flex-col justify-center items-start gap-3 w-72 h-96 px-4 py-6  bg-white hover:bg-gray-200 duration-200 rounded-lg'>
                        <img className='bg-cover bg-center w-full h-3/4 rounded-lg' src='../../public/candle2.jpg' />
                        <h1 className='text-xl'>Jar Candles <FontAwesomeIcon onClick={() => navigate('/collections')} className='cursor-pointer' icon={faArrowRight}/> </h1>
                    </a>
                    <a href='/categories/Jar Candles' className='flex flex-col justify-center items-start gap-3 w-72 h-96 px-4 py-6  bg-white hover:bg-gray-200 duration-200 rounded-lg'>
                        <img className='bg-cover bg-center w-full h-3/4 rounded-lg' src='../../public/candle2.jpg' />
                        <h1 className='text-xl'>Jar Candles <FontAwesomeIcon onClick={() => navigate('/collections')} className='cursor-pointer' icon={faArrowRight}/> </h1>
                    </a>
                    <a href='/categories/Jar Candles' className='flex flex-col justify-center items-start gap-3 w-72 h-96 px-4 py-6  bg-white hover:bg-gray-200 duration-200 rounded-lg'>
                        <img className='bg-cover bg-center w-full h-3/4 rounded-lg' src='../../public/candle2.jpg' />
                        <h1 className='text-xl'>Jar Candles <FontAwesomeIcon onClick={() => navigate('/collections')} className='cursor-pointer' icon={faArrowRight}/> </h1>
                    </a>
                    
                </div>
            </div>

            <div className='h-full py-5 px-36 bg-orange-50'>
                    <h1 className='text-4xl mb-4'>Featured Candles</h1>
                    <h1 className='text-xl text-gray-500'>Our universally agreed, most loved products.</h1>
                    <div className='flex flex-wrap justify-between items-center mt-8'>
                        <div className='flex flex-wrap justify-center items-center gap-6'>
                            {/* <button onClick={() => setIsMostPopularActive(true)} 
                            className={`relative rounded-full border-2 border-orange-500 inline-flex items-center justify-start px-12 py-4 overflow-hidden font-medium transition-all hover:bg-white group ${!isMostPopularActive ? "bg-gray-200": "bg-white-500"}`}>
                            <span className="w-36 h-36 border-6 border-orange-700 rounded rotate-[-40deg] bg-orange-600 absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-6 ml-6 group-hover:ml-0 group-hover:mb-24 group-hover:translate-x-0"></span>
                            <span className="relative w-full text-center text-xl text-orange-500 transition-colors duration-300 ease-in-out group-hover:text-white uppercase">Most Popular</span>
                            </button> */}

                            {/* <button onClick={() => setIsMostPopularActive(false)} 
                            className={`relative rounded-full border-2 border-orange-500 inline-flex items-center justify-start px-12 py-4 overflow-hidden font-medium transition-all hover:bg-white group ${isMostPopularActive ? "bg-gray-200": "bg-white-500"}`}>
                            <span className={`w-36 h-36 border-6 border-orange-700 rounded rotate-[-40deg] ${isMostPopularActive ? "bg-orange-300" : "bg-orange-600"} absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-6 ml-6 group-hover:ml-0 group-hover:mb-24 group-hover:translate-x-0`}></span>
                            <span className="relative w-full text-center text-xl text-orange-500 transition-colors duration-300 ease-in-out group-hover:text-white uppercase">New Item</span>
                            </button> */}
                            <button onClick={() => setIsMostPopularActive(true)}  className={`duration-200 rounded-full text-xl uppercase ${!isMostPopularActive ? "bg-gray-200": "bg-orange-500"} border border-gray-300 px-6 py-2`}>Most Popular</button>
                            <button onClick={() => setIsMostPopularActive(false)} className={`duration-200 rounded-full text-xl uppercase ${isMostPopularActive ? "bg-gray-200": "bg-orange-500"} border border-gray-300 px-6 py-2`}>New Items</button>
                        </div>
                        {/* <button className='text-gray-500 border border-gray-500 hover:border-black px-6 py-2 rounded-lg'>View All</button> */}
                    </div>
                <div className="relative max-w-max overflow-x-hidden">
                    <button onClick={() => scrollBy('left')} className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md z-10">
                        <FaChevronLeft />
                    </button>
                    <div ref={scrollRef} className="flex space-x-4 py-5 px-3" style={{ overflow: 'hidden' }}>
                        {isMostPopularActive && Array(16).fill().map((_, index) => (
                            <div key={index} className="flex-shrink-0 sm:w-48 md:w-56 lg:w-72 px-5 py-5 bg-white rounded-lg shadow-lg hover:bg-gray-100 transition duration-300">
                                <img className="w-full h-64 object-cover rounded-t-lg" src='/candle3.jpg' alt='Product' />
                                <div className="p-3 text-center">
                                    <h1 className="text-gray-500 text-sm">AURA DECOR</h1>
                                    <h1 className="text-md font-semibold">AuraDecor Blue Premium Reed Diffuser Gift Set || Aroma Diffuser</h1>
                                </div>
                            </div>
                        ))}

                        {!isMostPopularActive && Array(16).fill().map((_, index) => (
                            <div key={index} className="flex-shrink-0 sm:w-48 md:w-56 lg:w-72 px-5 py-5 bg-white rounded-lg shadow-lg hover:bg-gray-100 transition duration-300">
                                <img className="w-full h-64 object-cover rounded-t-lg" src='/candle8.jpg' alt='Product' />
                                <div className="p-3 text-center">
                                    <h1 className="text-gray-500 text-sm">TEA LIGHT CANDLES</h1>
                                    <h1 className="text-md font-semibold">AuraDecor Blue Premium Reed Diffuser Gift Set || Aroma Diffuser</h1>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button onClick={() => scrollBy('right')} className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md z-10">
                        <FaChevronRight />
                    </button>
                </div>
            </div>

            <div className='h-full w-full py-10 px-36 bg-orange-50'>
                <h1 className='text-4xl uppercase'>Best Seller</h1>

                <div className=" shadow-md rounded-lg overflow-hidden bg-white mt-5 py-5">
                    <div className="lg:flex px-5">
                        <div className="lg:w-1/2   flex justify-center gap-5 items-center">
                            <img src={bestSellerProduct.image} alt={bestSellerProduct.name} className="w-full  h-96 object-cover transform transition-transform duration-300" />
                        </div>
                        <div className="lg:w-1/2 p-4">
                            <h2 className="text-3xl font-semibold mb-4">{bestSellerProduct.name}</h2>
                            <div className="flex items-center mb-4">
                                <span className="text-gray-500 line-through mr-2">Rs. {bestSellerProduct.originalPrice.toFixed(2)}</span>
                                <span className="text-2xl text-red-600 font-bold">Rs. {bestSellerProduct.salePrice.toFixed(2)}</span>
                                <span className="text-white bg-red-600 rounded-full px-3 py-1 ml-2">Sale</span>
                            </div>
                            <p className="text-gray-700 mb-4">{bestSellerProduct.description}</p>
                            <div className="mb-4">
                                <h3 className="text-xl font-semibold mb-2">Features:</h3>
                                <ul className="list-disc list-inside text-gray-700">
                                    {bestSellerProduct.features.map((feature, index) => (
                                        <li key={index}>{feature}</li>
                                    ))}
                                </ul>
                            </div>
                            <div className='flex justify-between items-center gap-3  border border-black w-36 mb-4'>
                                <div onClick={decreaseQuantity} className='border-r border-black text-center  px-4 py-2'>-</div>
                                <div className='py-2 px-2'>{productQuantity}</div>
                                <div onClick={increaseQuantity} className='border-l border-black text-center px-4 py-2'>+</div>
                            </div>
                            <div className="flex mb-4">
                                <button className="bg-orange-500 text-white px-6 py-2 rounded mr-2 hover:bg-orange-600">Add to Cart</button>
                                <button  className="bg-gray-800 text-white px-6 py-2 rounded hover:bg-gray-900">Buy Now</button>
                            </div>
                            
                        </div>
                    </div>
                    {
                        bestSellerProduct.reviews.length > 0 && 
                        <div className='px-5'>
                            <div>
                                <div className=''>
                                    <h3 className="text-xl font-semibold text-red-600 mb-2">Customer Reviews:</h3>
                                </div>
                            </div>
                            {
                                 !bestSellerAllReviews &&
                                <div className='ease-linear duration-200'>
                                    <div className="border-t border-gray-300 pt-4 mt-4">
                                        <div className="flex items-center mb-2">
                                            <div className="text-lg font-bold text-gray-800 mr-2">{bestSellerProduct?.reviews[0]?.user}</div>
                                            <div className="text-yellow-500">{Array(bestSellerProduct?.reviews[0]?.rating).fill('★').join('')}</div>
                                        </div>
                                        <p className="text-gray-700">{bestSellerProduct?.reviews[0]?.comment}</p>
                                    </div>
                                    <div className="border-t border-gray-300 pt-4 mt-4">
                                        <div className="flex items-center mb-2">
                                            <div className="text-lg font-bold text-gray-800 mr-2">{bestSellerProduct?.reviews[1]?.user}</div>
                                            <div className="text-yellow-500">{Array(bestSellerProduct?.reviews[1]?.rating).fill('★').join('')}</div>
                                        </div>
                                        <p className="text-gray-700">{bestSellerProduct?.reviews[1]?.comment}</p>
                                    </div>
                                    <button onClick={() => setBestSellerAllReviews(true)} className='flex justify-center items-center w-full '>
                                    <FaChevronDown  className='text-2xl'/>
                                    </button>
                                </div>
                            }
                            {
                                bestSellerAllReviews &&
                                <div className='ease-out duration-300'>
                                    {bestSellerProduct.reviews.map((review) => (
                                                <div key={review.id} className="border-t border-gray-300 pt-4 mt-4">
                                                    <div className="flex items-center mb-2">
                                                        <div className="text-lg font-bold text-gray-800 mr-2">{review.user}</div>
                                                        <div className="text-yellow-500">{Array(review.rating).fill('★').join('')}</div>
                                                    </div>
                                                    <p className="text-gray-700">{review.comment}</p>
                                                </div>
                                    ))}
                                    <button onClick={() => setBestSellerAllReviews(false)} className='flex justify-center items-center w-full '>
                                    <FaChevronUp  className='text-2xl'/>
                                    </button>
                                </div>
                            }
                        </div>
                    }
                </div>
            </div>
        
            <div className='h-full py-5 px-52 bg-orange-50'>
                <h1 className='text-4xl text-center'>Why to choose us?</h1>
                <div className="h-[30rem] rounded-md flex flex-col antialiased   items-center justify-center relative overflow-hidden">
            <InfiniteMovingCards
                items={testimonials}
                direction="right"
                speed="slow"
            />
    </div>
                {/* <div className='flex flex-wrap justify-center items-center mt-10 gap-10'>
                    <div className='p-5 bg-gray-100 w-60 h-48 rounded-lg'>
                        <div>
                            <h1 className='text-xl font-semibold'>Pure Materials</h1>
                            <h1 className='text-gray-500 '>Our candles feature premium waxes, essential oils, and natural fragrances for a clean, consistent burn and delightful scent.</h1>
                        </div>
                    </div>
                    <div className='p-5 bg-gray-100 w-60 h-48 rounded-lg'>
                        <div>
                            <h1 className='text-xl font-semibold'>Pure Materials</h1>
                            <h1 className='text-gray-500 '>Our candles feature premium waxes, essential oils, and natural fragrances for a clean, consistent burn and delightful scent.</h1>
                        </div>
                    </div>
                    <div className='p-5 bg-gray-100 w-60 h-48 rounded-lg'>
                        <div>
                            <h1 className='text-xl font-semibold'>Pure Materials</h1>
                            <h1 className='text-gray-500 '>Our candles feature premium waxes, essential oils, and natural fragrances for a clean, consistent burn and delightful scent.</h1>
                        </div>
                    </div>
                    <div className='p-5 bg-gray-100 w-60 h-48 rounded-lg'>
                        <div>
                            <h1 className='text-xl font-semibold'>Pure Materials</h1>
                            <h1 className='text-gray-500 '>Our candles feature premium waxes, essential oils, and natural fragrances for a clean, consistent burn and delightful scent.</h1>
                        </div>
                    </div>
                </div> */}
            </div>
            <div className="h-full flex items-center justify-center py-6 bg-orange-50">
            <div className="max-w-md p-8 bg-white rounded-lg shadow-lg text-center">
                <h1 className="text-3xl font-bold mb-4">Let&apos;s Stay In Touch</h1>
                <p className="text-gray-600 mb-8">Enjoy 10% off on your first purchase and be the first to know about offers, new releases, and latest stories.</p>
                <form className="mb-4">
                    <input
                        type="email"
                        className="w-full px-4 py-3 rounded-md bg-gray-200 focus:outline-none focus:bg-white focus:border-gray-300 mb-2"
                        placeholder="Enter your email address"
                    />
                    <button
                        type="submit"
                        className="w-full bg-orange-500 text-white py-3 rounded-md hover:bg-orange-600 transition duration-300"
                    >
                        Subscribe
                    </button>
                </form>
            </div>
            </div>
        </div>
    );
}




const testimonials = [
    {
      quote:
        "Our candles feature premium waxes, essential oils, and natural fragrances for a clean, consistent burn and delightful scent.",
    //   name: "Charles Dickens",
      title: "Pure Materials",
    },
    {
        quote:
          "Our candles feature premium waxes, essential oils, and natural fragrances for a clean, consistent burn and delightful scent.",
      //   name: "Charles Dickens",
        title: "Pure Materials",
      },
      {
        quote:
          "Our candles feature premium waxes, essential oils, and natural fragrances for a clean, consistent burn and delightful scent.",
      //   name: "Charles Dickens",
        title: "Pure Materials",
      },
      {
        quote:
          "Our candles feature premium waxes, essential oils, and natural fragrances for a clean, consistent burn and delightful scent.",
      //   name: "Charles Dickens",
        title: "Pure Materials",
      },
      {
        quote:
          "Our candles feature premium waxes, essential oils, and natural fragrances for a clean, consistent burn and delightful scent.",
      //   name: "Charles Dickens",
        title: "Pure Materials",
      },
      {
        quote:
          "Our candles feature premium waxes, essential oils, and natural fragrances for a clean, consistent burn and delightful scent.",
      //   name: "Charles Dickens",
        title: "Pure Materials",
      },
  ];
export default Home;

