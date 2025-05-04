import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./navigation";
import { AuthProvider } from "./context/authContext"; 

export default function App() {
  return (
    <AuthProvider> 
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}
