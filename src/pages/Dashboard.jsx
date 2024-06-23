import { useEffect } from "react";
import { getUser, userActions } from "../store/slices/usersSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { mockData } from "../assets/MOCK_DATA";
import { getVisitors, visitorActions } from "../store/slices/visitorSlice";
import EntriesToday from "./components/entriesToday";
import CurrentVisitors from "./components/currentVisitors";

export default function Dashboard() {
  const dispatch = useDispatch();

  const users = useSelector((state) => state.userReducer.users);
  const visitors = useSelector((state) => state.visitorReducer.visitor);

  const loggedInUser = useSelector((state) => state.loginReducer.loggedInUser);

  useEffect(() => {
    async function getUsersHandler() {
      dispatch(userActions.setUsers(await getUser()));
    }
    if (loggedInUser.role == "admin") {
      getUsersHandler();
    }
  }, [loggedInUser, dispatch]);

  if (!users) {
    localStorage.removeItem("token");
    window.location.reload();
  }
  useEffect(() => {
    async function getVisitorsHandler() {
      dispatch(visitorActions.setVisitor(await getVisitors()));
    }
    getVisitorsHandler();
  }, [dispatch, users]);

  // console.log(visitors);
  // console.log(loggedInUser);

  return (
    <div className="flex flex-col">
      <div className="flex flex-wrap justify-center items-center">
        {loggedInUser.role == "admin" && (
          <Link to="/users">
            <div className="h-[250px] w-[250px] border border-black shadow-md shadow-black flex justify-center items-center flex-col m-3">
              <h2 className="font-bold text-xl">Total Staff</h2>
              <p>{users.length}</p>
            </div>
          </Link>
        )}
        <Link to="/visitor">
          <div className="h-[250px] w-[250px] border border-black shadow-md shadow-black flex justify-center items-center flex-col m-3">
            <h2 className="font-bold text-xl">total Visitors</h2>
            <p>{visitors.length}</p>
          </div>
        </Link>
      </div>
      <div className="my-4 pb-4">
        <CurrentVisitors />
        <EntriesToday />
      </div>
    </div>
  );
}
