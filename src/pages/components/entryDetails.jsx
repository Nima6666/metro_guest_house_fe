import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  deleteEntry,
  getSelectedVisitor,
  notCheckedOut,
  visitorActions,
} from "../../store/slices/visitorSlice";
import { toast } from "react-toastify";
import EditForm from "./editForm";

import { IoChevronBackOutline } from "react-icons/io5";

export default function EntryDetails() {
  const dispatch = useDispatch();
  const { id, entryId } = useParams();

  const loggedInUser = useSelector((state) => state.loginReducer.loggedInUser);

  const [deletionConfirmation, setDeleteConfrimation] = useState(false);

  const navigate = useNavigate();

  const [state, setState] = useState("view");

  const [entry, setEntry] = useState(null);

  const selectedVisitor = useSelector(
    (state) => state.visitorReducer.selectedVisitor
  );

  useEffect(() => {
    async function getUserHandler() {
      const visitor = await getSelectedVisitor(id);
      dispatch(visitorActions.setSelectorVisitor(visitor));
    }

    if (Object.keys(selectedVisitor).length === 0) {
      getUserHandler();
    }
  }, [dispatch, id, selectedVisitor]);

  useEffect(() => {
    if (entryId && Object.keys(selectedVisitor).length !== 0) {
      const found = selectedVisitor.entries.find(
        (entry) => entry._id === entryId
      );
      setEntry(found);
    }
  }, [entryId, selectedVisitor]);

  console.log("entryId ", entryId);
  console.log("entry ", entry);

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
    const response = await notCheckedOut(id, entryId);
    console.log(response);
  }

  return (
    entry &&
    (state === "view" ? (
      <div className="w-full h-full px-4">
        <h1 className="text-2xl font-semibold text-center">Entry Details</h1>
        <div
          className="bg-slate-300 h-fit w-fit rounded-full flex items-center justify-center p-2 hover:text-white hover:bg-slate-600 hover:cursor-pointer transition-all duration-200"
          onClick={() => navigate(-1)}
        >
          <IoChevronBackOutline size={30} />
        </div>
        <div className="flex items-center">
          <div className="text-lg font-semibold mx-2">CheckIn Time</div>
          {new Date(entry.time).toLocaleString("en-US", {
            year: "numeric",
            month: "short",
            day: "2-digit",
            hour: "numeric",
            minute: "2-digit",
            second: "2-digit",
            hour12: true,
          })}
        </div>
        <div className="flex items-center">
          <div className="text-lg font-semibold mx-2">Room No</div>
          <div>{entry.room}</div>
        </div>
        <div className="flex items-center">
          <div className="text-lg font-semibold mx-2">Last Visited Address</div>
          <div>{entry.lastVisitedAddress}</div>
        </div>
        <div className="flex items-center">
          <div className="text-lg font-semibold mx-2">Next Destination</div>
          <div>{entry.nextDestination}</div>
        </div>
        <div className="flex items-center">
          <div className="text-lg font-semibold mx-2">Purpose Of Visit</div>
          <div>{entry.purposeOfVisit}</div>
        </div>
        <div className="flex items-center">
          <div className="text-lg font-semibold mx-2">Vechile Number</div>
          <div>{entry.vechileNumber}</div>
        </div>
        <div className="flex items-center">
          <div className="text-lg font-semibold mx-2">Remarks</div>
          <div>{entry.remarks}</div>
        </div>
        <div className="flex items-center">
          <div className="text-lg font-semibold mx-2">Entered By</div>
          <Link to={`/users/${entry.by._id}`}>
            <div>{entry.by.firstname}</div>
          </Link>
        </div>
        <div>
          {entry.companion.length > 0 ? (
            <>
              <h1 className="font-semibold text-xl my-2">With</h1>
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
                  {entry.companion.map((companion, index) => (
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
          ) : (
            <div className="flex items-center">
              <div className="text-lg font-semibold mx-2">With</div>
              <div>Single</div>
            </div>
          )}
        </div>

        {loggedInUser.role == "admin" && (
          <div className="flex items-center justify-center mt-4">
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
            <button
              className="bg-green-600 p-2 rounded-md text-white font-semibold mx-2"
              type="button"
              onClick={() => notCheckedOutHandler(id, entryId)}
            >
              Not Checked Out
            </button>
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
          entry={entry}
          setState={setState}
          entryId={entryId}
          setEntry={setEntry}
        />
      </>
    ))
  );
}
