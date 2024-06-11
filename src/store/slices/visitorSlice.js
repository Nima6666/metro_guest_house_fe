import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

export const getVisitors = async () => {
  try {
    const res = await axios.get(`${import.meta.env.VITE_SERVER}/visitor`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (res.data.success) {
      console.log(res.data.visitors);
      return res.data.visitors;
    } else return Error;

    // return res.data.allusers;
  } catch (err) {
    console.log(err);
  }
};

export const getSelectedVisitor = async (visitorId) => {
  try {
    console.log(
      "getting",
      `${import.meta.env.VITE_SERVER}/visitor/${visitorId}`
    );
    const res = await axios.get(
      `${import.meta.env.VITE_SERVER}/visitor/${visitorId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    console.log(res.data);

    if (res.data.success == false) {
      localStorage.removeItem("token");
      window.location.reload();
    }

    if (res.data.success) {
      console.log(res.data);
      return res.data.selectedVisitor;
    }
  } catch (err) {
    console.log(err);
  }
};

export const getVisitorWithNumber = async (number) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_SERVER}/visitor/numberSearch`,
      { number },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response.data.foundUsersWithInitialOfProvidedNumber;
  } catch (err) {
    console.error(err);
  }
};

export const addNewEntry = async (visitorId, formData) => {
  console.log(formData);
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_SERVER}/visitor/${visitorId}/addEntry`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    console.log(response.data);
  } catch (err) {
    console.error(err);
  }
};

export const getTodaysEntry = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_SERVER}/visitor/entriesToday`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    console.log("Visitors Today ", response.data);
    if (response.data.success) {
      return response.data.visitorsToday;
    }
  } catch (err) {
    console.error(err);
  }
};

export const deleteEntry = async (id, entryId) => {
  try {
    const response = await axios.delete(
      `${import.meta.env.VITE_SERVER}/visitor/${id}/${entryId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response.data;
  } catch (err) {
    console.error(err);
  }
};

export const visitorSlice = createSlice({
  name: "visitor",
  initialState: {
    visitor: [],
    selectedVisitor: {},
    searchedVisitor: [],
    visitorsToday: [],
  },
  reducers: {
    setVisitor(state, action) {
      state.visitor = action.payload;
    },
    setSelectorVisitor(state, action) {
      state.selectedVisitor = { ...action.payload };
    },
    setSearchedVisitor(state, action) {
      state.searchedVisitor = action.payload;
    },
    setVisitorsToday(state, action) {
      state.visitorsToday = action.payload;
    },
  },
});

export const visitorActions = visitorSlice.actions;
