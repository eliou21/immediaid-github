import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons } from "@expo/vector-icons";
import UserDashboard from "../screens/UserDashboard";
import TipsScreen from "../screens/TipsScreen";
import EmergencyScreen from "./Emergency";
import SendSoS from "./SendSoS";
import UserSettingsStack from "./UserSettingsStack"; 

const Tab = createBottomTabNavigator();

export default function UserNavigation() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#fff",
        tabBarInactiveTintColor: "#013042",
        tabBarStyle: { backgroundColor: "#3E8298" },
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={UserDashboard}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="home" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="List & Tips"
        component={TipsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="playlist-add-check" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Emergency"
        component={EmergencyScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="emergency" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="S.O.S"
        component={SendSoS}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="crisis-alert" size={size} color={color} />
          ),
        }}
      />
      
      <Tab.Screen
        name="Settings"
        component={UserSettingsStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="settings" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
