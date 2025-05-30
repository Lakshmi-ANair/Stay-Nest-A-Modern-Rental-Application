// frontend/src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const API_URL = 'http://localhost:5001/api/auth'; // Your backend API URL

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // User object or null
    const [token, setToken] = useState(localStorage.getItem('token')); // Get token from localStorage
    const [loading, setLoading] = useState(true); // To handle initial auth check

    axios.defaults.baseURL = 'http://localhost:5001'; // Optional: Set base URL for axios
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }

    useEffect(() => {
        const verifyToken = async () => {
            if (token) {
                try {
                    // You might want an endpoint like /api/auth/me or /api/auth/verify
                    // For now, let's assume if token exists, we try to fetch some user data
                    // Or, you can decode the token client-side (not as secure for user data, but ok for expiry check)
                    // For this example, we'll just set the user if a token exists
                    // A better approach is to verify the token with the backend.
                    // Let's create a simple /api/me endpoint on the backend.

                    // If you have a /api/me endpoint that returns user info based on token:
                    const response = await axios.get('/api/protected'); // Using our existing protected route
                    setUser({ email: response.data.logged_in_as }); // Adjust based on what /me returns
                } catch (error) {
                    console.error("Token verification failed or token expired", error);
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                    setToken(null);
                    setUser(null);
                    delete axios.defaults.headers.common['Authorization'];
                }
            }
            setLoading(false);
        };
        verifyToken();
    }, [token]);


    const login = async (email, password) => {
        try {
            const response = await axios.post(`${API_URL}/login`, { email, password });
            const { access_token, user_id, email: userEmail, firstName } = response.data;
            localStorage.setItem('token', access_token);
            localStorage.setItem('user', JSON.stringify({ id: user_id, email: userEmail, firstName })); // Store some user info
            setToken(access_token);
            setUser({ id: user_id, email: userEmail, firstName });
            axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
            return response.data;
        } catch (error) {
            console.error("Login failed:", error.response ? error.response.data : error.message);
            throw error.response ? error.response.data : new Error("Login failed");
        }
    };

    const signup = async (userData) => {
        try {
            const response = await axios.post(`${API_URL}/register`, userData);
            // Optionally log them in directly after signup
            // await login(userData.email, userData.password);
            return response.data;
        } catch (error) {
            console.error("Signup failed:", error.response ? error.response.data : error.message);
            throw error.response ? error.response.data : new Error("Signup failed");
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setToken(null);
        setUser(null);
        delete axios.defaults.headers.common['Authorization'];
        // Optionally, call a backend /logout endpoint if you have token blacklisting
    };

    return (
        <AuthContext.Provider value={{ user, token, login, signup, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;