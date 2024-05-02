import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../../pages/home/Home";
import Calendar from "../../pages/calendar/Calendar";
import { Ionicons } from "@expo/vector-icons";
import { BottomTabNavigationOptions } from "@react-navigation/bottom-tabs";
import { RouteProp } from "@react-navigation/native";
import Profile from "../../pages/profile/Profile";
import Notification from "../../pages/notifications/Notification";

type RouteNames = "Home" | "Calendar" | "notification" | "Profile";

type RouteParams = {
  Home: undefined;
  Calendar: undefined;
  notification: undefined;
  Profile: undefined;
};

type MyTabsProps = {
  userID: any;
};

export function MyTabs({ userID }: MyTabsProps) {
  const Tab = createBottomTabNavigator<RouteParams>();

  const screenOptions = ({
    route,
  }: {
    route: RouteProp<RouteParams, RouteNames>;
  }): BottomTabNavigationOptions => {
    return {
      tabBarShowLabel: false,
      headerShown: false,
      tabBarIcon: ({ focused, color, size }) => {
        let iconName: any;
        let iconSize = focused ? size - 1 : size;
        let iconColor = focused ? "#fff" : color;

        if (route.name === "Home") {
          iconName = focused ? "home" : "home-outline";
        } else if (route.name === "Calendar") {
          iconName = focused ? "calendar" : "calendar-outline";
        } else if (route.name === "notification") {
          iconName = focused ? "notifications" : "notifications-outline";
        } else if (route.name === "Profile") {
          iconName = focused ? "person" : "person-outline";
        }

        return (
          <Ionicons
  name={iconName as any}
  size={iconSize}
  color={iconColor}
  style={{
    flex: 1, // Utilisez flex pour centrer verticalement l'icône
    alignSelf: 'center', // 
    textAlign: 'center', // 
    marginTop:  15, // 
  }}
/>

        );
      },
      tabBarStyle: {
        position: "absolute",
        bottom: 30,
        left: "50%",
        paddingBottom: 0,
        right: 20,
        elevation: 0,
        backgroundColor: "#000103",
        borderRadius: 50,
        height: 60,
        alignItems: "center",
        justifyContent: "center",
        shadowOffset: {
          width: 0,
          height: 10,
        },
        display: "flex",

        shadowOpacity: 0.25,
        width: 250,
        marginLeft: -125, // La moitié de la largeur définie pour centrer
        shadowRadius: 3.5,
      },
    };
  };

  return (
    <Tab.Navigator screenOptions={screenOptions as any}>
      <Tab.Screen name="Home">
        {(props) => <HomeScreen {...props} currentUserID={userID} />}
      </Tab.Screen>
      <Tab.Screen name="Calendar">
        {(props) => <Calendar {...props} currentUserID={userID} />}
      </Tab.Screen>
      <Tab.Screen name="notification">
        {(props) => <Notification {...props} currentUserID={userID} />}
      </Tab.Screen>
      <Tab.Screen name="Profile">
        {(props) => <Profile {...props} currentUserID={userID} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}
