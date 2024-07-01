import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginActions } from "../store/slices/loginSlice";
import { toast } from "react-toastify";

export default function Login() {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log(username, password);
    const res = await axios.post(`${import.meta.env.VITE_SERVER}/users/login`, {
      username,
      password,
    });

    console.log("Login Data ", res.data);

    if (await res.data.token) {
      localStorage.setItem("token", await res.data.token);
      toast("Logged In");
      dispatch(loginActions.login());
      dispatch(loginActions.setUser(res.data));
    } else {
      toast.error(res.data.message);
    }
  };

  return (
    <div className="h-[100vh] w-[100vw] flex justify-center items-center">
      <form
        className="flex flex-col p-3 shadow-lg shadow-black rounded-md"
        onSubmit={handleLogin}
      >
        <h1 className="text-center text-l font-semibold">Login Form</h1>
        <div className="flex flex-col">
          <label htmlFor="username" className="mt-2">
            Username
          </label>
          <input
            type="text"
            name="username"
            id="username"
            className="border border-yellow-700 rounded-md transition-all duration-200 focus:outline-none focus:border-green-500 p-1"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            required
          />
          <label htmlFor="password" className="mt-2">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className="border border-yellow-700 rounded-md transition-all duration-200 focus:outline-none focus:border-green-500 p-1"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
        </div>
        <button
          type="submit"
          className="rounded-md bg-black text-white p-1 mt-2 w-1/2 self-center"
        >
          Login
        </button>
      </form>
    </div>
  );
}
