import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllTasks } from "../redux/actions/taskAction";

export default function useFetchTasks() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllTasks() as any);
  }, [dispatch]);

  const allTasks = useSelector((state:any) => state.task.tasks);

  return allTasks || [];

}
