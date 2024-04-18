import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Form from "./pages/home";
import Register from "./pages/register";
import Header from "./pages/components/header";
import Login from "./pages/login";
import Navbar from "./pages/components/navbar";
import Dashboard from "./pages/Dashboard";
import { Provider, useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getLoggedInUser, loginActions } from "./store/slices/loginSlice";

import { BounceLoader } from "react-spinners";

function App() {
  const dispatch = useDispatch();

  const token = localStorage.getItem("token");

  const loggedIn = useSelector((state) => state.loginReducer.loggedIn);

  const loggedInUser = useSelector((state) => state.loginReducer.loggedInUser);

  const [userResolved, setUserResolved] = useState(false);

  useEffect(() => {
    console.log("a");
    async function userHandler() {
      const userFound = getLoggedInUser();
      dispatch(loginActions.setUser(await userFound));
      setUserResolved(true);
    }
    userHandler();
  }, [loggedIn]);

  if (token && !userResolved) {
    console.log("loading");
    return <BounceLoader />;
  }
  console.log(loggedInUser);

  if (Object.keys(loggedInUser).length === 0) {
    return <Login />;
  }

  return (
    <Router>
      <Header />
      <div className="flex">
        <Navbar />
        <div>
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Dashboard />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
