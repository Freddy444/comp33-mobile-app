# COMP333 Assignment 4 - React-Native Frontend

This repository contains the React-Native frontend for Assignment 4 of COMP 333: Software Engineering at Wesleyan University.

## Team Contribution

The contribution for this project is:

- Freddy Fabian: 100%
- Max Oppenheimer: 0%

## Project Overview

Developed a React-Native frontend that integrates with the PHP/MySQL backend from Assignment 3 via a REST API. The app allows users to manage a list of songs, performing CRUD operations. The frontend provides a user-friendly interface for database interaction.

##Working Preview

https://github.com/Freddy444/comp33-mobile-app/assets/99642629/6f1c64e0-ba30-4c6b-97d1-a2def08d54e2


## Setup and Run the Frontend

1. **Clone the Repository:** 
   ```bash
   git clone https://github.com/Freddy444/comp33-mobile-app.git

2. Create expo metro environment
   ```bash
   npx create-expo-app ratingapp

3. **Navigate to the expo metro environment:** 
   ```bash
   cd ratingapp

4. **Add files and replace fies with my files under rating app folder**
   - App.js
   - app.json
   - babel.config.js
   - index.js
   - package.json
   - package-lock.json

5. **Add the navigation folder and views folder into your expo metro environemnt**
   - navigation (files: AppNavigator.js)
   - views (files: createview.js, delteview.js, homeview.js, loginview.js, readview.js, registerview.js, updateview.js)

4. **Install Dependencies:**
   ```bash
   npm install

4. **Run the Backend Development Server:** 
Make sure the [REST Backend](#) is running.

5. **Change IP Address in Requests:**
Update the IP address in requests to match your local machine. (Go to Networks and click on your current wifi and get the ip addressfound there):

- home.js
- update.js
- register.js
- login.js
- delete.js
- create.js

6. **Start the Development Server:**
   ```bash
   npx expo start

7. **Accessing the App**
   - Scan the QR code with the Expo Go app on your phone.

## Feature Implementation

Search functionality (new feature): Allows users to search for anything by songs, artists, and ratings

sorting functionality (prev new feature): Sorts songs from highest to lowest and from lowest to highest


