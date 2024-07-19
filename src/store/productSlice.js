import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  bestSellerProduct: [],
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    fetchProductsData(state, action) {
      try {
        const fetchProducts = async () => {
          let response = await fetch(
            `http://localhost:8000/api/v1/product/all-products`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          response = await response.json();

          if (!response.success) {
            console.log("Error fetching products data");
          }
          console.log(res);
          state.products.push(response.data);
        };
        fetchProducts();
      } catch (error) {
        console.log("Error fetching product data", error);
      }
    },
    fetchBestSellerProduct(state, action) {
      try {
        const fetchProducts = async () => {
          let response = await fetch(
            `http://localhost:8000/api/v1/product/best-seller`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          response = await response.json();

          if (!response.success) {
            console.log("Error fetching best seller data");
          }
          state.bestSellerProduct.push(response.data);
        };
        fetchProducts();
      } catch (error) {
        console.log("Error fetching product data", error);
      }
    },
  },
});

export const { fetchProductsData, fetchBestSellerProduct } =
  productSlice.actions;
export default productSlice.reducer;
