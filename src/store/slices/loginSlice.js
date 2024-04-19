import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getLoggedInUser = async () => {
  const token = localStorage.getItem("token");

  if (token) {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_SERVER}/users/getCurrentUser`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // if (!res.data.success) {
      //   return localStorage.removeItem("token");
      // }
      return res.data;
    } catch (err) {
      console.log(err);
    }
  }
};

export const logOut = () => {
  localStorage.removeItem("token");
};

export const loginSlice = createSlice({
  name: "loginSlice",
  initialState: { loggedIn: false, loggedInUser: {} },
  reducers: {
    login(state) {
      state.loggedIn = true;
    },
    logout(state) {
      state.loggedIn = false;
    },
    setUser(state, action) {
      state.loggedInUser = { ...action.payload };
    },
  },
});

export const loginActions = loginSlice.actions;
