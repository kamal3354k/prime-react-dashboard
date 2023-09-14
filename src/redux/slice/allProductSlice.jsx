import {createSlice } from "@reduxjs/toolkit";

const initialState_Product = [];

const allProductSlice = createSlice({
  name: "products",
  initialState: initialState_Product,
  reducers: {
    setAllProduct: (state, action) => {
      return action.payload && [...action.payload];
    },
  },
});

export const { setAllProduct } = allProductSlice.actions;
export default allProductSlice.reducer;
