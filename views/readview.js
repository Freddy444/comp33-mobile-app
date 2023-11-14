import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";

// Cloud component
const Cloud = () => (
  <View style={styles.cloudContainer}>
    {/* Large cloud */}
    <AntDesign name="cloud" size={100} color="#fff" />
    {/* Small cloud */}
    <AntDesign name="cloud" size={20} color="#fff" style={styles.smallCloud} />
    {/* Another large cloud */}
    <AntDesign name="cloud" size={100} color="#fff" style={styles.largeCloud} />
  </View>
);

// Read component
export default function Read({ route, navigation }) {
  const { username, artist, song, rating } = route.params || {};

  // Function to go back to the previous screen
  const goBack = () => {
    navigation.goBack();
  };

  // JSX for the component's UI
  return (
    <View style={styles.container}>
      {/* Header section */}
      <View style={styles.header}>
        <Text style={styles.title}>Now Playing</Text>
        <Text style={styles.songTitle}>{song}</Text>
        <Text style={styles.artist}>by {artist}</Text>
      </View>

      {/* Cloud component */}
      <Cloud />

      {/* Rating section */}
      <View style={styles.ratingContainer}>
        <Text style={styles.ratingTitle}>Your Rating:</Text>
        {/* Star icons based on the rating */}
        <View style={styles.star}>
          {Array.from({ length: rating }, (_, index) => (
            <AntDesign key={index} name="star" size={24} color="#FFD700" />
          ))}
        </View>
      </View>

      {/* User information section */}
      <View style={styles.userContainer}>
        <Text style={styles.userTitle}>Listener:</Text>
        <Text style={styles.info}>{username}</Text>
      </View>

      {/* Go Back Button */}
      <TouchableOpacity onPress={goBack} style={styles.goBackButton}>
        {/* Left arrow icon */}
        <AntDesign name="arrowleft" size={24} color="#FF4081" />
        {/* Text for the button */}
        <Text style={styles.goBackText}>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
}

// Styles for the component
const styles = StyleSheet.create({
  // Styling for the main container
  container: {
    flex: 1,
    backgroundColor: "#000",
    padding: 16,
  },
  // Styling for the header section
  header: {
    marginBottom: 20,
  },
  // Styling for the title text
  title: {
    fontSize: 28,
    color: "#FF4081",
    fontWeight: "bold",
    marginBottom: 5,
  },
  // Styling for the song title text
  songTitle: {
    fontSize: 20,
    color: "#fff",
    marginBottom: 5,
  },
  // Styling for the artist text
  artist: {
    fontSize: 16,
    color: "#777",
  },
  // Styling for the rating section
  ratingContainer: {
    marginBottom: 20,
  },
  // Styling for the rating title text
  ratingTitle: {
    fontSize: 18,
    color: "#FF4081",
    fontWeight: "bold",
    marginBottom: 5,
  },
  // Styling for the star icons
  star: {
    flexDirection: "row",
    marginTop: 5,
  },
  // Styling for the user information section
  userContainer: {},
  // Styling for the user title text
  userTitle: {
    fontSize: 18,
    color: "#FF4081",
    fontWeight: "bold",
    marginBottom: 5,
  },
  // Styling for the user information text
  info: {
    fontSize: 16,
    color: "#fff",
  },
  // Cloud styles
  cloudContainer: {
    position: "absolute",
    bottom: 10,
    right: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  // Styling for the small cloud
  smallCloud: {
    marginLeft: 20,
  },
  // Styling for the large cloud
  largeCloud: {
    marginLeft: 40,
  },
  // Go Back Button styles
  goBackButton: {
    position: "absolute",
    bottom: 150, // Adjusted position
    left: 160,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FF4081",
    padding: 15, // Adjusted padding
    borderRadius: 5,
  },
  // Styling for the Go Back Button text
  goBackText: {
    marginLeft: -25,
    color: "#fff",
    fontSize: 16,
  },
});
