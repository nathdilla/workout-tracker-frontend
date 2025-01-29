import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Workouts = ({ token }) => {
    const [workouts, setWorkouts] = useState([]);
    const navigate = useNavigate();
    const userId = localStorage.getItem("userId");

    const fetchWorkouts = async () => {
        try {
            console.log("userId", userId);
            console.log("token", token);
            const res = await axios.get(`http://localhost:3005/api/workouts/${userId}`, {
                headers: { Authorization: token },
            });
            setWorkouts(res.data);
        } catch (err) {
            console.error("Error fetching workouts", err);
        }
    };

    useEffect(() => {
        fetchWorkouts();
    }, [token, userId]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        navigate("/login");
    };

    const handleRefreshWorkouts = () => {
        fetchWorkouts();
    }

    return (
        <div>
            <h2>Your Workouts</h2>
            <button onClick={handleLogout}>Logout</button>
            <button onClick={handleRefreshWorkouts}>Refresh</button>
            {workouts.length === 0 ? <p>No workouts found.</p> : (
                <ul>
                    {workouts.map((workout) => (
                        <li key={workout._id}>
                            <strong>Date:</strong> {new Date(workout.date).toLocaleDateString()}<br />
                            <strong>Exercises:</strong>
                            <ul>
                                {workout.exercises.map((ex, index) => (
                                    <li key={index}>
                                        {ex.name} - {ex.sets} sets x {ex.reps} reps {ex.weight ? `(${ex.weight} kg)` : ""}
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Workouts;