import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useRoute } from "@react-navigation/native";

export default function DeleteView({ navigation }) {
  // Retrieve route hook
  const route = useRoute();

  // State to manage the confirmation modal visibility
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Function to handle the deletion of a song
  const handleDelete = async () => {
    try {
      // Retrieve the songId from route parameters or use an empty string
      const { songId } = route.params || {};

      // Check if songId is missing in route parameters
      if (!songId) {
        console.error("SongId is missing in route params");
        return;
      }

      // Send a POST request to delete the song
      const response = await fetch("http://192.168.1.190/index.php/music/delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: songId,
        }),
      });

      // Parse the response data
      const data = await response.json();

      // Check if the deletion was successful
      if (data.success) {
        // Navigate back to the Home screen with the username
        navigation.navigate("Home", { username: route.params?.username });
      } else {
        // Log and show an error if deletion fails
        console.error("Deletion failed:", data.error);
      }
    } catch (error) {
      // Log and show an alert if an error occurs during song deletion
      console.error("Error deleting song:", error);
      Alert.alert("Deletion Failed", "Something went wrong. Please try again later.");
    }
  };

  // Function to handle the cancellation of the deletion
  const handleCancelDelete = () => {
    setShowConfirmation(false);
    // Navigate back to the Home screen with the username
    navigation.navigate("Home", { username: route.params?.username });
  };

  // JSX for the component's UI
  return (
    <View style={styles.container}>
        <Text style={styles.header}>Delete Song?</Text>

      {/* Button to confirm the deletion */}
      <TouchableOpacity style={styles.button} onPress={handleDelete}>
        <Text style={styles.buttonText}>Delete</Text>
      </TouchableOpacity>

      {/* Button to cancel the deletion */}
      <TouchableOpacity style={styles.button} onPress={handleCancelDelete}>
        <Text style={styles.buttonText}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
}

// Styles for the component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    fontSize: 32,
    color: "#FF4081",
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#FF4081",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
});
