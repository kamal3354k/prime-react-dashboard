import { createSlice } from "@reduxjs/toolkit";

export const initialState_Product = {
  id: null,
  title: "",
  description: "",
  price: null,
  discountPercentage: null,
  rating: null,
  stock: null,
  brand: null,
  category: null,
  thumbnail: "",
  images: [],
};

const productSlice = createSlice({
  name: "product",
  initialState:initialState_Product,
  reducers: {
    setCurrentProduct: (state, action) => {
        console.log(state,action.payload,"action")
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const { setCurrentProduct } = productSlice.actions;
export default productSlice.reducer;
