import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  deleteEntry,
  getSelectedVisitor,
  visitorActions,
} from "../../store/slices/visitorSlice";
import { toast } from "react-toastify";

export default function EntryDetails() {
  const dispatch = useDispatch();
  const { id, entryId } = useParams();

  const loggedInUser = useSelector((state) => state.loginReducer.loggedInUser);

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

  return entry && state == "view" ? (
    <div className="w-full h-full px-4">
      <h1 className="text-2xl font-semibold text-center">Entry Details</h1>
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
            onClick={() => removeEntry(id, entryId)}
            type="button"
          >
            Delete Entry
          </button>
        </div>
      )}
    </div>
  ) : (
    <>
      <div>form</div>
      <button
        onClick={() => setState("view")}
        className="bg-red-600 p-2 rounded-md text-white font-semibold mx-2"
      >
        Cancel
      </button>
    </>
  );
}
