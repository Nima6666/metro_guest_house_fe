import { useSelector } from "react-redux";
import TableComponent from "./components/Table";

export default function UserTable() {
  const users = useSelector((state) => state.userReducer.users);

  const COLUMNS = [
    {
      Header: "First Name",
      accessor: "firstname",
      filterFn: (rows, id, filterValue) => {
        return rows.filter((row) =>
          row.original.firstname
            .toLowerCase()
            .includes(filterValue.toLowerCase())
        );
      },
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
      Cell: ({ value }) => {
        return new Date(value).toLocaleString("en-US", {
          year: "numeric",
          month: "short",
          day: "2-digit",
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        }); // Format date as per locale
      },
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
