import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";
import popupReducer from './popupSlice'; // Assuming you have already defined this

const store = configureStore({
    reducer: {
        cart: cartSlice,
        popup: popupReducer,

    }
})

export {store}




