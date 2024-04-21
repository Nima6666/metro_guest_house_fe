import { useEffect } from "react";
import { getUser, userActions } from "../store/slices/usersSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const dispatch = useDispatch();

  const users = useSelector((state) => state.userReducer.users);

  useEffect(() => {
    async function getUsersHandler() {
      dispatch(userActions.setUsers(await getUser()));
    }
    getUsersHandler();
  }, []);

  if (!users) {
    localStorage.removeItem("token");
    window.location.reload();
  }

  return (
    <div className="flex flex-wrap">
      <Link to="/users">
        <div className="h-[250px] w-[250px] border border-black shadow-md shadow-black flex justify-center items-center flex-col m-3">
          <h2 className="font-bold text-xl">total users</h2>
          <p>{users.length}</p>
        </div>
      </Link>
      <Link to="/visitor">
        <div className="h-[250px] w-[250px] border border-black shadow-md shadow-black flex justify-center items-center flex-col m-3">
          <h2 className="font-bold text-xl">total Visitors</h2>
          <p>{users.length}</p>
        </div>
      </Link>
    </div>
  );
}
