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

function App() {
    const dispatch = useDispatch();

    const token = localStorage.getItem("token");

    const loggedIn = useSelector((state) => state.loginReducer.loggedIn);

    const loggedInUser = useSelector(
        (state) => state.loginReducer.loggedInUser
    );

    const [userResolved, setUserResolved] = useState(false);

    const [render, setRender] = useState(true);

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
        return (
            <div className="w-[100vw] h-[100vh] flex justify-center items-center">
                <BounceLoader />
            </div>
        );
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
                <div className="flex justify-center items-center w-full h-fit pt-4">
                    <Routes>
                        <Route path="/register" element={<Register />} />
                        <Route path="/visitorForm" element={<VisitorForm />} />
                        <Route path="/visitor" element={<VisitorTable />} />
                        <Route path="/visitor/:id" element={<VisitorDetails />} />
                        <Route path="/users" element={<UserTable />} />
                        <Route path="/users/:id" element={<UserDetails />} />
                        <Route path="/" element={<Dashboard />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
