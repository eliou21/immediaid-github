import React from "react";
import { 
  View, 
  Text, 
  ScrollView, 
  StyleSheet, 
  ImageBackground, 
  Image 
} from "react-native";

export default function PrivacyPolicyScreen() {
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
          <Text style={styles.header}>- Privacy Policy -</Text>
          <Text style={styles.text}>
            <Text style={styles.bold}>Last Updated:</Text> [ February 24, 2025 ]{"\n\n"}

            IMMEDIAID is committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, store, and protect your data. By using IMMEDIAID, you agree to the terms outlined in this policy.
          </Text>

          <Text style={styles.sectionTitle}>1. Information We Collect</Text>
          <Text style={styles.text}>
            IMMEDIAID collects the following types of information to enhance disaster preparedness efforts:{"\n"}
            - <Text style={styles.bold}>Personal Information:</Text> Name, contact details (if provided).{"\n"}
            - <Text style={styles.bold}>Location Data (Optional):</Text> If enabled, we use real-time location for localized alerts.{"\n"}
            - <Text style={styles.bold}>Device & Usage Data:</Text> App version, device type, interactions for optimization.{"\n"}
            - <Text style={styles.bold}>SOS Function Usage:</Text> Relevant details may be shared with emergency responders (if applicable).
          </Text>

          <Text style={styles.sectionTitle}>2. How We Use Your Information</Text>
          <Text style={styles.text}>
            ✅ Delivering real-time disaster alerts.{"\n"}
            ✅ Enhancing emergency response (if location is enabled).{"\n"}
            ✅ Improving app functionality based on usage insights.{"\n"}
            ✅ Preventing fraudulent or unauthorized app use.{"\n"}
          </Text>

          <Text style={styles.sectionTitle}>3. Data Sharing & Third Parties</Text>
          <Text style={styles.text}>
            IMMEDIAID **does not** sell or share personal data for marketing. Data may only be shared:{"\n"}
            - <Text style={styles.bold}>With Emergency Responders:</Text> If SOS is triggered (subject to local implementation).{"\n"}
            - <Text style={styles.bold}>Legal Compliance:</Text> If required by law.{"\n"}
            - <Text style={styles.bold}>Third-Party Services:</Text> Some external services (e.g., weather APIs) may process limited data.{"\n"}
          </Text>

          <Text style={styles.sectionTitle}>4. Data Security</Text>
          <Text style={styles.text}>
            IMMEDIAID implements encryption and security measures, but users are advised to safeguard their devices and credentials.
          </Text>

          <Text style={styles.sectionTitle}>5. User Controls & Privacy Settings</Text>
          <Text style={styles.text}>
            🔹 <Text style={styles.bold}>Location Services:</Text> Can be disabled via device settings.{"\n"}
            🔹 <Text style={styles.bold}>Notification Preferences:</Text> Users can manage disaster alerts in-app.{"\n"}
            🔹 <Text style={styles.bold}>Data Deletion Requests:</Text> Users may request account and data deletion via support.
          </Text>

          <Text style={styles.sectionTitle}>6. Service Limitations</Text>
          <Text style={styles.text}>
            IMMEDIAID requires **internet and power** to function. Some features may be unavailable during network outages.
          </Text>

          <Text style={styles.sectionTitle}>7. Changes to Privacy Policy</Text>
          <Text style={styles.text}>
            IMMEDIAID may update this Privacy Policy periodically. Users will be notified of significant changes via in-app notifications.
          </Text>

          <Text style={styles.sectionTitle}>8. Contact Information</Text>
          <Text style={styles.text}>
            📧 <Text style={styles.bold}>immediaid.services@gmail.com</Text>
          </Text>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

// Styles
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
    letterSpacing: 1,
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
