import { useEffect, useState } from "react";
import { mockData } from "../assets/MOCK_DATA";

import "../pages/components/table.css";
import TableComponent from "./components/Table";
import { useSelector } from "react-redux";
import { getVisitors } from "../store/slices/visitorSlice";

export default function VisitorTable() {
    const visitors = useSelector((state) => state.visitorReducer.visitor);

    useEffect(() => {
        async function getVisitorsHandler() {
            await getVisitors();
        }
        getVisitorsHandler();
    });

    const COLUMNS = [
        {
            Header: "ID",
            accessor: "_id",
        },
        {
            Header: "First Name",
            accessor: "firstname",
        },
        {
            Header: "Last Name",
            accessor: "lastname",
        },
        {
            Header: "Phone Number",
            accessor: "phone",
        },
        {
            Header: "ID Type",
            accessor: "documentType",
        },
        {
            Header: "Entered By",
            accessor: "enteredBy",
        },
        {
            Header: "Entered At",
            accessor: "enteredAt",
        },
    ];

    console.log(visitors);

    return (
        <div className="flex flex-col w-full p-2">
            <h1 className="text-xl font-semibold text-center p-4">
                All Visitors
            </h1>
            <TableComponent COLUMNS={COLUMNS} Data={mockData} />
        </div>
    );
}
