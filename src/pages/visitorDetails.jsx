import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  getSelectedVisitor,
  visitorActions,
} from "../store/slices/visitorSlice";
import { useEffect, useState } from "react";
import { BounceLoader } from "react-spinners";
import EntryTable from "./components/entriesTable";

export default function VisitorDetails() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const selectedVisitor = useSelector(
    (state) => state.visitorReducer.selectedVisitor
  );
  const dispatch = useDispatch();

  useEffect(() => {
    async function getUserHandler() {
      const visitor = await getSelectedVisitor(id);
      dispatch(visitorActions.setSelectorVisitor(visitor));
      setLoading(false);
    }
    getUserHandler();
  }, [dispatch, id]);

  let date = "";
  if (selectedVisitor?.enteredAt?.length > 0) {
    const enteredAtDate = new Date(selectedVisitor.enteredAt[0].time);
    date =
      enteredAtDate.toLocaleDateString() +
      " " +
      enteredAtDate.toLocaleTimeString();
  }

  return loading ? (
    <BounceLoader />
  ) : (
    <div>
      <div
        id="userDetails"
        className="flex flex-row-reverse justify-center items-center"
      >
        <img
          src={
            selectedVisitor.document
              ? selectedVisitor.document
              : "/document.png"
          }
          alt=""
          className="w-[500px] h-full rounded-md"
        />
        <div className="mr-8">
          <h1 className="text-xl font-semibold">Name</h1>
          <div className="mb-2">
            {selectedVisitor.firstname} {selectedVisitor.lastname}
          </div>
          <h1 className="text-xl font-semibold">Entered By</h1>
          <Link to={`/users/${selectedVisitor.enteredBy._id}`} className="mb-2">
            {selectedVisitor.enteredBy.firstname}
          </Link>
          <h1 className="text-xl font-semibold">Document Type</h1>
          <div className="mb-2">{selectedVisitor.documentType}</div>
          <h1 className="text-xl font-semibold">Phone No</h1>
          <div className="mb-2">{selectedVisitor.phone}</div>
          <h1 className="text-xl font-semibold">Entered At</h1>
          <div className="mb-2">
            {new Date(selectedVisitor.enteredAt).toLocaleString("en-US", {
              year: "numeric",
              month: "short",
              day: "2-digit",
              hour: "numeric",
              minute: "2-digit",
              hour12: true,
            })}
          </div>
        </div>
      </div>
      <EntryTable entries={selectedVisitor.entries} id={id} />
    </div>
  );
}
