import React, { useState, useEffect } from "react";
import { 
  View, 
  Text, 
  TouchableOpacity, 
  Alert, 
  StyleSheet, 
  Image, 
  ImageBackground, 
  TextInput 
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from "expo-location";
import { Picker } from "@react-native-picker/picker";

export default function SendSoS() {
  const [userInfo, setUserInfo] = useState({ fullName: "", address: "" });
  const [countdown, setCountdown] = useState(0);
  const [emergencyType, setEmergencyType] = useState("");
  const [additionalDetails, setAdditionalDetails] = useState("");

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
    if (!emergencyType) {
      Alert.alert("Missing Emergency Type", "Please select the type of emergency.");
      return;
    }

    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Location Permission Denied", "Enable location services to send an SOS.");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      const alertData = {
        id: Date.now(),
        message: `🚨 SOS Alert! Resident needs help! 🚨\n\nEmergency Type: ${emergencyType}\n\nDetails: ${additionalDetails}`,
        timestamp: new Date().toLocaleString(),
        name: userInfo.fullName,
        address: userInfo.address,
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        details: additionalDetails,
      };

      const existingAlerts = await AsyncStorage.getItem("sosAlerts");
      const alertsArray = existingAlerts ? JSON.parse(existingAlerts) : [];

      alertsArray.push(alertData);

      await AsyncStorage.setItem("sosAlerts", JSON.stringify(alertsArray));

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
    if (!emergencyType) {
      Alert.alert("Missing Emergency Type", "Please select the type of emergency.");
      return;
    }

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
          <Text style={styles.title}>Select and press the button in case of an EMERGENCY!</Text>

          {/* Emergency Type Picker */}
          <View style={styles.pickerContainer}>
          <Picker
            selectedValue={emergencyType}
            onValueChange={(itemValue) => setEmergencyType(itemValue)}
            style={styles.picker}
            dropdownIconColor="black"
          >
            <Picker.Item label="Select Emergency Type" value="" color="gray"/>
            <Picker.Item label="Medical Emergency" value="Medical Emergency" color="black" />
            <Picker.Item label="Rescue" value="Rescue" color="black" />
            <Picker.Item label="Fire" value="Fire" color="black" />
            <Picker.Item label="Flood" value="Flood" color="black" />
            <Picker.Item label="Earthquake" value="Earthquake" color="black" />
            <Picker.Item label="Crime/Assault" value="Crime/Assault" color="black" />
          </Picker>

          </View>

          {/* Additional Details Input */}
          <TextInput
            style={styles.input}
            placeholder="Additional Details (optional)"
            value={additionalDetails}
            onChangeText={setAdditionalDetails}
          />

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
    height: 400, 
    padding: 20,
    marginTop: 150, 
    marginLeft: 30
  },

  title: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: "bold",
    color: "red",
    letterSpacing: 2,
    textAlign: "center", 
  },

  pickerContainer: {
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#f9f9f9",
    marginBottom: 20,
    marginTop: 30,
    padding: 2
  },
  
  picker: {
    height: 55,
    width: 300,
  },
  
  pickerItem: {
    fontSize: 13,
    color: "black",
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

  input: {
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#f9f9f9",
    width: 300,
  },
});
