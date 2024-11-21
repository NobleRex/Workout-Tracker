import { useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

// Component to create a workout submission form
const WorkoutForm = () => {
  const { dispatch } = useWorkoutsContext();
  // State for form fields: title, load, reps
  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");
  // State for error handling
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  // Handles form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents default page reload on form submit

    const workout = { title, load, reps }; // Object to send to server

    // Send POST request to backend to save workout
    const response = await fetch("/api/workouts", {
      method: "POST",
      body: JSON.stringify(workout),
      headers: {
        "Content-Type": "application/json", // Ensure JSON format
      },
    });
    const json = await response.json(); // Parse server response

    if (response.ok) {
      // Clear form on successful submission
      setTitle("");
      setLoad("");
      setReps("");
      setError(null);
      setEmptyFields([]);
      console.log("New workout added:", json); // Log added workout details
      dispatch({ type: "CREATE_WORKOUT", payload: json }); // Dispatch action to update state
    }
    if (!response.ok) {
      setError(json.error); // Display error if request fails
      setEmptyFields(json.emptyFields);
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a new workout</h3>
      <label>Exercise Title:</label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)} // Update title state
        value={title}
        className={emptyFields.includes("title") ? "error" : ""}
      />
      <label>Load (in kg):</label>
      <input
        type="number"
        onChange={(e) => setLoad(e.target.value)} // Update load state
        value={load}
        className={emptyFields.includes("load") ? "error" : ""}
      />
      <label>Reps:</label>
      <input
        type="number"
        onChange={(e) => setReps(e.target.value)} // Update reps state
        value={reps}
        className={emptyFields.includes("reps") ? "error" : ""}
      />
      <button>Add Workout</button>
      {error && <div className="error">{error}</div>}{" "}
      {/* Display error message if any */}
    </form>
  );
};

export default WorkoutForm;
