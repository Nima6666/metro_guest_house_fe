import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <aside className="flex flex-col h-screen bg-blue-800 text-l text-white pt-2">
      <Link to="/" className="px-16 py-1">
        Dashboard
      </Link>
      <Link to="/register" className="px-16 py-1">
        Register
      </Link>
    </aside>
  );
}
