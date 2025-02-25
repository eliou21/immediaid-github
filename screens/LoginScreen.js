import React, { useState } from "react";
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  Alert, 
  StyleSheet, 
  ImageBackground 
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons"; 

export default function LoginScreen({ navigation }) {
  const [emailOrUsername, setEmailOrUsername] = useState(""); 
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); 

  const handleLogin = async () => {
    try {
      const storedAdmins = await AsyncStorage.getItem("admins");
      let admins = storedAdmins ? JSON.parse(storedAdmins) : [];
  
      const defaultAdmin = { email: "admin@gmail.com", password: "admin123", name: "Admin", profilePicture: null };
  
      if (!admins.some(admin => admin.email === defaultAdmin.email)) {
        admins.push(defaultAdmin);
        await AsyncStorage.setItem("admins", JSON.stringify(admins));
      }
  
      const matchedAdmin = admins.find(
        (admin) => 
          (admin.email === emailOrUsername || admin.name === emailOrUsername) &&
          admin.password === password
      );
  
      if (matchedAdmin) {
        Alert.alert("Success", "Admin login successful!");
        await AsyncStorage.setItem("loggedInAs", "admin");
        await AsyncStorage.setItem("currentAdmin", JSON.stringify(matchedAdmin)); // Store admin details
        navigation.replace("AdminNavigation");
        return;
      }
  
      const storedUser = await AsyncStorage.getItem("userData");
      if (!storedUser) {
        Alert.alert("Error", "No user found, please sign up first!");
        return;
      }
  
      const { username, email, password: storedPassword } = JSON.parse(storedUser);
  
      if ((emailOrUsername === email || emailOrUsername === username) && password === storedPassword) {
        Alert.alert("Success", "User login successful!");
        await AsyncStorage.setItem("loggedInAs", "user");
        navigation.replace("UserNavigation");
      } else {
        Alert.alert("Error", "Invalid credentials or account does not exist!");
      }
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
            <Ionicons 
              name={showPassword ? "eye-off" : "eye"} 
              size={24} 
              color="rgba(147, 147, 147, 0.9)" 
            />
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
