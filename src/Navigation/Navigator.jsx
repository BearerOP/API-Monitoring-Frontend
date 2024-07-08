import React, { useEffect, useState } from 'react';
import { useAuth } from '../Context/AuthContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from '../Screens/Dashboard';
import Login from '../Screens/Login';
import SignUp from '../Screens/SignUp';
import LandingPage from '../Screens/LandingPage';
import PrivateRoute from '../Components/PrivateRoutes';

const Navigator = () => {
  const { auth, login, logout } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem('token');
      if (token && !auth.isAuthenticated) {
        login(token); // Ensure login only if not already authenticated
      } else if (!token && auth.isAuthenticated) {
        logout(); // Ensure logout if token is removed but still authenticated
      }
      setLoading(false);
    };

    checkToken();
  }, [auth.isAuthenticated, login, logout]); // Ensure dependencies are correctly specified

  if (loading) {
    return <p>Loading...</p>; // Optional: Show loading indicator while checking token
  }

  return (
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
      </Routes>
  );
};

export default Navigator;