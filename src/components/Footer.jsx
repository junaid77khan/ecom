import { AiOutlineFacebook } from "react-icons/ai";
import { FaInstagram } from "react-icons/fa";
import { AiOutlineLinkedin } from "react-icons/ai";
import { AiOutlineYoutube } from "react-icons/ai";

const Footer = () => {
  return (
    <footer className="relative bg-orange-700 pt-4 pb-2">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap text-left lg:text-left">
          <div className="w-full lg:w-6/12 px-4">
            <h4 className="text-3xl font-semibold text-white">
              Let&apos;s keep in touch!
            </h4>
            <h5 className="text-lg mt-0 mb-2 text-white">
              Find us on any of these platforms, we respond 1-2 business days.
            </h5>
            <div className="mt-6 lg:mb-0 mb-6">
              <button
                onClick={() => window.open("https://www.facebook.com")}
                className="bg-white text-orange-500 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
                type="button"
              >
                <i className="flex justify-center">
                  {" "}
                  <AiOutlineFacebook className="h-6 w-6 flex justify-center text center" />
                </i>
              </button>
              <button
                onClick={() =>
                  window.open(
                    "https://youtube.com/@skpdecor?si=2_I5vAIZYm67GraM"
                  )
                }
                className="bg-white text-orange-500 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
                type="button"
              >
                <i className="flex justify-center">
                  {" "}
                  <AiOutlineYoutube className="h-6 w-6" />
                </i>
              </button>
              <button
                onClick={() =>
                  window.open(
                    "https://www.instagram.com/skpdecor?igsh=c2tmamtjemFkMXhp"
                  )
                }
                className="bg-white text-orange-500 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
                type="button"
              >
                <i className="flex text-center justify-center">
                  <FaInstagram className="h-6 w-6" />
                </i>
              </button>
              <button
                onClick={() => window.open("https://linkedin.com")}
                className="bg-white text-orange-500 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
                type="button"
              >
                <i className="flex text-center justify-center">
                  <AiOutlineLinkedin className="h-6 w-6" />
                </i>
              </button>
            </div>
          </div>
          <div className="w-full lg:w-6/12 px-4">
            <div className="flex flex-wrap items-top mb-6">
              <div className="w-full lg:w-4/12 px-4 ml-auto">
                <span className="block uppercase text-white text-sm font-semibold mb-2">
                  Useful Links
                </span>
                <ul className="list-unstyled">
                  <li>
                    <a
                      className="text-white hover:text-orange-800 font-semibold block pb-2 text-sm"
                      href="/blogs"
                    >
                      Blogs
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-white hover:text-orange-800 font-semibold block pb-2 text-sm"
                      href="/"
                    >
                      Home
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-white hover:text-orange-800 font-semibold block pb-2 text-sm"
                      href="/categoiries"
                    >
                      Categories
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-white hover:text-orange-800 font-semibold block pb-2 text-sm"
                      href="/cart"
                    >
                      cart
                    </a>
                  </li>
                </ul>
              </div>
              <div className="w-full lg:w-4/12 px-4">
                <span className="block uppercase text-white text-sm font-semibold mb-2">
                  Company
                </span>
                <ul className="list-unstyled">
                  <li>
                    <a
                      className="text-white hover:text-orange-800 font-semibold block pb-2 text-sm"
                      href="/deliverypolicy"
                    >
                      Shipping &amp; Refund Policy
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-white hover:text-orange-800 font-semibold block pb-2 text-sm"
                      href="/terms&condition"
                    >
                      Terms &amp; Conditions
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-white hover:text-orange-800 font-semibold block pb-2 text-sm"
                      href="/privacypolicy"
                    >
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-white hover:text-orange-800 font-semibold block pb-2 text-sm"
                      href="/contact-us"
                    >
                      Contact Us
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-white hover:text-orange-800 font-semibold block pb-2 text-sm"
                      href="mailto:skpdecor3@gmail.com"
                    >
                      Email
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <hr className="my-6 border-orange-300" />
        <div className="flex flex-wrap items-center md:justify-between justify-center">
          <div className="w-full md:w-4/12 px-4 mx-auto text-center">
            <div className="text-sm text-white font-semibold py-1">
              Copyright ©{" "}
              <span id="get-current-year">
                2023 SKP Decor Pvt.Ltd.All Rights Reserved
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;