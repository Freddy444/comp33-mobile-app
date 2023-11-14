import React, { useState } from "react";
import { View, TextInput, Text, TouchableOpacity, StyleSheet } from "react-native";
import axios from "axios";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Alert } from "react-native";

// Login Page Component
export default function LoginPage({ navigation }) {
  // State variables for username and password
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Navigate to the Register page
  const onRegisterClick = () => {
    navigation.navigate("Register");
  };

  // Handle login button click
  const onLogin = () => {
    axios
      .post(
        "http://192.168.1.190/index.php/user/login",
        {
          username: username,
          password: password,
        },
        { withCredentials: true }
      )
      .then((response) => {
        if (response.data.success) {
          // Successful login, set the user and navigate to Home
          console.log(response.data);
          setUsername(response.data.username);
          navigation.replace("Home", { username: response.data.username });
        } else {
          // Display alert for incorrect username or password
          Alert.alert("Login Failed", "Incorrect Username or Password", [
            { text: "OK", onPress: () => console.log("OK Pressed") },
          ]);
        }
      })
      .catch((error) => {
        // Handle login error, display an error message, etc.
        Alert.alert("Login Failed", error, [
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ]);
      });
  };

  // JSX for the component's UI
  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.container}
      resetScrollToCoords={{ x: 0, y: 0 }}
      scrollEnabled={false}
    >
      <View style={styles.formContainer}>
        {/* Heading */}
        <Text style={styles.heading}>Login Page</Text>
        {/* Username input */}
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Username"
            onChangeText={(text) => setUsername(text)}
            value={username}
            style={[styles.textField, styles.input]}
          />
        </View>
        {/* Password input */}
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Password"
            onChangeText={(text) => setPassword(text)}
            value={password}
            secureTextEntry
            style={[styles.textField, styles.input]}
          />
        </View>
        {/* Button container for Submit and Register buttons */}
        <View style={styles.buttonContainer}>
          {/* Submit button */}
          <TouchableOpacity style={styles.button} onPress={onLogin}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
          {/* Register button */}
          <TouchableOpacity style={styles.button} onPress={onRegisterClick}>
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}

// Styles for the component
const styles = StyleSheet.create({
  // Styling for the main container
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  // Styling for the form container
  formContainer: {
    width: "80%",
    alignItems: "center",
  },
  // Styling for the heading text
  heading: {
    fontSize: 24,
    marginBottom: 24,
    color: "#333333",
    fontWeight: "bold",
  },
  // Styling for the input container
  inputContainer: {
    width: "100%",
    marginBottom: 16,
  },
  // Styling for the text input fields
  textField: {
    height: 50,
    borderColor: "#cccccc",
    borderWidth: 1,
    paddingHorizontal: 20,
    fontSize: 16,
    color: "#333333",
    borderRadius: 8,
    backgroundColor: "#ffffff",
  },
  // Styling for the button container
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  // Styling for the buttons
  button: {
    width: "48%",
    backgroundColor: "#ff3366",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  // Styling for the button text
  buttonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },
  // Styling for the input fields
  input: {
    backgroundColor: "#ffffff",
  },
});
