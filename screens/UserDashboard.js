import React, { useState, useCallback } from "react";
import { 
  View, 
  Text, 
  FlatList, 
  StyleSheet, 
  ImageBackground, 
  Image,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";

export default function UserDashboard() {
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(false);

  useFocusEffect(
    useCallback(() => {
      loadNews();
    }, [])
  );

  const loadNews = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://172.20.10.4:5000/api/news");
      setNewsList(response.data || []);
    } catch (error) {
      console.error("❌ Error loading news from backend:", error.message);
      Alert.alert("Error", "Could not load news. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const renderNewsItem = ({ item }) => {
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
  };

  return (
    <ImageBackground
      source={require("../assets/background 1.png")}
      style={styles.background}
    >
      {/* Banner */}
      <View style={styles.banner}>
        <Image source={require("../assets/logo.png")} style={styles.logo} />
        <Text style={styles.appName}>IMMEDIAID</Text>
      </View>

      <View style={styles.container}>
        {loading ? (
          <ActivityIndicator size="large" color="#fff" style={{ marginTop: 20 }} />
        ) : newsList.length === 0 ? (
          <Text style={styles.noNews}>No News Available</Text>
        ) : (
          <FlatList
            data={newsList}
            keyExtractor={(item) => item._id}
            renderItem={renderNewsItem}
            contentContainerStyle={{ paddingBottom: 50 }}
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
    flex: 1,
    padding: 20,
  },
  noNews: {
    textAlign: "center",
    fontSize: 14,
    color: "#fff",
    marginTop: 20,
    letterSpacing: 1,
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
    alignItems: "center",
  },
  newsContent: {
    flex: 1,
    alignItems: "center",
  },
  newsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    color: "rgba(50, 50, 50, 0.99)",
  },
  newsImage: {
    width: 340,
    height: 180,
    marginBottom: 15,
    borderRadius: 5,
    resizeMode: "cover",
  },
  newsText: {
    fontSize: 14,
    color: "rgba(84, 84, 84, 0.99)",
    textAlign: "center",
    marginVertical: 5,
  },
});
