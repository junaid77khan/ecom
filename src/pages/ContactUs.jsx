import { useState } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaEnvelope, FaPhone, FaUser, FaPaperPlane } from 'react-icons/fa';

const ContactUs = () => {
  const [details, setDetails] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails({ ...details, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/message/add-message`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(details),
      });
      const data = await response.json();
      if (!data.success) throw new Error("Failed to add message");
      toast.success("Message sent successfully!");
      setDetails({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 to-orange-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-extrabold text-orange-800 text-center mb-12"
        >
          Get in Touch
        </motion.h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-2xl overflow-hidden"
          >
            <div className="p-8">
              <h2 className="text-2xl font-bold text-orange-600 mb-6">Send us a message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="relative">
                  <FaUser className="absolute top-3 left-3 text-orange-400" />
                  <input
                    type="text"
                    name="name"
                    value={details.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    className="w-full pl-10 pr-3 py-2 rounded-lg border-2 border-orange-200 focus:outline-none focus:border-orange-500 transition duration-300"
                    required
                  />
                </div>
                <div className="relative">
                  <FaEnvelope className="absolute top-3 left-3 text-orange-400" />
                  <input
                    type="email"
                    name="email"
                    value={details.email}
                    onChange={handleChange}
                    placeholder="Your Email"
                    className="w-full pl-10 pr-3 py-2 rounded-lg border-2 border-orange-200 focus:outline-none focus:border-orange-500 transition duration-300"
                    required
                  />
                </div>
                <div className="relative">
                  <FaPaperPlane className="absolute top-3 left-3 text-orange-400" />
                  <textarea
                    name="message"
                    value={details.message}
                    onChange={handleChange}
                    placeholder="Your Message"
                    rows="4"
                    className="w-full pl-10 pr-3 py-2 rounded-lg border-2 border-orange-200 focus:outline-none focus:border-orange-500 transition duration-300 resize-none"
                    required
                  ></textarea>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="w-full bg-orange-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-orange-600 transition duration-300"
                  disabled={loading}
                >
                  {loading ? "Sending..." : "Send Message"}
                </motion.button>
              </form>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-orange-600 rounded-2xl shadow-2xl overflow-hidden text-white"
          >
            <div className="p-8">
              <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <FaMapMarkerAlt className="text-2xl mt-1 flex-shrink-0" />
                  <p>
                    SKP DECOR PRIVATE LIMITED<br />
                    SECOND FLOOR, 29, POCKET 13, ROHINI SECTOR 20,<br />
                    Begumpur, New Delhi North West Delhi<br />
                    DELHI 110086
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <FaEnvelope className="text-2xl flex-shrink-0" />
                  <a href="mailto:skpdecor3@gmail.com" className="hover:underline">
                    skpdecor3@gmail.com
                  </a>
                </div>
                <div className="flex items-center space-x-4">
                  <FaPhone className="text-2xl flex-shrink-0" />
                  <a href="tel:+918360175563" className="hover:underline">
                    +91 8360175563
                  </a>
                </div>
              </div>
              <div className="mt-12">
                <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
                <div className="flex space-x-4">
                  {/* Add your social media icons here */}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;