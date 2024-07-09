
// import { useNavigate, useParams } from 'react-router-dom';
// import { useState } from 'react';

// const products = [
//     { id: 1, name: 'AuraDecor Fragrance Rose Heart Shape Tealight (Pack of 10)', originalPrice: 199.00, salePrice: 99.00, image: '/candle4.jpg', description: 'Inhaling rose fragrance has therapeutic aroma benefits that help fight depression, overcome anxiety, reduce stress and insomnia.', features: ['Set of 10 Tealight Candles', 'Rose Fragrance', 'Heart Shape', 'Perfect for Decoration and Gifting', 'Burn Time: Up to 4 hours each'], reviews: [{ id: 1, user: 'John Doe', rating: 5, comment: 'Amazing product! The fragrance is wonderful and lasts long.' }, { id: 2, user: 'Jane Smith', rating: 4, comment: 'Beautiful design and great scent, but the burning time could be longer.' }] },
//     { id: 2, name: 'Product 2', originalPrice: 799.00, salePrice: 699.00, image: '/candle6.jpg', description: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', features: ['Feature 1', 'Feature 2'], reviews: [{ id: 1, user: 'John Doe', rating: 5, comment: 'Great product!' }, { id: 2, user: 'Jane Smith', rating: 4, comment: 'Good value for money.' }] },
//     { id: 3, name: 'Product 3', originalPrice: 999.00, salePrice: 899.00, image: '/candle7.jpg', description: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', features: ['Feature 1', 'Feature 2'], reviews: [{ id: 1, user: 'John Doe', rating: 5, comment: 'Fantastic!' }, { id: 2, user: 'Jane Smith', rating: 4, comment: 'Very nice.' }] },
//     { id: 4, name: 'Product 4', originalPrice: 299.00, salePrice: 229.00, image: '/candle8.jpg', description: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', features: ['Feature 1', 'Feature 2'], reviews: [{ id: 1, user: 'John Doe', rating: 5, comment: 'Excellent!' }, { id: 2, user: 'Jane Smith', rating: 4, comment: 'Quite good.' }] },
// ];

// const ProductDetails = () => {
//     const { productId } = useParams();
//     const [productQuantity, setProductQuantity] = useState(1);
//     const navigate = useNavigate();

//     const product = products.find(p => p.id === parseInt(productId));

//     if (!product) {
//         return <div>Product not found</div>;
//     }

  

//     const increaseQuantity = () => {
//         setProductQuantity(productQuantity+1);
//     }

//     const decreaseQuantity = () => {
//         if(productQuantity > 0) setProductQuantity(productQuantity-1);
//     }

//     return (
//         <div className="container mx-auto px-6 py-8">
//             <div className="bg-white shadow-md rounded-lg overflow-hidden">
//                 <div className="lg:flex">
//                     <div className="lg:w-1/2 p-4">
//                         <img src={product.image} alt={product.name} className="w-[80%]  h-80 object-cover transform transition-transform duration-300 hover:scale-105" />
//                     </div>
//                     <div className="lg:w-1/2 p-4">
//                         <h2 className="text-3xl font-semibold mb-4">{product.name}</h2>
//                         <div className="flex items-center mb-4">
//                             <span className="text-gray-500 line-through mr-2">Rs. {product.originalPrice.toFixed(2)}</span>
//                             <span className="text-2xl text-red-600 font-bold">Rs. {product.salePrice.toFixed(2)}</span>
//                             <span className="text-white bg-red-600 rounded-full px-3 py-1 ml-2">Sale</span>
//                         </div>
//                         <p className="text-gray-700 mb-4">{product.description}</p>
//                         <div className="mb-4">
//                             <h3 className="text-xl font-semibold mb-2">Features:</h3>
//                             <ul className="list-disc list-inside text-gray-700">
//                                 {product.features.map((feature, index) => (
//                                     <li key={index}>{feature}</li>
//                                 ))}
//                             </ul>
//                         </div>
//                         <div className='flex justify-between items-center gap-3  border border-black w-36 mb-4'>
//                             <div onClick={decreaseQuantity} className='border-r border-black text-center  px-4 py-2'>-</div>
//                             <div className='py-2 px-2'>{productQuantity}</div>
//                             <div onClick={increaseQuantity} className='border-l border-black text-center px-4 py-2'>+</div>
//                         </div>
//                         <div className="flex mb-4">
//                             <button className="bg-orange-500 text-white px-6 py-2 rounded mr-2 hover:bg-orange-600">Add to Cart</button>
//                             <button  className="bg-gray-800 text-white px-6 py-2 rounded hover:bg-gray-900">Buy Now</button>
//                         </div>
//                         <div>
//                             <h3 className="text-xl font-semibold text-red-600 mb-2">Customer Reviews:</h3>
//                             {product.reviews.map((review) => (
//                                 <div key={review.id} className="border-t border-gray-300 pt-4 mt-4">
//                                     <div className="flex items-center mb-2">
//                                         <div className="text-lg font-bold text-gray-800 mr-2">{review.user}</div>
//                                         <div className="text-yellow-500">{Array(review.rating).fill('★').join('')}</div>
//                                     </div>
//                                     <p className="text-gray-700">{review.comment}</p>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ProductDetails;
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';

// Updated product data for AuraDecor Desk Flame Humidifier
const products = [
  {
    id: 1,
    name: 'AuraDecor Desk Flame Humidifier Flat With Essential Oil',
    originalPrice: 3599.00,
    salePrice: 1599.00,
    image: '../../public/candle6.jpg', // Update the path to your product image
    description: 'The combination of light and mist produces a realistic flame effect, just like a flame burning in a fireplace.',
    features: [
      'Flame Effect: Produces a realistic flame effect.',
      'Multifunction: 350ml air humidifier, USB humidifier.',
      'Multicolour: Comes with different color flames.',
      'Smart Diffuser: Emits a comfortable stream of cool temperature.',
      'Multipurpose: Can be used as a mist diffuser/humidifier.',
    ],
    reviews: [
      {
        id: 1,
        user: 'R.K Jain',
        rating: 5,
        comment: 'Its nice model. Working well.',
      },
    ],
  },
  {
    id: 2,
    name: 'AuraDecor Desk Flame Humidifier Flat With Essential Oil',
    originalPrice: 3599.00,
    salePrice: 1599.00,
    image: '../../public/candle6.jpg', // Update the path to your product image
    description: 'The combination of light and mist produces a realistic flame effect, just like a flame burning in a fireplace.',
    features: [
      'Flame Effect: Produces a realistic flame effect.',
      'Multifunction: 350ml air humidifier, USB humidifier.',
      'Multicolour: Comes with different color flames.',
      'Smart Diffuser: Emits a comfortable stream of cool temperature.',
      'Multipurpose: Can be used as a mist diffuser/humidifier.',
    ],
    reviews: [
      {
        id: 1,
        user: 'R.K Jain',
        rating: 5,
        comment: 'Its nice model. Working well.',
      },
    ],
  },
  {
    id: 3,
    name: 'AuraDecor Desk Flame Humidifier Flat With Essential Oil',
    originalPrice: 3599.00,
    salePrice: 1599.00,
    image: '../../public/candle6.jpg', // Update the path to your product image
    description: 'The combination of light and mist produces a realistic flame effect, just like a flame burning in a fireplace.',
    features: [
      'Flame Effect: Produces a realistic flame effect.',
      'Multifunction: 350ml air humidifier, USB humidifier.',
      'Multicolour: Comes with different color flames.',
      'Smart Diffuser: Emits a comfortable stream of cool temperature.',
      'Multipurpose: Can be used as a mist diffuser/humidifier.',
    ],
    reviews: [
      {
        id: 1,
        user: 'R.K Jain',
        rating: 5,
        comment: 'Its nice model. Working well.',
      },
    ],
  },
  {
    id: 4,
    name: 'AuraDecor Desk Flame Humidifier Flat With Essential Oil',
    originalPrice: 3599.00,
    salePrice: 1599.00,
    image: '../../public/candle6.jpg', // Update the path to your product image
    description: 'The combination of light and mist produces a realistic flame effect, just like a flame burning in a fireplace.',
    features: [
      'Flame Effect: Produces a realistic flame effect.',
      'Multifunction: 350ml air humidifier, USB humidifier.',
      'Multicolour: Comes with different color flames.',
      'Smart Diffuser: Emits a comfortable stream of cool temperature.',
      'Multipurpose: Can be used as a mist diffuser/humidifier.',
    ],
    reviews: [
      {
        id: 1,
        user: 'R.K Jain',
        rating: 5,
        comment: 'Its nice model. Working well.',
      },
    ],
  },
  {
    id: 5,
    name: 'AuraDecor Desk Flame Humidifier Flat With Essential Oil',
    originalPrice: 3599.00,
    salePrice: 1599.00,
    image: '../../public/candle6.jpg', // Update the path to your product image
    description: 'The combination of light and mist produces a realistic flame effect, just like a flame burning in a fireplace.',
    features: [
      'Flame Effect: Produces a realistic flame effect.',
      'Multifunction: 350ml air humidifier, USB humidifier.',
      'Multicolour: Comes with different color flames.',
      'Smart Diffuser: Emits a comfortable stream of cool temperature.',
      'Multipurpose: Can be used as a mist diffuser/humidifier.',
    ],
    reviews: [
      {
        id: 1,
        user: 'R.K Jain',
        rating: 5,
        comment: 'Its nice model. Working well.',
      },
    ],
  },
];

const ProductDetails = () => {
  const { productId } = useParams();
  const [productQuantity, setProductQuantity] = useState(1);
  const navigate = useNavigate();

  const product = products.find((p) => p.id === parseInt(productId));

  if (!product) {
    return <div>Product not found</div>;
  }

  const increaseQuantity = () => {
    setProductQuantity(productQuantity + 1);
  };

  const decreaseQuantity = () => {
    if (productQuantity > 0) setProductQuantity(productQuantity - 1);
  };

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="lg:flex">
          <div className="lg:w-1/2 p-4">
            <img
              src={product.image}
              alt={product.name}
              className="w-[80%] h-80 object-cover transform transition-transform duration-300 hover:scale-105"
            />
            {/* Additional images */}
            <div className="grid grid-cols-2 gap-4 mt-4">
              <img src="" alt="Product" className="object-cover h-40 w-full" />
              <img src="../../public/candle6.jpg" alt="Product" className="object-cover h-40 w-full" />
            </div>
          </div>
          <div className="lg:w-1/2 p-4">
            <h2 className="text-3xl font-semibold mb-4">{product.name}</h2>
            <div className="flex items-center mb-4">
              <span className="text-gray-500 line-through mr-2">
                Rs. {product.originalPrice.toFixed(2)}
              </span>
              <span className="text-2xl text-red-600 font-bold">
                Rs. {product.salePrice.toFixed(2)}
              </span>
              <span className="text-white bg-red-600 rounded-full px-3 py-1 ml-2">Sale</span>
            </div>
            <p className="text-gray-700 mb-4">{product.description}</p>
            <div className="mb-4">
              <h3 className="text-xl font-semibold mb-2">Features:</h3>
              <ul className="list-disc list-inside text-gray-700">
                {product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
            <div className="flex justify-between items-center gap-3 border border-black w-36 mb-4">
              <div onClick={decreaseQuantity} className="border-r border-black text-center px-4 py-2">
                -
              </div>
              <div className="py-2 px-2">{productQuantity}</div>
              <div onClick={increaseQuantity} className="border-l border-black text-center px-4 py-2">
                +
              </div>
            </div>
            <div className="flex mb-4">
              <button className="bg-orange-500 text-white px-6 py-2 rounded mr-2 hover:bg-orange-600">
                Add to Cart
              </button>
              <button className="bg-gray-800 text-white px-6 py-2 rounded hover:bg-gray-900">
                Buy Now
              </button>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-red-600 mb-2">Customer Reviews:</h3>
              {product.reviews.map((review) => (
                <div key={review.id} className="border-t border-gray-300 pt-4 mt-4">
                  <div className="flex items-center mb-2">
                    <div className="text-lg font-bold text-gray-800 mr-2">{review.user}</div>
                    <div className="text-yellow-500">{Array(review.rating).fill('★').join('')}</div>
                  </div>
                  <p className="text-gray-700">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">You may also like</h3>
          <div className="grid grid-cols-4 gap-4">
            {/* Add similar products here */}
            <div className="bg-white shadow-md rounded-lg p-4">
              <img src="../../public/candle6.jpg" alt="Related Product" className="object-cover h-40 w-full" />
              <h4 className="text-lg font-semibold mt-2">Related Product 1</h4>
              <span className="text-red-600 font-bold">Rs. 1,000.00</span>
            </div>
            <div className="bg-white shadow-md rounded-lg p-4">
              <img src="../../public/candle6.jpg" alt="Related Product" className="object-cover h-40 w-full" />
              <h4 className="text-lg font-semibold mt-2">Related Product 2</h4>
              <span className="text-red-600 font-bold">Rs. 1,200.00</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
