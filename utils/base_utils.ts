import { format } from "date-fns";
import { Alert, Platform, ToastAndroid } from "react-native";


export const isEmpty = (value: string | object | null | undefined) => {
    return (
      value === undefined ||
      value === null ||
      (typeof value === "object" && Object.keys(value).length === 0) ||
      (typeof value === "string" && value.trim().length === 0)
    );
  };

export const today: string = new Date().toISOString().split('T')[0]; // "2022-02-21"

export default function capitalizeFirstLetter(sentence: string) {
  return sentence.charAt(0).toUpperCase() + sentence.slice(1).toLowerCase();
}

export const formatDate = (date: string) => {
  return format(new Date(date), "d MMM yyyy")
};

export const findAuthor =  (users : any , item : any) => {
  return  users.find((user: any) =>user.id === item.creator_id);
}

// Fonction pour afficher un message en fonction de la plateforme
export function showMessage(message: string) {
  if (Platform.OS === "android") {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  } else if (Platform.OS === "ios") {
    Alert.alert("Message", message);
  }
}

// crééer une function pour l'ellipsis
export function ellipsisText(text: string, maxLength: number) {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + "...";
  }
  return text;
}
