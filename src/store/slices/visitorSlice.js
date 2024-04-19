import { createSlice } from "@reduxjs/toolkit";

export const visitorSlice = createSlice({
  name: "visitor",
  initialState: { visitor: {} },
  reducer: {
    setVisitor(state, action) {
      state.visitor = { ...action.payload };
    },
  },
});

const visitorActions = visitorSlice.actions;
