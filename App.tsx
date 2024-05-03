import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import store from "./redux/store";
import Login from "./pages/auth/login/Login";
import Register from "./pages/auth/register/Register";
import { MyTabs } from "./components/layouts/BottomNavigation";
import EditProfile from "./pages/profile/EditProfile";
import ShowTask from "./pages/task/ShowTask";
import { showMessage } from "./utils/base_utils";
import NewCreateTask from "./pages/task/new_create_task/NewCreateTask";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createNativeStackNavigator();

export default function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);

  // Fonction pour vérifier si l'utilisateur est connecté
  useEffect(() => {
    // Logique pour vérifier si l'utilisateur est connecté, par exemple en vérifiant s'il existe un token d'authentification dans AsyncStorage
    const fetchUser = async () => {
      try {
        const userString = await AsyncStorage.getItem("user");
        if (userString) {
          const userObject = JSON.parse(userString);
          setUser(userObject.user);
        }
      } catch (error) {
        console.error("Error retrieving user from AsyncStorage:", error);
      } finally {
        setInitializing(false);
      }
    };

    fetchUser();
  }, []);


  if (initializing) {
    return null; // Ou un indicateur de chargement
  }

  return (
    <Provider store={store}>
      <Root user={user} />
    </Provider>
  );
}

function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
  );
}

function Root({ user }: { user: any }) {
  return (
    <NavigationContainer>
      {user ? <ProtectedScreens user={user} /> : <AuthStack />}
    </NavigationContainer>
  );
}

function ProtectedScreens({ user }: { user: any }) {
  const ProtectedStack = createNativeStackNavigator();

  return (
    <ProtectedStack.Navigator screenOptions={{ headerShown: false }}>
      <ProtectedStack.Screen name="MainApp">
        {(props) => <MyTabs {...props} userID={user?.id} />}
      </ProtectedStack.Screen>
      <ProtectedStack.Screen name="EditProfile" component={EditProfile} />
      <ProtectedStack.Screen name="ShowTask">
        {(props: { route: any }) => (
          <ShowTask {...props} currentUserID={user?.id} />
        )}
      </ProtectedStack.Screen>
      <ProtectedStack.Screen name="createTask">
        {(props) => <NewCreateTask {...props} currentUserID={user?.id} />}
      </ProtectedStack.Screen>
    </ProtectedStack.Navigator>
  );
}
