import { useState } from "react";
import upload_area from "../../../public/image.png";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddCategory = () => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
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
    setLoading(true);
    let formData = new FormData();
    formData.append("name", categoryDetails.name);
    formData.append("description", categoryDetails.description);
    formData.append("image", image);

    try {
      let response = await fetch(
        "http://localhost:8000/api/v1/category/add-category",
        {
          method: "POST",
          body: formData,
        }
      );

      let data = await response.json();

      if (data.success) {
        console.log(data);
        toast.success("Category added successfully!");
        setCategoryDetails({
          name: "",
          description: "",
          image: null,
        });
      } else {
        toast.error("Failed to add category. Please try again.");
      }
    } catch (error) {
      console.error("Error adding category:", error);
      toast.error("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
     <div className="w-full lg:w-8/12 px-4">
      <div className="relative flex flex-col min-w-0 break-words w-full  shadow-lg rounded-lg bg-blueGray-100 border-0">
        {loading && (
          <div className="fixed top-0 left-0 right-0 bottom-0 bg-gray-900 opacity-75 flex justify-center items-center z-50">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
          </div>
        )}
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <h6 className="text-blueGray-700 text-xl font-bold">
              Add Category
            </h6>
            <button
              className="bg-orange-500  hover:bg-orange-600 text-white active:bg-orange-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
              type="submit"
              onClick={handleSubmit}
            >
              Add Category
            </button>
          </div>
        </div>

        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
          <form onSubmit={handleSubmit}>
            <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
              Category Information
            </h6>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-12/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={categoryDetails.name}
                    onChange={handleChange}
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    required
                  />
                </div>
              </div>
            </div>

            <hr className="mt-6 border-b-1 border-blueGray-300" />

            <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
              Description
            </h6>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-12/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor=""
                  >
                    Description
                  </label>
                  <textarea
                    type="text"
                    name="description"
                    value={categoryDetails.description}
                    onChange={handleChange}
                    required
                    className="border-0 px-3  placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    rows="4"
                  ></textarea>
                </div>
                <div>
                  <label
                    htmlFor="file-input"
                    className="block text-sm font-medium text-gray-700 mb-5"
                  >
                    Category Picture
                    <img
                      src={image ? URL.createObjectURL(image) : upload_area}
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
              </div>
            </div>
          </form>
        </div>
      </div>
      </div>
    </>
  );
};

export default AddCategory;
