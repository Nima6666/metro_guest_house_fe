import axios from "axios";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function ResetPassword() {
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { id } = useParams();

  async function handlePasswordChange(e) {
    if (password !== confirmPassword) {
      return alert("passwords doesnt match");
    }

    e.preventDefault();
    const response = await axios.post(
      `${import.meta.env.VITE_SERVER}/users/${id}/resetPassword`,
      { password },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (response.data.success) {
      toast(response.data.message);
      navigate(`/users/${id}`);
    } else {
      toast.error(response.data.message);
    }
  }

  return (
    <>
      {/* <form
        className="flex justify-center items-center flex-col"
        onSubmit={handlePasswordChange}
      >
        <h1 className="text-xl font-semibold">Reset Password</h1>
        <label htmlFor="password" className="m-2">
          Password
          <input
            className="border border-yellow-700 rounded-md transition-all duration-200 focus:outline-none focus:border-green-500 p-1 w-full"
            type="password"
            name="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            autoComplete="on"
          />
        </label>
        <label htmlFor="confirmPassword" className="m-2">
          Confirm Password
          <input
            className="border border-yellow-700 rounded-md transition-all duration-200 focus:outline-none focus:border-green-500 p-1 w-full"
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
            autoComplete="on"
          />
        </label>
        <button
          type="submit"
          className="rounded-md bg-black text-white p-3 mt-2 self-center"
        >
          Submit
        </button>
      </form> */}
      <div className="w-full">
        <div class="overflow-hidden flex items-center justify-center">
          <div class="bg-white lg:w-6/12 md:7/12 w-8/12 shadow-3xl rounded-xl">
            <form
              class="p-12 md:p-24 border border-blue-400 rounded-md"
              onSubmit={handlePasswordChange}
            >
              <h1 className="font-semibold text-xl text-center mb-4">
                Reset Password
              </h1>
              <div class="flex items-center text-lg mb-6 md:mb-8">
                <svg class="absolute ml-3" viewBox="0 0 24 24" width="24">
                  <path d="m18.75 9h-.75v-3c0-3.309-2.691-6-6-6s-6 2.691-6 6v3h-.75c-1.24 0-2.25 1.009-2.25 2.25v10.5c0 1.241 1.01 2.25 2.25 2.25h13.5c1.24 0 2.25-1.009 2.25-2.25v-10.5c0-1.241-1.01-2.25-2.25-2.25zm-10.75-3c0-2.206 1.794-4 4-4s4 1.794 4 4v3h-8zm5 10.722v2.278c0 .552-.447 1-1 1s-1-.448-1-1v-2.278c-.595-.347-1-.985-1-1.722 0-1.103.897-2 2-2s2 .897 2 2c0 .737-.405 1.375-1 1.722z" />
                </svg>
                <input
                  type="password"
                  id="password"
                  class="bg-gray-200 rounded pl-12 py-2 md:py-4 focus:outline-none w-full"
                  placeholder="New password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  autoComplete="off"
                />
              </div>
              <div class="flex items-center text-lg mb-6 md:mb-8">
                <svg class="absolute ml-3" viewBox="0 0 24 24" width="24">
                  <path d="m18.75 9h-.75v-3c0-3.309-2.691-6-6-6s-6 2.691-6 6v3h-.75c-1.24 0-2.25 1.009-2.25 2.25v10.5c0 1.241 1.01 2.25 2.25 2.25h13.5c1.24 0 2.25-1.009 2.25-2.25v-10.5c0-1.241-1.01-2.25-2.25-2.25zm-10.75-3c0-2.206 1.794-4 4-4s4 1.794 4 4v3h-8zm5 10.722v2.278c0 .552-.447 1-1 1s-1-.448-1-1v-2.278c-.595-.347-1-.985-1-1.722 0-1.103.897-2 2-2s2 .897 2 2c0 .737-.405 1.375-1 1.722z" />
                </svg>
                <input
                  type="password"
                  class="bg-gray-200 rounded pl-12 py-2 md:py-4 focus:outline-none w-full"
                  name="confirmPassword"
                  id="confirmPassword"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  value={confirmPassword}
                  autoComplete="off"
                  placeholder="Confirm Password"
                />
              </div>
              <button class="bg-gradient-to-b from-gray-700 to-gray-900 font-medium p-2 md:p-4 text-white uppercase w-full rounded">
                Reset Password
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
