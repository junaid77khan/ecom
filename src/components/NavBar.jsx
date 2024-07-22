
import { useState, useRef, useEffect} from "react";
import { 
  FaUser, 
  FaSearch, 
  FaShoppingBag, 
  FaBars, 
  FaTimes 
} from "react-icons/fa";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import SearchFilter from "./SearchFilter";
import { useSelector, useDispatch } from "react-redux";
import { closePopup } from "../store/popupSlice";
import CartPopup from "../components/CartPopup";
import { ProfileDropDown } from "./ProfileDropDown";

function NavBar() {
  const popup = useSelector((state) => state.popup);
  const dispatch = useDispatch();

  const handleClosePopup = () => {
    dispatch(closePopup());
  };

  const location = useLocation();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // const toggleDropdown = () => {
  //   setIsDropdownOpen(!isDropdownOpen);
  // };

  // const handleClickOutside = (event) => {
  //   if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
  //     setIsDropdownOpen(false);
  //   }
  // };

  // useEffect(() => {
  //   document.addEventListener('click', handleClickOutside);
  //   return () => {
  //     document.removeEventListener('click', handleClickOutside);
  //   };
  // }, []);

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
          <FaBars className="text-xl" />
        </button>
        <a href="/">
          <div className="flex flex-wrap text-lg justify-center items-center">
            <img
              src={import.meta.env.VITE_API_LOGO}
              className="h-16 w-36 sm:h-20 sm:w-48  lg:h-20 pt-0 lg:w-60"
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
            className="block duration-200 "
          >
            <FaSearch className="md:text-xl text-md text-gray-500 hover:text-orange-400" />
          </button>
        </li>
        {/* <li ref={dropdownRef}>
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="block duration-200 relative"
            >
              <FaUser className={`md:text-xl text-md text-gray-500 ${isDropdownOpen ? 'text-orange-500' : 'text-gray-500'} hover:text-orange-400`} />
            </button>
            {isDropdownOpen && (
              <ProfileDropDown setIsDropdownOpen={setIsDropdownOpen} />
            )}
          </div>
        </li> */}
        <li>
          <NavLink
            to={"/cart"}
            className={({ isActive }) =>
              `block duration-200 hover:text-orange-400 ${
                isActive ? "text-orange-500" : "text-gray-500"
              }`
            }
          >
            <FaShoppingBag className="md:text-xl text-md" />
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
          <button
            onClick={toggleSidebar}
            className="block duration-200 hover:text-orange-400"
          >
            <FaTimes className="text-xl" />
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
      </div>
    </div>
  );
}

export default NavBar;
