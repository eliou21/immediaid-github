import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Switch,
  StyleSheet,
  ScrollView,
  Image,
  Alert,
  SafeAreaView,
  Platform,
  StatusBar,
  ImageBackground,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function AdminSettingsScreen({ navigation }) {
  const [notifications, setNotifications] = useState(false);
  const [admin, setAdmin] = useState({ username: "Admin", profilePicture: null });

  useFocusEffect(
    React.useCallback(() => {
      const loadAdminData = async () => {
        try {
          const storedAdmin = await AsyncStorage.getItem("currentAdmin");
          if (storedAdmin) {
            setAdmin(JSON.parse(storedAdmin)); 
          } else {
            setAdmin({ username: "Admin", profilePicture: null });
          }
  
          const storedNotifications = await AsyncStorage.getItem("notifications");
          if (storedNotifications) {
            setNotifications(JSON.parse(storedNotifications));
          }
        } catch (error) {
          console.error("Failed to load admin data", error);
        }
      };
  
      loadAdminData();
    }, [])
  );  

  useEffect(() => {
    registerForPushNotificationsAsync();

    const subscription = Notifications.addNotificationReceivedListener(
      (notification) => {
        Alert.alert("New News Alert", notification.request.content.body);
      }
    );

    return () => subscription.remove();
  }, []);

  async function registerForPushNotificationsAsync() {
    if (Constants.isDevice) {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission Denied",
          "Please enable notifications in settings."
        );
        return;
      }

      const token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log("Expo Push Token:", token);
      await AsyncStorage.setItem("expoPushToken", token);
    } 
  }

  const handleToggleNotification = async (value) => {
    setNotifications(value);
    await AsyncStorage.setItem("notifications", JSON.stringify(value));

    if (value) {
      Alert.alert("Notifications Enabled", "You will receive alerts when new news is posted.");
    }
  };

  const handleLogout = async () => {
    Alert.alert("Log Out", "Are you sure you want to log out?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Log Out",
        onPress: async () => {
          await AsyncStorage.setItem("isLoggedIn", "false");
          navigation.reset({
            index: 0,
            routes: [{ name: "Welcome" }],
          });
        },
      },
    ]);
  };

  const handleRemoveAdmin = async () => {
    Alert.alert("Remove Admin", "Are you sure you want to remove this admin account?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Remove",
        onPress: async () => {
          try {
            const storedAdmins = await AsyncStorage.getItem("admins"); // Retrieve stored admin accounts
            if (storedAdmins) {
              let admins = JSON.parse(storedAdmins);
              admins = admins.filter((a) => a.username !== admin.username); 
              await AsyncStorage.setItem("admins", JSON.stringify(admins)); 
            }
  
            await AsyncStorage.removeItem("currentAdmin");
            await AsyncStorage.setItem("isLoggedIn", "false");
  
            navigation.reset({
              index: 0,
              routes: [{ name: "Welcome" }],
            });
          } catch (error) {
            console.error("Error removing admin:", error);
          }
        },
        style: "destructive",
      },
    ]);
  };  

  return (
    <ImageBackground source={require("../assets/background 1.png")} style={styles.background}>
      <View style={styles.banner}>
        <Image source={require("../assets/logo.png")} style={styles.logo} />
        <Text style={styles.appName}>IMMEDIAID</Text>
      </View>

      <SafeAreaView style={styles.safeContainer}>
        <View style={styles.statusBarFix} />

        <ScrollView contentContainerStyle={styles.scrollContent}>

          {/* Profile Section */}
          <View style={styles.profileSection}>
            <Image
              source={
                admin.profilePicture
                  ? { uri: admin.profilePicture }
                  : require("../assets/default.png")
              }
              style={styles.profileImage}
            />
            <Text style={styles.username}>{admin.name}</Text>
          </View>

          {/* Profile Settings */}
          <Text style={styles.header}>PROFILE</Text>

          <TouchableOpacity
            style={styles.option}
            onPress={() => navigation.navigate("AdminEditProfile")}
          >
            <Text style={styles.optionText}>Edit Profile</Text>
          </TouchableOpacity>

          {/* Security Section */}
          <Text style={styles.header}>SECURITY</Text>

          <TouchableOpacity
            style={styles.option}
            onPress={() => navigation.navigate("AdminChangePassword")}
          >
            <Text style={styles.optionText}>Change Password</Text>
          </TouchableOpacity>

          {/* About Us and Legal Policies */}
          <Text style={styles.header}>ABOUT US AND LEGAL POLICIES</Text>

          <TouchableOpacity style={styles.option} onPress={() => navigation.navigate("AboutUs")}>
            <Text style={styles.optionText}>About Us</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option} onPress={() => navigation.navigate("TermsOfService")}>
            <Text style={styles.optionText}>Terms of Service</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option} onPress={() => navigation.navigate("PrivacyPolicy")}>
            <Text style={styles.optionText}>Privacy Policy</Text>
          </TouchableOpacity>

          {/* Add Admin */}
          <Text style={styles.header}>ADMIN MANAGEMENT</Text>

          <TouchableOpacity style={styles.option} onPress={() => navigation.navigate("AddAdmin")}>
            <Text style={styles.optionText}>Add Another Admin</Text>
          </TouchableOpacity>

          {/* Log Out Button */}
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutText}>LOG OUT</Text>
          </TouchableOpacity>

          {/* Remove Admin Button */}
          <TouchableOpacity style={styles.removeAdminButton} onPress={handleRemoveAdmin}>
            <Text style={styles.removeAdminText}>REMOVE ADMIN ACCOUNT</Text>
          </TouchableOpacity>

        </ScrollView>

      </SafeAreaView>

    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: "rgba(219, 219, 219, 0.3)",
  },

  banner: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#5691A4",
    padding: 10,
    marginTop: 30,
  },

  logo: {
    width: 60,
    height: 60,
    marginRight: 10,
  },

  appName: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#013042",
    letterSpacing: 5,
  },

  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },

  statusBarFix: {
    height: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },

  scrollContent: {
    paddingBottom: 20,
  },

  profileSection: {
    alignItems: "center",
    marginBottom: 20,
  },

  profileImage: {
    width: 90,
    height: 90,
    borderRadius: 50,
    backgroundColor: "#ddd",
  },

  username: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    color: "black",
  },

  header: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 10,
    marginLeft: 15,
    color: "black",
  },

  option: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 5,
    marginHorizontal: 15,
    marginBottom: 10, 
  },

  optionText: {
    fontSize: 16,
    color: "#013042",
  },

  switchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    marginHorizontal: 15, 
    height: 55
  },

  switchLabel: {
    fontSize: 16,
    color: "black",
  },

  logoutButton: {
    backgroundColor: "rgba(0, 0, 0, 0.9)",
    padding: 12,
    borderRadius: 15,
    marginHorizontal: 15,
    alignItems: "center",
    marginTop: 20, 
  },

  logoutText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },

  removeAdminButton: {
    backgroundColor: "#D9534F",
    padding: 12,
    borderRadius: 15,
    marginHorizontal: 15,
    alignItems: "center",
    marginTop: 10,
  },

  removeAdminText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },

});
