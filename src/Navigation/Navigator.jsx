import React, { Children, useEffect, useState } from 'react';
import { useAuth } from '../Context/AuthContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from '../Screens/Dashboard';
import Dashboard2 from '../Screens/Dashboard2';
import Dashboard3 from '../Screens/Dashboard3';
import Login from '../Screens/Login';
import SignUp from '../Screens/SignUp';
import LandingPage from '../Screens/LandingPage';
import PrivateRoute from '../Components/PrivateRoutes';
import DashboardLayout from '@/Layouts/DashboardLayout';
import Home from '../Screens/Home';
import Help from '../Screens/Help';
import Setting from '../Screens/Setting';
import Monitor from '../Screens/Monitor';

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
            <DashboardLayout />
          </PrivateRoute>
        }
      >
        <Route index element={<Home/>} />
        <Route path="monitor" element={<Monitor />} />
        <Route path="dashboard1" element={<Dashboard />} />
        <Route path="dashboard2" element={<Dashboard2 />} />
        <Route path="dashboard3" element={<Dashboard3 />} />
        <Route path="help" element={<Help />} />
        <Route path="setting" element={<Setting />} />

      </Route>
      </Routes>
  );
};

export default Navigator;