import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";
import popupReducer from './popupSlice'; 
import productSlice from "./productSlice";

const store = configureStore({
    reducer: {
        cart: cartSlice,
        popup: popupReducer,
        product: productSlice
    }
})

export {store}




