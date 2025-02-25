import React, { useState, useEffect } from "react";
import { 
  View, 
  Text,
  TouchableOpacity, 
  ScrollView, 
  StyleSheet, 
  Alert, 
  Linking, 
  ImageBackground, 
  Image, 
  PermissionsAndroid 
} from "react-native";
import { Ionicons } from "react-native-vector-icons";
import MapView, { Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import Geolocation from "react-native-geolocation-service";

const GOOGLE_MAPS_APIKEY = "YOUR_GOOGLE_MAPS_API_KEY";

export default function EmergencyScreen() {
  const [activeTab, setActiveTab] = useState("contacts");
  const [userLocation, setUserLocation] = useState(null);

  const evacuationCenter = {
    latitude: 13.9606,
    longitude: 121.1633,
    title: "Dagatan Elementary School",
    description: "X58J+9QC, Dagatan, Lipa, Batangas",
  };

  useEffect(() => {
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
      .then((granted) => {
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          Geolocation.getCurrentPosition(
            (position) => {
              setUserLocation({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
              });
            },
            (error) => console.error(error),
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
          );
        }
      });
  }, []);

  const emergencyContacts = [
    { id: 1, name: "National Emergency", number: "911" },
    { id: 2, name: "Baragay Office", number: "(043)3003713" },
    { id: 3, name: "Police", number: "09361856910"},
    { id: 4, name: "Fire Department", number: "09275758065" },
    { id: 5, name: "Mediatrix", number: "(043)7736800" },
    { id: 6, name: "Medix", number: "(043)7562342" },
    { id: 7, name: "CDRRMO", number: "(043)7575164" },
    { id: 8, name: "Batelec II", number: "(043)7566337" },
    { id: 9, name: "Water District", number: "(043)7561611" },
  ];

  const handleCall = (number) => {
    Alert.alert("Confirm Call", `Are you sure you want to call ${number}?`, [
      { text: "Cancel", style: "cancel" },
      { text: "Call", onPress: () => Linking.openURL(`tel:${number}`) }
    ]);
  };

  return (
    <ImageBackground source={require("../assets/background 1.png")} style={styles.background}>

      <View style={styles.container}>

        <View style={styles.banner}>
          <Image source={require("../assets/logo.png")} style={styles.logo} />
          <Text style={styles.appName}>IMMEDIAID</Text>
        </View>

        {/* Tab Buttons */}
        <View style={styles.tabContainer}>

          <TouchableOpacity
            style={[styles.tabButton, activeTab === "contacts" && styles.activeTab]}
            onPress={() => setActiveTab("contacts")}
          >
            <Text style={[styles.tabText, activeTab === "contacts" && styles.activeTabText]}>Emergency Contacts</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tabButton, activeTab === "map" && styles.activeTab]}
            onPress={() => setActiveTab("map")}
          >
            <Text style={[styles.tabText, activeTab === "map" && styles.activeTabText]}>Evacuation Center</Text>
          </TouchableOpacity>
          
        </View>

        {/* Emergency Contacts List */}
        {activeTab === "contacts" ? (
          <ScrollView style={styles.content}>
            {emergencyContacts.map((contact) => (
              <View key={contact.id} style={styles.contactItem}>
                <TouchableOpacity onPress={() => handleCall(contact.number)}>
                  <Ionicons name="call" size={24} color="#007BFF" style={styles.callIcon} />
                </TouchableOpacity>
                <Text style={styles.contactText}>{contact.name} - {contact.number}</Text>
              </View>
            ))}
          </ScrollView>
        ) : (

          // Emergency Map with Directions
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: evacuationCenter.latitude,
              longitude: evacuationCenter.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
            showsUserLocation
            followsUserLocation
          >
            {/* User Location Marker */}
            {userLocation && (
              <Marker
                coordinate={userLocation}
                title="You are here"
                pinColor="blue"
              />
            )}

            {/* Evacuation Center Marker */}
            <Marker
              coordinate={{ latitude: evacuationCenter.latitude, longitude: evacuationCenter.longitude }}
              title={evacuationCenter.title}
              description={evacuationCenter.description}
            />

            {/* Directions */}
            {userLocation && (
              <MapViewDirections
                origin={userLocation}
                destination={{ latitude: evacuationCenter.latitude, longitude: evacuationCenter.longitude }}
                apikey={GOOGLE_MAPS_APIKEY}
                strokeWidth={5}
                strokeColor="red"
              />
            )}
          </MapView>
        )}
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
  tabContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  tabButton: {
    backgroundColor: "#013042",
    paddingVertical: 7,
    paddingHorizontal: 20,
    marginHorizontal: 5,
    borderRadius: 15,
    height: 35,
    marginTop: 15,
    marginBottom: 15,
  },
  activeTab: {
    backgroundColor: "#fff",
  },
  tabText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#fff",
  },
  activeTabText: {
    color: "#013042",
  },
  content: {
    padding: 20,
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    elevation: 2,
  },
  callIcon: {
    marginRight: 10,
  },
  contactText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#013042",
  },
  map: {
    flex: 1,
  },
});
