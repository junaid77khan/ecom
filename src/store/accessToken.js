import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   token: JSON.parse(localStorage.getItem("Access Token")) || ""
}

const AccessTokenSlice = createSlice({
    name: "accessToken",
    initialState,
    reducers: {
        storeATLS: (state, action) => {
            localStorage.setItem("Access Token", JSON.stringify(action.payload));
            state.token = JSON.parse(localStorage.getItem("Access Token"))
        },
        deleteATLS: (state, action) => {
            localStorage.removeItem("Access Token");
        },
        setTokenWithExpiry: (state, action)  => {
            const now = new Date();
            const expiry = new Date(now.getTime() + 3600000).getTime();
            localStorage.setItem('accessToken', JSON.stringify(expiry));
        }
        
    }
})

export const {storeATLS, deleteATLS, setTokenWithExpiry} = AccessTokenSlice.actions
export default AccessTokenSlice.reducer
