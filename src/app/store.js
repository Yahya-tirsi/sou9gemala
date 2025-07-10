import { configureStore } from "@reduxjs/toolkit";
import supplierReducer from "../features/supplier/supplierSlice";

const store = configureStore({
  reducer: {
    supplier: supplierReducer,
    // Add other reducers here if needed
  },
});

export default store;
