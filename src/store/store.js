import { configureStore } from "@reduxjs/toolkit";
import { loginSlice } from "./slices/loginSlice";
import { usersSlice } from "./slices/usersSlice";

const store = configureStore({
  reducer: {
    loginReducer: loginSlice.reducer,
    userReducer: usersSlice.reducer,
  },
});

export default store;
