import { useState, useEffect } from "react";
import upload_area from "../../../public/image.png";

const AddProduct = () => {
  const [images, setImages] = useState([null, null, null]); // State to store 3 images
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [productDetails, setProductDetails] = useState({
    name: "",
    description: "",
    features: [], // Array of strings
    specifications: [], // Array of objects { name: string, value: string }
    price: 0,
    stock: 0,
    category: {},
  });

  useEffect(() => {
    // Fetch categories from backend and update state
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

  const handleImage = (e, index) => {
    const newImages = [...images];
    newImages[index] = e.target.files[0];
    setImages(newImages);
  };

  const handleChange = (e) => {
    if (e.target.name === "category") {
      const selectedCategory = categories.find(
        (category) => category._id === e.target.value
      );
      setProductDetails({
        ...productDetails,
        category: selectedCategory,
      });
      setSelectedCategoryId(e.target.value); // Update selectedCategoryId state
    } else {
      setProductDetails({
        ...productDetails,
        [e.target.name]: e.target.value,
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();

      // Append product details
      formData.append("name", productDetails.name);
      formData.append("description", productDetails.description);
      formData.append("price", parseFloat(productDetails.price));
      formData.append("stock", parseInt(productDetails.stock));
      formData.append("categoryId", selectedCategoryId);

      // Append features
      productDetails.features.forEach((feature, index) => {
        formData.append(`features[${index}]`, feature);
      });

      // Append specifications
      productDetails.specifications.forEach((specification, index) => {
        formData.append(
          `specifications[${index}][name]`,
          specification.name
        );
        formData.append(
          `specifications[${index}][value]`,
          specification.value
        );
      });

      // Append images
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
        throw new Error("Failed to add product");
      }

      alert("Product added successfully!");
      // Reset form after successful submission
      setProductDetails({
        name: "",
        description: "",
        features: [],
        specifications: [],
        price: 0,
        stock: 0,
        category: "",
      });
      setImages([null, null, null]);
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product");
    }
  };

  return (
    <div className="p-4 w-[50%] mt-12 mx-auto bg-white rounded-md shadow-md">
      <h2 className="text-xl font-semibold mb-4">Add Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={productDetails.name}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              value={productDetails.description}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Price
            </label>
            <input
              type="number"
              name="price"
              value={productDetails.price}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Stock
            </label>
            <input
              type="number"
              name="stock"
              value={productDetails.stock}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Select Category
            </label>
            <select
  name="category"
  value={productDetails.category._id} // Use category ID as value
  onChange={handleChange}
  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:border-indigo-500 focus:ring-indigo-500"
  required
>
  <option value="">Select</option>
  {categories &&
    categories.map((category) => (
      <option key={category._id} value={category._id}>
        {category.name}
      </option>
    ))}
</select>
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              Features
            </label>
            {productDetails.features.map((feature, index) => (
              <div key={index} className="flex items-center gap-2">
                <input
                  type="text"
                  value={feature}
                  onChange={(e) => handleFeaturesChange(e, index)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
                <button
                  type="button"
                  onClick={() => handleRemoveFeature(index)}
                  className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddFeature}
              className="mt-2 bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600"
            >
              Add Feature
            </button>
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              Specifications
            </label>
            {productDetails.specifications.map((specification, index) => (
              <div key={index} className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="Name"
                  value={specification.name}
                  onChange={(e) =>
                    handleSpecificationChange(e, index, "name")
                  }
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
                <input
                  type="text"
                  placeholder="Value"
                  value={specification.value}
                  onChange={(e) =>
                    handleSpecificationChange(e, index, "value")
                  }
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
                <button
                  type="button"
                  onClick={() => handleRemoveSpecification(index)}
                  className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddSpecification}
              className="mt-2 bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600"
            >
              Add Specification
            </button>
          </div>
          <div className="col-span-2">
            <label
              htmlFor="file-input"
              className="block text-sm font-medium text-gray-700"
            >
              Product Pictures
              <div className="flex gap-4 mt-2">
                {images.map((image, index) => (
                  <div key={index}>
                    <input
                      type="file"
                      name={`image${index + 1}`}
                      id={`file-input-${index}`}
                      hidden
                      onChange={(e) => handleImage(e, index)}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:border-indigo-500 focus:ring-indigo-500"
                      required
                    />
                    <label
                      htmlFor={`file-input-${index}`}
                      className="cursor-pointer block text-sm font-medium text-gray-700"
                    >
                      Choose Image {index + 1}
                    </label>
                  </div>
                ))}
              </div>
            </label>
          </div>
        </div>
        <div className="mt-4 flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600"
          >
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;