import { useState } from "react";
// import upload_area from "../../../public/candle1.jpg";

const AddCategory = () => {
  const [image, setImage] = useState(null);
  const [categoryDetails, setCategoryDetails] = useState({
    name: "",
    description: "",
    image: image,
  });

  const handleImage = (e) => {
    setImage(e.target.files[0]);
  };

  const handleChange = (e) => {
    setCategoryDetails({
      ...categoryDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let responseData;

    let formData = new FormData();
    formData.append("name", categoryDetails.name);
    formData.append("description", categoryDetails.description);
    formData.append("image", image);

    console.log(image);

    let response = await fetch("http://localhost:8000/api/v1/category/add-category", {
        method: "POST",
        body: formData,
      });

    response = await response.json();

    console.log(response);
  };

  return (
    <div className="p-4 w-[50%] mt-12 mx-auto bg-white rounded-md shadow-md">
      <h2 className="text-xl font-semibold mb-4">Add Category</h2>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-3 mb-3">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Category Name
            </label>
            <input
              type="text"
              name="name"
              value={categoryDetails.name}
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
              value={categoryDetails.description}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          {/* -------------------------------------------------- */}
          <div>
            <label
              htmlFor="file-input"
              className="block text-sm font-medium text-gray-700 mb-5"
            >
              Category Picture
              <img
                src={image ? URL.createObjectURL(image) : "/candle1.jpg"}
                className="h-36 w-36 rounded-lg"
                alt=""
              />
            </label>
            <input
              type="file"
              name="image"
              id="file-input"
              hidden
              onChange={handleImage}
              className="mt-1 block border border-gray-300 rounded-md shadow-sm p-1 focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          {/* ---------------------------------------- */}
        </div>
        <div className="mt-4 flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600"
          >
            Add Category
          </button>
        </div>
      </form>
      {/* <div className="mt-4">
        <button
          onClick={() => {
            handleSubmit;
          }}
          className="px-4 py-2 bg-gray-300 text-black rounded-md hover:bg-gray-400"
        >
          All Categories
        </button>
      </div> */}
    </div>
  );
};

export default AddCategory;