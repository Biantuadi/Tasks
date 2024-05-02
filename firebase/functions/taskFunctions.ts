import { addDoc, collection, deleteDoc, getFirestore } from "firebase/firestore";
import { app } from "../config/firebaseConfig";
import {getDocs, doc } from "firebase/firestore";
import { Task } from "../../interfaces/main_interface";
import { Alert, Platform, ToastAndroid } from "react-native";

export async function getAllTasksFirebase() {
  const tasks:any = [];
  const querySnapshot = await getDocs(collection(getFirestore(app), "tasks"));
  querySnapshot.forEach((doc) => {
    // Récupérer les données du document
    const data = doc.data();
    // Inclure l'ID du document dans les données
    const taskWithId = { uid: doc.id, ...data };
    // Ajouter les données du task à la liste des tasks
    tasks.push(taskWithId);
  });
  return tasks;
}


// Fonction pour ajouter un nouveau task dans Firestore
export async function addTaskToFirestore(task: Task) {
  const firestore = getFirestore(app);
  try {
    // Ajoutez le task à la collection "tasks"
    const docRef = await addDoc(collection(firestore, "tasks"), task);
    // ajouter l'id au task
    task.uid = docRef.id;

    const successMessage = "Task ajouté avec succès";
    showMessage(successMessage);

    return docRef.id; 
  } catch (error:any) {
    console.error("Error adding Task: ", error);

    // Gestion des erreurs spécifiques
    let errorMessage = "Une erreur est survenue. Veuillez réessayer";

    // Affichage du message d'erreur en fonction de la plateforme
    showMessage(errorMessage);
  }
}

// Fonction pour supprimer un task de Firestore
// fireb

export async function deleteTaskFromFirestore(taskId:string) {
  const firestore = getFirestore(app);
  try {
    // Supprimer le document correspondant à l'ID du task
    await deleteDoc(doc(firestore, "tasks", taskId));
    console.log("Task deleted successfully");
  } catch (error) {
    console.error("Error deleting task:", error);
    throw error; // Propagez l'erreur pour la gérer dans l'action
  }
}


function showMessage(message: string) {
  if (Platform.OS === 'android') {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  } else if (Platform.OS === 'ios') {
    Alert.alert("Message", message);
  }
}