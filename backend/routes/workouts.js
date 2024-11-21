// Import the Express package
const express = require("express");
const {
  createWorkout,
  getWorkouts,
  getWorkout,
  deleteWorkout,
  updateWorkout,
} = require("../controllers/workoutController");

// Create a router object for handling routes
const router = express.Router();

// GET all workouts
router.get("/", getWorkouts);

// GET a single workout by ID
router.get("/:id", getWorkout);

// POST a new workout
router.post("/", createWorkout);

// DELETE a workout by ID
router.delete("/:id", deleteWorkout);

// UPDATE a workout by ID
router.patch("/:id", updateWorkout);

// Export the router to be used in other parts of the application
module.exports = router;
