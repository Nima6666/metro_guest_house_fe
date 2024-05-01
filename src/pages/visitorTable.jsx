import { useEffect, useState } from "react";
import { mockData } from "../assets/MOCK_DATA";

import "../pages/components/table.css";
import TableComponent from "./components/Table";
import { useDispatch, useSelector } from "react-redux";
import { getVisitors, visitorActions } from "../store/slices/visitorSlice";

export default function VisitorTable() {
    const visitors = useSelector((state) => state.visitorReducer.visitor);

    const dispatch = useDispatch()

    useEffect(() => {
        async function getVisitorsHandler() {
            dispatch(visitorActions.setVisitor(await getVisitors()))
        }
        getVisitorsHandler();
    }, []);

    const COLUMNS = [
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
            Cell: ({ value }) => {
                return new Date(value).toLocaleString('en-US', { 
                    year: 'numeric', 
                    month: 'short', 
                    day: '2-digit',
                    hour: 'numeric',
                    minute: '2-digit',
                    hour12: true
                }); // Format date as per locale
            },
        },
    ];

    console.log("visitors", visitors)

    return (
        <div className="flex flex-col w-full p-2">
            <h1 className="text-xl font-semibold text-center p-4">
                All Visitors
            </h1>
            {visitors && visitors.length && (

                <TableComponent COLUMNS={COLUMNS} Data={visitors} />
            )}
        </div>
    );
}
