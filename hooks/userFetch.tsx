import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers } from "../redux/actions/userAction";
import { isEmpty } from "../utils/base_utils";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function useFetchUsers( currentUserID?: string | null | undefined) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllUsers() as any); // Récupérer tous les utilisateurs
  }, [dispatch]); // Ajoutez dispatch dans les dépendances du useEffect

  const allUsers = useSelector((state: any) => state.user.allUsers);
  // console.log(allUsers);
  // console.log(AsyncStorage.getItem('user'));
  
  
  const currentUser = !isEmpty(allUsers) && allUsers.find((user: any) => user.id === currentUserID);

  return  {
     allUsers, 
     currentUser
    };
}
