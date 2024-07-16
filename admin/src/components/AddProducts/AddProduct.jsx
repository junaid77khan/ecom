import { useState } from "react";
import upload_area from "../../../public/image.png";

const AddProduct = () => {
  const [image, setImage] = useState(false);
  const [ProudctDetails, setProductDetails] = useState({
    name: "",
    oldPrice: "",
    newPrice: "",
    stock: "",
    description: "",
    category: "",
    picture: null,
  });

  const handleImage = (e) => {
    setImage(e.target.files[0]);
  };

  const handleChange = (e) => {
    setProductDetails({
      ...ProudctDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let responseData;
    let product = ProudctDetails;

    let formData = new FormData();
    formData.append("product", image);

    await fetch("https://ecom-server-we11.onrender.com/upload", {
      method: "POST",
      headers: {
        Accept: "application/json",
        // "Content-Type": "application/json",
      },
      body: formData,
    })
      .then((resp) => resp.json())
      .then((data) => {
        responseData = data;
      });

    if (responseData.success) {
      product.image = responseData.image_url;
    }
    console.log(ProudctDetails);

    await fetch("https://ecom-server-we11.onrender.com/add-product", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body:JSON.stringify(product),
    })
      .then((resp) => resp.json())
      .then((data) => {
        data.success?alert("product Added"):alert("failed")
      });
  };

  return (
    <div className="p-4 w-[50%] mt-12 mx-auto bg-white rounded-md shadow-md">
      <h2 className="text-xl font-semibold mb-4">Add Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Product Name
            </label>
            <input
              type="text"
              name="name"
              value={ProudctDetails.name}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              {" "}
              Price
            </label>
            <input
              type="text"
              name="oldPrice"
              value={ProudctDetails.oldPrice}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              offerPrice
            </label>
            <input
              type="text"
              name="newPrice"
              value={ProudctDetails.newPrice}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Stock
            </label>
            <input
              type="text"
              name="stock"
              value={ProudctDetails.stock}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              value={ProudctDetails.description}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Select Category
            </label>
            <select
              name="category"
              value={ProudctDetails.category}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="">Select</option>
              {/* Add dynamic category options here */}
            </select>
          </div>
          {/* -------------------------------------------------- */}
          <div>
            <label
              htmlFor="file-input"
              className="block text-sm font-medium text-gray-700"
            >
              Product Picture
              <img
                src={image ? URL.createObjectURL(image) : upload_area}
                className="h-36 w-36"
                alt=""
              />
            </label>
            <input
              type="file"
              name="image"
              id="file-input"
              hidden
              onChange={handleImage}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          {/* ---------------------------------------- */}
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
      <div className="mt-4">
        <button
          onClick={() => {
            handleSubmit;
          }}
          className="px-4 py-2 bg-gray-300 text-black rounded-md hover:bg-gray-400"
        >
          All Products
        </button>
      </div>
    </div>
  );
};

export default AddProduct;
