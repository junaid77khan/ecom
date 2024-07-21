import { createSlice } from '@reduxjs/toolkit';
import CryptoJS from 'crypto-js';
import { act } from 'react';

const initialState = {
  cartInfo: JSON.parse(localStorage.getItem('cartInfo')) || []
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const { product } = action.payload;

      let cartProducts;
      if (state.cartInfo && state.cartInfo.length === 2) {
        cartProducts = state.cartInfo[1];
      } else {
        cartProducts = [];
      }
      
      let existingProduct = cartProducts.find(item => item._id === product._id);

      if (existingProduct) {
        existingProduct.quantity += product.quantity;
      } else {
        cartProducts.push(product);
      }
      
      const cryptoKey = CryptoJS.SHA256(JSON.stringify(cartProducts)).toString();

      state.cartInfo = [cryptoKey, cartProducts];

      localStorage.setItem('cartInfo', JSON.stringify(state.cartInfo));
    },

    removeFromCart(state, action) {
      const { productId } = action.payload;

      let cartProducts;
      if (state.cartInfo && state.cartInfo.length === 2) {
        cartProducts = state.cartInfo[1];
      } else {
        cartProducts = [];
      }

      cartProducts = cartProducts.filter(pro => pro._id !== productId);

      const cryptoKey = CryptoJS.SHA256(JSON.stringify(cartProducts)).toString();

      state.cartInfo = [cryptoKey, cartProducts];

      localStorage.setItem('cartInfo', JSON.stringify(state.cartInfo));
    },
    increaseQuantity(state, action) {
      const { productId } = action.payload;
      let cartProducts;
      if (state.cartInfo && state.cartInfo.length === 2) {
        cartProducts = state.cartInfo[1];
      } else {
        cartProducts = [];
      }

      cartProducts.map((product, index) => {
        if(product._id === productId) {
          product.quantity += 1;
          cartProducts.splice(index, 1);
          cartProducts.push(product);
          const cryptoKey = CryptoJS.SHA256(JSON.stringify(cartProducts)).toString();
          state.cartInfo = [cryptoKey, cartProducts];

          localStorage.setItem('cartInfo', JSON.stringify(state.cartInfo));
        }
      })
    },
    decreaseQuantity(state, action) {
      const { productId } = action.payload;
      let cartProducts;
      if (state.cartInfo && state.cartInfo.length === 2) {
        cartProducts = state.cartInfo[1];
      } else {
        cartProducts = [];
      }

      cartProducts.map((product, index) => {
        if(product._id === productId) {
          if(product.quantity > 0) {
            product.quantity -= 1;
            cartProducts.splice(index, 1);
            cartProducts.push(product);
            const cryptoKey = CryptoJS.SHA256(JSON.stringify(cartProducts)).toString();
            state.cartInfo = [cryptoKey, cartProducts];

            localStorage.setItem('cartInfo', JSON.stringify(state.cartInfo));
          } else {
            cartProducts.splice(index, 1);
            const cryptoKey = CryptoJS.SHA256(JSON.stringify(cartProducts)).toString();
            state.cartInfo = [cryptoKey, cartProducts];

            localStorage.setItem('cartInfo', JSON.stringify(state.cartInfo));
          }
          return;
        }
      })
    }
  }
});

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity } = cartSlice.actions;
export default cartSlice.reducer;
