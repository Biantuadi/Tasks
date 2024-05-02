import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc, serverTimestamp, getFirestore, query, getDocs, where, QuerySnapshot } from "firebase/firestore";
import { app, auth } from "../config/firebaseConfig";

import { Alert, Platform, ToastAndroid } from "react-native";
import { showMessage } from "../../utils/base_utils";

export async function register(
  email: string,
  password: string,
  firstname: string,
  lastname: string
) {
  try {
    email = email.toLowerCase();
    
    // Create user with email and password
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // Add user data to Firestore
    await addDoc(collection(getFirestore(app), "users"), {
      uid: user.uid,
      email: user.email,
      firstname: firstname,
      lastname: lastname,
      avatar:
        "https://material-kit-pro-react.devias.io/assets/avatars/avatar-marcus-finn.png",
      preferences: {
        theme: "light",
        language: "fr",
        notifications: true,
      },
      role: "user", // Consider using an enum or defined string values
      createdAt: serverTimestamp(), // Use server-side timestamp for better accuracy
    });

    // Affichage du message de succès en fonction de la plateforme
    const successMessage = "Inscription réussie";
    showMessage(successMessage);
  } catch (error: any) {
    console.error("Error during registration:", error);

    // Gestion des erreurs spécifiques
    let errorMessage = "Une erreur est survenue. Veuillez réessayer";
    switch (error.code) {
      case "auth/email-already-in-use":
        errorMessage = "Cette adresse e-mail est déjà utilisée";
        break;
      case "auth/invalid-email":
        errorMessage = "Adresse e-mail invalide";
        break;
      // Add more specific error handling cases as needed
      default:
        break;
    }

    // Affichage du message d'erreur en fonction de la plateforme
    showMessage(errorMessage);
  }
}



export async function login(email: string, password: string) {
  try {
    const auth = getAuth();
    email = email.toLowerCase();
    
    const usersCollection = collection(getFirestore(app), "users");
    const q = query(usersCollection, where("email", "==", email));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      // Aucun utilisateur trouvé avec cette adresse e-mail
      showMessage("Aucun utilisateur trouvé avec cette adresse e-mail");
      return;
    }

    
    // Sign in with email and password
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Affichage du message de succès en fonction de la plateforme
    const successMessage = "Connexion réussie";
    showMessage(successMessage);
  } catch (error: any) {
    // Gestion des erreurs spécifiques
    let errorMessage = "Une erreur est survenue. Veuillez réessayer";
    switch (error.code) {
      case "auth/wrong-password":
        errorMessage = "Mot de passe incorrect";
        break;
      case "auth/too-many-requests":
        errorMessage = "Trop de tentatives de connexion infructueuses. Veuillez réessayer plus tard";
        break;
      case "auth/invalid-email":
        errorMessage = "Adresse e-mail invalide";
        break;
      case "auth/invalid-credential":
        errorMessage = "Informations d'identification invalides";
        break;
      default:
        break;
    }

    // Affichage du message d'erreur en fonction de la plateforme
    showMessage(errorMessage);
  }
}


export async function logout() {
  try {
    await auth.signOut();
    ToastAndroid.show("Déconnexion réussie", ToastAndroid.SHORT);
  } catch (error:any) {
    console.error("Error during logout:", error);
    
    // Affichage du message d'erreur en fonction de la plateforme
    showMessage("Une erreur est survenue. Veuillez réessayer");
  }
}
