import { useEffect } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
// Components for workout display and form input
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";

// Main home component for listing workouts and adding new ones
const Home = () => {
  const { workouts, dispatch } = useWorkoutsContext();
  // Fetch workouts on component mount using useEffect
  useEffect(() => {
    const fetchWorkouts = async () => {
      // GET request to server for workouts
      const response = await fetch("/api/workouts");
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_WORKOUTS", payload: json });
      }
    };
    fetchWorkouts();
  }, [dispatch]); // Empty dependency array to run only on initial render

  return (
    <div className="Home">
      {/* Display fetched workouts */}
      <div className="workouts">
        {workouts &&
          workouts.map((workout) => (
            <WorkoutDetails key={workout._id} workout={workout} />
          ))}
      </div>
      <WorkoutForm /> {/* Form to add a new workout */}
    </div>
  );
};

export default Home;
