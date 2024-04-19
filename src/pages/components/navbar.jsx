import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <aside className="flex flex-col items-center h-screen bg-blue-800 text-l text-white pt-2">
      <Link
        to="/"
        className="px-16 py-1 transition-all duration-300 hover:bg-slate-600 w-[70%] flex justify-center items-center rounded-md"
      >
        Dashboard
      </Link>
      <Link
        to="/register"
        className="px-16 py-1 transition-all duration-300 hover:bg-slate-600 w-[70%] flex justify-center items-center rounded-md"
      >
        Register
      </Link>
      <Link
        to="/visitor"
        className="px-16 py-1 transition-all duration-300 hover:bg-slate-600 w-[70%] flex justify-center items-center rounded-md"
      >
        Visitor
      </Link>
    </aside>
  );
}
