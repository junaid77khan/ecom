
import { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../store/authSlice";
import { setTokenWithExpiry } from "../store/accessToken";
import { useDispatch } from "react-redux";

export const ProfileDropDown = (props) => {
    const [userStatus, setUserStatus] = useState(null);
    const[isAdmin, setIsAdmin] = useState(false); 
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {setIsDropdownOpen} = props

    useEffect(() => {
        const checkUserStatus = async () => {
            try {
                let expiry = JSON.parse(localStorage.getItem("accessToken"));
                if(expiry && new Date().getTime() < expiry) {
                    setUserStatus(true);
                } else {
                  const token = JSON.parse(localStorage.getItem("Access Token"));
                    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/users/verification`, {
                        method: 'GET',
                        mode: 'cors',  
                        credentials: 'include',
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json',
                            'Authorization': `Bearer ${token}`
                        },
                    });
    
                    if (response.ok) {
                        const jsonResponse = await response.json();
                        if(jsonResponse.data.isAuthenticated) {
                            dispatch(setTokenWithExpiry({ttl: 432000000}));
                            setUserStatus(true);
                        } else {
                            setUserStatus(false);
                        }
                        if(jsonResponse.data.isAdmin) {
                          setIsAdmin(true);
                      } else {
                        setIsAdmin(false);
                      }
                    } else {
                        dispatch(logout());
                        setUserStatus(false);
                    }
                            
                }    
            } catch (error) {
                console.error('Error checking user status:', error);
                dispatch(logout());
                setUserStatus(false); 
            }
        };
    
        checkUserStatus();
      }, [navigate]);
    

    const handleMenuItemClick = (path) => {
      setIsDropdownOpen(false);
      navigate(path);
    };
    return (
        <div className="absolute right-0 mt-2 w-36 md:w-48 bg-white rounded-lg shadow-lg py-1 z-10">
        {!userStatus && <button
          onClick={() => handleMenuItemClick("/signin")}
          className="inline px-4 py-2 text-start text-sm text-gray-800 hover:bg-orange-50 w-full"
        >
          Sign In
        </button>}
        {!userStatus && <button
          onClick={() => handleMenuItemClick("/signup")}
          className="inline px-4 py-2 text-sm text-start text-gray-800 hover:bg-orange-50 w-full"
        >
          Sign Up
        </button>}
        {
          userStatus &&
            <button
            onClick={() => handleMenuItemClick("/orders")}
            className="inline px-4 py-2 text-sm text-start text-gray-800 hover:bg-orange-50 w-full"
          >
            Orders
          </button>
        }
        {
          userStatus &&
            <button
            onClick={() => handleMenuItemClick("/edit-account")}
            className="inline px-4 py-2 text-sm text-start text-gray-800 hover:bg-orange-50 w-full"
          >
            Edit account
          </button>
        }
        {
          userStatus && isAdmin &&
          <button
            onClick={() => handleMenuItemClick("/admin")}
            className="inline px-4 py-2 text-sm text-start text-gray-800 hover:bg-orange-50 w-full"
          >
            Admin panel
          </button>
        }
        {
          userStatus &&
            <button
            onClick={() => handleMenuItemClick("/logout")}
            className="inline px-4 py-2 text-sm text-start text-gray-800 hover:bg-orange-50 w-full"
          >
            logout
          </button>
        }
      </div>
    )
}