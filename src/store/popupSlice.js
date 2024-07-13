// popupSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const popupSlice = createSlice({
  name: 'popup',
  initialState: {
    isVisible: false,
    product: null,
  },
  reducers: {
    showPopup: (state, action) => {
      state.product = action.payload;
      state.isVisible = true;
    },
    closePopup: (state) => {
      state.isVisible = false;
      state.product = null;
    },
  },
});

export const { showPopup, closePopup } = popupSlice.actions;

export default popupSlice.reducer;
