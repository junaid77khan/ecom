import { useNavigate } from "react-router-dom";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/cartSlice";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { bestSellerProduct } from "../../data/HomeData";

const BestSeller = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [bestSellerAllReviews, setBestSellerAllReviews] = useState(false);

  const [productQuantity, setProductQuantity] = useState(1);

  const [activeButton, setActiveButton] = useState("");

  const increaseQuantity = () => {
    setProductQuantity(productQuantity + 1);
    setActiveButton("increase");
    setTimeout(() => setActiveButton(""), 200);
  };

  const decreaseQuantity = () => {
    if (productQuantity > 0) {
      setProductQuantity(productQuantity - 1);
      setActiveButton("decrease");
      setTimeout(() => setActiveButton(""), 200);
    }
  };

  const handleAddToCart = () => {
    const obj = { ...bestSellerProduct, quantity: productQuantity };
    dispatch(addToCart({ product: obj }));
  };
  return (
    // <div className="h-full w-full py-10 px-24 bg-orange-50">
    //   <div>
    //     <button
    //       className={`duration-200 rounded-full text-xl uppercase bg-orange-500 text-white  border border-gray-300 px-6 py-2`}
    //     >
    //       Best Seller
    //     </button>
    //   </div>

    //   <div className=" shadow-md rounded-lg overflow-hidden bg-white mt-5 py-6">
    //     <div className="lg:flex px-5">
    //       <div className="lg:w-1/2  flex flex-col justify-start items-center gap-2">
    //         <img
    //           src={bestSellerProduct.images[0]}
    //           alt={bestSellerProduct.name}
    //           className="w-full rounded-xl  h-96 object-cover bg-center transform transition-transform duration-300"
    //         />

    //         <div className="relative overflow-x-hidden">
    //           <div
    //             className="flex gap-5 py-5 px-3"
    //             style={{ overflow: "hidden" }}
    //           >
    //             <img
    //               src={bestSellerProduct.images[1]}
    //               alt={bestSellerProduct.name}
    //               className=" h-72 w-72  object-cover transform transition-transform duration-300 rounded-xl"
    //             />
    //             <img
    //               src={bestSellerProduct.images[2]}
    //               alt={bestSellerProduct.name}
    //               className="w-72 h-72 object-cover transform transition-transform duration-300 rounded-xl"
    //             />
    //             <img
    //               src={bestSellerProduct.images[3]}
    //               alt={bestSellerProduct.name}
    //               className="w-72 h-72 object-cover transform transition-transform duration-300 rounded-xl"
    //             />
    //           </div>
    //         </div>
    //       </div>

    //       <div className="lg:w-1/2 p-4">
    //         <h2 className="text-3xl font-semibold mb-4">
    //           {bestSellerProduct.name}
    //         </h2>
    //         {/* ... (existing price display) */}
    //         <p className="text-gray-700 mb-4">
    //           {bestSellerProduct.description}
    //         </p>
    //         <div className="mb-4">
    //           <h3 className="text-xl font-semibold mb-2">Features:</h3>
    //           <ul className="list-disc list-inside text-gray-700">
    //             {bestSellerProduct.features.map((feature, index) => (
    //               <li key={index}>{feature}</li>
    //             ))}
    //           </ul>
    //         </div>

    //         <div className="flex items-center mb-4">
    //           <div className="mr-4">Quantity:</div>
    //           <div className="flex border border-gray-300 rounded">
    //             <button
    //               onClick={decreaseQuantity}
    //               className="px-3 py-1 bg-gray-100"
    //             >
    //               -
    //             </button>
    //             <div className="px-3 py-1">{productQuantity}</div>
    //             <button
    //               onClick={increaseQuantity}
    //               className="px-3 py-1 bg-gray-100"
    //             >
    //               +
    //             </button>
    //           </div>
    //         </div>
    //         <div className="flex mb-4 gap-2">
    //           <button
    //             onClick={handleAddToCart}
    //             className="relative rounded-lg border-2 inline-flex items-center justify-start px-6 py-2 overflow-hidden font-medium transition-all bg-orange-500 hover:bg-orange-500 hover:border-orange-500 group"
    //           >
    //             <span className="w-40 h-40 rounded rotate-[-40deg] bg-white absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-6 ml-6 group-hover:ml-0 group-hover:mb-24 group-hover:translate-x-0"></span>
    //             <span className="relative w-full text-center text-md text-white transition-colors duration-300 ease-in-out group-hover:text-orange-500">
    //               Add to cart
    //             </span>
    //           </button>
    //           <button
    //             onClick={() =>
    //               navigate(`/product/${bestSellerProduct.id}/checkout`, {
    //                 state: bestSellerProduct,
    //               })
    //             }
    //             className="relative rounded-lg border-2 border-orange-500 inline-flex items-center justify-start px-6 py-2 overflow-hidden font-medium transition-all bg-white hover:bg-white hover:border-white group"
    //           >
    //             <span className="w-40 h-40 rounded rotate-[-40deg] bg-orange-500 absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-6 ml-6 group-hover:ml-0 group-hover:mb-24 group-hover:translate-x-0"></span>
    //             <span className="relative w-full text-center text-md text-orange-500 transition-colors duration-300 ease-in-out group-hover:text-white">
    //               Buy now
    //             </span>
    //           </button>
    //         </div>
    //         {/* ... (existing quantity selector and buttons) */}
    //         <div className="mt-6">
    //           <h3 className="text-xl font-semibold mb-2">Specifications:</h3>
    //           <table className="w-full border-collapse">
    //             <tbody>
    //               <tr className="border-b">
    //                 <td className="py-2 font-semibold">Capacity:</td>
    //                 <td className="py-2">500 ml</td>
    //               </tr>
    //               <tr className="border-b">
    //                 <td className="py-2 font-semibold">Power:</td>
    //                 <td className="py-2">24W</td>
    //               </tr>
    //               <tr className="border-b">
    //                 <td className="py-2 font-semibold">Weight:</td>
    //                 <td className="py-2">1.2 kg</td>
    //               </tr>
    //             </tbody>
    //           </table>
    //         </div>
    //       </div>
    //     </div>
    //     {bestSellerProduct.reviews.length > 0 && (
    //       <div className="px-5">
    //         <div>
    //           <div className="">
    //             <h3 className="text-xl font-semibold text-red-600 mb-2">
    //               Customer Reviews:
    //             </h3>
    //           </div>
    //         </div>
    //         {!bestSellerAllReviews && (
    //           <div className="ease-linear duration-200">
    //             <div className="border-t border-gray-300 pt-4 mt-4">
    //               <div className="flex items-center mb-2">
    //                 <div className="text-lg font-bold text-gray-800 mr-2">
    //                   {bestSellerProduct?.reviews[0]?.user}
    //                 </div>
    //                 <div className="text-yellow-500">
    //                   {Array(bestSellerProduct?.reviews[0]?.rating)
    //                     .fill("★")
    //                     .join("")}
    //                 </div>
    //               </div>
    //               <p className="text-gray-700">
    //                 {bestSellerProduct?.reviews[0]?.comment}
    //               </p>
    //             </div>
    //             <div className="border-t border-gray-300 pt-4 mt-4">
    //               <div className="flex items-center mb-2">
    //                 <div className="text-lg font-bold text-gray-800 mr-2">
    //                   {bestSellerProduct?.reviews[1]?.user}
    //                 </div>
    //                 <div className="text-yellow-500">
    //                   {Array(bestSellerProduct?.reviews[1]?.rating)
    //                     .fill("★")
    //                     .join("")}
    //                 </div>
    //               </div>
    //               <p className="text-gray-700">
    //                 {bestSellerProduct?.reviews[1]?.comment}
    //               </p>
    //             </div>
    //             <button
    //               onClick={() => setBestSellerAllReviews(true)}
    //               className="flex justify-center items-center w-full "
    //             >
    //               <FaChevronDown className="text-2xl" />
    //             </button>
    //           </div>
    //         )}
    //         {bestSellerAllReviews && (
    //           <div className="ease-out duration-300">
    //             {bestSellerProduct.reviews.map((review) => (
    //               <div
    //                 key={review.id}
    //                 className="border-t border-gray-300 pt-4 mt-4"
    //               >
    //                 <div className="flex items-center mb-2">
    //                   <div className="text-lg font-bold text-gray-800 mr-2">
    //                     {review.user}
    //                   </div>
    //                   <div className="text-yellow-500">
    //                     {Array(review.rating).fill("★").join("")}
    //                   </div>
    //                 </div>
    //                 <p className="text-gray-700">{review.comment}</p>
    //               </div>
    //             ))}
    //             <button
    //               onClick={() => setBestSellerAllReviews(false)}
    //               className="flex justify-center items-center w-full "
    //             >
    //               <FaChevronUp className="text-2xl" />
    //             </button>
    //           </div>
    //         )}
    //       </div>
    //     )}
    //   </div>
    // </div>
    <div className="h-full w-full py-10 px-4 sm:px-6 md:px-10 lg:px-24 bg-orange-50 overflow-hidden">
      <div>
        <button className="duration-200 rounded-full text-xl uppercase bg-orange-500 text-white border border-gray-300 px-6 py-2">
          Best Seller
        </button>
      </div>

      <div className="shadow-md rounded-lg overflow-hidden bg-white mt-5 py-6">
        <div className="lg:flex px-5">
          <div className="lg:w-1/2 flex flex-col justify-start items-center gap-2">
            <img
              src={bestSellerProduct.images[0]}
              alt={bestSellerProduct.name}
              className="w-full rounded-xl h-48 sm:h-64 md:h-80 lg:h-96 object-cover bg-center transform transition-transform duration-300"
            />

            <div className="relative overflow-x-hidden">
              <div
                className="flex gap-5 py-5 px-3"
                style={{ overflow: "hidden" }}
              >
                <img
                  src={bestSellerProduct.images[1]}
                  alt={bestSellerProduct.name}
                  className="h-36 w-36 sm:h-48 sm:w-48 md:h-56 md:w-56 lg:h-72 lg:w-72 object-cover transform transition-transform duration-300 rounded-xl"
                />
                <img
                  src={bestSellerProduct.images[2]}
                  alt={bestSellerProduct.name}
                  className="h-36 w-36 sm:h-48 sm:w-48 md:h-56 md:w-56 lg:h-72 lg:w-72 object-cover transform transition-transform duration-300 rounded-xl"
                />
                <img
                  src={bestSellerProduct.images[3]}
                  alt={bestSellerProduct.name}
                  className="h-36 w-36 sm:h-48 sm:w-48 md:h-56 md:w-56 lg:h-72 lg:w-72 object-cover transform transition-transform duration-300 rounded-xl"
                />
              </div>
            </div>
          </div>

          <div className="lg:w-1/2 p-4">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-3xl font-semibold mb-4">
              {bestSellerProduct.name}
            </h2>
            <p className="text-gray-700 mb-4">
              {bestSellerProduct.description}
            </p>
            <div className="mb-4">
              <h3 className="text-xl font-semibold mb-2">Features:</h3>
              <ul className="list-disc list-inside text-gray-700">
                {bestSellerProduct.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>

            <div className="flex items-center mb-4">
              <div className="mr-4">Quantity:</div>
              <div className="flex border border-gray-300 rounded">
                <button
                  onClick={decreaseQuantity}
                  className="px-2 sm:px-3 py-1 bg-gray-100"
                >
                  -
                </button>
                <div className="px-2 sm:px-3 py-1">{productQuantity}</div>
                <button
                  onClick={increaseQuantity}
                  className="px-2 sm:px-3 py-1 bg-gray-100"
                >
                  +
                </button>
              </div>
            </div>
            <div className="flex mb-4 gap-2">
              <button
                onClick={handleAddToCart}
                className="relative rounded-lg border-2 inline-flex items-center justify-start px-4 py-2 sm:px-6 sm:py-2 overflow-hidden font-medium transition-all bg-orange-500 hover:bg-orange-500 hover:border-orange-500 group"
              >
                <span className="w-40 h-40 rounded rotate-[-40deg] bg-white absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-6 ml-6 group-hover:ml-0 group-hover:mb-24 group-hover:translate-x-0"></span>
                <span className="relative w-full text-center text-md text-white transition-colors duration-300 ease-in-out group-hover:text-orange-500">
                  Add to cart
                </span>
              </button>
              <button
                onClick={() =>
                  navigate(`/product/${bestSellerProduct.id}/checkout`, {
                    state: bestSellerProduct,
                  })
                }
                className="relative rounded-lg border-2 border-orange-500 inline-flex items-center justify-start px-4 py-2 sm:px-6 sm:py-2 overflow-hidden font-medium transition-all bg-white hover:bg-white hover:border-white group"
              >
                <span className="w-40 h-40 rounded rotate-[-40deg] bg-orange-500 absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-6 ml-6 group-hover:ml-0 group-hover:mb-24 group-hover:translate-x-0"></span>
                <span className="relative w-full text-center text-md text-orange-500 transition-colors duration-300 ease-in-out group-hover:text-white">
                  Buy now
                </span>
              </button>
            </div>
            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-2">Specifications:</h3>
              <table className="w-full border-collapse">
                <tbody>
                  <tr className="border-b">
                    <td className="py-2 font-semibold">Capacity:</td>
                    <td className="py-2">500 ml</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 font-semibold">Power:</td>
                    <td className="py-2">24W</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 font-semibold">Weight:</td>
                    <td className="py-2">1.2 kg</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {bestSellerProduct.reviews.length > 0 && (
          <div className="px-5">
            <div>
              <div className="">
                <h3 className="text-xl font-semibold text-red-600 mb-2">
                  Customer Reviews:
                </h3>
              </div>
            </div>
            {!bestSellerAllReviews && (
              <div className="ease-linear duration-200">
                <div className="border-t border-gray-300 pt-4 mt-4">
                  <div className="flex items-center mb-2">
                    <div className="text-lg sm:text-xl font-bold text-gray-800 mr-2">
                      {bestSellerProduct?.reviews[0]?.user}
                    </div>
                    <div className="text-yellow-500">
                      {Array(bestSellerProduct?.reviews[0]?.rating)
                        .fill("★")
                        .join("")}
                    </div>
                  </div>
                  <p className="text-gray-700">
                    {bestSellerProduct?.reviews[0]?.comment}
                  </p>
                </div>
                <div className="border-t border-gray-300 pt-4 mt-4">
                  <div className="flex items-center mb-2">
                    <div className="text-lg sm:text-xl font-bold text-gray-800 mr-2">
                      {bestSellerProduct?.reviews[1]?.user}
                    </div>
                    <div className="text-yellow-500">
                      {Array(bestSellerProduct?.reviews[1]?.rating)
                        .fill("★")
                        .join("")}
                    </div>
                  </div>
                  <p className="text-gray-700">
                    {bestSellerProduct?.reviews[1]?.comment}
                  </p>
                </div>
                <button
                  onClick={() => setBestSellerAllReviews(true)}
                  className="flex justify-center items-center w-full "
                >
                  <FaChevronDown className="text-2xl" />
                </button>
              </div>
            )}
            {bestSellerAllReviews && (
              <div className="ease-out duration-300">
                {bestSellerProduct.reviews.map((review) => (
                  <div
                    key={review.id}
                    className="border-t border-gray-300 pt-4 mt-4"
                  >
                    <div className="flex items-center mb-2">
                      <div className="text-lg sm:text-xl font-bold text-gray-800 mr-2">
                        {review.user}
                      </div>
                      <div className="text-yellow-500">
                        {Array(review.rating).fill("★").join("")}
                      </div>
                    </div>
                    <p className="text-gray-700">{review.comment}</p>
                  </div>
                ))}
                <button
                  onClick={() => setBestSellerAllReviews(false)}
                  className="flex justify-center items-center w-full "
                >
                  <FaChevronUp className="text-2xl" />
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BestSeller;
