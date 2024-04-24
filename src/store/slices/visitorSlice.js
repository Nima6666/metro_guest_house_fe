import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getVisitors = async () => {
    try {
        const res = await axios.get(`${import.meta.env.VITE_SERVER}/visitor`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });

        console.log(res.data.visitors);

        // return res.data.allusers;
    } catch (err) {
        console.log(err);
    }
};

export const getSelectedVisitor = async (visitorId) => {
    try {
        console.log(
            "getting",
            `${import.meta.env.VITE_SERVER}/visitor/${userId}`
        );
        const res = await axios.get(
            `${import.meta.env.VITE_SERVER}/visitor/${userId}`,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }
        );

        if (res.data.success) {
            return res.data.user;
        }

        return res.data;
    } catch (err) {
        console.log(err);
    }
};

export const visitorSlice = createSlice({
    name: "visitor",
    initialState: { visitor: [], selectedVisitor: {} },
    reducer: {
        setVisitor(state, action) {
            state.visitor = action.payload;
        },
        setSelectorVisitor(state, action) {
            state.selectedVisitor = { ...action.payload };
        },
    },
});

const visitorActions = visitorSlice.actions;
