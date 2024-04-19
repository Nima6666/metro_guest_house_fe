import { useSelector } from "react-redux";

export default function Header() {
  const loggedInUser = useSelector((state) => state.loginReducer.loggedInUser);

  return (
    <header className="flex justify-between items-center px-20 text-2xl p-4 bg-slate-300 shadow-md shadow-black">
      <h1>Metro Guest House</h1>
      <h1>welcome {loggedInUser.name}</h1>
    </header>
  );
}
