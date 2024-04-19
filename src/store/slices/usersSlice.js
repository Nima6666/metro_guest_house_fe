import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useDispatch } from "react-redux";

export const getUser = async () => {
  try {
    const res = await axios.get(`${import.meta.env.VITE_SERVER}/users`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const usersSlice = createSlice({
  name: "users",
  initialState: { users: [] },
  reducers: {
    setUsers(state, action) {
      state.users = action.payload.allusers;
    },
  },
});

export const userActions = usersSlice.actions;
