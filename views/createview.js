import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from "@react-navigation/native";

const CreateView = () => {
  // Retrieve route and navigation hooks
  const route = useRoute();
  const navigation = useNavigation();

  // State to manage the new song data and the current username
  const [newSong, setNewSong] = useState({
    artist: '',
    song: '',
    rating: '',
  });

  // Function to handle the creation of a new song
  const handleCreateSong = async () => {
    try {
      // Retrieve the username from route parameters or use an empty string
      const { username } = route.params || {};

      // Send a POST request to create a new song
      const response = await axios.post('http://192.168.1.190/index.php/music/create', newSong, {
        withCredentials: true,
      });

      // Check if the song creation was successful
      if (response.data.success) {
        Alert.alert('Song created successfully');
        // Navigate back to the Home screen with the username
        navigation.navigate('Home', { username });
      } else {
        // Show an alert with the error message if song creation fails
        Alert.alert('Error creating song', response.data.error);
      }
    } catch (error) {
      // Log and show an alert if an error occurs during song creation
      console.error('Error creating song:', error);
      Alert.alert('Error creating song', 'An error occurred while creating the song.');
    }
  };

  // Function to navigate back to the Home screen with the username
  const handleGoBackHome = () => {
    const { username } = route.params || {};
    navigation.navigate('Home', { username });
  };

  // JSX for the component's UI
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Create a New Song</Text>

      {/* Input field for the artist */}
      <TextInput
        style={styles.input}
        placeholder="Artist"
        value={newSong.artist}
        onChangeText={(text) => setNewSong({ ...newSong, artist: text })}
      />

      {/* Input field for the song */}
      <TextInput
        style={styles.input}
        placeholder="Song"
        value={newSong.song}
        onChangeText={(text) => setNewSong({ ...newSong, song: text })}
      />

      {/* Input field for the rating */}
      <TextInput
        style={styles.input}
        placeholder="Rating"
        value={newSong.rating}
        onChangeText={(text) => setNewSong({ ...newSong, rating: text })}
      />

      {/* Button to create a new song */}
      <TouchableOpacity style={styles.button} onPress={handleCreateSong}>
        <Text style={styles.buttonText}>Create Song</Text>
      </TouchableOpacity>

      {/* Button to cancel and go back to the Home screen */}
      <TouchableOpacity style={styles.buttonc} onPress={handleGoBackHome}>
        <Text style={styles.buttonText}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
};

// Styles for the component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 32,
    color: '#FF4081',
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: 'bold', // Added fontWeight for emphasis
    textTransform: 'uppercase', // Convert text to uppercase for a stylized look
    letterSpacing: 1, // Added letter spacing for a bit of spacing between characters
  },
  input: {
    height: 40,
    borderColor: '#333',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    padding: 10,
    color: '#333', // Text color
    backgroundColor: '#fff', // Background color changed to white
  },
  button: {
    backgroundColor: '#FF4081',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonc: {
    backgroundColor: '#FF4081',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

// Export the component as the default export
export default CreateView;
