import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

function Home() {
    const navigate = useNavigate();
    // const[newArrival, setNewArrival] = useState(true);
    // const[bestSeller, setBestSeller] = useState(false);
    return (
        <div className='w-full h-full text-black'>
            <div className='relative min-h-screen'>
                <div
                    className="bg-cover bg-center absolute inset-0"
                    style={{
                        backgroundImage: `url("../../public/candle2.webp")`,
                    }}
                ></div>

                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-white text-center">
                        <h1 className="text-4xl font-bold">Luxury For Every Home</h1>
                        <h3 className="text-lg">Stay one step ahead in the world of Aroma & Candles.</h3>
                        <button onClick={() => navigate("/categories")} className="bg-white text-red-600 px-4 py-2 mt-4 rounded-full">Shop</button>
                    </div>
                </div>
            </div>
            <div className='h-full py-5 px-52'>
                <h1 className='text-6xl'>Our Categories</h1>
                <div className='py-10 flex flex-wrap justify-center items-center gap-8'>
                    <card className='flex flex-col justify-center items-center'>
                        <img className='bg-contain bg-center w-56 h-56 rounded-full' src='../../public/candle1.jpeg' />
                        <h1 className='text-xl'>Pillar Candles <FontAwesomeIcon onClick={() => navigate('/collections')} className='cursor-pointer' icon={faArrowRight}/> </h1>
                    </card>
                    <card className='flex flex-col justify-center items-center'>
                        <img className='bg-contain bg-center w-56 h-56 rounded-full' src='../../public/candle1.jpeg' />
                        <h1 className='text-xl'>Pillar Candles <FontAwesomeIcon onClick={() => navigate('/collections')} className='cursor-pointer' icon={faArrowRight}/> </h1>
                    </card>
                    <card className='flex flex-col justify-center items-center'>
                        <img className='bg-contain bg-center w-56 h-56 rounded-full' src='../../public/candle1.jpeg' />
                        <h1 className='text-xl'>Pillar Candles <FontAwesomeIcon onClick={() => navigate('/collections')} className='cursor-pointer' icon={faArrowRight}/> </h1>
                    </card>
                    <card className='flex flex-col justify-center items-center'>
                        <img className='bg-contain bg-center w-56 h-56 rounded-full' src='../../public/candle1.jpeg' />
                        <h1 className='text-xl'>Pillar Candles <FontAwesomeIcon onClick={() => navigate('/collections')} className='cursor-pointer' icon={faArrowRight}/> </h1>
                    </card>
                    <card className='flex flex-col justify-center items-center'>
                        <img className='bg-contain bg-center w-56 h-56 rounded-full' src='../../public/candle1.jpeg' />
                        <h1 className='text-xl'>Pillar Candles <FontAwesomeIcon onClick={() => navigate('/collections')} className='cursor-pointer' icon={faArrowRight}/> </h1>
                    </card>
                    <card className='flex flex-col justify-center items-center'>
                        <img className='bg-contain bg-center w-56 h-56 rounded-full' src='../../public/candle1.jpeg' />
                        <h1 className='text-xl'>Pillar Candles <FontAwesomeIcon onClick={() => navigate('/collections')} className='cursor-pointer' icon={faArrowRight}/> </h1>
                    </card>
                    <card className='flex flex-col justify-center items-center'>
                        <img className='bg-contain bg-center w-56 h-56 rounded-full' src='../../public/candle1.jpeg' />
                        <h1 className='text-xl'>Pillar Candles <FontAwesomeIcon onClick={() => navigate('/collections')} className='cursor-pointer' icon={faArrowRight}/> </h1>
                    </card>
                    <card className='flex flex-col justify-center items-center'>
                        <img className='bg-contain bg-center w-56 h-56 rounded-full' src='../../public/candle1.jpeg' />
                        <h1 className='text-xl'>Pillar Candles <FontAwesomeIcon onClick={() => navigate('/collections')} className='cursor-pointer' icon={faArrowRight}/> </h1>
                    </card>
                </div>
            </div>
            <div className='h-full py-5 px-52'>
                    <h1 className='text-4xl mb-4'>Featured Candles</h1>
                    <h1 className='text-xl text-gray-500'>Our universally agreed, most loved products.</h1>
                    <div className='flex flex-wrap justify-between items-center mt-8'>
                        <div className='flex flex-wrap justify-center items-center'>
                            <button className='text-2xl'>BEST SELLERS</button>
                        </div>
                        <button className='text-gray-500 border border-gray-500 hover:border-black px-6 py-2 rounded-lg'>View All</button>
                    </div>
                    <div className='mt-12 flex flex-wrap justify-center items-center gap-12'>
                        <div className="px-3 py-5 w-72 hover:bg-gray-200 duration-200 rounded-lg flex flex-col justify-center items-center">
                            <img className='bg-contain bg-center w-64 h-64 rounded-full' src='../../public/featured1.webp' />
                            <h1 className='text-gray-400 text-md'>AURA DECOR</h1>
                            <h1 className='text-lg text-center'>AuraDecor Blue Premium Reed Diffuser Gift Set || Aroma Diffuser</h1>
                        </div>
                        <div className="px-3 py-5 w-72 hover:bg-gray-200 duration-200 rounded-lg flex flex-col justify-center items-center">
                            <img className='bg-contain bg-center w-64 h-64 rounded-full' src='../../public/featured1.webp' />
                            <h1 className='text-gray-400 text-md'>AURA DECOR</h1>
                            <h1 className='text-lg text-center'>AuraDecor Blue Premium Reed Diffuser Gift Set || Aroma Diffuser</h1>
                        </div>
                        <div className="px-3 py-5 w-72 hover:bg-gray-200 duration-200 rounded-lg flex flex-col justify-center items-center">
                            <img className='bg-contain bg-center w-64 h-64 rounded-full' src='../../public/featured1.webp' />
                            <h1 className='text-gray-400 text-md'>AURA DECOR</h1>
                            <h1 className='text-lg text-center'>AuraDecor Blue Premium Reed Diffuser Gift Set || Aroma Diffuser</h1>
                        </div>
                    </div>
            </div>
            <div className='h-full py-5 px-52'>
                <h1 className='text-4xl text-center'>Why to choose us?</h1>
                <div className='flex flex-wrap justify-center items-center mt-10 gap-10'>
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
                </div>
            </div>
            <div className="h-full mt-10 flex items-center justify-center">
            <div className="max-w-md p-8 bg-white rounded-lg shadow-lg text-center">
                <h1 className="text-3xl font-bold mb-4">Let's Stay In Touch</h1>
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

export default Home;
