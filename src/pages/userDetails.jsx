import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteStaff,
  getSelectedUser,
  getUser,
  userActions,
} from "../store/slices/usersSlice";
import { Link, useNavigate, useParams } from "react-router-dom";

import { DotLoader } from "react-spinners";
import { MdDeleteOutline, MdEdit } from "react-icons/md";
import Register from "./register";

import { MdLockReset } from "react-icons/md";
import { toast } from "react-toastify";
import { IoChevronBackOutline } from "react-icons/io5";

export default function UserDetails() {
  const { id } = useParams();

  const navigate = useNavigate();

  const loggedInUser = useSelector((state) => state.loginReducer.loggedInUser);

  const [fetched, setFetched] = useState(false);
  const [deletionConfirmation, setDeleteConfrimation] = useState(false);
  const [state, setState] = useState("view");

  const selectedUser = useSelector(
    (state) => state.userReducer.selectedUserDetails
  );
  const dispatch = useDispatch();

  useEffect(() => {
    async function getUserHandler() {
      dispatch(userActions.setSelectedUserDetails(await getSelectedUser(id)));
      setFetched(true);
    }
    getUserHandler();
  }, [dispatch, id]);

  console.log(selectedUser);

  async function deleteStaffHanlder(id) {
    console.log("deleting staff ", id);
    const res = await deleteStaff(id);
    toast(res.message);
    navigate("/users");
  }

  if (!fetched) {
    return (
      <div className="w-full h-full mt-12 flex justify-center items-center">
        <DotLoader />
      </div>
    );
  }

  return state == "view" ? (
    <div className="flex flex-col justify-center items-center">
      <div
        className="self-start bg-slate-300 h-fit w-fit rounded-full flex items-center justify-center p-2 hover:text-white hover:bg-slate-600 hover:cursor-pointer transition-all duration-200"
        onClick={() => navigate(-1)}
      >
        <IoChevronBackOutline size={30} />
      </div>
      <h1 className="text-2xl font-semibold text-center mb-4 px-4 py-2 relative flex justify-center items-center text-white w-fit">
        User Details
        <span className="absolute w-full h-full bg-[#17469E] top-0 left-0 -z-10 skew-x-[15deg]"></span>
      </h1>
      <div
        id="userDetails"
        className="flex justify-center flex-col mb-6 items-center  bg-gray-200 overflow-hidden rounded-md shadow-lg shadow-gray-400"
      >
        <div className="flex flex-col items-center justify-center ">
          <img
            src={selectedUser.imageURL}
            alt="avatarImg"
            className="w-[300px] h-[300px] object-cover"
          />
          {loggedInUser.role === "admin" && (
            <Link
              to={`./reuploadAvatar`}
              className="bg-green-600 p-2 rounded-md text-white font-semibold text-sm mx-2 flex items-center my-2"
            >
              Reupload Photo
            </Link>
          )}
        </div>
        <div className="grid grid-cols-1 gap-2 p-2  w-full ">
          <div className="flex bg-white rounded-md p-2 justify-start items-center shadow-md shadow-gray-400">
            <h1 className="text-lg font-semibold mx-2 w-[150px] border-r-2 border-gray-200">
              Name
            </h1>
            <div className="">
              {selectedUser.firstname} {selectedUser.lastname}
            </div>
          </div>
          <div className="flex bg-white rounded-md p-2 justify-start items-center shadow-md shadow-gray-400">
            <h1 className="text-lg font-semibold mx-2 w-[150px] border-r-2 border-gray-200">
              Email
            </h1>
            <div className="">{selectedUser.email}</div>
          </div>
          <div className="flex bg-white rounded-md p-2 justify-start items-center shadow-md shadow-gray-400">
            <h1 className="text-lg font-semibold mx-2 w-[150px] border-r-2 border-gray-200">
              Phone
            </h1>
            <div className="">{selectedUser.phone}</div>
          </div>
          <div className="flex bg-white rounded-md p-2 justify-start items-center shadow-md shadow-gray-400">
            <h1 className="text-lg font-semibold mx-2 w-[150px] border-r-2 border-gray-200">
              Creation Date
            </h1>
            <div>
              {new Date(selectedUser.createdUserTimestamp).toLocaleString(
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
              Edit User <MdEdit size={25} className="ml-1" />
            </button>
            <button
              className="bg-red-600 p-3 rounded-md text-white font-semibold mx-2 flex items-center"
              type="button"
              onClick={() => setDeleteConfrimation(true)}
            >
              Delete Visitor <MdDeleteOutline size={25} className="ml-1" />
            </button>
            <Link
              to={`./resetPassword`}
              className="bg-slate-600 p-3 rounded-md text-white font-semibold mx-2 flex items-center"
              type="button"
              onClick={() => setDeleteConfrimation(true)}
            >
              Reset Password <MdLockReset size={25} className="ml-1" />
            </Link>
          </div>
          {deletionConfirmation && (
            <div className="fixed bg-[#000000c7] top-0 left-0 w-[100vw] h-[100vh] flex justify-center items-center flex-col">
              <div className="text-2xl py-2 mb-3 text-white">
                Are you sure you want to delete this Staff?
              </div>
              <div>
                <button
                  className="bg-red-600 p-3 rounded-md text-white font-semibold mx-2 text-xl"
                  onClick={() => deleteStaffHanlder(id)}
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
    </div>
  ) : (
    <Register staff={selectedUser} />
  );
}
