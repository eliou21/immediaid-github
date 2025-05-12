import React, { useState, useEffect } from "react";
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  Alert, 
  StyleSheet, 
  ImageBackground, 
  Image, 
  Platform,
  ScrollView
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Feather from "react-native-vector-icons/Feather";
import * as ImagePicker from "expo-image-picker";

export default function SignupScreen({ navigation }) {
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null);

  const requestPermissions = async () => {
    if (Platform.OS === "android") {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
      );
      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        Alert.alert("Permission Denied", "Cannot access photo gallery");
      }
    }
  };

  useEffect(() => {
    requestPermissions();
  }, []);

  const handleChoosePhoto = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setProfilePicture(result.assets[0].uri);
    }
  };

  const handleSignup = async () => {
    if (!username || !email || !phone || !password || !confirmPassword) {
      Alert.alert("Error", "All fields are required!");
      return;
    }

    if (!/^\d{10,11}$/.test(phone)) {
      Alert.alert("Error", "Phone number must be 10-11 digits!");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match!");
      return;
    }

    try {
      const user = { fullName, address, username, email, phone, password, profilePicture };
      await AsyncStorage.setItem("userData", JSON.stringify(user));
      Alert.alert("Success", "Account created successfully!");
      navigation.navigate("Login");
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to save user data.");
    }
  };

  return (
    <ImageBackground source={require("../assets/background 1.png")} style={styles.background}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Image source={require("../assets/logo.png")} style={styles.image} />
        <Text style={styles.title}>IMMEDIAID</Text>

        <View style={styles.container}>
          {/* Profile Picture Section */}
          <TouchableOpacity style={styles.imageContainer} onPress={handleChoosePhoto}>
            {profilePicture ? (
              <Image source={{ uri: profilePicture }} style={styles.profileImage} />
            ) : (
              <Feather name="camera" size={30} color="#777" />
            )}
          </TouchableOpacity>

          <TextInput
            style={styles.input}
            placeholder="Fullname (Lastname, Firstname M.I.)"
            value={fullName}
            onChangeText={setFullName}
          />

          <TextInput
            style={styles.input}
            placeholder="Address"
            value={address}
            onChangeText={setAddress}
          />

          <TextInput
            style={styles.input}
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
          />

          <TextInput
            style={styles.input}
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />

          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
          />

          {/* Password Input with Eye Icon */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputField}
              placeholder="Password"
              autoCapitalize="none"
              secureTextEntry={!passwordVisible}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
              <Feather 
                name={passwordVisible ? "eye-off" : "eye"} 
                size={20} 
                color="gray" 
                style={styles.icon} 
              />
            </TouchableOpacity>
          </View>

          {/* Confirm Password Input with Eye Icon */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputField}
              placeholder="Confirm Password"
              autoCapitalize="none"
              secureTextEntry={!confirmPasswordVisible}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
            <TouchableOpacity onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}>
              <Feather 
                name={confirmPasswordVisible ? "eye-off" : "eye"} 
                size={20} 
                color="gray" 
                style={styles.icon} 
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.button} onPress={handleSignup}>
            <Text style={styles.buttonText}>REGISTER</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.link}>Already have an account? Login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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

  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },

  container: { 
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center", 
    padding: 20,
    marginTop: 10 
  },

  image: {
    width: 180,
    height: 180,
    resizeMode: "contain",
    marginTop: 70,
    marginBottom: 20,
    alignSelf: "center"
  },

  title: {
    fontSize: 35,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    letterSpacing: 8
  },

  imageContainer: {
    width: 90,
    height: 90,
    borderRadius: 50,
    backgroundColor: "rgba(246, 246, 246, 0.9)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },

  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },

  imagePlaceholder: {
    color: "#777",
    fontSize: 12,
  },

  input: { 
    width: "100%", 
    padding: 10, 
    borderRadius: 5, 
    marginBottom: 10, 
    backgroundColor: "rgba(246, 246, 246, 0.9)"
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    borderRadius: 5,
    marginBottom: 10,
    paddingRight: 10,
    backgroundColor:"rgba(246, 246, 246, 0.9)"
  },

  inputField: {
    flex: 1,
    padding: 10,
    fontSize: 14,
  },

  icon: {
    marginLeft: 10,
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
    marginTop: 10, 
    color: "#fff" 
  },
});
