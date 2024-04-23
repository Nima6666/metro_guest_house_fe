import { useSelector } from "react-redux";
import TableComponent from "./components/Table";

export default function UserTable() {
    const users = useSelector((state) => state.userReducer.users);

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
            Header: "Created Time",
            accessor: "createdUserTimestamp",
        },
    ];

    console.log(users);

    return (
        <div className="flex flex-col w-full p-2">
            <h1 className="text-xl font-semibold text-center p-4">My Staff</h1>
            {users && <TableComponent COLUMNS={COLUMNS} Data={users} />}
        </div>
    );
}
