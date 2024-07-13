// import React, { useEffect, useState, useRef } from 'react'
import {
  faUser,
  faSearch,
  faBagShopping,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "@fortawesome/fontawesome-svg-core/styles.css";


import SearchFilter from './SearchFilter';
import { useState } from "react";



import { useSelector, useDispatch } from 'react-redux';
import { closePopup } from '../store/popupSlice';
import CartPopup from '../components/CartPopup';

function NavBar() {
  // const navigate = useNavigate();


  const popup = useSelector((state) => state.popup);
  const dispatch = useDispatch();

  const handleClosePopup = () => {
    dispatch(closePopup());
  };


  const location = useLocation();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const products = [
    { id: 1, name: 'Product 1' },
    { id: 2, name: 'Product 2' },
    { id: 3, name: 'Product 3' },
  ];
  const handleSearchClick = () => {
    setIsSearchOpen(true);
  };

  const handleCloseSearch = () => {
    setIsSearchOpen(false);
  };

  return (
    <div className="w-full h-20 bg-gradient-to-b  from-orange-50 to-orange-50 flex flex-wrap justify-between items-center px-24 z-10">
      <a href="/">
        {" "}
        <div className="flex flex-wrap text-lg justify-center items-center">Logo</div>
      </a>
      <ul className="flex flex-wrap gap-10 text-lg justify-center items-center relative">
        <li>
          <NavLink
            to={"/"}
            className={({ isActive }) =>
              `block duration-200 hover:text-orange-400 ${
                isActive ? "text-orange-500 border-b border-orange-500" : "text-gray-500 border-b border-gray-300"
              } 
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
                (isActive || location.pathname.startsWith("/product")) ? "text-orange-500 border-b border-orange-500" : "text-gray-500 border-b border-gray-300"
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
                isActive ? "text-orange-500 border-b border-orange-500" : "text-gray-500 border-b border-gray-300"
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
              `block  duration-200 hover:text-orange-400 ${
                isActive ? "text-orange-500 border-b border-orange-500" : "text-gray-500 border-b border-gray-300"
              }`
            }
          >
            Contact us
          </NavLink>
        </li>
      </ul>
      <ul className="flex flex-wrap justify-center text-lg items-center gap-10">
        <li>
          {/* <NavLink className="block duration-200 hover:text-red-500">
            <FontAwesomeIcon className="text-xl" icon={faSearch} />
          </NavLink> */}
            <button onClick={handleSearchClick} className={`block duration-200 hover:text-orange-400 `}>
            <FontAwesomeIcon className="text-xl" icon={faSearch} />
          </button>

        </li>
        <li>
          <NavLink
            to={"/login"}
            className={({ isActive }) =>
              `block duration-200 hover:text-orange-400 ${
                (isActive || location.pathname === '/register') ? "text-orange-500" : "text-gray-500"
              }`
            }
          >
            <FontAwesomeIcon className="text-xl" icon={faUser} />
          </NavLink>
        </li>
        <li>
          <NavLink
            to={"/cart"}
            className={({ isActive }) =>
              `block  duration-200 hover:text-orange-400 ${
                isActive ? "text-orange-500" : "text-gray-500"
              }`
            }
          >
            <FontAwesomeIcon className="text-xl" icon={faBagShopping} />
          </NavLink>
        </li>
      </ul>
      {isSearchOpen && <SearchFilter products={products} onClose={handleCloseSearch} />}
      {popup.isVisible && <CartPopup product={popup.product} onClose={handleClosePopup} />}

    </div>
  );
}

export default NavBar;
