
import { useState } from "react";
import {
  faUser,
  faSearch,
  faBagShopping,
  faBars,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "@fortawesome/fontawesome-svg-core/styles.css";

import SearchFilter from "./SearchFilter";
import { useSelector, useDispatch } from "react-redux";
import { closePopup } from "../store/popupSlice";
import CartPopup from "../components/CartPopup";

function NavBar() {
  const popup = useSelector((state) => state.popup);
  const dispatch = useDispatch();

  const handleClosePopup = () => {
    dispatch(closePopup());
  };

  const location = useLocation();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const products = [
    { id: 1, name: "Product 1" },
    { id: 2, name: "Product 2" },
    { id: 3, name: "Product 3" },
  ];

  const handleSearchClick = () => {
    setIsSearchOpen(true);
  };

  const handleCloseSearch = () => {
    setIsSearchOpen(false);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="w-full h-20 bg-gradient-to-b from-orange-50 to-orange-50 flex flex-wrap justify-between items-center px-4 lg:px-24 z-10">
      <div className="flex items-center">
        <button
          onClick={toggleSidebar}
          className="block lg:hidden duration-200 hover:text-orange-400 mr-4"
        >
          <FontAwesomeIcon className="text-xl" icon={faBars} />
        </button>
        <a href="/">
          <div className="flex flex-wrap text-lg justify-center items-center">
            <img
              src="/logo1.png "
              className="h-16 w-36 sm:h-20 sm:w-48  lg:h-20 lg:w-60"
            ></img>
          </div>
        </a>
      </div>
      <ul className="hidden lg:flex flex-wrap gap-10 text-lg justify-center items-center relative">
        <li>
          <NavLink
            to={"/"}
            className={({ isActive }) =>
              `block duration-200 hover:text-orange-400 ${
                isActive
                  ? "text-orange-500 border-b border-orange-500"
                  : "text-gray-500 border-b border-gray-300"
              } `
            }
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to={"/categories"}
            className={({ isActive }) =>
              `block duration-200 hover:text-orange-400 ${
                isActive || location.pathname.startsWith("/product")
                  ? "text-orange-500 border-b border-orange-500"
                  : "text-gray-500 border-b border-gray-300"
              }`
            }
          >
            Categories
          </NavLink>
        </li>
        <li>
          <NavLink
            to={"/blogs"}
            className={({ isActive }) =>
              `block duration-200 hover:text-orange-400 ${
                isActive
                  ? "text-orange-500 border-b border-orange-500"
                  : "text-gray-500 border-b border-gray-300"
              } `
            }
          >
            Blogs
          </NavLink>
        </li>
        <li>
          <NavLink
            to={"/contact-us"}
            className={({ isActive }) =>
              `block duration-200 hover:text-orange-400 ${
                isActive
                  ? "text-orange-500 border-b border-orange-500"
                  : "text-gray-500 border-b border-gray-300"
              }`
            }
          >
            Contact us
          </NavLink>
        </li>
      </ul>
      <ul className="flex flex-wrap justify-center lg:justify-end text-lg items-center gap-4 lg:gap-10">
        <li>
          <button
            onClick={handleSearchClick}
            className="block duration-200 hover:text-orange-400"
          >
            <FontAwesomeIcon className="md:text-xl text-md" icon={faSearch} />
          </button>
        </li>
        <li>
          <NavLink
            to={"/login"}
            className={({ isActive }) =>
              `block duration-200 hover:text-orange-400 ${
                isActive || location.pathname === "/register"
                  ? "text-orange-500"
                  : "text-gray-500"
              }`
            }
          >
            <FontAwesomeIcon className="md:text-xl text-md" icon={faUser} />
          </NavLink>
        </li>
        <li>
          <NavLink
            to={"/cart"}
            className={({ isActive }) =>
              `block duration-200 hover:text-orange-400 ${
                isActive ? "text-orange-500" : "text-gray-500"
              }`
            }
          >
            <FontAwesomeIcon className="md:text-xl text-md" icon={faBagShopping} />
          </NavLink>
        </li>
      </ul>
      {isSearchOpen && (
        <SearchFilter products={products} onClose={handleCloseSearch} />
      )}
      {popup.isVisible && (
        <CartPopup product={popup.product} onClose={handleClosePopup} />
      )}
      {/* Sidebar for small screens */}
      <div
        className={`fixed top-0 left-0 w-full h-full bg-white z-20 transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4">
          <a href="/">
            <div className="flex flex-wrap text-lg justify-center items-center">
              Logo
            </div>
          </a>
          <button
            onClick={toggleSidebar}
            className="block duration-200 hover:text-orange-400"
          >
            <FontAwesomeIcon className="text-xl" icon={faTimes} />
          </button>
        </div>
        <ul className="flex flex-col items-start p-4">
          <li className="my-2">
            <NavLink
              to={"/"}
              className={({ isActive }) =>
                `block duration-200 hover:text-orange-400 ${
                  isActive
                    ? "text-orange-500 border-b border-orange-500"
                    : "text-gray-500 border-b border-gray-300"
                }`
              }
              onClick={toggleSidebar}
            >
              Home
            </NavLink>
          </li>
          <li className="my-2">
            <NavLink
              to={"/categories"}
              className={({ isActive }) =>
                `block duration-200 hover:text-orange-400 ${
                  isActive || location.pathname.startsWith("/product")
                    ? "text-orange-500 border-b border-orange-500"
                    : "text-gray-500 border-b border-gray-300"
                }`
              }
              onClick={toggleSidebar}
            >
              Categories
            </NavLink>
          </li>
          <li className="my-2">
            <NavLink
              to={"/blogs"}
              className={({ isActive }) =>
                `block duration-200 hover:text-orange-400 ${
                  isActive
                    ? "text-orange-500 border-b border-orange-500"
                    : "text-gray-500 border-b border-gray-300"
                }`
              }
              onClick={toggleSidebar}
            >
              Blogs
            </NavLink>
          </li>
          <li className="my-2">
            <NavLink
              to={"/contact-us"}
              className={({ isActive }) =>
                `block duration-200 hover:text-orange-400 ${
                  isActive
                    ? "text-orange-500 border-b border-orange-500"
                    : "text-gray-500 border-b border-gray-300"
                }`
              }
              onClick={toggleSidebar}
            >
              Contact us
            </NavLink>
          </li>
        </ul>
        {/* <div className="mt-auto p-4 t-0 w-full"> 
          <NavLink
            to={"/login"}
            className={({ isActive }) =>
              `block duration-200 hover:text-orange-400 ${
                (isActive || location.pathname === "/register") ? "text-orange-500" : "text-gray-500"
              }`
            }
            onClick={toggleSidebar}
          >
            <FontAwesomeIcon className="text-xl" icon={faUser} /> Login
          </NavLink>
        </div> */}
      </div>
    </div>
  );
}

export default NavBar;
