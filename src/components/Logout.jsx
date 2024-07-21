import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { deleteATLS } from "../store/accessToken"
import { useDispatch } from "react-redux"
import { logout } from "../store/authSlice"

function Logout() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const handleLogout = async () => {
            try {
                const token = JSON.parse(localStorage.getItem("Access Token"));
                const logoutResponse = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/user/logout`, {
                    method: 'GET',
                    mode: 'cors',
                    credentials: 'include',
                    headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                    },
                });
        
                if (logoutResponse.ok) {
                    console.error("Logout successfully");
                } else {
                    console.error('Error during logout:');
                }
            } catch (error) {
                console.error('Error during logout:', error);
            }
            dispatch(deleteATLS());
            dispatch(logout())
            localStorage.removeItem("accessToken");
            navigate("/");
        };
        handleLogout();
    })

    return (
        <>
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-gray-900 opacity-75 flex justify-center items-center z-50">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
        </div>
        <div className="h-96"></div>
        </>
    )
}

export default Logout
