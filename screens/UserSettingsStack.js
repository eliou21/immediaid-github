import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import UserSettingsScreen from "./UserSettingsScreen";
import UserEditProfileScreen from "./UserEditProfileScreen";
import UserChangePasswordScreen from "./UserChangePasswordScreen";
import TermsOfServiceScreen from "./TermsOfServiceScreen";
import PrivacyPolicyScreen from "./PrivacyPolicyScreen";
import AboutUsScreen from "./AboutUsScreen";

const Stack = createStackNavigator();

export default function UserSettingsStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SettingsMain" component={UserSettingsScreen} />
      <Stack.Screen name="UserEditProfile" component={UserEditProfileScreen}/>
      <Stack.Screen name="UserChangePassword" component={UserChangePasswordScreen} />
      <Stack.Screen name="TermsOfService" component={TermsOfServiceScreen} />
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} />
      <Stack.Screen name="AboutUs" component={AboutUsScreen}/>
    </Stack.Navigator>
  );
}
