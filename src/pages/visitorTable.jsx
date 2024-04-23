import { mockData } from "../assets/MOCK_DATA";

import "../pages/components/table.css";
import TableComponent from "./components/Table";

export default function VisitorTable() {
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

    return (
        <div className="flex flex-col w-full p-2">
            <h1 className="text-xl font-semibold text-center p-4">
                All Visitors
            </h1>
            <TableComponent COLUMNS={COLUMNS} Data={mockData} />
        </div>
    );
}
