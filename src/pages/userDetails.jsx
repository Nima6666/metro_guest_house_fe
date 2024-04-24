import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    getSelectedUser,
    getUser,
    userActions,
} from "../store/slices/usersSlice";
import { useParams } from "react-router-dom";

export default function UserDetails() {
    const { id } = useParams();

    const selectedUser = useSelector(
        (state) => state.userReducer.selectedUserDetails
    );
    const dispatch = useDispatch();

    useEffect(() => {
        async function getUserHandler() {
            dispatch(
                userActions.setSelectedUserDetails(await getSelectedUser(id))
            );
        }
        getUserHandler();
    }, []);

    console.log(selectedUser);

    return (
        <div id="userDetails">
            <img src={selectedUser.imageURL} alt="" />
            <div>
                <h1>Name</h1>
                <div>
                    {selectedUser.firstname} {selectedUser.lastname}
                </div>
                <h1>Email</h1>
                <div>{selectedUser.email}</div>
                <h1>Phone</h1>
                <div>{selectedUser.phone}</div>
            </div>
        </div>
    );
}
