import React from "react";
import { 
  View, 
  Text, 
  ScrollView, 
  StyleSheet, 
  Image, 
  ImageBackground 
} from "react-native";

export default function AboutUsScreen() {
  return (
    <ImageBackground source={require("../assets/background 1.png")} style={styles.background}>
      
      {/* Banner Section */}
      <View style={styles.banner}>
        <Image source={require("../assets/logo.png")} style={styles.logo} />
        <Text style={styles.appName}>IMMEDIAID</Text>
      </View>

      <ScrollView contentContainerStyle={styles.contentContainer}>
        
        {/* About Us Section */}
        <View style={styles.aboutSection}>
          <Text style={styles.header}>- About Us -</Text>
          <Text style={styles.text}>
            IMMEDIAID is a disaster preparedness and response application designed to serve the residents of 
            <Text style={styles.boldText}> Lipa City, Batangas, specifically Barangay Dagatan</Text>. Our goal is to provide a 
            <Text style={styles.boldText}> centralized, reliable, and real-time source of disaster-related information</Text> to help individuals 
            and families stay informed and prepared before, during, and after a calamity.{"\n\n"}
          
            In times of crisis, <Text style={styles.boldText}>access to accurate and timely information can save lives</Text>. IMMEDIAID offers a suite of essential features, including:{"\n\n"}
          
            🔔 <Text style={styles.boldText}>Real-Time Alerts & Updates</Text> – Stay updated on the latest weather warnings, disaster alerts, and emergency announcements.{"\n\n"}
            📚 <Text style={styles.boldText}>Disaster Preparedness Guides</Text> – Learn what to do before, during, and after different types of disasters.{"\n\n"}
            📍 <Text style={styles.boldText}>Evacuation Center Locator</Text> – Quickly find the nearest safe zones and shelters in your area.{"\n\n"}
            ✅ <Text style={styles.boldText}>Emergency Checklist</Text> – Keep track of essential supplies and preparations needed.{"\n\n"}
            🆘 <Text style={styles.boldText}>S.O.S. Function</Text> – Contact emergency responders immediately with just a tap.{"\n\n"}
          
            With the rise of social media, disaster-related information is widely available. However, 
            <Text style={styles.boldText}> not all sources are accurate, centralized, or easy to verify</Text>. Misinformation can lead to confusion and panic. 
            IMMEDIAID <Text style={styles.boldText}>bridges this gap</Text> by delivering <Text style={styles.boldText}>verified, real-time, and community-focused updates</Text>, ensuring that every resident has 
            <Text style={styles.boldText}> access to the right information at the right time</Text>.{"\n\n"}

            At IMMEDIAID, we believe that <Text style={styles.boldText}>preparedness saves lives</Text>. By empowering the community with the right tools and knowledge, we aim to create a 
            safer and more resilient Barangay Dagatan.{"\n\n"}
            <Text style={styles.boldText}>Stay informed. Stay prepared. Take action with IMMEDIAID.</Text>
          </Text>
        </View>

      </ScrollView>

    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
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

  contentContainer: {
    padding: 20,
    alignItems: "center",
  },

  aboutSection: {
    width: "95%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  },

  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#013042",
    textAlign: "center",
    marginBottom: 20,
    letterSpacing: 1
  },

  text: {
    fontSize: 16,
    color: "#333",
    textAlign: "justify",
    lineHeight: 24,
  },

  boldText: {
    fontWeight: "bold",
    color: "#013042",
  },
});