import { Link } from "react-router-dom";
import { addNewEntry } from "../../store/slices/visitorSlice";
import TableComponent from "./Table";
import { useState } from "react";

export default function EntryTable({ entries, id }) {
  console.log("Entries ", entries);

  const [companionForm, setCompanionForm] = useState(false);

  const [companions, setCompaions] = useState([]);

  const [room, setRoom] = useState(null);
  const [lastVisitedAddress, setLastVisitedAddress] = useState("");
  const [nextDestination, setNextDestination] = useState("");
  const [purpose, setPurpose] = useState("");
  const [vechileNumber, setVechileNumber] = useState("");
  const [remarks, setRemarks] = useState("");

  async function addNewEntryHandler(e) {
    e.preventDefault();
    console.log("adding new entry to ", id);
    const formData = {
      room,
      lastVisitedAddress,
      nextDestination,
      purpose,
      vechileNumber,
      companions,
      remarks,
    };
    await addNewEntry(id, formData);
    window.location.reload();
  }

  const Columns = [
    {
      Header: "#",
      Cell: ({ row }) => {
        return row.index + 1; // Display index starting from 1
      },
    },
    {
      Header: "Entered By",
      accessor: "by",
      Cell: ({ value }) => {
        return <Link to={`/users/${value._id}`}>{value.firstname}</Link>;
      },
    },
    {
      Header: "At",
      accessor: "time",
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
      Header: "Last Visited Address",
      accessor: "lastVisitedAddress",
    },
    {
      Header: "Next Destination",
      accessor: "nextDestination",
    },
    {
      Header: "Purpose Of Visit",
      accessor: "purposeOfVisit",
    },
    {
      Header: "With",
      accessor: "companion",
      Cell: ({ value }) => {
        if (!value || value.length < 1) {
          return "Single";
        }
        return (
          <>
            {value.map((companion, index) => (
              <span key={index}>
                {companion}
                {index < value.length - 1 && <br />}
              </span>
            ))}
          </>
        );
      },
    },
  ];
  return (
    <>
      <div className="w-full pb-8">
        <h1 className="text-xl font-semibold text-center">Entries</h1>
        <div className="text-center">
          {companionForm && (
            <form className="bg-gray-200 p-2 rounded-lg m-4">
              <div className="p-4 rounded-lg bg-white">
                <div className="flex justify-center items-center flex-wrap">
                  <label htmlFor="room" className="flex-1 flex flex-col m-2">
                    Room No
                    <input
                      className="border border-yellow-700 rounded-md transition-all duration-200 focus:outline-none focus:border-green-500 p-1"
                      type="text"
                      name="room"
                      id="room"
                      onChange={(e) => setRoom(e.target.value)}
                      value={room}
                      onKeyPress={(e) => {
                        const isNumber = /[0-9]/.test(e.key);
                        if (!isNumber) {
                          e.preventDefault();
                        }
                      }}
                    />
                  </label>
                  <label
                    htmlFor="lastVisitedAddress"
                    className="flex-1 flex flex-col m-2"
                  >
                    Last Visited Address
                    <input
                      className="border border-yellow-700 rounded-md transition-all duration-200 focus:outline-none focus:border-green-500 p-1"
                      type="text"
                      name="lastVisitedAddress"
                      id="lastVisitedAddress"
                      onChange={(e) => setLastVisitedAddress(e.target.value)}
                      value={lastVisitedAddress}
                    />
                  </label>
                  <label
                    htmlFor="nextDestination"
                    className="flex-1 flex flex-col m-2"
                  >
                    Next Destination
                    <input
                      className="border border-yellow-700 rounded-md transition-all duration-200 focus:outline-none focus:border-green-500 p-1"
                      type="text"
                      name="nextDestination"
                      id="nextDestination"
                      onChange={(e) => setNextDestination(e.target.value)}
                      value={nextDestination}
                    />
                  </label>
                  <label htmlFor="purpose" className="flex-1 flex flex-col m-2">
                    Purpose
                    <input
                      className="border border-yellow-700 rounded-md transition-all duration-200 focus:outline-none focus:border-green-500 p-1"
                      type="text"
                      name="purpose"
                      id="purpose"
                      onChange={(e) => setPurpose(e.target.value)}
                      value={purpose}
                    />
                  </label>
                  <label
                    htmlFor="vechileNumber"
                    className="flex-1 flex flex-col m-2"
                  >
                    Vechile Number
                    <input
                      className="border border-yellow-700 rounded-md transition-all duration-200 focus:outline-none focus:border-green-500 p-1"
                      type="text"
                      name="vechileNumber"
                      id="vechileNumber"
                      onChange={(e) => setVechileNumber(e.target.value)}
                      value={vechileNumber}
                    />
                  </label>
                  <label htmlFor="remarks" className="flex-1 flex flex-col m-2">
                    Remarks
                    <input
                      className="border border-yellow-700 rounded-md transition-all duration-200 focus:outline-none focus:border-green-500 p-1"
                      type="text"
                      name="remarks"
                      id="remarks"
                      onChange={(e) => setRemarks(e.target.value)}
                      value={remarks}
                    />
                  </label>
                </div>
                <div>
                  <button
                    className="bg-slate-600 p-2 rounded-md text-white"
                    type="button"
                  >
                    Add Companion
                  </button>
                </div>
              </div>
              <button
                className="rounded-md bg-black text-white mt-2 p-2 self-center"
                onClick={addNewEntryHandler}
              >
                Add
              </button>
            </form>
          )}
          {entries.length < 1 ? (
            <div>
              <p>No Entries</p>
            </div>
          ) : (
            <TableComponent COLUMNS={Columns} Data={entries} />
          )}
          {!companionForm && (
            <button
              className="rounded-md bg-black text-white mt-2 p-2 self-center"
              onClick={() => setCompanionForm(true)}
            >
              Add New Entry
            </button>
          )}
        </div>
      </div>
    </>
  );
}
