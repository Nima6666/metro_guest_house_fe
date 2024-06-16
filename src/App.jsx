import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./pages/register";
import Header from "./pages/components/header";
import Login from "./pages/login";
import Navbar from "./pages/components/navbar";
import Dashboard from "./pages/Dashboard";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getLoggedInUser, loginActions } from "./store/slices/loginSlice";

import { BounceLoader } from "react-spinners";
import VisitorForm from "./pages/visitorForm";
import VisitorTable from "./pages/visitorTable";
import UserTable from "./pages/userTable";
import UserDetails from "./pages/userDetails";
import VisitorDetails from "./pages/visitorDetails";
import EntryDetails from "./pages/components/entryDetails";
import { getServerStatus } from "./store/slices/usersSlice";

function App() {
  const dispatch = useDispatch();

  const token = localStorage.getItem("token");

  const loggedIn = useSelector((state) => state.loginReducer.loggedIn);

  const loggedInUser = useSelector((state) => state.loginReducer.loggedInUser);

  const [userResolved, setUserResolved] = useState(false);

  const [serverStat, setServerStat] = useState("pending");

  useEffect(() => {
    async function serverStatHandler() {
      setServerStat(await getServerStatus());
    }
    serverStatHandler();
  }, []);

  useEffect(() => {
    async function userHandler() {
      const userFound = getLoggedInUser();
      dispatch(loginActions.setUser(await userFound));
      setUserResolved(true);
    }
    userHandler();
  }, [loggedIn]);

  if (token && !userResolved) {
    console.log("loading");
    return (
      <div className="w-[100vw] h-[100vh] flex justify-center items-center">
        <BounceLoader />
      </div>
    );
  }

  if (Object.keys(loggedInUser).length === 0) {
    return serverStat === "pending" ? (
      <BounceLoader />
    ) : serverStat === true ? (
      <Login />
    ) : (
      <Register admin={true} setServerStat={setServerStat} />
    );
  }

  return (
    <Router>
      <Header />
      <div className="flex">
        <Navbar />
        <div className="flex justify-center items-center w-full h-fit pt-4">
          <Routes>
            <Route path="/visitorForm" element={<VisitorForm />} />
            <Route path="/visitor" element={<VisitorTable />} />
            <Route path="/visitor/:id" element={<VisitorDetails />} />
            <Route
              path="/visitor/:id/viewEntry/:entryId"
              element={<EntryDetails />}
            />
            {loggedInUser.role == "admin" && (
              <>
                <Route path="/register" element={<Register />} />
                <Route path="/users" element={<UserTable />} />
                <Route path="/users/:id" element={<UserDetails />} />
              </>
            )}
            <Route path="/" element={<Dashboard />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
