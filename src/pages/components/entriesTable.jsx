import { addNewEntry } from "../../store/slices/visitorSlice";
import TableComponent from "./Table";

export default function EntryTable({ entries, id }) {
  console.log("Entries ", entries);

  async function addNewEntryHandler() {
    console.log("adding new entry to ", id);
    await addNewEntry(id);
  }

  const Columns = [
    {
      Header: "Entered By",
      accessor: "by",
    },
    {
      Header: "At",
      accessor: "time",
      Cell: ({ value }) => {
        return new Date(value).toLocaleString("en-US", {
          year: "numeric",
          month: "short",
          day: "2-digit",
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        }); // Format date as per locale
      },
    },
    {
      Header: "With",
      accessor: "companion",
    },
  ];

  return (
    <div>
      <h1 className="text-xl font-semibold text-center">Entries</h1>
      <div className="text-center">
        {entries.length < 1 ? (
          <div>
            <p>No Entries</p>
          </div>
        ) : (
          <TableComponent COLUMNS={Columns} Data={entries} />
        )}
        <button
          className="rounded-md bg-black text-white mt-2 p-2 self-center"
          onClick={addNewEntryHandler}
        >
          Add New Entry
        </button>
      </div>
    </div>
  );
}
