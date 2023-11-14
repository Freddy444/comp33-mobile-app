import React, { useState } from "react";
import { View, TextInput, Text, TouchableOpacity, StyleSheet } from "react-native";
import axios from "axios";

// RegisterView component
const RegisterView = ({ navigation }) => {
  // State variables for handling user input and errors
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [user, setUser] = useState();

  // Function to register a new user
  const registerUser = () => {
    console.log("Sending data:", { username, password, confirm_password: confirmPassword });

    // Axios post request to register a new user
    axios
      .post("http://192.168.1.190/index.php/user/register", {
        username: username,
        password: password,
        confirm_password: confirmPassword,
      })
      .then((response) => {
        console.log("Registration response:", response);
        // Check if registration was successful
        if (response.data.success) {
          console.log("Registration successful");
          setUser(response.data.username);
          // Use navigation.navigate instead of navigate in React Native
          navigation.navigate("Home");
        } else {
          console.error(`Registration failed. ${response.data.username}`);
        }
      })
      .catch((error) => {
        console.error("Error registering user:", error);
      });
  };

  // Function to navigate to the login screen
  const navigateToLogin = () => {
    console.log("Navigating to login...");
    // Use navigation.navigate instead of navigate in React Native
    navigation.navigate("Login");
    console.log("Navigation executed!");
  };

  // JSX for the component's UI
  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        {/* Heading for the registration form */}
        <Text style={styles.heading}>Create an Account</Text>
        
        {/* Input field for username */}
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Username"
            onChangeText={(text) => setUsername(text)}
            value={username}
            style={[styles.textField, usernameError && styles.error]}
          />
        </View>

        {/* Input field for password */}
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Password"
            onChangeText={(text) => setPassword(text)}
            value={password}
            secureTextEntry
            style={[styles.textField, passwordError && styles.error]}
          />
        </View>

        {/* Input field for confirming password */}
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Confirm Password"
            onChangeText={(text) => setConfirmPassword(text)}
            value={confirmPassword}
            secureTextEntry
            style={[styles.textField, confirmPasswordError && styles.error]}
          />
        </View>

        {/* Button to trigger user registration */}
        <TouchableOpacity style={styles.button} onPress={registerUser}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

        {/* Link to navigate to the login screen */}
        <TouchableOpacity style={styles.link} onPress={navigateToLogin}>
          <Text style={styles.linkText}>
            Already have an account? <Text style={styles.loginLink}>Login here</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

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
    paddingHorizontal: 16,
    fontSize: 16,
    color: "#333333",
    borderRadius: 8,
  },
  // Styling for the registration button
  button: {
    backgroundColor: "#ff3366",
    padding: 14,
    borderRadius: 8,
    marginBottom: 16,
    alignItems: "center",
  },
  // Styling for the button text
  buttonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },
  // Styling for the link container
  link: {
    alignSelf: "center",
  },
  // Styling for the link text
  linkText: {
    color: "black", // Blue color
    fontSize: 16,
  },
  // Styling for the login link text
  loginLink: {
    color: "#007bff", // Blue color
    fontWeight: "bold", // Optional: Add this line if you want to make it bold
  },
  // Styling for highlighting input errors
  error: {
    borderColor: "#ff3366",
  },
});

export default RegisterView;
