import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ImageBackground,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";
import axios from "axios";

export default function PostNews({ navigation }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);

  useEffect(() => {
    registerForPushNotifications();
  }, []);

  const registerForPushNotifications = async () => {
    const { status } = await Notifications.getPermissionsAsync();
    if (status !== "granted") {
      const { status: newStatus } = await Notifications.requestPermissionsAsync();
      if (newStatus !== "granted") {
        Alert.alert("Permission Required", "Enable notifications to receive alerts.");
        return;
      }
    }

    const token = (await Notifications.getExpoPushTokenAsync()).data;
    await AsyncStorage.setItem("expoPushToken", token);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const sendNotificationToUsers = async (newsTitle) => {
    try {
      const token = await AsyncStorage.getItem("expoPushToken");
      if (!token) {
        console.log("No Expo Push Token found");
        return;
      }

      const message = {
        to: token,
        sound: "default",
        title: "New News Alert!",
        body: `Check out: ${newsTitle}`,
        data: { newsTitle },
      };

      await fetch("https://exp.host/--/api/v2/push/send", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Accept-Encoding": "gzip, deflate",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(message),
      });

      console.log("Notification sent successfully");
    } catch (error) {
      console.error("Error sending notification:", error);
    }
  };

  const handlePostNews = async () => {
  if (!title || !content) {
    Alert.alert("Error", "All fields are required!");
    return;
  }

  try {
    const response = await axios.post("http://172.20.10.4:5000/api/news", {
      title,
      content,
      image,
    });

    await sendNotificationToUsers(title);

    Alert.alert("Success", "News posted successfully!");
    setTitle("");
    setContent("");
    setImage(null);
    navigation.navigate("Dashboard");
  } catch (error) {
    console.error("Error posting news:", error.message);
    Alert.alert("Error", "Failed to post news");
  }
};

  return (

    <ImageBackground source={require("../assets/background 1.png")} style={styles.background}>

      <View style={styles.banner}>
        <Image source={require("../assets/logo.png")} style={styles.logo} />
        <Text style={styles.appName}>IMMEDIAID</Text>
      </View>

      <View style={styles.container}>
        <View style={styles.postContainer}>
          <View style={styles.createPost}>
            <Text style={styles.title}>Create Post</Text>
          </View>

          <TextInput
            style={styles.input}
            placeholder="Title"
            value={title}
            onChangeText={setTitle}
          />

          <View style={styles.textAreaContainer}>
            <TextInput
              style={styles.textArea}
              placeholder="Write your content here..."
              value={content}
              onChangeText={setContent}
              multiline
              textAlignVertical="top"
            />

            <TouchableOpacity style={styles.attachmentButton} onPress={pickImage}>
              <Ionicons name="attach" size={26} color="rgba(147, 147, 147, 0.9)" />
            </TouchableOpacity>
          </View>

          {image && <Image source={{ uri: image }} style={styles.previewImage} />}

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={handlePostNews}>
              <Text style={styles.buttonText}>POST</Text>
            </TouchableOpacity>
          </View>
        </View>

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
    padding: 20,
    justifyContent: "center",
  },

  postContainer: {
    padding: 25,
    borderRadius: 15,
    backgroundColor: "white",
  },

  createPost: {
    alignItems: "center",
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    letterSpacing: 1,
  },

  input: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },

  textAreaContainer: {
    position: "relative",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
  },

  textArea: {
    height: 120,
    padding: 10,
    paddingRight: 50,
  },

  attachmentButton: {
    position: "absolute",
    right: 10,
    top: 85,
  },

  previewImage: {
    width: "100%",
    height: 150,
    marginTop: 10,
    borderRadius: 5,
  },

  buttonContainer: {
    alignItems: "center",
    marginTop: 20,
  },

  button: {
    backgroundColor: "#013042",
    padding: 10,
    borderRadius: 15,
    width: 150,
    alignItems: "center",
  },

  buttonText: {
    fontWeight: "bold",
    color: "#fff",
    fontSize: 18,
    letterSpacing: 2,
  },
});

