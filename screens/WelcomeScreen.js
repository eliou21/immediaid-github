import React from "react";
import { 
  View, 
  Text, 
  Image, 
  TouchableOpacity, 
  StyleSheet, 
  ImageBackground 
} from "react-native";

export default function WelcomeScreen({ navigation }) {

  return (

    <ImageBackground source={require("../assets/background 2.png")} style={styles.background}>

      <View style={styles.overlay}>

        <Image source={require("../assets/logo.png")} style={styles.image} />
        <Text style={styles.title}>IMMEDIAID</Text>
        <Text style={styles.subtitle}>Disaster Strikes. We Respond!</Text>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Login")}>
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>

      </View>
      
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
      },
    
      overlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.25)", 
        padding: 20,
      },
    
      image: {
        width: 250,
        height: 250,
        resizeMode: "contain",
        marginTop: 20,
        marginBottom: 25
      },
    
      title: {
        fontSize: 50,
        fontWeight: "bold",
        color: "#fff",
        textAlign: "center",
        letterSpacing: 8
      },
    
      subtitle: {        
        fontStyle:"italic",
        fontSize: 18,
        color: "#fff",
        textAlign: "center",
        marginTop: 200,
        marginBottom: 30,
        letterSpacing: 11
      },
    
      button: {
        backgroundColor: "#002533",
        padding: 15,
        borderRadius: 20,
        width: "80%",
        alignItems: "center",
      },
    
      buttonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
        letterSpacing: 2
      },
    });
