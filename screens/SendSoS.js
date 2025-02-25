import React, { useState, useEffect } from "react";
import { 
  View, 
  Text, 
  TouchableOpacity, 
  Alert, 
  StyleSheet, 
  Image, 
  ImageBackground 
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from "expo-location";

export default function SendSoS() {
  const [userInfo, setUserInfo] = useState({ fullName: "", address: "" });
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    const fetchUserData = async () => {
      const storedUser = await AsyncStorage.getItem("userData");
      if (storedUser) {
        setUserInfo(JSON.parse(storedUser));
      }
    };

    fetchUserData();
  }, []);

  const sendSOS = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Location Permission Denied", "Enable location services to send an SOS.");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      const alertData = {
        id: Date.now(),
        message: "🚨 SOS Alert! A resident needs help! 🚨",
        timestamp: new Date().toLocaleString(),
        name: userInfo.fullName,
        address: userInfo.address,
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };

      await AsyncStorage.setItem("sosAlert", JSON.stringify(alertData));

      Alert.alert("SOS Sent", "Your alert has been sent to the admin!");
    } catch (error) {
      console.error("Error sending SOS:", error);
      Alert.alert("Error", "Failed to send SOS.");
    }
  };

  const startCountdown = () => {
    setCountdown(5);
    const countdownInterval = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 1) {
          clearInterval(countdownInterval);
          sendSOS();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleSOSPress = () => {
    Alert.alert(
      "Confirm SOS",
      "Are you sure you want to send an SOS alert? This will notify the admin.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Send SOS",
          onPress: () => startCountdown(),
        },
      ]
    );
  };

  return (

    <ImageBackground source={require("../assets/background 1.png")} style={styles.background}>

      <View style={styles.container}>

        <View style={styles.banner}>
          <Image source={require("../assets/logo.png")} style={styles.logo} />
          <Text style={styles.appName}>IMMEDIAID</Text>
        </View>

        <View style={styles.sosContainer}>
          <Text style={styles.title}>Press the button in case of an EMERGENCY!</Text>

          {countdown > 0 ? (
            <Text style={styles.countdownText}>Sending SOS in {countdown} seconds...</Text>
          ) : (
            <TouchableOpacity style={styles.sosButton} onPress={handleSOSPress}>
              <Text style={styles.sosText}>S.O.S</Text>
            </TouchableOpacity>
          )}
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
    justifyContent: "left",
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
    backgroundColor: "rgba(28, 28, 28, 0.01)",
  },

  sosContainer: {
    justifyContent: "center",
    alignItems: "center", 
    backgroundColor: "white",
    borderRadius: 20,
    width: 350,
    height: 350,
    padding: 20,
    marginTop: 190,
    marginLeft: 30
  },

  title: {
    fontSize: 18,
    marginBottom: 30,
    fontWeight: "bold",
    color: "red",
    letterSpacing: 2,
    textAlign: "center", 
  },

  sosButton: {
    backgroundColor: "red",
    padding: 15,
    borderRadius: 100,
    width: 150,
    height: 150,
    justifyContent: "center", 
    alignItems: "center",
    borderWidth: 3, 
  },

  sosText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 45,
  },

  countdownText: {
    fontSize: 18,
    color: "red", 
    marginTop: 20,
    textAlign: "center", 
  },
});