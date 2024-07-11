import { GlobeDemo } from "../components/GlobeDemo";

const ContactUs = () => {
  return (
    <div className="w-full h-full  bg-orange-50 flex flex-col md:flex-row justify-around">
      <div className="w-full md:w-3/5  flex justify-center">
        <GlobeDemo />
      </div>
      <div className="shadow-2xl rounded mt-4 mx-8 w-full md:w-2/5 px-4 py-5  h-screen sm:p-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Contact Us</h2>
        <form>
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
              className="mt-1 outline-none block w-full border border-gray-300 rounded-md shadow-sm"
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
              className="mt-1 outline-none block w-full border border-gray-300 rounded-md shadow-sm"
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
              className="mt-1 outline-none block w-full border border-gray-300 rounded-md shadow-sm resize-none"
            ></textarea>
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
