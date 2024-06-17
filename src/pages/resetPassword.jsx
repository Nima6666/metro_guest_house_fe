import { useState } from "react";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  return (
    <form className="flex justify-center items-center flex-col">
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
