import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons } from "@expo/vector-icons";
import AdminDashboard from "../screens/AdminDashboard";
import PostNews from "../screens/PostNews";
import EmergencyScreen from "../screens/Emergency";
import ReceiveSoS from "../screens/RecieveSoS";
import AdminSettingsStack from "../screens/AdminSettingStack"

const Tab = createBottomTabNavigator();

export default function AdminNavigator() {
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
        component={AdminDashboard}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="home" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Post"
        component={PostNews}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="post-add" size={size} color={color} />
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
        name="SoS Alerts"
        component={ReceiveSoS}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="crisis-alert" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Settings"
        component={AdminSettingsStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="settings" size={size} color={color} />
          ),
        }}
      />
      
    </Tab.Navigator>
  );
}