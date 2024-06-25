import { useState } from "react";
import EntriesToday from "./components/entriesToday";
import CurrentVisitors from "./components/currentVisitors";
import CheckoutsToday from "./components/checkoutToday";
import CheckInsToday from "./components/checkInsToday";
import { Link } from "react-router-dom";
import { MdOutlineRemoveRedEye } from "react-icons/md";

export default function Entries() {
  const [view, setView] = useState("today");

  return (
    <div>
      <div
        id="navigator"
        className="flex flex-wrap items-center justify-center"
      >
        <div
          className={`h-[200px] w-[200px] rounded-full flex items-center justify-center cursor-pointer shadow-black transition-all duration-300 m-2 bg-white ${
            view === "today"
              ? "shadow-lg scale-110 z-100 bg-white"
              : "shadow-sm hover:scale-110"
          } `}
          onClick={() => setView("today")}
        >
          Entries Today
        </div>
        <div
          className={`h-[200px] w-[200px] rounded-full flex items-center justify-center cursor-pointer shadow-black transition-all duration-300 m-2 bg-white ${
            view === "current"
              ? "shadow-lg scale-110 z-100 bg-white"
              : "shadow-sm hover:scale-110"
          } `}
          onClick={() => setView("current")}
        >
          Current Visitor
        </div>
        <div
          className={`h-[200px] w-[200px] rounded-full flex items-center justify-center cursor-pointer shadow-black transition-all duration-300 m-2 bg-white ${
            view === "checkout"
              ? "shadow-lg scale-110 z-100 bg-white"
              : "shadow-sm hover:scale-110"
          } `}
          onClick={() => setView("checkout")}
        >
          Checkouts Today
        </div>
        <div
          className={`h-[200px] w-[200px] rounded-full flex items-center justify-center cursor-pointer shadow-black transition-all duration-300 m-2 bg-white ${
            view === "checkins"
              ? "shadow-lg scale-110 z-100 bg-white"
              : "shadow-sm hover:scale-110 z-20"
          } `}
          onClick={() => setView("checkins")}
        >
          CheckIns Today
        </div>
      </div>
      {view === "today" ? (
        <EntriesToday />
      ) : view === "current" ? (
        <CurrentVisitors />
      ) : view === "checkout" ? (
        <CheckoutsToday />
      ) : (
        <CheckInsToday />
      )}
      <div className="w-full flex justify-center items-center">
        <Link
          to="./allEntries"
          className="rounded-md bg-black text-white self-center w-auto p-3 shadow-lg border border-white hover:shadow-md transition-all duration-200 shadow-black mt-4 flex justify-center items-center"
        >
          View All Entries <MdOutlineRemoveRedEye className="ml-2" />
        </Link>
      </div>
    </div>
  );
}
