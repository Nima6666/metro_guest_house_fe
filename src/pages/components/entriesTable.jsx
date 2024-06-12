import { Link } from "react-router-dom";
import { addNewEntry } from "../../store/slices/visitorSlice";
import TableComponent from "./Table";
import { useRef, useState } from "react";

import CompanionForm from "./companionForm";
import { toast } from "react-toastify";

import { MdOutlineRemoveRedEye } from "react-icons/md";

export default function EntryTable({ entries, id }) {
  console.log("Entries ", entries);

  const [entryForm, setEntryForm] = useState(false);

  const [companions, setCompaions] = useState([]);

  const [companionForm, setCompanionForm] = useState(false);

  const [room, setRoom] = useState(null);
  const [lastVisitedAddress, setLastVisitedAddress] = useState("");
  const [nextDestination, setNextDestination] = useState("");
  const [purpose, setPurpose] = useState("");
  const [vechileNumber, setVechileNumber] = useState("");
  const [remarks, setRemarks] = useState("");

  async function addNewEntryHandler(e) {
    e.preventDefault();
    console.log("adding new entry to ", id);

    if (
      room === null ||
      lastVisitedAddress.trim() === "" ||
      nextDestination.trim() === "" ||
      purpose.trim() === "" ||
      vechileNumber.trim() === "" ||
      remarks.trim() === ""
    ) {
      return toast.error("Form fields cannot be empty");
    }

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

        if (value.length === 1) {
          return <div className="text-nowrap">1 Other</div>;
        } else {
          return <div className="text-nowrap">{value.length} Others</div>;
        }
      },
    },
    {
      Header: "Actions",
      Cell: ({ row }) => {
        return (
          <div className="flex flex-row">
            {/* <button
              onClick={handleEdit}
              className="bg-green-600 p-2 rounded-md text-white font-semibold mx-2"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-600 p-2 rounded-md text-white font-semibold mx-2"
            >
              Delete
            </button> */}
            {/* <button onClick={() => console.log(row.original)}>view</button> */}
            <Link to={`./viewEntry/${row.original._id}`}>
              <button className="bg-gray-600 p-2 rounded-md text-white font-semibold mx-2 flex items-center justify-center">
                View
                <div className="pl-2">
                  <MdOutlineRemoveRedEye />
                </div>
              </button>
            </Link>
          </div>
        );
      },
    },
    // {
    //   Header: "Remarks",
    //   accessor: "remarks",
    // },
  ];

  function removeCompanion(index) {
    console.log(index);
    const companionData = [...companions];

    companionData.splice(index, 1);
    setCompaions([...companionData]);
  }

  return (
    <>
      <div className="w-[70vw] pb-8 ">
        <h1 className="text-xl font-semibold text-center">Entries</h1>
        <div className="text-center">
          {entryForm && (
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
                      required
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
                      required
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
                      required
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
                      required
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
                      required
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
                  <div className="w-full">
                    {companions.length > 0 && (
                      <>
                        <h1 className="font-semibold text-xl my-2">
                          Companions
                        </h1>
                        <table>
                          <thead id="companion">
                            <tr>
                              <th>Fullname</th>
                              <th>Relation</th>
                              <th>Age</th>
                              <th>Phone</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {companions.map((companion, index) => (
                              <tr key={index}>
                                <td>{companion.fullname}</td>
                                <td>{companion.relation}</td>
                                <td>{companion.age}</td>
                                <td>{companion.phone}</td>
                                <td>
                                  <button
                                    className="bg-red-600 p-2 rounded-md text-white font-semibold"
                                    onClick={(id) => removeCompanion(index)}
                                    type="button"
                                  >
                                    Delete
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </>
                    )}
                    {companionForm ? (
                      <CompanionForm
                        companions={companions}
                        setCompanions={setCompaions}
                        setCompanionForm={setCompanionForm}
                      />
                    ) : (
                      <button
                        className="bg-slate-600 p-2 rounded-md text-white my-2"
                        type="button"
                        onClick={() => setCompanionForm(true)}
                      >
                        Add Companion
                      </button>
                    )}
                  </div>
                </div>
              </div>
              <div>
                <button
                  className="rounded-md bg-black text-white mt-2 p-2 self-center m-2"
                  onClick={addNewEntryHandler}
                  type="submit"
                >
                  Submit
                </button>
                <button
                  className="rounded-md bg-black text-white mt-2 p-2 self-center m-2"
                  onClick={() => setEntryForm(false)}
                >
                  cancel
                </button>
              </div>
            </form>
          )}
          {entries.length < 1 ? (
            <div>
              <p>No Entries</p>
            </div>
          ) : (
            <TableComponent COLUMNS={Columns} Data={entries} />
          )}
          {!entryForm && (
            <button
              className="rounded-md bg-black text-white mt-2 p-2 self-center"
              onClick={() => setEntryForm(true)}
            >
              Add New Entry
            </button>
          )}
        </div>
      </div>
    </>
  );
}
