// Import necessary modules and components
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import LoginView from 'ratingapp/views/loginview.js';
import RegisterView from 'ratingapp/views/registerview.js';
import HomeView from 'ratingapp/views/homeview.js';
import CreateView from 'ratingapp/views/createview.js';
import UpdateView from 'ratingapp/views/updateview.js'; // Import the UpdateView component
import DeleteView from 'ratingapp/views/deleteview.js'; // Import the DeleteView component
import ReadView from 'ratingapp/views/readview.js'; // Import the ReadView component

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginView} />
        <Stack.Screen name="Register" component={RegisterView} />
        <Stack.Screen name="Home" component={HomeView} />
        <Stack.Screen name="Create" component={CreateView} />
        <Stack.Screen name="Update" component={UpdateView} />
        <Stack.Screen name="Delete" component={DeleteView} />
        <Stack.Screen name="Read" component={ReadView} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
