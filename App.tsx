// App.tsx

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
import NewCreateTask from "./pages/task/new_create_task/NewCreateTask";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createNativeStackNavigator();

export default function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);

  // Fonction pour vérifier si l'utilisateur est connecté
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userString = await AsyncStorage.getItem("user");
        if (userString) {
          const userObject = JSON.parse(userString);
          setUser(userObject.user);
        }
      } catch (error) {
        console.error("Error retrieving user from AsyncStorage : ", error);
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
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {user ? (
            <Stack.Screen name="ProtectedScreens" component={ProtectedScreens} initialParams={{ user }} />
          ) : (
            <Stack.Screen name="AuthScreens" component={AuthStack} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
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

function ProtectedScreens({ navigation, route }: { navigation: any; route: any }) {
  const user = route.params.user;
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
