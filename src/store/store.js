import { configureStore } from "@reduxjs/toolkit";
import basketReducer from "./reducers/basketSlice";
import restaurantReducer from "./reducers/restaurantSlice";


export const store = configureStore({
  reducer: {
    basket: basketReducer,
    restaurant: restaurantReducer
  },
});
