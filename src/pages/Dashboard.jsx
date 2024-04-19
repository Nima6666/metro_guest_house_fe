import { useEffect } from "react";
import { getUser, userActions } from "../store/slices/usersSlice";
import { useDispatch, useSelector } from "react-redux";

export default function Dashboard() {
  const dispatch = useDispatch();

  const users = useSelector((state) => state.userReducer.users);

  useEffect(() => {
    async function getUsersHandler() {
      dispatch(userActions.setUsers(await getUser()));
    }
    getUsersHandler();
  }, []);

  console.log(users);

  return (
    <div className="flex flex-wrap">
      <div className="h-[250px] w-[250px] border border-black shadow-md shadow-black flex justify-center items-center flex-col m-3">
        <h2 className="font-bold text-xl">total users</h2>
        <p>{users.length}</p>
      </div>
      <div className="h-[250px] w-[250px] border border-black shadow-md shadow-black flex justify-center items-center flex-col m-3">
        <h2 className="font-bold text-xl">total Visitors</h2>
        <p>{users.length}</p>
      </div>
    </div>
  );
}
