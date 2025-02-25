import React from "react";
import { 
  View, 
  Text, 
  ScrollView, 
  StyleSheet, 
  ImageBackground, 
  Image 
} from "react-native";

export default function TermsOfServiceScreen() {
  return (
    <ImageBackground source={require("../assets/background 1.png")} style={styles.background}>
      
      {/* Banner Section */}
      <View style={styles.banner}>
        <Image source={require("../assets/logo.png")} style={styles.logo} />
        <Text style={styles.appName}>IMMEDIAID</Text>
      </View>

      {/* Content Section */}
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.card}>
          <Text style={styles.header}>- Terms of Service -</Text>
          <Text style={styles.text}>
            <Text style={styles.bold}>Last Updated:</Text> [ February 24, 2025 ]{"\n\n"}

            Welcome to <Text style={styles.bold}>IMMEDIAID</Text>, a disaster preparedness and response application designed to provide real-time alerts, emergency resources, and critical information. By using this app, you agree to the following Terms of Service.
          </Text>

          <Text style={styles.sectionTitle}>1. Acceptance of Terms</Text>
          <Text style={styles.text}>
            By accessing IMMEDIAID, you acknowledge that you have read, understood, and agreed to be bound by these terms.
          </Text>

          <Text style={styles.sectionTitle}>2. User Responsibilities</Text>
          <Text style={styles.text}>
            - Must be at least 13 years old to use IMMEDIAID.{"\n"}
            - Use IMMEDIAID only for lawful purposes.{"\n"}
            - Ensure the accuracy of information provided.{"\n"}
            - Do not misuse the S.O.S. function or send false alerts.{"\n"}
          </Text>

          <Text style={styles.sectionTitle}>3. Service Limitations</Text>
          <Text style={styles.text}>
            IMMEDIAID provides real-time disaster alerts but does <Text style={styles.bold}>not</Text> replace official emergency services. Always contact local authorities in life-threatening situations.
          </Text>

          <Text style={styles.sectionTitle}>4. Data Privacy & Security</Text>
          <Text style={styles.text}>
            - We respect your privacy as outlined in our Privacy Policy.{"\n"}
            - Location data may be collected for localized alerts.{"\n"}
            - No data is shared with third parties without consent, except as required by law.{"\n"}
          </Text>

          <Text style={styles.sectionTitle}>5. Accuracy of Information</Text>
          <Text style={styles.text}>
            While we strive to provide accurate updates, users should verify critical information from government agencies.
          </Text>

          <Text style={styles.sectionTitle}>6. Modifications and Updates</Text>
          <Text style={styles.text}>
            IMMEDIAID may update these terms periodically. Continued use after modifications constitutes acceptance of changes.
          </Text>

          <Text style={styles.sectionTitle}>7. Limitation of Liability</Text>
          <Text style={styles.text}>
            IMMEDIAID is not responsible for any damages, injuries, or losses due to reliance on the app’s information.
          </Text>

          <Text style={styles.sectionTitle}>8. Termination of Use</Text>
          <Text style={styles.text}>
            We reserve the right to suspend or terminate access in cases of false emergency alerts, misuse, or violations of these terms.
          </Text>

          <Text style={styles.sectionTitle}>9. Contact Information</Text>
          <Text style={styles.text}>
            📧 <Text style={styles.bold}>immediaid.services@gmail.com</Text>
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

  container: {
    flexGrow: 1,
    alignItems: "center",
    padding: 20,
  },

  card: {
    width: "95%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },

  header: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#013042",
    letterSpacing: 1
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 15,
    color: "#406A7C",
    marginBottom: 10
  },

  text: {
    fontSize: 14,
    color: "#333",
    lineHeight: 22,
    textAlign: "justify"
  },

  bold: {
    fontWeight: "bold",
  },
});

