import React, { useEffect, useState } from 'react';
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
import ViewApi from '../Screens/ViewApi';
import ViewAllApi from '../Screens/ViewAllApi';
import CreateMonitor from '../Screens/CreateMonitor';

const Navigator = () => {
  const { auth, login, logout } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem('token');
      if (token && !auth.isAuthenticated) {
        login(token);
      } else if (!token && auth.isAuthenticated) {
        logout();
      }
      setLoading(false);
    };

    checkToken();
  }, [auth.isAuthenticated, login, logout]);

  if (loading) {
    return <p>Loading...</p>;
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
        <Route index element={<Home />} />
        <Route path="monitor" element={<Monitor />}>
          <Route index element={<ViewAllApi />} />
          <Route path="createMonitor" element={<CreateMonitor />} />
          <Route path="viewApi/:logId" element={<ViewApi />} />
        </Route>
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