import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import TableComponent from "./components/Table";
import {
  getVisitorWithNumber,
  getVisitors,
  visitorActions,
} from "../store/slices/visitorSlice";
import "../pages/components/table.css";
import { BounceLoader } from "react-spinners";
import Register from "./register";
import VisitorForm from "./visitorForm";

export default function VisitorTable() {
  const visitors = useSelector((state) => state.visitorReducer.visitor);

  const searchedVisitor = useSelector(
    (state) => state.visitorReducer.searchedVisitor
  );

  const [search, setSearch] = useState(false);

  const [loading, setLoading] = useState(true);

  const [number, setNumber] = useState("");

  const [addVisitorForm, setAddVisitorForm] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    async function getVisitorsHandler() {
      const visitorsData = await getVisitors();
      dispatch(visitorActions.setVisitor(visitorsData));
      setLoading(false);
    }

    getVisitorsHandler();
  }, [search, dispatch]);

  const COLUMNS = [
    {
      Header: "#",
      Cell: ({ row }) => {
        return row.index + 1; // Display index starting from 1
      },
    },
    { Header: "First Name", accessor: "firstname" },
    { Header: "Last Name", accessor: "lastname" },
    { Header: "Age", accessor: "age" },
    { Header: "Gender", accessor: "gender" },
    { Header: "Phone Number", accessor: "phone" },
    { Header: "Address", accessor: "address" },
    { Header: "Occupation", accessor: "occupation" },
    { Header: "ID Type", accessor: "documentType" },
    { Header: "Document ID", accessor: "documentId" },
    {
      Header: "Created By",
      accessor: "enteredBy",
      Cell: ({ value }) => {
        return <Link to={`/users/${value._id}`}>{value.firstname}</Link>;
      },
    },
    {
      Header: "Entered At",
      accessor: "enteredAt",
      Cell: ({ value }) => {
        return new Date(value).toLocaleString("en-US", {
          year: "numeric",
          month: "short",
          day: "2-digit",
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        });
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
            <Link to={`/visitor/${row.original._id}`}>
              <button className="bg-gray-600 p-2 rounded-md text-white font-semibold mx-2">
                View
              </button>
            </Link>
          </div>
        );
      },
    },
  ];

  async function checkNumberInDatabase(e) {
    const inputNumber = e.target.value;
    setAddVisitorForm(false);
    setSearch(true);
    setLoading(true);
    setNumber(inputNumber);

    console.log("found visitors", searchedVisitor);

    if (inputNumber) {
      const visitorsData = await getVisitorWithNumber(inputNumber);
      dispatch(visitorActions.setSearchedVisitor(visitorsData));
      setLoading(false);
    } else {
      setSearch(false);
    }

    console.log(inputNumber);
  }
  return (
    <div className="flex flex-col w-full p-2">
      <div className="self-center flex flex-col">
        <label htmlFor="phone">Phone Number</label>
        <input
          type="number"
          name="phone"
          id="phone"
          className="border border-yellow-700 rounded-md transition-all duration-200 focus:outline-none focus:border-green-500 p-1 w-full"
          onChange={checkNumberInDatabase}
          value={number}
        />
      </div>
      <h1 className="text-xl font-semibold text-center p-4">All Visitors</h1>
      {loading ? (
        <BounceLoader />
      ) : search && searchedVisitor ? (
        searchedVisitor.length < 1 ? (
          <>
            <p className="self-center">
              No visitors found with provided number
            </p>
            <button
              className="rounded-md bg-black text-white mt-2 p-2 self-center"
              onClick={() => setAddVisitorForm(true)}
            >
              Add New
            </button>
            {addVisitorForm && <VisitorForm number={number} />}
          </>
        ) : (
          <>
            <TableComponent COLUMNS={COLUMNS} Data={searchedVisitor} />
            {addVisitorForm && <Register />}
          </>
        )
      ) : visitors && visitors.length > 0 ? (
        <TableComponent COLUMNS={COLUMNS} Data={visitors} />
      ) : (
        <p className="text-center">No visitors found</p>
      )}
    </div>
  );
}
