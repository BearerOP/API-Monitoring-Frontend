import React, { Profiler, useEffect, useState } from 'react';
import { useAuth } from '../Context/AuthContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from '../Screens/Dashboard';
import Dashboard2 from '../Screens/Dashboard2';
import Login from '../Screens/Login';
import SignUp from '../Screens/SignUp';
import LandingPage from '../Screens/LandingPage';
import PrivateRoute from '../Components/PrivateRoutes';
import DashboardLayout from '@/Layouts/DashboardLayout';
import Home from '../Screens/Home';
import Help from '../Screens/Help';
import Monitor from '../Screens/Monitor';
import ViewApi from '../Screens/ViewApi';
import ViewAllApi from '../Screens/ViewAllApi';
import CreateMonitor from '../Screens/CreateMonitor';
import Loader from '@/Components/Loader';
import SettingsLayout from '@/Layouts/SettingsLayout';
import SettingsProfilePage from '@/Screens/SettingsProfilePage';
import SettingsAccountPage from '@/Screens/SettingsAccountPage';
import SettingsNotificationsPage from '@/Screens/SettingsNotificationsPage';
import SettingsSecurityPage from '@/Screens/SettingsSecurityPage';
import NotFound from '@/Screens/NotFound';
import { Header76 } from '@/Screens/Gallery';

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
    return <Loader />;
  }

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      {/* <Route path="/login" element={<Login />} /> */}
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
        <Route path="help" element={<Help />} />
        <Route path="setting" element={<SettingsLayout />}>
          <Route index element={<SettingsProfilePage />} />
          <Route path='account' element={<SettingsAccountPage />} />
          <Route path='notifications' element={<SettingsNotificationsPage />} />
          <Route path='security' element={<SettingsSecurityPage />} />
        </Route>
      </Route>
      <Route path="/gallery" element={<Header76 />} />
      <Route path="*" element={<NotFound />} /> {/* 404 route */}
    </Routes>
  );
};

export default Navigator;