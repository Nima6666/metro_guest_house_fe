import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { BounceLoader } from "react-spinners";
import { visitorActions } from "../store/slices/visitorSlice";
import TableComponent from "./components/Table";
import NepaliDate from "nepali-date-converter";
import { NepaliDatePicker } from "nepali-datepicker-reactjs";

import "nepali-datepicker-reactjs/dist/index.css";

export default function AllEntries() {
  const dispatch = useDispatch();
  const allEntries = useSelector((state) => state.visitorReducer.allEntries);

  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(null);

  // const getNepaliDateString = (date) => {
  //   if (!date) return "";
  //   try {
  //     const nepaliDate = new NepaliDate(new Date(date));
  //     return nepaliDate.format("YYYY-MM-DD");
  //   } catch (error) {
  //     console.error("Invalid date:", error);
  //     return "";
  //   }
  // };

  function nepaliDate(selDate) {
    if (!selDate) {
      return;
    }

    const date = new NepaliDate(selDate);

    const year = date.getYear();
    const month = date.getMonth();
    const calculatedMonth = month.toString().length < 2 ? `0${month}` : month;
    const day = date.getDay();
    const calculatedDay = day.toString().length < 2 ? `0${day}` : day;

    console.log(
      `${year}-${
        parseInt(calculatedMonth) > 12
          ? parseInt(calculatedMonth) - 12
          : parseInt(calculatedMonth) < 1
          ? 12 - parseInt(calculatedMonth)
          : calculatedMonth
      }-${calculatedDay}`
    );

    return `${year}-${
      parseInt(calculatedMonth) > 12
        ? parseInt(calculatedMonth) - 12
        : parseInt(calculatedMonth) < 1
        ? 12 - parseInt(calculatedMonth)
        : calculatedMonth
    }-${calculatedDay}`;
  }

  async function handleDateChange(date) {
    console.log(typeof date);
    const dateArr = date.split("-");
    console.log(dateArr);
    const jsDate = new NepaliDate(
      parseInt(dateArr[0]),
      12 < parseInt(dateArr[1] - 1)
        ? parseInt(dateArr[1] - 1) - 12
        : 1 > parseInt(dateArr[1] - 1)
        ? 12 - parseInt(dateArr[1] - 1)
        : parseInt(dateArr[1] - 1),
      parseInt(dateArr[2])
    ).toJsDate();
    console.log(jsDate);
    setSelectedDate(jsDate);
  }

  console.log("selected Date ", selectedDate);

  useEffect(() => {
    async function getAllEntries(date) {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER}/visitor/allEntries`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            params: {
              date: selectedDate,
            },
          }
        );
        if (response.data.success) {
          console.log(response.data);
          dispatch(
            visitorActions.setAllEntries(await response.data.allEntries)
          );
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    setLoading(true);
    getAllEntries(selectedDate);
  }, [selectedDate, dispatch]);

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
      Header: "Checkout",
      accessor: "checkout",
      Cell: ({ cell }) => {
        const { value } = cell;

        if (!value) {
          return "Vitrai xa";
        } else {
          return `${new Date(value).toLocaleString("en-US", {
            year: "numeric",
            month: "short",
            day: "2-digit",
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
          })}`;
        }
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
        return (
          <div className="flex flex-row">
            <Link
              to={`/visitor/${row.original.visitorId}/viewEntry/${row.original.entryId}`}
            >
              <button className="bg-yellow-600 rounded-full p-2 text-white font-semibold mx-2 flex items-center text-sm justify-center text-nowrap">
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
          </div>
        );
      },
    },
  ];

  return loading ? (
    <div>
      <BounceLoader />
    </div>
  ) : (
    <div>
      <div className="text-center my-4">
        <h1 className="text-xl font-semibold">
          All Entries ({allEntries.length}){" "}
          {selectedDate
            ? `on a date ${new NepaliDate(selectedDate).format(
                "dddd, MMMM Do YYYY"
              )}`
            : ""}
        </h1>
        <div className="flex items-center justify-center">
          Date
          <NepaliDatePicker
            value={selectedDate ? nepaliDate(selectedDate) : ""}
            onChange={(date) => handleDateChange(date)}
            className="border p-2 rounded m-2"
            options={{ calendarLocale: "en", valueLocale: "en" }}
          />
          {selectedDate && (
            <button
              className="bg-green-600 p-2 rounded-md text-white font-semibold mx-2"
              onClick={() => setSelectedDate(null)}
            >
              Clear Date
            </button>
          )}
        </div>
      </div>
      {loading ? (
        <div className="relative pointer-events-none">
          <TableComponent
            COLUMNS={COLUMNS}
            Data={allEntries}
            className="opacity-45"
          />

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50">
            <BounceLoader />
          </div>
        </div>
      ) : allEntries && allEntries.length ? (
        <div>
          <TableComponent COLUMNS={COLUMNS} Data={allEntries} />
        </div>
      ) : (
        <div className="text-center">No Entries Yet</div>
      )}
    </div>
  );
}
