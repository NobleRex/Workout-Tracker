// Load environment variables from a .env file into process.env
require("dotenv").config();

// Import the Express package
const express = require("express");

const mongoose = require("mongoose");

// Create an Express application
const app = express();

// Import workout routes from the workouts.js file
const workoutRoutes = require("./routes/workouts");

// Middleware to parse JSON bodies in incoming requests
app.use(express.json());

// Custom middleware to log the request path and method
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next(); // Pass control to the next middleware function
});

// Routes to handle workout-related requests
app.use("/api/workouts/", workoutRoutes);

// Connect to the MongoDB database using the connection string from the environment variables
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // If the connection is successful, start the server and listen on the port specified in the environment variables
    app.listen(process.env.PORT, () => {
      console.log(
        "Connected to DB and Listening on port 4000",
        process.env.PORT
      );
    });
  })
  .catch((error) => {
    // If there is an error during the connection, log the error to the console
    console.log(error);
  });
