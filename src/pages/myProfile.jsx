import { IoChevronBackOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userActions } from "../store/slices/usersSlice";

export default function MyProfile() {
  const myProfile = useSelector((state) => state.loginReducer.loggedInUser);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  function setFullScreen(image) {
    dispatch(userActions.setClickedImg(image));
  }

  return (
    Object.keys(myProfile).length && (
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
              onClick={() => setFullScreen(myProfile.imageURL)}
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
    )
  );
}
