import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { productApi } from "./services/productApi";
import productSlice from "./slice/productSlice";

const store = configureStore({
  reducer: {
    product: productSlice,
    [productApi.reducerPath]: productApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      productApi.middleware
    ),
});

export default store;
