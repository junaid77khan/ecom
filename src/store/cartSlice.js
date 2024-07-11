import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartProducts: []
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const { product } = action.payload;
      const existingProductIndex = state.cartProducts?.findIndex(item => item?.id === product?.id);

      if (existingProductIndex !== -1) {
        state.cartProducts[existingProductIndex].quantity += product?.quantity;
      } else {
        state.cartProducts.push({ ...product, quantity: product?.quantity });
      }
    },
    removeFromCart(state, action) {
      const { productId } = action.payload;
      state.cartProducts = state.cartProducts.filter(product => product.id !== productId);
    },
    increaseQuantity(state, action) {
      const { productId } = action.payload;
      const existingProduct = state.cartProducts.find(item => item.id === productId);

      if (existingProduct) {
        existingProduct.quantity += 1;
      }
    },
    decreaseQuantity(state, action) {
      const { productId } = action.payload;
      const existingProduct = state.cartProducts.find(item => item.id === productId);

      if (existingProduct && existingProduct.quantity > 1) {
        existingProduct.quantity -= 1;
      }
    }
  }
});

export const {addToCart, removeFromCart, increaseQuantity, decreaseQuantity} = cartSlice.actions
export default cartSlice.reducer

