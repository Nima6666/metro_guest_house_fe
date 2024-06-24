import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../store/slices/usersSlice";
import { toast } from "react-toastify";

export default function MyProfile() {
  const myProfile = useSelector((state) => state.userReducer.myProfile);

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
    <div>
      <h1 className="font-semibold text-center my-3 text-xl">My Profile</h1>
      <div className="w-full flex items-center justify-center my-4">
        <img
          src={myProfile.imageURL}
          alt="avatarImg"
          className="w-[300px] h-[300px] rounded-full self-end object-cover"
        />
      </div>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 bg-[#0077b6] p-2 rounded-md">
        <div className="flex items-center bg-white rounded-md p-2 flex-col justify-center">
          <h1 className="text-xl font-semibold">Name</h1>
          <div className="mb-2">
            {myProfile.firstname} {myProfile.lastname}
          </div>
        </div>
        <div className="flex items-center bg-white rounded-md p-2 flex-col justify-center">
          <h1 className="text-xl font-semibold">Email</h1>
          <div className="mb-2">{myProfile.email}</div>
        </div>
        <div className="flex items-center bg-white rounded-md p-2 flex-col justify-center">
          <h1 className="text-xl font-semibold">Phone</h1>
          <div className="mb-4">{myProfile.phone}</div>
        </div>
        <div className="flex items-center bg-white rounded-md p-2 flex-col justify-center">
          <h1 className="text-xl font-semibold">Creation Date</h1>
          <div>
            {new Date(myProfile.createdUserTimestamp).toLocaleString("en-US", {
              year: "numeric",
              month: "short",
              day: "2-digit",
              hour: "numeric",
              minute: "2-digit",
              second: "2-digit",
              hour12: true,
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
