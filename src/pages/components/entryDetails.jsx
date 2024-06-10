// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useParams } from "react-router-dom";
// import {
//   getSelectedVisitor,
//   visitorActions,
// } from "../../store/slices/visitorSlice";

// export default function EntryDetails() {
//   const dispatch = useDispatch();
//   const { id } = useParams();

//   const [entry, setEntry] = useState(null);

//   const { entryId } = useParams();

//   const selectedVisitor = useSelector(
//     (state) => state.visitorReducer.selectedVisitor
//   );

//   useEffect(() => {
//     async function getUserHandler() {
//       const visitor = await getSelectedVisitor(id);
//       dispatch(visitorActions.setSelectorVisitor(visitor));
//     }
//     if (Object.keys(selectedVisitor).length === 0) {
//       getUserHandler();
//     }

//     getUserHandler();
//   }, [dispatch, id, entry]);

//   console.log("entryId ", entryId);

//   if (entryId && Object.keys(selectedVisitor).length !== 0) {
//     const found = selectedVisitor.entries.find((entry) => entry._id == entryId);

//     console.log("found ", found);

//     setEntry(found);
//   }

//   return (
//     <>
//       <h1>Entry Details</h1>
//       {entry && <>{entry.time}</>}
//     </>
//   );
// }

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getSelectedVisitor,
  visitorActions,
} from "../../store/slices/visitorSlice";

export default function EntryDetails() {
  const dispatch = useDispatch();
  const { id, entryId } = useParams();

  const [entry, setEntry] = useState(null);

  const selectedVisitor = useSelector(
    (state) => state.visitorReducer.selectedVisitor
  );

  useEffect(() => {
    async function getUserHandler() {
      const visitor = await getSelectedVisitor(id);
      dispatch(visitorActions.setSelectorVisitor(visitor));
    }

    if (Object.keys(selectedVisitor).length === 0) {
      getUserHandler();
    }
  }, [dispatch, id, selectedVisitor]);

  useEffect(() => {
    if (entryId && Object.keys(selectedVisitor).length !== 0) {
      const found = selectedVisitor.entries.find(
        (entry) => entry._id === entryId
      );
      setEntry(found);
    }
  }, [entryId, selectedVisitor]);

  console.log("entryId ", entryId);
  console.log("entry ", entry);

  return (
    <>
      <h1>Entry Details</h1>
      {entry && <>{entry.time}</>}
    </>
  );
}
