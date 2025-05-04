import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Alert
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function UserChangePasswordScreen({ navigation }) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const getUserId = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem("userId");
        if (storedUserId) {
          setUserId(storedUserId);
        } else {
          console.warn("User ID not found in AsyncStorage");
        }
      } catch (error) {
        console.error("Error fetching user ID:", error);
      }
    };
    getUserId();
  }, []);

  const changePassword = async () => {
    try {
      if (!currentPassword || !newPassword || !confirmPassword) {
        Alert.alert("Error", "Please fill in all fields.");
        return;
      }

      if (newPassword !== confirmPassword) {
        Alert.alert("Error", "New passwords do not match.");
        return;
      }

      if (newPassword === currentPassword) {
        Alert.alert("Error", "New password must be different from the current one.");
        return;
      }

      if (!userId) {
        Alert.alert("Error", "User ID not found. Please log in again.");
        return;
      }

      setLoading(true);
      const token = await AsyncStorage.getItem("token");

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.post(
        "http://192.168.68.113:5000/api/auth/change-password", // ✅ Update to your server IP
        {
          userId,
          currentPassword,
          newPassword,
        },
        config
      );

      if (response.data.success) {
        Alert.alert("Success", "Password changed successfully!");
        navigation.goBack();
      } else {
        Alert.alert("Error", response.data.message || "Failed to change password.");
      }
    } catch (error) {
      console.error("Password change error:", error.response?.data || error.message);
      Alert.alert(
        "Error",
        error.response?.data?.message || "Failed to change password. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground source={require("../assets/background 1.png")} style={styles.background}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View style={styles.banner}>
              <Image source={require("../assets/logo.png")} style={styles.logo} />
              <Text style={styles.appName}>IMMEDIAID</Text>
            </View>

            <View style={styles.container}>
              <View style={styles.profileSection}>
                <Text style={styles.title}>- Change Password -</Text>

                {/* Current Password */}
                <Text style={styles.label}>Current Password</Text>
                <View style={styles.passwordContainer}>
                  <TextInput
                    style={styles.passwordInput}
                    secureTextEntry={!showCurrentPassword}
                    placeholder="Current Password"
                    value={currentPassword}
                    onChangeText={setCurrentPassword}
                    autoCapitalize="none"
                  />
                  <TouchableOpacity
                    onPress={() => setShowCurrentPassword(!showCurrentPassword)}
                    style={styles.eyeIcon}
                  >
                    <Ionicons
                      name={showCurrentPassword ? "eye-off" : "eye"}
                      size={24}
                      color="rgba(147, 147, 147, 0.9)"
                    />
                  </TouchableOpacity>
                </View>

                {/* New Password */}
                <Text style={styles.label}>New Password</Text>
                <View style={styles.passwordContainer}>
                  <TextInput
                    style={styles.passwordInput}
                    secureTextEntry={!showNewPassword}
                    placeholder="New Password"
                    value={newPassword}
                    onChangeText={setNewPassword}
                    autoCapitalize="none"
                  />
                  <TouchableOpacity
                    onPress={() => setShowNewPassword(!showNewPassword)}
                    style={styles.eyeIcon}
                  >
                    <Ionicons
                      name={showNewPassword ? "eye-off" : "eye"}
                      size={24}
                      color="rgba(147, 147, 147, 0.9)"
                    />
                  </TouchableOpacity>
                </View>

                {/* Confirm New Password */}
                <Text style={styles.label}>Confirm New Password</Text>
                <View style={styles.passwordContainer}>
                  <TextInput
                    style={styles.passwordInput}
                    secureTextEntry={!showConfirmPassword}
                    placeholder="Confirm New Password"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    autoCapitalize="none"
                  />
                  <TouchableOpacity
                    onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                    style={styles.eyeIcon}
                  >
                    <Ionicons
                      name={showConfirmPassword ? "eye-off" : "eye"}
                      size={24}
                      color="rgba(147, 147, 147, 0.9)"
                    />
                  </TouchableOpacity>
                </View>

                <TouchableOpacity
                  style={styles.saveButton}
                  onPress={changePassword}
                  activeOpacity={0.8}
                  disabled={loading}
                >
                  <Text style={styles.saveText}>
                    {loading ? "Changing..." : "Change Password"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}
// Your existing styles remain exactly the same
const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(28, 28, 28, 0.9)",
  },
  banner: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#5691A4",
    padding: 10,
    marginTop: 40,
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
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
  },
  profileSection: {
    width: "95%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 130,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 30,
    letterSpacing: 1,
  },
  label: {
    alignSelf: "flex-start",
    fontSize: 14,
    fontWeight: "bold",
    color: "#013042",
    marginBottom: 5,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#406A7C",
    borderRadius: 5,
    marginBottom: 15,
    backgroundColor: "rgba(144, 144, 144, 0.19)",
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
    color: "#013042",
  },
  eyeIcon: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  saveButton: {
    backgroundColor: "#013042",
    padding: 10,
    borderRadius: 10,
    width: 170,
    marginTop: 20,
  },
  saveText: {
    color: "#fff",
    letterSpacing: 1,
    alignSelf: "center",
  },
});