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
    }
  }

  return (
    <form
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
    </form>
  );
}
