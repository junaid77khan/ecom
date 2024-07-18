// import avatar from "../../assets/img/team.jpg"

// // components

// export default function CardProfile() {
//   return (
//     <>
//       <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16">
//         <div className="px-6">
//           <div className="flex flex-wrap justify-center">
//             <div className="w-full px-4 flex justify-center">
//               <div className="relative">
//                 <img
//                   alt="..."
//                   src = {avatar}
//                   className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"
//                 />
//               </div>
//             </div>
//             <div className="w-full px-4 text-center mt-20">
//               <div className="flex justify-center py-4 lg:pt-4 pt-8">
//                 <div className="mr-4 p-3 text-center">
//                   <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
//                     22
//                   </span>
//                   <span className="text-sm text-blueGray-400">Friends</span>
//                 </div>
//                 <div className="mr-4 p-3 text-center">
//                   <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
//                     10
//                   </span>
//                   <span className="text-sm text-blueGray-400">Photos</span>
//                 </div>
//                 <div className="lg:mr-4 p-3 text-center">
//                   <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
//                     89
//                   </span>
//                   <span className="text-sm text-blueGray-400">Comments</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="text-center mt-12">
//             <h3 className="text-xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
//               Jenna Stones
//             </h3>
//             <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
//               <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>{" "}
//               Los Angeles, California
//             </div>
//             <div className="mb-2 text-blueGray-600 mt-10">
//               <i className="fas fa-briefcase mr-2 text-lg text-blueGray-400"></i>
//               Solution Manager - Creative Tim Officer
//             </div>
//             <div className="mb-2 text-blueGray-600">
//               <i className="fas fa-university mr-2 text-lg text-blueGray-400"></i>
//               University of Computer Science
//             </div>
//           </div>
//           <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
//             <div className="flex flex-wrap justify-center">
//               <div className="w-full lg:w-9/12 px-4">
//                 <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
//                   An artist of considerable range, Jenna the name taken by
//                   Melbourne-raised, Brooklyn-based Nick Murphy writes, performs
//                   and records all of his own music, giving it a warm, intimate
//                   feel with a solid groove structure. An artist of considerable
//                   range.
//                 </p>
//                 <a
//                   href="#pablo"
//                   className="font-normal text-orange-500"
//                   onClick={(e) => e.preventDefault()}
//                 >
//                   Show more
//                 </a>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import avatar from "../../assets/img/team.jpg";

const CardProfile = (props) => {
  // eslint-disable-next-line react/prop-types
  const { productData } = props;
  const [images, setImages] = useState([null, null, null]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [productDetails, setProductDetails] = useState(
    productData || {
      name: "",
      description: "",
      features: [],
      specifications: [],
      actualPrice: 0,
      salePrice: 0,
      stock: 0,
      category: {},
    }
  );

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/api/v1/category/all-categories"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }
        const data = await response.json();
        setCategories(data.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "category") {
      const selectedCategory = categories.find(
        (category) => category._id === value
      );
      setProductDetails({
        ...productDetails,
        category: selectedCategory || {},
      });
      setSelectedCategoryId(value);
    } else {
      setProductDetails({
        ...productDetails,
        [name]: value,
      });
    }
  };

  const handleFeaturesChange = (e, index) => {
    const newFeatures = [...productDetails.features];
    newFeatures[index] = e.target.value;
    setProductDetails({
      ...productDetails,
      features: newFeatures,
    });
  };

  const handleAddFeature = () => {
    setProductDetails({
      ...productDetails,
      features: [...productDetails.features, ""],
    });
  };

  const handleRemoveFeature = (index) => {
    const newFeatures = [...productDetails.features];
    newFeatures.splice(index, 1);
    setProductDetails({
      ...productDetails,
      features: newFeatures,
    });
  };

  const handleSpecificationChange = (e, index, key) => {
    const newSpecifications = [...productDetails.specifications];
    newSpecifications[index][key] = e.target.value;
    setProductDetails({
      ...productDetails,
      specifications: newSpecifications,
    });
  };

  const handleAddSpecification = () => {
    setProductDetails({
      ...productDetails,
      specifications: [
        ...productDetails.specifications,
        { name: "", value: "" },
      ],
    });
  };

  const handleRemoveSpecification = (index) => {
    const newSpecifications = [...productDetails.specifications];
    newSpecifications.splice(index, 1);
    setProductDetails({
      ...productDetails,
      specifications: newSpecifications,
    });
  };

  const handleImage = (e, index) => {
    const newImages = [...images];
    newImages[index] = e.target.files[0];
    setImages(newImages);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", productDetails.name);
      formData.append("description", productDetails.description);
      formData.append("actualPrice", parseFloat(productDetails.actualPrice));
      formData.append("salePrice", parseFloat(productDetails.salePrice));
      formData.append("stock", parseInt(productDetails.stock));
      formData.append("categoryId", selectedCategoryId);

      productDetails.features.forEach((feature, index) => {
        formData.append(`features[${index}]`, feature);
      });

      productDetails.specifications.forEach((specification, index) => {
        formData.append(`specifications[${index}][name]`, specification.name);
        formData.append(`specifications[${index}][value]`, specification.value);
      });

      images.forEach((image, index) => {
        if (image) {
          formData.append(`image${index + 1}`, image);
        }
      });

      const addProductResponse = await fetch(
        "http://localhost:8000/api/v1/product/add-product",
        {
          method: "POST",
          body: formData,
        }
      );
      const addProductData = await addProductResponse.json();

      if (!addProductResponse.ok || !addProductData.success) {
        toast.error("Failed to add product. Please try again.");
        throw new Error("Failed to add product");
      }

      toast.success("Product added successfully!");
      // Reset form or redirect as needed
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error("Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg ">
      <div className="px-6">
      
        <div className="text-center mt-12">
         


          {/* -------------------- */}
      
        </div>


        {/* ---------------------------- */}
        <div className="mt-10  text-center">
          <div className="flex flex-wrap justify-center">
            <div className="w-full lg:w-9/12 px-4">
              <h4 className="text-lg font-semibold">Features</h4>
              {productDetails.features.map((feature, index) => (
                <div key={index} className="mb-2 flex items-center">
                  <input
                    type="text"
                    value={feature}
                    onChange={(e) => handleFeaturesChange(e, index)}
                    className="flex-grow bg-transparent border-b"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveFeature(index)}
                    className="ml-2 text-red-500"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={handleAddFeature}
                className="mt-2 text-orange-500"
              >
                Add Feature
              </button>
            </div>
          </div>
        </div>
        <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
          <div className="flex flex-wrap justify-center">
            <div className="w-full lg:w-9/12 px-4">
              <h4 className="text-lg font-semibold">Specifications</h4>
              {productDetails.specifications.map((spec, index) => (
                <div key={index} className="mb-2 flex flex-col items-center">
                  <input
                    type="text"
                    value={spec.name}
                    onChange={(e) =>
                      handleSpecificationChange(e, index, "name")
                    }
                    placeholder="Name"
                    className="flex-grow bg-transparent border-b mr-2"
                  />
                  <input
                    type="text"
                    value={spec.value}
                    onChange={(e) =>
                      handleSpecificationChange(e, index, "value")
                    }
                    placeholder="Value"
                    className="flex-grow bg-transparent border-b"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveSpecification(index)}
                    className="ml-2 text-red-500"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={handleAddSpecification}
                className="mt-2 text-orange-500"
              >
                Add Specification
              </button>
            </div>
          </div>
        </div>
        <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
          <div className="flex flex-wrap justify-center">
            <div className="w-full lg:w-9/12 px-4">
              <h4 className="text-lg font-semibold">Product Images</h4>
              <div className="flex justify-center gap-4  mt-4">
                {images.map((_, index) => (
                  <div key={index}>
                    <input
                      type="file"
                      id={`file-input-${index}`}
                      hidden
                      onChange={(e) => handleImage(e, index)}
                    />
                    <label
                      htmlFor={`file-input-${index}`}
                      className="cursor-pointer  bg-orange-500 text-white active:bg-orange-600 font-bold uppercase text-xs px-4 py-2  rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                    >
                      Image {index + 1}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-2 py-10 border-t border-blueGray-200 text-center">
          <button
            onClick={handleSubmit}
            className="bg-orange-500 text-white active:bg-orange-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
          >
            {loading ? "Saving..." : "Save Product"}
          </button>
        </div>
      </div>
      {loading && (
        <div className="absolute inset-0 bg-gray-900 opacity-50 flex justify-center items-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white"></div>
        </div>
      )}
    </div>
  );
};

export default CardProfile;
