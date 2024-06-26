// api/functions/authFunctions.ts

import { showMessage } from "../../utils/base_utils";
import { API_ENDPOINTS } from "../config/apiConfig";
import axios from "axios";

// Variable statique pour simuler les données utilisateur authentifiées
const loggedUser = {
  _id: 234,
  email: "john@doe.com",
  firstname: "John",
  lastname: "Doe",
  avatar: "https://avatars.githubusercontent.com/u/98918466?v=4"
};

// Fonction pour simuler une connexion
export async function login(email: string, password: string) {
  try {
    const response = await axios.post(API_ENDPOINTS.LOGIN, {email, password })

    // Afficher le message de succès
    showMessage("Connexion réussie");

    // Retourner les données de l'utilisateur simulées
    return response.data;
  } catch (error: any) {
    // Gérer les erreurs ici si nécessaire
    console.error("Error during logins : ", error.message);
    throw error; // Propager l'erreur vers l'appelant
  }
}

// Fonction pour simuler une inscription
export async function register(
  email: string,
  password: string,
  firstname: string,
  lastname: string
) {
  try {
    // Simuler une requête API réussie en utilisant les données de l'utilisateur simulées
    const response = { data: { message: "Inscription réussie" } };

    // Afficher le message de succès
    showMessage("Inscription réussie");

    // Retourner les données simulées
    return response.data;
  } catch (error: any) {
    // Gérer les erreurs ici si nécessaire
    console.error("Error during registration:", error);
    throw error; // Propager l'erreur vers l'appelant
  }
}

// Fonction pour simuler une déconnexion
export async function logout() {
  try {
    // Simuler une déconnexion réussie
    // Afficher le message de succès
    showMessage("Déconnexion réussie");
  } catch (error: any) {
    // Gérer les erreurs ici si nécessaire
    console.error("Error during logout:", error);
    throw error; // Propager l'erreur vers l'appelant
  }
}
