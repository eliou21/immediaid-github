import React, { useState, useEffect } from "react";
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  Linking, 
  ImageBackground, 
  Image, 
  Alert 
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ReceiveSoS() {
  const [sosAlert, setSosAlert] = useState(null);

  useEffect(() => {
    const fetchSOSAlert = async () => {
      const storedAlert = await AsyncStorage.getItem("sosAlert");
      if (storedAlert) {
        setSosAlert(JSON.parse(storedAlert));
      }
    };

    fetchSOSAlert();
    const interval = setInterval(fetchSOSAlert, 5000); 

    return () => clearInterval(interval); 
  }, []);

  const clearSOS = async () => {
    await AsyncStorage.removeItem("sosAlert");
    setSosAlert(null);
  };

  const handleResolve = () => {
    Alert.alert(
      "Confirm Resolution",
      "Are you sure that this alert has been resolved?",
      [
        { text: "Cancel", style: "cancel" }, 
        {
          text: "Resolve",
          onPress: clearSOS, 
          style: "destructive", 
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

        <View style={styles.adminSosContainer}>
          <Text style={styles.title}>Admin SOS Alerts</Text>

          {sosAlert ? (
            <View style={styles.alertBox}>
              <Text style={styles.alertText}>{sosAlert.message}</Text>
              <Text style={styles.timestamp}>⏰  {sosAlert.timestamp}</Text>
              <Text style={styles.info}>👤 Name: {sosAlert.name || "Unknown"}</Text>
              <Text style={styles.info}>🏠 Address: {sosAlert.address || "Not provided"}</Text>
              <Text style={styles.info}>
                📍 Location: {sosAlert.latitude}, {sosAlert.longitude}
              </Text>

              {/* Open Google Maps */}
              <TouchableOpacity
                style={styles.mapButton}
                onPress={() =>
                  Linking.openURL(`https://www.google.com/maps?q=${sosAlert.latitude},${sosAlert.longitude}`)
                }
              >
                <Text style={styles.mapText}>Directions</Text>
              </TouchableOpacity>

              {/* Resolve Button */}
              <TouchableOpacity style={styles.clearButton} onPress={handleResolve}>
                <Text style={styles.clearText}>Resolved</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <Text>No active SOS alerts.</Text>
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

  container: {
    flex: 1,
    backgroundColor: "rgba(28, 28, 28, 0.01)",
  },

  banner: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#5691A4",
    padding: 10,
    justifyContent: "flex-start",
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

  adminSosContainer: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    margin: 20,
    alignItems: "center",
  },

  title: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#013042",
  },

  alertBox: {
    backgroundColor: "rgb(170, 22, 22)",
    padding: 20,
    borderRadius: 10,
    justifyContent: "center", 
    alignItems: "center",
    width: "100%",
  },

  alertText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center"
  },

  timestamp: {
    color: "white",
    fontSize: 14,
    marginTop: 5,
  },

  info: {
    color: "white",
    fontSize: 16,
    marginTop: 5,
  },

  mapButton: {
    marginTop: 20,
    backgroundColor: "rgb(38, 170, 44)",
    padding: 10,
    borderRadius: 15
  },

  mapText: {
    color: "white",
    fontWeight: "bold",
    letterSpacing: 1
  },

  clearButton: {
    marginTop: 10,
    backgroundColor: "black",
    padding: 10,
    borderRadius: 15
  },

  clearText: {
    color: "white",
    fontWeight: "bold",
    letterSpacing: 1
  },
});
