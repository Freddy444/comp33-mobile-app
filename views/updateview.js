import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";

// Update component
export default function Update({ navigation }) {
  const route = useRoute();

  // State variables for storing input values
  const [username, setUsername] = useState(route.params?.username);
  const [artist, setArtist] = useState(route.params?.artist);
  const [song, setSong] = useState(route.params?.song);
  const [rating, setRating] = useState(route.params?.rating);

  // Update state when route params change
  useEffect(() => {
    setUsername(route.params?.username);
  }, [route.params?.username]);

  useEffect(() => {
    setArtist(route.params?.artist);
  }, [route.params?.artist]);

  useEffect(() => {
    setSong(route.params?.song);
  }, [route.params?.song]);

  useEffect(() => {
    setRating(route.params?.rating);
  }, [route.params?.rating]);

  // Function to handle the update of the song
  const handleUpdate = async () => {
    const { songId } = route.params;

    // Validate rating: must be between 1 and 5
    const isValidRating = /^[1-5]$/.test(rating);

    if (!isValidRating) {
      // Display an error message or take appropriate action for an invalid rating
      console.error("Invalid rating. Please enter a number between 1 and 5.");
      return;
    }

    try {
      const { songId, username } = route.params || {};
      if (!songId) {
        console.error("SongId is missing in route params");
        return;
      }

      // Send updated song details to the server
      const response = await fetch("http://192.168.1.190/index.php/music/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: songId,
          artist,
          song,
          rating: parseInt(rating), // Convert rating back to integer
        }),
      });

      const data = await response.json();

      // Check the response and handle accordingly
      if (data.success) {
        // Song updated successfully
        // Navigate to the "Main" screen
        navigation.navigate("Home", { username: username });
      } else {
        // Update failed, handle error
        console.error("Update failed:", data.error);
        // You may want to show an error message to the user
      }
    } catch (error) {
      console.error("Error updating song:", error);
      // Handle error gracefully
      Alert.alert("Update Failed", "Something went wrong. Please try again later.");
    }
  };

  // Function to handle cancellation of the update
  const handleCancelUpdate = () => {
    // Navigate back to the "Main" screen
    navigation.navigate("Home", { username });
  };

  // JSX for the component's UI
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Update Song</Text>
      <Text style={styles.label}>Title:</Text>
      <TextInput
        style={styles.input}
        value={song}
        onChangeText={(text) => setSong(text)}
        placeholder={song} // Prefill old title as placeholder
      />
      <Text style={styles.label}>Artist:</Text>
      <TextInput
        style={styles.input}
        value={artist}
        onChangeText={(text) => setArtist(text)}
        placeholder={artist} // Prefill old artist as placeholder
      />
      <Text style={styles.label}>Rating:</Text>
      <TextInput
        style={styles.input}
        value={String(rating)} // Convert rating to string
        onChangeText={(text) => setRating(text)}
        keyboardType="numeric" // Set keyboard type to numeric for rating
        placeholder={String(rating)} // Prefill old rating as placeholder
      />
      <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
        <Text style={styles.buttonText}>Update Song</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.cancelButton} onPress={handleCancelUpdate}>
        <Text style={styles.buttonText}>Cancel Update</Text>
      </TouchableOpacity>
    </View>
  );
}

// Styles for the component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 16,
  },
  header: {
    fontSize: 32,
    color: '#FF4081',
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  label: {
    fontSize: 20,
    marginBottom: 8,
    color: '#fff', // White color for labels
  },
  input: {
    height: 40,
    borderColor: '#fff', // White border color
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
    color: '#000', // Black text color
    backgroundColor: '#fff', // White background color
    borderRadius: 8,
  },
  updateButton: {
    backgroundColor: '#FF4081',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  cancelButton: {
    backgroundColor: '#D32F2F',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});
