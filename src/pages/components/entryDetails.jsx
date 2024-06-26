import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  deleteEntry,
  getEntry,
  getSelectedVisitor,
  notCheckedOut,
  visitorActions,
} from "../../store/slices/visitorSlice";
import { toast } from "react-toastify";
import EditForm from "./editForm";

import { IoChevronBackOutline } from "react-icons/io5";
import { BounceLoader } from "react-spinners";
import { IoMdExit } from "react-icons/io";
import axios from "axios";

export default function EntryDetails() {
  const dispatch = useDispatch();
  const { id, entryId } = useParams();

  const [loading, setLoading] = useState(true);

  const loggedInUser = useSelector((state) => state.loginReducer.loggedInUser);
  const selectedVisitor = useSelector(
    (state) => state.visitorReducer.selectedVisitor
  );

  const [deletionConfirmation, setDeleteConfrimation] = useState(false);

  const navigate = useNavigate();

  const [state, setState] = useState("view");

  const selectedEntry = useSelector(
    (state) => state.visitorReducer.selectedEntry
  );

  useEffect(() => {
    async function getEntryHandler() {
      const entry = await getEntry(id, entryId);

      if (entry.success) {
        dispatch(visitorActions.setSelectedEntry(entry.selectedEntry));
      }
    }

    async function getVisitorHandler() {
      const visitor = await getSelectedVisitor(id);
      console.log(visitor);
      dispatch(visitorActions.setSelectedVisitor(visitor));
    }
    getVisitorHandler();

    getEntryHandler();
    setLoading(false);
  }, [dispatch, id, entryId]);

  console.log("Selected Visitor ", selectedVisitor);

  async function removeEntry(id, entryId) {
    const response = await deleteEntry(id, entryId);
    if (response.success) {
      toast(response.message);
      navigate(`/visitor/${id}`);
    } else {
      toast.error(response.message);
    }
  }

  async function notCheckedOutHandler() {
    setLoading(true);
    const response = await notCheckedOut(id, entryId);
    if (response.success) {
      toast(response.message);
      console.log(response);
      const found = response.editedEntry.find((entry) => entry._id === entryId);
      dispatch(visitorActions.setSelectedEntry(found));
    }
    setLoading(false);
  }

  async function checkoutHandler(id, entryId) {
    setLoading(true);
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_SERVER}/visitor/${id}/${entryId}`,
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
        const found = response.data.editedEntry.find(
          (entry) => entry._id === entryId
        );
        dispatch(visitorActions.setSelectedEntry(found));
      } else {
        toast.error(response.data.message);
      }
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  }

  return loading ? (
    <div className="min-h-[50vh] w-full flex justify-center items-center">
      <BounceLoader />
    </div>
  ) : (
    Object.keys(selectedEntry).length &&
      !loading &&
      (state === "view" ? (
        <div className="w-full h-full px-4">
          <div>
            <div
              id="userDetails"
              className="flex flex-col justify-center items-center"
            >
              <h1 className="text-2xl font-semibold text-center mb-4 w-full">
                <div
                  className="self-start bg-slate-300 h-fit w-fit rounded-full flex items-center justify-center p-2 hover:text-white hover:bg-slate-600 hover:cursor-pointer transition-all duration-200"
                  onClick={() => navigate(-1)}
                >
                  <IoChevronBackOutline size={30} />
                </div>
                Visitor Details
              </h1>
              <div className="flex flex-col items-center justify-center">
                <div className="w-[500px] h-fit rounded-md">
                  <img
                    src={
                      selectedVisitor.documentLocation
                        ? selectedVisitor.documentLocation
                        : "https://thehimalayantimes.com/uploads/imported_images/wp-content/uploads/2018/11/Citizenship.jpg"
                    }
                    alt=""
                    className="h-full object-cover my-4"
                  />
                </div>
              </div>
              <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 bg-[#0077b6] p-2 rounded-md my-4">
                <div className="flex items-center bg-white rounded-md p-2 flex-col justify-center">
                  <h1 className="text-xl font-semibold">Name</h1>
                  <div className="mb-2">
                    {selectedVisitor.firstname} {selectedVisitor.lastname}
                  </div>
                </div>
                <div className="flex items-center bg-white rounded-md p-2 flex-col justify-center">
                  <h1 className="text-xl font-semibold">Gender</h1>
                  <div className="mb-2">{selectedVisitor.gender}</div>
                </div>
                <div className="flex items-center bg-white rounded-md p-2 flex-col justify-center">
                  <h1 className="text-xl font-semibold">Occupation</h1>
                  <div className="mb-2">{selectedVisitor.occupation}</div>
                </div>
                <div className="flex items-center bg-white rounded-md p-2 flex-col justify-center">
                  <h1 className="text-xl font-semibold">Age</h1>
                  <div className="mb-2">{selectedVisitor.age}</div>
                </div>
                <div className="flex items-center bg-white rounded-md p-2 flex-col justify-center">
                  <h1 className="text-xl font-semibold">Created By</h1>
                  {/* <Link
                    to={`/users/${selectedVisitor.enteredBy._id}`}
                    className="mb-2"
                  >
                    {selectedVisitor.enteredBy.firstname}
                  </Link> */}
                </div>
                <div className="flex items-center bg-white rounded-md p-2 flex-col justify-center">
                  <h1 className="text-xl font-semibold">Document Type</h1>
                  <div className="mb-2">{selectedVisitor.documentType}</div>
                </div>
                <div className="flex items-center bg-white rounded-md p-2 flex-col justify-center">
                  <h1 className="text-xl font-semibold">Document ID</h1>
                  <div className="mb-2">{selectedVisitor.documentId}</div>
                </div>
                <div className="flex items-center bg-white rounded-md p-2 flex-col justify-center">
                  <h1 className="text-xl font-semibold">Address</h1>
                  <div className="mb-2">{selectedVisitor.address}</div>
                </div>
                <div className="flex items-center bg-white rounded-md p-2 flex-col justify-center">
                  <h1 className="text-xl font-semibold">Phone No</h1>
                  <div className="mb-2">{selectedVisitor.phone}</div>
                </div>
                <div className="flex items-center bg-white rounded-md p-2 flex-col justify-center">
                  <h1 className="text-xl font-semibold">Created At</h1>
                  <div className="mb-2">
                    {new Date(selectedVisitor.enteredAt).toLocaleString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "short",
                        day: "2-digit",
                        hour: "numeric",
                        minute: "2-digit",
                        hour12: true,
                      }
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <h1 className="text-2xl font-semibold text-center mb-4">
            {/* <div
              className="self-start bg-slate-300 h-fit w-fit rounded-full flex items-center justify-center p-2 hover:text-white hover:bg-slate-600 hover:cursor-pointer transition-all duration-200"
              onClick={() => navigate(-1)}
            >
              <IoChevronBackOutline size={30} />
            </div> */}
            Entry Details
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 bg-gray-200 p-2 rounded-md">
            <div className="flex items-center bg-white rounded-md p-2 flex-col justify-center">
              <div className="text-lg font-semibold mx-2">CheckIn Time</div>

              {new Date(selectedEntry.time).toLocaleString("en-US", {
                year: "numeric",
                month: "short",
                day: "2-digit",
                hour: "numeric",
                minute: "2-digit",
                second: "2-digit",
                hour12: true,
              })}
            </div>
            <div className="flex items-center bg-white rounded-md p-2 flex-col justify-center">
              <div className="text-lg font-semibold mx-2">Checkout Time</div>
              {selectedEntry.checkoutTime ? (
                <div>
                  {new Date(selectedEntry.checkoutTime).toLocaleString(
                    "en-US",
                    {
                      year: "numeric",
                      month: "short",
                      day: "2-digit",
                      hour: "numeric",
                      minute: "2-digit",
                      second: "2-digit",
                      hour12: true,
                    }
                  )}
                </div>
              ) : (
                <div>Vitrai xa</div>
              )}
            </div>
            <div className="flex items-center bg-white rounded-md p-2 flex-col justify-center">
              <div className="text-lg font-semibold mx-2">Room No</div>
              <div>{selectedEntry.room}</div>
            </div>
            <div className="flex items-center bg-white rounded-md p-2 flex-col justify-center">
              <div className="text-lg font-semibold mx-2">
                Last Visited Address
              </div>
              <div>{selectedEntry.lastVisitedAddress}</div>
            </div>
            <div className="flex items-center bg-white rounded-md p-2 flex-col justify-center">
              <div className="text-lg font-semibold mx-2">Next Destination</div>
              <div>{selectedEntry.nextDestination}</div>
            </div>
            <div className="flex items-center bg-white rounded-md p-2 flex-col justify-center">
              <div className="text-lg font-semibold mx-2">Purpose Of Visit</div>
              <div>{selectedEntry.purposeOfVisit}</div>
            </div>
            <div className="flex items-center bg-white rounded-md p-2 flex-col justify-center">
              <div className="text-lg font-semibold mx-2">Vechile Number</div>
              <div>{selectedEntry.vechileNumber}</div>
            </div>
            <div className="flex items-center bg-white rounded-md p-2 flex-col justify-center">
              <div className="text-lg font-semibold mx-2">Remarks</div>
              <div>{selectedEntry.remarks}</div>
            </div>
            <div className="flex items-center bg-white rounded-md p-2 flex-col justify-center">
              <div className="text-lg font-semibold mx-2">Entered By</div>
              <Link to={`/users/${selectedEntry.by._id}`}>
                <div>{selectedEntry.by.firstname}</div>
              </Link>
            </div>
            {selectedEntry.companion.length === 0 && (
              <div className="flex items-center bg-white rounded-md p-2 flex-col justify-center">
                <div className="text-lg font-semibold mx-2">With</div>
                <div>Single</div>
              </div>
            )}
          </div>
          <div>
            {selectedEntry.companion.length > 0 && (
              <>
                <h1 className="font-semibold text-xl my-2 text-center">With</h1>
                <table>
                  <thead id="companion">
                    <tr>
                      <th>Fullname</th>
                      <th>Relation</th>
                      <th>Age</th>
                      <th>Phone</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedEntry.companion.map((companion, index) => (
                      <tr key={index}>
                        <td>{companion.fullname}</td>
                        <td>{companion.relation}</td>
                        <td>{companion.age}</td>
                        <td>{companion.phone}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            )}
          </div>

          {loggedInUser.role == "admin" && (
            <div className="flex items-center justify-center mt-4 pb-4">
              <button
                className="bg-green-600 p-2 rounded-md text-white font-semibold mx-2"
                // onClick={(id) => removeCompanion(index)}
                type="button"
                onClick={() => setState("edit")}
              >
                Edit Entry
              </button>
              <button
                className="bg-red-600 p-2 rounded-md text-white font-semibold mx-2"
                onClick={() => setDeleteConfrimation(true)}
                type="button"
              >
                Delete Entry
              </button>
              {!selectedEntry.checkoutTime ? (
                <button
                  className="bg-green-600 p-2 rounded-md text-white font-semibold mx-2 flex items-center justify-center"
                  onClick={() => checkoutHandler(id, entryId)}
                >
                  Checkout
                  <div className="pl-2">
                    <IoMdExit />
                  </div>
                </button>
              ) : (
                <button
                  className="bg-green-600 p-2 rounded-md text-white font-semibold mx-2"
                  type="button"
                  onClick={() => notCheckedOutHandler(id, entryId)}
                >
                  Uncheck Out
                </button>
              )}
              {deletionConfirmation && (
                <div className="fixed bg-[#000000c7] top-0 left-0 w-[100vw] h-[100vh] flex justify-center items-center flex-col">
                  <div className="text-2xl py-2 mb-3 text-white">
                    Are you sure you want to delete this entry?
                  </div>
                  <div>
                    <button
                      className="bg-red-600 p-3 rounded-md text-white font-semibold mx-2 text-xl"
                      onClick={() => removeEntry(id, entryId)}
                    >
                      Yes
                    </button>
                    <button
                      className="bg-green-600 p-3 rounded-md text-white font-semibold mx-2 text-xl"
                      onClick={() => setDeleteConfrimation(false)}
                    >
                      No
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        <>
          <EditForm
            id={id}
            entry={selectedEntry}
            setState={setState}
            entryId={entryId}
          />
        </>
      ))
  );
}
