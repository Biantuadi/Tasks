import { collection, getFirestore } from "firebase/firestore";
import { app, auth } from "../config/firebaseConfig";
import { getDocs } from "firebase/firestore";
import { getDoc, doc } from "firebase/firestore";

export async function getAllUsersFirebase() {
  const users:any = [];
  const querySnapshot = await getDocs(collection(getFirestore(app), "users"));
  querySnapshot.forEach((doc) => {
    const userData = doc.data();
    // Check if userData.createdAt exists and handle different formats
    if (userData.createdAt) {
      // If it's a Firebase Timestamp object
      if (typeof userData.createdAt.toDate === 'function') {
        userData.createdAt = userData.createdAt.toDate().toISOString();
      } else if (typeof userData.createdAt === 'string' || typeof userData.createdAt === 'number') {
        // If it's already in a serializable format (e.g., ISO string or UNIX timestamp)
        // You may convert a UNIX timestamp to an ISO string, or leave as is if it's already an ISO string
        userData.createdAt = new Date(userData.createdAt).toISOString();
      }
      // Add other conditions here if there are more formats
    }
    users.push(userData);
  });
  return users;
}



export async function getUserByIdFirebase(userId: string) {
  const user = await getDoc(doc(collection(getFirestore(app), "users"), userId));
  return user.data();
}