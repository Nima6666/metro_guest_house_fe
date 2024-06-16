import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  deleteVisitor,
  getSelectedVisitor,
  visitorActions,
} from "../store/slices/visitorSlice";
import { useEffect, useState } from "react";
import { BounceLoader } from "react-spinners";
import EntryTable from "./components/entriesTable";

import { MdDeleteOutline } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import VisitorForm from "./visitorForm";
import { toast } from "react-toastify";

export default function VisitorDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [loading, setLoading] = useState(true);

  const [deletionConfirmation, setDeleteConfrimation] = useState(false);

  const selectedVisitor = useSelector(
    (state) => state.visitorReducer.selectedVisitor
  );

  const loggedInUser = useSelector((state) => state.loginReducer.loggedInUser);

  const [state, setState] = useState("view");

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

  async function deleteVisitorHanlder(id) {
    const response = await deleteVisitor(id);
    if (response.success) {
      toast(response.message);
      navigate(`/visitor`);
    } else {
      toast.error(response.message);
    }
  }

  return loading ? (
    <BounceLoader />
  ) : state === "view" ? (
    <div>
      <div
        id="userDetails"
        className="flex flex-row-reverse justify-center items-center"
      >
        <div className="flex flex-col items-center justify-center ">
          <img
            src={
              selectedVisitor.documentLocation
                ? selectedVisitor.documentLocation
                : "https://thehimalayantimes.com/uploads/imported_images/wp-content/uploads/2018/11/Citizenship.jpg"
            }
            alt=""
            className="w-[500px] h-full rounded-md"
          />
          {loggedInUser.role === "admin" && (
            <Link
              to={`./reuploadDocument`}
              className="bg-green-600 p-2 rounded-md text-white font-semibold text-sm mx-2 flex items-center my-2"
            >
              Reupload Document
            </Link>
          )}
        </div>
        <div className="mr-8">
          <h1 className="text-xl font-semibold">Name</h1>
          <div className="mb-2">
            {selectedVisitor.firstname} {selectedVisitor.lastname}
          </div>
          <h1 className="text-xl font-semibold">Gender</h1>
          <div className="mb-2">{selectedVisitor.gender}</div>
          <h1 className="text-xl font-semibold">Occupation</h1>
          <div className="mb-2">{selectedVisitor.occupation}</div>
          <h1 className="text-xl font-semibold">Age</h1>
          <div className="mb-2">{selectedVisitor.age}</div>
          <h1 className="text-xl font-semibold">Created By</h1>
          <Link to={`/users/${selectedVisitor.enteredBy._id}`} className="mb-2">
            {selectedVisitor.enteredBy.firstname}
          </Link>
          <h1 className="text-xl font-semibold">Document Type</h1>
          <div className="mb-2">{selectedVisitor.documentType}</div>
          <h1 className="text-xl font-semibold">Document ID</h1>
          <div className="mb-2">{selectedVisitor.documentId}</div>
          <h1 className="text-xl font-semibold">Address</h1>
          <div className="mb-2">{selectedVisitor.address}</div>
          <h1 className="text-xl font-semibold">Phone No</h1>
          <div className="mb-2">{selectedVisitor.phone}</div>
          <h1 className="text-xl font-semibold">Created At</h1>
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
      {loggedInUser.role === "admin" && (
        <>
          <div className="flex items-center justify-center my-4">
            <button
              className="bg-green-600 p-3 rounded-md text-white font-semibold mx-2 flex items-center"
              onClick={() => setState("edit")}
            >
              Edit Visitor <MdEdit size={25} className="ml-1" />
            </button>
            <button
              className="bg-red-600 p-3 rounded-md text-white font-semibold mx-2 flex items-center"
              type="button"
              onClick={() => setDeleteConfrimation(true)}
            >
              Delete Visitor <MdDeleteOutline size={25} className="ml-1" />
            </button>
          </div>
          {deletionConfirmation && (
            <div className="fixed bg-[#000000c7] top-0 left-0 w-[100vw] h-[100vh] flex justify-center items-center flex-col">
              <div className="text-2xl py-2 mb-3 text-white">
                Are you sure you want to delete this Visitor?
              </div>
              <div>
                <button
                  className="bg-red-600 p-3 rounded-md text-white font-semibold mx-2 text-xl"
                  onClick={() => deleteVisitorHanlder(id)}
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
        </>
      )}
      <EntryTable entries={selectedVisitor.entries} id={id} />
    </div>
  ) : (
    <VisitorForm visitorToEdit={selectedVisitor} setState={setState} />
  );
}
