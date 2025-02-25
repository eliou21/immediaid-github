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
  Keyboard,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import { MaterialIcons } from "@expo/vector-icons";

export default function AdminEditProfileScreen({ navigation }) {
  const [name, setName] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const loadAdminData = async () => {
      try {
        const storedAdmin = await AsyncStorage.getItem("currentAdmin");
        if (storedAdmin) {
          const admin = JSON.parse(storedAdmin);
          setName(admin.name || "");
          setProfilePicture(admin.profilePicture || null);
          setEmail(admin.email || "");
        }
      } catch (error) {
        console.error("Failed to load admin data:", error);
      }
    };
    loadAdminData();
  }, []);

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

  const saveProfile = async () => {
    try {
      const storedAdmin = await AsyncStorage.getItem("currentAdmin");
      if (!storedAdmin) {
        Alert.alert("Error", "No admin data found.");
        return;
      }
  
      let admin = JSON.parse(storedAdmin);
  
      const updatedAdmin = {
        ...admin,
        name: name.trim(),
        email: email.trim(),
        profilePicture: profilePicture || admin.profilePicture,
      };
  
      await AsyncStorage.setItem("currentAdmin", JSON.stringify(updatedAdmin));
  
      Alert.alert("Success", "Profile updated successfully!");
      navigation.goBack();
    } catch (error) {
      console.error("Error saving profile:", error);
      Alert.alert("Error", "Failed to update profile.");
    }
  };  

  return (
    
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ImageBackground
          source={require("../assets/background 1.png")}
          style={styles.background}
        >
          <View style={styles.banner}>
            <Image source={require("../assets/logo.png")} style={styles.logo} />
            <Text style={styles.appName}>IMMEDIAID</Text>
          </View>

          <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
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
                    <MaterialIcons
                      name="photo-camera"
                      size={20}
                      color="rgb(202, 202, 202)"
                    />
                  </View>
                </TouchableOpacity>

                {/* Name Input */}
                <Text style={styles.label}>Name</Text>
                <TextInput
                  style={styles.input}
                  value={name}
                  onChangeText={setName}
                  placeholder="Enter your name"
                  placeholderTextColor="gray"
                />

                {/* Email Input */}
                <Text style={styles.label}>Email</Text>
                <TextInput
                  style={styles.input}
                  value={email}
                  onChangeText={setEmail}
                  placeholder="Enter your email"
                  autoCapitalize="none"
                  placeholderTextColor="gray"
                  keyboardType="email-address"
                />

                {/* Save Button */}
                <TouchableOpacity style={styles.saveButton} onPress={saveProfile}>
                  <Text style={styles.saveText}>Save</Text>
                </TouchableOpacity>

              </View>

            </View>

          </ScrollView>

        </ImageBackground>

      </TouchableWithoutFeedback>

    </KeyboardAvoidingView>
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
    marginTop: 120, 
  },

  title: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 15,
    letterSpacing: 1,
  },

  profileContainer: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center"
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
    backgroundColor: "rgba(65, 65, 65, 0) ",
    borderRadius: 10,
    padding: 20,
    paddingLeft: 20,
    paddingRight: 4
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
