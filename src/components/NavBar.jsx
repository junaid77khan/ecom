// import React, { useEffect, useState, useRef } from 'react'
import {
  faUser,
  faSearch,
  faBagShopping,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "@fortawesome/fontawesome-svg-core/styles.css";

function NavBar() {
  // const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="w-full h-20 flex flex-wrap justify-around items-center z-10">
      <a href="/">
        {" "}
        <div className="flex flex-wrap justify-center items-center">Logo</div>
      </a>
      <ul className="flex flex-wrap gap-5 justify-center items-center relative">
        <li>
          <NavLink
            to={"/"}
            className={({ isActive }) =>
              `block duration-200 hover:text-red-500 ${
                isActive ? "text-red-500" : "text-gray-500"
              } ${
                isActive
                  ? "border-b border-red-500"
                  : "border-b border-gray-300"
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
              `block duration-200 hover:text-red-500 ${
                (isActive || location.pathname.startsWith("/product")) ? "text-red-500 border-b border-red-500" : "text-gray-500 border-b border-gray-300"
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
              `block duration-200 hover:text-red-500 ${
                isActive ? "text-red-500" : "text-gray-500"
              } ${
                isActive
                  ? "border-b border-red-500"
                  : "border-b border-gray-300"
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
              `block  duration-200 hover:text-red-500 ${
                isActive ? "text-red-500" : "text-gray-500"
              } ${
                isActive
                  ? "border-b border-red-500"
                  : "border-b border-gray-300"
              }`
            }
          >
            Contact us
          </NavLink>
        </li>
      </ul>
      <ul className="flex flex-wrap justify-center items-center gap-5">
        <li>
          <NavLink className="block duration-200 hover:text-red-500">
            <FontAwesomeIcon className="text-xl" icon={faSearch} />
          </NavLink>
        </li>
        <li>
          <NavLink
            to={"/login"}
            className={({ isActive }) =>
              `block duration-200 hover:text-red-500 ${
                (isActive || location.pathname === '/register') ? "text-red-500" : "text-gray-500"
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
              `block  duration-200 hover:text-red-500 ${
                isActive ? "text-red-500" : "text-gray-500"
              }`
            }
          >
            <FontAwesomeIcon className="text-xl" icon={faBagShopping} />
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default NavBar;
