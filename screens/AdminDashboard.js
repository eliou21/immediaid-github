import React, { useState, useCallback, useEffect } from "react";
import { 
  View, 
  Text, 
  FlatList, 
  StyleSheet, 
  TouchableOpacity, 
  Alert, 
  ImageBackground, 
  Image 
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import * as Permissions from "expo-permissions"; 

export default function AdminDashboard() {
  const [newsList, setNewsList] = useState([]);

  const requestPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
    if (status !== "granted") {
      alert("Permission required to access images!");
    }
  };

  useEffect(() => {
    requestPermission();
  }, []);

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

  const deleteNews = async (index) => {
    Alert.alert("Delete News", "Are you sure you want to delete this post?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        onPress: async () => {
          try {
            const updatedNews = newsList.filter((_, i) => i !== index);
            setNewsList(updatedNews);
            await AsyncStorage.setItem("news", JSON.stringify(updatedNews));
          } catch (error) {
            console.error("Error deleting news:", error);
          }
        },
        style: "destructive",
      },
    ]);
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

                  <TouchableOpacity style={styles.deleteButton} onPress={() => deleteNews(index)}>
                    <Text style={styles.deleteText}>Delete Post</Text>
                  </TouchableOpacity>
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

  deleteButton: {
    backgroundColor: "rgba(136, 29, 29, 0.99)",
    padding: 8,
    borderRadius: 15,
    marginTop: 10,
    width: 90,
    height: 30,
    alignItems: "center"
  },

  deleteText: {
    color: "white",
    fontWeight: "400",
    fontSize: 11,
    letterSpacing: 1 
  },
});
