import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import logoImg from "/logo.png";

export default function Header() {
  const loggedInUser = useSelector((state) => state.loginReducer.loggedInUser);

  // console.log(loggedInUser);

  const [logout, setLogout] = useState(false);

  function logoutHandler() {
    localStorage.removeItem("token");
    window.location.reload();
  }

  console.log(loggedInUser);

  return (
    <header className="flex justify-between items-center px-20 text-2xl p-4 bg-slate-300 shadow-md shadow-black">
      <img src={logoImg} className="h-[100px]" alt="" />
      <div className="flex items-center justify-center">
        <h1 className="mx-2">
          welcome {loggedInUser.username}{" "}
          {loggedInUser.role === "admin" && "(Admin)"}
        </h1>
        <div className="h-[60px] w-[60px] mx-2 cursor-pointer relative">
          <div>
            <img
              src={loggedInUser.imageURL}
              alt="AvatarImg"
              className="absolute h-full w-full top-0 left-0 rounded-full object-cover"
              onClick={() => setLogout(!logout)}
            />
            {logout && (
              <div className="absolute top-[110%] bg-white shadow-lg shadow-black p-2 z-50 rounded-md flex flex-col justify-around items-center">
                <button
                  className="font-semibold p-2 text-lg text-white  bg-red-700 rounded-md w-full m-1"
                  onClick={logoutHandler}
                >
                  Logout
                </button>
                <Link
                  to="/myProfile"
                  className="text-lg text-nowrap p-2 rounded-md font-semibold hover:bg-gray-500 hover:text-white m-1 transition-all duration-200"
                >
                  My Profile
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
