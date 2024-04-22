import { useSelector } from "react-redux";

export default function UserTable() {
  const users = useSelector((state) => state.userReducer.users);

  console.log(users);

  return <div>helo</div>;
}
