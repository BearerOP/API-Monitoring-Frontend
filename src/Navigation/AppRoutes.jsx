import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from '../Screens/Login';
import Dashboard from '../Screens/Dashboard';
import SignUp from '../Screens/SignUp';


const AppRoutes = ({}) => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/dashboard" element={<Dashboard />} />

            </Routes>
        </>
    );
}

export default AppRoutes;

