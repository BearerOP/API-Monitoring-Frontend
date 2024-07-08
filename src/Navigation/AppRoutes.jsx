import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from '../Screens/Login';
import Dashboard from '../Screens/Dashboard';
import SignUp from '../Screens/SignUp';
import LandingPage from '../Screens/LandingPage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default AppRoutes;