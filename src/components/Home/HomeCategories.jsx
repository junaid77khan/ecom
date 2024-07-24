// /* eslint-disable no-undef */
// /* eslint-disable react/jsx-key */
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { FaArrowRight } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";

// const HomeCategories = () => {
//   const navigate = useNavigate();
//   const[productCategories, setProductCategories] = useState([])
//   const[loading, setLoading] = useState(true);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setLoading(false);
//     }, 2000); 

//     const fetchProductCategories = async() => {
//       const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/category/all-categories`, {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//       });

//       const dataFromServer = await response.json();

//       if(!dataFromServer.success) {
//         navigate("/error")
//       }
//       setProductCategories(dataFromServer.data.slice(0, 8));
//     }

//     fetchProductCategories();
//     return () => clearTimeout(timer);
//   }, [])

//   const dummyArray = Array.from({ length: 8 });
//   return (
//     <div className="h-full py-10 px-4 sm:px-10 lg:px-24 w-full bg-gradient-to-b from-orange-100 to-orange-50">
//       <h1 className="text-3xl sm:text-4xl lg:text-6xl text-black font-semibold">
//         Our Categories
//       </h1>

//       <div className="flex flex-wrap justify-center items-center gap-5 sm:gap-10 py-10 mt-4">
//         {
//           loading && (
//             dummyArray.map((_, index) => (
//               <div
//               onClick={() => navigate(`/categories/${category._id}/${category.name}`)}
//               className="flex flex-col justify-start items-start gap-3 w-72 sm:w-72 h-80 sm:h-96 px-4 py-6 bg-white overflow-hidden hover:bg-white duration-200 rounded-lg"
//               >
//                 <div className="w-full h-3/4 overflow-hidden">
//                   <div
//                     className="bg-cover h-full w-full bg-center rounded-lg hover:scale-105 transition-transform duration-300 transform-gpu animate-pulse"
//                   />
//                 </div>
//                 <h1 className="text-lg sm:text-xl animate-pulse">
                  
//                   {/* <FaArrowRight className="inline" />{" "} */}
//                 </h1>
//                 <div>
//                   <p className="text-gray-500 hover:text-black animate-pulse">
//                     {/* {category.description.substring(0, 40)}... */}
//                   </p>
//                 </div>
//             </div>
//             ))
            
//           )
//         }
//         {!loading &&productCategories?.length === 0 && (
//           <div className="text-xl sm:text-2xl">No Categories Available</div>
//         )}
//         { !loading && productCategories?.length > 0 &&
//           productCategories?.map((category) => (
//             <div
//               key={category._id}
//               onClick={() => navigate(`/categories/${category._id}/${category.name}`)}
//               className="flex flex-col justify-start items-start gap-3 w-72 sm:w-72 h-80 sm:h-96 px-4 py-6 bg-white overflow-hidden hover:bg-white duration-200 rounded-lg"
//             >
//               <div className="w-full h-3/4 overflow-hidden">
//                 <img
//                   className="bg-cover h-full w-full bg-center rounded-lg hover:scale-105 transition-transform duration-300 transform-gpu"
//                   src={category.image}
//                   alt={category.name}
//                 />
//               </div>
//               <h1 className="text-md md:text-lg">
//                 {category.name.length > 20 ? `${category.name.substring(0, 20) }...`: category.name}{" "}
//                 <FaArrowRight className="inline" />{" "}
//               </h1>
//               <div>
//                 <p className="text-gray-500 hover:text-black">
//                   {category.description.length > 50 ? `${category.description.substring(0, 50)}...` : category.description}
//                 </p>
//               </div>
//             </div>
//           ))}
//       </div>

//       <div className="w-full flex justify-end items-center">
//         {productCategories?.length > 0 && (
//           <button
//             onClick={() => navigate("/categories")}
//             className="border hover:bg-white transition-200 border-white bg-white px-4 py-2 sm:px-8 sm:py-3"
//           >
//             View All
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default HomeCategories;
/* eslint-disable no-undef */
/* eslint-disable react/jsx-key */


import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const HomeCategories = () => {
  const navigate = useNavigate();
  const [productCategories, setProductCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    const fetchProductCategories = async () => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/category/all-categories`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      });

      const dataFromServer = await response.json();

      if (!dataFromServer.success) {
        navigate("/error");
      }
      setProductCategories(dataFromServer.data.slice(0, 8));
    };

    fetchProductCategories();
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="h-full py-10 px-4 sm:px-10 lg:px-24 w-full bg-gradient-to-b from-orange-100 to-orange-50">
      <h1 className="text-3xl sm:text-4xl lg:text-6xl text-black font-semibold">
        Our Categories
      </h1>

      <div className="flex flex-wrap justify-center items-center gap-5 sm:gap-10 py-10 mt-4">
        {loading && (
          Array.from({ length: 8 }).map((_, index) => (
            <div role="status" className="max-w-sm p-4 border border-white rounded shadow animate-pulse md:p-6 " key={index}>
              <div className="flex items-center justify-center h-48 mb-4 bg-white rounded ">
                <svg className="w-10 h-10 text-white " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
                  <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z" />
                  <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
                </svg>
              </div>
              <div className="h-2.5 bg-white rounded-full  w-48 mb-4"></div>
              <div className="h-2 bg-white rounded-full  mb-2.5"></div>
              <div className="h-2 bg-white rounded-full  mb-2.5"></div>
              <div className="h-2 bg-white rounded-full "></div>
              <div className="flex items-center mt-4">
                <svg className="w-10 h-10 me-3 text-white " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                </svg>
                <div>
                  <div className="h-2.5 bg-white rounded-full  w-32 mb-2"></div>
                  <div className="w-48 h-2 bg-white rounded-full "></div>
                </div>
              </div>
              <span className="sr-only">Loading...</span>
            </div>
          ))
        )}
        {!loading && productCategories?.length === 0 && (
          <div className="text-xl sm:text-2xl">No Categories Available</div>
        )}
        {!loading && productCategories?.length > 0 &&
          productCategories?.map((category) => (
            <div
              key={category._id}
              onClick={() => navigate(`/categories/${category._id}/${category.name}`)}
              className="flex flex-col justify-start items-start gap-3 w-72 sm:w-72 h-80 sm:h-96 px-4 py-6 bg-white overflow-hidden hover:bg-white duration-200 rounded-lg"
            >
              <div className="w-full h-3/4 overflow-hidden">
                <img
                  className="bg-cover h-full w-full bg-center rounded-lg hover:scale-105 transition-transform duration-300 transform-gpu"
                  src={category.image}
                  alt={category.name}
                />
              </div>
              <h1 className="text-md md:text-lg">
                {category.name.length > 20 ? `${category.name.substring(0, 20)}...` : category.name}{" "}
                <FaArrowRight className="inline" />{" "}
              </h1>
              <div>
                <p className="text-gray-500 hover:text-black">
                  {category.description.length > 50 ? `${category.description.substring(0, 50)}...` : category.description}
                </p>
              </div>
            </div>
          ))}
      </div>

      <div className="w-full flex justify-end items-center">
        {productCategories?.length > 0 && (
          <button
            onClick={() => navigate("/categories")}
            className="border hover:bg-white transition-200 border-white bg-white px-4 py-2 sm:px-8 sm:py-3"
          >
            View All
          </button>
        )}
      </div>
    </div>
  );
};

export default HomeCategories;
