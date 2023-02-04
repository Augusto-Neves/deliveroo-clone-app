import { configureStore } from "@reduxjs/toolkit";
import basketReducer from "./reducers/basketSlice";

export const store = configureStore({
  reducer: {
    basket: basketReducer,
  },
});
