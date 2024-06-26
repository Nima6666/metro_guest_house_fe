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
      // console.log(res.data.visitors);
      return res.data.visitors;
    } else {
      localStorage.removeItem("token");
      window.location.reload();
    }

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

    if (res.status == 401) {
      localStorage.removeItem("token");
      window.location.reload();
    }

    if (res.data.success) {
      return res.data.selectedVisitor;
    }
  } catch (err) {
    console.log(err);
  }
};

export const getEntry = async (visitorId, entryId) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_SERVER}/visitor/${visitorId}/${entryId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response.data;
  } catch (err) {
    alert("something went wrong");
    console.error(err);
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

export const notCheckedOut = async (id, entryId) => {
  try {
    const response = await axios.put(
      `${import.meta.env.VITE_SERVER}/visitor/${id}/${entryId}/notCheckout`,
      {},
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

export const editEntry = async (id, entryId, formData) => {
  try {
    const response = await axios.patch(
      `${import.meta.env.VITE_SERVER}/visitor/${id}/${entryId}`,
      formData,
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

export const deleteVisitor = async (visitorId) => {
  try {
    const response = await axios.delete(
      `${import.meta.env.VITE_SERVER}/visitor/${visitorId}`,
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
    currentVisitors: [],
    checkoutsToday: [],
    checkInsToday: [],
    selectedEntry: {},
    allEntries: [],
    entryView: "today",
  },
  reducers: {
    setVisitor(state, action) {
      state.visitor = action.payload;
    },
    setSelectedVisitor(state, action) {
      state.selectedVisitor = { ...action.payload };
    },
    setSearchedVisitor(state, action) {
      state.searchedVisitor = action.payload;
    },
    setVisitorsToday(state, action) {
      state.visitorsToday = action.payload;
    },
    setCurrentVisitors(state, action) {
      state.currentVisitors = action.payload;
    },
    setCheckoutsToday(state, action) {
      state.checkoutsToday = action.payload;
    },
    setSelectedEntry(state, action) {
      state.selectedEntry = { ...action.payload };
    },
    setCheckInsToday(state, action) {
      state.checkInsToday = action.payload;
    },
    setAllEntries(state, action) {
      state.allEntries = action.payload;
    },
    setEntryView(state, action) {
      state.entryView = action.payload;
    },
  },
});

export const visitorActions = visitorSlice.actions;
