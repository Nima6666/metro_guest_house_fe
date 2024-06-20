import { useEffect } from "react";
import {
  getTodaysEntry,
  visitorActions,
} from "../../store/slices/visitorSlice";
import { useDispatch, useSelector } from "react-redux";
import TableComponent from "./Table";
import { Link } from "react-router-dom";

export default function EntriesToday() {
  const visitorsToday = useSelector(
    (state) => state.visitorReducer.visitorsToday
  );
  const dispatch = useDispatch();

  useEffect(() => {
    async function getEntriesToday() {
      dispatch(visitorActions.setVisitorsToday(await getTodaysEntry()));
    }

    getEntriesToday();
  }, []);

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
    { Header: "ID Type", accessor: "documentType" },
    {
      Header: "Entered By",
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
  ];

  if (!visitorsToday) {
    localStorage.removeItem("token");
    window.location.reload();
  }

  return (
    <div className="">
      <h1 className="text-xl font-semibold text-center my-4">Visitors Today</h1>
      {visitorsToday.length < 1 ? (
        <div>No Visitors Today</div>
      ) : (
        <TableComponent COLUMNS={COLUMNS} Data={visitorsToday} />
      )}
    </div>
  );
}
