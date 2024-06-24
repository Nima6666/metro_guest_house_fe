import { useState } from "react";
import EntriesToday from "./components/entriesToday";
import CurrentVisitors from "./components/currentVisitors";

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
              : "shadow-sm"
          } `}
          onClick={() => setView("today")}
        >
          Entries Today
        </div>
        <div
          className={`h-[200px] w-[200px] rounded-full flex items-center justify-center cursor-pointer shadow-black transition-all duration-300 m-2 bg-white ${
            view === "current"
              ? "shadow-lg scale-110 z-100 bg-white"
              : "shadow-sm"
          } `}
          onClick={() => setView("current")}
        >
          Current Visitor
        </div>
        <div
          className={`h-[200px] w-[200px] rounded-full flex items-center justify-center cursor-pointer shadow-black transition-all duration-300 m-2 bg-white ${
            view === "checkout"
              ? "shadow-lg scale-110 z-100 bg-white"
              : "shadow-sm"
          } `}
          onClick={() => setView("checkout")}
        >
          Checkouts Today
        </div>
      </div>
      {view === "today" ? (
        <EntriesToday />
      ) : view === "current" ? (
        <CurrentVisitors />
      ) : (
        "checkouts today"
      )}
    </div>
  );
}
