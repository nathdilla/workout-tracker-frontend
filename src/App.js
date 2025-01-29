import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./routes/Login";
import Workouts from "./routes/Workouts";

const App = () => {
    const [token, setToken] = useState(localStorage.getItem("token"));

    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login setToken={setToken} />} />
                <Route path="/workouts" element={token ? <Workouts token={token} /> : <Navigate to="/login" />} />
                <Route path="*" element={<Navigate to={token ? "/workouts" : "/login"} />} />
            </Routes>
        </Router>
    );
};

export default App;