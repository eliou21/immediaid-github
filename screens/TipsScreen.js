import React, { useState, useEffect } from "react";
import { 
  View, 
  Text, 
  TouchableOpacity, 
  ScrollView, 
  StyleSheet, 
  Image, 
  ImageBackground 
} from "react-native";
import { Checkbox } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function TipsScreen() {
  const [activeTab, setActiveTab] = useState("checklist");
  const [checklist, setChecklist] = useState([]);

  const defaultChecklist = [
    { id: 1, text: "Emergency Food & Water (3 days)", checked: false },
    { id: 2, text: "Cell Phones & Chargers/Power Banks", checked: false },
    { id: 3, text: "First Aid Kit", checked: false },
    { id: 4, text: "Important Documents", checked: false },
    { id: 5, text: "Medicine & Personal Hygiene Items", checked: false },
    { id: 6, text: "Whistle & Flashlight", checked: false },
    { id: 7, text: "Clothes, Blanket, and Rain Gear", checked: false },
    { id: 8, text: "Cash & Coins", checked: false },
    { id: 9, text: "Extra Batteries", checked: false },
    { id: 10, text: "Family Emergency Plan", checked: false },
    { id: 11, text: "Portable Radio", checked: false },
  ];

  useEffect(() => {
    const loadChecklist = async () => {
      try {
        const savedChecklist = await AsyncStorage.getItem("checklist");
        if (savedChecklist) {
          const parsedChecklist = JSON.parse(savedChecklist);
          // Reset storage if the checklist structure has changed
          if (parsedChecklist.length !== defaultChecklist.length || 
              !parsedChecklist.every((item, index) => item.text === defaultChecklist[index].text)) {
            await AsyncStorage.setItem("checklist", JSON.stringify(defaultChecklist));
            setChecklist(defaultChecklist);
          } else {
            setChecklist(parsedChecklist);
          }
        } else {
          setChecklist(defaultChecklist);
        }
      } catch (error) {
        console.error("Failed to load checklist:", error);
        setChecklist(defaultChecklist);
      }
    };
    loadChecklist();
  }, []);
  

  useEffect(() => {
    const saveChecklist = async () => {
      try {
        await AsyncStorage.setItem("checklist", JSON.stringify(checklist));
      } catch (error) {
        console.error("Failed to save checklist:", error);
      }
    };
    if (checklist.length > 0) {
      saveChecklist();
    }
  }, [checklist]);

  const toggleCheck = (id) => {
    setChecklist((prevChecklist) =>
      prevChecklist.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  return (
    <ImageBackground source={require("../assets/background 1.png")} style={styles.background}>
      <View style={styles.container}>
        <View style={styles.banner}>
          <Image source={require("../assets/logo.png")} style={styles.logo} />
          <Text style={styles.appName}>IMMEDIAID</Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.tabButton, activeTab === "checklist" && styles.activeButton]}
            onPress={() => setActiveTab("checklist")}
          >
            <Text style={[styles.buttonText, activeTab === "checklist" && styles.activeButtonText]}>Checklist</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tabButton, activeTab === "tips" && styles.activeButton]}
            onPress={() => setActiveTab("tips")}
          >
            <Text style={[styles.buttonText, activeTab === "tips" && styles.activeButtonText]}>Typhoon Tips</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content}>
          {activeTab === "checklist" ? (
            <View style={styles.checklistContainer}>
              <Text style={styles.header}>Evacuation Checklist</Text>
              {checklist.map((item) => (
                <View key={item.id} style={styles.checklistItem}>
                  <Checkbox
                    status={item.checked ? "checked" : "unchecked"}
                    onPress={() => toggleCheck(item.id)}
                    color="#5691A4"
                    uncheckedColor="#013042"
                  />
                  <Text style={styles.listItem}>{item.text}</Text>
                </View>
              ))}
            </View>
          ) : (
            <View>
              <Image source={require("../assets/before.jpg")} style={styles.whatToDo} />
              <Image source={require("../assets/during.jpg")} style={styles.whatToDo} />
              <Image source={require("../assets/after.jpg")} style={styles.whatToDo} />
            </View>
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
    backgroundColor: "rgba(28, 28, 28, 0.9)"
  },

  container: { 
    flex: 1, 
    backgroundColor: "rgba(83, 83, 83, 0.08)"
  },

  banner: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#5691A4", 
    padding: 10,
    marginTop: 40
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
    letterSpacing: 5
  },

  buttonContainer: {
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
    marginBottom: 15
  },

  activeButton: {
    backgroundColor: "#fff",
  },

  activeButtonText: {
    color: "#013042",
  },

  buttonText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#fff",
  },

  content: {
    padding: 20,
  },

  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 10,
    marginLeft: 10,
    color: "#013042",
    letterSpacing: 1
  },

  checklistContainer: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 10
  },

  checklistItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    marginLeft: 10
  },

  listItem: {
    fontSize: 16,
    marginLeft: 10,
    color: "#013042"
  },

  whatToDo: {
    width: 370,
    height: 600,
    marginBottom: 25,
    borderRadius: 15
  }
});
