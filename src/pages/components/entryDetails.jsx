import { useSelector } from "react-redux";

export default function EntryDetails() {
  const selectedVisitor = useSelector(
    (state) => state.visitorReducer.selectedVisitor
  );

  return (
    <>
      <h1>Entry Details</h1>
    </>
  );
}
