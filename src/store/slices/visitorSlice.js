import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getVisitors = async () => {
    try {
        const res = await axios.get(`${import.meta.env.VITE_SERVER}/visitor`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });

        if (res.data.success ) {
            console.log(res.data.visitors)
            return res.data.visitors
        }

        else return Error


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

        console.log(res.data)
        if (res.data.success) {

            console.log(res.data)
            return res.data.selectedVisitor;
        }
    } catch (err) {
        console.log(err);
    }
};

export const visitorSlice = createSlice({
    name: "visitor",
    initialState: { visitor: [], selectedVisitor: {} },
    reducers: {
        setVisitor(state, action) {
            state.visitor = action.payload;
        },
        setSelectorVisitor(state, action) {
            state.selectedVisitor = { ...action.payload };
        },
    },
});

export const visitorActions = visitorSlice.actions;
