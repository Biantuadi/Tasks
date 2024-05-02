import { initializeApp, } from "firebase/app";
import { initializeAuth, getReactNativePersistence  } from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

export const app = initializeApp({
  apiKey: "AIzaSyBOc3-_mEqDhlQYyP2jVJZ6ztG--ecE7kY",
  authDomain: "calendar-athoms.firebaseapp.com",
  databaseURL: "https://calendar-athoms-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "calendar-athoms",
  storageBucket: "calendar-athoms.appspot.com",
  messagingSenderId: "709396154278",
  appId: "1:709396154278:web:03b696bb0779d1fa4a3167"
});

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
})
