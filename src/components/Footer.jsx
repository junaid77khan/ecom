import { AiOutlineFacebook } from "react-icons/ai";
import { FaInstagram } from "react-icons/fa";
import { AiOutlineLinkedin } from "react-icons/ai";
import { AiOutlineYoutube } from "react-icons/ai";

const Footer = () => {
  return (
    <footer className="bg-orange-800 text-white py-8">
      <div className="container mx-auto px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div>
          <h3 className="text-xl font-semibold mb-4">Company</h3>
          <ul>
            <li>
              <a href="/about" className="hover:underline">
                About Us
              </a>
            </li>
            <li>
              <a href="/about" className="hover:underline">
                Privacy policy
              </a>
            </li>

            <li>
              <a href="/blog" className="hover:underline">
                Blog
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-4">Customer Service</h3>
          <ul>
            <li>
              <a href="/contact-us" className="hover:underline">
                contact
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-4">Useful links</h3>
          <ul>
            <li>
              <a href="/" className="hover:underline">
                Home
              </a>
            </li>
            <li>
              <a href="/categories" className="hover:underline">
                categories
              </a>
            </li>

            <li>
              <a href="/cart" className="hover:underline">
                cart
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-4">Stay Connected</h3>
          <form>
            <div className="flex mb-4">
              <input
                type="email"
                className="w-full px-3 py-2 rounded-l-md focus:outline-none"
                placeholder="Your email"
              />
              <button
                type="submit"
                className="bg-orange-500 hover:bg-orange-700 text-white px-3 py-2 rounded-r-md"
              >
                Subscribe
              </button>
            </div>
          </form>
          <div className="flex space-x-4">
            <a href="https://facebook.com" className="hover:underline">
              <AiOutlineFacebook className="h-6 w-6" />
            </a>
            <a
              href="https://youtube.com/@skpdecor?si=2_I5vAIZYm67GraM"
              className="hover:underline"
            >
              <AiOutlineYoutube className="h-6 w-6" />
            </a>
            <a
              href="https://www.instagram.com/skpdecor?igsh=c2tmamtjemFkMXhp"
              className="hover:underline"
            >
              <FaInstagram className="h-6 w-6" />
            </a>
            <a href="https://linkedin.com" className="hover:underline">
              <AiOutlineLinkedin className="h-6 w-6" />
            </a>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-6 lg:px-8 mt-8 border-t border-gray-200 pt-6 text-center">
        <p>
          &copy; {new Date().getFullYear()} Copyright © 2023 SKP Decor Pvt. Ltd.
          All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
