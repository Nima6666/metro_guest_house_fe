import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSelectedVisitor, visitorActions } from "../store/slices/visitorSlice";
import { useEffect } from "react";

export default function VisitorDetails() {
    const { id } = useParams();

    const selectedVisitor = useSelector(
        (state) => state.visitorReducer.selectedVisitor
    );
    const dispatch = useDispatch();

    useEffect(() => {
        async function getUserHandler() {
            dispatch(
                visitorActions.setSelectorVisitor(await getSelectedVisitor(id))
            );
        }
        getUserHandler();
    }, []);

    console.log(selectedVisitor);

    return (
        <div id="userDetails">
            <img src={selectedVisitor.document} alt="" />
            <div>
                <h1>Name</h1>
                <div>
                    {selectedVisitor.firstname} {selectedVisitor.lastname}
                </div>
                <h1>Entered By</h1>
                <div>{selectedVisitor.enteredBy}</div>
                <h1>Document Type</h1>
                <div>{selectedVisitor.documentType}</div>
                <h1>Phone No</h1>
                <div>{selectedVisitor.phone}</div>
                <h1>Entered At</h1>
                <div>{selectedVisitor.enteredAt}</div>
            </div>
        </div>
    );
}