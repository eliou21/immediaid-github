import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import WelcomeScreen from "./screens/WelcomeScreen";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import AdminNavigation from "./screens/AdminNavigation";
import UserNavigation from "./screens/UserNavigation";

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="AdminNavigation" component={AdminNavigation} />
      <Stack.Screen name="UserNavigation" component={UserNavigation} />
    </Stack.Navigator>
  );
}
