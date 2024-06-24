import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function CheckoutsToday() {
  const dispatch = useDispatch();
  const checkoutsToday = useSelector(
    (state) => state.visitorReducer.checkoutsToday
  );

  useEffect(() => {
    async function getCheckoutsToday() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER}/visitor/checkoutsToday`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log(response.data.success);
        if (response.data.success) {
          dispatch(
            visitorActions.setCurrentVisitors(
              await response.data.currentVisitors
            )
          );
        }
      } catch (err) {
        console.error(err);
      }
    }
    getCheckoutsToday();
  }, []);

  return (
    <div>
      <h1 className="text-xl font-semibold text-center my-4">
        Checkouts Today
      </h1>
    </div>
  );
}
