import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity } from "react-native";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { TextInput } from "react-native";

// StarRating component for displaying the rating
const StarRating = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating - fullStars >= 0.5;

  // Generate an array of star icons based on the rating
  const stars = Array.from({ length: 5 }, (_, index) => (
    <AntDesign
      key={index}
      name={index < fullStars || (index === fullStars && halfStar) ? "star" : "staro"}
      size={18}
      color="#FFD700"
    />
  ));

  return <View style={styles.starRating}>{stars}</View>;
};

export default function HomeView({ route }) {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { username } = route.params || {};
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [sortOrder, setSortOrder] = useState("desc");
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch the song list when the component is focused
  useEffect(() => {
    isFocused && query();
  }, [isFocused]);

  // Function to fetch the song list from the backend
  const query = () => {
    fetch("http://192.168.1.190/index.php/music/list")
      .then((response) => response.json())
      .then((data) => {
        // Filter songs based on the search term
        const filteredSongs = data.filter(
          (song) =>
            song.song.toLowerCase().includes(searchTerm.toLowerCase()) ||
            song.artist.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (parseInt(searchTerm) > 0 && Math.floor(parseFloat(song.rating)) === parseInt(searchTerm))
        );
  
        // Sort the filtered songs based on the rating and set the state
        const sortedSongs = sortSongs(filteredSongs);
        setSongs(sortedSongs);
      })
      .catch((error) => {
        console.error("Error fetching song list:", error);
        setError("Failed to fetch songs");
      })
      .finally(() => {
        setLoading(false);
      });
  };
  

  // Function to handle updating a song
  const handleUpdate = (songId, song, artist, rating) => {
    navigation.navigate("Update", { songId, song, artist, rating, username });
  };

  // Function to handle deleting a song
  const handleDelete = (songId) => {
    navigation.navigate("Delete", { songId, username });
  };

  // Function to handle reading the details of a song
  const handleRead = (songId, song, artist, rating) => {
    navigation.navigate("Read", { songId, song, artist, rating, username });
  };

  // Function to navigate to the create song screen
  const handleCreate = () => {
    navigation.navigate("Create", { username });
  };

  // Function to handle user logout
  const handleLogout = () => {
    navigation.navigate("Login");
  };

  // Function to toggle the sort order and fetch the updated song list
  const toggleSortOrder = () => {
    setSortOrder((prevSortOrder) => (prevSortOrder === "asc" ? "desc" : "asc"));
    query();
  };

  // Function to sort songs based on the rating and sort order
  const sortSongs = (songs) => {
    return songs.slice().sort((a, b) => {
      const starsA = Math.floor(parseFloat(a.rating));
      const starsB = Math.floor(parseFloat(b.rating));
      return sortOrder === "asc" ? starsA - starsB : starsB - starsA;
    });
  };

  // Function to handle the search and fetch the updated song list
  const handleSearch = () => {
    query();
  };

  // JSX for the component's UI
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome, {username}!</Text>
      {/* Search input for filtering songs */}
      <TextInput
        style={styles.searchInput}
        placeholder="Search songs or artists"
        placeholderTextColor="#ccc"
        value={searchTerm}
        onChangeText={(text) => setSearchTerm(text)}
        onSubmitEditing={handleSearch}
        selectionColor="#fff" 
      />
      {/* Button to toggle the sort order */}
      <TouchableOpacity style={styles.sortButton} onPress={toggleSortOrder}>
        <Text style={styles.sortButtonText}>
          Sort by Rating ({sortOrder === "asc" ? "High to Low" : "Low to High"})
        </Text>
      </TouchableOpacity>

      {/* Loading indicator */}
      {loading ? (
        <ActivityIndicator size="large" color="#FF4081" />
      ) : error ? (
        // Display error message if fetching songs fails
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        // Display the list of songs
        <FlatList
          data={songs}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.songItem}>
              {/* Song title */}
              <Text style={styles.songTitle}>{item.song}</Text>
              {/* Artist details */}
              <Text style={styles.songDetails}>{`by ${item.artist}`}</Text>

              {/* Star Rating Component */}
              <Text style={styles.songDetails}>Rating: <StarRating rating={item.rating} /></Text>

              {/* Edit and Delete buttons for user's own songs */}
              {item.username === username && (
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={styles.iconButton}
                    onPress={() => handleUpdate(item.id, item.song, item.artist, item.rating)}
                  >
                    <Text style={styles.buttonText}>Edit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.iconButton}
                    onPress={() => handleDelete(item.id)}
                  >
                    <Text style={styles.buttonText}>Delete</Text>
                  </TouchableOpacity>
                </View>
              )}

              {/* View details button for all songs */}
              <TouchableOpacity
                style={styles.viewButton}
                onPress={() => handleRead(item.id, item.song, item.artist, item.rating)}
              >
                <Text style={styles.viewButtonText}>View Details</Text>
                <AntDesign name="right" size={18} color="#fff" />
              </TouchableOpacity>
            </View>
          )}
        />
      )}

      {/* Button to navigate to the create song screen */}
      <TouchableOpacity style={styles.createButton} onPress={handleCreate}>
        <Text style={styles.createButtonText}>Create a New Song</Text>
      </TouchableOpacity>
      {/* Button to logout */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

// Styles for the component
const styles = StyleSheet.create({
  // Styling for the main container
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#000",
  },
  // Styling for the header text
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
    color: "#fff",
  },
  // Styling for the star rating component
  starRating: {
    flexDirection: "row",
  },
  // Styling for each song item in the list
  songItem: {
    backgroundColor: "#121212",
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#333333",
    position: "relative",
  },
  // Styling for the song title text
  songTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#fff",
  },
  // Styling for the artist details text
  songDetails: {
    color: "#aaa",
  },
  // Styling for the button container (Edit and Delete buttons)
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  // Styling for the icon buttons (Edit and Delete)
  iconButton: {
    width: "48%",
    padding: 8,
    backgroundColor: "#FF4081",
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  // Styling for the button text inside icon buttons
  buttonText: {
    color: "#fff",
    marginLeft: 8,
  },
  // Styling for the View Details button
  viewButton: {
    marginTop: 8,
    padding: 8,
    backgroundColor: "#FF4081",
    borderRadius: 4,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  // Styling for the text inside the View Details button
  viewButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  // Styling for the logout button
  logoutButton: {
    marginTop: 16,
    padding: 12,
    backgroundColor: "#D32F2F",
    borderRadius: 4,
    alignItems: "center",
  },
  // Styling for the text inside the logout button
  logoutButtonText: {
    color: "#fff",
  },
  // Styling for the error text
  errorText: {
    fontSize: 18,
    color: "#D32F2F",
    textAlign: "center",
  },
  // Styling for the create button
  createButton: {
    marginTop: 16,
    padding: 12,
    backgroundColor: "#FF4081",
    borderRadius: 4,
    alignItems: "center",
  },
  // Styling for the text inside the create button
  createButtonText: {
    color: "#fff",
  },
  // Styling for the sort button
  sortButton: {
    marginTop: 8,
    padding: 8,
    backgroundColor: "#4E6FFF",
    borderRadius: 4,
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  // Styling for the text inside the sort button
  sortButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  // Styling for the search input
  searchInput: {
    height: 40,
    borderColor: "#fff",
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    marginBottom: 8,
    color: "#ccc",
  },
});
