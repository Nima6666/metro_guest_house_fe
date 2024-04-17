import { configureStore } from "@reduxjs/toolkit";
import { loginSlice } from "./slices/loginSlice";

const store = configureStore({
  reducer: {
    loginReducer: loginSlice.reducer,
  },
});

export default store;
