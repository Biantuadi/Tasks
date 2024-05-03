import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers, fetchGroups } from "../redux/actions/userAction";
import { isEmpty } from "../utils/base_utils";

export default function useFetchUsers( currentUserID?: string | null | undefined) {

  
  
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllUsers() as any); // Récupérer tous les utilisateurs
  }, [dispatch]); // Ajoutez dispatch dans les dépendances du useEffect

  const allUsers = useSelector((state: any) => state.user.allUsers);


  
  const currentUser = currentUserID &&  allUsers?.find((user: any) => user._id === currentUserID);

  return  {
     allUsers, 
     currentUser
    };
}

export function useFetchGroups(currentUserID?: string | null | undefined ) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGroups() as any); // Récupérer tous les groupes
  }, [dispatch]); // Ajoutez dispatch dans les dépendances du useEffect

  const groups = useSelector((state: any) => state.user.groups);
  const myGroup = groups.find((group: any) => {
    return group.members.some((member: any) => member._id === currentUserID);
  });

  

  return myGroup;
}
