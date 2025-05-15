import React, { useState } from "react";
import {
  View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, ImageBackground
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";

export default function LoginScreen({ navigation }) {
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    try {
      // Check for admin credentials
      if (emailOrUsername === "admin@gmail.com" && password === "admin123") {
        const adminData = {
          username: "admin",
          email: "admin@gmail.com",
          profilePicture: null,
          phone: "",
          address: "",
          isAdmin: true
        };

        await AsyncStorage.setItem("token", "admin-token");
        await AsyncStorage.setItem("userId", "admin-id");
        await AsyncStorage.setItem("userData", JSON.stringify(adminData));

        Alert.alert("Success", "Admin login successful!");
        navigation.replace("AdminNavigation");
        return;
      }

      const response = await fetch("http://192.168.0.103:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ emailOrUsername, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        Alert.alert("Error", data.message);
        return;
      }

      // Ensure all user fields are properly initialized
      const completeUserData = {
        fullName: data.user.fullName || "Unknown User",
        username: data.user.username || "",
        email: data.user.email || "",
        profilePicture: data.user.profilePicture || null,
        phone: data.user.phone || "",
        address: data.user.address || "",
      };

      // ✅ Save token, userId, and userData
      await AsyncStorage.setItem("token", data.token);
      await AsyncStorage.setItem("userId", data.user._id); // ✅ This was missing
      await AsyncStorage.setItem("userData", JSON.stringify(completeUserData));

      Alert.alert("Success", "Login successful!");
      navigation.replace("UserNavigation");
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Something went wrong, please try again!");
    }
  };

  return (
    <ImageBackground source={require("../assets/sign.png")} style={styles.background}>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Username or Email"
          autoCapitalize="none"
          value={emailOrUsername}
          onChangeText={setEmailOrUsername}
        />
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Password"
            secureTextEntry={!showPassword}
            autoCapitalize="none"
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Ionicons name={showPassword ? "eye-off" : "eye"} size={24} color="rgba(147, 147, 147, 0.9)" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>LOGIN</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
          <Text style={styles.link}>Don't have an account? Sign up</Text>
        </TouchableOpacity>
      </View>
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
  },

  container: { 
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center", 
    padding: 20,
    marginTop: 400
  },

  input: { 
    backgroundColor: "rgba(246, 246, 246, 0.9)", 
    width: "100%", 
    padding: 10, 
    borderRadius: 5, 
    marginBottom: 25 
  },

  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    borderRadius: 5,
    marginBottom: 15,
    paddingRight: 10,
    backgroundColor:"rgba(246, 246, 246, 0.9)",
  },

  passwordInput: {
    flex: 1,
    padding: 10,
  },

  button: { 
    backgroundColor: "#013042", 
    padding: 10, 
    borderRadius: 5, 
    width: "100%", 
    alignItems: "center", 
    marginTop: 20
  },

  buttonText: { 
    color: "#fff", 
    fontSize: 18, 
    fontWeight: "bold",
    letterSpacing: 2
  },

  link: { 
    marginTop: 150, 
    color: "#fff" 
  },
});
