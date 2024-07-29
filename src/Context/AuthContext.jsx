import React, { createContext, useState, useEffect, useContext } from 'react';

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        isAuthenticated: false,
        token: null,
    });

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setAuth({ isAuthenticated: true, token });
        }
    }, []);

    const login = (token) => {
        localStorage.setItem('token', token);
        setAuth({ isAuthenticated: true, token });
    };

    const logout = () => {
        localStorage.removeItem('token');
        setAuth({ isAuthenticated: false, token: null });
    };

    return (
        <AuthContext.Provider value={{ auth, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};