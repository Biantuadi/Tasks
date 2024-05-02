import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers } from "../redux/actions/userAction";
import { isEmpty } from "../utils/base_utils";

export default function useFetchUsers( currentUserID?: string | null | undefined) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllUsers() as any); // Récupérer tous les utilisateurs
  }, [dispatch]); // Ajoutez dispatch dans les dépendances du useEffect

  const allUsers = useSelector((state: any) => state.user.allUsers);
  const currentUser = !isEmpty(allUsers) && allUsers.find((user: any) => user.uid === currentUserID);

  return  {
     allUsers, 
     currentUser
    };
}
