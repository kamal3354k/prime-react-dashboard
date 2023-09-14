import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { productApi } from "./services/productApi";
import productSlice from "./slice/productSlice";
import allProductSlice from "./slice/allProductSlice";



const store = configureStore({
  reducer: {
    product: productSlice,
    products: allProductSlice,
    [productApi.reducerPath]: productApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      productApi.middleware
    ),
});

export default store;
