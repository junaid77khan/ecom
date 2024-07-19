import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";
import popupReducer from './popupSlice'; 
import productSlice from "./productSlice";
import authSlice from "./authSlice";
import accessToken from "./accessToken";

const store = configureStore({
    reducer: {
        cart: cartSlice,
        popup: popupReducer,
        product: productSlice,
        accessToken,
        auth: authSlice
    }
})

export {store}




