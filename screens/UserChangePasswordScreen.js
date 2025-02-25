import React, { useState } from "react";
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
  Keyboard
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons"; 

export default function UserChangePasswordScreen({ navigation }) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const changePassword = async () => {
    const storedUser = await AsyncStorage.getItem("userData");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      if (currentPassword !== user.password) {
        alert("Current password is incorrect!");
        return;
      }
      if (newPassword !== confirmPassword) {
        alert("New passwords do not match!");
        return;
      }
      user.password = newPassword;
      await AsyncStorage.setItem("userData", JSON.stringify(user));
      alert("Password changed successfully!");
      navigation.goBack();
    }
  };

  return (

    <ImageBackground source={require("../assets/background 1.png")} style={styles.background}>

      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"} 
        style={{ flex: 1 }}
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

                <TouchableOpacity style={styles.saveButton} onPress={changePassword}>
                  <Text style={styles.saveText}>Change Password</Text>
                </TouchableOpacity>

              </View>

            </View>

          </ScrollView>

        </TouchableWithoutFeedback>

      </KeyboardAvoidingView>

    </ImageBackground>
  );
}

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
