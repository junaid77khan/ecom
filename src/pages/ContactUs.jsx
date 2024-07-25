import { useState } from "react";
import { toast } from "sonner";
import { Spinner } from "../components/Spinner";

const ContactUs = () => {
  const [details, setDetails] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails({
      ...details,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const addMessageResponse = await fetch(
        `${import.meta.env.VITE_API_URL}/api/v1/message/add-message`,
        {
          method: "POST",
          body: JSON.stringify({
            name: details.name,
            email: details.email,
            message: details.message,
          }),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      const addMessageData = await addMessageResponse.json();

      if (!addMessageData.success) {
        throw new Error("Failed to add message");
      }

      toast.success("Message added successfully!");
      setDetails({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      console.error("Error adding message:", error);
      toast.error("Failed to add message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-orange-50 flex flex-col md:flex-row justify-around">
      <div className="shadow-2xl rounded mt-4 lg:mx-8  w-full lg:w-1/3 px-8 py-5 h-full">
        <h2 className="lg:text-3xl text-2xl font-bold text-gray-800 mb-6">
          Contact Us
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={details.name}
              onChange={handleChange}
              className="mt-1 px-2 outline-none block w-full border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={details.email}
              onChange={handleChange}
              className="mt-1 px-2 outline-none block w-full border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows="4"
              value={details.message}
              onChange={handleChange}
              className="mt-1 px-2 outline-none block w-full border border-gray-300 rounded-md shadow-sm resize-none"
            ></textarea>
          </div>
          <div className="mt-2 py-10  border-t w-full flex flex-wrap justify-center items-center border-blueGray-200 text-center">
            <button
              type="submit"
              className="mt-5 font-semibold bg-orange-500 px-4 text-gray-100 py-2 rounded-lg hover:bg-orange-600 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none relative"
              disabled={loading}
              onClick={handleSubmit}
            >
              {loading && <Spinner />}
              <span className={` ${loading ? "invisible" : "visible"}`}>
                Add Message
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
