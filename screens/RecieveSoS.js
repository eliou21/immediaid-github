import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Linking,
  ImageBackground,
  Image,
  Alert,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import axios from "axios";

export default function ReceiveSoS() {
  const [sosAlerts, setSosAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSOSAlert = async () => {
    try {
      const response = await axios.get("http://172.20.10.4:5000/api/sos");
      setSosAlerts(response.data);
    } catch (error) {
      console.error("Failed to fetch SOS alerts:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSOSAlert();
    const interval = setInterval(fetchSOSAlert, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleResolve = async (id) => {
    Alert.alert(
      "Confirm Resolution",
      "Are you sure that this alert has been resolved?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Resolve",
          onPress: async () => {
            try {
              // Send PATCH request to mark as resolved in the backend
              await axios.patch(`http://192.168.0.103:5000/api/sos/${id}`);
              
              // Remove the resolved alert from the state (frontend)
              setSosAlerts(prevAlerts => prevAlerts.filter(alert => alert._id !== id));
  
              // Optionally refresh the alerts from the backend if needed (not necessary in this case)
              // fetchSOSAlert(); // This is not needed since you're updating the state directly
            } catch (error) {
              Alert.alert("Error", "Failed to resolve the SOS alert.");
            }
          },
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

        <ScrollView contentContainerStyle={styles.adminSosContainer}>
          <Text style={styles.title}>Admin SOS Alerts</Text>

          {loading ? (
            <ActivityIndicator size="large" color="red" />
          ) : sosAlerts.length === 0 ? (
            <Text>No active SOS alerts.</Text>
          ) : (
            sosAlerts.map((alert, index) => (
              <View key={index} style={styles.alertBox}>
                <Text style={styles.alertText}>{alert.message}</Text>
                <Text style={styles.timestamp}>⏰ {alert.timestamp}</Text>
                <Text style={styles.info}>👤 Name: {alert.name || "Unknown"}</Text>
                <Text style={styles.info}>🏠 Address: {alert.address || "Not provided"}</Text>
                <Text style={styles.info}>
                  📍 Location: {alert.latitude}, {alert.longitude}
                </Text>
                <Text style={styles.info}>
                  📝 Additional Details: {alert.details || "No additional details provided."}
                </Text>
                <TouchableOpacity
                  style={styles.mapButton}
                  onPress={() =>
                    Linking.openURL(`https://www.google.com/maps?q=${alert.latitude},${alert.longitude}`)
                  }
                >
                  <Text style={styles.mapText}>Directions</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.clearButton} onPress={() => handleResolve(alert._id)}>
                  <Text style={styles.clearText}>Resolved</Text>
                </TouchableOpacity>
              </View>
            ))
          )}
        </ScrollView>
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
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
    color: "red",
  },
  alertBox: {
    backgroundColor: "#f8d7da",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    width: "100%",
  },
  alertText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    color: "black",
  },
  timestamp: {
    color: "gray",
    marginBottom: 5,
  },
  info: {
    fontSize: 16,
    marginBottom: 5,
  },
  mapButton: {
    marginTop: 10,
    backgroundColor: "#5691A4",
    padding: 10,
    borderRadius: 10,
  },
  mapText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  clearButton: {
    marginTop: 10,
    backgroundColor: "red",
    padding: 10,
    borderRadius: 10,
  },
  clearText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});
