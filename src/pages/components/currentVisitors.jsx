import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { visitorActions } from "../../store/slices/visitorSlice";
import TableComponent from "./Table";
import { IoMdExit } from "react-icons/io";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { BounceLoader } from "react-spinners";

export default function CurrentVisitors() {
  const dispatch = useDispatch();
  const currentVisitors = useSelector(
    (state) => state.visitorReducer.currentVisitors
  );

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getCurrentVisitors() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER}/visitor/currentVisitors`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log(response.data.success);
        if (response.data.success) {
          dispatch(
            visitorActions.setCurrentVisitors(
              await response.data.currentVisitors
            )
          );
        }
      } catch (err) {
        console.error(err);
      }
    }
    getCurrentVisitors();
  }, [loading]);

  console.log(currentVisitors);

  const COLUMNS = [
    {
      Header: "#",
      Cell: ({ row }) => {
        return row.index + 1; // Display index starting from 1
      },
    },
    { Header: "First Name", accessor: "firstname" },
    { Header: "Last Name", accessor: "lastname" },
    { Header: "Phone Number", accessor: "phone" },
    {
      Header: "Checkin",
      accessor: "time",
      Cell: ({ value }) => {
        return (
          <div className="text-nowrap">
            {new Date(value).toLocaleString("en-US", {
              year: "numeric",
              month: "short",
              day: "2-digit",
              hour: "numeric",
              minute: "2-digit",
              hour12: true,
            })}
          </div>
        );
      },
    },
    {
      Header: "Room No",
      accessor: "room",
    },
    {
      Header: "With",
      accessor: "with",
      Cell: ({ value }) => {
        if (value == 0) {
          return "Single";
        } else if (value == 1) {
          return `${value} Other`;
        } else {
          return `${value} Others`;
        }
      },
    },
    {
      Header: "Actions",
      Cell: ({ row }) => {
        async function checkoutHandler(entryInfo) {
          // setEntryLoading(true);
          setLoading(true);

          console.log(entryInfo);
          try {
            const response = await axios.put(
              `${import.meta.env.VITE_SERVER}/visitor/${entryInfo.visitorId}/${
                entryInfo.entryId
              }`,
              {},
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              }
            );

            if (response.data.success) {
              console.log(response.data);
              toast(response.data.message);
              // setEntries(response.data.editedEntry);
              window.location.reload();
            } else {
              toast.error(response.data.message);
            }
            // setEntryLoading(false);
            setLoading(false);
          } catch (err) {
            console.error(err);
          }
        }

        return (
          <div className="flex flex-row">
            <Link
              to={`/visitor/${row.original.visitorId}/viewEntry/${row.original.entryId}`}
            >
              <button className="bg-gray-600 p-2 rounded-md text-white font-semibold mx-2 flex items-center justify-center text-nowrap">
                View Entry
                <div className="pl-2">
                  <MdOutlineRemoveRedEye />
                </div>
              </button>
            </Link>
            <Link to={`/visitor/${row.original.visitorId}`}>
              <button className="bg-gray-600 p-2 rounded-md text-white font-semibold mx-2 flex items-center justify-center text-nowrap">
                Visitor Details
                <div className="pl-2">
                  <MdOutlineRemoveRedEye />
                </div>
              </button>
            </Link>
            <button
              className="bg-green-600 p-2 rounded-md text-white font-semibold mx-2 flex items-center justify-center"
              onClick={() => checkoutHandler(row.original)}
            >
              Checkout
              <div className="pl-2">
                <IoMdExit />
              </div>
            </button>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <h1 className="text-xl font-semibold text-center my-4">
        Current Visitors
      </h1>
      {loading ? (
        <BounceLoader />
      ) : currentVisitors.length ? (
        <TableComponent COLUMNS={COLUMNS} Data={currentVisitors} />
      ) : (
        <div className="text-center">No Current Visitors</div>
      )}
    </div>
  );
}
