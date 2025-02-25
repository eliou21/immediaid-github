import React, { useState, useCallback } from "react";
import { 
  View, 
  Text, 
  FlatList, 
  StyleSheet, 
  ImageBackground, 
  Image 
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

export default function AdminDashboard() {
  const [newsList, setNewsList] = useState([]);

  useFocusEffect(
    useCallback(() => {
      loadNews();
    }, [])
  );

  const loadNews = async () => {
    try {
      const storedNews = await AsyncStorage.getItem("news");
      if (storedNews) {
        setNewsList(JSON.parse(storedNews));
      }
    } catch (error) {
      console.error("Error loading news:", error);
    }
  };

  return (

    <ImageBackground source={require("../assets/background 1.png")} style={styles.background}>

      {/* Banner at the Top */}
      <View style={styles.banner}>
        <Image source={require("../assets/logo.png")} style={styles.logo} />
        <Text style={styles.appName}>IMMEDIAID</Text>
      </View>

      <View style={styles.container}>
        {newsList.length === 0 ? (
          <Text style={styles.noNews}>No News Available</Text>
        ) : (
          <FlatList
            data={newsList}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => {
              const hasImage = item.image && item.image !== "https://via.placeholder.com/150";

              return (
                <View style={styles.newsItem}>
                  <View style={styles.newsContent}>
                    {hasImage && (
                      <Image
                        source={{ uri: item.image }}
                        style={styles.newsImage}
                      />
                    )}
                    <Text style={styles.newsTitle}>{item.title}</Text>
                    <Text style={styles.newsText}>{item.content}</Text>                    
                  </View>
                </View>
              );
            }}
          />
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
    backgroundColor: "rgba(28, 28, 28, 0.9)"
  },

  banner: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#5691A4", 
    padding: 10,
    justifyContent: "left",
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

  container: { 
    flex: 1, 
    padding: 20,
  },

  noNews: { 
    textAlign: "center", 
    fontSize: 13, 
    color: "#fff", 
    marginTop: 20,
    letterSpacing: 2
  },

  newsItem: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    alignItems: "center"
  },

  newsContent: { 
    flex: 1, 
    alignItems: "center"
  },

  newsTitle: { 
    fontSize: 18, 
    fontWeight: "bold",
    marginBottom: 5,
    color: "rgba(50, 50, 50, 0.99)"
  },

  newsImage: {
    width: 340, 
    height: 180,
    marginBottom: 15,
    borderRadius: 5,
    resizeMode: "cover"
  },  

  newsText: {
    fontSize: 14,
    color: "rgba(84, 84, 84, 0.99)",
    textAlign: "center",
    marginVertical: 5
  },
});
