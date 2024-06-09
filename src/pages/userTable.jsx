import { useSelector } from "react-redux";
import TableComponent from "./components/Table";
import { Link } from "react-router-dom";

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
    {
      Header: "Actions",
      Cell: ({ row }) => {
        const handleEdit = () => {
          // Add your edit logic here
          console.log("Edit row:", row.original);
        };

        const handleDelete = () => {
          // Add your delete logic here
          console.log("Delete row:", row.original);
        };

        return (
          <div className="flex flex-row">
            <Link to={`/users/${row.original._id}`}>
              <button className="bg-gray-600 p-2 rounded-md text-white font-semibold mx-2">
                View
              </button>
            </Link>
          </div>
        );
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
