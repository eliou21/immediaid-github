import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AdminSettingsScreen from "../screens/AdminSettingsScreen";
import TermsOfServiceScreen from "../screens/TermsOfServiceScreen";
import PrivacyPolicyScreen from "../screens/PrivacyPolicyScreen";
import AboutUsScreen from "../screens/AboutUsScreen";
import AdminEditProfileScreen from "../screens/AdminEditProfileScreen";
import AdminChangePasswordScreen from "../screens/AdminChangePasswordScreen";
import AddAdminScreen from "../screens/AddAdminScreen";


const Stack = createStackNavigator();

export default function AdminSettingsStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SettingsMain" component={AdminSettingsScreen} />
      <Stack.Screen name="AdminEditProfile" component={AdminEditProfileScreen}/>
      <Stack.Screen name="AdminChangePassword" component={AdminChangePasswordScreen}/>
      <Stack.Screen name="TermsOfService" component={TermsOfServiceScreen} />
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} />
      <Stack.Screen name="AboutUs" component={AboutUsScreen} />
      <Stack.Screen name="AddAdmin" component={AddAdminScreen}/>
    </Stack.Navigator>
  );
}
