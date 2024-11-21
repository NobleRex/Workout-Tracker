// Import the Workout model and Mongoose for database operations
const Workout = require("../models/WorkoutModel");
const mongoose = require("mongoose");

// Controller to get all workouts
const getWorkouts = async (req, res) => {
  // Retrieve all workouts, sorted by creation date in descending order
  const workouts = await Workout.find({}).sort({ createdAt: -1 });

  // Send the workouts as a JSON response with status 200 (OK)
  res.status(200).json(workouts);
};

// Controller to get a single workout by ID
const getWorkout = async (req, res) => {
  const { id } = req.params; // Get workout ID from the request parameters

  // Check if the ID is a valid MongoDB ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such workout" });
  }

  // Find the workout by ID
  const workout = await Workout.findById(id);

  // If workout not found, return 404 error
  if (!workout) {
    return res.status(404).json({ error: "No such workout" });
  }

  // If found, send the workout as a JSON response with status 200 (OK)
  res.status(200).json(workout);
};

// Controller to create a new workout
const createWorkout = async (req, res) => {
  const { title, load, reps } = req.body; // Get title, load, and reps from the request body

  let emptyFields = [];
  if (!title) {
    emptyFields.push("title");
  }
  if (!load) {
    emptyFields.push("load");
  }
  if (!reps) {
    emptyFields.push("reps");
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all the empty fields", emptyFields });
  }
  // Try to add the workout to the database
  try {
    const workout = await Workout.create({ title, load, reps });
    res.status(200).json(workout); // Return the created workout with status 200
  } catch (error) {
    // If error occurs, respond with status 400 and the error message
    res.status(400).json({ error: error.message });
  }
};

// Controller to delete a workout by ID
const deleteWorkout = async (req, res) => {
  const { id } = req.params; // Get workout ID from the request parameters

  // Check if the ID is a valid MongoDB ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such workout" });
  }

  // Find and delete the workout by ID
  const workout = await Workout.findOneAndDelete({ _id: id });

  // If workout not found, respond with status 400
  if (!workout) {
    return res.status(400).json({ error: "No such workout" });
  }

  // If deleted, return the deleted workout with status 200 (OK)
  res.status(200).json(workout);
};

// Controller to update a workout by ID
const updateWorkout = async (req, res) => {
  const { id } = req.params; // Get workout ID from the request parameters

  // Check if the ID is a valid MongoDB ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such workout" });
  }

  // Find and update the workout with new data from the request body
  const workout = await Workout.findOneAndUpdate(
    { _id: id },
    {
      ...req.body, // Spread syntax to update only the provided fields
    }
  );

  // If workout not found, respond with status 400
  if (!workout) {
    return res.status(400).json({ error: "No such workout" });
  }

  // If updated, return the updated workout with status 200 (OK)
  res.status(200).json(workout);
};

// Export all controller functions for use in other files
module.exports = {
  createWorkout,
  getWorkouts,
  getWorkout,
  deleteWorkout,
  updateWorkout,
};
