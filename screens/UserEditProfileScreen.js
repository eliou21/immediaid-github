import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import { MaterialIcons } from "@expo/vector-icons";

export default function UserEditProfileScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  // Load the user data on component mount
  useEffect(() => {
    const loadUserData = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("userData");
        if (storedUser) {
          const user = JSON.parse(storedUser);
          console.log("Loaded user data:", user); // Debug log
          setUsername(user.username || "");
          setProfilePicture(user.profilePicture || null);
          setEmail(user.email || "");
          // Handle both possible field names for phone and address
          setPhone(user.phone || user.phoneNumber || "");
          setAddress(user.address || user.userAddress || "");
        }
      } catch (error) {
        console.error("Failed to load user data:", error);
        Alert.alert("Error", "Failed to load profile data");
      }
    };
    loadUserData();
  }, []);

  // Handle profile picture picking
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfilePicture(result.assets[0].uri);
    }
  };

  // Save the profile changes
  const saveProfile = async () => {
    if (!username.trim()) {
      Alert.alert("Error", "Username cannot be empty");
      return;
    }

    try {
      const storedUser = await AsyncStorage.getItem("userData");
      if (!storedUser) {
        Alert.alert("Error", "No user data found");
        return;
      }

      const user = JSON.parse(storedUser);

      const updatedUser = {
        ...user,
        username: username.trim(),
        profilePicture: profilePicture || user.profilePicture,
        email: email.trim(),
        phone: phone.trim(),
        address: address.trim(),
      };

      await AsyncStorage.setItem("userData", JSON.stringify(updatedUser));
      console.log("Saved user data:", updatedUser); // Debug log

      Alert.alert("Success", "Profile updated successfully!");
      navigation.goBack();
    } catch (error) {
      console.error("Error saving profile:", error);
      Alert.alert("Error", "Failed to update profile");
    }
  };

  return (
    <ImageBackground source={require("../assets/background 1.png")} style={styles.background}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View style={styles.banner}>
              <Image source={require("../assets/logo.png")} style={styles.logo} />
              <Text style={styles.appName}>IMMEDIAID</Text>
            </View>

            <View style={styles.container}>
              <View style={styles.profileSection}>
                <Text style={styles.title}>- Edit Profile -</Text>

                {/* Profile Picture Section */}
                <TouchableOpacity onPress={pickImage} style={styles.profileContainer}>
                  <Image
                    source={
                      profilePicture
                        ? { uri: profilePicture }
                        : require("../assets/default.png")
                    }
                    style={styles.profileImage}
                  />
                  <View style={styles.cameraIconContainer}>
                    <MaterialIcons name="photo-camera" size={20} color="rgb(202, 202, 202)" />
                  </View>
                </TouchableOpacity>

                {/* Username Input */}
                <Text style={styles.label}>Username</Text>
                <TextInput
                  style={styles.input}
                  value={username}
                  onChangeText={setUsername}
                  placeholder="Enter your username"
                  placeholderTextColor="gray"
                />

                {/* Email Input */}
                <Text style={styles.label}>Email</Text>
                <TextInput
                  style={styles.input}
                  value={email}
                  onChangeText={setEmail}
                  placeholder="Enter your email"
                  placeholderTextColor="gray"
                  keyboardType="email-address"
                  autoCapitalize="none"
                />

                {/* Phone Number Input */}
                <Text style={styles.label}>Phone Number</Text>
                <TextInput
                  style={styles.input}
                  value={phone}
                  onChangeText={setPhone}
                  placeholder="Enter your phone number"
                  placeholderTextColor="gray"
                  keyboardType="phone-pad"
                />

                {/* Address Input */}
                <Text style={styles.label}>Address</Text>
                <TextInput
                  style={[styles.input, { height: 80, textAlignVertical: 'top' }]}
                  value={address}
                  onChangeText={setAddress}
                  placeholder="Enter your address"
                  placeholderTextColor="gray"
                  multiline
                />

                {/* Save Button */}
                <TouchableOpacity style={styles.saveButton} onPress={saveProfile}>
                  <Text style={styles.saveText}>Save</Text>
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
    marginTop: 65,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 15,
    letterSpacing: 1
  },
  profileContainer: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  cameraIconContainer: {
    position: "absolute",
    bottom: 5,
    right: 5,
    backgroundColor: "rgba(65, 65, 65, 0)",
    borderRadius: 10,
    padding: 20,
    paddingLeft: 20,
    paddingRight: 4,
  },
  input: {
    width: "100%",
    padding: 10,
    borderColor: "#406A7C",
    borderRadius: 5,
    borderWidth: 1,
    marginBottom: 15,
    color: "#013042",
    backgroundColor: "rgba(144, 144, 144, 0.19)",
  },
  label: {
    alignSelf: "flex-start",
    fontSize: 14,
    fontWeight: "bold",
    color: "#013042",
    marginBottom: 5,
  },
  saveButton: {
    backgroundColor: "#013042",
    padding: 10,
    borderRadius: 10,
    width: 100,
    marginTop: 10,
  },
  saveText: {
    color: "#fff",
    letterSpacing: 1,
    alignSelf: "center",
  },
});