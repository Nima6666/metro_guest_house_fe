import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../store/slices/usersSlice";
import { toast } from "react-toastify";
import { IoChevronBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

export default function MyProfile() {
  const myProfile = useSelector((state) => state.userReducer.myProfile);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    async function getMyProfile() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER}/users/myProfile`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        console.log(response);
        if (response.data.success) {
          dispatch(userActions.setMyProfile(response.data.profile));
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
    getMyProfile();
  }, []);
  return (
    // <div>
    //   <h1 className="font-semibold text-center my-3 text-xl">My Profile</h1>
    //   <div className="w-full flex items-center justify-center my-4">
    //     <img
    //       src={myProfile.imageURL}
    //       alt="avatarImg"
    //       className="w-[300px] h-[300px] rounded-full self-end object-cover"
    //     />
    //   </div>
    //   <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 bg-[#0077b6] p-2 rounded-md">
    //     <div className="flex items-center bg-white rounded-md p-2 flex-col justify-center">
    //       <h1 className="text-xl font-semibold">Name</h1>
    //       <div className="mb-2">
    //         {myProfile.firstname} {myProfile.lastname}
    //       </div>
    //     </div>
    //     <div className="flex items-center bg-white rounded-md p-2 flex-col justify-center">
    //       <h1 className="text-xl font-semibold">Email</h1>
    //       <div className="mb-2">{myProfile.email}</div>
    //     </div>
    //     <div className="flex items-center bg-white rounded-md p-2 flex-col justify-center">
    //       <h1 className="text-xl font-semibold">Phone</h1>
    //       <div className="mb-4">{myProfile.phone}</div>
    //     </div>
    //     <div className="flex items-center bg-white rounded-md p-2 flex-col justify-center">
    //       <h1 className="text-xl font-semibold">Creation Date</h1>
    //       <div>
    //         {new Date(myProfile.createdUserTimestamp).toLocaleString("en-US", {
    //           year: "numeric",
    //           month: "short",
    //           day: "2-digit",
    //           hour: "numeric",
    //           minute: "2-digit",
    //           second: "2-digit",
    //           hour12: true,
    //         })}
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div className="flex flex-col justify-center items-center">
      <div
        className="self-start bg-slate-300 h-fit w-fit rounded-full flex items-center justify-center p-2 hover:text-white hover:bg-slate-600 hover:cursor-pointer transition-all duration-200"
        onClick={() => navigate(-1)}
      >
        <IoChevronBackOutline size={30} />
      </div>
      <h1 className="text-2xl font-semibold text-center mb-4 px-4 py-2 relative flex justify-center items-center text-white w-fit">
        My Profile
        <span className="absolute w-full h-full bg-[#17469E] top-0 left-0 -z-10 skew-x-[15deg]"></span>
      </h1>
      <div
        id="userDetails"
        className="flex justify-center flex-col mb-6 items-center  bg-gray-200 overflow-hidden rounded-md shadow-lg shadow-gray-400"
      >
        <div className="flex flex-col items-center justify-center ">
          <img
            src={myProfile.imageURL}
            alt="avatarImg"
            className="w-[300px] h-[300px] object-cover"
          />
        </div>
        <div className="grid grid-cols-1 gap-2 p-2  w-full ">
          <div className="flex bg-white rounded-md p-2 justify-start items-center shadow-md shadow-gray-400">
            <h1 className="text-lg font-semibold mx-2 w-[150px] border-r-2 border-gray-200">
              Name
            </h1>
            <div className="">
              {myProfile.firstname} {myProfile.lastname}
            </div>
          </div>
          <div className="flex bg-white rounded-md p-2 justify-start items-center shadow-md shadow-gray-400">
            <h1 className="text-lg font-semibold mx-2 w-[150px] border-r-2 border-gray-200">
              Username
            </h1>
            <div className="">{myProfile.username}</div>
          </div>
          <div className="flex bg-white rounded-md p-2 justify-start items-center shadow-md shadow-gray-400">
            <h1 className="text-lg font-semibold mx-2 w-[150px] border-r-2 border-gray-200">
              Email
            </h1>
            <div className="">{myProfile.email}</div>
          </div>
          <div className="flex bg-white rounded-md p-2 justify-start items-center shadow-md shadow-gray-400">
            <h1 className="text-lg font-semibold mx-2 w-[150px] border-r-2 border-gray-200">
              Phone
            </h1>
            <div className="">{myProfile.phone}</div>
          </div>
          <div className="flex bg-white rounded-md p-2 justify-start items-center shadow-md shadow-gray-400">
            <h1 className="text-lg font-semibold mx-2 w-[150px] border-r-2 border-gray-200">
              Creation Date
            </h1>
            <div>
              {new Date(myProfile.createdUserTimestamp).toLocaleString(
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
    </div>
  );
}
