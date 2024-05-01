import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    getSelectedUser,
    getUser,
    userActions,
} from "../store/slices/usersSlice";
import { useParams } from "react-router-dom";

import {DotLoader} from "react-spinners"

export default function UserDetails() {
    const { id } = useParams();

    const [fetched, setFetched] = useState(false)

    const selectedUser = useSelector(
        (state) => state.userReducer.selectedUserDetails
    );
    const dispatch = useDispatch();

    useEffect(() => {
        async function getUserHandler() {
            dispatch(
                userActions.setSelectedUserDetails(await getSelectedUser(id))
            );
            setFetched(true)
        }
        getUserHandler();
    }, []);

    console.log(selectedUser);

    if (!fetched) {
        return(
            <div className="w-full h-full mt-12 flex justify-center items-center">

                <DotLoader />
            </div>
        )
    }

    return (
        <div id="userDetails" className="flex w-full justify-between items-center flex-row-reverse p-12">
            <img src={selectedUser.imageURL} alt="avatarImg" className="w-[300px] h-[300px] rounded-full self-end object-cover" />
            <div>
                <h1 className="text-xl font-semibold">Name</h1>
                <div className="mb-2">
                    {selectedUser.firstname} {selectedUser.lastname}
                </div>
                <h1 className="text-xl font-semibold">Email</h1>
                <div className="mb-2">{selectedUser.email}</div>
                <h1 className="text-xl font-semibold">Phone</h1>
                <div className="mb-4">{selectedUser.phone}</div>
                <h1 className="text-xl font-semibold">Creation Date</h1>
                <div>
                    {new Date(selectedUser.createdUserTimestamp).toLocaleString('en-US', { 
                        year: 'numeric', 
                        month: 'short', 
                        day: '2-digit',
                        hour: 'numeric',
                        minute: '2-digit',
                        second: '2-digit',
                        hour12: true
                    })}
                </div>
            </div>
        </div>
    );
}
