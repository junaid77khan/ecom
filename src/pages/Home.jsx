import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import React, { useRef, useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { InfiniteMovingCards } from '../components/ui/infinite-moving-cards';


function Home() {
    const navigate = useNavigate();
    const scrollRef = useRef(null);

    const[isMostPopularActive, setIsMostPopularActive] = useState(true);

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
                        <h1 className="text-6xl font-bold">Luxury For Every Home</h1>
                        <h3 className="text-xl py-2 pb-8">Stay one step ahead in the world of Aroma & Candles.</h3>
                        {/* <button onClick={() => navigate("/categories")} className="bg-white text-red-600 px-4 py-2 mt-4 rounded-full">Shop</button> */}
                        <button    onClick={() => navigate("/categories")} className="relative  rounded-full  border-2 border-orange-500   inline-flex items-center justify-start px-16 py-5 overflow-hidden font-medium transition-all bg-white  hover:bg-white group">
<span className="w-48 h-48 border-8 border-orange-700  rounded rotate-[-40deg] bg-orange-600 absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
<span className="relative w-full text-center text-2xl text-orange-500 transition-colors duration-300 ease-in-out group-hover:text-white">Shop</span>
</button>
                    </div>
                </div>
            </div>
            <div className='h-full py-10 px-52 w-full'>
                <h1 className='text-6xl'>Our Categories</h1>

                <div className='flex flex-wrap justify-center items-center gap-8 mt-5 py-5'>
            
                    <a href='/categories/Pillar Candles' className='flex flex-col justify-center items-start gap-3 w-72 h-96 px-4 py-6   hover:bg-gray-200 duration-200 rounded-lg'>
                        <img className='bg-cover bg-center w-full h-3/4 rounded-lg' src='../../public/candle6.jpg' />
                        <h1 className='text-xl'>Pillar Candles <FontAwesomeIcon onClick={() => navigate('/collections')} className='cursor-pointer' icon={faArrowRight}/> </h1>
                    </a>
                    <a href='/categories/Tea Light Candles' className='flex flex-col justify-center items-start gap-3 w-72 h-96 px-4 py-6   hover:bg-gray-200 duration-200 rounded-lg'>
                        <img className='bg-cover bg-center w-full h-3/4 rounded-lg' src='../../public/candle8.jpg' />
                        <h1 className='text-xl'>Tea Light Candles <FontAwesomeIcon onClick={() => navigate('/collections')} className='cursor-pointer' icon={faArrowRight}/> </h1>
                    </a>
                    <a href='/categories/Jar Candles' className='flex flex-col justify-center items-start gap-3 w-72 h-96 px-4 py-6   hover:bg-gray-200 duration-200 rounded-lg'>
                        <img className='bg-cover bg-center w-full h-3/4 rounded-lg' src='../../public/candle2.jpg' />
                        <h1 className='text-xl'>Jar Candles <FontAwesomeIcon onClick={() => navigate('/collections')} className='cursor-pointer' icon={faArrowRight}/> </h1>
                    </a>
                    
                </div>
            </div>

            <div className='h-full py-5 px-52'>
                    <h1 className='text-4xl mb-4'>Featured Candles</h1>
                    <h1 className='text-xl text-gray-500'>Our universally agreed, most loved products.</h1>
                    <div className='flex flex-wrap justify-between items-center mt-8'>
                        <div className='flex flex-wrap justify-center items-center gap-6'>
                            <button onClick={() => setIsMostPopularActive(true)}  className={`duration-200 text-xl uppercase ${!isMostPopularActive ? "bg-gray-200": "bg-red-500"} border border-gray-300 px-6 py-1`}>Most Popular</button>
                            <button onClick={() => setIsMostPopularActive(false)} className={`duration-200 text-xl uppercase ${isMostPopularActive ? "bg-gray-200": "bg-red-500"} border border-gray-300 px-6 py-1`}>New Items</button>
                        </div>
                        {/* <button className='text-gray-500 border border-gray-500 hover:border-black px-6 py-2 rounded-lg'>View All</button> */}
                    </div>
                <div className="relative max-w-max overflow-x-hidden">
                    <button onClick={() => scrollBy('left')} className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md z-10">
                        <FaChevronLeft />
                    </button>
                    <div ref={scrollRef} className="flex space-x-4 py-5 px-3" style={{ overflow: 'hidden' }}>
                        {isMostPopularActive && Array(16).fill().map((_, index) => (
                            <div key={index} className="flex-shrink-0 w-64 sm:w-48 md:w-56 lg:w-64 p-2 bg-white rounded-lg shadow-lg hover:bg-gray-100 transition duration-300">
                                <img className="w-full h-64 object-cover rounded-t-lg" src='/candle3.jpg' alt='Product' />
                                <div className="p-3 text-center">
                                    <h1 className="text-gray-500 text-sm">AURA DECOR</h1>
                                    <h1 className="text-md font-semibold">AuraDecor Blue Premium Reed Diffuser Gift Set || Aroma Diffuser</h1>
                                </div>
                            </div>
                        ))}

                        {!isMostPopularActive && Array(16).fill().map((_, index) => (
                            <div key={index} className="flex-shrink-0 w-64 sm:w-48 md:w-56 lg:w-64 p-2 bg-white rounded-lg shadow-lg hover:bg-gray-100 transition duration-300">
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
            <div className='h-full py-5 px-52'>
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
            <div className="h-full mt-10 flex items-center justify-center py-6">
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
                        className="w-full bg-red-600 text-white py-3 rounded-md hover:bg-red-700 transition duration-300"
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
